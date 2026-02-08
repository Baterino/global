import { Hero } from '../components/home/Hero'
import { ImpactSlider } from '../components/home/ImpactSlider'
import { WhatWeDoSlider } from '../components/about/WhatWeDoSlider'
import { DeliveryFrameworkSlider } from '../components/delivery/DeliveryFrameworkSlider'
import { MaritimeDeliverySlider } from '../components/maritime/MaritimeDeliverySlider'

export function Sliders() {
  return (
    <article className="w-full bg-white">
      {/* Page Header */}
      <section className="w-full bg-neutral-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px] text-center">
          <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Sliders Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] font-body text-body-md leading-relaxed text-neutral-600">
            A collection of all slider components used across the Baterino website.
          </p>
        </div>
      </section>

      {/* Hero Slider */}
      <section className="w-full bg-white py-12">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900">
            Hero Slider
          </h2>
          <p className="mb-8 font-body text-body-md text-neutral-600">
            Used on the Home page hero section to showcase key messaging and solutions.
          </p>
        </div>
        <Hero />
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-neutral-200" />
      </div>

      {/* Impact Slider */}
      <section className="w-full bg-white py-12">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900">
            Impact Slider
          </h2>
          <p className="mb-8 font-body text-body-md text-neutral-600">
            Used on the Home page to showcase global impact initiatives.
          </p>
        </div>
        <ImpactSlider />
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-neutral-200" />
      </div>

      {/* What We Do Slider */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-2 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900">
            What We Do Slider
          </h2>
          <p className="mb-8 font-body text-body-md text-neutral-600">
            Used on the About Baterino page to showcase services and capabilities.
          </p>
          <WhatWeDoSlider />
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-neutral-200" />
      </div>

      {/* Delivery Framework Slider */}
      <section className="w-full bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="mb-2 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900">
            Delivery Framework Slider
          </h2>
          <p className="mb-8 font-body text-body-md text-neutral-600">
            Used on the Delivery page to showcase the delivery process steps.
          </p>
          <DeliveryFrameworkSlider />
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-neutral-200" />
      </div>

      {/* Maritime Delivery Slider */}
      <section className="w-full bg-white py-12">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900">
            Maritime Delivery Slider
          </h2>
          <p className="mb-8 font-body text-body-md text-neutral-600">
            Used on the Maritime Solutions page to showcase maritime delivery process.
          </p>
        </div>
        <MaritimeDeliverySlider />
      </section>
    </article>
  )
}
