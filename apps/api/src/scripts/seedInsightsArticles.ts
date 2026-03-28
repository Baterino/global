import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { getPool, closePool } from '../db/pool.js'
import { insightsFallbackBodies } from '../data/insightsFallbackBodies.js'
import {
  assertAllowedImageMime,
  isR2Configured,
  isR2PublicUrlMisconfiguredForBrowsers,
  mimeToExt,
  tryPublicUrlForKey,
  uploadPublicImage,
} from '../storage/r2.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../.env') })

/** Static site paths under `apps/web/public` used as fallbacks when R2 is not configured. */
const WEB_PUBLIC_ROOT = path.join(__dirname, '../../..', 'web', 'public')

function resolveLocalCoverPath(rel: string): string | null {
  const candidates = [
    path.join(WEB_PUBLIC_ROOT, rel),
    path.join(process.cwd(), 'apps/web/public', rel),
    path.join(process.cwd(), 'web/public', rel),
  ]
  for (const abs of candidates) {
    if (fs.existsSync(abs)) return abs
  }
  return null
}

const COVER_FILE: Record<keyof typeof insightsFallbackBodies, string> = {
  'global-delivery-framework': 'images/blog/global-delivery-framework.jpg',
  'baterino-roles-in-every-market': 'images/about-baterino.jpg',
  'request-to-operation': 'images/blog/how-baterino-assess-a-project.jpg',
}

function mimeFromFilePath(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  const map: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.avif': 'image/avif',
  }
  return map[ext] ?? 'image/jpeg'
}

type SeedRow = {
  slug: keyof typeof insightsFallbackBodies
  type: string
  title: string
  excerpt: string
  /** Public URL or site-relative path stored when R2 is off. */
  image_url: string
  location_label: string
  category_label: string
  author_name: string
  published_at: string
  /** Up to 4 keywords shown under hero on the public article. */
  keywords: string[]
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
    keywords: ['Infrastructure', 'Delivery', 'Global presence', 'Partnerships'],
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
    keywords: ['Market roles', 'EPC', 'Importer', 'After-sales'],
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
    keywords: ['Assessment', 'Divisions', 'Process', 'Lifecycle'],
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

  const r2 = isR2Configured()
  if (!r2) {
    console.warn(
      '[seed insights] R2 env vars not set; cover images stay as /images/… paths. Set R2_* and re-run to upload covers.',
    )
  } else if (isR2PublicUrlMisconfiguredForBrowsers()) {
    console.error(
      '[seed insights] R2_PUBLIC_URL is the S3 API host (*.r2.cloudflarestorage.com). Fix to https://pub-….r2.dev (bucket Public access) before R2 cover URLs will load on Vercel.',
    )
  }

  for (const row of ROWS) {
    const body_html = insightsFallbackBodies[row.slug]
    const { rows: out } = await pool.query<{ id: string }>(
      `INSERT INTO blog_articles (
        slug, type, title, excerpt, body_html, image_url, author_name, location_label, category_label,
        author_id, status, published_at, keywords
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::uuid,'published'::content_status,$11::timestamptz,$12)
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
        keywords = EXCLUDED.keywords,
        updated_at = now()
      RETURNING id`,
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
        row.keywords.slice(0, 4),
      ],
    )
    const articleId = out[0]?.id
    if (!articleId) {
      console.error('No id after upsert:', row.slug)
      continue
    }

    console.log('Upserted article:', row.slug)

    if (!r2) continue
    if (isR2PublicUrlMisconfiguredForBrowsers()) continue

    const rel = COVER_FILE[row.slug]
    const abs = resolveLocalCoverPath(rel)
    if (!abs) {
      console.warn(
        '[seed insights] local cover file missing (skip R2 upload). Tried apps/web/public from repo layout and cwd.',
        rel,
      )
      continue
    }

    try {
      const buffer = fs.readFileSync(abs)
      const mime = mimeFromFilePath(abs)
      assertAllowedImageMime(mime)
      const ext = mimeToExt(mime)
      const key = `articles/${articleId}/seed-cover.${ext}`
      await uploadPublicImage(key, buffer, mime)
      const url = tryPublicUrlForKey(key)
      if (!url) {
        console.error(
          '[seed insights] R2_PUBLIC_URL is wrong (use pub-*.r2.dev or custom domain, not *.r2.cloudflarestorage.com). Skipping DB update for',
          row.slug,
        )
        continue
      }
      await pool.query(`UPDATE blog_articles SET image_url = $1, updated_at = now() WHERE id = $2::uuid`, [
        url,
        articleId,
      ])
      console.log('[seed insights] R2 cover:', row.slug, '→', url)
    } catch (e) {
      console.error('[seed insights] R2 upload failed for', row.slug, e)
    }
  }

  await closePool()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
