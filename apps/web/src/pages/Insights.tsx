import { useState, useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function SubstackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  )
}

const FILTERS = ['all', 'press-release', 'use-cases', 'news'] as const
const INSIGHTS_BASE = 'company/insights'
type FilterType = (typeof FILTERS)[number]

const ARTICLES = [
  {
    id: 'baterino-unveils-new-maritime-battery',
    type: 'press-release' as const,
    image: '/images/article-1.jpg',
    dateKey: 'insights.article1.date',
    titleKey: 'insights.article1.title',
    excerptKey: 'insights.article1.excerpt',
  },
  {
    id: 'sustainable-shipping-future',
    type: 'news' as const,
    image: '/images/article-2.jpg',
    dateKey: 'insights.article2.date',
    titleKey: 'insights.article2.title',
    excerptKey: 'insights.article2.excerpt',
  },
  {
    id: 'baterino-partnership-announcement',
    type: 'use-cases' as const,
    image: '/images/article-3.jpg',
    dateKey: 'insights.article3.date',
    titleKey: 'insights.article3.title',
    excerptKey: 'insights.article3.excerpt',
  },
  {
    id: 'electric-ferry-milestone',
    type: 'press-release' as const,
    image: '/images/article-4.jpg',
    dateKey: 'insights.article4.date',
    titleKey: 'insights.article4.title',
    excerptKey: 'insights.article4.excerpt',
  },
  {
    id: 'green-maritime-technology',
    type: 'news' as const,
    image: '/images/article-5.jpg',
    dateKey: 'insights.article5.date',
    titleKey: 'insights.article5.title',
    excerptKey: 'insights.article5.excerpt',
  },
  {
    id: 'baterino-team-expansion',
    type: 'use-cases' as const,
    image: '/images/article-6.jpg',
    dateKey: 'insights.article6.date',
    titleKey: 'insights.article6.title',
    excerptKey: 'insights.article6.excerpt',
  },
]

function getFilterLabel(filter: FilterType, t: (key: string) => string) {
  switch (filter) {
    case 'all':
      return t('insights.filters.all')
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
    activeFilter === 'all' ? ARTICLES : ARTICLES.filter((a) => a.type === activeFilter)

  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px] text-center">
          <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {t('insights.hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] font-body text-body-md leading-relaxed text-neutral-600">
            {t('insights.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="w-full border-b border-neutral-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
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
          <a
            href="https://baterino.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 font-body text-body-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:border-neutral-300"
          >
            <SubstackIcon className="h-4 w-4" />
            {t('insights.readMoreOnSubstack')}
          </a>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1200px] gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              to={`${base}/${INSIGHTS_BASE}/${article.id}`}
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
                  {getFilterLabel(article.type, t)}
                </span>
                <span className="mb-1 font-body text-body-xs text-neutral-400">
                  {t(article.dateKey)}
                </span>
                <h2 className="mb-2 font-heading text-lg font-bold leading-tight text-neutral-900 group-hover:text-neutral-700">
                  {t(article.titleKey)}
                </h2>
                <p className="flex-1 font-body text-body-sm leading-relaxed text-neutral-600">
                  {t(article.excerptKey)}
                </p>
              </div>
            </Link>
          ))}
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
