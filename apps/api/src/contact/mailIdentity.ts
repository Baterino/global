/**
 * Display name for `From:` (e.g. "Baterino Global" <no-reply@…>).
 * Optional: CONTACT_MAIL_DISPLAY_NAME in env; used in subjects and auto-reply copy too.
 */
export function contactMailDisplayName(): string {
  return process.env.CONTACT_MAIL_DISPLAY_NAME?.trim() || 'Baterino Global'
}
