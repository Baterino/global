import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageWithLogo } from '../components/ImageWithLogo'

export function SolutionsIndustrial() {
  const { t } = useTranslation()
  const [cabinetFocusOpen, setCabinetFocusOpen] = useState(false)
  const [cabinetApplicationsOpen, setCabinetApplicationsOpen] = useState(false)
  const [containerizedFocusOpen, setContainerizedFocusOpen] = useState(false)
  const [containerizedApplicationsOpen, setContainerizedApplicationsOpen] = useState(false)

  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-mobile-h1 font-extrabold uppercase leading-tight tracking-tight text-neutral-900 opacity-90 sm:mx-auto sm:max-w-[720px] lg:max-w-[780px] lg:text-display-sm lg:leading-[1.2] xl:text-display-md xl:leading-[1.15]">
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
          <h2 className="mb-4 text-center font-heading text-mobile-h2 font-bold uppercase tracking-tight text-neutral-900 lg:mb-6 lg:text-left lg:text-2xl xl:text-3xl">
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
          
          <div className="grid gap-8 lg:grid-cols-[4fr_3fr_3fr]">
            <div>
              <p className="mt-4 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                {t('industrial.cabinet.desc1')}
              </p>
              <p className="mt-4 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                {t('industrial.cabinet.desc2')}
              </p>
              <p className="mt-6 font-heading text-mobile-h3 font-bold text-neutral-900 lg:text-xl">
                {t('industrial.cabinet.power')}
              </p>
            </div>
            
            <div className="overflow-hidden rounded-[10px] bg-neutral-50 lg:p-8">
              <button
                type="button"
                className="flex w-full items-center justify-between p-4 text-left lg:pointer-events-none lg:cursor-default"
                onClick={() => setCabinetFocusOpen((o) => !o)}
                aria-expanded={cabinetFocusOpen}
              >
                <h3 className="font-heading text-mobile-h3 font-bold uppercase tracking-tight text-neutral-900 lg:text-lg">
                  {t('industrial.cabinet.ourFocus')}
                </h3>
                <svg
                  className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform lg:hidden ${cabinetFocusOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`lg:block ${cabinetFocusOpen ? 'block' : 'hidden'} px-4 pb-4 lg:px-8 lg:pb-0 lg:pt-0`}>
                <ul className="mt-3 space-y-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  <li>• {t('industrial.cabinet.focus1')}</li>
                  <li>• {t('industrial.cabinet.focus2')}</li>
                  <li>• {t('industrial.cabinet.focus3')}</li>
                  <li>• {t('industrial.cabinet.focus4')}</li>
                </ul>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-[10px] bg-neutral-50 lg:p-8">
              <button
                type="button"
                className="flex w-full items-center justify-between p-4 text-left lg:pointer-events-none lg:cursor-default"
                onClick={() => setCabinetApplicationsOpen((o) => !o)}
                aria-expanded={cabinetApplicationsOpen}
              >
                <h3 className="font-heading text-mobile-h3 font-bold uppercase tracking-tight text-neutral-900 lg:text-lg">
                  {t('industrial.cabinet.applications')}
                </h3>
                <svg
                  className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform lg:hidden ${cabinetApplicationsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`lg:block ${cabinetApplicationsOpen ? 'block' : 'hidden'} px-4 pb-4 lg:px-8 lg:pb-0 lg:pt-0`}>
                <ul className="mt-3 space-y-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  <li>• {t('industrial.cabinet.app1')}</li>
                  <li>• {t('industrial.cabinet.app2')}</li>
                  <li>• {t('industrial.cabinet.app3')}</li>
                  <li>• {t('industrial.cabinet.app4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Containerized & Large Scale Section */}
      <section className="w-full border-t border-neutral-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-4 text-center font-heading text-mobile-h2 font-bold uppercase tracking-tight text-neutral-900 lg:mb-6 lg:text-left lg:text-2xl xl:text-3xl">
            {t('industrial.containerized.title')}
          </h2>
          <ImageWithLogo
            src="/images/bess-solutions.jpg"
            alt=""
            className="mb-8 h-64 w-full rounded-[10px] sm:h-96"
            imgClassName="rounded-[10px] object-cover"
            logoSize="lg"
            mobileCenter
          />
          
          <div className="grid gap-8 lg:grid-cols-[4fr_3fr_3fr]">
            <div>
              <p className="mt-4 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                {t('industrial.containerized.desc1')}
              </p>
              <p className="mt-4 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                {t('industrial.containerized.desc2')}
              </p>
              <p className="mt-6 font-heading text-mobile-h3 font-bold text-neutral-900 lg:text-xl">
                {t('industrial.containerized.power')}
              </p>
            </div>
            
            <div className="overflow-hidden rounded-[10px] bg-neutral-50 lg:p-8">
              <button
                type="button"
                className="flex w-full items-center justify-between p-4 text-left lg:pointer-events-none lg:cursor-default"
                onClick={() => setContainerizedFocusOpen((o) => !o)}
                aria-expanded={containerizedFocusOpen}
              >
                <h3 className="font-heading text-mobile-h3 font-bold uppercase tracking-tight text-neutral-900 lg:text-lg">
                  {t('industrial.containerized.ourFocus')}
                </h3>
                <svg
                  className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform lg:hidden ${containerizedFocusOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`lg:block ${containerizedFocusOpen ? 'block' : 'hidden'} px-4 pb-4 lg:px-8 lg:pb-0 lg:pt-0`}>
                <ul className="mt-3 space-y-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  <li>• {t('industrial.containerized.focus1')}</li>
                  <li>• {t('industrial.containerized.focus2')}</li>
                  <li>• {t('industrial.containerized.focus3')}</li>
                  <li>• {t('industrial.containerized.focus4')}</li>
                </ul>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-[10px] bg-neutral-50 lg:p-8">
              <button
                type="button"
                className="flex w-full items-center justify-between p-4 text-left lg:pointer-events-none lg:cursor-default"
                onClick={() => setContainerizedApplicationsOpen((o) => !o)}
                aria-expanded={containerizedApplicationsOpen}
              >
                <h3 className="font-heading text-mobile-h3 font-bold uppercase tracking-tight text-neutral-900 lg:text-lg">
                  {t('industrial.containerized.applications')}
                </h3>
                <svg
                  className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform lg:hidden ${containerizedApplicationsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`lg:block ${containerizedApplicationsOpen ? 'block' : 'hidden'} px-4 pb-4 lg:px-8 lg:pb-0 lg:pt-0`}>
                <ul className="mt-3 space-y-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  <li>• {t('industrial.containerized.app1')}</li>
                  <li>• {t('industrial.containerized.app2')}</li>
                  <li>• {t('industrial.containerized.app3')}</li>
                  <li>• {t('industrial.containerized.app4')}</li>
                  <li>• {t('industrial.containerized.app5')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
