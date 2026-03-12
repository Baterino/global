import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageWithLogo } from '../components/ImageWithLogo'

export function SolutionsResidential() {
  const { t } = useTranslation()
  const [individualFocusOpen, setIndividualFocusOpen] = useState(false)
  const [individualAdvantagesOpen, setIndividualAdvantagesOpen] = useState(false)
  const [microgridsFocusOpen, setMicrogridsFocusOpen] = useState(false)
  const [microgridsAdvantagesOpen, setMicrogridsAdvantagesOpen] = useState(false)

  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-mobile-h1 font-extrabold uppercase leading-tight tracking-tight text-neutral-900 opacity-90 sm:mx-auto sm:max-w-[720px] lg:max-w-[780px] lg:text-display-sm lg:leading-[1.2] xl:text-display-md xl:leading-[1.15]">
            {t('residential.hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-[740px] font-body text-mobile-body font-medium leading-relaxed text-neutral-600 lg:text-body-md">
            {t('residential.hero.subtitle')}
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

      {/* Individual Users Section */}
      <section className="w-full bg-white px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-4 text-center font-heading text-mobile-h2 font-bold uppercase tracking-tight text-neutral-900 lg:mb-6 lg:text-left lg:text-2xl xl:text-3xl">
            {t('residential.individual.title')}
          </h2>
          <ImageWithLogo
            src="/images/residential-storage-solutions.png"
            alt=""
            className="mb-8 h-64 w-full rounded-[10px] sm:h-96"
            imgClassName="rounded-[10px] object-cover"
            logoSize="lg"
            mobileCenter
          />
          
          <div className="grid gap-8 lg:grid-cols-[4fr_3fr_3fr]">
            <div>
              <p className="mt-4 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                {t('residential.individual.desc1')}
              </p>
              <p className="mt-4 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                {t('residential.individual.desc2')}
              </p>
              <p className="mt-6 font-heading text-mobile-h3 font-bold text-neutral-900 lg:text-xl">
                {t('residential.individual.power')}
              </p>
            </div>
            
            <div className="overflow-hidden rounded-[10px] bg-neutral-50 lg:p-8">
              <button
                type="button"
                className="flex w-full items-center justify-between p-4 text-left lg:pointer-events-none lg:cursor-default"
                onClick={() => setIndividualFocusOpen((o) => !o)}
                aria-expanded={individualFocusOpen}
              >
                <h3 className="font-heading text-mobile-h3 font-bold uppercase tracking-tight text-neutral-900 lg:text-lg">
                  {t('residential.individual.ourFocus')}
                </h3>
                <svg
                  className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform lg:hidden ${individualFocusOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`lg:block ${individualFocusOpen ? 'block' : 'hidden'} px-4 pb-4 lg:px-8 lg:pb-0 lg:pt-0`}>
                <p className="mt-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  {t('residential.individual.focusIntro')}
                </p>
                <ul className="mt-4 space-y-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  <li>• {t('residential.individual.focus1')}</li>
                  <li>• {t('residential.individual.focus2')}</li>
                  <li>• {t('residential.individual.focus3')}</li>
                  <li>• {t('residential.individual.focus4')}</li>
                </ul>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-[10px] bg-neutral-50 lg:p-8">
              <button
                type="button"
                className="flex w-full items-center justify-between p-4 text-left lg:pointer-events-none lg:cursor-default"
                onClick={() => setIndividualAdvantagesOpen((o) => !o)}
                aria-expanded={individualAdvantagesOpen}
              >
                <h3 className="font-heading text-mobile-h3 font-bold uppercase tracking-tight text-neutral-900 lg:text-lg">
                  {t('residential.individual.keyAdvantages')}
                </h3>
                <svg
                  className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform lg:hidden ${individualAdvantagesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`lg:block ${individualAdvantagesOpen ? 'block' : 'hidden'} px-4 pb-4 lg:px-8 lg:pb-0 lg:pt-0`}>
                <p className="mt-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  {t('residential.individual.keyAdvantagesIntro')}
                </p>
                <ul className="mt-4 space-y-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  <li>• {t('residential.individual.advantage1')}</li>
                  <li>• {t('residential.individual.advantage2')}</li>
                  <li>• {t('residential.individual.advantage3')}</li>
                  <li>• {t('residential.individual.advantage4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Microgrids Section */}
      <section className="w-full border-t border-neutral-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-4 text-center font-heading text-mobile-h2 font-bold uppercase tracking-tight text-neutral-900 lg:mb-6 lg:text-left lg:text-2xl xl:text-3xl">
            {t('residential.microgrids.title')}
          </h2>
          <ImageWithLogo
            src="/images/residential-microgrids.png"
            alt=""
            className="mb-8 h-64 w-full rounded-[10px] sm:h-96"
            imgClassName="rounded-[10px] object-cover"
            logoSize="lg"
            mobileCenter
          />
          
          <div className="grid gap-8 lg:grid-cols-[4fr_3fr_3fr]">
            <div>
              <p className="mt-4 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                {t('residential.microgrids.desc1')}
              </p>
              <p className="mt-4 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                {t('residential.microgrids.desc2')}
              </p>
              <p className="mt-6 font-heading text-mobile-h3 font-bold text-neutral-900 lg:text-xl">
                {t('residential.microgrids.power')}
              </p>
            </div>
            
            <div className="overflow-hidden rounded-[10px] bg-neutral-50 lg:p-8">
              <button
                type="button"
                className="flex w-full items-center justify-between p-4 text-left lg:pointer-events-none lg:cursor-default"
                onClick={() => setMicrogridsFocusOpen((o) => !o)}
                aria-expanded={microgridsFocusOpen}
              >
                <h3 className="font-heading text-mobile-h3 font-bold uppercase tracking-tight text-neutral-900 lg:text-lg">
                  {t('residential.microgrids.ourFocus')}
                </h3>
                <svg
                  className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform lg:hidden ${microgridsFocusOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`lg:block ${microgridsFocusOpen ? 'block' : 'hidden'} px-4 pb-4 lg:px-8 lg:pb-0 lg:pt-0`}>
                <p className="mt-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  {t('residential.microgrids.focusIntro')}
                </p>
                <ul className="mt-4 space-y-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  <li>• {t('residential.microgrids.focus1')}</li>
                  <li>• {t('residential.microgrids.focus2')}</li>
                  <li>• {t('residential.microgrids.focus3')}</li>
                  <li>• {t('residential.microgrids.focus4')}</li>
                </ul>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-[10px] bg-neutral-50 lg:p-8">
              <button
                type="button"
                className="flex w-full items-center justify-between p-4 text-left lg:pointer-events-none lg:cursor-default"
                onClick={() => setMicrogridsAdvantagesOpen((o) => !o)}
                aria-expanded={microgridsAdvantagesOpen}
              >
                <h3 className="font-heading text-mobile-h3 font-bold uppercase tracking-tight text-neutral-900 lg:text-lg">
                  {t('residential.microgrids.keyAdvantages')}
                </h3>
                <svg
                  className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform lg:hidden ${microgridsAdvantagesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`lg:block ${microgridsAdvantagesOpen ? 'block' : 'hidden'} px-4 pb-4 lg:px-8 lg:pb-0 lg:pt-0`}>
                <p className="mt-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  {t('residential.microgrids.advantagesIntro')}
                </p>
                <ul className="mt-4 space-y-3 font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
                  <li>• {t('residential.microgrids.advantage1')}</li>
                  <li>• {t('residential.microgrids.advantage2')}</li>
                  <li>• {t('residential.microgrids.advantage3')}</li>
                  <li>• {t('residential.microgrids.advantage4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
