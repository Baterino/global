import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const MOBILE_SLIDER_IMAGES = Array.from({ length: 8 }, (_, i) => `/images/mobile%20slider/slide${i + 1}.jpg`)

const CAROUSEL_SLIDES = [
  {
    image: '/images/hero-slide1.jpg',
    mobileImage: '/images/hero-slider-mobile1.jpg',
    titleKey: 'home.heroSlides.slide1.title',
    subtitleKey: 'home.heroSlides.slide1.subtitle',
    to: 'solutions/industrial',
    buttonKey: 'home.carousel.exploreMore',
  },
  {
    image: '/images/hero-slide2.jpg',
    mobileImage: '/images/hero-slider-mobile2.jpg',
    titleKey: 'home.heroSlides.slide2.title',
    subtitleKey: 'home.heroSlides.slide2.subtitle',
    to: 'solutions/residential',
    buttonKey: 'home.carousel.learnMore',
  },
  {
    image: '/images/slide3-mission-critical.jpg',
    mobileImage: '/images/slide3-mission-critical.jpg',
    titleKey: 'home.heroSlides.slide5.title',
    subtitleKey: 'home.heroSlides.slide5.subtitle',
    to: 'impact',
    buttonKey: 'home.carousel.learnMore',
  },
  {
    image: '/images/hero-slide3.jpg',
    mobileImage: '/images/hero-slider-mobile3.jpg',
    titleKey: 'home.heroSlides.slide3.title',
    subtitleKey: 'home.heroSlides.slide3.subtitle',
    to: 'delivery',
    buttonKey: 'home.carousel.learnMore',
  },
]

export function Hero() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`
  const [activeTab, setActiveTab] = useState(0)
  const slide = CAROUSEL_SLIDES[activeTab]

  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-0 pb-8 sm:px-6 md:pt-12 lg:px-8">
        {/* Mobile: text above cards */}
        <div className="mb-8 flex flex-col items-center px-4 text-center md:hidden">
          <h2 className="font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-neutral-900">
            {t('home.hero.title')}
          </h2>
        </div>

        {/* Mobile: 8 cards — aspect ratio + percentage width */}
        <div className="-mx-4 flex w-[calc(100%+2rem)] gap-[10px] overflow-x-auto px-4 scrollbar-hide md:hidden">
          {MOBILE_SLIDER_IMAGES.map((src, i) => (
            <div key={i} className="relative aspect-[320/500] w-[85vw] min-w-[85vw] shrink-0 sm:w-[75vw] sm:min-w-[75vw]">
              <div className="absolute inset-0 rounded-[10px] bg-zinc-300" />
              <img
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full rounded-[10px] object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 rounded-[10px] bg-black/40" aria-hidden />
              {i === MOBILE_SLIDER_IMAGES.length - 1 ? (
                <div className="absolute left-0 top-0 pt-4 pl-4" aria-hidden>
                  <svg className="h-6 w-6 text-white sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </div>
              ) : (
                <div className="absolute right-0 top-0 pt-4 pr-4" aria-hidden>
                  <svg className="h-6 w-6 text-white sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
              {i === 0 && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-end justify-end gap-3 px-4 pb-8 pt-4 text-right">
                  <h3 className="font-heading text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl">
                    {t('home.heroSlides.slide1.title')}
                  </h3>
                  <div className="flex flex-wrap items-center justify-end gap-1.5 font-nunito text-xs font-normal text-white/90">
                    <span>{t('home.hero.poweredByLabel')}</span>
                    <a
                      href="https://www.ltc-energy.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-100"
                      aria-label="LithTech"
                    >
                      <img src="/images/lithtech-logo-white 3.png" alt="LithTech" className="h-4 w-auto object-contain sm:h-5" />
                    </a>
                  </div>
                </div>
              )}
              {i === 1 && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end px-4 pb-8 pt-4 text-left">
                  <p className="font-body text-base font-normal leading-relaxed text-white/95 sm:text-lg">
                    {t('home.heroSlides.slide1.subtitle')}
                  </p>
                </div>
              )}
              {i === 2 && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-end justify-end gap-3 px-4 pb-8 pt-4 text-right">
                  <h3 className="font-heading text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl">
                    {t('home.heroSlides.slide2.title')}
                  </h3>
                  <div className="flex flex-wrap items-center justify-end gap-1.5 font-nunito text-xs font-normal text-white/90">
                    <span>{t('home.hero.poweredByLabel')}</span>
                    <a
                      href="https://www.ltc-energy.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-100"
                      aria-label="LithTech"
                    >
                      <img src="/images/lithtech-logo-white 3.png" alt="LithTech" className="h-4 w-auto object-contain sm:h-5" />
                    </a>
                  </div>
                </div>
              )}
              {i === 3 && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end px-4 pb-8 pt-4 text-left">
                  <p className="font-body text-base font-normal leading-relaxed text-white/95 sm:text-lg">
                    {t('home.heroSlides.slide2.subtitle')}
                  </p>
                </div>
              )}
              {i === 4 && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-end justify-end gap-3 px-4 pb-8 pt-4 text-right">
                  <h3 className="font-heading text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl">
                    {t('home.heroSlides.slide5.title')}
                  </h3>
                  <div className="flex flex-wrap items-center justify-end gap-1.5 font-nunito text-xs font-normal text-white/90">
                    <span>{t('home.hero.poweredByLabel')}</span>
                    <a
                      href="https://www.ltc-energy.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-100"
                      aria-label="LithTech"
                    >
                      <img src="/images/lithtech-logo-white 3.png" alt="LithTech" className="h-4 w-auto object-contain sm:h-5" />
                    </a>
                  </div>
                </div>
              )}
              {i === 5 && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end px-4 pb-8 pt-4 text-left">
                  <p className="font-body text-base font-normal leading-relaxed text-white/95 sm:text-lg">
                    {t('home.heroSlides.slide5.subtitle')}
                  </p>
                </div>
              )}
              {i === 6 && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-end justify-end gap-3 px-4 pb-8 pt-4 text-right">
                  <h3 className="font-heading text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl">
                    {t('home.heroSlides.slide3.title')}
                  </h3>
                  <div className="flex flex-wrap items-center justify-end gap-1.5 font-nunito text-xs font-normal text-white/90">
                    <span>{t('home.hero.poweredByLabel')}</span>
                    <a
                      href="https://www.ltc-energy.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-100"
                      aria-label="LithTech"
                    >
                      <img src="/images/lithtech-logo-white 3.png" alt="LithTech" className="h-4 w-auto object-contain sm:h-5" />
                    </a>
                  </div>
                </div>
              )}
              {i === 7 && (
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end px-4 pb-8 pt-4 text-left">
                  <p className="font-body text-base font-normal leading-relaxed text-white/95 sm:text-lg">
                    {t('home.heroSlides.slide3.subtitle')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: 4-slide card with tabs */}
        <div className="mx-auto hidden w-full max-w-[1200px] overflow-hidden rounded-[10px] md:block">
          <div className="group relative h-[550px] w-full overflow-hidden rounded-[10px] bg-zinc-300">
            <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            {/* Full-slider overlay: black 55%, hidden on hover — pointer-events-none so it never blocks clicks */}
            <div className="pointer-events-none absolute inset-0 rounded-[10px] bg-black/55 opacity-100 transition-all duration-300 ease-in-out group-hover:opacity-0" />
            {/* Bottom-to-top overlay on all slides */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/70 via-black/30 to-transparent"
              aria-hidden
            />

            {/* Logo, title and subtitle over slider, hidden on hover */}
            <div className="pointer-events-none absolute left-1/2 top-[48%] z-[5] flex w-[98%] max-w-[98%] -translate-x-1/2 -translate-y-1/2 scale-100 flex-col items-center gap-4 px-4 text-center opacity-100 transition-all duration-300 ease-in-out group-hover:scale-[0.98] group-hover:opacity-0 sm:w-full sm:max-w-[1100px] lg:max-w-[1160px]">
              <img
                src="/images/baterino-logo-white.png"
                alt="Baterino"
                className="h-8 w-auto object-contain md:h-10"
              />
              <h1 className="mx-auto max-w-[720px] font-publicSans text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-display-sm lg:text-display-md">
                {t('home.hero.title')}
              </h1>
              <p className="max-w-[640px] font-body text-base font-normal leading-relaxed text-white/95 md:text-body-lg">
                {t('home.hero.subtitle')}
              </p>
              {/* Powered by: LithTech — under subtitle */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 font-nunito text-xs font-normal text-white/90 md:mt-5 md:text-body-sm [pointer-events:auto]">
                <span>{t('home.hero.poweredByLabel')}</span>
                <a
                  href="https://www.ltc-energy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-100"
                  aria-label="LithTech"
                >
                  <img src="/images/lithtech-logo-white 3.png" alt="LithTech" className="h-4 w-auto object-contain md:h-5" />
                </a>
              </div>
            </div>

            {/* Bottom: Hover to explore — lower, hidden on hover */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] flex flex-col items-center pb-6 pt-6 opacity-100 transition-opacity duration-300 group-hover:opacity-0 md:pb-8 md:pt-8">
              <span className="flex items-center gap-2 font-nunito text-sm font-medium uppercase tracking-wider text-white/90 md:text-base">
                <svg className="h-6 w-6 shrink-0 md:h-7 md:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                </svg>
                {t('home.hero.hoverToExplore')}
              </span>
            </div>

            {/* Tab bar inside card — visible on hover only */}
            <div className="absolute left-1/2 top-4 z-20 w-full max-w-[840px] -translate-x-1/2 translate-y-1 px-4 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 md:top-6">
              <div className="relative h-10 w-full max-w-[840px] rounded-[20px] overflow-hidden">
                <div className="absolute inset-0 rounded-[20px] bg-white/55 backdrop-blur-sm" />
                <div
                  className="absolute inset-y-0 w-44 origin-center scale-x-[1.12] rounded-full bg-white/55 backdrop-blur-sm shadow-[0_0_0_3px_rgba(255,255,255,0.5)] transition-all duration-200 ease-out"
                  style={{
                    left: `calc(${activeTab * 25}% + (25% - 11rem) / 2)`,
                  }}
                />
                <div className="relative flex h-10 w-full">
                  {(['INDUSTRIAL BESS', 'residential', 'MISSION CRITICAL', 'after sales'] as const).map((label, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveTab(i)}
                      className="flex flex-1 items-center justify-center font-sans text-base font-semibold uppercase leading-6 text-black [text-shadow:0_1px_2px_rgba(255,255,255,0.8)] transition-colors hover:opacity-90"
                      aria-label={label}
                      aria-selected={activeTab === i}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content: all cards hidden until hover. */}
            <div className="absolute inset-0 z-10 flex flex-col pt-20 translate-y-2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 md:pt-24">
              <div className="flex flex-1 flex-col justify-end px-5 pb-4 md:flex-row md:items-end md:justify-between md:px-10 md:pb-10">
                <div className="max-w-[90%] md:max-w-[55%]">
                  <h2 className="font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-white md:font-nunito md:text-3xl md:font-black lg:text-4xl">
                    {t(slide.titleKey)}
                  </h2>
                  <p className="mt-3 font-body text-base font-normal leading-tight text-white/95 md:mt-4 md:text-lg md:leading-6 lg:text-xl lg:leading-7">
                    {t(slide.subtitleKey)}
                  </p>
                </div>
                <Link
                  to={activeTab === 0 ? `${base}/solutions/industrial` : `${base}/${slide.to}`}
                  className="relative z-20 mt-4 inline-flex w-fit items-center justify-center rounded-[5px] bg-white/95 px-6 py-3 font-body text-base font-bold text-neutral-900 shadow-sm transition-opacity hover:opacity-95 md:mt-0 md:px-8 md:py-3"
                >
                  {t(slide.buttonKey ?? 'home.carousel.learnMore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
