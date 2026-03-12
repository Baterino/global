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

      {/* Large image - hidden on mobile */}
      <section className="hidden w-full bg-white px-4 pb-12 sm:block sm:px-6 lg:px-8">
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
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left column - LithTech */}
            <div>
              <div className="relative mb-4 h-[400px] w-full overflow-hidden rounded-[10px] lg:hidden">
                <img
                  src="/images/partnership/lithtech.jpg"
                  alt="LithTech"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                  <h2 className="font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-3xl">
                    {t('partnership.partnerRoles.lithtech.title')}
                  </h2>
                  <p className="mt-1.5 font-body text-sm font-medium uppercase tracking-wide text-white">
                    {t('partnership.partnerRoles.lithtech.subtitle')}
                  </p>
                </div>
              </div>
              <h2 className="hidden font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 lg:block sm:text-3xl">
                {t('partnership.partnerRoles.lithtech.title')}
              </h2>
              <p className="mt-2 hidden font-body text-sm font-medium uppercase tracking-wide text-neutral-500 lg:block">
                {t('partnership.partnerRoles.lithtech.subtitle')}
              </p>
              <p className="mt-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('partnership.partnerRoles.lithtech.intro')}
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:grid-rows-2 lg:min-h-[360px]">
                {[1, 2, 3, 4].map((i) => (
                  <li
                    key={i}
                    className="flex h-full items-center gap-3 rounded-[10px] bg-[#f7f7f7] p-4 font-body text-body-md leading-relaxed text-neutral-700"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    {t(`partnership.partnerRoles.lithtech.bullet${i}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column - Baterino */}
            <div>
              <div className="relative mb-4 h-[400px] w-full overflow-hidden rounded-[10px] lg:hidden">
                <img
                  src="/images/partnership/baterino.jpg"
                  alt="Baterino"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                  <h2 className="font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-white sm:text-3xl">
                    {t('partnership.partnerRoles.baterino.title')}
                  </h2>
                  <p className="mt-1.5 font-body text-sm font-medium uppercase tracking-wide text-white">
                    {t('partnership.partnerRoles.baterino.subtitle')}
                  </p>
                </div>
              </div>
              <h2 className="hidden font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 lg:block sm:text-3xl">
                {t('partnership.partnerRoles.baterino.title')}
              </h2>
              <p className="mt-2 hidden font-body text-sm font-medium uppercase tracking-wide text-neutral-500 lg:block">
                {t('partnership.partnerRoles.baterino.subtitle')}
              </p>
              <p className="mt-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('partnership.partnerRoles.baterino.intro')}
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:grid-rows-2 lg:min-h-[360px]">
                {[1, 2, 3, 4].map((i) => (
                  <li
                    key={i}
                    className="flex h-full items-center gap-3 rounded-[10px] bg-[#f7f7f7] p-4 font-body text-body-md leading-relaxed text-neutral-700"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-600">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    {t(`partnership.partnerRoles.baterino.bullet${i}`)}
                  </li>
                ))}
              </ul>
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
            <div className="flex flex-col rounded-[10px] p-6">
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
              <ul className="mt-4 flex flex-col gap-2">
                {[1, 2].map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-[10px] bg-[#f7f7f7] p-3 font-body text-body-md leading-relaxed text-neutral-700"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    {t(`partnership.longTerm.factoryToField.bullet${i}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2 - Shared Standards */}
            <div className="flex flex-col rounded-[10px] p-6">
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
              <ul className="mt-4 flex flex-col gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-[10px] bg-[#f7f7f7] p-3 font-body text-body-md leading-relaxed text-neutral-700"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    {t(`partnership.longTerm.sharedStandards.bullet${i}`)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3 - Applied Across Sectors */}
            <div className="flex flex-col rounded-[10px] p-6 sm:col-span-2 lg:col-span-1">
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
              <ul className="mt-4 flex flex-col gap-2">
                {[1, 2, 3].map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-[10px] bg-[#f7f7f7] p-3 font-body text-body-md leading-relaxed text-neutral-700"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    {t(`partnership.longTerm.appliedAcrossSectors.bullet${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
