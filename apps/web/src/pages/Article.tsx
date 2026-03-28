import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { SEOHead } from '../components/SEOHead'
import { ArticleBlogTemplate } from '../components/article/ArticleBlogTemplate'
import { ArticleBlogTemplateSkeleton } from '../components/article/ArticleBlogTemplateSkeleton'
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
  /** When set on static fallbacks (no API row). */
  keywords?: string[]
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
    keywords: ['Infrastructure', 'Delivery', 'Global presence', 'Partnerships'],
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
    keywords: ['Market roles', 'EPC', 'Importer', 'After-sales'],
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
    keywords: ['Assessment', 'Divisions', 'Process', 'Lifecycle'],
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
        keywords: remote.keywords?.slice(0, 4) ?? [],
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
          keywords: fallbackMatch.keywords?.slice(0, 4) ?? [],
        }
      : null

  if (remote === undefined) {
    return (
      <article className="w-full bg-white">
        <ArticleBlogTemplateSkeleton />
      </article>
    )
  }

  if (!resolvedArticle) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="font-body text-body-md text-neutral-500">Article not found.</p>
      </div>
    )
  }

  const heroModel = {
    title: resolvedArticle.title,
    author: resolvedArticle.author,
    category: resolvedArticle.category ?? '',
    location: resolvedArticle.location ?? '',
    date: resolvedArticle.date ?? '',
    image: resolvedArticle.image,
    ...('imagePlaceholder' in resolvedArticle && resolvedArticle.imagePlaceholder
      ? { imagePlaceholder: resolvedArticle.imagePlaceholder as 'gradient' }
      : {}),
  }

  return (
    <article className="w-full bg-white">
      {/* Cover (`image_url`) is passed through as og:image / twitter:image (absolute URL in SEOHead). */}
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
      <ArticleBlogTemplate
        hero={heroModel}
        locale={locale ?? 'en'}
        bodyHtml={resolvedArticle.content}
        keywords={resolvedArticle.keywords ?? []}
      />
    </article>
  )
}
