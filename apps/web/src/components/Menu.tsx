import { useState, useEffect } from 'react'
import { Link, NavLink, useParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { nav } from '../config/nav'
import { LanguageDropdown } from './LanguageDropdown'
import { type Locale } from '../i18n'

export function Menu() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const lng = (locale ?? 'en') as Locale
  const location = useLocation()
  const base = `/${lng}`
  const solutionsPath = `${base}/solutions`
  const companyPath = `${base}/company`
  const isSolutionsActive =
    location.pathname === solutionsPath || location.pathname.startsWith(`${solutionsPath}/`)
  const isCompanyActive =
    location.pathname === companyPath || location.pathname.startsWith(`${companyPath}/`)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [mobileSolutionsExpanded, setMobileSolutionsExpanded] = useState(false)
  const [mobileCompanyExpanded, setMobileCompanyExpanded] = useState(false)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.dropdown-container')) {
        setSolutionsOpen(false)
        setCompanyOpen(false)
      }
    }

    if (solutionsOpen || companyOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [solutionsOpen, companyOpen])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      setMobileSolutionsExpanded(false)
      setMobileCompanyExpanded(false)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const link = (path: string) => `${base}/${path}`
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-body-sm font-medium transition-colors hover:!text-black hover:underline hover:decoration-2 hover:underline-offset-4 ${
      isActive ? 'text-neutral-900 underline decoration-2 underline-offset-4' : 'text-neutral-600'
    }`

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Link
        to={base}
        className="shrink-0 hover:opacity-80"
        onClick={() => setMobileOpen(false)}
      >
        <img
          src="/images/Baterino-Logo-black.png"
          alt="Baterino"
          className="h-6 w-auto sm:h-7"
        />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
        <div className="dropdown-container relative">
          <button
            type="button"
            className={navLinkClass({ isActive: isSolutionsActive })}
            onClick={() => setSolutionsOpen(!solutionsOpen)}
          >
            <span className="inline-flex items-center gap-1">
              {t('nav.solutions')}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          {solutionsOpen && (
            <ul
              className="absolute left-0 top-full z-10 mt-1 min-w-[200px] rounded-lg border border-neutral-200 bg-white py-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
              role="menu"
            >
              {nav.solutions.sub.map((s) => (
                <li key={s.path} role="none">
                  <Link
                    to={link(`solutions/${s.path}`)}
                    className="block px-4 py-2 text-body-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                    role="menuitem"
                    onClick={() => {
                      setSolutionsOpen(false)
                      setMobileOpen(false)
                    }}
                  >
                    {t(s.key)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <NavLink
          to={link(nav.delivery.path)}
          className={navLinkClass}
          onClick={() => setMobileOpen(false)}
        >
          {t('nav.delivery')}
        </NavLink>
        <NavLink
          to={link(nav.impact.path)}
          className={navLinkClass}
          onClick={() => setMobileOpen(false)}
        >
          {t('nav.impact')}
        </NavLink>
        <NavLink
          to={link(nav.globalPresence.path)}
          className={navLinkClass}
          onClick={() => setMobileOpen(false)}
        >
          {t('nav.globalPresence')}
        </NavLink>
        <NavLink
          to={link(nav.insights.path)}
          className={navLinkClass}
          onClick={() => setMobileOpen(false)}
        >
          {t('nav.insights')}
        </NavLink>

        <div className="dropdown-container relative">
          <button
            type="button"
            className={navLinkClass({ isActive: isCompanyActive })}
            onClick={() => setCompanyOpen(!companyOpen)}
          >
            <span className="inline-flex items-center gap-1">
              {t('nav.company')}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          {companyOpen && (
            <ul
              className="absolute left-0 top-full z-10 mt-1 min-w-[200px] rounded-lg border border-neutral-200 bg-white py-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
              role="menu"
            >
              {nav.company.sub.map((s) => (
                <li key={s.path} role="none">
                  <Link
                    to={link(`company/${s.path}`)}
                    className="block px-4 py-2 text-body-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                    role="menuitem"
                    onClick={() => {
                      setCompanyOpen(false)
                      setMobileOpen(false)
                    }}
                  >
                    {t(s.key)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <NavLink
          to={link(nav.contact.path)}
          className={navLinkClass}
          onClick={() => setMobileOpen(false)}
        >
          {t('nav.contact')}
        </NavLink>
      </nav>

      <div className="flex items-center gap-4">
        <LanguageDropdown />
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 lg:hidden dark:border-neutral-700 dark:text-neutral-400"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu: full-screen overlay + slide-down panel */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          className="absolute inset-0 bg-neutral-900/50 transition-opacity duration-300"
          style={{ opacity: mobileOpen ? 1 : 0 }}
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
        {/* Panel */}
        <div
          className="absolute left-0 right-0 top-0 flex max-h-[100dvh] flex-col rounded-b-2xl bg-white shadow-xl transition-transform duration-300 ease-out"
          style={{ transform: mobileOpen ? 'translateY(0)' : 'translateY(-100%)' }}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-4">
            <Link
              to={base}
              className="shrink-0 hover:opacity-80"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src="/images/Baterino-Logo-black.png"
                alt="Baterino"
                className="h-7 w-auto"
              />
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Nav list */}
          <nav
            className="min-h-0 flex-1 overflow-y-auto px-4 py-6"
            aria-label="Main navigation"
          >
            <ul className="flex flex-col gap-0.5">
              {/* Solutions (collapsible) */}
              <li>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between py-3.5 text-left font-body text-[18px] font-medium text-neutral-900 ${
                    isSolutionsActive ? 'text-neutral-900' : 'text-neutral-700'
                  }`}
                  onClick={() => setMobileSolutionsExpanded((e) => !e)}
                  aria-expanded={mobileSolutionsExpanded}
                >
                  {t('nav.solutions')}
                  <svg
                    className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                      mobileSolutionsExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileSolutionsExpanded && (
                  <ul className="border-l-2 border-neutral-200 pl-4">
                    {nav.solutions.sub.map((s) => (
                      <li key={s.path}>
                        <Link
                          to={link(`solutions/${s.path}`)}
                          className="block py-2.5 font-body text-[16px] text-neutral-600 hover:text-neutral-900"
                          onClick={() => setMobileOpen(false)}
                        >
                          {t(s.key)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="border-t border-neutral-100" />
              <li>
                <NavLink
                  to={link(nav.delivery.path)}
                  className={({ isActive }) =>
                    `block py-3.5 font-body text-[18px] font-medium ${
                      isActive ? 'text-neutral-900' : 'text-neutral-700 hover:text-neutral-900'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.delivery')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={link(nav.impact.path)}
                  className={({ isActive }) =>
                    `block py-3.5 font-body text-[18px] font-medium ${
                      isActive ? 'text-neutral-900' : 'text-neutral-700 hover:text-neutral-900'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.impact')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={link(nav.globalPresence.path)}
                  className={({ isActive }) =>
                    `block py-3.5 font-body text-[18px] font-medium ${
                      isActive ? 'text-neutral-900' : 'text-neutral-700 hover:text-neutral-900'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.globalPresence')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={link(nav.insights.path)}
                  className={({ isActive }) =>
                    `block py-3.5 font-body text-[18px] font-medium ${
                      isActive ? 'text-neutral-900' : 'text-neutral-700 hover:text-neutral-900'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.insights')}
                </NavLink>
              </li>
              <li className="border-t border-neutral-100" />
              {/* Company (collapsible) */}
              <li>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between py-3.5 text-left font-body text-[18px] font-medium text-neutral-900 ${
                    isCompanyActive ? 'text-neutral-900' : 'text-neutral-700'
                  }`}
                  onClick={() => setMobileCompanyExpanded((e) => !e)}
                  aria-expanded={mobileCompanyExpanded}
                >
                  {t('nav.company')}
                  <svg
                    className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                      mobileCompanyExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileCompanyExpanded && (
                  <ul className="border-l-2 border-neutral-200 pl-4">
                    {nav.company.sub.map((s) => (
                      <li key={s.path}>
                        <Link
                          to={link(`company/${s.path}`)}
                          className="block py-2.5 font-body text-[16px] text-neutral-600 hover:text-neutral-900"
                          onClick={() => setMobileOpen(false)}
                        >
                          {t(s.key)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="border-t border-neutral-100" />
              <li>
                <NavLink
                  to={link(nav.contact.path)}
                  className={({ isActive }) =>
                    `block py-3.5 font-body text-[18px] font-medium ${
                      isActive ? 'text-neutral-900' : 'text-neutral-700 hover:text-neutral-900'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {t('nav.contact')}
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* Footer: language */}
          <div className="shrink-0 border-t border-neutral-100 px-4 py-4">
            <span className="mb-2 block font-body text-body-sm font-medium text-neutral-500">
              Language
            </span>
            <LanguageDropdown />
          </div>
        </div>
      </div>
    </div>
  )
}
