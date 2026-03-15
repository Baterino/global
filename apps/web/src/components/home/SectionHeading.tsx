import { useTranslation } from 'react-i18next'

interface SectionHeadingProps {
  titleKey: string
  subtitleKey?: string
  center?: boolean
  centerOnMobile?: boolean
}

export function SectionHeading({ titleKey, subtitleKey, center, centerOnMobile }: SectionHeadingProps) {
  const { t } = useTranslation()
  const alignClass = center ? 'text-center' : centerOnMobile ? 'text-left max-md:text-center' : ''
  return (
    <header className={`mb-6 ${alignClass}`}>
      {subtitleKey && (
        <p className="font-body text-body-sm font-semibold uppercase tracking-widest text-[#323671]">
          {t(subtitleKey)}
        </p>
      )}
      <h2 className={`font-heading text-heading-lg font-bold uppercase tracking-tight text-black sm:text-section-title ${subtitleKey ? 'mt-2' : ''}`}>
        {t(titleKey)}
      </h2>
    </header>
  )
}
