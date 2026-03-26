import { useTranslation } from 'react-i18next'
import { ImageWithLogo } from '../components/ImageWithLogo'
import { SolutionTwoColumnLayout, type TechProductImage } from '../components/solutions/SolutionTwoColumnLayout'
import { SEOHead } from '../components/SEOHead'

type ResidentialSectionId = 'individual' | 'microgrids'

const INDIVIDUAL_LOW_VOLTAGE_PRODUCTS: readonly TechProductImage[] = [
  {
    src: '/images/products/residential/wall-mounted-low-voltage.png',
    alt: 'Wall Mounted Storage LV TR Series residential',
    titleKey: 'residential.individual.techProduct1.title',
    subtitleKey: 'residential.individual.techProduct1.subtitle',
  },
  {
    src: '/images/products/residential/wall-mounted-low-voltage-pro.png',
    alt: 'Wall Mounted Pro LV TR Series Pro residential',
    titleKey: 'residential.individual.techProduct2.title',
    subtitleKey: 'residential.individual.techProduct2.subtitle',
  },
]

/** Left → right: HV stack, HP Ultra 2000k stack, TA6000 all-in-one (matches Green Planet / One Stop copy). */
const MICROGRID_HIGH_VOLTAGE_PRODUCTS: readonly TechProductImage[] = [
  {
    src: '/images/products/residential/high-voltage-stacked.png',
    alt: 'Green Planet Series HV Stacked residential storage',
    titleKey: 'residential.microgrids.techProduct1.title',
    subtitleKey: 'residential.microgrids.techProduct1.subtitle',
  },
  {
    src: '/images/products/residential/hp-2000k.png',
    alt: 'Green Planet Pro HV Stacked HP Ultra 2000k',
    titleKey: 'residential.microgrids.techProduct2.title',
    subtitleKey: 'residential.microgrids.techProduct2.subtitle',
  },
  {
    src: '/images/products/residential/all-in-one.png',
    alt: 'One Stop All in One TA6000 energy series',
    titleKey: 'residential.microgrids.techProduct3.title',
    subtitleKey: 'residential.microgrids.techProduct3.subtitle',
  },
]

function ResidentialSectionBody({
  section,
  techProductImages,
  techProductPadToSlots,
}: {
  section: ResidentialSectionId
  techProductImages: readonly TechProductImage[]
  /** Total slots in the row (e.g. 3); empty slots stay blank. */
  techProductPadToSlots?: number
}) {
  const { t } = useTranslation()
  const base = `residential.${section}`
  const advantagesIntroKey =
    section === 'microgrids' ? `${base}.advantagesIntro` : `${base}.keyAdvantagesIntro`

  const focusItems = [`${base}.focus1`, `${base}.focus2`, `${base}.focus3`, `${base}.focus4`] as const
  const advantageItems = [`${base}.advantage1`, `${base}.advantage2`, `${base}.advantage3`, `${base}.advantage4`] as const

  return (
    <SolutionTwoColumnLayout
      leftColumnContent={
        <div className="space-y-5">
          <p className="font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
            {t(`${base}.desc1`)}
          </p>
          <p className="font-body text-mobile-body leading-relaxed text-neutral-700 lg:text-body-md">
            {t(`${base}.desc2`)}
          </p>
        </div>
      }
      techTitleKey="residential.techBoxTitle"
      techSubtitleKey={`${base}.techBoxSubtitle`}
      techProductImages={techProductImages}
      techProductColumns={3}
      techProductPadToSlots={techProductPadToSlots}
      techProductTileAspect="tall"
      techShowContactCta
      techContactCtaLabelKey="residential.techContactCta"
      primaryCard={{
        titleKey: `${base}.ourFocus`,
        introKey: `${base}.focusIntro`,
        itemKeys: focusItems,
      }}
      secondaryCard={{
        titleKey: `${base}.keyAdvantages`,
        introKey: advantagesIntroKey,
        itemKeys: advantageItems,
      }}
    />
  )
}

export function SolutionsResidential() {
  const { t } = useTranslation()

  return (
    <article className="w-full bg-white">
      <SEOHead title="Residential Energy Storage Solutions | Baterino" description="Residential battery storage systems for homes and communities. Reliable energy storage solutions for solar integration and energy independence." ogImage="/images/og-images/og-residential.jpg" />
      {/* Hero Section */}
      <section className="w-full bg-white px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {t('residential.hero.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-[740px] font-body text-mobile-body font-medium leading-relaxed text-neutral-600 lg:text-body-md">
            {t('residential.hero.subtitle')}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 font-nunito text-body-sm font-normal text-neutral-500">
            <span>{t('home.hero.poweredBy')}</span>
            <a
              href="https://www.ltc-energy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <img src="/images/lithtech-logo.webp" alt="LithTech" className="h-5 w-auto object-contain" />
            </a>
          </div>
        </div>
      </section>

      {/* Individual Users Section */}
      <section className="w-full bg-white px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-6 text-center font-heading text-mobile-h2 font-bold uppercase tracking-tight text-neutral-900 lg:mb-8 lg:text-left lg:text-2xl xl:text-3xl">
            {t('residential.individual.title')}
          </h2>
          <ImageWithLogo
            src="/images/residential-storage-solutions.png"
            alt=""
            className="mb-8 h-64 w-full rounded-[10px] sm:h-96"
            imgClassName="rounded-[10px] object-cover"
            logoSize="lg"
            mobileCenter
          />
          <ResidentialSectionBody
            section="individual"
            techProductImages={INDIVIDUAL_LOW_VOLTAGE_PRODUCTS}
            techProductPadToSlots={3}
          />
        </div>
      </section>

      {/* Microgrids Section */}
      <section className="w-full border-t border-neutral-200 bg-neutral-50/40 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-6 text-center font-heading text-mobile-h2 font-bold uppercase tracking-tight text-neutral-900 lg:mb-8 lg:text-left lg:text-2xl xl:text-3xl">
            {t('residential.microgrids.title')}
          </h2>
          <ImageWithLogo
            src="/images/residential-microgrids.png"
            alt=""
            className="mb-8 h-64 w-full rounded-[10px] sm:h-96"
            imgClassName="rounded-[10px] object-cover"
            logoSize="lg"
            mobileCenter
          />
          <ResidentialSectionBody section="microgrids" techProductImages={MICROGRID_HIGH_VOLTAGE_PRODUCTS} />
        </div>
      </section>
    </article>
  )
}
