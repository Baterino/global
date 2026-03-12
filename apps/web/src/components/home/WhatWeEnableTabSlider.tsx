import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SECTORS = [
  {
    id: 'industrial',
    titleKey: 'home.whatWeEnable.industrial',
    descKey: 'home.whatWeEnable.industrialTabDesc',
    cardTitleKey: 'home.whatWeEnable.industrialCardTitle',
    cardDescKey: 'home.whatWeEnable.industrialDesc',
    image: '/images/Home/enable-industrial.jpg',
    to: '/solutions/industrial',
  },
  {
    id: 'residential',
    titleKey: 'home.whatWeEnable.residential',
    descKey: 'home.whatWeEnable.residentialTabDesc',
    cardTitleKey: 'home.whatWeEnable.residentialCardTitle',
    cardDescKey: 'home.whatWeEnable.residentialDesc',
    image: '/images/Home/enable-residential.jpg',
    to: '/solutions/residential',
  },
  {
    id: 'medical',
    titleKey: 'home.whatWeEnable.medical',
    descKey: 'home.whatWeEnable.medicalTabDesc',
    cardTitleKey: 'home.whatWeEnable.medicalCardTitle',
    cardDescKey: 'home.whatWeEnable.medicalDesc',
    image: '/images/Home/enable-medical.jpg',
    to: '/solutions/industrial',
  },
  {
    id: 'maritime',
    titleKey: 'home.whatWeEnable.maritime',
    descKey: 'home.whatWeEnable.maritimeTabDesc',
    cardTitleKey: 'home.whatWeEnable.maritimeCardTitle',
    cardDescKey: 'home.whatWeEnable.maritimeDesc',
    image: '/images/Home/enable-maritime.jpg',
    to: '/solutions/maritime',
  },
] as const

export function WhatWeEnableTabSlider() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`
  const [activeIndex, setActiveIndex] = useState(0)
  const [, setIndicatorStyle] = useState({ top: 0, height: 0 })
  const [desktopIndicatorStyle, setDesktopIndicatorStyle] = useState({ top: 0, height: 0 })
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const tabWrapperRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const desktopContainerRef = useRef<HTMLDivElement>(null)
  const active = SECTORS[activeIndex]

  const updateMobileIndicator = useCallback(() => {
    const wrapper = tabWrapperRefs.current[activeIndex]
    const container = containerRef.current
    if (wrapper && container) {
      const wrapperRect = wrapper.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      setIndicatorStyle({
        top: wrapperRect.top - containerRect.top + container.scrollTop,
        height: wrapperRect.height,
      })
    }
  }, [activeIndex])

  const updateDesktopIndicator = useCallback(() => {
    const btn = tabRefs.current[activeIndex]
    const container = desktopContainerRef.current
    if (btn && container) {
      const btnRect = btn.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      setDesktopIndicatorStyle({
        top: btnRect.top - containerRect.top + container.scrollTop,
        height: btnRect.height,
      })
    }
  }, [activeIndex])

  useEffect(() => {
    updateMobileIndicator()
    updateDesktopIndicator()
    requestAnimationFrame(() => {
      updateMobileIndicator()
      updateDesktopIndicator()
    })
  }, [updateMobileIndicator, updateDesktopIndicator])

  useEffect(() => {
    const mobile = containerRef.current
    const desktop = desktopContainerRef.current
    const update = () => {
      updateMobileIndicator()
      updateDesktopIndicator()
    }
    const ro = new ResizeObserver(update)
    if (mobile) ro.observe(mobile)
    if (desktop) ro.observe(desktop)
    return () => ro.disconnect()
  }, [updateMobileIndicator, updateDesktopIndicator])

  return (
    <>
      {/* Mobile: tabs with arrows, images expand under each tab */}
      <div ref={containerRef} className="relative flex flex-col gap-4 rounded-lg bg-[#f7f7f7] p-2 md:hidden">
        {SECTORS.map((sector, i) => {
          const isActive = i === activeIndex
          return (
            <div
              key={sector.id}
              ref={(el) => { tabWrapperRefs.current[i] = el }}
              className="relative z-10 flex flex-col gap-4"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="group flex w-full items-start justify-between gap-3 rounded-lg px-3 py-2 text-left transition-colors sm:px-4 sm:py-2.5 hover:bg-neutral-50/50"
              >
                <div className="flex min-w-0 flex-1 flex-col items-start">
                  <span
                    className={`font-heading text-body-sm font-bold uppercase tracking-tight sm:text-heading-sm ${
                      isActive ? 'text-neutral-900' : 'text-neutral-700'
                    }`}
                  >
                    {t(sector.titleKey)}
                  </span>
                  <span
                    className={`mt-1 block font-body text-xs leading-relaxed sm:text-body-sm ${
                      isActive ? 'text-neutral-900' : 'text-neutral-600'
                    }`}
                  >
                    {t(sector.descKey)}
                  </span>
                </div>
                <svg
                  className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-200 ${
                    isActive ? 'rotate-90 text-neutral-900' : ''
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              {isActive && (
                <div className="relative h-[280px] w-full overflow-hidden rounded-[10px] bg-zinc-300 sm:h-[360px]">
                  <Link
                    to={`${base}${sector.to}`}
                    className="group relative block h-full w-full animate-slide-down"
                  >
                    <img
                      src={sector.image}
                      alt=""
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 rounded-[10px] bg-black/40" aria-hidden />
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6">
                      <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white drop-shadow-sm sm:text-2xl">
                        {t(sector.cardTitleKey)}
                      </h3>
                      <p className="mt-2 max-w-[560px] font-body text-body-sm leading-relaxed text-white/95 sm:text-body-md">
                        {t(sector.cardDescKey)}
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Desktop: original layout — tabs left, image right (no arrows, no expand) */}
      <div className="hidden grid-cols-1 items-center gap-8 md:grid lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-12">
        <div ref={desktopContainerRef} className="relative flex flex-col gap-4">
          <div
            className="absolute left-0 right-0 rounded-lg transition-all duration-300 ease-out"
            style={{
              top: desktopIndicatorStyle.top,
              height: desktopIndicatorStyle.height,
              backgroundColor: '#f7f7f7',
            }}
            aria-hidden
          />
          {SECTORS.map((sector, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={sector.id}
                ref={(el) => { tabRefs.current[i] = el }}
                type="button"
                onClick={() => setActiveIndex(i)}
                className="relative z-10 group flex flex-col items-start rounded-lg px-3 py-2 text-left transition-colors sm:px-4 sm:py-2.5 hover:bg-neutral-50/50"
              >
                <span
                  className={`font-heading text-body-sm font-bold uppercase tracking-tight sm:text-heading-sm ${
                    isActive ? 'text-neutral-900' : 'text-neutral-700'
                  }`}
                >
                  {t(sector.titleKey)}
                </span>
                <span
                  className={`mt-1 block font-body text-xs leading-relaxed sm:text-body-sm ${
                    isActive ? 'text-neutral-900' : 'text-neutral-600'
                  }`}
                >
                  {t(sector.descKey)}
                </span>
              </button>
            )
          })}
        </div>
        <div className="relative h-[320px] w-full overflow-hidden rounded-[10px] bg-zinc-300 sm:h-[400px] lg:h-[460px] lg:max-w-[772px]">
          <Link
            key={activeIndex}
            to={`${base}${active.to}`}
            className="group relative block h-full w-full animate-fade-in"
          >
            <img
              src={active.image}
              alt=""
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 rounded-[10px] bg-black/40" aria-hidden />
            <img
              src="/images/baterino-logo-white.png"
              alt="Baterino"
              className="absolute right-4 top-4 z-10 h-8 w-auto object-contain drop-shadow-sm sm:right-6 sm:top-6 sm:h-10"
            />
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 lg:p-8">
              <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white drop-shadow-sm sm:text-2xl lg:text-section-title">
                {t(active.cardTitleKey)}
              </h3>
              <p className="mt-2 max-w-[560px] font-body text-body-sm leading-relaxed text-white/95 sm:text-body-md">
                {t(active.cardDescKey)}
              </p>
              <span className="mt-4 inline-block font-body text-body-sm font-semibold text-white underline-offset-2 group-hover:underline">
                {t('home.whatWeEnable.learnMore', { defaultValue: 'Learn more' })} →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
