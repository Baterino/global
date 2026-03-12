import { useTranslation } from 'react-i18next'
import { SeoHead } from './SeoHead'

interface PageLayoutProps {
  titleKey: string
  children: React.ReactNode
}

export function PageLayout({ titleKey, children }: PageLayoutProps) {
  const { t } = useTranslation()
  const title = t(titleKey)
  return (
    <>
      <SeoHead title={title} />
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
        <article className="space-y-6 sm:space-y-8">
          <header>
            <h1 className="text-heading-lg font-semibold uppercase tracking-tight text-neutral-900 dark:text-white sm:text-display-sm">
              {title}
            </h1>
          </header>
          <div className="text-body-md text-neutral-700 dark:text-neutral-300">{children}</div>
        </article>
      </div>
    </>
  )
}
