import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageWithLogo } from '../components/ImageWithLogo'
import { MaritimeDeliverySlider } from '../components/maritime/MaritimeDeliverySlider'

export function SolutionsMaritime() {
  const { t } = useTranslation()
  const [systemsSafetyOpen, setSystemsSafetyOpen] = useState(false)

  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-mobile-h1 font-extrabold uppercase leading-tight tracking-tight text-neutral-900 opacity-90 sm:mx-auto sm:max-w-[720px] lg:max-w-[780px] lg:text-display-sm lg:leading-[1.2] xl:text-display-md xl:leading-[1.15]">
            {t('maritime.hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-[740px] font-body text-mobile-body font-medium leading-relaxed text-neutral-600 lg:text-body-md">
            {t('maritime.hero.subtitle')}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 font-nunito text-body-sm font-normal text-neutral-500">
            <span>{t('home.hero.poweredBy')}</span>
            <a
              href="https://www.ltc-energy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <img src="/images/lithtech-logo.webp" alt="LithTech" className="h-5 w-auto object-contain" />
            </a>
          </div>
        </div>
      </section>

      {/* Marine Battery Energy Storage Systems Section */}
      <section className="w-full bg-white px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-4 text-center font-heading text-mobile-h2 font-bold uppercase tracking-tight text-neutral-900 lg:mb-6 lg:text-left lg:text-2xl xl:text-3xl">
            {t('maritime.systems.title')}
          </h2>
          <ImageWithLogo
            src="/images/maritime-solution.png"
            alt=""
            className="mb-8 h-64 w-full rounded-[10px] sm:h-96"
            imgClassName="rounded-[10px] object-cover"
            logoSize="lg"
            mobileCenter
          />
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mt-4 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                {t('maritime.systems.intro')}
              </p>
              <ul className="mt-4 space-y-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                <li>• {t('maritime.systems.feature1')}</li>
                <li>• {t('maritime.systems.feature2')}</li>
                <li>• {t('maritime.systems.feature3')}</li>
                <li>• {t('maritime.systems.feature4')}</li>
              </ul>
              <p className="mt-6 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                {t('maritime.systems.conclusion')}
              </p>
            </div>
            
            <div className="overflow-hidden rounded-[10px] bg-neutral-50 lg:p-8">
              <button
                type="button"
                className="flex w-full items-center justify-between p-4 text-left lg:pointer-events-none lg:cursor-default"
                onClick={() => setSystemsSafetyOpen((o) => !o)}
                aria-expanded={systemsSafetyOpen}
              >
                <h3 className="font-heading text-mobile-h3 font-bold uppercase tracking-tight text-neutral-900 lg:text-lg">
                  {t('maritime.systems.safetyTitle')}
                </h3>
                <svg
                  className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform lg:hidden ${systemsSafetyOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`lg:block ${systemsSafetyOpen ? 'block' : 'hidden'} px-4 pb-4 lg:px-8 lg:pb-0 lg:pt-0`}>
                <p className="mt-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  {t('maritime.systems.safetyIntro')}
                </p>
                <ul className="mt-4 space-y-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  <li>• {t('maritime.systems.safety1')}</li>
                  <li>• {t('maritime.systems.safety2')}</li>
                  <li>• {t('maritime.systems.safety3')}</li>
                  <li>• {t('maritime.systems.safety4')}</li>
                  <li>• {t('maritime.systems.safety5')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="divider" />
      </div>

      {/* Typical Applications Section */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-4 text-center font-heading text-mobile-h2 font-bold uppercase tracking-tight text-neutral-900 lg:mb-6 lg:text-left lg:text-2xl xl:text-3xl">
            {t('maritime.applications.title')}
          </h2>
          <p className="mb-8 max-w-[900px] font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
            {t('maritime.applications.subtitle')}
          </p>

          {/* Grid layout - 4 columns, 6 items total */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {/* App 1 - Tugboat */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] sm:aspect-square">
              <img src="/images/tugboat.jpg" alt="Tugboat" className="absolute inset-0 h-full w-full object-cover" />
              <img src="/images/baterino-logo-white.png" alt="Baterino" className="absolute right-3 top-3 z-20 h-4 w-auto object-contain drop-shadow-sm sm:h-5" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-white">
                  {t('maritime.applications.app1')}
                </p>
              </div>
            </div>

            {/* App 2 - Tourist Vessel */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] sm:aspect-square">
              <img src="/images/ferry.jpg" alt="Tourist Vessel" className="absolute inset-0 h-full w-full object-cover" />
              <img src="/images/baterino-logo-white.png" alt="Baterino" className="absolute right-3 top-3 z-20 h-4 w-auto object-contain drop-shadow-sm sm:h-5" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-white">
                  {t('maritime.applications.app2')}
                </p>
              </div>
            </div>

            {/* App 3 - Car Ferry */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] sm:aspect-square">
              <img src="/images/car-ferry.jpg" alt="Car Ferry" className="absolute inset-0 h-full w-full object-cover" />
              <img src="/images/baterino-logo-white.png" alt="Baterino" className="absolute right-3 top-3 z-20 h-4 w-auto object-contain drop-shadow-sm sm:h-5" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-white">
                  {t('maritime.applications.app3')}
                </p>
              </div>
            </div>

            {/* App 4 - Fish Farm */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] sm:aspect-square">
              <img src="/images/fish-farm.jpg" alt="Fish Farm" className="absolute inset-0 h-full w-full object-cover" />
              <img src="/images/baterino-logo-white.png" alt="Baterino" className="absolute right-3 top-3 z-20 h-4 w-auto object-contain drop-shadow-sm sm:h-5" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-white">
                  {t('maritime.applications.app4')}
                </p>
              </div>
            </div>

            {/* App 5 - MPV Cargo Vessel */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] sm:aspect-square">
              <img src="/images/container-ship.jpg" alt="MPV Cargo Vessel" className="absolute inset-0 h-full w-full object-cover" />
              <img src="/images/baterino-logo-white.png" alt="Baterino" className="absolute right-3 top-3 z-20 h-4 w-auto object-contain drop-shadow-sm sm:h-5" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-white">
                  {t('maritime.applications.app5')}
                </p>
              </div>
            </div>

            {/* App 6 - Offshore Supply Vessel */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] sm:aspect-square">
              <img src="/images/service-boat.jpg" alt="Offshore Supply Vessel" className="absolute inset-0 h-full w-full object-cover" />
              <img src="/images/baterino-logo-white.png" alt="Baterino" className="absolute right-3 top-3 z-20 h-4 w-auto object-contain drop-shadow-sm sm:h-5" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-white">
                  {t('maritime.applications.app6')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="divider" />
      </div>

      {/* How We Deliver Section */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-mobile-h2 font-bold uppercase tracking-tight text-neutral-900 lg:text-left lg:text-2xl xl:text-3xl">
            {t('maritime.delivery.title')}
          </h2>
        </div>
        <MaritimeDeliverySlider />
      </section>
    </article>
  )
}
