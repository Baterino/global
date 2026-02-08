import { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SLIDE_WIDTH_PX = 870
const SLIDE_HEIGHT = 520
const SLIDE_HEIGHT_MOBILE = 580
const GAP_PX = 20
const SLIDES_COUNT = 4
const SLOT_WIDTH = SLIDE_WIDTH_PX + GAP_PX
const DRAG_THRESHOLD = 60
const CONTAINER_WIDTH = 1200

const CAROUSEL_SLIDES = [
  { 
    image: '/images/hero-slide1.jpg',
    mobileImage: '/images/hero-slider-mobile1.jpg',
    title: 'Industrial Energy Storage Infrastructure',
    subtitle: 'We integrate technology, delivery, and coordination to turn complex energy projects into operational infrastructure.',
    to: 'solutions/industrial'
  },
  { 
    image: '/images/hero-slide2.jpg',
    mobileImage: '/images/hero-slider-mobile2.jpg',
    title: 'Solutions For Real Environments',
    subtitle: 'Energy storage systems designed and delivered for industrial, residential, and maritime conditions.',
    to: 'solutions/residential'
  },
  { 
    image: '/images/hero-slide3.jpg',
    mobileImage: '/images/hero-slider-mobile3.jpg',
    title: 'After-Sales & Lifecycle Support',
    subtitle: 'Our responsibility continues beyond delivery — supporting performance, reliability, and system continuity over time.',
    to: 'delivery'
  },
  { 
    image: '/images/hero-slide4.jpg',
    mobileImage: '/images/hero-slider-mobile4.jpg',
    title: 'Infrastructure With Purpose',
    subtitle: 'Energy infrastructure that supports communities, essential services, and long-term resilience.',
    to: 'impact'
  },
]

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

export function Hero() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`
  const [index, setIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const startXRef = useRef(0)
  const didDragRef = useRef(false)
  const dragOffsetRef = useRef(0)

  const goPrev = useCallback(() => setIndex((i) => (i <= 0 ? SLIDES_COUNT - 1 : i - 1)), [])
  const goNext = useCallback(() => setIndex((i) => (i >= SLIDES_COUNT - 1 ? 0 : i + 1)), [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      didDragRef.current = false
      startXRef.current = e.clientX
      dragOffsetRef.current = 0
      setIsDragging(true)
    },
    []
  )

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - startXRef.current
      const maxDrag = SLOT_WIDTH
      const clamped = Math.max(-maxDrag, Math.min(maxDrag, dx))
      dragOffsetRef.current = clamped
      setDragOffset(clamped)
      if (Math.abs(clamped) > 10) didDragRef.current = true
    }
    const onUp = () => {
      const offset = dragOffsetRef.current
      if (offset > DRAG_THRESHOLD) goPrev()
      else if (offset < -DRAG_THRESHOLD) goNext()
      setDragOffset(0)
      dragOffsetRef.current = 0
      setIsDragging(false)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, [isDragging, goPrev, goNext])

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      const offset = dragOffsetRef.current
      if (offset > DRAG_THRESHOLD) goPrev()
      else if (offset < -DRAG_THRESHOLD) goNext()
      setDragOffset(0)
      dragOffsetRef.current = 0
      setIsDragging(false)
    }
  }, [isDragging, goPrev, goNext])

  const handleLinkClick = useCallback((e: React.MouseEvent) => {
    if (didDragRef.current) e.preventDefault()
  }, [])

  const trackSlides = CAROUSEL_SLIDES
  const trackWidth = trackSlides.length * SLOT_WIDTH - GAP_PX
  const maxNegativeTranslate = -(trackWidth - CONTAINER_WIDTH)
  const rawTranslateX = -index * SLOT_WIDTH + dragOffset
  const translateX = Math.max(maxNegativeTranslate, Math.min(0, rawTranslateX))

  // Mobile: percentage-based transform for full-width slides
  const mobileTranslateX = -index * 100
  const [mobileDragOffset, setMobileDragOffset] = useState(0)
  const mobileDragRef = useRef(0)
  useEffect(() => {
    if (!isDragging) return
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
      const dx = clientX - startXRef.current
      const maxDrag = 120
      const clamped = Math.max(-maxDrag, Math.min(maxDrag, dx))
      mobileDragRef.current = clamped
      setMobileDragOffset(clamped)
    }
    const onUp = () => {
      const offset = mobileDragRef.current
      if (offset > DRAG_THRESHOLD) goPrev()
      else if (offset < -DRAG_THRESHOLD) goNext()
      setMobileDragOffset(0)
      mobileDragRef.current = 0
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
  }, [isDragging, goPrev, goNext])

  return (
    <section className="relative w-full bg-white">
      {/* Heading block: padded so text is inset */}
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <Link
          to={base}
          className="mx-auto mb-6 flex w-fit md:hidden"
          aria-label="Baterino home"
        >
          <img
            src="/images/Baterino-Logo-black.png"
            alt="Baterino"
            className="h-7 w-auto"
          />
        </Link>
        <h1 className="font-publicSans text-center text-2xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 opacity-90 sm:mx-auto sm:max-w-[720px] sm:text-display-sm sm:leading-[1.2] lg:text-display-md lg:max-w-[780px] lg:leading-[1.15]">
          {t('home.hero.title')}
        </h1>
        <p className="mx-auto mt-4 max-w-[740px] text-center font-body text-body-lg font-medium leading-relaxed text-neutral-600">
          {t('home.hero.subtitle')}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 font-nunito text-body-sm font-normal text-neutral-500">
          <span>{t('home.hero.poweredBy')}</span>
          <a
            href="https://www.ltc-energy.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <img src="/images/lithtech-logo.webp" alt="LithTech" className="h-5 w-auto object-contain" />
          </a>
        </div>

        {/* Mobile slider: full-width slides, image background, overlay, left-aligned text, centered pink button, dots */}
        <div className="mt-8 block md:hidden">
          <div
            className="relative overflow-hidden rounded-[10px]"
            style={{ height: SLIDE_HEIGHT_MOBILE }}
            onMouseDown={handleMouseDown}
            onTouchStart={(e) => {
              didDragRef.current = false
              startXRef.current = e.touches[0].clientX
              dragOffsetRef.current = 0
              setIsDragging(true)
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="flex h-full cursor-grab select-none active:cursor-grabbing"
              style={{
                transform: `translateX(calc(${mobileTranslateX}% + ${mobileDragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
              }}
            >
              {trackSlides.map((slide, i) => (
                <div
                  key={i}
                  className="relative min-w-full shrink-0 overflow-hidden rounded-[10px]"
                  style={{ height: SLIDE_HEIGHT_MOBILE }}
                >
                  <img
                    src={slide.mobileImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover rounded-[10px]"
                    draggable={false}
                  />
                  {/* Black overlay for slide 1, gradient for others */}
                  {i === 0 ? (
                    <div className="absolute inset-0 rounded-[10px] bg-black/20" />
                  ) : (
                    <div className="absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start px-5 py-[30px]">
                    <div className="w-full">
                      <h2 className="font-heading font-bold uppercase leading-tight tracking-tight text-white" style={{ fontSize: '24px' }}>
                        {slide.title}
                      </h2>
                      <p className="mt-2 font-body font-normal leading-snug text-white/95" style={{ fontSize: '18px' }}>
                        {slide.subtitle}
                      </p>
                    </div>
                    <Link
                      to={`${base}/${slide.to}`}
                      onClick={handleLinkClick}
                      className="mt-5 w-full rounded-[5px] bg-[#FFE8E8] px-6 py-3 text-center font-body text-base font-bold text-neutral-900 transition-colors hover:bg-[#ffd8d8]"
                    >
                      {t('home.carousel.tapToLearnMore')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: SLIDES_COUNT }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === index ? 'bg-neutral-900' : 'bg-neutral-300'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop slider: full-width, slides aligned with content */}
      <div className="mt-8 hidden w-full overflow-visible md:block">
        <div
          className="group relative overflow-visible rounded-[10px]"
          style={{ height: SLIDE_HEIGHT }}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex cursor-grab select-none gap-5 active:cursor-grabbing"
            style={{
              transform: `translateX(${translateX}px)`,
              width: `calc(${trackWidth}px + 100vw)`,
              transition: isDragging ? 'none' : 'transform 0.5s ease-out',
            }}
            onMouseDown={handleMouseDown}
          >
            {trackSlides.map((slide, i) => (
              <div
                key={i}
                className="relative shrink-0 overflow-hidden rounded-[10px]"
                style={{ width: `${SLIDE_WIDTH_PX}px`, height: `${SLIDE_HEIGHT}px` }}
              >
                <img
                  src={slide.image}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full rounded-[10px] object-cover"
                  draggable={false}
                />
                {/* Black overlay for slide 1, gradient for others */}
                {i === 0 ? (
                  <div className="absolute inset-0 rounded-[10px] bg-black/20" />
                ) : (
                  <div className="absolute inset-0 rounded-[10px] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                )}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-10 py-10">
                  <div className="w-2/3">
                    <div className="font-nunito text-3xl font-black uppercase text-white mb-1 sm:text-4xl">
                      {slide.title}
                    </div>
                    <div className="font-nunito font-normal leading-6 text-white" style={{ fontSize: '20px' }}>
                      {slide.subtitle}
                    </div>
                  </div>
                  <Link
                    to={`${base}/${slide.to}`}
                    onClick={handleLinkClick}
                    className="z-[1] inline-flex h-10 w-36 items-center justify-center rounded-[5px] bg-white font-nunito text-base font-bold text-neutral-900 transition-opacity hover:opacity-90"
                  >
                    {t('home.carousel.learnMore')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-neutral-300 bg-white/95 text-neutral-700 shadow-md opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
            aria-label="Previous slide"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-neutral-300 bg-white/95 text-neutral-700 shadow-md opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
            aria-label="Next slide"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Dots (desktop): below slider */}
      <div className="mx-auto hidden w-full max-w-[1200px] px-4 pb-8 md:block sm:px-6 lg:px-8">
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: SLIDES_COUNT }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-3.5 w-3.5 rounded-full transition-colors ${
                i === index ? 'bg-black' : 'bg-zinc-300 hover:bg-zinc-400'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
