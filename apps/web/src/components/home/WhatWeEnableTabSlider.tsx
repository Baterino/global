import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SECTORS = [
  {
    id: 'industrial',
    titleKey: 'home.whatWeEnable.industrial',
    descKey: 'home.whatWeEnable.industrialTabDesc',
    cardTitleKey: 'home.whatWeEnable.industrialCardTitle',
    cardDescKey: 'home.whatWeEnable.industrialDesc',
    image: '/images/Home/bess-solutions.jpg',
    to: '/solutions/industrial',
  },
  {
    id: 'residential',
    titleKey: 'home.whatWeEnable.residential',
    descKey: 'home.whatWeEnable.residentialTabDesc',
    cardTitleKey: 'home.whatWeEnable.residentialCardTitle',
    cardDescKey: 'home.whatWeEnable.residentialDesc',
    image: '/images/Home/residential-storage-solutions.jpg',
    to: '/solutions/residential',
  },
  {
    id: 'medical',
    titleKey: 'home.whatWeEnable.medical',
    descKey: 'home.whatWeEnable.medicalTabDesc',
    cardTitleKey: 'home.whatWeEnable.medicalCardTitle',
    cardDescKey: 'home.whatWeEnable.medicalDesc',
    image: '/images/Home/essential-critical-services.jpg',
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

type Sector = (typeof SECTORS)[number]

/** Mobile: horizontal snap slider. Slides are full track width (no +20px — avoids right clip in frame). md+: grid. */
const CAROUSEL_CLASS =
  'flex w-full min-w-0 snap-x snap-proximity gap-4 overflow-x-auto pb-1 scrollbar-hide md:grid md:snap-none md:grid-cols-2 md:gap-5 md:overflow-visible lg:grid-cols-4'

const SLIDE_CLASS =
  'max-md:w-full max-md:min-w-full max-md:snap-start max-md:scroll-ml-0 max-md:scroll-mr-0 max-md:shrink-0 md:w-auto md:min-w-0 md:shrink'

const CARD_CLASS =
  'group relative isolate block h-[480px] min-h-[480px] max-h-[480px] w-full overflow-hidden rounded-[10px] bg-zinc-300 outline-none ring-offset-2 transition-transform focus-visible:ring-2 focus-visible:ring-neutral-900'

/** Flat black overlay: 50% opacity. */
const OVERLAY_SOLID_STYLE = { backgroundColor: 'rgba(0,0,0,0.5)' } as const

/** Flat black overlay on hover (md+): 70% opacity. */
const OVERLAY_HOVER_STYLE = { backgroundColor: 'rgba(0,0,0,0.7)' } as const

const OVERLAY_BASE_CLASS =
  'pointer-events-none absolute inset-0 min-h-full min-w-full rounded-[10px] transition-opacity duration-300 ease-out'

function WhatWeEnableCard({ sector, href }: { sector: Sector; href: string }) {
  const { t } = useTranslation()

  return (
    <Link to={href} className={CARD_CLASS}>
      <img
        src={sector.image}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        draggable={false}
      />

      <div
        className={`${OVERLAY_BASE_CLASS} z-[1] opacity-100 md:group-hover:opacity-0`}
        style={OVERLAY_SOLID_STYLE}
        aria-hidden
      />

      <div
        className={`${OVERLAY_BASE_CLASS} z-[2] hidden opacity-0 md:block md:group-hover:opacity-100`}
        style={OVERLAY_HOVER_STYLE}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[25] flex justify-end p-4 sm:p-5">
        <img
          src="/images/baterino-logo-white.png"
          alt="Baterino"
          className="h-5 w-auto shrink-0 object-contain drop-shadow-sm sm:h-6"
          draggable={false}
        />
      </div>

      {/* Solid content — mobile: large title + body copy + CTA (hover has no reliable target); md+: title only until hover */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end transition-opacity duration-300 ease-out md:group-hover:pointer-events-none md:group-hover:opacity-0">
        <div className="relative p-4 sm:p-5">
          <h3 className="font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-xl md:lg:text-2xl">
            {t(sector.titleKey)}
          </h3>
          <p className="mt-3 font-body text-base font-medium leading-relaxed text-white/95 sm:text-body-md md:hidden">
            {t(sector.cardDescKey)}
          </p>
          <span className="mt-3 inline-block font-body text-body-sm font-semibold text-white underline-offset-2 md:hidden">
            {t('home.whatWeEnable.learnMore', { defaultValue: 'Learn more' })} →
          </span>
        </div>
      </div>

      {/* Hover content (md+) */}
      <div className="absolute inset-0 z-20 hidden flex-col justify-end md:flex md:pointer-events-none md:opacity-0 md:transition-opacity md:duration-300 md:ease-out md:group-hover:pointer-events-auto md:group-hover:opacity-100">
        <div className="relative z-10 p-4 sm:p-5">
          <h3 className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-white drop-shadow-sm sm:text-xl">
            {t(sector.cardTitleKey)}
          </h3>
          <p className="mt-2 font-body text-body-sm leading-relaxed text-white/95 sm:text-body-md">
            {t(sector.cardDescKey)}
          </p>
          <span className="mt-3 inline-block font-body text-body-sm font-semibold text-white underline-offset-2 group-hover:underline">
            {t('home.whatWeEnable.learnMore', { defaultValue: 'Learn more' })} →
          </span>
        </div>
      </div>
    </Link>
  )
}

export function WhatWeEnableTabSlider() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const syncActiveFromScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    if (window.matchMedia('(min-width: 768px)').matches) return

    const children = [...el.children] as HTMLElement[]
    if (children.length === 0) return

    const center = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      const mid = c.offsetLeft + c.clientWidth / 2
      const d = Math.abs(center - mid)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    }
    setActiveIndex(best)
  }, [])

  useLayoutEffect(() => {
    const el = trackRef.current
    if (!el || window.matchMedia('(min-width: 768px)').matches) return
    el.scrollLeft = 0
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    syncActiveFromScroll()
    el.addEventListener('scroll', syncActiveFromScroll, { passive: true })
    window.addEventListener('resize', syncActiveFromScroll)
    return () => {
      el.removeEventListener('scroll', syncActiveFromScroll)
      window.removeEventListener('resize', syncActiveFromScroll)
    }
  }, [syncActiveFromScroll])

  const goToSlide = (index: number) => {
    const el = trackRef.current
    if (!el) return
    const child = el.children[index] as HTMLElement | undefined
    if (!child) return
    el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' })
  }

  return (
    <div className="w-full min-w-0">
      <div ref={trackRef} className={CAROUSEL_CLASS}>
        {SECTORS.map((sector) => (
          <div key={sector.id} className={SLIDE_CLASS}>
            <WhatWeEnableCard sector={sector} href={`${base}${sector.to}`} />
          </div>
        ))}
      </div>

      <nav
        className="mt-5 flex justify-center gap-2 md:hidden"
        aria-label={t('home.whatWeEnable.sliderNav', { defaultValue: 'What we enable slides' })}
      >
        {SECTORS.map((sector, i) => (
          <button
            key={sector.id}
            type="button"
            aria-label={t('home.whatWeEnable.slideDot', {
              defaultValue: 'Go to slide {{n}}',
              n: i + 1,
            })}
            aria-current={activeIndex === i ? 'true' : undefined}
            className={`h-2.5 w-2.5 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 ${
              activeIndex === i ? 'bg-neutral-900' : 'bg-neutral-300 hover:bg-neutral-400'
            }`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </nav>
    </div>
  )
}
