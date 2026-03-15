import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { ArrowRightIcon } from '../ArrowRightIcon'
import { USE_CASE_PROJECTS, type UseCaseProject, type Sector } from '../../data/useCasesProjects'

const FEATURED_IDS = ['GS0030', 'GB008', 'GS0009'] as const

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

export function TechnologyProvenSection() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`
  const projects = FEATURED_IDS.map((id) => USE_CASE_PROJECTS.find((p) => p.id === id)).filter(
    (p): p is UseCaseProject => p != null
  )

  return (
    <section className="w-full border-t border-neutral-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Header */}
        <div className="mb-6 text-center md:text-left">
          <p className="font-body text-body-sm font-semibold uppercase tracking-widest text-[#323671]">
            {t('home.technologyProven.subtitle')}
          </p>
          <h2 className="mt-2 font-heading text-heading-lg font-bold uppercase tracking-tight text-black sm:text-section-title">
            {t('home.technologyProven.title')}
          </h2>
        </div>

        {/* Intro text */}
        <p className="mx-auto mb-10 max-w-[780px] text-center font-body text-body-md font-medium leading-relaxed text-neutral-600 md:mx-0 md:text-left">
          {t('home.technologyProven.intro')}
        </p>

        {/* 3 use case cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const images = getProjectImages(project)
            const firstImage = images[0]
            const sectorBadgeColor =
              project.sector === 'industrial'
                ? 'text-[#10064B] bg-[#e8ecf5]'
                : project.sector === 'maritime'
                  ? 'text-[#0891b2] bg-[#ecfeff]'
                  : 'text-[#7c3aed] bg-[#f5f3ff]'

            return (
              <Link
                key={project.id}
                to={`${base}/use-cases`}
                className="group flex flex-col overflow-hidden rounded-[10px] bg-[#f7f7f7] text-left transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(11,7,38,0.12)]"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
                  {firstImage ? (
                    <img
                      src={firstImage}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-400">
                      <svg className="h-12 w-12 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
                        <circle cx="8.5" cy="8.5" r="1.5" strokeWidth={1.5} />
                        <path d="M21 15l-5-5L5 21" strokeWidth={1.5} />
                      </svg>
                    </div>
                  )}
                  <span
                    className={`absolute left-3 top-3 rounded px-2 py-0.5 font-body text-caption font-semibold uppercase tracking-wider ${sectorBadgeColor}`}
                  >
                    {getSectorLabel(project.sector, t)}
                  </span>
                  <img
                    src="/images/lithtech-logo-white 3.png"
                    alt="LithTech"
                    className="absolute bottom-3 right-3 h-4 w-auto object-contain drop-shadow-sm sm:h-5"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="font-heading text-heading-sm font-bold leading-snug tracking-tight text-neutral-900">
                    {project.title}
                  </h3>
                  <p className="flex items-center gap-1.5 font-body text-body-sm text-neutral-500">
                    <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {project.location}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {(project.specs.capacity ?? project.specs.powerCapacity) && (
                      <div className="rounded-md bg-[#e8ecf5] p-2">
                        <div className="font-body text-caption font-semibold uppercase tracking-wider text-neutral-400">
                          {t(project.specs.capacity ? 'useCases.spec.capacity' : 'useCases.spec.powerCapacity')}
                        </div>
                        <div className="font-heading text-body-sm font-semibold text-[#10064B]">
                          {project.specs.capacity ?? project.specs.powerCapacity}
                        </div>
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
                  {project.useTags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.useTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-body text-caption font-medium tracking-wider text-neutral-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {/* See more button */}
        <div className="mt-10 flex justify-center md:justify-start">
          <Link
            to={`${base}/use-cases`}
            className="btn-primary inline-flex items-center gap-2"
          >
            {t('home.technologyProven.seeMore')}
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}
