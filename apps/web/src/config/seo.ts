import { assetUrl } from '@/lib/assetUrl'

export const siteUrl = import.meta.env.VITE_SITE_URL ?? 'https://example.com'
/** Open Graph `og:site_name` and default site brand in shared previews. */
export const siteName = 'Baterino Global : EPC for Battery Storage Solution BESS infrastructure'
/** Default image for social sharing (og:image, twitter:image). Use 1200×630px for best results. */
export const defaultOgImage = '/images/og-images/og-home.jpg'

export function canonicalUrl(path: string): string {
  const base = siteUrl.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

export function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  const resolved = assetUrl(p)
  if (/^https?:\/\//i.test(resolved)) return resolved
  const base = siteUrl.replace(/\/$/, '')
  return `${base}${resolved}`
}
