import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-7.5 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 6.951-9.73a.75.75 0 011.052-.143z"
        clipRule="evenodd"
      />
    </svg>
  )
}

/** Product photo slots — add <img> when assets are ready. */
export function ProductImagePlaceholder({ slotIndex }: { slotIndex: number }) {
  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f7f7f7]"
      data-product-slot={slotIndex}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.12]" aria-hidden>
        <svg className="h-12 w-12 text-neutral-900" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-13.5l-3.935 3.935m0 0A2.25 2.25 0 0112 7.5h6.75a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-13.5a2.25 2.25 0 01-2.25-2.25v-9z"
          />
        </svg>
      </div>
    </div>
  )
}

export type SolutionCardConfig = {
  titleKey: string
  /** Optional intro paragraph below the title */
  introKey?: string
  itemKeys: readonly string[]
}

export function SolutionTwoColumnLayout({
  leftColumnContent,
  techTitleKey,
  techSubtitleKey,
  primaryCard,
  secondaryCard,
  /** When set, replaces the default card stack (e.g. maritime feature grid). */
  rightColumn,
}: {
  leftColumnContent: ReactNode
  techTitleKey: string
  techSubtitleKey: string
  primaryCard?: SolutionCardConfig
  secondaryCard?: SolutionCardConfig
  rightColumn?: ReactNode
}) {
  const { t } = useTranslation()

  function renderCard(config: SolutionCardConfig) {
    return (
      <article className="flex flex-col rounded-2xl bg-[#f7f7f7] p-6 sm:p-8">
        <h3 className="mb-5 font-heading text-lg font-bold uppercase tracking-tight text-neutral-900 sm:text-xl">
          {t(config.titleKey)}
        </h3>
        {config.introKey ? (
          <p className="mb-6 font-body text-mobile-body leading-relaxed text-neutral-600 lg:text-body-md">
            {t(config.introKey)}
          </p>
        ) : null}
        <ul className={`space-y-3.5 ${config.introKey ? 'pt-2' : 'pt-1'}`}>
          {config.itemKeys.map((key) => (
            <li key={key} className="flex gap-3.5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              <span className="font-body text-mobile-body leading-relaxed text-neutral-800 lg:text-body-md">{t(key)}</span>
            </li>
          ))}
        </ul>
      </article>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,3fr)] lg:items-start lg:gap-10">
      <div className="flex min-w-0 flex-col gap-6 lg:gap-8">
        <div className="text-left">{leftColumnContent}</div>

        <div className="text-left">
          <h3 className="font-heading text-base font-bold leading-snug text-[#0B0726] sm:text-lg">{t(techTitleKey)}</h3>
          <p className="mt-2 font-body text-mobile-body leading-relaxed text-neutral-600 sm:mt-2.5 sm:text-body-md">
            {t(techSubtitleKey)}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:grid-cols-3 sm:gap-4">
            {[0, 1, 2, 3].map((i) => (
              <ProductImagePlaceholder key={i} slotIndex={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="min-w-0">
        {rightColumn != null ? (
          rightColumn
        ) : (
          <div className="flex flex-col gap-6 lg:gap-8">
            {primaryCard ? renderCard(primaryCard) : null}
            {secondaryCard ? renderCard(secondaryCard) : null}
          </div>
        )}
      </div>
    </div>
  )
}
