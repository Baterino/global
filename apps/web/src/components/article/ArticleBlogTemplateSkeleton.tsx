const bar = 'animate-pulse rounded-md bg-neutral-200'
const block = 'animate-pulse rounded-2xl bg-neutral-200'

/**
 * Placeholder layout while article data or route is loading — matches ArticleBlogTemplate structure.
 */
export function ArticleBlogTemplateSkeleton() {
  return (
    <>
      <section
        className="w-full bg-white px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-8"
        aria-busy="true"
        aria-label="Loading article"
      >
        <div className="mx-auto w-full max-w-[900px]">
          <div className={`relative h-[400px] w-full overflow-hidden ${block}`} />
          <div className="mt-4 flex w-full flex-wrap gap-2 sm:mt-5" aria-hidden>
            <div className="h-7 w-24 animate-pulse rounded-full bg-neutral-200" />
            <div className="h-7 w-28 animate-pulse rounded-full bg-neutral-200" />
            <div className="h-7 w-20 animate-pulse rounded-full bg-neutral-200" />
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px] space-y-3">
          <div className={`h-5 w-4/5 max-w-2xl ${bar}`} />
          <div className={`h-4 w-full ${bar}`} />
          <div className={`h-4 w-full ${bar}`} />
          <div className={`h-4 w-[92%] ${bar}`} />
          <div className={`h-4 w-full ${bar}`} />
          <div className={`mt-6 h-36 w-full ${bar}`} />
          <div className={`h-4 w-3/4 ${bar}`} />
          <div className={`h-4 w-full ${bar}`} />
        </div>
      </section>

      <footer className="w-full bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[900px] grid-cols-1 items-center gap-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
          <div className={`mx-auto h-7 w-40 sm:mx-0 ${bar}`} />
          <div className={`mx-auto h-11 w-[min(100%,20rem)] justify-self-center ${bar}`} />
          <div className={`mx-auto h-11 w-32 justify-self-center sm:mx-0 sm:justify-self-end ${bar}`} />
        </div>
      </footer>
    </>
  )
}
