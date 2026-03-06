import { useTranslation } from 'react-i18next'

export function Impact() {
  const { t } = useTranslation()

  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {t('impact.hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-[800px] font-body text-body-md leading-relaxed text-neutral-700">
            {t('impact.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Energy for Essential Services */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            {t('impact.essentialServices.title')}
          </h2>
          <p className="mb-8 max-w-[900px] font-body text-body-md leading-relaxed text-neutral-700">
            {t('impact.essentialServices.intro')}
          </p>

          {/* 4 Service Images */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[10px]">
              <img
                src="/images/medical-center.png"
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-end p-6">
                <p className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-white">
                  {t('impact.essentialServices.box1')}
                </p>
              </div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[10px]">
              <img
                src="/images/highschool.png"
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-end p-6">
                <p className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-white">
                  {t('impact.essentialServices.box2')}
                </p>
              </div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[10px]">
              <img
                src="/images/water-sanitation.png"
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-end p-6">
                <p className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-white">
                  {t('impact.essentialServices.box3')}
                </p>
              </div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[10px]">
              <img
                src="/images/emergency-service.png"
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-end p-6">
                <p className="font-heading text-lg font-bold uppercase leading-tight tracking-tight text-white">
                  {t('impact.essentialServices.box4')}
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

      {/* Infrastructure with Purpose */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            {t('impact.infrastructure.title')}
          </h2>
          <p className="mb-8 max-w-[900px] font-body text-body-md leading-relaxed text-neutral-700">
            {t('impact.infrastructure.intro')}
          </p>

          {/* Large Image */}
          <div className="h-[440px] overflow-hidden rounded-[10px]">
            <img
              src="/images/purpose-infrastructure.png"
              alt="Infrastructure with Purpose"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-neutral-200" />
      </div>

      {/* Community Energy & Social Programs */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            {t('impact.community.title')}
          </h2>
          <p className="mb-8 max-w-[900px] font-body text-body-md leading-relaxed text-neutral-700">
            {t('impact.community.intro')}
          </p>

          {/* Two Images Side by Side */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[10px]">
              <img
                src="/images/social-programs.png"
                alt="Social Programs"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-[10px]">
              <img
                src="/images/disaster-relief.png"
                alt="Disaster Relief"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-neutral-200" />
      </div>

      {/* Global Alignment & Long-Term Impact */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* Title and Intro */}
          <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            {t('impact.globalAlignment.title')}
          </h2>
          <p className="mb-12 max-w-[900px] font-body text-body-md leading-relaxed text-neutral-700">
            {t('impact.globalAlignment.intro')}
          </p>

          {/* UN SDG Logo and Goals Layout */}
          <div className="mx-auto w-full max-w-[1200px]">
            {/* Mobile/Tablet: Stack vertically */}
            <div className="grid gap-4 sm:hidden">
              {/* UN Logo Box */}
              <div className="flex flex-col items-start rounded-[10px] bg-zinc-100 p-8">
                <img
                  src="/images/baterino-un-global-goals.png"
                  alt="UN Sustainable Development Goals"
                  className="mb-6 h-auto w-52"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement!.innerHTML = `
                      <div class="mb-6 flex h-32 w-52 items-center justify-center rounded-[10px] bg-neutral-200">
                        <span class="font-heading text-xs font-bold text-neutral-600">UN SDG LOGO</span>
                      </div>
                    `
                  }}
                />
                <p className="mb-6 font-body text-lg font-medium leading-8 text-gray-700">
                  {t('impact.globalAlignment.logoText')}
                </p>
                <a
                  href="https://sdgs.un.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-[5px] bg-white px-6 py-2 font-body text-body-md font-bold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
                >
                  See more
                </a>
              </div>

              {/* Goals */}
              <div className="relative flex flex-col justify-center overflow-hidden rounded-[10px] p-8">
                <img
                  src="/images/clean-energy.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10">
                  <div className="font-heading text-5xl font-bold leading-10 text-white">7</div>
                  <p className="mt-2 font-heading text-lg font-bold leading-6 text-white">
                    {t('impact.globalAlignment.goal7')}
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col justify-center overflow-hidden rounded-[10px] p-8">
                <img
                  src="/images/inovation-infrastructure.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10">
                  <div className="font-heading text-5xl font-bold leading-10 text-white">9</div>
                  <p className="mt-2 font-heading text-lg font-bold leading-6 text-white">
                    {t('impact.globalAlignment.goal9')}
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col justify-center overflow-hidden rounded-[10px] p-8">
                <img
                  src="/images/sustainable-city.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10">
                  <div className="font-heading text-5xl font-bold leading-10 text-white">11</div>
                  <p className="mt-2 font-heading text-lg font-bold leading-6 text-white">
                    {t('impact.globalAlignment.goal11')}
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col justify-center overflow-hidden rounded-[10px] p-8">
                <img
                  src="/images/climate-action.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10">
                  <div className="font-heading text-5xl font-bold leading-10 text-white">13</div>
                  <p className="mt-2 font-heading text-lg font-bold leading-6 text-white">
                    {t('impact.globalAlignment.goal13')}
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col justify-center overflow-hidden rounded-[10px] p-8">
                <img
                  src="/images/partnership-for-goals.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10">
                  <div className="font-heading text-5xl font-bold leading-10 text-white">17</div>
                  <p className="mt-2 font-heading text-lg font-bold leading-6 text-white">
                    {t('impact.globalAlignment.goal17')}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop: CSS Grid layout */}
            <div className="hidden gap-4 sm:grid sm:grid-cols-4">
              {/* UN Logo Box - Tall left column spanning 2 rows */}
              <div className="relative row-span-2 flex h-[592px] flex-col rounded-[10px] bg-zinc-100 p-9">
                <img
                  src="/images/baterino-un-global-goals.png"
                  alt="UN Sustainable Development Goals"
                  className="mt-4 h-44 w-52"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const placeholder = document.createElement('div')
                    placeholder.className = 'flex h-44 w-52 items-center justify-center rounded-[10px] bg-neutral-200'
                    placeholder.innerHTML = '<span class="font-heading text-xs font-bold text-neutral-600">UN SDG LOGO</span>'
                    target.parentElement!.insertBefore(placeholder, target.nextSibling)
                  }}
                />
                <div className="mt-8 w-52 flex-1 font-body text-lg font-medium leading-8 text-gray-700">
                  {t('impact.globalAlignment.logoText')}
                </div>
                <a
                  href="https://sdgs.un.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex w-fit items-center justify-center rounded-[5px] border-2 border-neutral-900 bg-white px-6 py-2 font-body text-body-md font-bold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
                >
                  See more
                </a>
              </div>

              {/* Goal 7 - Second column, top */}
              <div className="relative aspect-square overflow-hidden rounded-[10px]">
                <img
                  src="/images/clean-energy.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-[40px] left-8 right-8 z-10">
                  <div className="font-heading text-5xl font-bold leading-10 text-white">7</div>
                  <p className="mt-2 font-heading text-lg font-bold leading-6 text-white">
                    {t('impact.globalAlignment.goal7')}
                  </p>
                </div>
              </div>

              {/* Goal 9 - Third column, top */}
              <div className="relative aspect-square overflow-hidden rounded-[10px]">
                <img
                  src="/images/inovation-infrastructure.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-[40px] left-8 right-8 z-10">
                  <div className="font-heading text-5xl font-bold leading-10 text-white">9</div>
                  <p className="mt-2 font-heading text-lg font-bold leading-6 text-white">
                    {t('impact.globalAlignment.goal9')}
                  </p>
                </div>
              </div>

              {/* Goal 11 - Fourth column, top */}
              <div className="relative aspect-square overflow-hidden rounded-[10px]">
                <img
                  src="/images/sustainable-city.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-[40px] left-8 right-8 z-10">
                  <div className="font-heading text-5xl font-bold leading-10 text-white">11</div>
                  <p className="mt-2 font-heading text-lg font-bold leading-6 text-white">
                    {t('impact.globalAlignment.goal11')}
                  </p>
                </div>
              </div>

              {/* Goal 13 - Second column, bottom */}
              <div className="relative aspect-square overflow-hidden rounded-[10px]">
                <img
                  src="/images/climate-action.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-[40px] left-8 right-8 z-10">
                  <div className="font-heading text-5xl font-bold leading-10 text-white">13</div>
                  <p className="mt-2 font-heading text-lg font-bold leading-6 text-white">
                    {t('impact.globalAlignment.goal13')}
                  </p>
                </div>
              </div>

              {/* Goal 17 - Third column, bottom */}
              <div className="relative aspect-square overflow-hidden rounded-[10px]">
                <img
                  src="/images/partnership-for-goals.jpg"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-[40px] left-8 right-8 z-10">
                  <div className="font-heading text-5xl font-bold leading-10 text-white">17</div>
                  <p className="mt-2 font-heading text-lg font-bold leading-6 text-white">
                    {t('impact.globalAlignment.goal17')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
