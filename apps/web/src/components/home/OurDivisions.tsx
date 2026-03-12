import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const DIVISIONS = [
  { src: '/images/baterino-industrial-black.png', altKey: 'nav.solutions.industrial', to: 'solutions/industrial' },
  { src: '/images/baterino-medical-black.png', altKey: 'nav.solutions.medical', to: 'impact' },
  { src: '/images/baterino-maritime-black.png', altKey: 'nav.solutions.maritime', to: 'solutions/maritime' },
] as const

export function OurDivisions() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`

  return (
    <div className="relative flex w-full max-w-[877px] flex-col items-center gap-4 px-4 py-6">
      <span className="font-body text-lg font-medium leading-6 text-black">
        {t('home.ourDivisions')}
      </span>
      <div className="flex h-10 w-full flex-nowrap items-stretch justify-center gap-12 sm:gap-16">
        {DIVISIONS.map(({ src, altKey, to }) => (
          <Link
            key={to}
            to={`${base}/${to}`}
            className="flex h-10 min-h-10 max-h-10 shrink-0 items-center justify-center opacity-20 transition-opacity hover:opacity-90"
          >
            <img
              src={src}
              alt={t(altKey)}
              className="h-10 max-h-10 w-auto max-w-64 object-contain object-center"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
