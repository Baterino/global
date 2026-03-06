import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { Hero } from '../components/home/Hero'
import { SectionHeading } from '../components/home/SectionHeading'
import { EnableCard } from '../components/home/EnableCard'
import { HowWeDeliverSlider } from '../components/home/HowWeDeliverSlider'
import { ImpactSlider } from '../components/home/ImpactSlider'

const INDUSTRIAL_IMG = '/images/industrial-solutions-baterino.png'
const RESIDENTIAL_IMG = '/images/Residential-solutions-baterino.png'
const MEDICAL_IMG = '/images/medical-solutions-baterino.png' // fallback: use INDUSTRIAL_IMG if file missing
const MARITIME_IMG = '/images/maritime-energy-solutions-baterino.png'
const TRUST_IMG = '/images/baterino-resilience.png'

export function Home() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`

  return (
    <article className="relative w-full bg-white">
      <Hero />

      {/* What we enable: title + subtitle on top; then intro and cards */}
      <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          {/* Title and subtitle on top */}
          <SectionHeading
            titleKey="home.whatWeEnable.title"
            subtitleKey="home.whatWeEnable.subtitle"
          />
          <p className="mb-8 max-w-[720px] font-body text-body-md font-medium leading-relaxed text-neutral-600">
            {t('home.whatWeEnable.intro')}
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <EnableCard
              image={RESIDENTIAL_IMG}
              titleKey="home.whatWeEnable.residential"
              descKey="home.whatWeEnable.residentialDesc"
              to="/solutions/residential"
            />
            <EnableCard
              image={INDUSTRIAL_IMG}
              titleKey="home.whatWeEnable.industrial"
              descKey="home.whatWeEnable.industrialDesc"
              to="/solutions/industrial"
            />
            <EnableCard
              image={MEDICAL_IMG}
              titleKey="home.whatWeEnable.medical"
              descKey="home.whatWeEnable.medicalDesc"
              to="/solutions/industrial"
            />
            <EnableCard
              image={MARITIME_IMG}
              titleKey="home.whatWeEnable.maritime"
              descKey="home.whatWeEnable.maritimeDesc"
              to="/solutions/maritime"
            />
          </div>
        </div>
      </section>

      {/* How we deliver */}
      <section className="w-full border-t border-neutral-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeading
            titleKey="home.howWeDeliver.title"
            subtitleKey="home.howWeDeliver.subtitle"
          />
          <p className="mb-10 max-w-[792px] font-body text-body-md font-medium leading-relaxed text-neutral-600">
            {t('home.howWeDeliver.intro')}
          </p>
          <HowWeDeliverSlider />
        </div>
      </section>

      {/* Built on trust */}
      <section className="w-full border-t border-neutral-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-8 font-heading text-heading-lg font-bold uppercase tracking-tight text-neutral-900 sm:text-section-title">
            {t('home.builtOnTrust.title')}
          </h2>
          <div className="overflow-hidden rounded-[10px]">
            <img
              src={TRUST_IMG}
              alt=""
              className="h-64 w-full object-cover sm:h-96"
              style={{ aspectRatio: '1238/825' }}
            />
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-heading text-heading-md font-semibold text-neutral-900">
                {t('home.builtOnTrust.col1')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.builtOnTrust.col1Desc')}
              </p>
            </div>
            <div>
              <h3 className="font-heading text-heading-md font-semibold text-neutral-900">
                {t('home.builtOnTrust.col2')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.builtOnTrust.col2Desc')}
              </p>
            </div>
            <div>
              <h3 className="font-heading text-heading-md font-semibold text-neutral-900">
                {t('home.builtOnTrust.col3')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.builtOnTrust.col3Desc')}
              </p>
            </div>
            <div>
              <h3 className="font-heading text-heading-md font-semibold text-neutral-900">
                {t('home.builtOnTrust.col4')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.builtOnTrust.col4Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our global impact */}
      <section className="w-full border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            titleKey="home.globalImpact.title"
            subtitleKey="home.globalImpact.subtitle"
          />
          <p className="mb-10 max-w-[792px] font-body text-body-lg font-medium leading-relaxed text-neutral-600">
            {t('home.globalImpact.intro')}
          </p>
        </div>
        <div className="w-full overflow-visible">
          <ImpactSlider />
        </div>
      </section>

      {/* Global presence */}
      <section className="w-full border-t border-neutral-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeading
            titleKey="home.globalPresence.title"
            subtitleKey="home.globalPresence.subtitle"
          />
          <img
            src="/images/global-presence-wide.jpg"
            alt="Global Presence"
            className="h-96 w-full max-w-[1200px] rounded-[10px] object-cover"
          />

          {/* Footer-like content within Global Presence section */}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <section className="lg:col-span-2">
              <h3 className="font-heading text-heading-md font-semibold text-neutral-900">
                {t('home.footer.aboutUs')}
              </h3>
              <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.footer.aboutUsDesc')}
              </p>
              <Link 
                to={`${base}/company/about-baterino`}
                className="mt-3 inline-block font-body text-body-md text-neutral-900 underline hover:text-black transition-colors"
              >
                View More
              </Link>
            </section>
            <section>
              <h3 className="font-heading text-heading-md font-semibold text-neutral-700">
                {t('home.footer.localOffices')}
              </h3>
              <div className="mt-3 flex flex-col gap-2 font-nunito text-body-md font-semibold leading-relaxed text-neutral-600">
                <a 
                  href="https://baterino.ro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Romania
                </a>
                <a 
                  href="https://baterino.bg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Bulgaria
                </a>
                <a 
                  href="https://ltc-energy.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  China
                </a>
                <a 
                  href="https://baterino.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Indonesia
                </a>
              </div>
              <Link 
                to={`${base}/global-presence`}
                className="mt-3 inline-block font-body text-body-md text-neutral-900 underline hover:text-black transition-colors"
              >
                View More
              </Link>
            </section>
            <section>
              <h3 className="font-heading text-heading-md font-semibold text-neutral-700">
                {t('home.footer.globalContact')}
              </h3>
              <p className="mt-3 whitespace-pre-line font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.footer.globalContactDesc')}
              </p>
            </section>
            <section>
              <h3 className="font-heading text-heading-md font-semibold text-neutral-700">
                {t('home.footer.socialImpact')}
              </h3>
              <p className="mt-3 whitespace-pre-line font-body text-body-md leading-relaxed text-neutral-600">
                {t('home.footer.socialImpactDesc')}
              </p>
            </section>
          </div>
        </div>
      </section>
    </article>
  )
}
