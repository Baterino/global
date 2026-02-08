import { useTranslation } from 'react-i18next'
import { useState, useRef, useCallback, useEffect } from 'react'

const SLIDE_WIDTH_PX = 400
const GAP_PX = 32
const SLIDES_COUNT = 5
const SLOT_WIDTH = SLIDE_WIDTH_PX + GAP_PX
const DRAG_THRESHOLD = 60
const CONTAINER_WIDTH = 1200

export function DeliveryFrameworkSlider() {
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

  const cards: Array<{
    number: number
    isImageCard?: boolean
    title?: string
    desc?: string
    label?: string
    points?: string[]
    footer?: string
  }> = [
    {
      number: 0,
      isImageCard: true,
    },
    {
      number: 1,
      title: t('delivery.framework.item1.title'),
      desc: t('delivery.framework.item1.desc'),
      label: t('delivery.framework.item1.includes'),
      points: [
        t('delivery.framework.item1.point1'),
        t('delivery.framework.item1.point2'),
        t('delivery.framework.item1.point3'),
      ],
      footer: t('delivery.framework.item1.footer'),
    },
    {
      number: 2,
      title: t('delivery.framework.item2.title'),
      desc: t('delivery.framework.item2.desc'),
      label: t('delivery.framework.item2.includes'),
      points: [
        t('delivery.framework.item2.point1'),
        t('delivery.framework.item2.point2'),
        t('delivery.framework.item2.point3'),
        t('delivery.framework.item2.point4'),
      ],
      footer: t('delivery.framework.item2.footer'),
    },
    {
      number: 3,
      title: t('delivery.framework.item3.title'),
      desc: t('delivery.framework.item3.desc'),
      label: '',
      points: [
        t('delivery.framework.item3.point1'),
        t('delivery.framework.item3.point2'),
        t('delivery.framework.item3.point3'),
      ],
      footer: t('delivery.framework.item3.footer'),
    },
    {
      number: 4,
      title: t('delivery.framework.item4.title'),
      desc: t('delivery.framework.item4.desc'),
      label: t('delivery.framework.item4.capability'),
      points: [
        t('delivery.framework.item4.point1'),
        t('delivery.framework.item4.point2'),
        t('delivery.framework.item4.point3'),
      ],
      footer: t('delivery.framework.item4.footer'),
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

  const trackWidth = cards.length * SLOT_WIDTH - GAP_PX
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
            {cards.map((card) => (
              <div key={card.number} className="min-w-full max-w-full shrink-0 px-4">
                <div className="w-full overflow-hidden rounded-[10px] bg-neutral-50">
                  {card.isImageCard ? (
                    <div className="h-64 w-full overflow-hidden rounded-[10px]">
                      <img
                        src="/images/delivery-picture.png"
                        alt="Delivery Framework"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="p-6">
                      {card.title && (
                        <h3 className="mb-4 break-words font-heading text-xl font-bold text-neutral-900">
                          {card.number}. {card.title}
                        </h3>
                      )}
                      {card.desc && (
                        <p className="mb-4 break-words font-body text-base leading-relaxed text-neutral-700">
                          {card.desc}
                        </p>
                      )}
                      {card.label && (
                        <p className="mb-3 break-words font-body text-base font-semibold text-neutral-900">
                          {card.label}
                        </p>
                      )}
                      {card.points && (
                        <ul className="mb-4 space-y-2 break-words font-body text-base leading-relaxed text-neutral-700">
                          {card.points.map((point, idx) => (
                            <li key={idx}>• {point}</li>
                          ))}
                        </ul>
                      )}
                      {card.footer && (
                        <p className="break-words font-body text-base leading-relaxed text-neutral-700">
                          {card.footer}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {cards.map((card, i) => (
            <button
              key={card.number}
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
            <div className="overflow-visible" onMouseLeave={handleMouseLeave}>
            <div
              className="flex cursor-grab select-none gap-8"
              style={{
                transform: `translateX(${translateX}px)`,
                width: trackWidth,
                transition: isDragging ? 'none' : 'transform 0.5s ease-out',
              }}
              onMouseDown={handleMouseDown}
            >
              {cards.map((card) => (
                <article
                  key={card.number}
                  className="relative w-[400px] flex-shrink-0 rounded-[10px] bg-neutral-50"
                >
                  {card.isImageCard ? (
                    // Image Card
                    <div className="h-full w-full overflow-hidden rounded-[10px]">
                      <img
                        src="/images/delivery-picture.png"
                        alt="Delivery Framework"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    // Content Card
                    <div className="p-8 pb-20">
                      {card.title && (
                        <h3 className="mb-4 font-heading text-heading-md font-bold text-neutral-900">
                          {card.number}. {card.title}
                        </h3>
                      )}
                      {card.desc && (
<p className="mb-6 font-body text-body-md leading-relaxed text-neutral-700">
                        {card.desc}
                      </p>
                    )}
                    {card.label && (
                      <p className="mb-3 font-body text-body-md font-semibold text-neutral-900">
                          {card.label}
                        </p>
                      )}
                      {card.points && (
                        <ul className={`space-y-2 font-body text-body-md leading-relaxed text-neutral-700 ${card.footer ? 'mb-6' : 'mb-8'}`}>
                          {card.points.map((point, idx) => (
                            <li key={idx}>• {point}</li>
                          ))}
                        </ul>
                      )}
                      {card.footer && (
                        <p className="mb-8 font-body text-body-md leading-relaxed text-neutral-700">
                          {card.footer}
                        </p>
                      )}

                      {/* Bottom line with arrow on the right */}
                      <div className="absolute bottom-8 left-8 right-8 flex items-center">
                        <div className="flex-1 border-t border-neutral-400" />
                        <div className="ml-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-neutral-900 bg-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-neutral-900"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
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
        <div className="mt-8 flex justify-center gap-2">
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
