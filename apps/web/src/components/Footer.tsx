import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { nav } from '../config/nav'

const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/baterino', Icon: LinkedInIcon },
  { name: 'Facebook', href: 'https://www.facebook.com/baterino', Icon: FacebookIcon },
  { name: 'Substack', href: 'https://baterino.substack.com', Icon: SubstackIcon },
] as const

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function SubstackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  )
}

export function Footer() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const year = new Date().getFullYear()
  const base = `/${locale ?? 'en'}`

  const linkClass = 'font-body text-body-sm text-neutral-600 transition-colors hover:text-neutral-900'

  return (
    <footer className="w-full border-t border-neutral-200 bg-white pt-16">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Logo & LithTech */}
          <div>
            <Link to={base} className="block">
              <img
                src="/images/Baterino-Logo-black.png"
                alt="Baterino"
                className="h-8 w-auto"
              />
            </Link>
            <div className="mt-4 flex flex-col gap-2 font-body text-body-sm text-neutral-600">
              <p>
                {t('home.footer.poweredByLabel')}
                <a
                  href="https://ltc-energy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-neutral-900 underline-offset-2 hover:underline"
                >
                  LithTech
                </a>
              </p>
              <p>
                {t('home.footer.alignedByLabel')}
                <a
                  href="https://elarionglobal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-neutral-900 underline-offset-2 hover:underline"
                >
                  Elarion Global
                </a>
              </p>
            </div>
          </div>

          {/* Residential (Solutions) */}
          <div>
            <h3 className="font-heading text-body-sm font-bold uppercase tracking-tight text-neutral-900">
              {t('home.footer.residentialColumn')}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {nav.solutions.sub.map((s) => (
                <li key={s.path}>
                  <Link to={`${base}/solutions/${s.path}`} className={linkClass}>
                    {t(s.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={`${base}/solutions/industrial`} className={linkClass}>
                  {t('home.whatWeEnable.medical')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-body-sm font-bold uppercase tracking-tight text-neutral-900">
              {t('home.footer.companyColumn')}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {nav.company.sub.map((s) => (
                <li key={s.path}>
                  <Link to={`${base}/company/${s.path}`} className={linkClass}>
                    {t(s.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={`${base}/company/insights`} className={linkClass}>
                  {t('nav.insights')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-heading text-body-sm font-bold uppercase tracking-tight text-neutral-900">
              {t('home.footer.exploreColumn')}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link to={`${base}/delivery`} className={linkClass}>
                  {t('nav.delivery')}
                </Link>
              </li>
              <li>
                <Link to={`${base}/impact`} className={linkClass}>
                  {t('nav.impact')}
                </Link>
              </li>
              <li>
                <Link to={`${base}/global-presence`} className={linkClass}>
                  {t('nav.globalPresence')}
                </Link>
              </li>
              <li>
                <Link to={`${base}/careers`} className={linkClass}>
                  {t('nav.careers')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-body-sm font-bold uppercase tracking-tight text-neutral-900">
              {t('home.footer.contactColumn')}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link to={`${base}/contact`} className={linkClass}>
                  {t('nav.contact')}
                </Link>
              </li>
              <li className="flex gap-4">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 transition-colors hover:text-neutral-900"
                    aria-label={s.name}
                  >
                    <s.Icon className="h-5 w-5" />
                  </a>
                ))}
              </li>
              <li>
                <Link to={`${base}/${nav.termsOfUse.path}`} className={linkClass}>
                  {t('nav.termsOfUse')}
                </Link>
              </li>
              <li>
                <Link to={`${base}/${nav.privacyPolicy.path}`} className={linkClass}>
                  {t('nav.privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex justify-center border-t border-neutral-200 pt-12 pb-4">
          <p className="font-body text-body-sm text-neutral-600">
            {t('home.footer.copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  )
}
