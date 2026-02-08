import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'
import id from './locales/id.json'
import zh from './locales/zh.json'
import ro from './locales/ro.json'

export const supportedLngs = ['en', 'es', 'id', 'zh', 'ro'] as const
export type Locale = (typeof supportedLngs)[number]

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  id: 'Bahasa Indonesia',
  zh: '中文',
  ro: 'Română',
}

const resources = {
  en: { translation: en },
  es: { translation: es },
  id: { translation: id },
  zh: { translation: zh },
  ro: { translation: ro },
}

/** Map browser language (e.g. en-US, zh-CN) to our supported locale. */
export function getBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en'
  const raw = navigator.language || (navigator.languages && navigator.languages[0]) || 'en'
  const code = raw.toLowerCase().split('-')[0]
  const map: Record<string, Locale> = {
    en: 'en',
    es: 'es',
    id: 'id',
    zh: 'zh',
    ro: 'ro',
  }
  return map[code] ?? 'en'
}

const initialLng = getBrowserLocale()

i18n.use(initReactI18next).init({
  resources,
  lng: initialLng,
  fallbackLng: 'en',
  supportedLngs: [...supportedLngs],
  interpolation: { escapeValue: false },
})

export default i18n
