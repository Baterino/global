import { Router, type Response } from 'express'
import { getPool } from '../db/pool.js'
import { hashPassword } from '../auth/password.js'
import type { AuthedRequest } from '../auth/middleware.js'
import { requireAuth, requireAdmin } from '../auth/middleware.js'

export const adminUsersRouter = Router()

adminUsersRouter.use(requireAuth, requireAdmin)

adminUsersRouter.get('/', async (_req: AuthedRequest, res: Response) => {
  try {
    const pool = getPool()
    const { rows } = await pool.query(
      `SELECT id, username, role::text AS role, created_at FROM users ORDER BY created_at ASC`
    )
    res.json({ ok: true, users: rows })
  } catch (e) {
    console.error('[admin/users]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

adminUsersRouter.post('/', async (req: AuthedRequest, res: Response) => {
  const username = typeof req.body?.username === 'string' ? req.body.username.trim() : ''
  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  const role = req.body?.role === 'admin' || req.body?.role === 'contributor' ? req.body.role : null
  if (!username || username.length < 2) {
    res.status(400).json({ ok: false, code: 'invalid_username' })
    return
  }
  if (!password || password.length < 8) {
    res.status(400).json({ ok: false, code: 'password_too_short' })
    return
  }
  if (!role) {
    res.status(400).json({ ok: false, code: 'invalid_role' })
    return
  }
  try {
    const pool = getPool()
    const password_hash = await hashPassword(password)
    const { rows } = await pool.query<{ id: string }>(
      `INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3::user_role) RETURNING id`,
      [username, password_hash, role]
    )
    res.status(201).json({ ok: true, id: rows[0].id })
  } catch (e: unknown) {
    const err = e as { code?: string }
    if (err.code === '23505') {
      res.status(409).json({ ok: false, code: 'username_taken' })
      return
    }
    console.error('[admin/users POST]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

adminUsersRouter.patch('/:id', async (req: AuthedRequest, res: Response) => {
  const id = req.params.id
  const role = req.body?.role === 'admin' || req.body?.role === 'contributor' ? req.body.role : null
  if (!role) {
    res.status(400).json({ ok: false, code: 'invalid_role' })
    return
  }
  try {
    const pool = getPool()
    const { rowCount } = await pool.query(`UPDATE users SET role = $2::user_role WHERE id = $1`, [id, role])
    if (!rowCount) {
      res.status(404).json({ ok: false, code: 'not_found' })
      return
    }
    res.json({ ok: true })
  } catch (e) {
    console.error('[admin/users PATCH]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})

adminUsersRouter.delete('/:id', async (req: AuthedRequest, res: Response) => {
  const id = req.params.id
  if (id === req.user!.sub) {
    res.status(400).json({ ok: false, code: 'cannot_delete_self' })
    return
  }
  try {
    const pool = getPool()
    const { rowCount } = await pool.query(`DELETE FROM users WHERE id = $1`, [id])
    if (!rowCount) {
      res.status(404).json({ ok: false, code: 'not_found' })
      return
    }
    res.json({ ok: true })
  } catch (e) {
    console.error('[admin/users DELETE]', e)
    res.status(503).json({ ok: false, code: 'database_error' })
  }
})
