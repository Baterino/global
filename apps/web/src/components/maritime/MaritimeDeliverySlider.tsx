import { useTranslation } from 'react-i18next'
import { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const SLIDE_WIDTH_PX = 340
const GAP_PX = 20
const SLIDES_COUNT = 5
const SLOT_WIDTH = SLIDE_WIDTH_PX + GAP_PX
const DRAG_THRESHOLD = 60
const CONTAINER_WIDTH = 1200

export function MaritimeDeliverySlider() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const contactPath = `/${locale ?? 'en'}/contact`
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

  const steps = [
    { 
      number: 1, 
      title: t('maritime.delivery.step1'),
      desc: t('maritime.delivery.step1Desc')
    },
    { 
      number: 2, 
      title: t('maritime.delivery.step2'),
      desc: t('maritime.delivery.step2Desc')
    },
    { 
      number: 3, 
      title: t('maritime.delivery.step3'),
      desc: t('maritime.delivery.step3Desc')
    },
    { 
      number: 4, 
      title: t('maritime.delivery.step4'),
      desc: t('maritime.delivery.step4Desc')
    },
    { 
      number: 5, 
      title: t('maritime.delivery.step5'),
      desc: t('maritime.delivery.step5Desc')
    },
  ]

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

  const trackWidth = steps.length * SLOT_WIDTH - GAP_PX
  const maxNegativeTranslate = -(trackWidth - CONTAINER_WIDTH)
  const rawTranslateX = -index * SLOT_WIDTH + dragOffset
  const translateX = Math.max(maxNegativeTranslate, Math.min(0, rawTranslateX))

  const mobileTranslateX = -mobileIndex * 100

  return (
    <div className="w-full overflow-hidden">
      {/* Mobile Slider */}
      <div className="block w-full overflow-hidden lg:hidden">
        <div
          className="relative w-full overflow-hidden px-4"
          onTouchStart={handleMobileTouchStart}
        >
          <div
            className="flex w-full cursor-grab select-none active:cursor-grabbing"
            style={{
              transform: `translateX(calc(${mobileTranslateX}% + ${mobileDragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            }}
          >
            {steps.map((step, stepIndex) => (
              <div key={step.number} className="min-w-full max-w-full shrink-0 pr-4">
                <div className="w-full overflow-hidden rounded-[10px] bg-neutral-100 p-6">
                  <div className="mb-4 flex items-start gap-3">
                    <span className="font-nunito text-5xl font-extrabold leading-none text-neutral-900">
                      {step.number}
                    </span>
                    <h3 className="break-words font-heading text-xl font-bold leading-tight text-neutral-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mb-5 break-words font-body text-base leading-relaxed text-neutral-700">
                    {step.desc}
                  </p>
                  {stepIndex === steps.length - 1 ? (
                    <div className="flex items-center justify-center">
                      <Link
                        to={contactPath}
                        className="inline-flex items-center justify-center rounded-[5px] bg-white px-6 py-2.5 font-body text-base font-bold text-neutral-900 transition-colors hover:bg-neutral-200"
                      >
                        {t('home.carousel.learnMore')}
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="flex-1 border-t border-neutral-400" aria-hidden />
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-neutral-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-neutral-900"
                          aria-hidden
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {steps.map((step, i) => (
            <button
              key={step.number}
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
        <div className="relative -mx-4 w-screen sm:-mx-6 lg:-mx-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div
              className="overflow-visible"
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
              {steps.map((step, stepIndex) => (
                <article
                  key={step.number}
                  className="w-[340px] flex-shrink-0 rounded-[10px] bg-neutral-100 p-8"
                >
                  <div className="mb-4 flex items-start gap-3">
                    <span className="font-nunito text-6xl font-extrabold leading-none text-neutral-900">
                      {step.number}
                    </span>
                    <h3 className={`font-heading text-heading-lg font-bold leading-tight text-neutral-900 ${
                      stepIndex === 0 || stepIndex === 2 ? 'max-w-[140px]' : ''
                    }`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="mb-6 font-body text-body-md leading-relaxed text-neutral-700">
                    {step.desc}
                  </p>
                  {stepIndex === steps.length - 1 ? (
                    <div className="mt-6 flex items-center justify-center">
                      <Link
                        to={contactPath}
                        className="inline-flex items-center justify-center rounded-[5px] bg-white px-6 py-2 font-body text-body-md font-bold text-neutral-900 transition-colors hover:bg-neutral-200"
                      >
                        {t('home.carousel.learnMore')}
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-auto flex items-center gap-4">
                      <div className="flex-1 border-t border-neutral-400" aria-hidden />
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-neutral-900">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-neutral-900"
                          aria-hidden
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="mt-6 flex justify-center gap-2">
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
