import { useTranslation } from 'react-i18next'

interface SectionHeadingProps {
  titleKey: string
  subtitleKey?: string
}

export function SectionHeading({ titleKey, subtitleKey }: SectionHeadingProps) {
  const { t } = useTranslation()
  return (
    <header className="mb-6">
      <h2 className="font-heading text-heading-lg font-bold uppercase tracking-tight text-neutral-900 sm:text-section-title">
        {t(titleKey)}
      </h2>
      {subtitleKey && (
        <p className="mt-2 font-body text-body-md font-medium uppercase tracking-wider text-neutral-500">
          {t(subtitleKey)}
        </p>
      )}
    </header>
  )
}
