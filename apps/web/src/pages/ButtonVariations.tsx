import { Helmet } from 'react-helmet-async'
import { ArrowRightIcon } from '../components/ArrowRightIcon'

const VARIANTS = [
  {
    name: 'Primary rounded-lg — filled',
    desc: 'Dark navy bg, white text, uppercase',
    className: 'inline-flex items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-[#0B0726] px-6 py-2.5 font-body text-body-md font-semibold uppercase tracking-wide text-white transition-colors hover:border-[#0B0726] hover:bg-white hover:text-black',
  },
  {
    name: 'Primary rounded-lg — outline',
    desc: 'Border only, white bg on hover',
    className: 'inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#0B0726] bg-transparent px-6 py-2.5 font-body text-body-md font-semibold uppercase tracking-wide text-[#0B0726] transition-colors hover:bg-white hover:text-black',
  },
  {
    name: 'Primary rounded-lg — small',
    desc: 'Reduced padding',
    className: 'inline-flex items-center justify-center gap-1.5 rounded-lg border-2 border-transparent bg-[#0B0726] px-4 py-1.5 font-body text-body-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-[#0B0726] hover:bg-white hover:text-black',
  },
  {
    name: 'Primary rounded-lg — large',
    desc: 'More padding',
    className: 'inline-flex items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-[#0B0726] px-8 py-3 font-body text-body-lg font-semibold uppercase tracking-wide text-white transition-colors hover:border-[#0B0726] hover:bg-white hover:text-black',
  },
  {
    name: 'Underline link style',
    desc: 'Text with underline, no box',
    className: 'inline-flex items-center gap-2 font-body text-body-md font-medium text-[#0B0726] underline underline-offset-2 transition-colors hover:text-[#323671]',
  },
]

export function ButtonVariations() {
  return (
    <>
      <Helmet>
        <title>Button Variations | Baterino Design</title>
      </Helmet>
      <article className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[900px]">
          <h1 className="font-heading text-2xl font-bold uppercase tracking-tight text-neutral-900 sm:text-3xl">
            Button Variations
          </h1>
          <p className="mt-3 font-body text-body-md leading-relaxed text-neutral-600">
            A playground to compare and refine button styles.
          </p>

          <div className="mt-12 space-y-12">
            {VARIANTS.map((v, i) => (
              <section key={i} className="border-b border-neutral-200 pb-12 last:border-0">
                <h2 className="font-heading text-heading-sm font-bold text-neutral-900">{v.name}</h2>
                <p className="mt-1 font-body text-body-sm text-neutral-500">{v.desc}</p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <button type="button" className={v.className}>
                    See more
                    <ArrowRightIcon className="h-4 w-4 shrink-0" />
                  </button>
                  <button type="button" className={v.className}>
                    Learn more
                  </button>
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  )
}
