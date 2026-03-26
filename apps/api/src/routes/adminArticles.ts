import { Router, type Response } from 'express'
import { getPool } from '../db/pool.js'
import type { AuthedRequest } from '../auth/middleware.js'
import { requireAuth, canDeleteArticle } from '../auth/middleware.js'
import { publicImageUrlForResponse, rewriteBodyHtmlR2ApiUrls } from '../storage/r2.js'

export const adminArticlesRouter = Router()
adminArticlesRouter.use(requireAuth)

const ALLOWED_TYPES = new Set(['company', 'press-release', 'use-cases', 'news'])

function slugifyForArticle(input: string): string {
  const t = input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
  const slug = t
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200)
  return slug
}

async function allocateUniqueSlug(pool: ReturnType<typeof getPool>, base: string): Promise<string> {
  let slug = base || 'article'
  let n = 0
  for (;;) {
    const { rows } = await pool.query<{ id: string }>(
      `SELECT id FROM blog_articles WHERE slug = $1 LIMIT 1`,
      [slug]
    )
    if (!rows.length) return slug
    n += 1
    slug = `${base || 'article'}-${n}`
  }
}

adminArticlesRouter.get('/', async (_req: AuthedRequest, res: Response) => {
  try {
    const pool = getPool()
    const { rows } = await pool.query(
      `SELECT id, slug, type, title, excerpt, image_url, status::text AS status, published_at, author_id, created_at, updated_at
       FROM blog_articles ORDER BY updated_at DESC`
    )
    res.json({ ok: true, articles: rows })
  } catch (e) {
    console.error('[admin/articles list]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

adminArticlesRouter.get('/:id', async (req: AuthedRequest, res: Response) => {
  try {
    const pool = getPool()
    const { rows } = await pool.query(
      `SELECT id, slug, type, title, excerpt, body_html, image_url, author_name, location_label, category_label,
              status::text AS status, published_at, author_id, created_at, updated_at
       FROM blog_articles WHERE id = $1`,
      [req.params.id]
    )
    const row = rows[0]
    if (!row) {
      res.status(404).json({ ok: false, code: 'not_found' })
      return
    }
    res.json({
      ok: true,
      article: {
        ...row,
        image_url: publicImageUrlForResponse(row.image_url),
        body_html: rewriteBodyHtmlR2ApiUrls(row.body_html),
      },
    })
  } catch (e) {
    console.error('[admin/articles get]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

adminArticlesRouter.post('/', async (req: AuthedRequest, res: Response) => {
  const rawSlug = typeof req.body?.slug === 'string' ? req.body.slug.trim() : ''
  const type = typeof req.body?.type === 'string' ? req.body.type : 'company'
  const title = typeof req.body?.title === 'string' ? req.body.title.trim() : ''
  const excerpt = typeof req.body?.excerpt === 'string' ? req.body.excerpt : ''
  const body_html = typeof req.body?.body_html === 'string' ? req.body.body_html : ''
  const image_url = typeof req.body?.image_url === 'string' ? req.body.image_url.trim() : ''
  const author_name = typeof req.body?.author_name === 'string' ? req.body.author_name.trim() : 'Baterino'
  const location_label = typeof req.body?.location_label === 'string' ? req.body.location_label.trim() : ''
  const category_label = typeof req.body?.category_label === 'string' ? req.body.category_label.trim() : ''
  const status = req.body?.status === 'published' ? 'published' : 'draft'

  if (!title) {
    res.status(400).json({ ok: false, code: 'slug_title_required' })
    return
  }
  if (!ALLOWED_TYPES.has(type)) {
    res.status(400).json({ ok: false, code: 'invalid_type' })
    return
  }

  const published_at = status === 'published' ? new Date().toISOString() : null

  try {
    const pool = getPool()
    const baseSlug = rawSlug ? slugifyForArticle(rawSlug) : slugifyForArticle(title)
    if (!baseSlug) {
      res.status(400).json({ ok: false, code: 'slug_title_required' })
      return
    }
    const slug = await allocateUniqueSlug(pool, baseSlug)
    const { rows } = await pool.query<{ id: string }>(
      `INSERT INTO blog_articles (
        slug, type, title, excerpt, body_html, image_url, author_name, location_label, category_label,
        author_id, status, published_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::uuid,$11::content_status,$12)
      RETURNING id`,
      [
        slug,
        type,
        title,
        excerpt,
        body_html,
        image_url,
        author_name,
        location_label,
        category_label,
        req.user!.sub,
        status,
        published_at,
      ]
    )
    res.status(201).json({ ok: true, id: rows[0].id })
  } catch (e: unknown) {
    const err = e as { code?: string }
    if (err.code === '23505') {
      res.status(409).json({ ok: false, code: 'slug_taken' })
      return
    }
    console.error('[admin/articles POST]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

adminArticlesRouter.patch('/:id', async (req: AuthedRequest, res: Response) => {
  const id = req.params.id
  const fields: string[] = []
  const values: unknown[] = []
  let i = 1

  const set = (col: string, val: unknown) => {
    fields.push(`${col} = $${i++}`)
    values.push(val)
  }

  if (typeof req.body?.slug === 'string') set('slug', req.body.slug.trim().toLowerCase().replace(/\s+/g, '-'))
  if (typeof req.body?.type === 'string' && ALLOWED_TYPES.has(req.body.type)) set('type', req.body.type)
  if (typeof req.body?.title === 'string') set('title', req.body.title.trim())
  if (typeof req.body?.excerpt === 'string') set('excerpt', req.body.excerpt)
  if (typeof req.body?.body_html === 'string') set('body_html', req.body.body_html)
  if (typeof req.body?.image_url === 'string') set('image_url', req.body.image_url.trim())
  if (typeof req.body?.author_name === 'string') set('author_name', req.body.author_name.trim())
  if (typeof req.body?.location_label === 'string') set('location_label', req.body.location_label.trim())
  if (typeof req.body?.category_label === 'string') set('category_label', req.body.category_label.trim())
  if (req.body?.status === 'published' || req.body?.status === 'draft') {
    set('status', req.body.status)
    if (req.body.status === 'published') {
      set('published_at', new Date().toISOString())
    } else {
      set('published_at', null)
    }
  }

  if (!fields.length) {
    res.status(400).json({ ok: false, code: 'no_updates' })
    return
  }

  fields.push(`updated_at = now()`)
  values.push(id)

  try {
    const pool = getPool()
    const q = `UPDATE blog_articles SET ${fields.join(', ')} WHERE id = $${i}`
    const { rowCount } = await pool.query(q, values)
    if (!rowCount) {
      res.status(404).json({ ok: false, code: 'not_found' })
      return
    }
    res.json({ ok: true })
  } catch (e: unknown) {
    const err = e as { code?: string }
    if (err.code === '23505') {
      res.status(409).json({ ok: false, code: 'slug_taken' })
      return
    }
    console.error('[admin/articles PATCH]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

adminArticlesRouter.delete('/:id', async (req: AuthedRequest, res: Response) => {
  try {
    const pool = getPool()
    const { rows } = await pool.query<{ author_id: string | null }>(
      `SELECT author_id FROM blog_articles WHERE id = $1`,
      [req.params.id]
    )
    const row = rows[0]
    if (!row) {
      res.status(404).json({ ok: false, code: 'not_found' })
      return
    }
    const allowed = canDeleteArticle(req.user, row.author_id)
    if (!allowed) {
      res.status(403).json({ ok: false, code: 'forbidden' })
      return
    }
    await pool.query(`DELETE FROM blog_articles WHERE id = $1`, [req.params.id])
    res.json({ ok: true })
  } catch (e) {
    console.error('[admin/articles DELETE]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})
