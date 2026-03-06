import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SeoHead } from '../components/SeoHead'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INQUIRY_OPTIONS = [
  { value: 'general', labelKey: 'contact.form.inquiryTypes.general' },
  { value: 'projectsOperations', labelKey: 'contact.form.inquiryTypes.projectsOperations' },
  { value: 'socialImpact', labelKey: 'contact.form.inquiryTypes.socialImpact' },
] as const

const CATEGORY_SLIDES = 4
const CATEGORY_DRAG_THRESHOLD = 40

export function Contact() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`
  const [inquiryType, setInquiryType] = useState('')
  const [inquiryDropdownOpen, setInquiryDropdownOpen] = useState(false)
  const inquiryDropdownRef = useRef<HTMLDivElement>(null)

  // Mobile categories slider
  const [categorySlide, setCategorySlide] = useState(0)
  const [categoryDragging, setCategoryDragging] = useState(false)
  const [categoryDragOffset, setCategoryDragOffset] = useState(0)
  const categoryStartXRef = useRef(0)
  const categoryDragRef = useRef(0)
  const categoryDidDragRef = useRef(false)
  const categoryGoPrev = useCallback(() => setCategorySlide((i) => (i <= 0 ? CATEGORY_SLIDES - 1 : i - 1)), [])
  const categoryGoNext = useCallback(() => setCategorySlide((i) => (i >= CATEGORY_SLIDES - 1 ? 0 : i + 1)), [])
  const categoryHandlePointerDown = useCallback((clientX: number) => {
    categoryDidDragRef.current = false
    categoryStartXRef.current = clientX
    categoryDragRef.current = 0
    setCategoryDragging(true)
  }, [])
  useEffect(() => {
    if (!categoryDragging) return
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
      const dx = clientX - categoryStartXRef.current
      const maxDrag = 320
      const clamped = Math.max(-maxDrag, Math.min(maxDrag, dx))
      categoryDragRef.current = clamped
      setCategoryDragOffset(clamped)
      if (Math.abs(clamped) > 10) categoryDidDragRef.current = true
    }
    const onUp = () => {
      const offset = categoryDragRef.current
      if (offset > CATEGORY_DRAG_THRESHOLD) categoryGoPrev()
      else if (offset < -CATEGORY_DRAG_THRESHOLD) categoryGoNext()
      setCategoryDragOffset(0)
      categoryDragRef.current = 0
      setCategoryDragging(false)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [categoryDragging, categoryGoPrev, categoryGoNext])
  const categoryHandlePointerLeave = useCallback(() => {
    if (categoryDragging) {
      const offset = categoryDragRef.current
      if (offset > CATEGORY_DRAG_THRESHOLD) categoryGoPrev()
      else if (offset < -CATEGORY_DRAG_THRESHOLD) categoryGoNext()
      setCategoryDragOffset(0)
      categoryDragRef.current = 0
      setCategoryDragging(false)
    }
  }, [categoryDragging, categoryGoPrev, categoryGoNext])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inquiryDropdownRef.current && !inquiryDropdownRef.current.contains(event.target as Node)) {
        setInquiryDropdownOpen(false)
      }
    }
    if (inquiryDropdownOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [inquiryDropdownOpen])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [emailError, setEmailError] = useState('')
  const [touched, setTouched] = useState({ email: false })

  const validateEmail = (value: string) => {
    if (!value.trim()) return ''
    return EMAIL_REGEX.test(value.trim()) ? '' : t('contact.form.emailInvalid')
  }

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }))
    setEmailError(validateEmail(email))
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (touched.email) setEmailError(validateEmail(value))
  }

  const formDisabled = inquiryType === ''

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formDisabled) return
    const emailErr = validateEmail(email)
    setEmailError(emailErr)
    setTouched((prev) => ({ ...prev, email: true }))
    if (emailErr) return
    // Form submission logic can be added here (e.g. API call)
  }

  return (
    <>
      <SeoHead title={t('pageTitle.contact')} />
      <article className="w-full bg-white">
        {/* Hero */}
        <section className="w-full bg-white px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px] text-center">
            <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              {t('contact.hero.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-[800px] font-body text-body-md leading-relaxed text-neutral-700">
              {t('contact.hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Two columns: Categories (1/3) + Form (2/3) */}
        <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1200px]">
            {/* Mobile: Categories as cards in a slider, on top of the form */}
            <div className="mb-8 lg:hidden">
              <div
                className="relative -mx-4 overflow-hidden sm:-mx-6"
                onMouseDown={(e) => categoryHandlePointerDown(e.clientX)}
                onMouseLeave={categoryHandlePointerLeave}
                onTouchStart={(e) => categoryHandlePointerDown(e.touches[0].clientX)}
              >
                <div
                  className="flex cursor-grab gap-4 px-4 active:cursor-grabbing sm:px-6"
                  style={{
                    transform: `translateX(calc(${-categorySlide} * (75% + 1rem) + ${categoryDragOffset}px))`,
                    transition: categoryDragging ? 'none' : 'transform 0.3s ease-out',
                  }}
                >
                  <div className="min-w-[75%] flex-shrink-0 rounded-[10px] bg-neutral-50 p-6">
                    <h2 className="mb-3 line-clamp-2 font-heading text-sm font-bold uppercase tracking-tight text-neutral-900">
                      {t('contact.categories.generalInquiries.title')}
                    </h2>
                    <p className="line-clamp-2 font-body text-body-md font-normal leading-relaxed text-neutral-700">
                      {t('contact.categories.generalInquiries.description')}
                    </p>
                  </div>
                  <div className="min-w-[75%] flex-shrink-0 rounded-[10px] bg-neutral-50 p-6">
                    <h2 className="mb-3 line-clamp-2 font-heading text-sm font-bold uppercase tracking-tight text-neutral-900">
                      {t('contact.categories.careers.title')}
                    </h2>
                    <p className="line-clamp-2 font-body text-body-md font-normal leading-relaxed text-neutral-700">
                      {t('contact.categories.careers.description')}
                      <Link
                        to={`${base}/careers`}
                        className="font-medium text-neutral-900 underline decoration-2 underline-offset-2 hover:no-underline"
                      >
                        {t('contact.categories.careers.linkText')}
                      </Link>
                    </p>
                  </div>
                  <div className="min-w-[75%] flex-shrink-0 rounded-[10px] bg-neutral-50 p-6">
                    <h2 className="mb-3 line-clamp-2 font-heading text-sm font-bold uppercase tracking-tight text-neutral-900">
                      {t('contact.categories.projectsOperations.title')}
                    </h2>
                    <p className="line-clamp-2 font-body text-body-md font-normal leading-relaxed text-neutral-700">
                      {t('contact.categories.projectsOperations.description')}
                    </p>
                  </div>
                  <div className="min-w-[75%] flex-shrink-0 rounded-[10px] bg-neutral-50 p-6">
                    <h2 className="mb-3 line-clamp-2 font-heading text-sm font-bold uppercase tracking-tight text-neutral-900">
                      {t('contact.categories.socialImpact.title')}
                    </h2>
                    <p className="line-clamp-2 font-body text-body-md font-normal leading-relaxed text-neutral-700">
                      {t('contact.categories.socialImpact.description')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {Array.from({ length: CATEGORY_SLIDES }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCategorySlide(i)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === categorySlide ? 'bg-neutral-900' : 'bg-neutral-300'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
              {/* Left - Contact categories panel (1/3) - desktop only */}
              <div className="hidden rounded-[10px] bg-neutral-50 p-6 shadow-sm lg:block lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-tight text-neutral-900">
                      {t('contact.categories.generalInquiries.title')}
                    </h2>
                    <p className="font-body text-body-md leading-relaxed text-neutral-700">
                      {t('contact.categories.generalInquiries.description')}
                    </p>
                  </div>
                  <div>
                    <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-tight text-neutral-900">
                      {t('contact.categories.careers.title')}
                    </h2>
                    <p className="font-body text-body-md leading-relaxed text-neutral-700">
                      {t('contact.categories.careers.description')}
                      <Link
                        to={`${base}/careers`}
                        className="font-medium text-neutral-900 underline decoration-2 underline-offset-2 hover:no-underline"
                      >
                        {t('contact.categories.careers.linkText')}
                      </Link>
                    </p>
                  </div>
                  <div>
                    <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-tight text-neutral-900">
                      {t('contact.categories.projectsOperations.title')}
                    </h2>
                    <p className="font-body text-body-md leading-relaxed text-neutral-700">
                      {t('contact.categories.projectsOperations.description')}
                    </p>
                  </div>
                  <div>
                    <h2 className="mb-2 font-heading text-sm font-bold uppercase tracking-tight text-neutral-900">
                      {t('contact.categories.socialImpact.title')}
                    </h2>
                    <p className="font-body text-body-md leading-relaxed text-neutral-700">
                      {t('contact.categories.socialImpact.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right - Contact form (2/3) */}
              <div className="lg:col-span-2">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[10px] bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="space-y-4">
                    <div ref={inquiryDropdownRef}>
                      <label
                        id="contact-inquiry-label"
                        className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                      >
                        {t('contact.form.inquiryTypeLabel')}
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          id="contact-inquiry"
                          aria-haspopup="listbox"
                          aria-expanded={inquiryDropdownOpen}
                          aria-labelledby="contact-inquiry-label"
                          onClick={() => setInquiryDropdownOpen((open) => !open)}
                          className="flex w-full items-center justify-between rounded-[5px] border border-neutral-300 bg-white py-2.5 pl-4 pr-10 font-body text-body-md text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                        >
                          <span className={inquiryType === '' ? 'text-neutral-400' : ''}>
                            {inquiryType === ''
                              ? t('contact.form.inquiryTypePlaceholder')
                              : t(INQUIRY_OPTIONS.find((o) => o.value === inquiryType)?.labelKey ?? 'contact.form.inquiryTypes.general')}
                          </span>
                        </button>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                        {inquiryDropdownOpen && (
                          <ul
                            role="listbox"
                            aria-labelledby="contact-inquiry-label"
                            className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-auto rounded-[5px] border border-neutral-300 bg-white py-1 shadow-lg"
                          >
                            {INQUIRY_OPTIONS.map((opt) => (
                              <li
                                key={opt.value}
                                role="option"
                                aria-selected={inquiryType === opt.value}
                                onClick={() => {
                                  setInquiryType(opt.value)
                                  setInquiryDropdownOpen(false)
                                }}
                                className="cursor-pointer px-4 py-2.5 font-body text-body-md text-neutral-900 hover:bg-neutral-100 focus:bg-neutral-100"
                              >
                                {t(opt.labelKey)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                    <div className={formDisabled ? 'opacity-60' : ''}>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                      >
                        {t('contact.form.nameLabel')}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('contact.form.namePlaceholder')}
                        disabled={formDisabled}
                        className="w-full rounded-[5px] border border-neutral-300 bg-white px-4 py-2.5 font-body text-body-md text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-100"
                      />
                    </div>
                    <div className={formDisabled ? 'opacity-60' : ''}>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                      >
                        {t('contact.form.emailLabel')}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onBlur={handleEmailBlur}
                        placeholder={t('contact.form.emailPlaceholder')}
                        disabled={formDisabled}
                        className={`w-full rounded-[5px] border bg-white px-4 py-2.5 font-body text-body-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-neutral-100 ${
                          emailError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-neutral-300 focus:border-neutral-500 focus:ring-neutral-500'
                        }`}
                      />
                      {emailError && (
                        <p className="mt-1 font-body text-body-sm text-red-600" role="alert">
                          {emailError}
                        </p>
                      )}
                    </div>
                    <div className={formDisabled ? 'opacity-60' : ''}>
                      <label
                        htmlFor="contact-country"
                        className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                      >
                        {t('contact.form.countryLabel')}
                      </label>
                      <div className="relative">
                        <select
                          id="contact-country"
                          className="w-full appearance-none rounded-[5px] border border-neutral-300 bg-white py-2.5 pl-4 pr-10 font-body text-body-md text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-100 [&>option]:text-neutral-900"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          disabled={formDisabled}
                        >
                          <option value="">{t('contact.form.countryPlaceholder')}</option>
                          <option value="austria">{t('contact.form.countries.austria')}</option>
                          <option value="bulgaria">{t('contact.form.countries.bulgaria')}</option>
                          <option value="china">{t('contact.form.countries.china')}</option>
                          <option value="indonesia">{t('contact.form.countries.indonesia')}</option>
                          <option value="philippines">{t('contact.form.countries.philippines')}</option>
                          <option value="romania">{t('contact.form.countries.romania')}</option>
                          <option value="slovakia">{t('contact.form.countries.slovakia')}</option>
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className={formDisabled ? 'opacity-60' : ''}>
                      <label
                        htmlFor="contact-phone"
                        className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                      >
                        {t('contact.form.phoneLabel')}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t('contact.form.phonePlaceholder')}
                        disabled={formDisabled}
                        className="w-full rounded-[5px] border border-neutral-300 bg-white px-4 py-2.5 font-body text-body-md text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-100"
                      />
                    </div>
                    <div className={formDisabled ? 'opacity-60' : ''}>
                      <label
                        htmlFor="contact-message"
                        className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                      >
                        {t('contact.form.messageLabel')}
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t('contact.form.messagePlaceholder')}
                        disabled={formDisabled}
                        className="w-full resize-y rounded-[5px] border border-neutral-300 bg-white px-4 py-2.5 font-body text-body-md text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-100"
                      />
                    </div>
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formDisabled}
                        className="rounded-[5px] border-2 border-neutral-900 bg-neutral-900 px-6 py-2.5 font-body text-body-md font-bold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {t('contact.form.submit')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
