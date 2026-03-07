import { useTranslation } from 'react-i18next'
import { ImageWithLogo } from '../components/ImageWithLogo'

export function SolutionsIndustrial() {
  const { t } = useTranslation()

  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-2xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 opacity-90 sm:mx-auto sm:max-w-[720px] sm:text-display-sm sm:leading-[1.2] lg:max-w-[780px] lg:text-display-md lg:leading-[1.15]">
            {t('industrial.hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-[740px] font-body text-body-md font-medium leading-relaxed text-neutral-600">
            {t('industrial.hero.subtitle')}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 font-nunito text-body-sm font-normal text-neutral-500">
            <span>{t('home.hero.poweredBy')}</span>
            <a
              href="https://www.ltc-energy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <img src="/images/lithtech-logo.webp" alt="LithTech" className="h-5 w-auto object-contain" />
            </a>
          </div>
        </div>
      </section>

      {/* Cabinet-Based Section */}
      <section className="w-full bg-white px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <ImageWithLogo
            src="/images/industrial-cabinet.png"
            alt=""
            className="mb-8 h-64 w-full rounded-[10px] sm:h-96"
            imgClassName="rounded-[10px] object-cover"
            logoSize="lg"
          />
          
          <div className="grid gap-8 lg:grid-cols-[4fr_3fr_3fr]">
            {/* Left Column: Title, Description, Power - 40% */}
            <div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('industrial.cabinet.title')}
              </h2>
              <p className="mt-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('industrial.cabinet.desc1')}
              </p>
              <p className="mt-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('industrial.cabinet.desc2')}
              </p>
              <p className="mt-6 font-heading text-xl font-bold text-neutral-900">
                {t('industrial.cabinet.power')}
              </p>
            </div>
            
            {/* Middle Column: Our Focus - 30% */}
            <div className="rounded-[10px] bg-neutral-50 p-6 lg:p-8">
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                {t('industrial.cabinet.ourFocus')}
              </h3>
              <ul className="mt-4 space-y-3 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('industrial.cabinet.focus1')}</li>
                <li>• {t('industrial.cabinet.focus2')}</li>
                <li>• {t('industrial.cabinet.focus3')}</li>
                <li>• {t('industrial.cabinet.focus4')}</li>
              </ul>
            </div>
            
            {/* Right Column: Typical Applications - 30% */}
            <div className="rounded-[10px] bg-neutral-50 p-6 lg:p-8">
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                {t('industrial.cabinet.applications')}
              </h3>
              <ul className="mt-4 space-y-3 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('industrial.cabinet.app1')}</li>
                <li>• {t('industrial.cabinet.app2')}</li>
                <li>• {t('industrial.cabinet.app3')}</li>
                <li>• {t('industrial.cabinet.app4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Containerized & Large Scale Section */}
      <section className="w-full border-t border-neutral-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <ImageWithLogo
            src="/images/bess-solutions.jpg"
            alt=""
            className="mb-8 h-64 w-full rounded-[10px] sm:h-96"
            imgClassName="rounded-[10px] object-cover"
            logoSize="lg"
          />
          
          <div className="grid gap-8 lg:grid-cols-[4fr_3fr_3fr]">
            {/* Left Column: Title, Description, Power - 40% */}
            <div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('industrial.containerized.title')}
              </h2>
              <p className="mt-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('industrial.containerized.desc1')}
              </p>
              <p className="mt-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('industrial.containerized.desc2')}
              </p>
              <p className="mt-6 font-heading text-xl font-bold text-neutral-900">
                {t('industrial.containerized.power')}
              </p>
            </div>
            
            {/* Middle Column: Our Focus - 30% */}
            <div className="rounded-[10px] bg-neutral-50 p-6 lg:p-8">
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                {t('industrial.containerized.ourFocus')}
              </h3>
              <ul className="mt-4 space-y-3 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('industrial.containerized.focus1')}</li>
                <li>• {t('industrial.containerized.focus2')}</li>
                <li>• {t('industrial.containerized.focus3')}</li>
                <li>• {t('industrial.containerized.focus4')}</li>
              </ul>
            </div>
            
            {/* Right Column: Applications - 30% */}
            <div className="rounded-[10px] bg-neutral-50 p-6 lg:p-8">
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                {t('industrial.containerized.applications')}
              </h3>
              <ul className="mt-4 space-y-3 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('industrial.containerized.app1')}</li>
                <li>• {t('industrial.containerized.app2')}</li>
                <li>• {t('industrial.containerized.app3')}</li>
                <li>• {t('industrial.containerized.app4')}</li>
                <li>• {t('industrial.containerized.app5')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
