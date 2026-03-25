/** Align with `apps/api/src/contact/processContactPost.ts` validation rules. */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const EMAIL_MESSAGE_FORBIDDEN = /[<>/]/

export function sanitizeContactNameInput(raw: string): string {
  return raw.replace(/[^\p{L}\s]/gu, '').replace(/\s+/g, ' ')
}

export function sanitizeContactEmailInput(raw: string): string {
  return raw.replace(/[<>/]/g, '')
}

export function sanitizeContactMessageInput(raw: string): string {
  return raw.replace(/[<>/]/g, '')
}

/** Only digits and one optional leading `+`; max length 50. */
export function sanitizeContactPhoneInput(raw: string): string {
  const cleaned = raw.replace(/[^\d+]/g, '')
  if (!cleaned.includes('+')) {
    return cleaned.slice(0, 50)
  }
  const digits = cleaned.replace(/\+/g, '')
  return `+${digits}`.slice(0, 50)
}

export function isValidContactName(trimmedName: string): boolean {
  const n = trimmedName.replace(/\s+/g, ' ')
  if (!n.length) return false
  return /^[\p{L}]+(?:[ \u00A0][\p{L}]+)*$/u.test(n)
}
