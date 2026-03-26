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

export type TechProductTileAspect = 'tall' | 'compact'

/** `stacked` = caption under image; `split` = image left, caption right (narrower image). */
export type TechProductCaptionLayout = 'stacked' | 'split'

function techTileAspectClass(aspect: TechProductTileAspect) {
  return aspect === 'tall' ? 'aspect-[4/5]' : 'aspect-[5/4]'
}

/** Product photo slots — add <img> when assets are ready. */
export function ProductImagePlaceholder({
  slotIndex,
  tileAspect = 'compact',
}: {
  slotIndex: number
  tileAspect?: TechProductTileAspect
}) {
  return (
    <div
      className={`relative ${techTileAspectClass(tileAspect)} w-full overflow-hidden rounded-xl bg-[#f7f7f7] shadow-sm ring-1 ring-black/[0.06] transition-shadow duration-300 ease-out hover:shadow-lg hover:ring-[#0B0726]/12`}
      data-product-slot={slotIndex}
    >
      <div className="absolute inset-4 flex items-center justify-center opacity-[0.12] sm:inset-6" aria-hidden>
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

export function ProductImageSlot({
  src,
  alt,
  slotIndex,
  tileAspect = 'compact',
}: {
  src: string
  alt: string
  slotIndex: number
  tileAspect?: TechProductTileAspect
}) {
  return (
    <div
      className={`group relative ${techTileAspectClass(tileAspect)} w-full cursor-default overflow-hidden rounded-xl bg-[#f7f7f7] shadow-sm ring-1 ring-black/[0.06] transition-shadow duration-300 ease-out hover:shadow-lg hover:ring-[#0B0726]/12`}
      data-product-slot={slotIndex}
    >
      <div className="absolute inset-4 sm:inset-6">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain object-center transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}

function ProductTechContactLink({ to, labelKey }: { to: string; labelKey: string }) {
  const { t } = useTranslation()
  return (
    <Link
      to={to}
      className="mt-4 inline-flex w-fit items-center justify-center rounded-lg border-2 border-[#0B0726] bg-white px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-wide text-[#0B0726] transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#f7f7f7] hover:shadow-sm active:translate-y-px sm:mt-5 sm:px-8 sm:py-3 sm:text-body-sm"
    >
      {t(labelKey)}
    </Link>
  )
}

function TechProductGridEmptySlot({
  tileAspect,
  cellClassName = '',
}: {
  tileAspect: TechProductTileAspect
  cellClassName?: string
}) {
  return (
    <div className={`flex min-w-0 flex-col items-center ${cellClassName}`} aria-hidden>
      <div className={`w-full ${techTileAspectClass(tileAspect)} opacity-0`} />
    </div>
  )
}

function ProductTechCell({
  image,
  index,
  tileAspect,
  captionLayout,
  contactCta,
  cellClassName = '',
}: {
  image: TechProductImage
  index: number
  tileAspect: TechProductTileAspect
  captionLayout: TechProductCaptionLayout
  /** When set with split layout, renders under the subtitle in the text column. */
  contactCta?: { to: string; labelKey: string }
  /** Extra classes on the outer cell (e.g. max width for smaller tiles). */
  cellClassName?: string
}) {
  const { t } = useTranslation()
  const titleKey = image.titleKey
  const subtitleKey = image.subtitleKey
  const showCaption = titleKey != null && subtitleKey != null

  const captionBlock = showCaption ? (
    <div
      className={`min-w-0 flex-1 ${captionLayout === 'stacked' ? 'w-full text-center' : 'flex flex-col text-left'}`}
    >
      <p className="font-heading text-sm font-bold leading-snug text-[#0B0726] sm:text-base">{t(titleKey)}</p>
      <p className="mt-1 font-body text-xs leading-relaxed text-neutral-600 sm:text-sm">{t(subtitleKey)}</p>
      {contactCta != null && captionLayout === 'split' ? (
        <ProductTechContactLink to={contactCta.to} labelKey={contactCta.labelKey} />
      ) : null}
    </div>
  ) : null

  if (captionLayout === 'split') {
    return (
      <div className={`flex min-w-0 flex-row items-start gap-4 sm:gap-6 ${cellClassName}`}>
        <div className="w-[46%] max-w-[260px] shrink-0 sm:w-auto sm:max-w-[300px]">
          <ProductImageSlot src={image.src} alt={image.alt} slotIndex={index} tileAspect={tileAspect} />
        </div>
        {captionBlock}
      </div>
    )
  }

  return (
    <div className={`flex min-w-0 flex-col items-center gap-2 sm:gap-2.5 ${cellClassName}`}>
      <ProductImageSlot src={image.src} alt={image.alt} slotIndex={index} tileAspect={tileAspect} />
      {captionBlock}
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
  /** Grid columns for product tiles at ≥sm breakpoints. Default 3 (2 cols on mobile). */
  techProductColumns = 3,
  /** `three-across` = always 3 columns (e.g. residential); default = 2 cols on small screens. */
  techProductGridColsMode = 'default',
  /** Pad grid with invisible cells up to this count (e.g. 2 products + 1 empty). */
  techProductPadToSlots,
  /** Applied to each product cell (and empty pads), e.g. `max-w-[150px] w-full`. */
  techProductCellClassName = '',
  /** `tall` = original portrait tiles (4:5); `compact` = shorter (5:4). */
  techProductTileAspect = 'compact',
  /** `split` = image and caption side by side (e.g. maritime). */
  techProductCaptionLayout = 'stacked',
  /** Adds 20px (e.g. mt-5) below the tech subtitle before the product grid + CTA. */
  techProductOffsetTop = false,
  /** Renders a contact link below the tech product grid (when images are set). */
  techShowContactCta,
  /** i18n key for CTA label (defaults to cabinet string for reuse). */
  techContactCtaLabelKey = 'industrial.cabinet.techContactCta',
  primaryCard,
  secondaryCard,
  /** When set, replaces the default card stack (e.g. maritime feature grid). */
  rightColumn,
}: {
  leftColumnContent: ReactNode
  techTitleKey: string
  techSubtitleKey: string
  techProductImages?: readonly TechProductImage[]
  techProductColumns?: 2 | 3
  techProductGridColsMode?: 'default' | 'three-across'
  techProductPadToSlots?: number
  techProductCellClassName?: string
  techProductTileAspect?: TechProductTileAspect
  techProductCaptionLayout?: TechProductCaptionLayout
  techProductOffsetTop?: boolean
  techShowContactCta?: boolean
  techContactCtaLabelKey?: string
  primaryCard?: SolutionCardConfig
  secondaryCard?: SolutionCardConfig
  rightColumn?: ReactNode
}) {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const contactPath = `/${locale ?? 'en'}/contact`
  const techProductCount = techProductImages?.length ?? 0
  const trailingEmptySlots =
    techProductPadToSlots != null ? Math.max(0, techProductPadToSlots - techProductCount) : 0
  const techGridTop = techProductOffsetTop ? 'mt-0' : 'mt-4 sm:mt-5'

  const threeAcross = techProductColumns === 3 && techProductGridColsMode === 'three-across'
  const techGridClassName =
    techProductCount === 1 && techProductCaptionLayout === 'split'
      ? `${techGridTop} grid w-full max-w-2xl grid-cols-1 gap-3 lg:max-w-none`
      : techProductCount === 1 && trailingEmptySlots === 0
        ? `${techGridTop} grid grid-cols-1 gap-3 sm:max-w-xs md:max-w-sm`
        : techProductColumns === 2
          ? `${techGridTop} grid grid-cols-2 gap-3 sm:gap-4`
          : threeAcross
            ? `${techGridTop} grid w-full grid-cols-3 gap-2 sm:gap-3`
            : `${techGridTop} grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4`

  const contactCtaInSplitCaption =
    techShowContactCta &&
    techProductCaptionLayout === 'split' &&
    techProductCount === 1 &&
    techProductImages != null

  const showOuterContactCta = Boolean(
    techShowContactCta && techProductImages?.length && !contactCtaInSplitCaption,
  )

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
          <div className={techProductOffsetTop ? 'mt-5' : ''}>
            <div className={techGridClassName}>
              {techProductImages?.length
                ? (
                    <>
                      {techProductImages.map((img, i) => (
                        <ProductTechCell
                          key={`${img.src}-${i}`}
                          image={img}
                          index={i}
                          tileAspect={techProductTileAspect}
                          captionLayout={techProductCaptionLayout}
                          cellClassName={techProductCellClassName}
                          contactCta={
                            contactCtaInSplitCaption ? { to: contactPath, labelKey: techContactCtaLabelKey } : undefined
                          }
                        />
                      ))}
                      {Array.from({ length: trailingEmptySlots }).map((_, i) => (
                        <TechProductGridEmptySlot
                          key={`tech-pad-${i}`}
                          tileAspect={techProductTileAspect}
                          cellClassName={techProductCellClassName}
                        />
                      ))}
                    </>
                  )
                : [0, 1, 2, 3].map((i) => (
                    <ProductImagePlaceholder key={i} slotIndex={i} tileAspect={techProductTileAspect} />
                  ))}
            </div>
            {showOuterContactCta ? (
              <div className="mt-8 flex justify-start sm:mt-10">
                <Link
                  to={contactPath}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-[#0B0726] bg-white px-8 py-3 font-body text-sm font-semibold uppercase tracking-wide text-[#0B0726] transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#f7f7f7] hover:shadow-sm active:translate-y-px sm:text-body-sm"
                >
                  {t(techContactCtaLabelKey)}
                </Link>
              </div>
            ) : null}
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
