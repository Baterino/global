import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

export function Footer() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const year = new Date().getFullYear()
  const base = `/${locale ?? 'en'}`

  return (
    <footer className="w-full border-t border-neutral-200 bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <img
              src="/images/Baterino-Logo-black.png"
              alt="Baterino"
              className="h-6 w-auto"
            />
          </div>
          <div className="flex gap-6 font-body text-body-md text-neutral-600">
            <Link to={`${base}/press`} className="hover:text-black transition-colors">
              Press
            </Link>
            <Link to={`${base}/careers`} className="hover:text-black transition-colors">
              {t('nav.careers')}
            </Link>
            <Link to={`${base}/contact`} className="hover:text-black transition-colors">
              Contact
            </Link>
          </div>
          <p className="font-body text-body-md text-neutral-600">
            {t('home.footer.copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  )
}
