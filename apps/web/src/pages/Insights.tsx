import { useState, useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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

const FALLBACK_ARTICLES: ArticleItem[] = [
  { id: 'baterino-unveils-new-maritime-battery', slug: 'baterino-unveils-new-maritime-battery', type: 'press-release', image: '/images/article-1.jpg', date: 'insights.article1.date', dateSort: '2026-09-29', title: 'insights.article1.title', excerpt: 'insights.article1.excerpt' },
  { id: 'sustainable-shipping-future', slug: 'sustainable-shipping-future', type: 'news', image: '/images/article-2.jpg', date: 'insights.article2.date', dateSort: '2026-09-28', title: 'insights.article2.title', excerpt: 'insights.article2.excerpt' },
  { id: 'baterino-partnership-announcement', slug: 'baterino-partnership-announcement', type: 'use-cases', image: '/images/article-3.jpg', date: 'insights.article3.date', dateSort: '2026-09-27', title: 'insights.article3.title', excerpt: 'insights.article3.excerpt' },
  { id: 'electric-ferry-milestone', slug: 'electric-ferry-milestone', type: 'press-release', image: '/images/article-4.jpg', date: 'insights.article4.date', dateSort: '2026-09-26', title: 'insights.article4.title', excerpt: 'insights.article4.excerpt' },
  { id: 'green-maritime-technology', slug: 'green-maritime-technology', type: 'news', image: '/images/article-5.jpg', date: 'insights.article5.date', dateSort: '2026-09-25', title: 'insights.article5.title', excerpt: 'insights.article5.excerpt' },
  { id: 'baterino-team-expansion', slug: 'baterino-team-expansion', type: 'use-cases', image: '/images/article-6.jpg', date: 'insights.article6.date', dateSort: '2026-09-24', title: 'insights.article6.title', excerpt: 'insights.article6.excerpt' },
  { id: 'global-delivery-framework', slug: 'global-delivery-framework', type: 'company', image: '/images/blog/global-delivery-framework.jpg', date: 'insights.article7.date', dateSort: '2026-03-01', title: 'insights.article7.title', excerpt: 'insights.article7.excerpt' },
  { id: 'baterino-roles-in-every-market', slug: 'baterino-roles-in-every-market', type: 'company', image: '/images/about-baterino.jpg', date: 'insights.article8.date', dateSort: '2026-03-15', title: 'insights.article8.title', excerpt: 'insights.article8.excerpt' },
  { id: 'request-to-operation', slug: 'request-to-operation', type: 'company', image: '/images/delivery-enablement.jpg', date: 'insights.article9.date', dateSort: '2026-03-20', title: 'insights.article9.title', excerpt: 'insights.article9.excerpt' },
].sort((a, b) => b.dateSort.localeCompare(a.dateSort))

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
  const articles = FALLBACK_ARTICLES

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

  const filteredArticles =
    activeFilter === 'all' ? articles : articles.filter((a) => a.type === activeFilter)

  const getDisplay = (a: ArticleItem) => ({
    date: a.date.startsWith('insights.') ? t(a.date) : a.date,
    title: a.title.startsWith('insights.') ? t(a.title) : a.title,
    excerpt: a.excerpt.startsWith('insights.') ? t(a.excerpt) : a.excerpt,
  })

  return (
    <article className="w-full bg-white">
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

      {/* Filter Bar */}
      <section className="w-full border-b border-neutral-200 bg-white px-4 py-4 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 lg:flex-row lg:items-center">
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
      </section>

      {/* Articles Grid */}
      <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => {
            const d = getDisplay(article)
            return (
              <Link
                key={article.id}
                to={`${base}/${INSIGHTS_BASE}/${article.slug}`}
                className="group flex flex-col overflow-hidden rounded-[10px] bg-white shadow-sm ring-1 ring-neutral-200 transition-shadow hover:shadow-md"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={article.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-2 font-body text-body-xs font-medium uppercase tracking-wider text-neutral-500">
                    {getFilterLabel(article.type as FilterType, t)}
                  </span>
                  <span className="mb-1 font-body text-body-xs text-neutral-400">
                    {d.date}
                  </span>
                  <h2 className="mb-2 font-heading text-lg font-bold uppercase leading-tight tracking-tight text-neutral-900 group-hover:text-neutral-700">
                    {d.title}
                  </h2>
                  <p className="flex-1 font-body text-body-sm leading-relaxed text-neutral-600">
                    {d.excerpt}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
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
