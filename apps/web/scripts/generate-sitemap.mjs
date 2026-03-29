/**
 * Writes public/sitemap.xml and public/robots.txt for launch SEO.
 * Uses VITE_SITE_URL (process.env first, then .env via Vite loadEnv). Trim trailing slash.
 *
 * @see https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap
 */
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const fileEnv = loadEnv('production', root, '')
const siteUrl = (
  process.env.VITE_SITE_URL ||
  fileEnv.VITE_SITE_URL ||
  'https://example.com'
).replace(/\/$/, '')

/** Keep in sync with src/i18n.ts supportedLngs */
const LOCALES = ['en', 'es', 'id', 'zh', 'ro']

/** Google hreflang codes for our site locales */
const HREFLANG = {
  en: 'en',
  es: 'es',
  id: 'id',
  zh: 'zh-CN',
  ro: 'ro',
}

/**
 * Public indexable paths per locale segment (no leading/trailing slashes).
 * Keep aligned with src/App.tsx — exclude admin, previews, and error pages.
 */
const PATHS = [
  '',
  'solutions/residential',
  'solutions/industrial',
  'solutions/maritime',
  'solutions/critical-services',
  'delivery',
  'company/about-baterino',
  'company/lithtech',
  'company/insights',
  'company/insights/global-delivery-framework',
  'company/insights/baterino-roles-in-every-market',
  'company/insights/request-to-operation',
  'use-cases',
  'company/partnership',
  'global-presence',
  'careers',
  'contact',
  'terms-of-use',
  'privacy-policy',
]

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function pageUrl(locale, segments) {
  const suffix = segments ? `/${segments}` : ''
  return `${siteUrl}/${locale}${suffix}`
}

function alternatesForPath(segments) {
  const lines = []
  for (const locale of LOCALES) {
    const href = escapeXml(pageUrl(locale, segments))
    const tag = HREFLANG[locale]
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="${tag}" href="${href}"/>`
    )
  }
  const xDefault = escapeXml(pageUrl('en', segments))
  lines.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefault}"/>`
  )
  return lines.join('\n')
}

const lastmod = new Date().toISOString().slice(0, 10)

let urlXml = ''
for (const segments of PATHS) {
  const priority = segments === '' ? '1.0' : '0.8'
  for (const locale of LOCALES) {
    const loc = escapeXml(pageUrl(locale, segments))
    urlXml += `  <url>
    <loc>${loc}</loc>
${alternatesForPath(segments)}
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
`
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlXml}</urlset>
`

const robots = `User-agent: *
Allow: /

# CMS / internal — do not index
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
`

writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap, 'utf8')
writeFileSync(path.join(root, 'public', 'robots.txt'), robots, 'utf8')

console.log(
  `[sitemap] Wrote public/sitemap.xml and public/robots.txt (${LOCALES.length} locales × ${PATHS.length} paths = ${LOCALES.length * PATHS.length} URLs) base=${siteUrl}`
)
