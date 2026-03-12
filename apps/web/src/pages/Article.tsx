import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'

const ARTICLE_IDS = [
  'baterino-unveils-new-maritime-battery',
  'sustainable-shipping-future',
  'baterino-partnership-announcement',
  'electric-ferry-milestone',
  'green-maritime-technology',
  'baterino-team-expansion',
] as const

export function Article() {
  const { t } = useTranslation()
  const { locale, slug } = useParams<{ locale: string; slug: string }>()

  const articles = [
    {
      id: ARTICLE_IDS[0],
      title: t('insights.article1.title'),
      author: t('insights.article1.author'),
      date: t('insights.article1.date'),
      location: t('insights.article1.location'),
      category: t('insights.publicRelease'),
      image: '/images/article-1.jpg',
      content: `
        <p>Baterino's global platform is designed to grow through trusted local partnerships. In addition to our current footprint, we are open to working with:</p>
        
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        
        <h2>Key Highlights</h2>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        
        <ul>
          <li>Strategic partnerships across multiple regions</li>
          <li>Scalable energy storage solutions</li>
          <li>Long-term sustainability commitment</li>
          <li>Local expertise and global standards</li>
        </ul>
        
        <h2>Impact and Results</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      `,
    },
    {
      id: ARTICLE_IDS[1],
      title: t('insights.article2.title'),
      author: t('insights.article2.author'),
      date: t('insights.article2.date'),
      location: t('insights.article2.location'),
      category: t('insights.publicRelease'),
      image: '/images/article-2.jpg',
      content: `
        <p>This is the second article's content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        
        <h2>Overview</h2>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        
        <ul>
          <li>First key point</li>
          <li>Second key point</li>
          <li>Third key point</li>
        </ul>
      `,
    },
    {
      id: ARTICLE_IDS[2],
      title: t('insights.article3.title'),
      author: t('insights.article3.author'),
      date: t('insights.article3.date'),
      location: t('insights.article3.location'),
      category: t('insights.publicRelease'),
      image: '/images/article-3.jpg',
      content: `
        <p>This is the third article's content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        
        <h2>Introduction</h2>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        
        <ul>
          <li>Innovation in energy storage</li>
          <li>Sustainable development</li>
          <li>Global partnerships</li>
        </ul>
      `,
    },
    {
      id: ARTICLE_IDS[3],
      title: t('insights.article4.title', { defaultValue: 'Electric Ferry Milestone' }),
      author: t('insights.article1.author'),
      date: t('insights.article1.date'),
      location: t('insights.article1.location'),
      category: t('insights.publicRelease'),
      image: '/images/article-4.jpg',
      content: `<p>Baterino celebrates a major milestone in electric ferry deployment. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>`,
    },
    {
      id: ARTICLE_IDS[4],
      title: t('insights.article5.title', { defaultValue: 'Green Maritime Technology' }),
      author: t('insights.article1.author'),
      date: t('insights.article1.date'),
      location: t('insights.article1.location'),
      category: t('insights.publicRelease'),
      image: '/images/article-5.jpg',
      content: `<p>Exploring the latest in green maritime technology. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
    },
    {
      id: ARTICLE_IDS[5],
      title: t('insights.article6.title', { defaultValue: 'Baterino Team Expansion' }),
      author: t('insights.article1.author'),
      date: t('insights.article1.date'),
      location: t('insights.article1.location'),
      category: t('insights.publicRelease'),
      image: '/images/article-6.jpg',
      content: `<p>Baterino expands its team to support growing demand. Ut enim ad minim veniam, quis nostrud exercitation.</p>`,
    },
  ]

  const article = articles.find((a) => a.id === slug) || articles[0]

  return (
    <article className="w-full bg-white">
      {/* Article Header */}
      <section className="w-full bg-white px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px] text-center">
          <h1 className="mb-4 font-heading text-3xl font-bold uppercase tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mb-4 font-body text-body-md text-neutral-600">
            by {article.author}
          </p>
          <p className="font-body text-body-sm uppercase tracking-wide text-neutral-600">
            {article.category} - {article.location} - {article.date}
          </p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="w-full bg-white px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px]">
          <div className="overflow-hidden rounded-[10px]">
            <img
              src={article.image}
              alt={article.title}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="w-full bg-white px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px]">
          <div
            className="prose prose-neutral max-w-none font-body text-body-md leading-relaxed text-neutral-700 prose-headings:font-heading prose-headings:font-bold prose-headings:text-neutral-900 prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-2xl prose-p:mb-6 prose-ul:mb-6 prose-ul:ml-6 prose-ul:list-disc prose-li:mb-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* Back to Insights */}
      <section className="w-full bg-white px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px]">
          <Link
            to={`/${locale ?? 'en'}/company/insights`}
            className="inline-flex items-center gap-2 font-body text-body-md font-bold text-neutral-900 transition-colors hover:text-neutral-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t('insights.backToInsights')}
          </Link>
        </div>
      </section>
    </article>
  )
}
