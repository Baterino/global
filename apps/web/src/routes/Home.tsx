import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { ImageWithLogo } from '../components/ImageWithLogo'
import { Hero } from '../components/home/Hero'
import { OurDivisions } from '../components/home/OurDivisions'
import { SectionHeading } from '../components/home/SectionHeading'
import { WhatWeEnableTabSlider } from '../components/home/WhatWeEnableTabSlider'
import { HowWeDeliverSlider } from '../components/home/HowWeDeliverSlider'
import { IntroducingSlider } from '../components/home/IntroducingSlider'
import { ImpactSlider } from '../components/home/ImpactSlider'

const TRUST_IMG = '/images/baterino-resilience.jpg'

export function Home() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`

  return (
    <article className="relative w-full bg-white">
      <Hero />

      {/* Our divisions - logos under hero (hidden on mobile) */}
      <section className="hidden w-full justify-center bg-white py-6 md:flex">
        <OurDivisions />
      </section>

      {/* What we enable: title + subtitle on top; then intro and cards */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* Title and subtitle on top — centered on mobile */}
          <div className="mb-6 text-center md:text-left">
            <h2 className="font-heading text-heading-lg font-bold uppercase tracking-tight text-neutral-900 sm:text-section-title">
              {t('home.whatWeEnable.title')}
            </h2>
            <p className="mt-2 font-body text-body-md font-medium uppercase tracking-wider text-neutral-500">
              {t('home.whatWeEnable.subtitle')}
            </p>
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
        </div>
      </section>

      {/* Introducing Baterino divisions — mobile only */}
      <section className="w-full bg-[#f7f7f7] py-12 md:hidden">
        <IntroducingSlider />
      </section>

      {/* Built on trust — divider moved to above How we deliver */}
      <section className="w-full bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-8 text-center font-heading text-heading-lg font-bold uppercase tracking-tight text-neutral-900 sm:text-section-title md:text-left">
            {t('home.builtOnTrust.title')}
          </h2>
          <ImageWithLogo
            src={TRUST_IMG}
            alt=""
            className="overflow-hidden rounded-[10px]"
            imgClassName="h-64 w-full object-cover sm:h-96 rounded-[10px]"
            logoSize="lg"
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="flex items-center gap-2 font-heading text-heading-md font-semibold text-neutral-900">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-neutral-200 md:hidden">
                  <svg className="h-5 w-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                {t('home.builtOnTrust.col1')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.builtOnTrust.col1Desc')}
              </p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-heading text-heading-md font-semibold text-neutral-900">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-neutral-200 md:hidden">
                  <svg className="h-5 w-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 0H3m2 0H3m2 0h2M5 15H3m2 0H3m2 0H3m2 0h2M15 9h2m2 0h2m2 0h2m2 0h-2M15 15h2m2 0h2m2 0h2m2 0h-2M9 9h6v6H9V9z" />
                  </svg>
                </span>
                {t('home.builtOnTrust.col2')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.builtOnTrust.col2Desc')}
              </p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-heading text-heading-md font-semibold text-neutral-900">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-neutral-200 md:hidden">
                  <svg className="h-5 w-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                {t('home.builtOnTrust.col3')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.builtOnTrust.col3Desc')}
              </p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-heading text-heading-md font-semibold text-neutral-900">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-neutral-200 md:hidden">
                  <svg className="h-5 w-5 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                {t('home.builtOnTrust.col4')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.builtOnTrust.col4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

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
