import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const SLIDES = [
  { id: 'industrial', src: '/images/baterino-industrial-black.png', descKey: 'home.baterinoPro.industrialDesc' },
  { id: 'medical', src: '/images/baterino-medical-black.png', descKey: 'home.baterinoPro.medicalDesc' },
  { id: 'maritime', src: '/images/baterino-maritime-black.png', descKey: 'home.baterinoPro.maritimeDesc' },
] as const

export function IntroducingSlider() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const startXRef = useRef(0)
  const dragOffsetRef = useRef(0)

  const goPrev = useCallback(() => setIndex((i) => (i <= 0 ? SLIDES.length - 1 : i - 1)), [])
  const goNext = useCallback(() => setIndex((i) => (i >= SLIDES.length - 1 ? 0 : i + 1)), [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
    dragOffsetRef.current = 0
    setIsDragging(true)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - startXRef.current
    setDragOffset(dx)
    dragOffsetRef.current = dx
  }, [])

  const handleTouchEnd = useCallback(() => {
    const offset = dragOffsetRef.current
    if (offset > 50) goPrev()
    else if (offset < -50) goNext()
    setDragOffset(0)
    dragOffsetRef.current = 0
    setIsDragging(false)
  }, [goPrev, goNext])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    startXRef.current = e.clientX
    dragOffsetRef.current = 0
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - startXRef.current
      setDragOffset(dx)
      dragOffsetRef.current = dx
    }
    const onUp = () => {
      const offset = dragOffsetRef.current
      if (offset > 50) goPrev()
      else if (offset < -50) goNext()
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

  return (
    <div className="flex flex-col items-center px-4 text-center">
      {/* Fixed: INTRODUCING */}
      <p className="font-body text-body-md font-medium uppercase tracking-wider text-neutral-500">
        {t('home.baterinoPro.introducing')}
      </p>

      {/* Slider: logos + subtext */}
      <div
        className="relative mt-4 w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <div
          className="flex transition-transform duration-200 ease-out"
          style={{
            transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
          }}
        >
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="flex min-w-full flex-shrink-0 flex-col items-center"
            >
              <img
                src={slide.src}
                alt=""
                className="h-6 w-auto object-contain"
              />
              <p className="mt-4 max-w-[320px] font-body text-body-md font-medium leading-relaxed text-neutral-600">
                {t(slide.descKey)}
              </p>
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? 'bg-neutral-900' : 'bg-neutral-300'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
