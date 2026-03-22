import { Router, type Response } from 'express'
import { getPool } from '../db/pool.js'
import type { AuthedRequest } from '../auth/middleware.js'
import { requireAuth, canDeleteUseCase } from '../auth/middleware.js'

export const adminUseCasesRouter = Router()
adminUseCasesRouter.use(requireAuth)

const SECTORS = new Set(['industrial', 'maritime', 'offgrid'])
const INSTALL = new Set(['cabinet', 'container', 'rack', 'marine'])

function parseJson<T>(raw: unknown, fallback: T): T {
  if (raw && typeof raw === 'object' && !Array.isArray(raw)) return raw as T
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as T
    } catch {
      return fallback
    }
  }
  return fallback
}

adminUseCasesRouter.get('/', async (_req: AuthedRequest, res: Response) => {
  try {
    const pool = getPool()
    const { rows } = await pool.query(
      `SELECT project_id, sector, install_type, solar, search_loc, title, location, specs, use_tags, images,
              status::text AS status, author_id, created_at, updated_at
       FROM use_case_projects ORDER BY updated_at DESC`
    )
    res.json({ ok: true, projects: rows })
  } catch (e) {
    console.error('[admin/use-cases list]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

adminUseCasesRouter.get('/:projectId', async (req: AuthedRequest, res: Response) => {
  try {
    const pool = getPool()
    const { rows } = await pool.query(
      `SELECT project_id, sector, install_type, solar, search_loc, title, location, specs, use_tags, images,
              status::text AS status, author_id, created_at, updated_at
       FROM use_case_projects WHERE project_id = $1`,
      [req.params.projectId]
    )
    const row = rows[0]
    if (!row) {
      res.status(404).json({ ok: false, code: 'not_found' })
      return
    }
    res.json({ ok: true, project: row })
  } catch (e) {
    console.error('[admin/use-cases get]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

adminUseCasesRouter.post('/', async (req: AuthedRequest, res: Response) => {
  const project_id = typeof req.body?.project_id === 'string' ? req.body.project_id.trim() : ''
  const sector = typeof req.body?.sector === 'string' ? req.body.sector : ''
  const install_type = typeof req.body?.install_type === 'string' ? req.body.install_type : ''
  const title = typeof req.body?.title === 'string' ? req.body.title.trim() : ''
  const location = typeof req.body?.location === 'string' ? req.body.location.trim() : ''
  const search_loc = typeof req.body?.search_loc === 'string' ? req.body.search_loc.trim() : ''
  const solar = Boolean(req.body?.solar)
  const specs = parseJson<Record<string, unknown>>(req.body?.specs, {})
  const use_tags = Array.isArray(req.body?.use_tags)
    ? req.body.use_tags.filter((x: unknown) => typeof x === 'string')
    : typeof req.body?.use_tags === 'string'
      ? req.body.use_tags
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
      : []
  const images = Array.isArray(req.body?.images)
    ? req.body.images.filter((x: unknown) => typeof x === 'string')
    : parseJson<string[]>(req.body?.images, [])
  const status = req.body?.status === 'published' ? 'published' : 'draft'

  if (!project_id || !title || !location) {
    res.status(400).json({ ok: false, code: 'required_fields' })
    return
  }
  if (!SECTORS.has(sector) || !INSTALL.has(install_type)) {
    res.status(400).json({ ok: false, code: 'invalid_sector_or_type' })
    return
  }

  try {
    const pool = getPool()
    await pool.query(
      `INSERT INTO use_case_projects (
        project_id, sector, install_type, solar, search_loc, title, location, specs, use_tags, images, author_id, status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10::jsonb,$11::uuid,$12::content_status)`,
      [
        project_id,
        sector,
        install_type,
        solar,
        search_loc || location.toLowerCase(),
        title,
        location,
        JSON.stringify(specs),
        use_tags,
        JSON.stringify(images),
        req.user!.sub,
        status,
      ]
    )
    res.status(201).json({ ok: true, project_id })
  } catch (e: unknown) {
    const err = e as { code?: string }
    if (err.code === '23505') {
      res.status(409).json({ ok: false, code: 'project_id_taken' })
      return
    }
    console.error('[admin/use-cases POST]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

adminUseCasesRouter.patch('/:projectId', async (req: AuthedRequest, res: Response) => {
  const projectId = req.params.projectId
  const fields: string[] = []
  const values: unknown[] = []
  let i = 1
  const set = (col: string, val: unknown) => {
    fields.push(`${col} = $${i++}`)
    values.push(val)
  }

  if (typeof req.body?.sector === 'string' && SECTORS.has(req.body.sector)) set('sector', req.body.sector)
  if (typeof req.body?.install_type === 'string' && INSTALL.has(req.body.install_type)) set('install_type', req.body.install_type)
  if (typeof req.body?.title === 'string') set('title', req.body.title.trim())
  if (typeof req.body?.location === 'string') set('location', req.body.location.trim())
  if (typeof req.body?.search_loc === 'string') set('search_loc', req.body.search_loc.trim())
  if (typeof req.body?.solar === 'boolean') set('solar', req.body.solar)
  if (req.body?.specs !== undefined) set('specs', JSON.stringify(parseJson(req.body.specs, {})))
  if (req.body?.use_tags !== undefined) {
    const tags = Array.isArray(req.body.use_tags)
      ? req.body.use_tags.filter((x: unknown) => typeof x === 'string')
      : String(req.body.use_tags)
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
    set('use_tags', tags)
  }
  if (req.body?.images !== undefined) {
    const imgs = Array.isArray(req.body.images)
      ? req.body.images.filter((x: unknown) => typeof x === 'string')
      : parseJson<string[]>(req.body.images, [])
    set('images', JSON.stringify(imgs))
  }
  if (req.body?.status === 'published' || req.body?.status === 'draft') {
    set('status', req.body.status)
  }

  if (!fields.length) {
    res.status(400).json({ ok: false, code: 'no_updates' })
    return
  }
  fields.push(`updated_at = now()`)
  values.push(projectId)

  try {
    const pool = getPool()
    const q = `UPDATE use_case_projects SET ${fields.join(', ')} WHERE project_id = $${i}`
    const { rowCount } = await pool.query(q, values)
    if (!rowCount) {
      res.status(404).json({ ok: false, code: 'not_found' })
      return
    }
    res.json({ ok: true })
  } catch (e) {
    console.error('[admin/use-cases PATCH]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

adminUseCasesRouter.delete('/:projectId', async (req: AuthedRequest, res: Response) => {
  try {
    const pool = getPool()
    const { rows } = await pool.query<{ author_id: string | null }>(
      `SELECT author_id FROM use_case_projects WHERE project_id = $1`,
      [req.params.projectId]
    )
    const row = rows[0]
    if (!row) {
      res.status(404).json({ ok: false, code: 'not_found' })
      return
    }
    if (!canDeleteUseCase(req.user, row.author_id)) {
      res.status(403).json({ ok: false, code: 'forbidden' })
      return
    }
    await pool.query(`DELETE FROM use_case_projects WHERE project_id = $1`, [req.params.projectId])
    res.json({ ok: true })
  } catch (e) {
    console.error('[admin/use-cases DELETE]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})
