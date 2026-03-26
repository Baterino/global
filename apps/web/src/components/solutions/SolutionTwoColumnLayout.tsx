import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

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
      className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f7f7f7] shadow-sm ring-1 ring-black/[0.06] transition-shadow duration-300 ease-out hover:shadow-lg hover:ring-[#0B0726]/12"
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

export function ProductImageSlot({ src, alt, slotIndex }: { src: string; alt: string; slotIndex: number }) {
  return (
    <div
      className="group relative aspect-[4/5] w-full cursor-default overflow-hidden rounded-xl bg-[#f7f7f7] shadow-sm ring-1 ring-black/[0.06] transition-shadow duration-300 ease-out hover:shadow-lg hover:ring-[#0B0726]/12"
      data-product-slot={slotIndex}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

function ProductTechCell({ image, index }: { image: TechProductImage; index: number }) {
  const { t } = useTranslation()
  const titleKey = image.titleKey
  const subtitleKey = image.subtitleKey
  const showCaption = titleKey != null && subtitleKey != null

  return (
    <div className="flex min-w-0 flex-col items-center gap-2 sm:gap-2.5">
      <ProductImageSlot src={image.src} alt={image.alt} slotIndex={index} />
      {showCaption ? (
        <div className="w-full text-center">
          <p className="font-heading text-sm font-bold leading-snug text-[#0B0726] sm:text-base">{t(titleKey)}</p>
          <p className="mt-1 font-body text-xs leading-relaxed text-neutral-600 sm:text-sm">{t(subtitleKey)}</p>
        </div>
      ) : null}
    </div>
  )
}

export type TechProductImage = {
  src: string
  alt: string
  /** i18n keys for caption under the image */
  titleKey?: string
  subtitleKey?: string
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
  /** When set, replaces placeholder grid with product shots (e.g. cabinet lineup). */
  techProductImages,
  /** Renders a contact link below the tech product grid (when images are set). */
  techShowContactCta,
  primaryCard,
  secondaryCard,
  /** When set, replaces the default card stack (e.g. maritime feature grid). */
  rightColumn,
}: {
  leftColumnContent: ReactNode
  techTitleKey: string
  techSubtitleKey: string
  techProductImages?: readonly TechProductImage[]
  techShowContactCta?: boolean
  primaryCard?: SolutionCardConfig
  secondaryCard?: SolutionCardConfig
  rightColumn?: ReactNode
}) {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const contactPath = `/${locale ?? 'en'}/contact`

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
            {techProductImages?.length
              ? techProductImages.map((img, i) => <ProductTechCell key={`${img.src}-${i}`} image={img} index={i} />)
              : [0, 1, 2, 3].map((i) => <ProductImagePlaceholder key={i} slotIndex={i} />)}
          </div>
          {techShowContactCta && techProductImages?.length ? (
            <div className="mt-8 flex justify-start sm:mt-10">
              <Link
                to={contactPath}
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#0B0726] bg-white px-8 py-3 font-body text-sm font-semibold uppercase tracking-wide text-[#0B0726] transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#f7f7f7] hover:shadow-sm active:translate-y-px sm:text-body-sm"
              >
                {t('industrial.cabinet.techContactCta')}
              </Link>
            </div>
          ) : null}
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
