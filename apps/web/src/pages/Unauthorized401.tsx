import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SEOHead } from '../components/SEOHead'
import { ArrowRightIcon } from '../components/ArrowRightIcon'
import { ErrorPageIllustration } from '../components/ErrorPageIllustration'

export function Unauthorized401() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`

  return (
    <>
      <SEOHead title={t('pageTitle.unauthorized')} description={t('unauthorized.message')} noIndex />
      <article className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <ErrorPageIllustration className="mx-auto mb-10 h-12 w-auto sm:h-14" />
        <p className="mb-2 font-body text-body-sm font-semibold uppercase tracking-widest text-[#10064B]">
          {t('unauthorized.code')}
        </p>
        <h1 className="mb-4 font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl">
          {t('unauthorized.title')}
        </h1>
        <p className="mb-10 max-w-md font-body text-body-md leading-relaxed text-neutral-600">
          {t('unauthorized.message')}
        </p>
        <Link to={base} className="btn-primary">
          {t('unauthorized.backHome')}
          <ArrowRightIcon />
        </Link>
      </article>
    </>
  )
}
