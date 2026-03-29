import { useTranslation } from 'react-i18next'
import { SEOHead } from '../components/SEOHead'

export function TermsOfUse() {
  const { t } = useTranslation()

  return (
    <>
      <SEOHead title={t('pageTitle.termsOfUse')} description={t('pageTitle.termsOfUseMetaDescription')} ogImage="/images/og-images/og-terms-of-use.jpg" />
      <article className="w-full bg-white">
        <section className="w-full bg-white px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[800px]">
            <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              {t('termsOfUse.title')}
            </h1>
            <p className="mt-4 font-body text-body-md text-neutral-600">
              {t('termsOfUse.lastUpdated')}
            </p>

            <div className="mt-10 space-y-8 font-body text-body-md text-neutral-700">
              <section>
                <h2 className="mb-3 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                  {t('termsOfUse.section1.title')}
                </h2>
                <p className="leading-relaxed">{t('termsOfUse.section1.content')}</p>
              </section>

              <section>
                <h2 className="mb-3 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                  {t('termsOfUse.section2.title')}
                </h2>
                <p className="leading-relaxed">{t('termsOfUse.section2.content')}</p>
              </section>

              <section>
                <h2 className="mb-3 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                  {t('termsOfUse.section3.title')}
                </h2>
                <p className="leading-relaxed">{t('termsOfUse.section3.content')}</p>
              </section>

              <section>
                <h2 className="mb-3 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                  {t('termsOfUse.section4.title')}
                </h2>
                <p className="leading-relaxed">{t('termsOfUse.section4.content')}</p>
              </section>

              <section>
                <h2 className="mb-3 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                  {t('termsOfUse.section5.title')}
                </h2>
                <p className="leading-relaxed">{t('termsOfUse.section5.content')}</p>
              </section>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
