import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const CAROUSEL_SLIDES = [
  {
    image: '/images/hero-slide1.jpg',
    mobileImage: '/images/hero-slider-mobile1.jpg',
    titleKey: 'home.heroSlides.slide1.title',
    subtitleKey: 'home.heroSlides.slide1.subtitle',
    to: 'solutions/industrial',
  },
  {
    image: '/images/hero-slide2.jpg',
    mobileImage: '/images/hero-slider-mobile2.jpg',
    titleKey: 'home.heroSlides.slide2.title',
    subtitleKey: 'home.heroSlides.slide2.subtitle',
    to: 'solutions/residential',
  },
  {
    image: '/images/hero-slide3.jpg',
    mobileImage: '/images/hero-slider-mobile3.jpg',
    titleKey: 'home.heroSlides.slide3.title',
    subtitleKey: 'home.heroSlides.slide3.subtitle',
    to: 'delivery',
  },
  {
    image: '/images/hero-slide4.jpg',
    mobileImage: '/images/hero-slider-mobile4.jpg',
    titleKey: 'home.heroSlides.slide4.title',
    subtitleKey: 'home.heroSlides.slide4.subtitle',
    to: 'impact',
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
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <Link
          to={base}
          className="mx-auto mb-6 flex w-fit md:hidden"
          aria-label="Baterino home"
        >
          <img
            src="/images/Baterino-Logo-black.png"
            alt="Baterino"
            className="h-7 w-auto"
          />
        </Link>

        {/* Card content: 1200 x 550 on desktop, full width on mobile */}
        <div className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-[10px]">
          <div className="group relative h-[400px] w-full overflow-hidden rounded-[10px] bg-zinc-300 md:h-[550px]">
            {/* Mobile image */}
            <img
              src={slide.mobileImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover md:hidden"
            />
            {/* Desktop image */}
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 hidden h-full w-full object-cover md:block"
            />
            {/* First card only: 30% black overlay on the image */}
            {activeTab === 0 && (
              <div className="absolute inset-0 rounded-[10px] bg-black/30" aria-hidden />
            )}
            {/* Full-slider overlay: black 55%, hidden on hover */}
            <div className="absolute inset-0 rounded-[10px] bg-black/55 opacity-100 transition-all duration-300 ease-in-out group-hover:opacity-0" />

            {/* Logo, title and subtitle over slider, hidden on hover */}
            <div className="pointer-events-none absolute left-1/2 top-[48%] z-[5] flex w-[98%] max-w-[98%] -translate-x-1/2 -translate-y-1/2 scale-100 flex-col items-center gap-4 px-4 text-center opacity-100 transition-all duration-300 ease-in-out group-hover:scale-[0.98] group-hover:opacity-0 sm:w-full sm:max-w-[1100px] lg:max-w-[1160px]">
              <img
                src="/images/baterino-logo-white.png"
                alt="Baterino"
                className="h-8 w-auto object-contain md:h-10"
              />
              <h1 className="font-publicSans text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-display-sm lg:text-display-md">
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
            <div className="absolute bottom-0 left-0 right-0 z-[5] flex flex-col items-center pb-6 pt-6 opacity-100 transition-opacity duration-300 group-hover:opacity-0 md:pb-8 md:pt-8">
              <span className="flex items-center gap-2 font-nunito text-sm font-medium uppercase tracking-wider text-white/90 md:text-base">
                <svg className="h-6 w-6 shrink-0 md:h-7 md:w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                </svg>
                {t('home.hero.hoverToExplore')}
              </span>
            </div>

            {/* Tab bar inside card — visible on hover only */}
            <div className="absolute left-1/2 top-4 z-20 w-full max-w-[793px] -translate-x-1/2 translate-y-1 px-4 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 md:top-6">
              <div className="relative h-10 w-[793px] max-w-full rounded-[20px]">
                <div className="absolute left-[1px] top-0 h-10 w-[calc(100%-1px)] max-w-[792px] rounded-[20px] bg-white/40 backdrop-blur-sm" />
                <div
                  className="absolute top-0 h-10 w-44 rounded-[20px] bg-zinc-300 transition-all duration-200 ease-out"
                  style={{
                    left: `calc(${activeTab * 25}% + (25% - 11rem) / 2)`,
                  }}
                />
                <div className="relative flex h-10 w-full">
                  {(['C&I BESS', 'industrial', 'after sales', 'SOCIAL IMPACT'] as const).map((label, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveTab(i)}
                      className="flex flex-1 items-center justify-center font-sans text-base font-semibold uppercase leading-6 text-black transition-colors hover:opacity-90"
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
            <div className="absolute inset-0 flex flex-col pt-20 translate-y-2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 md:pt-24">
              <div className="flex flex-1 flex-col justify-end px-5 pb-4 md:flex-row md:items-end md:justify-between md:px-10 md:pb-10">
                <div className="max-w-[90%] md:max-w-[55%]">
                  <h2 className="font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-white md:font-nunito md:text-3xl md:font-black lg:text-4xl">
                    {t(slide.titleKey)}
                  </h2>
                  <p className="mt-3 font-body text-base font-normal leading-snug text-white/95 md:mt-4 md:text-lg md:leading-7 lg:text-xl lg:leading-8">
                    {t(slide.subtitleKey)}
                  </p>
                </div>
                <Link
                  to={`${base}/${slide.to}`}
                  className="mt-4 inline-flex w-fit items-center justify-center rounded-[5px] bg-white/95 px-6 py-3 font-body text-base font-bold text-neutral-900 shadow-sm transition-opacity hover:opacity-95 md:mt-0 md:px-8 md:py-3"
                >
                  {t('home.carousel.learnMore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
