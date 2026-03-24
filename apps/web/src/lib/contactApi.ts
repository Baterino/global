import { viteApiBaseUrl } from './viteApiBaseUrl.js'

export type ContactInquiryType = 'general' | 'projectsOperations' | 'socialImpact'

export type ContactFormPayload = {
  inquiryType: ContactInquiryType
  name: string
  email: string
  country: string
  phone: string
  message: string
  locale?: string
  /** Honeypot — must stay empty */
  honeypotCity?: string
  honeypotCounty?: string
}

export type ContactApiErrorCode =
  | 'invalid_json'
  | 'invalid_inquiry_type'
  | 'name_required'
  | 'email_required'
  | 'invalid_email'
  | 'country_required'
  | 'phone_required'
  | 'message_too_short'
  | 'contact_unavailable'
  | 'send_failed'

type ContactApiSuccess = { ok: true; reference?: string }
type ContactApiFailure = { ok: false; code: ContactApiErrorCode }

/**
 * POST /api/contact — proxied to the API in dev (see vite.config).
 * Set VITE_API_URL in production if the API is on another origin.
 */
export async function submitContactForm(payload: ContactFormPayload): Promise<{ reference?: string }> {
  const base = viteApiBaseUrl()
  const url = `${base}/api/contact`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  let body: ContactApiSuccess | ContactApiFailure | null = null
  try {
    body = (await res.json()) as ContactApiSuccess | ContactApiFailure
  } catch {
    body = null
  }

  if (!res.ok) {
    const code =
      body && typeof body === 'object' && body.ok === false && 'code' in body
        ? (body.code as ContactApiErrorCode)
        : undefined
    throw new ContactSubmitError(code ?? 'send_failed', res.status)
  }

  if (!body || body.ok !== true) {
    throw new ContactSubmitError('send_failed', res.status)
  }

  return { reference: body.reference }
}

export class ContactSubmitError extends Error {
  constructor(
    public readonly code: ContactApiErrorCode,
    public readonly status: number
  ) {
    super(`Contact form failed: ${code}`)
    this.name = 'ContactSubmitError'
  }
}
