import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageWithLogo } from '../components/ImageWithLogo'
import { SeoHead } from '../components/SeoHead'

export function Careers() {
  const { t } = useTranslation()
  const [country, setCountry] = useState('')
  const [department, setDepartment] = useState('')
  const hasBothSelection = country !== '' && department !== ''

  const handleCountryChange = (value: string) => {
    setCountry(value)
    if (value === '') setDepartment('')
  }

  return (
    <>
      <SeoHead title={t('pageTitle.careers')} />
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {t('careers.hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-[800px] font-body text-body-md leading-relaxed text-neutral-700">
            {t('careers.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="w-full bg-white px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <ImageWithLogo
            src="/images/careers-baterino.png"
            alt=""
            className="h-[360px] w-full rounded-[10px] bg-neutral-200 sm:h-[400px]"
            logoSize="lg"
          />
        </div>
      </section>

      {/* Two-column section: Search filter (1/3) + Culture statement (2/3) */}
      <section className="w-full bg-white px-4 pt-6 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            {/* Left - Search for Open Positions (1/3) */}
            <div className="rounded-[10px] border border-neutral-200 bg-neutral-50 p-6 shadow-sm lg:col-span-1">
              <h2 className="mb-2 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                {t('careers.search.title')}
              </h2>
              <p className="mb-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('careers.search.description')}
              </p>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="careers-country"
                    className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                  >
                    {t('careers.search.countryLabel')}
                  </label>
                  <div className="relative">
                    <select
                      id="careers-country"
                      className="w-full appearance-none rounded-[5px] border border-neutral-300 bg-white py-2.5 pl-4 pr-10 font-body text-body-md text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 [&>option]:text-neutral-900"
                      value={country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                    >
                      <option value="">{t('careers.search.countryPlaceholder')}</option>
                      <option value="austria">{t('careers.search.countries.austria')}</option>
                      <option value="bulgaria">{t('careers.search.countries.bulgaria')}</option>
                      <option value="china">{t('careers.search.countries.china')}</option>
                      <option value="indonesia">{t('careers.search.countries.indonesia')}</option>
                      <option value="philippines">{t('careers.search.countries.philippines')}</option>
                      <option value="romania">{t('careers.search.countries.romania')}</option>
                      <option value="slovakia">{t('careers.search.countries.slovakia')}</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="careers-department"
                    className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                  >
                    {t('careers.search.departmentLabel')}
                  </label>
                  <div className={`relative ${country === '' ? 'opacity-60' : ''}`}>
                    <select
                      id="careers-department"
                      className="w-full appearance-none rounded-[5px] border border-neutral-300 bg-white py-2.5 pl-4 pr-10 font-body text-body-md text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-100 [&>option]:text-neutral-900"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      disabled={country === ''}
                      aria-disabled={country === ''}
                    >
                      <option value="">{t('careers.search.departmentPlaceholder')}</option>
                      <option value="corporateServices">{t('careers.search.departments.corporateServices')}</option>
                      <option value="engineering">{t('careers.search.departments.engineering')}</option>
                      <option value="operations">{t('careers.search.departments.operations')}</option>
                      <option value="projectManagement">{t('careers.search.departments.projectManagement')}</option>
                      <option value="researchInnovation">{t('careers.search.departments.researchInnovation')}</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Learn. Grow. Belong. or No Open Positions message (2/3) */}
            <div className="flex flex-col items-center justify-center lg:col-span-2 lg:min-h-[280px] lg:px-8">
              {hasBothSelection ? (
                <div className="w-full max-w-[600px]">
                  <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                    {t('careers.noPositions.title')}
                  </h2>
                  <p className="mb-4 font-body text-body-md leading-relaxed text-neutral-700">
                    {t('careers.noPositions.body')}
                  </p>
                  <p className="font-body text-body-md leading-relaxed text-neutral-700">
                    {t('careers.noPositions.ctaPrefix')}
                    <a
                      href="mailto:careers@baterino.com"
                      className="font-medium text-neutral-900 underline decoration-2 underline-offset-2 hover:no-underline"
                    >
                      careers@baterino.com
                    </a>
                    {t('careers.noPositions.ctaSuffix')}
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="mb-4 text-center font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                    {t('careers.culture.title')}
                  </h2>
                  <p className="max-w-[600px] text-center font-body text-body-md leading-relaxed text-neutral-700">
                    {t('careers.culture.subtitle')}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </article>
    </>
  )
}
