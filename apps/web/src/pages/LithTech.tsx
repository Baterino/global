import { useTranslation } from 'react-i18next'

export function LithTech() {
  const { t } = useTranslation()

  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {t('lithtech.hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-[800px] font-body text-body-md leading-relaxed text-neutral-700">
            {t('lithtech.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Hero Image Placeholder with Logo */}
      <section className="w-full bg-white px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="relative h-[400px] w-full overflow-hidden rounded-[10px]">
            <img src="/images/about-lithtech.jpg" alt="LithTech" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <span className="font-heading text-xl font-bold text-neutral-900">LITHTECH</span>
            </div>
          </div>
        </div>
      </section>

      {/* About LithTech + Vision + Mission Section */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - About LithTech */}
            <div>
              <h2 className="mb-6 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('lithtech.about.title')}
              </h2>
              <p className="mb-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('lithtech.about.paragraph1')}
              </p>
              <p className="font-body text-body-md leading-relaxed text-neutral-700">
                {t('lithtech.about.paragraph2')}
              </p>
            </div>

            {/* Right Column - Vision & Mission */}
            <div className="flex flex-col gap-6">
              <div className="rounded-lg bg-[#f7f7f7] p-6">
                <h3 className="mb-4 font-heading text-xl font-bold uppercase text-neutral-900">
                  {t('lithtech.vision.title')}
                </h3>
                <p className="font-body text-body-md leading-relaxed text-neutral-700">
                  {t('lithtech.vision.description')}
                </p>
              </div>
              <div className="rounded-lg bg-[#f7f7f7] p-6">
                <h3 className="mb-4 font-heading text-xl font-bold uppercase text-neutral-900">
                  {t('lithtech.mission.title')}
                </h3>
                <p className="font-body text-body-md leading-relaxed text-neutral-700">
                  {t('lithtech.mission.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-neutral-200" />
      </div>

      {/* What LithTech Does Section - 3 Cards */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-8 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            {t('lithtech.whatWeDo.title')}
          </h2>
          <p className="mb-12 font-body text-body-md leading-relaxed text-neutral-700">
            {t('lithtech.whatWeDo.intro')}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 - Industrial & Commercial */}
            <div className="flex flex-col overflow-hidden rounded-[10px] bg-neutral-50 shadow-sm">
              <img src="/images/lithtechc-industrial-storage.jpg" alt="" className="h-48 w-full shrink-0 object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <h4 className="mb-3 max-w-[13rem] font-heading text-base font-bold uppercase leading-tight tracking-tight text-neutral-900">
                  {t('lithtech.whatWeDo.card1.title')}
                </h4>
                <p className="font-body text-body-md leading-relaxed text-neutral-700">
                  {t('lithtech.whatWeDo.card1.description')}
                </p>
              </div>
            </div>

            {/* Card 2 - Marine */}
            <div className="flex flex-col overflow-hidden rounded-[10px] bg-neutral-50 shadow-sm">
              <img src="/images/lithtech-maritime-solutions.jpg" alt="" className="h-48 w-full shrink-0 object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <h4 className="mb-3 max-w-[13rem] font-heading text-base font-bold uppercase leading-tight tracking-tight text-neutral-900">
                  {t('lithtech.whatWeDo.card2.title')}
                </h4>
                <p className="font-body text-body-md leading-relaxed text-neutral-700">
                  {t('lithtech.whatWeDo.card2.description')}
                </p>
              </div>
            </div>

            {/* Card 3 - BMS */}
            <div className="flex flex-col overflow-hidden rounded-[10px] bg-neutral-50 shadow-sm">
              <img src="/images/lithtech-energy-battery-system.jpg" alt="" className="h-48 w-full shrink-0 object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <h4 className="mb-3 max-w-[13rem] font-heading text-base font-bold uppercase leading-tight tracking-tight text-neutral-900">
                  {t('lithtech.whatWeDo.card3.title')}
                </h4>
                <p className="font-body text-body-md leading-relaxed text-neutral-700">
                  {t('lithtech.whatWeDo.card3.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-neutral-200" />
      </div>

      {/* Global Footprint Section */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Text (1/3) */}
            <div className="lg:col-span-1">
              <h2 className="mb-6 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('lithtech.footprint.title')}
              </h2>
              <p className="mb-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('lithtech.footprint.intro')}
              </p>
              <ul className="space-y-2 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('lithtech.footprint.bullet1')}</li>
                <li>• {t('lithtech.footprint.bullet2')}</li>
                <li>• {t('lithtech.footprint.bullet3')}</li>
              </ul>
            </div>

            {/* Right Column - Image Placeholder (2/3) */}
            <img src="/images/lithtech-globall-presence.jpg" alt="Global Footprint" className="h-[400px] w-full rounded-[10px] object-cover lg:col-span-2" />
          </div>
        </div>
      </section>
    </article>
  )
}
