import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SEOHead } from '../components/SEOHead'
import { ArrowRightIcon } from '../components/ArrowRightIcon'

export function NotFound() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`

  return (
    <>
      <SEOHead title={t('pageTitle.notFound')} noIndex />
      <article className="mx-auto max-w-[1200px] px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-display-sm font-semibold uppercase tracking-tight text-neutral-900 dark:text-white mb-4">
          {t('pageTitle.notFound')}
        </h1>
        <p className="text-body-md text-neutral-600 dark:text-neutral-400 mb-8">
          {t('notFound.message')}
        </p>
        <Link
          to={base}
          className="btn-primary"
        >
          {t('notFound.backHome')}
          <ArrowRightIcon />
        </Link>
      </article>
    </>
  )
}
