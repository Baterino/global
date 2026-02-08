import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supportedLngs, localeLabels } from '../i18n'

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.6 9h16.8M3.6 15h16.8"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9Z"
      />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export function LanguageDropdown() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { locale } = useParams<{ locale: string }>()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLocale = locale ?? i18n.language ?? 'en'

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (newLocale: string) => {
    const pathWithoutLocale = location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '')
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`
    i18n.changeLanguage(newLocale)
    navigate(newPath + location.search + location.hash)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-neutral-700 transition-colors hover:bg-neutral-100"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <GlobeIcon className="h-5 w-5" />
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-lg bg-neutral-900 py-1 shadow-lg"
        >
          {supportedLngs.map((lng) => (
            <li key={lng}>
              <button
                type="button"
                role="option"
                aria-selected={lng === currentLocale}
                onClick={() => handleLanguageChange(lng)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                  lng === currentLocale
                    ? 'bg-neutral-800 font-medium text-white'
                    : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                {localeLabels[lng] || lng.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
