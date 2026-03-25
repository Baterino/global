import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { SEOHead } from '../components/SEOHead'
import { insightsFallbackBodies } from '@api-insights'
import { fetchPublishedArticleBySlug, type PublicArticleDetail } from '../lib/publicContentApi'

interface ArticleData {
  id: string
  slug: string
  title: string
  author: string
  date: string
  location: string
  category?: string
  type?: string
  image: string
  imagePlaceholder?: 'gradient'
  content: string
}

const SLUG_TO_ARTICLE_KEY: Record<string, number> = {
  'global-delivery-framework': 7,
  'baterino-roles-in-every-market': 8,
  'request-to-operation': 9,
}

const FALLBACK_ARTICLES: ArticleData[] = [
  {
    id: 'global-delivery-framework',
    slug: 'global-delivery-framework',
    title: '',
    author: '',
    date: '',
    location: '',
    category: 'insights.categoryCompany',
    image: '/images/blog/global-delivery-framework.jpg',
    content: insightsFallbackBodies['global-delivery-framework'],
  },
  {
    id: 'baterino-roles-in-every-market',
    slug: 'baterino-roles-in-every-market',
    title: '',
    author: '',
    date: '',
    location: '',
    category: 'insights.categoryCompany',
    image: '/images/about-baterino.jpg',
    content: insightsFallbackBodies['baterino-roles-in-every-market'],
  },
  {
    id: 'request-to-operation',
    slug: 'request-to-operation',
    title: '',
    author: '',
    date: '',
    location: '',
    category: 'insights.categoryCompany',
    image: '/images/blog/how-baterino-assess-a-project.jpg',
    content: insightsFallbackBodies['request-to-operation'],
  },
]


export function Article() {
  const { t } = useTranslation()
  const { locale, slug } = useParams<{ locale: string; slug: string }>()
  const [remote, setRemote] = useState<PublicArticleDetail | null | undefined>(undefined)

  useEffect(() => {
    if (!slug) {
      setRemote(null)
      return
    }
    let cancelled = false
    fetchPublishedArticleBySlug(slug).then((r) => {
      if (!cancelled) setRemote(r)
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  const fallbackMatch = FALLBACK_ARTICLES.find((a) => a.slug === slug || a.id === slug)
  const articleKey = fallbackMatch ? (SLUG_TO_ARTICLE_KEY[fallbackMatch.slug] ?? 7) : 7

  const resolvedArticle = remote
    ? {
        id: remote.id,
        slug: remote.slug,
        title: remote.title,
        author: remote.author_name || 'Baterino',
        date: remote.published_at
          ? new Date(remote.published_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : '',
        location: remote.location_label || '',
        category: remote.category_label
          ? remote.category_label.startsWith('insights.')
            ? t(remote.category_label)
            : remote.category_label
          : t('insights.publicRelease'),
        type: remote.type,
        image: remote.image_url || '/images/og-images/og-insights.jpg',
        content: remote.body_html,
      }
    : fallbackMatch
      ? {
          ...fallbackMatch,
          title: fallbackMatch.title || t(`insights.article${articleKey}.title`),
          author: fallbackMatch.author || t('insights.article7.author'),
          date: fallbackMatch.date || t(`insights.article${articleKey}.date`),
          location: fallbackMatch.location || t(`insights.article${articleKey}.location`),
          category: fallbackMatch.category
            ? (fallbackMatch.category.startsWith('insights.') ? t(fallbackMatch.category) : fallbackMatch.category)
            : t('insights.publicRelease'),
        }
      : null

  if (remote === undefined) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="font-body text-body-md text-neutral-500">Loading…</p>
      </div>
    )
  }

  if (!resolvedArticle) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="font-body text-body-md text-neutral-500">Article not found.</p>
      </div>
    )
  }

  return (
    <article className="w-full bg-white">
      <SEOHead
        title={`${resolvedArticle.title} | ${resolvedArticle.author}`}
        description={
          remote
            ? remote.excerpt?.slice(0, 200) || undefined
            : resolvedArticle.slug === 'global-delivery-framework'
              ? t('insights.article7.description')
              : resolvedArticle.slug === 'baterino-roles-in-every-market'
                ? t('insights.article8.description')
                : resolvedArticle.slug === 'request-to-operation'
                  ? t('insights.article9.description')
                  : undefined
        }
        ogImage={resolvedArticle.image}
        type="article"
      />
      {/* Article Header */}
      <section className="w-full bg-white px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px] text-center">
          <h1 className="mb-4 font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {resolvedArticle.title}
          </h1>
          <p className="mb-4 font-body text-body-md text-neutral-600">
            by {resolvedArticle.author}
          </p>
          <p className="font-body text-body-sm uppercase tracking-wide text-neutral-600">
            {resolvedArticle.category} - {resolvedArticle.location} - {resolvedArticle.date}
          </p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="w-full bg-white px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px]">
          {'imagePlaceholder' in resolvedArticle && resolvedArticle.imagePlaceholder === 'gradient' ? (
            <div className="article-rich">
              <div className="hero-image-placeholder">
                <span className="hero-image-text">Global Presence · Local Execution</span>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[10px]">
              <img
                src={resolvedArticle.image}
                alt={resolvedArticle.title}
                className="h-auto w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/40" aria-hidden />
              <img
                src="/images/baterino-logo-white.png"
                alt=""
                className="absolute bottom-4 right-4 z-10 h-5 w-auto object-contain drop-shadow-sm"
                aria-hidden
              />
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="w-full bg-white px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px]">
          <div
            className="prose prose-neutral max-w-none font-body text-body-md leading-relaxed text-neutral-700 prose-headings:font-heading prose-headings:font-bold prose-headings:text-neutral-900 prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-2xl prose-p:mb-6 prose-ul:mb-6 prose-ul:ml-6 prose-ul:list-disc prose-li:mb-2"
            dangerouslySetInnerHTML={{
              __html: resolvedArticle.content.replace(/__LOCALE__/g, locale ?? 'en'),
            }}
          />
        </div>
      </section>

      {/* Back to Insights */}
      <section className="w-full bg-white px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px]">
          <Link
            to={`/${locale ?? 'en'}/company/insights`}
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
              className="h-5 w-5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t('insights.backToInsights')}
          </Link>
        </div>
      </section>
    </article>
  )
}
