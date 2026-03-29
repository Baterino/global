import { useTranslation } from 'react-i18next'
import { SEOHead } from '../components/SEOHead'

export function PrivacyPolicy() {
  const { t } = useTranslation()

  return (
    <>
      <SEOHead title={t('pageTitle.privacyPolicy')} description={t('pageTitle.privacyPolicyMetaDescription')} ogImage="/images/og-images/og-privacy-policy.jpg" />
      <article className="w-full bg-white">
        <section className="w-full bg-white px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[800px]">
            <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              {t('privacyPolicy.title')}
            </h1>
            <p className="mt-4 font-body text-body-md text-neutral-600">
              {t('privacyPolicy.lastUpdated')}
            </p>

            <div className="mt-10 space-y-8 font-body text-body-md text-neutral-700">
              <section>
                <h2 className="mb-3 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                  {t('privacyPolicy.section1.title')}
                </h2>
                <p className="leading-relaxed">{t('privacyPolicy.section1.content')}</p>
              </section>

              <section>
                <h2 className="mb-3 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                  {t('privacyPolicy.section2.title')}
                </h2>
                <p className="leading-relaxed">{t('privacyPolicy.section2.content')}</p>
              </section>

              <section>
                <h2 className="mb-3 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                  {t('privacyPolicy.section3.title')}
                </h2>
                <p className="leading-relaxed">{t('privacyPolicy.section3.content')}</p>
              </section>

              <section>
                <h2 className="mb-3 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                  {t('privacyPolicy.section4.title')}
                </h2>
                <p className="leading-relaxed">{t('privacyPolicy.section4.content')}</p>
              </section>

              <section>
                <h2 className="mb-3 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                  {t('privacyPolicy.section5.title')}
                </h2>
                <p className="leading-relaxed">{t('privacyPolicy.section5.content')}</p>
              </section>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
