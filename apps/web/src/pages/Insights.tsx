import { useState, useEffect, useMemo } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SEOHead } from '../components/SEOHead'
import { fetchPublishedArticles, type PublicArticleListItem } from '../lib/publicContentApi'
import { assetUrl } from '@/lib/assetUrl'

const FILTERS = ['all', 'company', 'press-release', 'use-cases', 'news'] as const
const INSIGHTS_BASE = 'company/insights'
type FilterType = (typeof FILTERS)[number]

interface ArticleItem {
  id: string
  slug: string
  type: string
  image: string
  date: string
  dateSort: string
  title: string
  excerpt: string
}

function apiArticleToItem(a: PublicArticleListItem): ArticleItem {
  const sort = a.published_at ? a.published_at.slice(0, 10) : '1970-01-01'
  const dateDisplay = a.published_at ? new Date(a.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''
  return {
    id: a.id,
    slug: a.slug,
    type: a.type,
    image: a.image_url || assetUrl('/images/og-images/og-insights.jpg'),
    date: dateDisplay,
    dateSort: sort,
    title: a.title,
    excerpt: a.excerpt || '',
  }
}

function InsightsCardSkeleton() {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-[10px] bg-white shadow-sm ring-1 ring-neutral-200"
      aria-hidden
    >
      <div className="relative aspect-[16/10] w-full animate-pulse bg-neutral-200" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-5 w-[92%] animate-pulse rounded bg-neutral-200" />
        <div className="h-5 w-[70%] animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-[30%] max-w-[6rem] animate-pulse rounded bg-neutral-200" />
        <div className="mt-1 h-3 w-full animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-full animate-pulse rounded bg-neutral-200" />
        <div className="h-3 w-[88%] animate-pulse rounded bg-neutral-200" />
        <div className="flex justify-end">
          <div className="h-3 w-[4.5rem] animate-pulse rounded bg-neutral-200" />
        </div>
      </div>
    </div>
  )
}

function getFilterLabel(filter: FilterType, t: (key: string) => string) {
  switch (filter) {
    case 'all':
      return t('insights.filters.all')
    case 'company':
      return t('insights.filters.company')
    case 'press-release':
      return t('insights.filters.pressRelease')
    case 'use-cases':
      return t('insights.filters.useCases')
    case 'news':
      return t('insights.filters.news')
    default:
      return filter
  }
}

export function Insights() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [apiArticles, setApiArticles] = useState<ArticleItem[]>([])
  const [articlesLoading, setArticlesLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setArticlesLoading(true)
    fetchPublishedArticles()
      .then((list) => {
        if (!cancelled) setApiArticles(list.map(apiArticleToItem))
      })
      .finally(() => {
        if (!cancelled) setArticlesLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const articles = useMemo(() => {
    return [...apiArticles].sort((a, b) => b.dateSort.localeCompare(a.dateSort))
  }, [apiArticles])

  useEffect(() => {
    const filterParam = searchParams.get('filter')
    if (filterParam && FILTERS.includes(filterParam as FilterType)) {
      setActiveFilter(filterParam as FilterType)
    }
  }, [searchParams])

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter)
    const params = new URLSearchParams(searchParams)
    if (filter === 'all') {
      params.delete('filter')
    } else {
      params.set('filter', filter)
    }
    setSearchParams(params, { replace: true })
  }

  const filteredArticles = useMemo(() => {
    let list = activeFilter === 'all' ? articles : articles.filter((a) => a.type === activeFilter)
    const q = searchQuery.trim().toLowerCase()
    if (!q) return list
    return list.filter((a) => {
      const title = a.title.startsWith('insights.') ? t(a.title) : a.title
      const excerpt = a.excerpt.startsWith('insights.') ? t(a.excerpt) : a.excerpt
      const haystack = `${title} ${excerpt} ${a.slug}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [articles, activeFilter, searchQuery, t])

  const getDisplay = (a: ArticleItem) => ({
    date: a.date.startsWith('insights.') ? t(a.date) : a.date,
    title: a.title.startsWith('insights.') ? t(a.title) : a.title,
    excerpt: a.excerpt.startsWith('insights.') ? t(a.excerpt) : a.excerpt,
  })

  return (
    <article className="w-full bg-white">
      <SEOHead title={t('insights.hero.title')} description={t('insights.hero.subtitle')} ogImage="/images/og-images/og-insights.jpg" />
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pb-4 pt-16 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-[1200px] text-center">
          <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {t('insights.hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] font-body text-body-md leading-relaxed text-neutral-600">
            {t('insights.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Filter Bar + search */}
      <section className="w-full bg-white px-4 pb-0 pt-4 sm:px-6 sm:pt-4 lg:px-8 lg:pt-8">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1">
            {/* Mobile/tablet: dropdown */}
            <div className="relative lg:hidden">
              <select
                value={activeFilter}
                onChange={(e) => handleFilterClick(e.target.value as FilterType)}
                className="w-full appearance-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pr-10 font-body text-body-sm font-medium text-neutral-900 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
                aria-label={t('insights.filters.all')}
              >
                {FILTERS.map((filter) => (
                  <option key={filter} value={filter}>
                    {getFilterLabel(filter, t)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {/* Desktop: pill buttons */}
            <div className="hidden flex-wrap items-center gap-2 sm:gap-3 lg:flex">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => handleFilterClick(filter)}
                  className={`rounded-full px-4 py-2 font-body text-body-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {getFilterLabel(filter, t)}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full shrink-0 sm:w-auto sm:min-w-[200px] sm:max-w-xs lg:max-w-[280px]">
            <label className="sr-only" htmlFor="insights-article-search">
              {t('insights.searchArticlesPlaceholder')}
            </label>
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              id="insights-article-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('insights.searchArticlesPlaceholder')}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 font-body text-body-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/20"
              autoComplete="off"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section
        className="w-full px-4 pb-12 pt-[20px] sm:px-6 lg:px-8"
        aria-busy={articlesLoading}
        aria-label={
          articlesLoading ? t('insights.loadingArticles', { defaultValue: 'Loading articles' }) : undefined
        }
      >
        <div className="mx-auto grid max-w-[1200px] gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articlesLoading
            ? Array.from({ length: 6 }, (_, i) => <InsightsCardSkeleton key={i} />)
            : filteredArticles.map((article) => {
                const d = getDisplay(article)
                return (
                  <Link
                    key={article.id}
                    to={`${base}/${INSIGHTS_BASE}/${article.slug}`}
                    className="group flex flex-col overflow-hidden rounded-[10px] bg-white shadow-sm ring-1 ring-neutral-200 transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                      <img
                        src={article.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-black/40" aria-hidden />
                      <img
                        src={assetUrl('/images/baterino-logo-white.png')}
                        alt=""
                        className="absolute bottom-4 right-4 z-10 h-5 w-auto object-contain drop-shadow-sm"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <h2 className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-neutral-900 group-hover:text-neutral-700">
                        {d.title}
                      </h2>
                      <span className="font-body text-body-xs font-medium uppercase tracking-wider text-neutral-500">
                        {FILTERS.includes(article.type as FilterType)
                          ? getFilterLabel(article.type as FilterType, t)
                          : article.type}
                      </span>
                      <p className="flex-1 font-body text-body-sm leading-relaxed text-neutral-600">
                        {d.excerpt}
                      </p>
                      {d.date ? (
                        <div className="flex justify-end">
                          <time
                            dateTime={article.dateSort}
                            className="font-body text-body-xs text-neutral-400"
                          >
                            {d.date}
                          </time>
                        </div>
                      ) : null}
                    </div>
                  </Link>
                )
              })}
        </div>
      </section>

      {/* Empty State */}
      {!articlesLoading && filteredArticles.length === 0 && (
        <section className="w-full px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1200px] text-center">
            <p className="font-body text-body-md text-neutral-500">
              {t('insights.noArticles')}
            </p>
          </div>
        </section>
      )}
    </article>
  )
}
