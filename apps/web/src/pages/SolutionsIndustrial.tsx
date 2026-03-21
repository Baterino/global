import { useTranslation } from 'react-i18next'
import { ImageWithLogo } from '../components/ImageWithLogo'
import { SolutionTwoColumnLayout } from '../components/solutions/SolutionTwoColumnLayout'
import { SEOHead } from '../components/SEOHead'

export function SolutionsIndustrial() {
  const { t } = useTranslation()

  return (
    <article className="w-full bg-white">
      <SEOHead title="Industrial BESS Solutions | Baterino" description="Industrial BESS solutions for commercial facilities. Scalable containerized and cabinet-based battery energy storage systems for grid stability." ogImage="/images/og-images/og-industrial.jpg" />
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {t('industrial.hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-[740px] font-body text-mobile-body font-medium leading-relaxed text-neutral-600 lg:text-body-md">
            {t('industrial.hero.subtitle')}
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

      {/* Cabinet-Based Section */}
      <section className="w-full bg-white px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-6 text-center font-heading text-mobile-h2 font-bold uppercase tracking-tight text-neutral-900 lg:mb-8 lg:text-left lg:text-2xl xl:text-3xl">
            {t('industrial.cabinet.title')}
          </h2>
          <ImageWithLogo
            src="/images/industrial-cabinet.png"
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
                  {t('industrial.cabinet.desc1')}
                </p>
                <p className="font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  {t('industrial.cabinet.desc2')}
                </p>
              </div>
            }
            techTitleKey="industrial.techBoxTitle"
            techSubtitleKey="industrial.cabinet.techBoxSubtitle"
            primaryCard={{
              titleKey: 'industrial.cabinet.ourFocus',
              introKey: 'industrial.cabinet.focusIntro',
              itemKeys: [
                'industrial.cabinet.focus1',
                'industrial.cabinet.focus2',
                'industrial.cabinet.focus3',
                'industrial.cabinet.focus4',
              ],
            }}
            secondaryCard={{
              titleKey: 'industrial.cabinet.applications',
              introKey: 'industrial.cabinet.applicationsIntro',
              itemKeys: [
                'industrial.cabinet.app1',
                'industrial.cabinet.app2',
                'industrial.cabinet.app3',
                'industrial.cabinet.app4',
              ],
            }}
          />
        </div>
      </section>

      {/* Containerized & Large Scale Section */}
      <section className="w-full border-t border-neutral-200 bg-neutral-50/40 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-6 text-center font-heading text-mobile-h2 font-bold uppercase tracking-tight text-neutral-900 lg:mb-8 lg:text-left lg:text-2xl xl:text-3xl">
            {t('industrial.containerized.title')}
          </h2>
          <ImageWithLogo
            src="/images/consistency-bess.jpg"
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
                  {t('industrial.containerized.desc1')}
                </p>
                <p className="font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  {t('industrial.containerized.desc2')}
                </p>
              </div>
            }
            techTitleKey="industrial.techBoxTitle"
            techSubtitleKey="industrial.containerized.techBoxSubtitle"
            primaryCard={{
              titleKey: 'industrial.containerized.ourFocus',
              introKey: 'industrial.containerized.focusIntro',
              itemKeys: [
                'industrial.containerized.focus1',
                'industrial.containerized.focus2',
                'industrial.containerized.focus3',
                'industrial.containerized.focus4',
              ],
            }}
            secondaryCard={{
              titleKey: 'industrial.containerized.applications',
              introKey: 'industrial.containerized.applicationsIntro',
              itemKeys: [
                'industrial.containerized.app1',
                'industrial.containerized.app2',
                'industrial.containerized.app3',
                'industrial.containerized.app4',
                'industrial.containerized.app5',
              ],
            }}
          />
        </div>
      </section>
    </article>
  )
}
