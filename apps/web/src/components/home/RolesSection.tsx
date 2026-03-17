import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const roles = [
  {
    key: 'integratorEnabler',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    key: 'importer',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    key: 'distributor',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    key: 'afterSales',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
]

export function RolesSection() {
  const { t } = useTranslation()

  return (
    <section className="w-full border-t border-neutral-200 bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Header — subtitle on top, title below */}
        <div className="mb-6 text-center md:text-left">
          <p className="font-body text-body-sm font-semibold uppercase tracking-widest text-[#323671]">
            {t('home.roles.subtitle')}
          </p>
          <h2 className="mt-2 font-heading text-heading-lg font-bold uppercase tracking-tight text-black sm:text-section-title">
            {t('home.roles.title')}
          </h2>
        </div>

        {/* Intro paragraph */}
        <p className="mx-auto mb-10 max-w-[780px] text-center font-body text-body-md font-medium leading-relaxed text-neutral-600 md:mx-0 md:text-left">
          {t('home.roles.intro')}
        </p>

        {/* Role cards — matches article-rich framework-card style */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map(({ key, icon }) => (
            <Link
              key={key}
              to="/global-presence#operating-model"
              className="group flex flex-col gap-4 rounded-[10px] bg-[#f9fafb] p-6 transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(11,7,38,0.12)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#e8ecf5] text-[#0B0726] transition-colors group-hover:bg-[#0B0726] group-hover:text-white">
                {icon}
              </div>
              <div>
                <h3 className="font-heading text-heading-sm font-bold uppercase tracking-tight text-neutral-900">
                  {t(`home.roles.${key}.title`)}
                </h3>
                <p className="mt-2 font-body text-body-sm leading-relaxed text-neutral-600">
                  {t(`home.roles.${key}.desc`)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Closing line */}
        <div className="mt-10">
          <p className="text-center font-body text-body-md italic leading-relaxed text-neutral-600">
            {t('home.roles.closing')}
          </p>
        </div>
      </div>
    </section>
  )
}
