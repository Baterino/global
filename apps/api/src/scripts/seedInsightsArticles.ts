import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { getPool, closePool } from '../db/pool.js'
import { insightsFallbackBodies } from '../data/insightsFallbackBodies.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../.env') })

type SeedRow = {
  slug: keyof typeof insightsFallbackBodies
  type: string
  title: string
  excerpt: string
  image_url: string
  location_label: string
  category_label: string
  author_name: string
  published_at: string
}

const ROWS: SeedRow[] = [
  {
    slug: 'global-delivery-framework',
    type: 'company',
    title: "Where We Operate: Inside Baterino's Global Delivery Framework",
    excerpt:
      "A transparent look at how Baterino's delivery model works, where we operate, and what makes our approach different from a traditional equipment supplier.",
    image_url: '/images/blog/global-delivery-framework.jpg',
    location_label: 'Jakarta',
    category_label: 'insights.filters.company',
    author_name: 'Baterino Team',
    published_at: '2026-03-01T12:00:00.000Z',
  },
  {
    slug: 'baterino-roles-in-every-market',
    type: 'company',
    title: 'More Than an EPC: Understanding the Roles Baterino Plays in Each Market',
    excerpt:
      'Baterino was built to adapt. Depending on the market, we act as importer, distributor, after-sales provider, or enabler — sometimes all four at once.',
    image_url: '/images/about-baterino.jpg',
    location_label: 'Bucharest',
    category_label: 'insights.filters.company',
    author_name: 'Baterino Team',
    published_at: '2026-03-15T12:00:00.000Z',
  },
  {
    slug: 'request-to-operation',
    type: 'company',
    title: 'From Request to Operation: How Baterino Assesses and Delivers Energy Projects',
    excerpt:
      'A look inside our project intake process, four specialist divisions, and how energy storage projects move from first contact to long-term operation.',
    image_url: '/images/blog/how-baterino-assess-a-project.jpg',
    location_label: 'Bucharest',
    category_label: 'insights.filters.company',
    author_name: 'Baterino Team',
    published_at: '2026-03-20T12:00:00.000Z',
  },
]

async function main() {
  const pool = getPool()
  const { rows: authors } = await pool.query<{ id: string }>(
    `SELECT id FROM users WHERE role = 'admin'::user_role ORDER BY created_at ASC LIMIT 1`,
  )
  const authorId = authors[0]?.id ?? null
  if (!authorId) {
    console.error('No admin user found. Run: pnpm --filter api db:seed')
    await closePool()
    process.exit(1)
  }

  for (const row of ROWS) {
    const body_html = insightsFallbackBodies[row.slug]
    await pool.query(
      `INSERT INTO blog_articles (
        slug, type, title, excerpt, body_html, image_url, author_name, location_label, category_label,
        author_id, status, published_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::uuid,'published'::content_status,$11::timestamptz)
      ON CONFLICT (slug) DO UPDATE SET
        type = EXCLUDED.type,
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        body_html = EXCLUDED.body_html,
        image_url = EXCLUDED.image_url,
        author_name = EXCLUDED.author_name,
        location_label = EXCLUDED.location_label,
        category_label = EXCLUDED.category_label,
        author_id = EXCLUDED.author_id,
        status = EXCLUDED.status,
        published_at = EXCLUDED.published_at,
        updated_at = now()`,
      [
        row.slug,
        row.type,
        row.title,
        row.excerpt,
        body_html,
        row.image_url,
        row.author_name,
        row.location_label,
        row.category_label,
        authorId,
        row.published_at,
      ],
    )
    console.log('Upserted article:', row.slug)
  }

  await closePool()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
