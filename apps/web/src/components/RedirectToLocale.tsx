import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supportedLngs, type Locale } from '../i18n'

/** Redirects to the current locale (from i18n / browser). Use for "/" and fallback routes. */
export function RedirectToLocale() {
  const { i18n } = useTranslation()
  const lng = i18n.language as string
  const locale = supportedLngs.includes(lng as Locale) ? lng : 'en'
  return <Navigate to={`/${locale}`} replace />
}
