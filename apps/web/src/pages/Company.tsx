import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageLayout } from '../components/PageLayout'
import { nav } from '../config/nav'

export function Company() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale}`

  return (
    <PageLayout titleKey="pageTitle.company">
      <p className="mb-8">{t('nav.company')} — About Baterino, LithTech.</p>
      <ul className="grid gap-4 sm:grid-cols-3">
        {nav.company.sub.map((s) => (
          <li key={s.path}>
            <Link
              to={`${base}/company/${s.path}`}
              className="block rounded-xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
            >
              <span className="text-heading-md font-semibold text-neutral-900 dark:text-white">
                {t(s.key)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  )
}
