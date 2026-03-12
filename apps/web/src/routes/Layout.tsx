import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu } from '../components/Menu'
import { Footer } from '../components/Footer'
import { SeoHead } from '../components/SeoHead'
import { supportedLngs, type Locale } from '../i18n'

const SCROLL_THRESHOLD = 10

export function Layout() {
  const { i18n } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const lng = (locale ?? 'en') as Locale
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (supportedLngs.includes(lng)) {
      i18n.changeLanguage(lng)
    }
  }, [lng, i18n])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (locale && !supportedLngs.includes(lng)) {
    const fallback = supportedLngs.includes(i18n.language as Locale) ? i18n.language : 'en'
    return <Navigate to={`/${fallback}`} replace />
  }

  return (
    <>
      <SeoHead />
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:block focus:w-auto focus:h-auto focus:py-2 focus:px-4 focus:m-0 focus:overflow-visible focus:whitespace-normal focus:rounded-lg focus:bg-neutral-900 focus:text-body-sm focus:font-medium focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:[clip:auto] dark:focus:bg-white dark:focus:text-neutral-900"
      >
        Skip to main content
      </a>
      <div className="min-h-screen bg-white font-sans text-neutral-900">
        <header
          className={`fixed left-0 right-0 top-0 z-50 bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
            isScrolled ? 'shadow-md' : 'shadow-none'
          }`}
        >
          <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Menu />
          </div>
        </header>
        <div className="mx-auto w-full max-w-site overflow-visible">
          <main
            id="main-content"
            className="w-full px-0 py-0 pt-20 sm:px-0 lg:pt-16"
            tabIndex={-1}
          >
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
