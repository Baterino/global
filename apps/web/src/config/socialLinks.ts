/**
 * Social profile URLs. Override with `.env` per environment if needed.
 */
function urlOrFallback(raw: string | undefined, fallback: string): string {
  const v = raw?.trim()
  return v && v.length > 0 ? v : fallback
}

/** Baterino Global Facebook Page (numeric URL until a custom @username is set in Meta). */
export const defaultFacebookPageUrl = 'https://www.facebook.com/profile.php?id=61575386571436'

/** Public company page (not the /about “view as member” URL). */
export const defaultLinkedInCompanyUrl = 'https://www.linkedin.com/company/baterino-global/'

export const socialFacebookUrl = urlOrFallback(
  import.meta.env.VITE_SOCIAL_FACEBOOK_URL,
  defaultFacebookPageUrl
)

export const socialLinkedInUrl = urlOrFallback(
  import.meta.env.VITE_SOCIAL_LINKEDIN_URL,
  defaultLinkedInCompanyUrl
)

/** Substack — separate channel */
export const socialSubstackUrl = 'https://baterino.substack.com'
