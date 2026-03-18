import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ImageWithLogo } from '../components/ImageWithLogo'
import { OperatingModelDiagramContent } from './OperatingModelDiagram'
import { SEOHead } from '../components/SEOHead'

export function GlobalPresence() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`

  return (
    <article className="w-full bg-white">
      <SEOHead title={t('globalPresence.hero.title')} description={t('globalPresence.hero.subtitle')} ogImage="/images/og-images/og-global-presence.jpg" />
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#10064B] sm:text-4xl lg:text-5xl">
            {t('globalPresence.hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-[800px] font-body text-body-md leading-relaxed text-neutral-700">
            {t('globalPresence.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Operating Globally & Delivering Locally - Two columns */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left - Operating Globally */}
            <div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('globalPresence.operatingGlobally.title')}
              </h2>
              <p className="mb-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('globalPresence.operatingGlobally.description')}
              </p>
              <ImageWithLogo
                src="/images/operating-globally.jpg"
                alt="Operating Globally"
                className="h-[320px] w-full rounded-[10px] sm:h-[350px]"
                imgClassName="rounded-[10px] object-cover"
                logoSize="lg"
              />
            </div>

            {/* Right - Delivering Locally */}
            <div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('globalPresence.deliveringLocally.title')}
              </h2>
              <p className="mb-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('globalPresence.deliveringLocally.description')}
              </p>
              <ImageWithLogo
                src="/images/delivering-locally.jpg"
                alt="Acting Locally"
                className="h-[320px] w-full rounded-[10px] sm:h-[350px]"
                imgClassName="rounded-[10px] object-cover"
                logoSize="lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="divider" />
      </div>

      {/* Operating Model */}
      <section id="operating-model" className="w-full bg-white px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            Operating Model
          </h2>
          <p className="mt-3 max-w-[600px] font-body text-body-md leading-relaxed text-neutral-600">
            Streamlined procurement and distribution enabling rapid scaling from global suppliers to market deployment.
          </p>
        </div>
        <OperatingModelDiagramContent />
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="divider" />
      </div>

      {/* Regional Presence - 1/3 text left, 2/3 image right */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            {/* Left - Text content (1/3) */}
            <div className="lg:col-span-1">
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('globalPresence.regional.title')}
              </h2>
              <p className="mb-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('globalPresence.regional.intro')}
              </p>
              <ul className="mb-6 list-none space-y-2 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('globalPresence.regional.bullet1')}</li>
                <li>• {t('globalPresence.regional.bullet2')}</li>
                <li>• {t('globalPresence.regional.bullet3')}</li>
                <li>• {t('globalPresence.regional.bullet4')}</li>
              </ul>
              <p className="font-body text-body-md leading-relaxed text-neutral-700">
                {t('globalPresence.regional.closing')}
              </p>
            </div>

            {/* Right - Image (2/3), height 440px */}
            <ImageWithLogo
              src="/images/regional-presence-baterino.jpg"
              alt="Regional Presence"
              className="h-[440px] w-full rounded-[10px] lg:col-span-2"
              imgClassName="rounded-[10px] object-cover"
              logoSize="lg"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="divider" />
      </div>

      {/* Join Baterino — Partnership section */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">

          {/* Header */}
          <div className="mb-12 md:mb-16">
            <h2 className="mb-3 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
              {t('globalPresence.joinBaterino.title')}
            </h2>
            <p className="max-w-2xl font-body text-base leading-relaxed text-neutral-500 md:text-lg">
              {t('globalPresence.joinBaterino.subtitle')}
            </p>
          </div>

          {/* Two cards */}
          <div className="mb-12 grid grid-cols-1 gap-7 md:grid-cols-2">

            {/* Partnership pathways */}
            <div className="rounded-xl border border-neutral-200 bg-white p-8">
              <h3 className="mb-6 font-heading text-lg font-medium text-neutral-900 md:text-xl">
                {t('globalPresence.joinBaterino.pathwaysTitle')}
              </h3>
              <div className="space-y-4">
                {(t('globalPresence.joinBaterino.partners', { returnObjects: true }) as { title: string; desc: string }[]).map((item, i, arr) => (
                  <div key={i} className={`pb-4${i !== arr.length - 1 ? ' border-b border-neutral-200' : ''}`}>
                    <p className="mb-1 text-sm font-medium text-neutral-900 md:text-base">{item.title}</p>
                    <p className="text-xs text-neutral-500 md:text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner benefits */}
            <div className="flex flex-col rounded-xl border border-neutral-200 bg-white p-8">
              <h3 className="mb-6 font-heading text-lg font-medium text-neutral-900 md:text-xl">
                {t('globalPresence.joinBaterino.benefitsTitle')}
              </h3>
              <div className="space-y-4">
                {(t('globalPresence.joinBaterino.benefits', { returnObjects: true }) as { title: string; desc: string }[]).map((item, i, arr) => (
                  <div key={i} className={`pb-4${i !== arr.length - 1 ? ' border-b border-neutral-200' : ''}`}>
                    <p className="mb-1 text-sm font-medium text-neutral-900 md:text-base">{item.title}</p>
                    <p className="text-xs text-neutral-500 md:text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-auto border-t border-neutral-200 pt-6">
                <p className="mb-4 text-sm text-neutral-500">
                  {t('globalPresence.joinBaterino.ctaLabel')}
                </p>
                <Link
                  to={`${base}/contact`}
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-900 transition-colors duration-200 hover:bg-neutral-50"
                >
                  {t('globalPresence.joinBaterino.ctaButton')}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>
    </article>
  )
}
