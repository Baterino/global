import { randomBytes } from 'node:crypto'
import dns from 'node:dns'
import net from 'node:net'
import nodemailer from 'nodemailer'
import { hasResend, sendContactMailsWithResend } from './resendChannel.js'
import { contactMailDisplayName } from './mailIdentity.js'

const INQUIRY_TYPES = ['general', 'projectsOperations', 'socialImpact'] as const
type InquiryType = (typeof INQUIRY_TYPES)[number]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Disallow angle brackets and slashes in email and message fields (safety / noise reduction). */
const EMAIL_MESSAGE_FORBIDDEN = /[<>/]/

function isValidContactName(name: string): boolean {
  return /^[\p{L}]+(?:[ \u00A0][\p{L}]+)*$/u.test(name)
}

function isValidContactPhone(phone: string): boolean {
  if (phone.length > 50) return false
  if (!/^\+?\d+$/.test(phone)) return false
  return phone.replace(/\D/g, '').length >= 5
}

const DEFAULT_CONTACT_TO = 'inquiries@baterino.com'
const DEFAULT_SITE_PUBLIC_URL = 'https://baterino.com'
const DEFAULT_SOCIAL_LINKEDIN_URL = 'https://www.linkedin.com/company/baterino-global/'
const DEFAULT_SOCIAL_FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61575386571436'
const LOGO_PATH = '/images/Baterino-Logo-black.png'

const SOCIAL_ICON_PX = 20
const ICON_IMG_STYLE = `display:inline-block;width:${SOCIAL_ICON_PX}px;height:${SOCIAL_ICON_PX}px;max-width:${SOCIAL_ICON_PX}px;max-height:${SOCIAL_ICON_PX}px;border:0;vertical-align:middle;object-fit:contain;`

const AUTO_REPLY_FOOTPRINT =
  'You have received this message because you sent an inquiry via the baterino.com platform.'

export type ContactSubmission = {
  inquiryType: InquiryType
  name: string
  email: string
  country: string
  phone: string
  message: string
  locale?: string
}

export type ContactProcessResult = {
  status: number
  body: Record<string, unknown>
}

function clampStr(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function isHoneypotTriggered(body: Record<string, unknown>): boolean {
  const city = clampStr(body.honeypotCity ?? body.city, 200)
  const county = clampStr(body.honeypotCounty ?? body.county, 200)
  return city.length > 0 || county.length > 0
}

function validateBody(body: unknown): { ok: true; data: ContactSubmission } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') return { ok: false, error: 'invalid_json' }
  const b = body as Record<string, unknown>

  const inquiryType = b.inquiryType
  if (typeof inquiryType !== 'string' || !INQUIRY_TYPES.includes(inquiryType as InquiryType)) {
    return { ok: false, error: 'invalid_inquiry_type' }
  }

  const name = clampStr(b.name, 200).replace(/\s+/g, ' ')
  if (!name.length) return { ok: false, error: 'name_required' }
  if (!isValidContactName(name)) return { ok: false, error: 'invalid_name' }

  const email = clampStr(b.email, 320)
  if (!email) return { ok: false, error: 'email_required' }
  if (EMAIL_MESSAGE_FORBIDDEN.test(email)) return { ok: false, error: 'invalid_email' }
  if (!EMAIL_REGEX.test(email)) return { ok: false, error: 'invalid_email' }

  const country = clampStr(b.country, 100)
  if (!country) return { ok: false, error: 'country_required' }

  const phone = clampStr(b.phone, 50)
  if (!isValidContactPhone(phone)) {
    return { ok: false, error: phone.replace(/\D/g, '').length < 5 ? 'phone_required' : 'invalid_phone' }
  }

  const message = clampStr(b.message, 10000)
  if (EMAIL_MESSAGE_FORBIDDEN.test(message)) return { ok: false, error: 'invalid_message' }
  if (message.length < 10) return { ok: false, error: 'message_too_short' }

  const localeRaw = clampStr(b.locale, 16)
  const locale = localeRaw || undefined

  return {
    ok: true,
    data: {
      inquiryType: inquiryType as InquiryType,
      name,
      email,
      country,
      phone,
      message,
      locale,
    },
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function generateInquiryReference(): string {
  const a = randomBytes(3).toString('hex').toUpperCase()
  const b = randomBytes(3).toString('hex').toUpperCase()
  return `BAT-${a}-${b}`
}

function sitePublicOrigin(): string {
  return (process.env.SITE_PUBLIC_URL ?? DEFAULT_SITE_PUBLIC_URL).replace(/\/$/, '')
}

/**
 * Origin for absolute URLs in the customer HTML email (logo + inline icons).
 * Use the **marketing site** that serves `public/images`, not the API host (e.g. not *.vercel.app API).
 * Optional override when SITE_PUBLIC_URL points at the API or the function only has API env.
 */
function emailHtmlPublicOrigin(): string {
  const explicit = process.env.CONTACT_EMAIL_PUBLIC_ORIGIN?.trim()
  if (explicit) return explicit.replace(/\/$/, '')
  return sitePublicOrigin()
}

/** Absolute URL for static assets linked from customer HTML email. */
function emailPublicUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  const origin = emailHtmlPublicOrigin()
  try {
    return new URL(p.replace(/^\//, ''), `${origin}/`).toString()
  } catch {
    return `${origin}${p}`
  }
}

function getSocialFacebookUrl(): string {
  return process.env.SOCIAL_FACEBOOK_URL?.trim() || DEFAULT_SOCIAL_FACEBOOK_URL
}

function getSocialLinkedInUrl(): string {
  return process.env.SOCIAL_LINKEDIN_URL?.trim() || DEFAULT_SOCIAL_LINKEDIN_URL
}

function buildInternalMail(data: ContactSubmission, reference: string): { text: string; html: string } {
  const brand = contactMailDisplayName()
  const lines = [
    `New contact form submission (${brand} website)`,
    '',
    `Reference: ${reference}`,
    `Inquiry type: ${data.inquiryType}`,
    `Locale: ${data.locale ?? '(not set)'}`,
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Country: ${data.country}`,
    `Phone: ${data.phone}`,
    '',
    'Message:',
    data.message,
  ]
  const text = lines.join('\n')
  const html = `<pre style="font-family:system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>`
  return { text, html }
}

function buildAutoReplyMail(name: string, reference: string): { text: string; html: string } {
  const brand = contactMailDisplayName()
  const safeName = escapeHtml(name)
  const safeRef = escapeHtml(reference)
  const safeBrand = escapeHtml(brand)
  const logoUrl = escapeHtml(emailPublicUrl(LOGO_PATH))
  const fbHref = escapeHtml(getSocialFacebookUrl())
  const liHref = escapeHtml(getSocialLinkedInUrl())
  const fbIconSrc = escapeHtml(emailPublicUrl('/images/social/email-facebook.svg'))
  const liIconSrc = escapeHtml(emailPublicUrl('/images/social/email-linkedin.svg'))
  const siteHref = escapeHtml(emailHtmlPublicOrigin())

  const text = [
    `Dear ${name},`,
    '',
    `Thank you for reaching out to ${brand}. Your message has been received and logged under reference number ` +
      reference +
      '.',
    '',
    'Our team is reviewing your inquiry and will respond shortly. If your request relates to a specific market, the relevant local contact will follow up with you within 24–48 business hours.',
    '',
    'We appreciate your interest and look forward to connecting.',
    '',
    'Warm regards,',
    `The ${brand} Team`,
    `global@baterino.com | baterino.com | Facebook: ${getSocialFacebookUrl()} | LinkedIn: ${getSocialLinkedInUrl()}`,
    '',
    AUTO_REPLY_FOOTPRINT,
  ].join('\n')

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/></head>
<body style="margin:0;padding:24px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.6;color:#1a1a1a;background:#ffffff;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;">
    <tr><td style="padding-bottom:24px;">
      <img src="${logoUrl}" alt="${safeBrand}" width="200" height="auto" style="display:block;max-width:200px;height:auto;border:0;"/>
    </td></tr>
    <tr><td>
      <p style="margin:0 0 16px;">Dear ${safeName},</p>
      <p style="margin:0 0 16px;">Thank you for reaching out to ${safeBrand}. Your message has been received and logged under reference number <strong>${safeRef}</strong>.</p>
      <p style="margin:0 0 16px;">Our team is reviewing your inquiry and will respond shortly. If your request relates to a specific market, the relevant local contact will follow up with you within 24–48 business hours.</p>
      <p style="margin:0 0 24px;">We appreciate your interest and look forward to connecting.</p>
      <p style="margin:0;">Warm regards,<br/><strong>The ${safeBrand} Team</strong></p>
      <p style="margin:16px 0 0;font-size:14px;color:#444;line-height:1.8;">
        <a href="mailto:global@baterino.com" style="color:#0B0726;">global@baterino.com</a>
        &nbsp;|&nbsp;
        <a href="${siteHref}" style="color:#0B0726;">baterino.com</a>
        &nbsp;|&nbsp;
        <a href="${fbHref}" style="text-decoration:none;vertical-align:middle;" title="Facebook"><img src="${fbIconSrc}" alt="Facebook" width="${SOCIAL_ICON_PX}" height="${SOCIAL_ICON_PX}" style="${ICON_IMG_STYLE}"/></a>
        &nbsp;
        <a href="${liHref}" style="text-decoration:none;vertical-align:middle;" title="LinkedIn"><img src="${liIconSrc}" alt="LinkedIn" width="${SOCIAL_ICON_PX}" height="${SOCIAL_ICON_PX}" style="${ICON_IMG_STYLE}"/></a>
      </p>
      <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e5e5e5;font-size:11px;line-height:1.5;color:#888888;font-family:Arial,Helvetica,sans-serif;">
        ${escapeHtml(AUTO_REPLY_FOOTPRINT)}
      </p>
    </td></tr>
  </table>
</body>
</html>`

  return { text, html }
}

/**
 * Nodemailer resolves A+AAAA and picks a random address — IPv6 often breaks on PaaS (no egress).
 * Connect to an IPv4 literal when possible; keep TLS SNI as the original hostname.
 */
async function smtpConnectTarget(hostname: string): Promise<{ host: string; servername: string }> {
  if (net.isIP(hostname)) {
    return { host: hostname, servername: hostname }
  }
  try {
    const v4 = await dns.promises.resolve4(hostname)
    if (v4.length > 0) {
      return { host: v4[0], servername: hostname }
    }
  } catch {
    /* no A record */
  }
  return { host: hostname, servername: hostname }
}

async function getTransport(): Promise<nodemailer.Transporter | null> {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!host || !user || !pass) return null

  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
  const secure = process.env.SMTP_SECURE === 'true' || port === 465
  // Port 587 uses STARTTLS; many providers expect explicit TLS upgrade
  const requireTLS =
    !secure &&
    port === 587 &&
    process.env.SMTP_REQUIRE_TLS !== 'false'

  const { host: connectHost, servername } = await smtpConnectTarget(host.trim())

  return nodemailer.createTransport({
    host: connectHost,
    port,
    secure,
    requireTLS,
    auth: { user, pass },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 45_000,
    ...(connectHost !== servername ? { tls: { servername } } : {}),
  })
}

function getInternalToAddress(): string {
  const raw = process.env.CONTACT_TO_EMAIL?.trim()
  return raw && raw.length > 0 ? raw : DEFAULT_CONTACT_TO
}

function getSmtpFromAddress(): string {
  return process.env.CONTACT_FROM_EMAIL?.trim() || process.env.SMTP_USER?.trim() || 'noreply@baterino.com'
}

/**
 * Customer-facing auto-reply "From". Must be a sender your SMTP account is allowed to use
 * (same mailbox, verified alias, or domain-wide policy). Defaulting to global@ often fails
 * when SMTP_USER is e.g. noreply@… or a transactional provider mailbox.
 */
function getAutoReplyFromAddress(): string {
  const explicit = process.env.AUTO_REPLY_FROM_EMAIL?.trim()
  if (explicit) return explicit
  const contactFrom = process.env.CONTACT_FROM_EMAIL?.trim()
  if (contactFrom) return contactFrom
  const user = process.env.SMTP_USER?.trim()
  if (user) return user
  return 'global@baterino.com'
}

/** RFC 5322 From header; avoids double-wrapping if env already contains Name <addr>. */
function formatFromDisplay(name: string, address: string): string {
  const a = address.trim()
  if (!a) return `"${name}" <noreply@invalid>`
  if (a.includes('<') && a.includes('>')) return a
  return `"${name}" <${a}>`
}

/** "From" for internal notification via Resend — domain must be verified in Resend. */
function getResendNotificationFrom(): string {
  const explicit = process.env.RESEND_FROM_EMAIL?.trim()
  const dn = contactMailDisplayName()
  if (explicit) {
    return explicit.includes('<') && explicit.includes('>') ? explicit : formatFromDisplay(dn, explicit)
  }
  return formatFromDisplay(dn, getSmtpFromAddress())
}

/** "From" for customer auto-reply via Resend — must be verified (or same verified domain). */
function getResendAutoReplyFrom(): string {
  const raw = getAutoReplyFromAddress()
  if (raw.includes('<') && raw.includes('>')) return raw
  return formatFromDisplay(contactMailDisplayName(), raw)
}

async function canDeliverContactMail(): Promise<boolean> {
  if (hasResend()) return true
  return (await getTransport()) != null
}

/**
 * Shared by Express (`/api/contact`) and Vercel serverless (`api/contact.ts`).
 */
export async function processContactPost(rawBody: unknown): Promise<ContactProcessResult> {
  if (!rawBody || typeof rawBody !== 'object') {
    return { status: 400, body: { ok: false, code: 'invalid_json' } }
  }
  const bodyObj = rawBody as Record<string, unknown>

  if (isHoneypotTriggered(bodyObj)) {
    console.warn('[contact] honeypot triggered (city/county filled); silently accepting.')
    return { status: 200, body: { ok: true } }
  }

  const parsed = validateBody(rawBody)
  if (!parsed.ok) {
    return { status: 400, body: { ok: false, code: parsed.error } }
  }

  const data = parsed.data
  const reference = generateInquiryReference()
  const internalTo = getInternalToAddress()
  const internal = buildInternalMail(data, reference)
  const autoReply = buildAutoReplyMail(data.name, reference)

  const deliverable = await canDeliverContactMail()
  if (!deliverable) {
    if (process.env.NODE_ENV === 'production') {
      return { status: 503, body: { ok: false, code: 'contact_unavailable' } }
    }
    console.info('[contact] (dev, no Resend/SMTP) reference:', reference, 'payload:', JSON.stringify(data, null, 2))
    return { status: 200, body: { ok: true, reference } }
  }

  if (hasResend()) {
    try {
      await sendContactMailsWithResend({
        internalTo,
        notificationFrom: getResendNotificationFrom(),
        autoReplyFrom: getResendAutoReplyFrom(),
        submitterEmail: data.email,
        submitterName: data.name,
        reference,
        inquiryType: data.inquiryType,
        internal,
        autoReply,
      })
      return { status: 200, body: { ok: true, reference } }
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err)
      console.error('[contact] Resend send failed:', detail, err)
      return { status: 502, body: { ok: false, code: 'send_failed' } }
    }
  }

  const transport = await getTransport()
  if (!transport) {
    if (process.env.NODE_ENV === 'production') {
      return { status: 503, body: { ok: false, code: 'contact_unavailable' } }
    }
    console.info('[contact] (dev, no SMTP) reference:', reference, 'payload:', JSON.stringify(data, null, 2))
    return { status: 200, body: { ok: true, reference } }
  }

  const smtpFrom = getSmtpFromAddress()
  const autoReplyFrom = getAutoReplyFromAddress()

  try {
    const dn = contactMailDisplayName()
    await transport.sendMail({
      from: formatFromDisplay(dn, smtpFrom),
      to: internalTo,
      replyTo: data.email,
      subject: `[${dn} Contact] ${reference} — ${data.inquiryType} — ${data.name}`,
      text: internal.text,
      html: internal.html,
    })
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
    console.error(
      '[contact] internal sendMail failed:',
      detail,
      '| check server accepts TCP on SMTP_HOST:',
      process.env.SMTP_HOST ?? '(unset)',
      'port:',
      smtpPort,
      '(firewall / listen 0.0.0.0 / try 587+STARTTLS if 465 blocked)',
      err
    )
    return { status: 502, body: { ok: false, code: 'send_failed' } }
  }

  try {
    const dn = contactMailDisplayName()
    await transport.sendMail({
      from: formatFromDisplay(dn, autoReplyFrom),
      to: data.email,
      replyTo: internalTo,
      subject: `We received your message — ${dn} (${reference})`,
      text: autoReply.text,
      html: autoReply.html,
    })
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err)
    console.error('[contact] auto-reply sendMail failed:', detail, err)
  }

  return { status: 200, body: { ok: true, reference } }
}
