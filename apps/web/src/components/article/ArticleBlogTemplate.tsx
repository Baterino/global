import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { stripArticleBoilerplate } from '../../lib/stripArticleBoilerplate'

export type ArticleBlogHeroModel = {
  title: string
  author: string
  category: string
  location: string
  date: string
  image: string
  imagePlaceholder?: 'gradient'
}

type ArticleBlogTemplateProps = {
  hero: ArticleBlogHeroModel
  locale: string
  bodyHtml: string
  /** Up to 4 labels rendered directly under the hero image, above the article body. */
  keywords?: string[]
}

function ArticleHeroMeta({ hero }: { hero: ArticleBlogHeroModel }) {
  const { t } = useTranslation()

  const line1 =
    hero.location && hero.category
      ? `${hero.location} - ${hero.category}`
      : hero.location || hero.category || null

  let line2: string | null = null
  if (hero.author && hero.date) {
    line2 = t('insights.articleTemplate.publishedByOn', {
      author: hero.author,
      date: hero.date,
    })
  } else if (hero.author) {
    line2 = t('insights.articleTemplate.publishedByAuthor', { author: hero.author })
  } else if (hero.date) {
    line2 = t('insights.articleTemplate.publishedOnDate', { date: hero.date })
  }

  if (!line1 && !line2) return null

  return (
    <div
      className="mt-6 flex w-full max-w-[700px] shrink-0 flex-col items-center gap-2 text-center font-body text-caption text-white/85 sm:mt-8 sm:gap-2.5 sm:text-body-sm"
      role="group"
      aria-label={t('insights.articleTemplate.metaAriaLabel')}
    >
      {line1 ? (
        <p className="uppercase tracking-wide text-white/90">{line1}</p>
      ) : null}
      {line2 ? <p className="text-white/80">{line2}</p> : null}
    </div>
  )
}

function shareFacebookUrl(pageUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`
}

function shareLinkedInUrl(pageUrl: string): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`
}

function ArticleBlogFooter({ locale }: { locale: string }) {
  const { t } = useTranslation()
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <footer className="w-full border-t border-neutral-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[900px] grid-cols-1 items-center gap-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
        <div className="flex justify-center sm:justify-start">
          <Link
            to={`/${locale}/company/insights`}
            className="inline-flex items-center gap-2 font-body text-body-md font-bold text-neutral-900 transition-colors hover:text-neutral-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 shrink-0"
              aria-hidden
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t('insights.backToInsights')}
          </Link>
        </div>
        <div className="flex max-w-full flex-col items-center gap-2 justify-self-center sm:flex-row sm:flex-nowrap sm:items-center sm:gap-x-3 sm:overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="w-full text-center font-body text-body-sm font-semibold text-neutral-800 sm:w-auto sm:whitespace-nowrap">
            {t('insights.articleTemplate.shareOn')}
          </span>
          <div className="flex max-w-full flex-nowrap items-center justify-center gap-x-2 sm:gap-x-3">
            <a
              href={pageUrl ? shareFacebookUrl(pageUrl) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('insights.articleTemplate.shareOn')} ${t('insights.articleTemplate.facebook')}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 font-body text-body-sm font-semibold text-neutral-800 shadow-sm transition-colors hover:border-neutral-400 hover:bg-neutral-50"
            >
              <svg className="h-4 w-4 shrink-0 text-[#1877F2]" viewBox="0 0 24 24" aria-hidden fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              {t('insights.articleTemplate.facebook')}
            </a>
            <a
              href={pageUrl ? shareLinkedInUrl(pageUrl) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('insights.articleTemplate.shareOn')} ${t('insights.articleTemplate.linkedin')}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 font-body text-body-sm font-semibold text-neutral-800 shadow-sm transition-colors hover:border-neutral-400 hover:bg-neutral-50"
            >
              <svg className="h-4 w-4 shrink-0 text-[#0A66C2]" viewBox="0 0 24 24" aria-hidden fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {t('insights.articleTemplate.linkedin')}
            </a>
          </div>
        </div>
        <div className="flex justify-center sm:justify-end">
          <Link
            to={`/${locale}/contact`}
            className="inline-flex items-center justify-center rounded-lg bg-[#10064B] px-5 py-2.5 font-body text-body-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1a0a6e]"
          >
            {t('insights.articleTemplate.contactUs')}
          </Link>
        </div>
      </div>
    </footer>
  )
}

/**
 * Shared layout for Insights article pages: hero (title + meta + image), body, footer (back / share / contact).
 */
export function ArticleBlogTemplate({ hero, locale, bodyHtml, keywords = [] }: ArticleBlogTemplateProps) {
  const safeLocale = locale || 'en'
  const html = stripArticleBoilerplate(bodyHtml.replace(/__LOCALE__/g, safeLocale))

  const isGradientHero = hero.imagePlaceholder === 'gradient'
  const [heroImageLoaded, setHeroImageLoaded] = useState(isGradientHero)

  useEffect(() => {
    if (isGradientHero) setHeroImageLoaded(true)
    else setHeroImageLoaded(false)
  }, [hero.image, isGradientHero])

  const heroImgRef = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth > 0) setHeroImageLoaded(true)
  }, [])

  return (
    <>
      <section className="w-full bg-white px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-8" aria-label="Article hero">
        <div className="mx-auto w-full max-w-[900px]">
          <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-neutral-900">
            {isGradientHero ? (
              <div className="absolute inset-0 bg-[#0B0726]" aria-hidden />
            ) : (
              <>
                {!heroImageLoaded ? (
                  <div
                    className="absolute inset-0 z-[1] animate-pulse bg-neutral-700"
                    aria-hidden
                  />
                ) : null}
                <img
                  ref={heroImgRef}
                  src={hero.image}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                    heroImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  decoding="async"
                  onLoad={() => setHeroImageLoaded(true)}
                  onError={() => setHeroImageLoaded(true)}
                />
                <div
                  className="pointer-events-none absolute inset-0 z-[2] bg-black/60"
                  aria-hidden
                />
              </>
            )}
            <div className="absolute inset-0 z-[3] flex flex-col items-center justify-center px-4 py-5 text-center sm:px-6 sm:py-6">
              <div className="flex max-h-full w-full max-w-[700px] flex-col items-center overflow-hidden">
                <img
                  src="/images/baterino-logo-white.png"
                  alt=""
                  className="mb-3 h-5 w-auto shrink-0 object-contain drop-shadow-md sm:mb-4 sm:h-6"
                  aria-hidden
                />
                <h1 className="w-full max-w-[700px] shrink font-publicSans text-xl font-extrabold uppercase leading-snug tracking-tight text-white sm:text-2xl sm:leading-[1.42] lg:text-[1.75rem] lg:leading-[1.45]">
                  {hero.title}
                </h1>
                <ArticleHeroMeta hero={hero} />
              </div>
            </div>
          </div>

          {keywords.length > 0 ? (
            <div
              className="mt-4 flex w-full flex-wrap gap-2 sm:mt-5"
              aria-label="Article keywords"
            >
              {keywords.map((word, idx) => (
                <span
                  key={`${word}-${idx}`}
                  className="inline-flex items-center rounded-full bg-[#f7f7f7] px-3 py-1 font-body text-caption font-bold uppercase tracking-wide text-[#10064B] sm:text-body-sm"
                >
                  {word}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="w-full bg-white px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px]">
          <div
            className="prose prose-neutral max-w-none font-body text-body-md leading-relaxed text-neutral-700 prose-headings:font-heading prose-headings:font-bold prose-headings:text-neutral-900 prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-2xl prose-p:mb-6 prose-ul:mb-6 prose-ul:ml-6 prose-ul:list-disc prose-li:mb-2"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>

      <ArticleBlogFooter locale={safeLocale} />
    </>
  )
}
