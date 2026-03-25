import { Resend } from 'resend'
import { contactMailDisplayName } from './mailIdentity.js'

export function hasResend(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim())
}

export async function sendContactMailsWithResend(params: {
  internalTo: string
  notificationFrom: string
  autoReplyFrom: string
  submitterEmail: string
  submitterName: string
  reference: string
  inquiryType: string
  internal: { text: string; html: string }
  autoReply: { text: string; html: string }
}): Promise<void> {
  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) {
    throw new Error('RESEND_API_KEY is not set')
  }

  const resend = new Resend(key)

  const internalSend = await resend.emails.send({
    from: params.notificationFrom,
    to: [params.internalTo],
    replyTo: params.submitterEmail,
    subject: `[${contactMailDisplayName()} Contact] ${params.reference} — ${params.inquiryType} — ${params.submitterName}`,
    text: params.internal.text,
    html: params.internal.html,
  })

  if (internalSend.error) {
    throw new Error(internalSend.error.message)
  }

  const autoSend = await resend.emails.send({
    from: params.autoReplyFrom,
    to: [params.submitterEmail],
    replyTo: params.internalTo,
    subject: `We received your message — ${contactMailDisplayName()} (${params.reference})`,
    text: params.autoReply.text,
    html: params.autoReply.html,
  })

  if (autoSend.error) {
    console.error('[contact] Resend customer auto-reply failed:', autoSend.error.message)
  }
}
