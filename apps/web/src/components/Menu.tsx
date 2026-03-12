import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { nav } from '../config/nav'
import { LanguageDropdown } from './LanguageDropdown'
import { localeLabels, supportedLngs, type Locale } from '../i18n'

export function Menu() {
  const { t, i18n } = useTranslation()
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
  const [mobileSolutionsPanelOpen, setMobileSolutionsPanelOpen] = useState(false)
  const [mobileCompanyPanelOpen, setMobileCompanyPanelOpen] = useState(false)
  const [mobileLanguagePanelOpen, setMobileLanguagePanelOpen] = useState(false)

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
      setMobileSolutionsPanelOpen(false)
      setMobileCompanyPanelOpen(false)
      setMobileLanguagePanelOpen(false)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const link = (path: string) => `${base}/${path}`
  const navigate = useNavigate()
  const handleLanguageChange = (newLocale: string) => {
    const pathWithoutLocale = location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '')
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`
    i18n.changeLanguage(newLocale)
    navigate(newPath + location.search + location.hash)
    setMobileOpen(false)
    setMobileLanguagePanelOpen(false)
  }
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
        <div className="hidden lg:block">
          <LanguageDropdown />
        </div>
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

      {/* Mobile menu: portal to body, slides in from left */}
      {createPortal(
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
          {/* Outer panel: slides in from left when mobile opens */}
          <div
            className="absolute inset-0 z-10 overflow-hidden transition-transform duration-300 ease-out"
            style={{
              transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
            }}
          >
            {/* Inner slider: main + solutions + company + language panels */}
            <div
              className="flex h-full w-[400vw] transition-transform duration-300 ease-out"
              style={{
                transform: mobileSolutionsPanelOpen
                  ? 'translateX(-25%)'
                  : mobileCompanyPanelOpen
                    ? 'translateX(-50%)'
                    : mobileLanguagePanelOpen
                      ? 'translateX(-75%)'
                      : 'translateX(0)',
              }}
            >
          {/* Main panel */}
          <div className="flex h-full w-screen shrink-0 flex-col bg-white shadow-2xl">
          {/* Header: Powered by LithTech */}
          <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-4">
            <a
              href="https://ltc-energy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80"
            >
              <span className="font-body text-body-sm text-neutral-600">
                {t('home.footer.poweredByLabel')}
              </span>
              <img
                src="/images/lithtech-logo.webp"
                alt="LithTech"
                className="h-6 w-auto"
              />
            </a>
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
            <ul className="flex flex-col gap-0">
              {/* Solutions: opens submenu panel (slides from right) */}
              <li>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 py-4 text-left text-neutral-900"
                  onClick={() => {
                  setMobileCompanyPanelOpen(false)
                  setMobileLanguagePanelOpen(false)
                  setMobileSolutionsPanelOpen(true)
                }}
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="font-body text-lg font-bold leading-7 text-black">
                      {t('nav.solutionsMobile')}
                    </span>
                    <span className="font-body text-sm font-medium leading-6 text-black">
                      {t('nav.subtitle.solutions')}
                    </span>
                  </div>
                  <svg
                    className="h-6 w-6 shrink-0 text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>

              {/* Delivery */}
              <li>
                <NavLink
                  to={link(nav.delivery.path)}
                  className={({ isActive }) =>
                    `flex w-full items-center justify-between gap-3 py-4 ${
                      isActive ? 'text-neutral-900' : 'text-neutral-900'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="font-body text-lg font-bold leading-7 text-black">
                      {t('nav.delivery')}
                    </span>
                    <span className="font-body text-sm font-medium leading-6 text-black">
                      {t('nav.subtitle.delivery')}
                    </span>
                  </div>
                  <svg className="h-6 w-6 shrink-0 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </NavLink>
              </li>

              {/* Impact */}
              <li>
                <NavLink
                  to={link(nav.impact.path)}
                  className={({ isActive }) =>
                    `flex w-full items-center justify-between gap-3 py-4 ${
                      isActive ? 'text-neutral-900' : 'text-neutral-900'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="font-body text-lg font-bold leading-7 text-black">
                      {t('nav.impact')}
                    </span>
                    <span className="font-body text-sm font-medium leading-6 text-black">
                      {t('nav.subtitle.impact')}
                    </span>
                  </div>
                  <svg className="h-6 w-6 shrink-0 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </NavLink>
              </li>

              {/* Global Presence */}
              <li>
                <NavLink
                  to={link(nav.globalPresence.path)}
                  className={({ isActive }) =>
                    `flex w-full items-center justify-between gap-3 py-4 ${
                      isActive ? 'text-neutral-900' : 'text-neutral-900'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="font-body text-lg font-bold leading-7 text-black">
                      {t('nav.globalPresence')}
                    </span>
                    <span className="font-body text-sm font-medium leading-6 text-black">
                      {t('nav.subtitle.globalPresence')}
                    </span>
                  </div>
                  <svg className="h-6 w-6 shrink-0 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </NavLink>
              </li>

              {/* Insights */}
              <li>
                <NavLink
                  to={link(nav.insights.path)}
                  className={({ isActive }) =>
                    `flex w-full items-center justify-between gap-3 py-4 ${
                      isActive ? 'text-neutral-900' : 'text-neutral-900'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="font-body text-lg font-bold leading-7 text-black">
                      {t('nav.insights')}
                    </span>
                    <span className="font-body text-sm font-medium leading-6 text-black">
                      {t('nav.subtitle.insights')}
                    </span>
                  </div>
                  <svg className="h-6 w-6 shrink-0 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </NavLink>
              </li>

              {/* Company / About Us: opens submenu panel */}
              <li>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 py-4 text-left text-neutral-900"
                  onClick={() => {
                  setMobileSolutionsPanelOpen(false)
                  setMobileLanguagePanelOpen(false)
                  setMobileCompanyPanelOpen(true)
                }}
                >
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="font-body text-lg font-bold leading-7 text-black">
                      {t('nav.companyMobile')}
                    </span>
                    <span className="font-body text-sm font-medium leading-6 text-black">
                      {t('nav.subtitle.company')}
                    </span>
                  </div>
                  <svg
                    className="h-6 w-6 shrink-0 text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>

              {/* Language: opens submenu panel */}
              <li className="mt-8 border-t border-neutral-100 pt-6">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 py-4 text-left text-neutral-900"
                  onClick={() => {
                    setMobileSolutionsPanelOpen(false)
                    setMobileCompanyPanelOpen(false)
                    setMobileLanguagePanelOpen(true)
                  }}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-neutral-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z" />
                    </svg>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="font-body text-lg font-bold leading-7 text-black">
                        {localeLabels[lng] || lng.toUpperCase()}
                      </span>
                      <span className="font-body text-sm font-medium leading-6 text-black">
                        {t('nav.subtitle.language')}
                      </span>
                    </div>
                  </div>
                  <svg
                    className="h-6 w-6 shrink-0 text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>

              {/* Contact */}
              <li>
                <NavLink
                  to={link(nav.contact.path)}
                  className={({ isActive }) =>
                    `flex w-full items-center justify-between gap-3 py-4 ${
                      isActive ? 'text-neutral-900' : 'text-neutral-900'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-neutral-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="font-body text-lg font-bold leading-7 text-black">
                        {t('nav.contact')}
                      </span>
                      <span className="font-body text-sm font-medium leading-6 text-black">
                        {t('nav.subtitle.contact')}
                      </span>
                    </div>
                  </div>
                  <svg className="h-6 w-6 shrink-0 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

          {/* Energy Solutions submenu panel: pushed in from right */}
          <div className="flex h-full w-screen shrink-0 flex-col bg-white shadow-2xl">
            {/* Submenu header: back button + title + close X */}
            <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-4">
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                onClick={() => setMobileSolutionsPanelOpen(false)}
                aria-label="Back"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="min-w-0 flex-1">
                <span className="font-body text-lg font-bold leading-7 text-black">
                  {t('nav.solutionsMobile')}
                </span>
              </div>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                onClick={() => {
                  setMobileOpen(false)
                  setMobileSolutionsPanelOpen(false)
                  setMobileCompanyPanelOpen(false)
                  setMobileLanguagePanelOpen(false)
                }}
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Submenu list: Residential, Industrial, Medical, Maritime */}
            <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6" aria-label="Energy Solutions">
              <ul className="space-y-0">
                {(
                  [
                    { path: 'residential', key: 'nav.solutions.residentialShort', to: 'solutions/residential' },
                    { path: 'industrial', key: 'nav.solutions.industrial', to: 'solutions/industrial' },
                    { path: 'medical', key: 'nav.solutions.medical', to: 'impact' },
                    { path: 'maritime', key: 'nav.solutions.maritime', to: 'solutions/maritime' },
                  ] as const
                ).map((item) => (
                  <li key={item.path}>
                    <Link
                      to={link(item.to)}
                      className="flex items-center gap-4 py-4 text-left"
                      onClick={() => {
                        setMobileOpen(false)
                        setMobileSolutionsPanelOpen(false)
                      }}
                    >
                      <img
                        src={`/images/mobile%20menu/${item.path}.png`}
                        alt=""
                        className="h-16 w-14 shrink-0 rounded-lg object-cover"
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <span className="block font-body text-lg font-bold leading-7 text-black">
                          {t(item.key)}
                        </span>
                        <span className="block font-body text-sm font-medium leading-6 text-black">
                          {t(`nav.subtitle.solutions.${item.path}`)}
                        </span>
                      </div>
                      <svg
                        className="h-6 w-6 shrink-0 text-neutral-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* About Us submenu panel */}
          <div className="flex h-full w-screen shrink-0 flex-col bg-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-4">
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                onClick={() => setMobileCompanyPanelOpen(false)}
                aria-label="Back"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="min-w-0 flex-1">
                <span className="font-body text-lg font-bold leading-7 text-black">
                  {t('nav.companyMobile')}
                </span>
              </div>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                onClick={() => {
                  setMobileOpen(false)
                  setMobileSolutionsPanelOpen(false)
                  setMobileCompanyPanelOpen(false)
                  setMobileLanguagePanelOpen(false)
                }}
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6" aria-label="About Us">
              <ul className="space-y-0">
                {(
                  [
                    { path: 'about-baterino', key: 'nav.company.aboutBaterino', subtitleKey: 'nav.subtitle.company.aboutBaterino' },
                    { path: 'lithtech', key: 'nav.company.aboutLithtech', subtitleKey: 'nav.subtitle.company.aboutLithtech' },
                    { path: 'partnership', key: 'nav.company.partnership', subtitleKey: 'nav.subtitle.company.partnership' },
                  ] as const
                ).map((item) => (
                  <li key={item.path}>
                    <Link
                      to={link(`company/${item.path}`)}
                      className="flex items-center justify-between gap-6 py-4 text-left"
                      onClick={() => {
                        setMobileOpen(false)
                        setMobileCompanyPanelOpen(false)
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        <span className="block font-body text-lg font-bold leading-7 text-black">
                          {t(item.key)}
                        </span>
                        <span className="block font-body text-sm font-medium leading-6 text-black">
                          {t(item.subtitleKey)}
                        </span>
                      </div>
                      <svg
                        className="h-6 w-6 shrink-0 text-neutral-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Language selection submenu panel */}
          <div className="flex h-full w-screen shrink-0 flex-col bg-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-4">
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                onClick={() => setMobileLanguagePanelOpen(false)}
                aria-label="Back"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="min-w-0 flex-1">
                <span className="font-body text-lg font-bold leading-7 text-black">
                  {t('nav.subtitle.language')}
                </span>
              </div>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                onClick={() => {
                  setMobileOpen(false)
                  setMobileSolutionsPanelOpen(false)
                  setMobileCompanyPanelOpen(false)
                  setMobileLanguagePanelOpen(false)
                }}
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6" aria-label="Language selection">
              <ul className="space-y-0">
                {supportedLngs.map((localeCode) => (
                  <li key={localeCode}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-6 py-4 text-left"
                      onClick={() => handleLanguageChange(localeCode)}
                    >
                      <span className="font-body text-lg font-bold leading-7 text-black">
                        {localeLabels[localeCode] || localeCode.toUpperCase()}
                      </span>
                      {localeCode === lng && (
                        <svg
                          className="h-6 w-6 shrink-0 text-neutral-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
            </div>
          </div>
      </div>,
        document.body
      )}
    </div>
  )
}
