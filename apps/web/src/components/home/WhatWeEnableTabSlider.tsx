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
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 })
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const active = SECTORS[activeIndex]

  const updateIndicator = useCallback(() => {
    const btn = tabRefs.current[activeIndex]
    const container = containerRef.current
    if (btn && container) {
      const btnRect = btn.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      setIndicatorStyle({
        top: btnRect.top - containerRect.top + container.scrollTop,
        height: btnRect.height,
      })
    }
  }, [activeIndex])

  useEffect(() => {
    updateIndicator()
    requestAnimationFrame(updateIndicator)
  }, [updateIndicator])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ro = new ResizeObserver(updateIndicator)
    ro.observe(container)
    return () => ro.disconnect()
  }, [updateIndicator])

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-12">
      {/* Left: vertical tabs */}
      <div ref={containerRef} className="relative flex flex-col gap-4">
        {/* Sliding background indicator */}
        <div
          className="absolute left-0 right-0 rounded-lg bg-neutral-100 transition-all duration-300 ease-out"
          style={{
            top: indicatorStyle.top,
            height: indicatorStyle.height,
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

      {/* Right: content area — 772×460px */}
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
              {t(('cardTitleKey' in active && active.cardTitleKey) ? active.cardTitleKey : active.titleKey)}
            </h3>
            <p className="mt-2 max-w-[560px] font-body text-body-sm leading-relaxed text-white/95 sm:text-body-md">
              {t(('cardDescKey' in active && active.cardDescKey) ? active.cardDescKey : active.descKey)}
            </p>
            <span className="mt-4 inline-block font-body text-body-sm font-semibold text-white underline-offset-2 group-hover:underline">
              {t('home.whatWeEnable.learnMore', { defaultValue: 'Learn more' })} →
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
