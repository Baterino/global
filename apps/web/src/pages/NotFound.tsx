import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SeoHead } from '../components/SeoHead'

export function NotFound() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`

  return (
    <>
      <SeoHead title={t('pageTitle.notFound')} noIndex />
      <article className="mx-auto max-w-[1200px] px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-display-sm font-semibold uppercase tracking-tight text-neutral-900 dark:text-white mb-4">
          {t('pageTitle.notFound')}
        </h1>
        <p className="text-body-md text-neutral-600 dark:text-neutral-400 mb-8">
          {t('notFound.message')}
        </p>
        <Link
          to={base}
          className="inline-block rounded-lg bg-neutral-900 px-4 py-2 text-body-sm font-medium text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          {t('notFound.backHome')}
        </Link>
      </article>
    </>
  )
}
