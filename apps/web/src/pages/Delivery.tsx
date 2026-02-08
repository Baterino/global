import { useTranslation } from 'react-i18next'
import { DeliveryFrameworkSlider } from '@/components/delivery/DeliveryFrameworkSlider'

export function Delivery() {
  const { t } = useTranslation()

  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-2xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 opacity-90 sm:mx-auto sm:max-w-[720px] sm:text-display-sm sm:leading-[1.2] lg:max-w-[780px] lg:text-display-md lg:leading-[1.15]">
            {t('delivery.hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-[740px] font-body text-body-md leading-relaxed text-neutral-600">
            {t('delivery.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Our Delivery Framework Section */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            {t('delivery.framework.title')}
          </h2>
          <p className="mb-8 max-w-[800px] font-body text-body-md leading-relaxed text-neutral-600">
            {t('delivery.framework.intro')}
          </p>

          <DeliveryFrameworkSlider />
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-neutral-200" />
      </div>

      {/* Built for Consistency Section */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            {t('delivery.consistency.title')}
          </h2>
          <p className="mb-8 max-w-[800px] font-body text-body-md leading-relaxed text-neutral-600">
            {t('delivery.consistency.intro')}
          </p>

          <div className="mb-12">
            <img
              src="/images/consistency-bess.png"
              alt=""
              className="h-64 w-full rounded-[10px] object-cover sm:h-96"
            />
          </div>

          {/* 3 Columns */}
          <div className="grid gap-8 sm:grid-cols-3">
            {/* Column 1 */}
            <div>
              <h3 className="mb-4 font-heading text-heading-md font-bold text-neutral-900">
                {t('delivery.consistency.col1.title')}
              </h3>
              <p className="mb-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('delivery.consistency.col1.desc')}
              </p>
              <p className="mb-2 font-body text-body-md font-semibold text-neutral-900">
                {t('delivery.consistency.col1.subtitle')}
              </p>
              <ul className="space-y-2 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('delivery.consistency.col1.point1')}</li>
                <li>• {t('delivery.consistency.col1.point2')}</li>
                <li>• {t('delivery.consistency.col1.point3')}</li>
                <li>• {t('delivery.consistency.col1.point4')}</li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-4 font-heading text-heading-md font-bold text-neutral-900">
                {t('delivery.consistency.col2.title')}
              </h3>
              <p className="mb-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('delivery.consistency.col2.desc')}
              </p>
              <p className="mb-2 font-body text-body-md font-semibold text-neutral-900">
                {t('delivery.consistency.col2.subtitle')}
              </p>
              <ul className="space-y-2 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('delivery.consistency.col2.point1')}</li>
                <li>• {t('delivery.consistency.col2.point2')}</li>
                <li>• {t('delivery.consistency.col2.point3')}</li>
              </ul>
              <p className="mt-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('delivery.consistency.col2.footer')}
              </p>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-4 font-heading text-heading-md font-bold text-neutral-900">
                {t('delivery.consistency.col3.title')}
              </h3>
              <p className="mb-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('delivery.consistency.col3.desc')}
              </p>
              <p className="mb-2 font-body text-body-md font-semibold text-neutral-900">
                {t('delivery.consistency.col3.subtitle')}
              </p>
              <ul className="space-y-2 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('delivery.consistency.col3.point1')}</li>
                <li>• {t('delivery.consistency.col3.point2')}</li>
                <li>• {t('delivery.consistency.col3.point3')}</li>
                <li>• {t('delivery.consistency.col3.point4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
