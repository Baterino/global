import { randomBytes } from 'node:crypto'
import { Router, type Request, type Response } from 'express'
import nodemailer from 'nodemailer'

const INQUIRY_TYPES = ['general', 'projectsOperations', 'socialImpact'] as const
type InquiryType = (typeof INQUIRY_TYPES)[number]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const DEFAULT_CONTACT_TO = 'alexander@baterino.com'
const DEFAULT_SITE_PUBLIC_URL = 'https://baterino.com'
const LOGO_PATH = '/images/Baterino-Logo-black.png'

const SOCIAL_ICON_PX = 20
const ICON_IMG_STYLE = `display:inline-block;width:${SOCIAL_ICON_PX}px;height:${SOCIAL_ICON_PX}px;max-width:${SOCIAL_ICON_PX}px;max-height:${SOCIAL_ICON_PX}px;border:0;vertical-align:middle;object-fit:contain;`

/** Small print at bottom of customer auto-reply */
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

function clampStr(value: unknown, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

/** Bots often fill every field; humans should leave these empty. */
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

  const name = clampStr(b.name, 200)
  if (!name.length) return { ok: false, error: 'name_required' }

  const email = clampStr(b.email, 320)
  if (!email) return { ok: false, error: 'email_required' }
  if (!EMAIL_REGEX.test(email)) return { ok: false, error: 'invalid_email' }

  const country = clampStr(b.country, 100)
  if (!country) return { ok: false, error: 'country_required' }

  const phone = clampStr(b.phone, 50)
  if (phone.length < 5) return { ok: false, error: 'phone_required' }

  const message = clampStr(b.message, 10000)
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

/** Absolute URL for a path under the public site (e.g. /images/...). */
function publicUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  try {
    return new URL(p.replace(/^\//, ''), `${sitePublicOrigin()}/`).toString()
  } catch {
    return `${sitePublicOrigin()}${p}`
  }
}

function publicAssetUrl(): string {
  return publicUrl(LOGO_PATH)
}

/** Until real profiles exist, defaults to main site; set SOCIAL_* in .env when ready. */
function getSocialFacebookUrl(): string {
  return process.env.SOCIAL_FACEBOOK_URL?.trim() || DEFAULT_SITE_PUBLIC_URL
}

function getSocialLinkedInUrl(): string {
  return process.env.SOCIAL_LINKEDIN_URL?.trim() || DEFAULT_SITE_PUBLIC_URL
}

function buildInternalMail(data: ContactSubmission, reference: string): { text: string; html: string } {
  const lines = [
    'New contact form submission (Baterino website)',
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
  const safeName = escapeHtml(name)
  const safeRef = escapeHtml(reference)
  const logoUrl = publicAssetUrl()
  const fbHref = escapeHtml(getSocialFacebookUrl())
  const liHref = escapeHtml(getSocialLinkedInUrl())
  const fbIconSrc = escapeHtml(publicUrl('/images/social/email-facebook.svg'))
  const liIconSrc = escapeHtml(publicUrl('/images/social/email-linkedin.svg'))
  const siteHref = escapeHtml(DEFAULT_SITE_PUBLIC_URL)

  const text = [
    `Dear ${name},`,
    '',
    'Thank you for reaching out to Baterino. Your message has been received and logged under reference number ' +
      reference +
      '.',
    '',
    'Our team is reviewing your inquiry and will respond shortly. If your request relates to a specific market, the relevant local contact will follow up with you within 24–48 business hours.',
    '',
    'We appreciate your interest and look forward to connecting.',
    '',
    'Warm regards,',
    'The Baterino Team',
    `global@baterino.com | baterino.com | Facebook: ${getSocialFacebookUrl()} | LinkedIn: ${getSocialLinkedInUrl()}`,
  ].join('\n')

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/></head>
<body style="margin:0;padding:24px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.6;color:#1a1a1a;background:#ffffff;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;">
    <tr><td style="padding-bottom:24px;">
      <img src="${logoUrl}" alt="Baterino" width="200" height="auto" style="display:block;max-width:200px;height:auto;border:0;"/>
    </td></tr>
    <tr><td>
      <p style="margin:0 0 16px;">Dear ${safeName},</p>
      <p style="margin:0 0 16px;">Thank you for reaching out to Baterino. Your message has been received and logged under reference number <strong>${safeRef}</strong>.</p>
      <p style="margin:0 0 16px;">Our team is reviewing your inquiry and will respond shortly. If your request relates to a specific market, the relevant local contact will follow up with you within 24–48 business hours.</p>
      <p style="margin:0 0 24px;">We appreciate your interest and look forward to connecting.</p>
      <p style="margin:0;">Warm regards,<br/><strong>The Baterino Team</strong></p>
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

function getTransport(): nodemailer.Transporter | null {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!host || !user || !pass) return null

  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587
  const secure = process.env.SMTP_SECURE === 'true' || port === 465

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  })
}

function getInternalToAddress(): string {
  const raw = process.env.CONTACT_TO_EMAIL?.trim()
  return raw && raw.length > 0 ? raw : DEFAULT_CONTACT_TO
}

/** From address for SMTP (must be allowed by your provider). */
function getSmtpFromAddress(): string {
  return process.env.CONTACT_FROM_EMAIL?.trim() || process.env.SMTP_USER || 'noreply@baterino.com'
}

/** Shown as From on the auto-reply to the customer (must be allowed by SMTP). */
function getAutoReplyFromAddress(): string {
  return process.env.AUTO_REPLY_FROM_EMAIL?.trim() || 'global@baterino.com'
}

export const contactRouter = Router()

contactRouter.post('/contact', async (req: Request, res: Response) => {
  const rawBody = req.body
  if (!rawBody || typeof rawBody !== 'object') {
    return res.status(400).json({ ok: false, code: 'invalid_json' })
  }
  const bodyObj = rawBody as Record<string, unknown>

  if (isHoneypotTriggered(bodyObj)) {
    console.warn('[contact] honeypot triggered (city/county filled); silently accepting.')
    return res.json({ ok: true })
  }

  const parsed = validateBody(rawBody)
  if (!parsed.ok) {
    return res.status(400).json({ ok: false, code: parsed.error })
  }

  const data = parsed.data
  const reference = generateInquiryReference()
  const transport = getTransport()
  const internalTo = getInternalToAddress()
  const smtpFrom = getSmtpFromAddress()
  const autoReplyFrom = getAutoReplyFromAddress()

  if (!transport) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(503).json({ ok: false, code: 'contact_unavailable' })
    }
    console.info('[contact] (dev, no SMTP) reference:', reference, 'payload:', JSON.stringify(data, null, 2))
    return res.json({ ok: true, reference })
  }

  const internal = buildInternalMail(data, reference)
  const autoReply = buildAutoReplyMail(data.name, reference)

  try {
    await transport.sendMail({
      from: smtpFrom,
      to: internalTo,
      replyTo: data.email,
      subject: `[Baterino Contact] ${reference} — ${data.inquiryType} — ${data.name}`,
      text: internal.text,
      html: internal.html,
    })
  } catch (err) {
    console.error('[contact] internal sendMail failed:', err)
    return res.status(502).json({ ok: false, code: 'send_failed' })
  }

  try {
    await transport.sendMail({
      from: `"Baterino" <${autoReplyFrom}>`,
      to: data.email,
      replyTo: internalTo,
      subject: `We received your message — Baterino (${reference})`,
      text: autoReply.text,
      html: autoReply.html,
    })
  } catch (err) {
    console.error('[contact] auto-reply sendMail failed:', err)
    // Internal mail already sent; still return success with reference
  }

  return res.json({ ok: true, reference })
})
