import { useTranslation } from 'react-i18next'
import { ImageWithLogo } from '../components/ImageWithLogo'
import { MaritimeDeliverySlider } from '../components/maritime/MaritimeDeliverySlider'
import { SolutionTwoColumnLayout } from '../components/solutions/SolutionTwoColumnLayout'
import { SEOHead } from '../components/SEOHead'

const MARITIME_SYSTEM_GRID_KEYS = [
  'maritime.systems.feature1',
  'maritime.systems.feature2',
  'maritime.systems.feature3',
  'maritime.systems.feature4',
  'maritime.systems.safety1',
  'maritime.systems.safety2',
  'maritime.systems.safety3',
  'maritime.systems.safety4',
  'maritime.systems.safety5',
] as const

export function SolutionsMaritime() {
  const { t } = useTranslation()

  return (
    <article className="w-full bg-white">
      <SEOHead title="Maritime Energy Storage | Baterino" description="Maritime battery energy storage systems for vessels and offshore operations. Marine-grade ESS engineered for safety and reliability." ogImage="/images/og-images/og-maritime.jpg" />
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans whitespace-pre-line text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
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
          <h2 className="mb-6 text-center font-heading text-mobile-h2 font-bold uppercase tracking-tight text-neutral-900 lg:mb-8 lg:text-left lg:text-2xl xl:text-3xl">
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
          <SolutionTwoColumnLayout
            leftColumnContent={
              <div className="space-y-5">
                <p className="font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  {t('maritime.systems.intro')}
                </p>
                <p className="font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  {t('maritime.systems.conclusion')}
                </p>
              </div>
            }
            techTitleKey="maritime.techBoxTitle"
            techSubtitleKey="maritime.systems.techBoxSubtitle"
            rightColumn={
              <div className="flex flex-col">
                <h3 className="mb-4 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900 sm:text-xl lg:mb-5">
                  {t('maritime.systems.ourFocus')}
                </h3>
                <p className="mb-6 font-body text-mobile-body leading-relaxed text-neutral-600 lg:text-body-md">
                  {t('maritime.systems.ourFocusIntro')}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {MARITIME_SYSTEM_GRID_KEYS.map((key) => (
                    <div
                      key={key}
                      className="rounded-2xl bg-[#f7f7f7] p-4 sm:p-5"
                    >
                      <p className="font-body text-mobile-body leading-relaxed text-neutral-800 lg:text-body-md">
                        {t(key)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
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

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
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
