import { useTranslation } from 'react-i18next'

export function SolutionsResidential() {
  const { t } = useTranslation()

  return (
    <article className="w-full bg-white">
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-2xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 opacity-90 sm:mx-auto sm:max-w-[720px] sm:text-display-sm sm:leading-[1.2] lg:max-w-[780px] lg:text-display-md lg:leading-[1.15]">
            {t('residential.hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-[740px] font-body text-body-md font-medium leading-relaxed text-neutral-600">
            {t('residential.hero.subtitle')}
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

      {/* Individual Users Section */}
      <section className="w-full bg-white px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="mb-8 overflow-hidden rounded-[10px]">
            <img
              src="/images/residential-storage-solutions.png"
              alt=""
              className="h-64 w-full object-cover sm:h-96"
            />
          </div>
          
          <div className="grid gap-8 lg:grid-cols-[4fr_3fr_3fr]">
            <div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('residential.individual.title')}
              </h2>
              <p className="mt-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('residential.individual.desc1')}
              </p>
              <p className="mt-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('residential.individual.desc2')}
              </p>
              <p className="mt-6 font-heading text-xl font-bold text-neutral-900">
                {t('residential.individual.power')}
              </p>
            </div>
            
            <div className="rounded-[10px] bg-neutral-50 p-6 lg:p-8">
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                {t('residential.individual.ourFocus')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-700">
                {t('residential.individual.focusIntro')}
              </p>
              <ul className="mt-4 space-y-3 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('residential.individual.focus1')}</li>
                <li>• {t('residential.individual.focus2')}</li>
                <li>• {t('residential.individual.focus3')}</li>
                <li>• {t('residential.individual.focus4')}</li>
              </ul>
            </div>
            
            <div className="rounded-[10px] bg-neutral-50 p-6 lg:p-8">
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                {t('residential.individual.keyAdvantages')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-700">
                {t('residential.individual.keyAdvantagesIntro')}
              </p>
              <ul className="mt-4 space-y-3 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('residential.individual.advantage1')}</li>
                <li>• {t('residential.individual.advantage2')}</li>
                <li>• {t('residential.individual.advantage3')}</li>
                <li>• {t('residential.individual.advantage4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Microgrids Section */}
      <section className="w-full border-t border-neutral-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="mb-8 overflow-hidden rounded-[10px]">
            <img
              src="/images/residential-microgrids.png"
              alt=""
              className="h-64 w-full object-cover sm:h-96"
            />
          </div>
          
          <div className="grid gap-8 lg:grid-cols-[4fr_3fr_3fr]">
            <div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
                {t('residential.microgrids.title')}
              </h2>
              <p className="mt-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('residential.microgrids.desc1')}
              </p>
              <p className="mt-4 font-body text-body-md leading-relaxed text-neutral-700">
                {t('residential.microgrids.desc2')}
              </p>
              <p className="mt-6 font-heading text-xl font-bold text-neutral-900">
                {t('residential.microgrids.power')}
              </p>
            </div>
            
            <div className="rounded-[10px] bg-neutral-50 p-6 lg:p-8">
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                {t('residential.microgrids.ourFocus')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-700">
                {t('residential.microgrids.focusIntro')}
              </p>
              <ul className="mt-4 space-y-3 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('residential.microgrids.focus1')}</li>
                <li>• {t('residential.microgrids.focus2')}</li>
                <li>• {t('residential.microgrids.focus3')}</li>
                <li>• {t('residential.microgrids.focus4')}</li>
              </ul>
            </div>
            
            <div className="rounded-[10px] bg-neutral-50 p-6 lg:p-8">
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-neutral-900">
                {t('residential.microgrids.keyAdvantages')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-700">
                {t('residential.microgrids.advantagesIntro')}
              </p>
              <ul className="mt-4 space-y-3 font-body text-body-md leading-relaxed text-neutral-700">
                <li>• {t('residential.microgrids.advantage1')}</li>
                <li>• {t('residential.microgrids.advantage2')}</li>
                <li>• {t('residential.microgrids.advantage3')}</li>
                <li>• {t('residential.microgrids.advantage4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
