import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { canonicalUrl, absoluteUrl, siteName, defaultOgImage } from '../config/seo'

interface SeoHeadProps {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  type?: 'website' | 'article'
}

const localeMap: Record<string, string> = {
  en: 'en_US',
  es: 'es_ES',
  id: 'id_ID',
  zh: 'zh_CN',
  ro: 'ro_RO',
}

export function SeoHead({ title, description, image, noIndex, type = 'website' }: SeoHeadProps) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const path = location.pathname
  const lang = i18n.language

  const pageTitle = title ?? t('app.title')
  const pageDescription = description ?? t('app.description')
  const canonical = canonicalUrl(path)
  const ogImage = image ? absoluteUrl(image) : absoluteUrl(defaultOgImage)

  return (
    <Helmet prioritizeSeoTags>
      <html lang={lang} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={localeMap[lang] ?? 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
