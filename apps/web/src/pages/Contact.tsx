import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SEOHead } from '../components/SEOHead'
import { ArrowRightIcon } from '../components/ArrowRightIcon'
import {
  submitContactForm,
  ContactSubmitError,
  type ContactApiErrorCode,
  type ContactInquiryType,
} from '../lib/contactApi'
import {
  EMAIL_REGEX,
  EMAIL_MESSAGE_FORBIDDEN,
  sanitizeContactNameInput,
  sanitizeContactEmailInput,
  sanitizeContactMessageInput,
  sanitizeContactPhoneInput,
  isValidContactName,
} from '../lib/contactValidation'

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
  const [honeypotCity, setHoneypotCity] = useState('')
  const [honeypotCounty, setHoneypotCounty] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [emailError, setEmailError] = useState('')
  const [nameError, setNameError] = useState('')
  const [countryError, setCountryError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [messageError, setMessageError] = useState('')
  const [inquiryReference, setInquiryReference] = useState<string | null>(null)
  const [touched, setTouched] = useState({ email: false })
  const [submitPhase, setSubmitPhase] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submitErrorCode, setSubmitErrorCode] = useState<ContactApiErrorCode | 'network' | null>(null)

  const validateNameField = (value: string) => {
    const v = value.trim()
    if (!v.length) return t('contact.form.errorCodes.name_required')
    if (!isValidContactName(v)) return t('contact.form.errorCodes.invalid_name')
    return ''
  }

  const validateEmail = (value: string) => {
    const v = value.trim()
    if (!v) return t('contact.form.errorCodes.email_required')
    if (EMAIL_MESSAGE_FORBIDDEN.test(v)) return t('contact.form.errorCodes.invalid_email')
    return EMAIL_REGEX.test(v) ? '' : t('contact.form.errorCodes.invalid_email')
  }

  const validatePhoneField = (value: string) => {
    const p = value.trim()
    const digitCount = p.replace(/\D/g, '').length
    if (digitCount < 5) return t('contact.form.errorCodes.phone_required')
    if (!/^\+?\d+$/.test(p)) return t('contact.form.errorCodes.invalid_phone')
    return ''
  }

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }))
    setEmailError(validateEmail(email))
  }

  const handleNameBlur = () => {
    setNameError(validateNameField(name))
  }

  const handleEmailChange = (value: string) => {
    const next = sanitizeContactEmailInput(value).slice(0, 320)
    setEmail(next)
    if (touched.email) setEmailError(validateEmail(next))
  }

  const handleNameChange = (value: string) => {
    setName(sanitizeContactNameInput(value).slice(0, 200))
    if (nameError) setNameError('')
  }

  const handleMessageChange = (value: string) => {
    setMessage(sanitizeContactMessageInput(value).slice(0, 10000))
    if (messageError) setMessageError('')
  }

  const handleCountryChange = (value: string) => {
    setCountry(value)
    if (countryError) setCountryError('')
  }

  const handlePhoneChange = (value: string) => {
    setPhone(sanitizeContactPhoneInput(value))
    if (phoneError) setPhoneError('')
  }

  const requiredMark = <span className="text-red-600">*</span>

  const formDisabled = inquiryType === ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formDisabled || submitPhase === 'submitting') return

    setSubmitPhase('idle')
    setSubmitErrorCode(null)
    setInquiryReference(null)
    setNameError('')
    setCountryError('')
    setPhoneError('')
    setMessageError('')

    const nameErr = validateNameField(name)
    setNameError(nameErr)
    if (nameErr) return

    const emailErr = validateEmail(email)
    setEmailError(emailErr)
    setTouched((prev) => ({ ...prev, email: true }))
    if (emailErr) return
    if (!country.trim()) {
      setCountryError(t('contact.form.errorCodes.country_required'))
      return
    }
    const phoneErr = validatePhoneField(phone)
    setPhoneError(phoneErr)
    if (phoneErr) return
    if (EMAIL_MESSAGE_FORBIDDEN.test(message)) {
      setMessageError(t('contact.form.errorCodes.invalid_message'))
      return
    }
    if (message.trim().length < 10) {
      setMessageError(t('contact.form.errorCodes.message_too_short'))
      return
    }

    setSubmitPhase('submitting')
    try {
      const { reference } = await submitContactForm({
        inquiryType: inquiryType as ContactInquiryType,
        name: name.trim(),
        email: email.trim(),
        country,
        phone: phone.trim(),
        message: message.trim(),
        locale: locale ?? 'en',
        honeypotCity,
        honeypotCounty,
      })
      setSubmitPhase('success')
      setInquiryReference(reference ?? null)
      setName('')
      setEmail('')
      setHoneypotCity('')
      setHoneypotCounty('')
      setCountry('')
      setPhone('')
      setMessage('')
      setInquiryType('')
      setTouched({ email: false })
      setEmailError('')
    } catch (err) {
      setSubmitPhase('error')
      if (err instanceof ContactSubmitError) {
        setSubmitErrorCode(err.code)
      } else {
        setSubmitErrorCode('network')
      }
    }
  }

  const submitErrorMessage =
    submitErrorCode != null
      ? t(`contact.form.errorCodes.${submitErrorCode}`, { defaultValue: t('contact.form.submitError') })
      : ''

  const selectInquiryType = (value: string) => {
    setInquiryType(value)
    setInquiryDropdownOpen(false)
    if (submitPhase === 'success') setSubmitPhase('idle')
  }

  return (
    <>
      <SEOHead title={t('pageTitle.contact')} description="Get in touch with Baterino for project inquiries, partnership opportunities, and energy storage solutions. Our team is ready to support your next energy project." ogImage="/images/og-images/og-contact.jpg" />
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
            <p className="mx-auto mt-4 max-w-[800px]">
              <Link
                to={`${base}/preview/contact-auto-reply`}
                className="font-body text-body-sm font-medium text-neutral-900 underline decoration-2 underline-offset-4 hover:text-neutral-600"
              >
                {t('contact.hero.previewAutoReplyLink')}
              </Link>
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
                  className="relative rounded-[10px] bg-white p-6 shadow-sm sm:p-8"
                  aria-busy={submitPhase === 'submitting'}
                >
                  <div
                    className="mb-4 space-y-3"
                    aria-live="polite"
                  >
                    {submitPhase === 'success' ? (
                      <div
                        className="rounded-[5px] border border-emerald-200 bg-emerald-50 px-4 py-3 font-body text-body-sm text-emerald-900 sm:text-body-md"
                        role="status"
                      >
                        <p className="m-0">{t('contact.form.submitSuccess')}</p>
                        {inquiryReference ? (
                          <p className="mt-2 mb-0 font-medium">
                            {t('contact.form.submitSuccessReference', { reference: inquiryReference })}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                    {submitPhase === 'error' && submitErrorCode ? (
                      <p
                        className="rounded-[5px] border border-red-200 bg-red-50 px-4 py-3 font-body text-body-sm text-red-800 sm:text-body-md"
                        role="alert"
                      >
                        {submitErrorMessage}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-4">
                    <div ref={inquiryDropdownRef}>
                      <label
                        id="contact-inquiry-label"
                        className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                      >
                        {t('contact.form.inquiryTypeLabel')} {requiredMark}
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
                                onClick={() => selectInquiryType(opt.value)}
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
                        {t('contact.form.nameLabel')} {requiredMark}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => handleNameChange(e.target.value)}
                        onBlur={handleNameBlur}
                        maxLength={200}
                        autoComplete="name"
                        placeholder={t('contact.form.namePlaceholder')}
                        disabled={formDisabled}
                        required={!formDisabled}
                        aria-required="true"
                        aria-invalid={Boolean(nameError)}
                        className={`w-full rounded-[5px] border bg-white px-4 py-2.5 font-body text-body-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-neutral-100 ${
                          nameError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-neutral-300 focus:border-neutral-500 focus:ring-neutral-500'
                        }`}
                      />
                      {nameError ? (
                        <p className="mt-1 font-body text-body-sm text-red-600" role="alert">
                          {nameError}
                        </p>
                      ) : null}
                    </div>
                    <div className={formDisabled ? 'opacity-60' : ''}>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                      >
                        {t('contact.form.emailLabel')} {requiredMark}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        onBlur={handleEmailBlur}
                        maxLength={320}
                        autoComplete="email"
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
                    {/* Honeypot: hidden from users; bots often fill these */}
                    <div
                      className="absolute -left-[10000px] h-px w-px overflow-hidden"
                      aria-hidden="true"
                    >
                      <label htmlFor="contact-hp-city">City</label>
                      <input
                        id="contact-hp-city"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypotCity}
                        onChange={(e) => setHoneypotCity(e.target.value)}
                      />
                      <label htmlFor="contact-hp-county">County</label>
                      <input
                        id="contact-hp-county"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypotCounty}
                        onChange={(e) => setHoneypotCounty(e.target.value)}
                      />
                    </div>
                    <div className={formDisabled ? 'opacity-60' : ''}>
                      <label
                        htmlFor="contact-country"
                        className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                      >
                        {t('contact.form.countryLabel')} {requiredMark}
                      </label>
                      <div className="relative">
                        <select
                          id="contact-country"
                          aria-invalid={Boolean(countryError)}
                          className={`w-full appearance-none rounded-[5px] border bg-white py-2.5 pl-4 pr-10 font-body text-body-md text-neutral-900 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-neutral-100 [&>option]:text-neutral-900 ${
                            countryError
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                              : 'border-neutral-300 focus:border-neutral-500 focus:ring-neutral-500'
                          }`}
                          value={country}
                          onChange={(e) => handleCountryChange(e.target.value)}
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
                      {countryError ? (
                        <p className="mt-1 font-body text-body-sm text-red-600" role="alert">
                          {countryError}
                        </p>
                      ) : null}
                    </div>
                    <div className={formDisabled ? 'opacity-60' : ''}>
                      <label
                        htmlFor="contact-phone"
                        className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                      >
                        {t('contact.form.phoneLabel')} {requiredMark}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        maxLength={50}
                        autoComplete="tel"
                        placeholder={t('contact.form.phonePlaceholder')}
                        disabled={formDisabled}
                        aria-invalid={Boolean(phoneError)}
                        className={`w-full rounded-[5px] border bg-white px-4 py-2.5 font-body text-body-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-neutral-100 ${
                          phoneError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-neutral-300 focus:border-neutral-500 focus:ring-neutral-500'
                        }`}
                      />
                      {phoneError ? (
                        <p className="mt-1 font-body text-body-sm text-red-600" role="alert">
                          {phoneError}
                        </p>
                      ) : null}
                    </div>
                    <div className={formDisabled ? 'opacity-60' : ''}>
                      <label
                        htmlFor="contact-message"
                        className="mb-2 block font-body text-body-sm font-bold text-neutral-900"
                      >
                        {t('contact.form.messageLabel')} {requiredMark}
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        value={message}
                        onChange={(e) => handleMessageChange(e.target.value)}
                        maxLength={10000}
                        placeholder={t('contact.form.messagePlaceholder')}
                        disabled={formDisabled}
                        aria-invalid={Boolean(messageError)}
                        className={`w-full resize-y rounded-[5px] border bg-white px-4 py-2.5 font-body text-body-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-neutral-100 ${
                          messageError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-neutral-300 focus:border-neutral-500 focus:ring-neutral-500'
                        }`}
                      />
                      {messageError ? (
                        <p className="mt-1 font-body text-body-sm text-red-600" role="alert">
                          {messageError}
                        </p>
                      ) : null}
                    </div>
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formDisabled || submitPhase === 'submitting'}
                        className="btn-primary w-full sm:w-auto disabled:opacity-60"
                      >
                        {submitPhase === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit')}
                        <ArrowRightIcon />
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
