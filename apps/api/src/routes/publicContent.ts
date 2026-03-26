import { Router, type Response } from 'express'
import { getPool } from '../db/pool.js'
import { publicImageUrlForResponse, rewriteBodyHtmlR2ApiUrls } from '../storage/r2.js'

export const publicContentRouter = Router()

publicContentRouter.get('/articles', async (_req, res: Response) => {
  try {
    const pool = getPool()
    const { rows } = await pool.query(
      `SELECT id, slug, type, title, excerpt, image_url, author_name, location_label, category_label, published_at
       FROM blog_articles
       WHERE status = 'published'
       ORDER BY published_at DESC NULLS LAST, updated_at DESC`
    )
    const articles = rows.map((row) => ({
      ...row,
      image_url: publicImageUrlForResponse(row.image_url),
    }))
    res.json({ ok: true, articles })
  } catch (e) {
    console.error('[public/articles]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

publicContentRouter.get('/articles/slug/:slug', async (req, res: Response) => {
  const slug = req.params.slug?.toLowerCase()
  if (!slug) {
    res.status(400).json({ ok: false, code: 'invalid_slug' })
    return
  }
  try {
    const pool = getPool()
    const { rows } = await pool.query(
      `SELECT id, slug, type, title, excerpt, body_html, image_url, author_name, location_label, category_label, published_at
       FROM blog_articles WHERE slug = $1 AND status = 'published'`,
      [slug]
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
    console.error('[public/articles/slug]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

publicContentRouter.get('/use-cases', async (_req, res: Response) => {
  try {
    const pool = getPool()
    const { rows } = await pool.query(
      `SELECT project_id, sector, install_type, solar, search_loc, title, location, specs, use_tags, images
       FROM use_case_projects WHERE status = 'published' ORDER BY updated_at DESC`
    )
    const asImg = (x: unknown): string[] => {
      if (Array.isArray(x)) return x.filter((v): v is string => typeof v === 'string')
      if (typeof x === 'string') {
        try {
          const p = JSON.parse(x) as unknown
          return Array.isArray(p) ? p.filter((v): v is string => typeof v === 'string') : []
        } catch {
          return []
        }
      }
      return []
    }
    const projects = rows.map((r) => ({
      id: r.project_id,
      sector: r.sector,
      type: r.install_type,
      solar: r.solar,
      loc: r.search_loc,
      title: r.title,
      location: r.location,
      specs: r.specs && typeof r.specs === 'object' && !Array.isArray(r.specs) ? r.specs : {},
      useTags: Array.isArray(r.use_tags)
        ? r.use_tags.filter((v: unknown): v is string => typeof v === 'string')
        : [],
      images: asImg(r.images).map((url) => publicImageUrlForResponse(url)),
    }))
    res.json({ ok: true, projects })
  } catch (e) {
    console.error('[public/use-cases]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})
