/**
 * Backup of Hero mobile layout — 8 horizontal cards with first card content overlay.
 * Restore by copying the mobile section (lines 51–100) back into Hero.tsx
 */
import { useTranslation } from 'react-i18next'

const MOBILE_SLIDER_IMAGES = Array.from({ length: 8 }, (_, i) => `/images/mobile%20slider/slide${i + 1}.jpg`)

export function HeroMobileCardsBackup() {
  const { t } = useTranslation()

  return (
    <section className="relative w-full bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-0 pb-8 sm:px-6 md:pt-12 lg:px-8">
        {/* Mobile: 8 cards — break out of container, overflow visible */}
        <div className="-mx-4 flex h-[500px] w-[calc(100%+2rem)] gap-[10px] overflow-x-auto px-4 md:hidden">
          {MOBILE_SLIDER_IMAGES.map((src, i) => (
            <div key={i} className="relative min-w-[320px] flex-1 shrink-0">
              <div className="absolute inset-0 rounded-[10px] bg-zinc-300" />
              <img
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full rounded-[10px] object-cover"
                draggable={false}
              />
              {i === 0 && (
                <>
                  <div className="absolute inset-0 rounded-[10px] bg-black/70" aria-hidden />
                  <div className="absolute inset-0 flex flex-col justify-end px-4 pb-8">
                    <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                      <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                    <img
                      src="/images/baterino-logo-white.png"
                      alt="Baterino"
                      className="mx-auto mb-4 h-8 w-auto object-contain"
                    />
                    <h2 className="text-center font-sans text-3xl font-bold uppercase leading-8 text-white">
                      Enabling high capacity energy storage worldwide
                    </h2>
                    <p className="mt-4 text-center font-sans text-lg font-medium leading-6 text-white">
                      We integrate trusted green energy technologies to deliver reliable solutions for communities, industry, medical and maritime environments.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 font-sans text-sm font-normal text-white/90">
                      <span>{t('home.hero.poweredByLabel')}</span>
                      <a
                        href="https://www.ltc-energy.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-100"
                        aria-label="LithTech"
                      >
                        <img src="/images/lithtech-logo-white 3.png" alt="LithTech" className="h-5 w-auto object-contain" />
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
