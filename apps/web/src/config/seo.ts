export const siteUrl = import.meta.env.VITE_SITE_URL ?? 'https://example.com'
export const siteName = 'Baterino'
/** Default image for social sharing (og:image, twitter:image). Use 1200×630px for best results. */
export const defaultOgImage = '/images/hero-slide1.jpg'

export function canonicalUrl(path: string): string {
  const base = siteUrl.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

export function absoluteUrl(path: string): string {
  const base = siteUrl.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}
