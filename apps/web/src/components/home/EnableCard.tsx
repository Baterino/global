import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface EnableCardProps {
  image: string
  titleKey: string
  descKey: string
  to: string
}

export function EnableCard({ image, titleKey, descKey, to }: EnableCardProps) {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`

  return (
    <Link
      to={`${base}${to}`}
      className="group relative block w-full overflow-hidden rounded-[10px] min-h-[200px] aspect-[4/3] lg:min-h-[320px] lg:aspect-[589/340]"
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <img
        src="/images/baterino-logo-white.png"
        alt="Baterino"
        className="absolute bottom-4 right-4 z-10 h-6 w-auto object-contain drop-shadow-sm sm:h-8"
        aria-hidden
      />
      <div className="absolute inset-0 rounded-[10px] bg-black/20 transition-colors group-hover:bg-black/10" />
      <div className="absolute bottom-0 left-0 right-0 flex items-end rounded-[10px] p-4 text-white sm:p-6 lg:p-8">
        <div className="min-w-0 flex-1">
          <span className="font-heading text-heading-md font-bold uppercase tracking-tight sm:text-heading-lg lg:text-section-title">
            {t(titleKey)}
          </span>
          <p className="mt-1.5 font-body text-body-sm leading-relaxed text-white/90 sm:mt-2 sm:text-body-md">
            {t(descKey)}
          </p>
        </div>
      </div>
    </Link>
  )
}
