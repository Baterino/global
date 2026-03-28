import { useTranslation } from 'react-i18next'
import { ImageWithLogo } from '../components/ImageWithLogo'
import { SEOHead } from '../components/SEOHead'
import { assetUrl } from '@/lib/assetUrl'

export function Delivery() {
  const { t } = useTranslation()

  return (
    <article className="w-full bg-white">
      <SEOHead title={t('delivery.hero.title')} description={t('delivery.hero.subtitle')} ogImage="/images/og-images/og-delivery.jpg" />
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {t('delivery.hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-[740px] font-body text-body-md leading-relaxed text-neutral-600">
            {t('delivery.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Our Delivery Framework Section */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 lg:flex-row">
          {/* Left: image */}
          <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-[10px] bg-zinc-300 lg:h-80 lg:w-96">
            <img
              src={assetUrl('/images/delivery-enablement.jpg')}
              alt=""
              className="h-full w-full object-cover"
            />
            <img
              src={assetUrl('/images/baterino-logo-white.png')}
              alt="Baterino"
              className="absolute bottom-4 right-4 h-5 w-auto object-contain drop-shadow-md sm:bottom-6 sm:right-6 sm:h-6"
            />
          </div>
          {/* Right: content card - 4 boxes on mobile (title+desc, then 3 bullet points) */}
          <div className="flex flex-1 flex-col justify-start gap-4 sm:gap-0 sm:rounded-[10px] sm:bg-neutral-100 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
            <div className="rounded-[10px] bg-[#f7f7f7] p-4 sm:bg-transparent sm:p-0 sm:rounded-none">
              <h2 className="font-heading text-xl font-bold uppercase leading-tight tracking-tight text-neutral-900">
                {t('delivery.framework.item1.title')}
              </h2>
              <p className="mt-2 max-w-[685px] font-body text-body-md leading-relaxed text-neutral-700">
                {t('delivery.framework.item1.desc')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-start gap-3 rounded-[10px] bg-[#f7f7f7] p-4 sm:bg-transparent sm:p-0 sm:rounded-none"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 sm:bg-white">
                    <span className="font-body text-sm font-bold tabular-nums leading-none text-neutral-800" aria-hidden>
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                  <p className="font-body text-body-md font-medium leading-relaxed text-neutral-900 sm:font-normal">
                    {t(`delivery.framework.item1.point${i}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Integration */}
        <div className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col gap-5 lg:flex-row">
          <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-[10px] bg-zinc-300 lg:h-80 lg:w-96">
            <img src={assetUrl('/images/delivery-technology-integration.jpg')} alt="" className="h-full w-full object-cover" />
            <img
              src={assetUrl('/images/baterino-logo-white.png')}
              alt="Baterino"
              className="absolute bottom-4 right-4 h-5 w-auto object-contain drop-shadow-md sm:bottom-6 sm:right-6 sm:h-6"
            />
          </div>
          <div className="flex flex-1 flex-col justify-start gap-4 sm:gap-0 sm:rounded-[10px] sm:bg-neutral-100 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
            <div className="rounded-[10px] bg-[#f7f7f7] p-4 sm:bg-transparent sm:p-0 sm:rounded-none">
              <h2 className="font-heading text-xl font-bold uppercase leading-tight tracking-tight text-neutral-900">
                {t('delivery.framework.item2.title')}
              </h2>
              <p className="mt-2 max-w-[685px] font-body text-body-md leading-relaxed text-neutral-700">
                {t('delivery.framework.item2.desc')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-start gap-3 rounded-[10px] border border-neutral-200 bg-[#f7f7f7] p-4 sm:border-0 sm:bg-transparent sm:p-0 sm:rounded-none"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 sm:bg-white">
                    <span className="font-body text-sm font-bold tabular-nums leading-none text-neutral-800" aria-hidden>
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                  <p className="font-body text-body-md font-medium leading-relaxed text-neutral-900 sm:font-normal">
                    {t(`delivery.framework.item2.point${i}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* After-Sales & Reliability */}
        <div className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col gap-5 lg:flex-row">
          <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-[10px] bg-zinc-300 lg:h-80 lg:w-96">
            <img src={assetUrl('/images/delivery-after-sales.jpg')} alt="" className="h-full w-full object-cover" />
            <img
              src={assetUrl('/images/baterino-logo-white.png')}
              alt="Baterino"
              className="absolute bottom-4 right-4 h-5 w-auto object-contain drop-shadow-md sm:bottom-6 sm:right-6 sm:h-6"
            />
          </div>
          <div className="flex flex-1 flex-col justify-start gap-4 sm:gap-0 sm:rounded-[10px] sm:bg-neutral-100 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
            <div className="rounded-[10px] bg-[#f7f7f7] p-4 sm:bg-transparent sm:p-0 sm:rounded-none">
              <h2 className="font-heading text-xl font-bold uppercase leading-tight tracking-tight text-neutral-900">
                {t('delivery.framework.item3.title')}
              </h2>
              <p className="mt-2 max-w-[685px] font-body text-body-md leading-relaxed text-neutral-700">
                {t('delivery.framework.item3.desc')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-start gap-3 rounded-[10px] border border-neutral-200 bg-[#f7f7f7] p-4 sm:border-0 sm:bg-transparent sm:p-0 sm:rounded-none"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 sm:bg-white">
                    <span className="font-body text-sm font-bold tabular-nums leading-none text-neutral-800" aria-hidden>
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                  <p className="font-body text-body-md font-medium leading-relaxed text-neutral-900 sm:font-normal">
                    {t(`delivery.framework.item3.point${i}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Structuring & Funding Support */}
        <div className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col gap-5 lg:flex-row">
          <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-[10px] bg-zinc-300 lg:h-80 lg:w-96">
            <img src={assetUrl('/images/delivery-enablement.jpg')} alt="" className="h-full w-full object-cover" />
            <img
              src={assetUrl('/images/baterino-logo-white.png')}
              alt="Baterino"
              className="absolute bottom-4 right-4 h-5 w-auto object-contain drop-shadow-md sm:bottom-6 sm:right-6 sm:h-6"
            />
          </div>
          <div className="flex flex-1 flex-col justify-start gap-4 sm:gap-0 sm:rounded-[10px] sm:bg-neutral-100 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
            <div className="rounded-[10px] bg-[#f7f7f7] p-4 sm:bg-transparent sm:p-0 sm:rounded-none">
              <h2 className="font-heading text-xl font-bold uppercase leading-tight tracking-tight text-neutral-900">
                {t('delivery.framework.item4.title')}
              </h2>
              <p className="mt-2 max-w-[685px] font-body text-body-md leading-relaxed text-neutral-700">
                {t('delivery.framework.item4.desc')}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-start gap-3 rounded-[10px] border border-neutral-200 bg-[#f7f7f7] p-4 sm:border-0 sm:bg-transparent sm:p-0 sm:rounded-none"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 sm:bg-white">
                    <span className="font-body text-sm font-bold tabular-nums leading-none text-neutral-800" aria-hidden>
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                  <p className="font-body text-body-md font-medium leading-relaxed text-neutral-900 sm:font-normal">
                    {t(`delivery.framework.item4.point${i}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Built for Consistency Section */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            {t('delivery.consistency.title')}
          </h2>
          <p className="mb-8 max-w-[800px] font-body text-body-md leading-relaxed text-neutral-600">
            {t('delivery.consistency.intro')}
          </p>

          <ImageWithLogo
            src={assetUrl('/images/consistency-bess.jpg')}
            alt=""
            className="mb-12 h-64 w-full rounded-[10px] sm:h-96"
            imgClassName="rounded-[10px] object-cover"
            logoSize="lg"
          />

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
              <ul className="flex flex-col gap-3 sm:space-y-2 sm:gap-0">
                {[1, 2, 3, 4].map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-[10px] bg-[#f7f7f7] p-4 font-body text-body-md leading-relaxed text-neutral-700 sm:rounded-none sm:bg-transparent sm:p-0"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 sm:h-auto sm:w-auto sm:bg-transparent sm:text-base">→</span>
                    {t(`delivery.consistency.col1.point${i}`)}
                  </li>
                ))}
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
              <ul className="flex flex-col gap-3 sm:space-y-2 sm:gap-0">
                {[1, 2, 3].map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-[10px] bg-[#f7f7f7] p-4 font-body text-body-md leading-relaxed text-neutral-700 sm:rounded-none sm:bg-transparent sm:p-0"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 sm:h-auto sm:w-auto sm:bg-transparent sm:text-base">→</span>
                    {t(`delivery.consistency.col2.point${i}`)}
                  </li>
                ))}
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
              <ul className="flex flex-col gap-3 sm:space-y-2 sm:gap-0">
                {[1, 2, 3, 4].map((i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-[10px] bg-[#f7f7f7] p-4 font-body text-body-md leading-relaxed text-neutral-700 sm:rounded-none sm:bg-transparent sm:p-0"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 sm:h-auto sm:w-auto sm:bg-transparent sm:text-base">→</span>
                    {t(`delivery.consistency.col3.point${i}`)}
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
