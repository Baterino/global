import { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SLIDE_WIDTH_PX = 700
const SLIDE_HEIGHT = 360
const GAP_PX = 20
const SLIDES_COUNT = 4
const SLOT_WIDTH = SLIDE_WIDTH_PX + GAP_PX
const DRAG_THRESHOLD = 60
const CONTAINER_WIDTH = 1200

const IMPACT_SLIDES = [
  { type: 'alignedGoals' as const, image: '/images/baterino-un-global-goals.png' },
  {
    type: 'energyWhere' as const,
    image: '/images/energy-where-it-matters-most-desktop.jpg',
    mobileImage: '/images/energy-where-it-matter-most-mobile.png',
  },
  {
    type: 'beyond' as const,
    image: '/images/beyond-delivery-desktop.jpg',
    mobileImage: '/images/beyond-delivery-mobile.png',
  },
  {
    type: 'inclusive' as const,
    image: '/images/microgrids-communities.png',
    mobileImage: '/images/building-inclusive-systems-mobile.png',
  },
]

export function ImpactSlider() {
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

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    didDragRef.current = false
    startXRef.current = e.clientX
    dragOffsetRef.current = 0
    setIsDragging(true)
  }, [])

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

  const trackWidth = SLIDES_COUNT * SLOT_WIDTH - GAP_PX
  const maxNegativeTranslate = -(trackWidth - CONTAINER_WIDTH)
  const rawTranslateX = -index * SLOT_WIDTH + dragOffset
  const translateX = Math.max(maxNegativeTranslate, Math.min(0, rawTranslateX))

  // Mobile swipe
  const [mobileDragOffset, setMobileDragOffset] = useState(0)
  const mobileDragRef = useRef(0)
  const [mobileIndex, setMobileIndex] = useState(0)

  const mobileGoPrev = useCallback(() => setMobileIndex((i) => Math.max(0, i - 1)), [])
  const mobileGoNext = useCallback(() => setMobileIndex((i) => Math.min(SLIDES_COUNT - 1, i + 1)), [])

  const handleMobileTouchStart = useCallback((e: React.TouchEvent) => {
    didDragRef.current = false
    startXRef.current = e.touches[0].clientX
    mobileDragRef.current = 0
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startXRef.current
      const maxDrag = 120
      const clamped = Math.max(-maxDrag, Math.min(maxDrag, dx))
      mobileDragRef.current = clamped
      setMobileDragOffset(clamped)
      if (Math.abs(clamped) > 10) didDragRef.current = true
    }
    const onUp = () => {
      const offset = mobileDragRef.current
      if (offset > DRAG_THRESHOLD) mobileGoPrev()
      else if (offset < -DRAG_THRESHOLD) mobileGoNext()
      setMobileDragOffset(0)
      mobileDragRef.current = 0
      setIsDragging(false)
    }
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [isDragging, mobileGoPrev, mobileGoNext])

  const mobileTranslateX = -mobileIndex * 100

  return (
    <div className="w-full">
      {/* Mobile Slider */}
      <div className="block w-full overflow-hidden lg:hidden">
        <div
          className="relative w-full overflow-hidden"
          onTouchStart={handleMobileTouchStart}
        >
          <div
            className="flex w-full cursor-grab select-none active:cursor-grabbing"
            style={{
              transform: `translateX(calc(${mobileTranslateX}% + ${mobileDragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            {IMPACT_SLIDES.map((slide) => (
              <div key={slide.type} className="min-w-full max-w-full shrink-0 px-4">
                <div className="w-full overflow-hidden rounded-[10px] bg-[#f7f7f7]">
                  {/* Image on top */}
                  <div className={`relative w-full overflow-hidden ${slide.type === 'alignedGoals' ? 'flex items-center justify-center bg-white p-6' : 'h-48'}`}>
                    <img
                      src={slide.image}
                      alt=""
                      className={slide.type === 'alignedGoals' ? 'h-32 w-auto object-contain' : 'h-full w-full object-cover'}
                      draggable={false}
                    />
                    {slide.type !== 'alignedGoals' && (
                      <img
                        src="/images/baterino-logo-white.png"
                        alt="Baterino"
                        className="absolute bottom-3 right-3 z-10 h-5 w-auto object-contain drop-shadow-sm"
                        aria-hidden
                      />
                    )}
                  </div>
                  {/* Title and text below */}
                  <div className="p-5">
                    <h3 className="break-words font-heading text-xl font-bold uppercase leading-tight tracking-tight text-neutral-900">
                      {t(`home.globalImpact.${slide.type}`)}
                    </h3>
                    <p className="mt-3 break-words font-body text-base leading-relaxed text-neutral-700">
                      {t(`home.globalImpact.${slide.type}Desc`)}
                    </p>
                    <Link
                      to={`${base}/impact`}
                      onClick={handleLinkClick}
                      className="mt-4 inline-block font-body text-body-sm font-semibold text-neutral-900 underline-offset-2 hover:underline"
                    >
                      {slide.type === 'alignedGoals' ? `${t('home.globalImpact.viewProgress')} →` : `${t('home.carousel.learnMore')} →`}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {IMPACT_SLIDES.map((slide, i) => (
            <button
              key={slide.type}
              type="button"
              onClick={() => setMobileIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === mobileIndex ? 'bg-neutral-900' : 'bg-neutral-300'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Slider */}
      <div className="hidden lg:block">
        <div
          className="group relative overflow-visible"
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
            {IMPACT_SLIDES.map((slide) => (
              <div
                key={slide.type}
                className="relative shrink-0 overflow-hidden rounded-[10px]"
                style={{ width: SLIDE_WIDTH_PX, height: SLIDE_HEIGHT }}
              >
                <div className="flex h-full flex-col bg-[#f7f7f7] sm:flex-row">
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="font-heading text-heading-md font-bold uppercase tracking-tight text-neutral-900">
                      {t(`home.globalImpact.${slide.type}`)}
                    </h3>
                    <p className="mt-4 flex-1 font-body text-body-md leading-relaxed text-neutral-700">
                      {t(`home.globalImpact.${slide.type}Desc`)}
                    </p>
                    <Link
                      to={`${base}/impact`}
                      onClick={handleLinkClick}
                      className="mt-4 inline-block font-body text-body-sm font-semibold text-neutral-900 underline-offset-2 hover:underline"
                    >
                      {slide.type === 'alignedGoals' ? `${t('home.globalImpact.viewProgress')} →` : `${t('home.carousel.learnMore')} →`}
                    </Link>
                  </div>
                  <div className={`relative shrink-0 flex items-center justify-center ${slide.type === 'alignedGoals' ? 'h-full w-[280px] p-4' : 'h-full w-[280px]'}`}>
                    <img
                      src={slide.image}
                      alt=""
                      className={slide.type === 'alignedGoals' ? 'max-h-[280px] w-auto object-contain' : 'h-full w-full object-cover'}
                      draggable={false}
                    />
                    {slide.type !== 'alignedGoals' && (
                      <img
                        src="/images/baterino-logo-white.png"
                        alt="Baterino"
                        className="absolute bottom-4 right-4 z-10 h-5 w-auto object-contain drop-shadow-sm"
                        aria-hidden
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-4 flex max-w-[1200px] justify-center gap-2 px-4">
          {Array.from({ length: SLIDES_COUNT }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full transition-colors ${
                i === index ? 'bg-neutral-900' : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
