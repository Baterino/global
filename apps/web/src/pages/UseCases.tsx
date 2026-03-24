import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  USE_CASE_PROJECTS,
  type UseCaseProject,
  type Sector,
} from '../data/useCasesProjects'
import { SEOHead } from '../components/SEOHead'

const FILTERS = ['all', 'industrial', 'offgrid', 'maritime', 'solar', 'container', 'cabinet'] as const
type FilterType = (typeof FILTERS)[number]

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  )
}

function ImagePlaceholderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

function getSectorLabel(sector: Sector, t: (k: string) => string): string {
  switch (sector) {
    case 'industrial':
      return t('useCases.sector.industrial')
    case 'maritime':
      return t('useCases.sector.maritime')
    case 'offgrid':
      return t('useCases.sector.offgrid')
    default:
      return sector
  }
}

function getProjectImages(project: UseCaseProject): string[] {
  if (project.images?.length) return project.images
  if (project.image) return [project.image]
  return []
}

function ProjectCard({
  project,
  t,
  index,
  onClick,
}: {
  project: UseCaseProject
  t: (k: string) => string
  index: number
  onClick: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setVisible(true), index * 30)
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  const topColor =
    project.sector === 'industrial'
      ? 'bg-[#10064B]'
      : project.sector === 'maritime'
        ? 'bg-[#0891b2]'
        : 'bg-[#7c3aed]'

  const sectorBadgeColor =
    project.sector === 'industrial'
      ? 'text-[#10064B] bg-[#e8ecf5]'
      : project.sector === 'maritime'
        ? 'text-[#0891b2] bg-[#ecfeff]'
        : 'text-[#7c3aed] bg-[#f5f3ff]'

  const highlightSpec = project.specs.capacity ?? project.specs.powerCapacity
  const specLabel = project.specs.capacity ? 'useCases.spec.capacity' : 'useCases.spec.powerCapacity'

  return (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      className={`flex w-full cursor-pointer flex-col overflow-hidden rounded-[10px] border border-neutral-200 bg-white text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className={`h-1 ${topColor}`} />
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
        {(() => {
          const images = getProjectImages(project)
          const count = images.length
          return count > 0 ? (
            <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-md bg-black/50 px-2 py-1 font-mono text-xs font-medium text-white backdrop-blur-sm">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{count}</span>
            </div>
          ) : null
        })()}
        {(project.images?.[0] ?? project.image) ? (
          <img
            src={project.images?.[0] ?? project.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const placeholder = e.currentTarget.nextElementSibling as HTMLElement
              if (placeholder) placeholder.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-100 text-neutral-400"
          style={(project.images?.[0] ?? project.image) ? { display: 'none' } : { display: 'flex' }}
        >
          <ImagePlaceholderIcon className="h-7 w-7 opacity-40" />
          <span className="font-body text-caption font-medium uppercase tracking-wider opacity-40">
            {t('useCases.photoComingSoon')}
          </span>
        </div>
        <img
          src="/images/lithtech-logo-white 3.png"
          alt="LithTech"
          className="absolute bottom-3 right-3 z-10 h-4 w-auto object-contain drop-shadow-sm sm:h-5"
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start gap-2">
          <span
            className={`rounded px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${sectorBadgeColor}`}
          >
            {getSectorLabel(project.sector, t)}
          </span>
        </div>
        <h3 className="font-heading text-heading-sm font-bold leading-snug tracking-tight text-neutral-900">{project.title}</h3>
        <div className="flex items-center gap-1.5 font-body text-body-sm text-neutral-500">
          <LocationIcon className="h-3 w-3 shrink-0" />
          {project.location}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {highlightSpec && (
            <div className="rounded-md bg-[#e8ecf5] p-2">
              <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
                {t(specLabel)}
              </div>
              <div className="font-heading text-body-sm font-semibold text-[#10064B]">{highlightSpec}</div>
            </div>
          )}
          {project.specs.solar !== undefined && (
            <div className="rounded-md bg-neutral-100 p-2">
              <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
                {t('useCases.spec.solar')}
              </div>
              <div className="font-heading text-body-sm font-semibold text-neutral-900">{project.specs.solar}</div>
            </div>
          )}
          {project.specs.container && (
            <div className="rounded-md bg-neutral-100 p-2">
              <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
                {t('useCases.spec.container')}
              </div>
              <div className="font-heading text-body-sm font-semibold text-neutral-900">{project.specs.container}</div>
            </div>
          )}
          {project.specs.installation && (
            <div className="rounded-md bg-neutral-100 p-2">
              <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
                {t('useCases.spec.installation')}
              </div>
              <div className="font-heading text-body-sm font-semibold text-neutral-900">{project.specs.installation}</div>
            </div>
          )}
          {project.specs.vesselType && (
            <div className="rounded-md bg-neutral-100 p-2">
              <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
                {t('useCases.spec.vesselType')}
              </div>
              <div className="font-heading text-body-sm font-semibold text-neutral-900">{project.specs.vesselType}</div>
            </div>
          )}
          <div className="rounded-md bg-neutral-100 p-2">
            <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
              {t('useCases.spec.country')}
            </div>
            <div className="font-heading text-body-sm font-semibold text-neutral-900">{project.specs.country}</div>
          </div>
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.useTags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-body text-caption font-medium tracking-wider text-neutral-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}

const SWIPE_THRESHOLD = 50

function ProjectModal({
  project,
  t,
  onClose,
}: {
  project: UseCaseProject
  t: (k: string) => string
  onClose: () => void
}) {
  const images = getProjectImages(project)
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))
  }, [images.length])
  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))
  }, [images.length])

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (images.length <= 1) return
      touchStartX.current = e.touches[0].clientX
    },
    [images.length]
  )
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (images.length <= 1 || touchStartX.current === null) return
      const endX = e.changedTouches[0].clientX
      const diff = touchStartX.current - endX
      if (Math.abs(diff) >= SWIPE_THRESHOLD) {
        if (diff > 0) goNext()
        else goPrev()
      }
      touchStartX.current = null
    },
    [images.length, goNext, goPrev]
  )

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const sectorBadgeColor =
    project.sector === 'industrial'
      ? 'text-[#10064B] bg-[#e8ecf5]'
      : project.sector === 'maritime'
        ? 'text-[#0891b2] bg-[#ecfeff]'
        : 'text-[#7c3aed] bg-[#f5f3ff]'

  const highlightSpec = project.specs.capacity ?? project.specs.powerCapacity
  const specLabel = project.specs.capacity ? 'useCases.spec.capacity' : 'useCases.spec.powerCapacity'

  const hasImages = images.length > 0
  const currentImage = hasImages ? images[currentIndex] : null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-neutral-900/60 p-0 md:items-center md:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-[16px] bg-white shadow-xl animate-slide-up md:h-[560px] md:w-[900px] md:max-w-[95vw] md:flex-row md:rounded-[10px] md:animate-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top: Carousel (mobile) / Left (desktop) */}
        <div className="relative flex h-[280px] shrink-0 overflow-hidden md:h-full md:w-[55%]">
          {/* Sector tag - top left */}
          <span
            className={`absolute left-3 top-3 z-20 rounded px-2.5 py-1 font-body text-caption font-semibold uppercase tracking-wider ${sectorBadgeColor}`}
          >
            {getSectorLabel(project.sector, t)}
          </span>
          {/* Close button - top right */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow-md transition-colors hover:bg-white hover:text-neutral-800"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative h-full w-full overflow-hidden bg-neutral-100 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {currentImage ? (
              <>
                <img
                  src={currentImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover blur-2xl scale-110"
                  aria-hidden
                />
                <img
                  src={currentImage}
                  alt=""
                  className="relative z-10 h-full w-full object-contain"
                />
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-100 text-neutral-400">
                <ImagePlaceholderIcon className="h-12 w-12 opacity-40" />
                <span className="font-body text-caption font-medium uppercase tracking-wider opacity-40">
                  {t('useCases.photoComingSoon')}
                </span>
              </div>
            )}
          </div>
          {hasImages && images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setCurrentIndex(i)
                  }}
                  className={`block h-10 w-10 shrink-0 overflow-hidden rounded border-2 transition-all ${
                    i === currentIndex ? 'border-white shadow-md' : 'border-white/40 hover:border-white/70'
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info panel */}
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-6">
          <div className="mb-4">
            <h2 id="project-modal-title" className="font-heading text-xl font-bold leading-tight tracking-tight text-neutral-900">
              {project.title}
            </h2>
          </div>
          <div className="mb-4 flex items-center gap-1.5 font-body text-body-sm text-neutral-500">
            <LocationIcon className="h-4 w-4 shrink-0" />
            {project.location}
          </div>
          <div className="mb-4 grid grid-cols-2 gap-3">
            {highlightSpec && (
              <div className="rounded-md bg-[#e8ecf5] p-3">
                <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
                  {t(specLabel)}
                </div>
                <div className="font-heading text-body-sm font-semibold text-[#10064B]">{highlightSpec}</div>
              </div>
            )}
            {project.specs.solar !== undefined && (
              <div className="rounded-md bg-neutral-100 p-3">
                <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
                  {t('useCases.spec.solar')}
                </div>
                <div className="font-heading text-body-sm font-semibold text-neutral-900">{project.specs.solar}</div>
              </div>
            )}
            {project.specs.container && (
              <div className="rounded-md bg-neutral-100 p-3">
                <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
                  {t('useCases.spec.container')}
                </div>
                <div className="font-heading text-body-sm font-semibold text-neutral-900">{project.specs.container}</div>
              </div>
            )}
            {project.specs.installation && (
              <div className="rounded-md bg-neutral-100 p-3">
                <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
                  {t('useCases.spec.installation')}
                </div>
                <div className="font-heading text-body-sm font-semibold text-neutral-900">{project.specs.installation}</div>
              </div>
            )}
            {project.specs.vesselType && (
              <div className="rounded-md bg-neutral-100 p-3">
                <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
                  {t('useCases.spec.vesselType')}
                </div>
                <div className="font-heading text-body-sm font-semibold text-neutral-900">{project.specs.vesselType}</div>
              </div>
            )}
            <div className="rounded-md bg-neutral-100 p-3">
              <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
                {t('useCases.spec.country')}
              </div>
              <div className="font-heading text-body-sm font-semibold text-neutral-900">{project.specs.country}</div>
            </div>
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            {project.useTags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-body text-caption font-medium tracking-wider text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function UseCases() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const searchQuery = ''
  const [selectedProject, setSelectedProject] = useState<UseCaseProject | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const allProjects = useMemo(() => USE_CASE_PROJECTS, [])

  useEffect(() => {
    const onScroll = () => {
      const el = progressRef.current
      if (!el) return
      const d = document.documentElement
      const pct = d.scrollHeight - d.clientHeight > 0 ? (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100 : 0
      el.style.width = `${pct}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filteredProjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return allProjects.filter((p) => {
      let matchFilter = true
      if (activeFilter !== 'all') {
        if (activeFilter === 'industrial') matchFilter = p.sector === 'industrial'
        else if (activeFilter === 'offgrid') matchFilter = p.sector === 'offgrid'
        else if (activeFilter === 'maritime') matchFilter = p.sector === 'maritime'
        else if (activeFilter === 'solar') matchFilter = p.solar
        else if (activeFilter === 'container') matchFilter = p.type === 'container'
        else if (activeFilter === 'cabinet') matchFilter = p.type === 'cabinet'
      }
      const searchText = `${p.title} ${p.location} ${p.id} ${p.loc}`.toLowerCase()
      const matchSearch = !q || searchText.includes(q)
      return matchFilter && matchSearch
    })
  }, [activeFilter, searchQuery, allProjects])

  const filterCounts = useMemo(() => {
    const all = allProjects.length
    const industrial = allProjects.filter((p) => p.sector === 'industrial').length
    const offgrid = allProjects.filter((p) => p.sector === 'offgrid').length
    const maritime = allProjects.filter((p) => p.sector === 'maritime').length
    const solar = allProjects.filter((p) => p.solar).length
    const container = allProjects.filter((p) => p.type === 'container').length
    const cabinet = allProjects.filter((p) => p.type === 'cabinet').length
    return { all, industrial, offgrid, maritime, solar, container, cabinet }
  }, [allProjects])

  const filterConfig: { key: FilterType; labelKey: string; count?: number }[] = [
    { key: 'all', labelKey: 'useCases.filters.all', count: filterCounts.all },
    { key: 'industrial', labelKey: 'useCases.filters.industrial', count: filterCounts.industrial },
    { key: 'offgrid', labelKey: 'useCases.filters.offgrid', count: filterCounts.offgrid },
    { key: 'maritime', labelKey: 'useCases.filters.maritime', count: filterCounts.maritime },
    { key: 'solar', labelKey: 'useCases.filters.solar', count: filterCounts.solar },
    { key: 'container', labelKey: 'useCases.filters.container', count: filterCounts.container },
    { key: 'cabinet', labelKey: 'useCases.filters.cabinet', count: filterCounts.cabinet },
  ]

  return (
    <>
      <SEOHead
        title={`${t('useCases.meta.title')} | Baterino`}
        description={t('useCases.meta.description')}
        ogImage="/images/og-images/og-use-cases.jpg"
      />
      <article className="w-full bg-white">
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="fixed left-0 top-0 z-[300] h-0.5 bg-[#10064B] transition-[width] duration-75 ease-linear"
          style={{ width: '0%' }}
        />

        {/* Hero */}
        <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:flex-row lg:items-start lg:gap-4">
            {/* Left: heading + paragraph */}
            <div className="flex-1 text-left">
              <img
                src="/images/lithtech-logo.webp"
                alt="LithTech"
                className="mb-4 h-8 w-auto object-contain sm:h-10"
              />
              <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                {t('useCases.hero.title')}
                <br />
                <span className="text-[#10064B]">{t('useCases.hero.titleHighlight')}</span>
              </h1>
              <p className="mt-4 max-w-[600px] font-body text-body-md leading-relaxed text-neutral-600">
                {t('useCases.hero.subtitle')}
              </p>
            </div>
            {/* Right: stats boxes */}
            <div className="grid grid-cols-2 gap-3 lg:w-auto">
              <div className="flex flex-col gap-1 rounded-[10px] border border-neutral-200 bg-neutral-50 px-6 py-4 min-w-[120px]">
                <span className="font-heading text-2xl font-semibold leading-none text-neutral-900">39</span>
                <span className="font-body text-caption uppercase tracking-wider text-neutral-500">{t('useCases.stats.total')}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-[10px] border border-neutral-200 bg-neutral-50 px-6 py-4 min-w-[120px]">
                <span className="font-heading text-2xl font-semibold leading-none text-neutral-900">7</span>
                <span className="font-body text-caption uppercase tracking-wider text-neutral-500">{t('useCases.stats.countries')}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-[10px] border border-neutral-200 bg-neutral-50 px-6 py-4 min-w-[120px]">
                <span className="font-heading text-2xl font-semibold leading-none text-neutral-900">28</span>
                <span className="font-body text-caption uppercase tracking-wider text-neutral-500">{t('useCases.stats.inSweden')}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-[10px] border border-neutral-200 bg-neutral-50 px-6 py-4 min-w-[120px]">
                <span className="font-heading text-2xl font-semibold leading-none text-neutral-900">4.18 MWh</span>
                <span className="font-body text-caption uppercase tracking-wider text-neutral-500">{t('useCases.stats.largest')}</span>
              </div>
              <div className="flex flex-col gap-1 rounded-[10px] border border-neutral-200 bg-neutral-50 px-6 py-4 min-w-[120px]">
                <span className="font-heading text-2xl font-semibold leading-none text-neutral-900">11</span>
                <span className="font-body text-caption uppercase tracking-wider text-neutral-500">{t('useCases.stats.withSolar')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-16 z-[90] border-b border-neutral-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            {/* Mobile: dropdown */}
            <div className="relative md:hidden">
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value as FilterType)}
                className="w-full appearance-none rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pr-10 font-body text-body-sm font-medium text-neutral-900 focus:border-[#10064B] focus:outline-none focus:ring-2 focus:ring-[#10064B]/20"
                aria-label={t('useCases.filters.all')}
              >
                {filterConfig.map(({ key, labelKey, count }) => (
                  <option key={key} value={key}>
                    {t(labelKey)}
                    {count !== undefined ? ` (${count})` : ''}
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
            <div className="hidden flex-wrap items-center gap-3 md:flex">
              {filterConfig.map(({ key, labelKey, count }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveFilter(key)}
                  className={`rounded px-3.5 py-1.5 font-body text-caption font-medium uppercase tracking-wider transition-colors ${
                    activeFilter === key
                      ? 'bg-[#10064B] text-white border border-[#10064B]'
                      : 'border border-neutral-200 bg-neutral-50 text-neutral-500 hover:border-[#10064B] hover:text-[#10064B]'
                  }`}
                >
                  {t(labelKey)}
                  {count !== undefined && <span className="ml-1.5 text-current opacity-80">{count}</span>}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <p className="mb-6 font-body text-body-sm text-neutral-500">
              {t('useCases.showingCount', { count: filteredProjects.length })}
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  t={t}
                  index={i}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
            {selectedProject && (
              <ProjectModal
                project={selectedProject}
                t={t}
                onClose={() => setSelectedProject(null)}
              />
            )}
            {filteredProjects.length === 0 && (
              <p className="py-16 text-center font-body text-body-md text-neutral-500">{t('useCases.noMatch')}</p>
            )}
          </div>
        </section>
      </article>
    </>
  )
}
