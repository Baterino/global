import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const SLIDE_WIDTH_PX = 380
const SLIDE_HEIGHT = 440
const GAP_PX = 20
const SLIDES_COUNT = 4
const SLOT_WIDTH = SLIDE_WIDTH_PX + GAP_PX
const DRAG_THRESHOLD = 60
const CONTAINER_WIDTH = 1200

const WHAT_WE_DO_SLIDES = [
  { key: 'technology', image: '/images/import-distribution.jpg' },
  { key: 'integration', image: '/images/system-integration.jpg' },
  { key: 'afterSales', image: '/images/after-sales.jpg' },
  { key: 'infrastructure', image: '/images/infrastructure-enablement.jpg' },
]

export function WhatWeDoSlider() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const startXRef = useRef(0)
  const didDragRef = useRef(false)
  const dragOffsetRef = useRef(0)

  // Mobile state
  const [mobileIndex, setMobileIndex] = useState(0)
  const [mobileDragOffset, setMobileDragOffset] = useState(0)
  const mobileDragRef = useRef(0)

  const goPrev = useCallback(() => setIndex((i) => (i <= 0 ? SLIDES_COUNT - 1 : i - 1)), [])
  const goNext = useCallback(() => setIndex((i) => (i >= SLIDES_COUNT - 1 ? 0 : i + 1)), [])

  const mobileGoPrev = useCallback(() => setMobileIndex((i) => Math.max(0, i - 1)), [])
  const mobileGoNext = useCallback(() => setMobileIndex((i) => Math.min(SLIDES_COUNT - 1, i + 1)), [])

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
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
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

  // Mobile touch handlers
  const handleMobileTouchStart = useCallback((e: React.TouchEvent) => {
    didDragRef.current = false
    startXRef.current = e.touches[0].clientX
    mobileDragRef.current = 0
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return
    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startXRef.current
      const maxDrag = 120
      const clamped = Math.max(-maxDrag, Math.min(maxDrag, dx))
      mobileDragRef.current = clamped
      setMobileDragOffset(clamped)
      if (Math.abs(clamped) > 10) didDragRef.current = true
    }
    const onTouchEnd = () => {
      const offset = mobileDragRef.current
      if (offset > DRAG_THRESHOLD) mobileGoPrev()
      else if (offset < -DRAG_THRESHOLD) mobileGoNext()
      setMobileDragOffset(0)
      mobileDragRef.current = 0
      setIsDragging(false)
    }
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isDragging, mobileGoPrev, mobileGoNext])

  const trackSlides = WHAT_WE_DO_SLIDES
  const trackWidth = trackSlides.length * SLOT_WIDTH - GAP_PX
  const maxNegativeTranslate = -(trackWidth - CONTAINER_WIDTH)
  const rawTranslateX = -index * SLOT_WIDTH + dragOffset
  const translateX = Math.max(maxNegativeTranslate, Math.min(0, rawTranslateX))

  const mobileTranslateX = -mobileIndex * 100

  return (
    <div className="w-full overflow-hidden">
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
            {WHAT_WE_DO_SLIDES.map((slide) => (
              <div key={slide.key} className="min-w-full max-w-full shrink-0 px-4">
                <div className="w-full overflow-hidden rounded-[10px] bg-[#f5f5f5]">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={slide.image}
                      alt=""
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="break-words font-heading text-xl font-bold uppercase leading-tight tracking-tight text-neutral-900">
                      {t(`aboutBaterino.whatWeDo.${slide.key}.title`)}
                    </h3>
                    <p className="mt-3 break-words font-body text-base leading-relaxed text-neutral-700">
                      {t(`aboutBaterino.whatWeDo.${slide.key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {WHAT_WE_DO_SLIDES.map((slide, i) => (
            <button
              key={slide.key}
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
      <div className="hidden lg:block overflow-visible">
        <div
          className="relative overflow-visible rounded-[10px]"
          style={{ height: SLIDE_HEIGHT }}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex cursor-grab select-none gap-5 active:cursor-grabbing"
            style={{
              transform: `translateX(${translateX}px)`,
              width: trackWidth,
              transition: isDragging ? 'none' : 'transform 0.5s ease-out',
            }}
            onMouseDown={handleMouseDown}
          >
            {trackSlides.map((slide, i) => (
              <div
                key={i}
                className="relative flex shrink-0 flex-col overflow-hidden rounded-[10px] bg-[#f5f5f5] shadow-sm"
                style={{ width: `${SLIDE_WIDTH_PX}px`, height: `${SLIDE_HEIGHT}px` }}
              >
                {/* Image section - ~40-45% of card */}
                <div className="h-[45%] min-h-0 w-full shrink-0 overflow-hidden rounded-t-[10px]">
                  {'image' in slide && slide.image ? (
                    <img
                      src={slide.image}
                      alt=""
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  ) : (
                    <div className="h-full w-full bg-neutral-300" />
                  )}
                </div>
                {/* Text section - ~55-60% of card */}
                <div className="flex min-h-0 flex-1 flex-col p-6">
                  <div className="flex min-h-[4rem] flex-col justify-end">
                    <h3 className="max-w-[18rem] font-heading text-base font-bold uppercase leading-tight tracking-tight text-neutral-900 sm:text-lg">
                      {t(`aboutBaterino.whatWeDo.${slide.key}.title`)}
                    </h3>
                  </div>
                  <p className="mt-4 font-body text-body-md leading-relaxed text-neutral-700">
                    {t(`aboutBaterino.whatWeDo.${slide.key}.description`)}
                  </p>
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
              className={`h-3.5 w-3.5 rounded-full transition-colors ${
                i === index ? 'bg-black' : 'bg-zinc-300 hover:bg-zinc-400'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
