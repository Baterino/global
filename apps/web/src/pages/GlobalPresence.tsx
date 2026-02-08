import { useTranslation } from 'react-i18next'

export function GlobalPresence() {
  const { t } = useTranslation()

  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-4xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
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
              <img
                src="/images/operating-globally.jpg"
                alt="Operating Globally"
                className="h-[320px] w-full rounded-[10px] object-cover sm:h-[350px]"
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
              <img
                src="/images/delivering-locally.jpg"
                alt="Acting Locally"
                className="h-[320px] w-full rounded-[10px] object-cover sm:h-[350px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-neutral-200" />
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
            <img
              src="/images/regional-presence-baterino.jpg"
              alt="Regional Presence"
              className="h-[440px] w-full rounded-[10px] object-cover lg:col-span-2"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-neutral-200" />
      </div>

      {/* Partner Up With Us & Why ? - Two card-like columns */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left - Partner Up With Us */}
            <div className="rounded-[10px] bg-neutral-50 p-8">
              <h2 className="mb-6 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('globalPresence.partnerUp.title')}
              </h2>
              <p className="mb-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('globalPresence.partnerUp.intro')}
              </p>
              <p className="mb-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('globalPresence.partnerUp.listLabel')}
              </p>
              <ul className="list-none space-y-2 font-body text-body-md text-neutral-700">
                <li>• {t('globalPresence.partnerUp.bullet1')}</li>
                <li>• {t('globalPresence.partnerUp.bullet2')}</li>
                <li>• {t('globalPresence.partnerUp.bullet3')}</li>
                <li>• {t('globalPresence.partnerUp.bullet4')}</li>
              </ul>
            </div>

            {/* Right - Why ? */}
            <div className="rounded-[10px] bg-neutral-50 p-8">
              <h2 className="mb-6 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('globalPresence.why.title')}
              </h2>
              <p className="mb-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('globalPresence.why.intro')}
              </p>
              <ul className="list-none space-y-2 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('globalPresence.why.bullet1')}</li>
                <li>• {t('globalPresence.why.bullet2')}</li>
                <li>• {t('globalPresence.why.bullet3')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
