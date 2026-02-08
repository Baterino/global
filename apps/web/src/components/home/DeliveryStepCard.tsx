import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

interface DeliveryStepCardProps {
  number: number
  titleKey: string
  descKey: string
  isLast?: boolean
}

export function DeliveryStepCard({ number, titleKey, descKey, isLast = false }: DeliveryStepCardProps) {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const deliveryPath = `/${locale ?? 'en'}/delivery`
  
  return (
    <article className="flex flex-col rounded-[10px] bg-zinc-100 p-6 sm:p-8">
      <div className="inline-flex items-center gap-2">
        <span className="font-nunito text-5xl font-extrabold leading-none text-neutral-800 sm:text-6xl">
          {number}
        </span>
        <h3 className="font-heading text-heading-md font-semibold text-neutral-900">
          {t(titleKey)}
        </h3>
      </div>
      <p className="mt-4 flex-1 font-body text-body-md leading-relaxed text-neutral-700">
        {t(descKey)}
      </p>
      {isLast ? (
        <div className="mt-6 flex justify-center">
          <Link
            to={deliveryPath}
            className="inline-flex h-10 w-36 items-center justify-center rounded-[5px] bg-white font-body text-body-sm font-bold text-neutral-900 transition-colors hover:bg-neutral-100"
          >
            {t('home.carousel.learnMore')}
          </Link>
        </div>
      ) : (
        <Link to={deliveryPath} className="group/arrow mt-6 flex cursor-pointer items-center gap-4">
          <div className="flex-1 border-t border-neutral-500" aria-hidden />
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-neutral-900 transition-transform duration-300 group-hover/arrow:translate-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-neutral-900"
              aria-hidden
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </Link>
      )}
    </article>
  )
}
