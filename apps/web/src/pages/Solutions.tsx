import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PageLayout } from '../components/PageLayout'
import { nav } from '../config/nav'

export function Solutions() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale}`

  return (
    <PageLayout titleKey="pageTitle.solutions">
      <p className="mb-8">{t('nav.solutions')} — Residential, Industrial, Maritime.</p>
      <ul className="grid gap-4 sm:grid-cols-3">
        {nav.solutions.sub.map((s) => (
          <li key={s.path}>
            <Link
              to={`${base}/solutions/${s.path}`}
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
