import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const SLIDE_WIDTH_PX = 587
const SLIDE_HEIGHT = 320 // h-80
const GAP_PX = 20
const SLIDES_COUNT = 4
const SLOT_WIDTH = SLIDE_WIDTH_PX + GAP_PX
const DRAG_THRESHOLD = 60
const CONTAINER_WIDTH = 1200

const DELIVERY_SLIDES = [
  { step: 1 as const, image: '/images/delivery-enablement.jpg' },
  { step: 2 as const, image: '/images/delivery-technology-integration.jpg' },
  { step: 3 as const, image: '/images/delivery-after-sales.jpg' },
  { step: 4 as const, image: '/images/delivery-enablement.jpg' },
]

export function HowWeDeliverSlider() {
  const { t } = useTranslation()
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

  const trackWidth = SLIDES_COUNT * SLOT_WIDTH - GAP_PX
  const maxNegativeTranslate = -(trackWidth - CONTAINER_WIDTH)
  const rawTranslateX = -index * SLOT_WIDTH + dragOffset
  const translateX = Math.max(maxNegativeTranslate, Math.min(0, rawTranslateX))

  // Mobile
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

  const renderCard = (slide: (typeof DELIVERY_SLIDES)[0], isMobile = false) => (
    <div
      className="relative flex h-full w-full flex-row overflow-hidden rounded-[10px] bg-neutral-100"
      style={isMobile ? undefined : { width: SLIDE_WIDTH_PX, height: SLIDE_HEIGHT }}
    >
      <div className="flex flex-1 flex-col justify-start pl-7 pr-2 pt-7 pb-6">
        <p className="font-sans text-xs font-normal uppercase tracking-wider text-neutral-500">
          {t(`home.howWeDeliver.stage${slide.step}`)}
        </p>
        <h3 className="mt-1.5 font-sans text-xl font-bold uppercase leading-tight tracking-tight text-black md:text-2xl">
          {t(`home.howWeDeliver.step${slide.step}`)}
        </h3>
        <p className="mt-3 max-w-[256px] font-sans text-sm font-medium leading-relaxed text-gray-700 md:text-base">
          {t(`home.howWeDeliver.step${slide.step}Desc`)}
        </p>
      </div>
      <div className="relative h-full w-72 shrink-0 overflow-hidden rounded-tr-[10px] rounded-br-[10px]">
        <img src={slide.image} alt="" className="h-full w-full object-cover" draggable={false} />
        <img
          src="/images/baterino-logo-white.png"
          alt="Baterino"
          className="absolute bottom-3 right-3 h-6 w-auto object-contain drop-shadow-sm md:bottom-4 md:right-4 md:h-7"
        />
      </div>
    </div>
  )

  return (
    <div className="w-full">
      {/* Mobile */}
      <div className="block w-full overflow-hidden lg:hidden">
        <div className="relative w-full overflow-hidden" onTouchStart={handleMobileTouchStart}>
          <div
            className="flex w-full cursor-grab select-none active:cursor-grabbing"
            style={{
              transform: `translateX(calc(${mobileTranslateX}% + ${mobileDragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            {DELIVERY_SLIDES.map((slide) => (
              <div key={slide.step} className="min-w-full max-w-full shrink-0 px-2">
                <div className="mx-auto max-w-[340px] overflow-hidden rounded-[10px] bg-neutral-100">
                  <div className="relative h-44 w-full overflow-hidden rounded-t-[10px]">
                    <img src={slide.image} alt="" className="h-full w-full object-cover" draggable={false} />
                    <img
                      src="/images/baterino-logo-white.png"
                      alt="Baterino"
                      className="absolute bottom-2 right-2 h-5 w-auto object-contain drop-shadow-sm"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-sans text-xs font-normal uppercase tracking-wider text-neutral-500">
                      {t(`home.howWeDeliver.stage${slide.step}`)}
                    </p>
                    <h3 className="mt-1.5 font-sans text-lg font-bold uppercase leading-tight text-black">
                      {t(`home.howWeDeliver.step${slide.step}`)}
                    </h3>
                    <p className="mt-2.5 font-sans text-sm font-medium leading-relaxed text-gray-700">
                      {t(`home.howWeDeliver.step${slide.step}Desc`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {DELIVERY_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setMobileIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${i === mobileIndex ? 'bg-neutral-900' : 'bg-neutral-300'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop */}
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
            {DELIVERY_SLIDES.map((slide) => (
              <div
                key={slide.step}
                className="relative shrink-0"
                style={{ width: SLIDE_WIDTH_PX, height: SLIDE_HEIGHT }}
              >
                {renderCard(slide)}
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
