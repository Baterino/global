import { useTranslation } from 'react-i18next'
import { ImageWithLogo } from '../components/ImageWithLogo'
import { WhatWeDoSlider } from '../components/about/WhatWeDoSlider'

export function AboutBaterino() {
  const { t } = useTranslation()

  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {t('aboutBaterino.hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-[800px] font-body text-body-md leading-relaxed text-neutral-700">
            {t('aboutBaterino.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="w-full bg-white px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <ImageWithLogo
            src="/images/about-baterino.jpg"
            alt="About Baterino"
            className="h-[400px] w-full rounded-[10px]"
            imgClassName="rounded-[10px] object-cover"
            logoSize="lg"
          />
        </div>
      </section>

      {/* Who We Are + Vision/Mission Section */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Who We Are */}
            <div>
              <h2 className="mb-6 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('aboutBaterino.whoWeAre.title')}
              </h2>
              <p className="mb-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('aboutBaterino.whoWeAre.intro')}
              </p>
              <p className="mb-6 font-body text-body-md leading-relaxed text-neutral-700">
                {t('aboutBaterino.whoWeAre.description')}
              </p>
              <p className="font-body text-body-md leading-relaxed text-neutral-700">
                {t('aboutBaterino.whoWeAre.role')}
              </p>
            </div>

            {/* Right Column - Vision & Mission */}
            <div className="flex flex-col gap-6">
              {/* Vision */}
              <div className="rounded-lg bg-[#f7f7f7] p-6">
                <h3 className="mb-4 font-heading text-xl font-bold uppercase text-neutral-900">
                  {t('aboutBaterino.vision.title')}
                </h3>
                <p className="font-body text-body-md leading-relaxed text-neutral-700">
                  {t('aboutBaterino.vision.description')}
                </p>
              </div>

              {/* Mission */}
              <div className="rounded-lg bg-[#f7f7f7] p-6">
                <h3 className="mb-4 font-heading text-xl font-bold uppercase text-neutral-900">
                  {t('aboutBaterino.mission.title')}
                </h3>
                <p className="font-body text-body-md leading-relaxed text-neutral-700">
                  {t('aboutBaterino.mission.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="divider" />
      </div>

      {/* What We Do Section */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-8 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            {t('aboutBaterino.whatWeDo.title')}
          </h2>
          <p className="mb-12 font-body text-body-md leading-relaxed text-neutral-700">
            {t('aboutBaterino.whatWeDo.intro')}
          </p>

          <WhatWeDoSlider />
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="divider" />
      </div>

      {/* Social Impact Section */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-12 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            {t('aboutBaterino.socialImpact.title')}
          </h2>

          {/* Large Image */}
          <ImageWithLogo
            src="/images/social-impact.jpg"
            alt="Social Impact"
            className="mb-12 h-[400px] w-full rounded-[10px]"
            imgClassName="rounded-[10px] object-cover"
            logoSize="lg"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* There When You Need Us */}
            <div>
              <h4 className="mb-3 font-heading text-base font-bold text-neutral-900">
                {t('aboutBaterino.socialImpact.whenNeeded.title')}
              </h4>
              <p className="font-body text-body-md leading-relaxed text-neutral-700">
                {t('aboutBaterino.socialImpact.whenNeeded.description')}
              </p>
            </div>

            {/* Vulnerable Groups */}
            <div>
              <h4 className="mb-3 font-heading text-base font-bold text-neutral-900">
                {t('aboutBaterino.socialImpact.vulnerable.title')}
              </h4>
              <p className="font-body text-body-md leading-relaxed text-neutral-700">
                {t('aboutBaterino.socialImpact.vulnerable.description')}
              </p>
            </div>

            {/* Disaster Relief */}
            <div>
              <h4 className="mb-3 font-heading text-base font-bold text-neutral-900">
                {t('aboutBaterino.socialImpact.disaster.title')}
              </h4>
              <p className="font-body text-body-md leading-relaxed text-neutral-700">
                {t('aboutBaterino.socialImpact.disaster.description')}
              </p>
            </div>

            {/* Community Energy */}
            <div>
              <h4 className="mb-3 font-heading text-base font-bold text-neutral-900">
                {t('aboutBaterino.socialImpact.community.title')}
              </h4>
              <p className="font-body text-body-md leading-relaxed text-neutral-700">
                {t('aboutBaterino.socialImpact.community.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
