/**
 * Social profile URLs. Set in `.env` when pages are live.
 * Until then, links fall back to the main site (update env when ready).
 */
function urlOrFallback(raw: string | undefined, fallback: string): string {
  const v = raw?.trim()
  return v && v.length > 0 ? v : fallback
}

const SITE = 'https://baterino.com'

export const socialFacebookUrl = urlOrFallback(import.meta.env.VITE_SOCIAL_FACEBOOK_URL, SITE)

export const socialLinkedInUrl = urlOrFallback(import.meta.env.VITE_SOCIAL_LINKEDIN_URL, SITE)

/** Substack — separate channel */
export const socialSubstackUrl = 'https://baterino.substack.com'
