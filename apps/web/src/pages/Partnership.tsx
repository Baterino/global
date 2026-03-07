import { useTranslation } from 'react-i18next'

export function Partnership() {
  const { t } = useTranslation()

  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {t('partnership.hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-[800px] font-body text-body-md leading-relaxed text-neutral-700">
            {t('partnership.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Large image placeholder */}
      <section className="w-full bg-white px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="relative h-[360px] w-full overflow-hidden rounded-[10px] sm:h-[400px]">
            <img
              src="/images/lithtech-baterino-partnership.jpg"
              alt="LithTech Baterino Partnership"
              className="h-full w-full rounded-[10px] object-cover"
            />
            <img
              src="/images/lithtech-logo-white 3.png"
              alt="LithTech"
              className="absolute bottom-4 left-4 z-10 h-8 w-auto object-contain drop-shadow-sm sm:h-10"
              aria-hidden
            />
            <img
              src="/images/baterino-logo-white.png"
              alt="Baterino"
              className="absolute bottom-4 right-4 z-10 h-8 w-auto object-contain drop-shadow-sm sm:h-10"
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* Partner Roles - Two columns with chevron buttons between */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
            {/* Left column - LithTech */}
            <div>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('partnership.partnerRoles.lithtech.title')}
              </h2>
              <p className="mt-2 font-body text-sm font-medium uppercase tracking-wide text-neutral-500">
                {t('partnership.partnerRoles.lithtech.subtitle')}
              </p>
              <p className="mt-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('partnership.partnerRoles.lithtech.intro')}
              </p>
              <ul className="mt-4 list-none space-y-2 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('partnership.partnerRoles.lithtech.bullet1')}</li>
                <li>• {t('partnership.partnerRoles.lithtech.bullet2')}</li>
                <li>• {t('partnership.partnerRoles.lithtech.bullet3')}</li>
                <li>• {t('partnership.partnerRoles.lithtech.bullet4')}</li>
              </ul>
              <p className="mt-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('partnership.partnerRoles.lithtech.closing')}
              </p>
            </div>

            {/* Chevron buttons between columns */}
            <div className="hidden flex-col items-center justify-center gap-4 lg:flex">
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-neutral-600 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
                aria-label="Previous"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-neutral-600 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
                aria-label="Next"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Right column - Baterino */}
            <div>
              <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('partnership.partnerRoles.baterino.title')}
              </h2>
              <p className="mt-2 font-body text-sm font-medium uppercase tracking-wide text-neutral-500">
                {t('partnership.partnerRoles.baterino.subtitle')}
              </p>
              <p className="mt-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('partnership.partnerRoles.baterino.intro')}
              </p>
              <ul className="mt-4 list-none space-y-2 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('partnership.partnerRoles.baterino.bullet1')}</li>
                <li>• {t('partnership.partnerRoles.baterino.bullet2')}</li>
                <li>• {t('partnership.partnerRoles.baterino.bullet3')}</li>
                <li>• {t('partnership.partnerRoles.baterino.bullet4')}</li>
              </ul>
              <p className="mt-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('partnership.partnerRoles.baterino.closing')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="divider" />
      </div>

      {/* Long-term partnership section */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            {t('partnership.longTerm.title')}
          </h2>
          <p className="mt-2 font-body text-sm font-medium uppercase tracking-wide text-neutral-500">
            {t('partnership.longTerm.subtitle')}
          </p>
          <p className="mt-6 max-w-[800px] font-body text-body-md leading-relaxed text-neutral-700">
            {t('partnership.longTerm.intro')}
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 - From Factory to Field */}
            <div className="flex flex-col rounded-[10px] bg-neutral-50 p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between gap-2">
                <h3 className="font-heading text-base font-bold uppercase tracking-tight text-neutral-900">
                  {t('partnership.longTerm.factoryToField.title')}
                </h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 text-neutral-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              <p className="font-body text-body-md leading-relaxed text-neutral-700">
                {t('partnership.longTerm.factoryToField.description')}
              </p>
              <p className="mt-4 font-body text-body-md font-medium text-neutral-900">
                {t('partnership.longTerm.factoryToField.listLabel')}
              </p>
              <ul className="mt-2 list-none space-y-1 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('partnership.longTerm.factoryToField.bullet1')}</li>
                <li>• {t('partnership.longTerm.factoryToField.bullet2')}</li>
              </ul>
            </div>

            {/* Card 2 - Shared Standards */}
            <div className="flex flex-col rounded-[10px] bg-neutral-50 p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between gap-2">
                <h3 className="font-heading text-base font-bold uppercase tracking-tight text-neutral-900">
                  {t('partnership.longTerm.sharedStandards.title')}
                </h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 text-neutral-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              <p className="font-body text-body-md leading-relaxed text-neutral-700">
                {t('partnership.longTerm.sharedStandards.description')}
              </p>
              <ul className="mt-4 list-none space-y-1 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('partnership.longTerm.sharedStandards.bullet1')}</li>
                <li>• {t('partnership.longTerm.sharedStandards.bullet2')}</li>
                <li>• {t('partnership.longTerm.sharedStandards.bullet3')}</li>
                <li>• {t('partnership.longTerm.sharedStandards.bullet4')}</li>
              </ul>
              <p className="mt-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('partnership.longTerm.sharedStandards.closing')}
              </p>
            </div>

            {/* Card 3 - Applied Across Sectors */}
            <div className="flex flex-col rounded-[10px] bg-neutral-50 p-6 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex items-start justify-between gap-2">
                <h3 className="font-heading text-base font-bold uppercase tracking-tight text-neutral-900">
                  {t('partnership.longTerm.appliedAcrossSectors.title')}
                </h3>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 text-neutral-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              <p className="font-body text-body-md leading-relaxed text-neutral-700">
                {t('partnership.longTerm.appliedAcrossSectors.description')}
              </p>
              <ul className="mt-4 list-none space-y-1 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('partnership.longTerm.appliedAcrossSectors.bullet1')}</li>
                <li>• {t('partnership.longTerm.appliedAcrossSectors.bullet2')}</li>
                <li>• {t('partnership.longTerm.appliedAcrossSectors.bullet3')}</li>
              </ul>
              <p className="mt-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('partnership.longTerm.appliedAcrossSectors.closing')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
