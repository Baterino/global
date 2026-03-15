import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { ImageWithLogo } from '../components/ImageWithLogo'
import { Hero } from '../components/home/Hero'
import { OurDivisions } from '../components/home/OurDivisions'
import { SectionHeading } from '../components/home/SectionHeading'
import { WhatWeEnableTabSlider } from '../components/home/WhatWeEnableTabSlider'
import { HowWeDeliverSlider } from '../components/home/HowWeDeliverSlider'
import { IntroducingSlider } from '../components/home/IntroducingSlider'
import { RolesSection } from '../components/home/RolesSection'
import { TechnologyProvenSection } from '../components/home/TechnologyProvenSection'
import { ImpactSlider } from '../components/home/ImpactSlider'

export function Home() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`

  return (
    <article className="relative w-full bg-white">
      <Hero />

      {/* What we enable: title + subtitle on top; then intro and cards */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* Subtitle on top, title below — centered on mobile */}
          <div className="mb-6 text-center md:text-left">
            <p className="font-body text-body-sm font-semibold uppercase tracking-widest text-[#323671]">
              {t('home.whatWeEnable.subtitle')}
            </p>
            <h2 className="mt-2 font-heading text-heading-lg font-bold uppercase tracking-tight text-black sm:text-section-title">
              {t('home.whatWeEnable.title')}
            </h2>
          </div>
          <p className="mx-auto mb-10 max-w-[720px] text-center font-body text-body-md font-medium leading-relaxed text-neutral-600 md:mx-0 md:text-left">
            {t('home.whatWeEnable.intro')}
          </p>
          <WhatWeEnableTabSlider />
        </div>
      </section>

      {/* Divider — moved from between How we deliver and Built on trust */}
      <div className="w-full border-t border-neutral-200" />

      {/* How we deliver */}
      <section className="w-full bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeading
            titleKey="home.howWeDeliver.title"
            subtitleKey="home.howWeDeliver.subtitle"
            centerOnMobile
          />
          <p className="mx-auto mb-10 max-w-[792px] text-center font-body text-body-md font-medium leading-relaxed text-neutral-600 md:mx-0 md:text-left">
            {t('home.howWeDeliver.intro')}
          </p>
          <HowWeDeliverSlider />
          {/* Our divisions — desktop logos, mobile IntroducingSlider */}
          <div className="mt-12">
            <div className="hidden md:flex md:justify-center">
              <OurDivisions />
            </div>
            <div className="rounded-[10px] bg-[#f7f7f7] py-12 md:hidden">
              <IntroducingSlider />
            </div>
          </div>
        </div>
      </section>

      <RolesSection />

      <TechnologyProvenSection />

      {/* Our global impact */}
      <section className="w-full border-t border-neutral-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeading
            titleKey="home.globalImpact.title"
            subtitleKey="home.globalImpact.subtitle"
            centerOnMobile
          />
          <p className="mx-auto mb-10 max-w-[792px] text-center font-body text-body-lg font-medium leading-relaxed text-neutral-600 md:mx-0 md:text-left">
            {t('home.globalImpact.intro')}
          </p>
          <div className="w-full overflow-visible">
            <ImpactSlider />
          </div>
        </div>
      </section>

      {/* Global presence */}
      <section className="w-full border-t border-neutral-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeading
            titleKey="home.globalPresence.title"
            subtitleKey="home.globalPresence.subtitle"
            centerOnMobile
          />
          <ImageWithLogo
            src="/images/global-presence-wide.jpg"
            alt="Global Presence"
            className="h-96 w-full max-w-[1200px] rounded-[10px]"
            imgClassName="rounded-[10px] object-cover"
            logoSize="lg"
          />

          {/* Footer-like content within Global Presence section */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <section className="lg:col-span-2">
              <h3 className="font-heading text-heading-md font-semibold text-neutral-900">
                {t('home.footer.aboutUs')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.footer.aboutUsDesc')}
              </p>
              <Link 
                to={`${base}/company/about-baterino`}
                className="mt-3 inline-block font-body text-body-md text-neutral-900 underline hover:text-black transition-colors"
              >
                {t('home.footer.viewMore')}
              </Link>
            </section>
            <section>
              <h3 className="font-heading text-heading-md font-semibold text-neutral-700">
                {t('home.footer.localOffices')}
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:gap-2">
                <a 
                  href="https://baterino.ro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center justify-center rounded-lg bg-[#f7f7f7] px-4 py-3 font-nunito text-body-md font-semibold leading-relaxed text-neutral-600 transition-colors hover:text-black sm:min-h-0 sm:justify-start sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0"
                >
                  {t('home.footer.offices.romania')}
                </a>
                <a 
                  href="https://baterino.bg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center justify-center rounded-lg bg-[#f7f7f7] px-4 py-3 font-nunito text-body-md font-semibold leading-relaxed text-neutral-600 transition-colors hover:text-black sm:min-h-0 sm:justify-start sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0"
                >
                  {t('home.footer.offices.bulgaria')}
                </a>
                <a 
                  href="https://ltc-energy.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center justify-center rounded-lg bg-[#f7f7f7] px-4 py-3 font-nunito text-body-md font-semibold leading-relaxed text-neutral-600 transition-colors hover:text-black sm:min-h-0 sm:justify-start sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0"
                >
                  {t('home.footer.offices.china')}
                </a>
                <a 
                  href="https://baterino.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center justify-center rounded-lg bg-[#f7f7f7] px-4 py-3 font-nunito text-body-md font-semibold leading-relaxed text-neutral-600 transition-colors hover:text-black sm:min-h-0 sm:justify-start sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0"
                >
                  {t('home.footer.offices.indonesia')}
                </a>
              </div>
              <div className="mt-3 flex justify-center sm:justify-start">
                <Link 
                  to={`${base}/global-presence`}
                  className="font-body text-body-md text-neutral-900 underline transition-colors hover:text-black"
                >
                  {t('home.footer.viewMore')}
                </Link>
              </div>
            </section>
            <section>
              <h3 className="font-heading text-heading-md font-semibold text-neutral-700">
                {t('home.footer.globalContact')}
              </h3>
              <p className="mt-3 whitespace-pre-line font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.footer.globalContactDesc')}
              </p>
            </section>
            <section>
              <h3 className="font-heading text-heading-md font-semibold text-neutral-700">
                {t('home.footer.socialImpact')}
              </h3>
              <p className="mt-3 whitespace-pre-line font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.footer.socialImpactDesc')}
              </p>
            </section>
          </div>
        </div>
      </section>
    </article>
  )
}
