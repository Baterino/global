import { Router, type Response } from 'express'
import { getPool } from '../db/pool.js'
import { verifyPassword } from '../auth/password.js'
import { signToken } from '../auth/jwt.js'
import type { AuthedRequest } from '../auth/middleware.js'
import { requireAuth } from '../auth/middleware.js'

export const adminAuthRouter = Router()

adminAuthRouter.post('/login', async (req, res: Response) => {
  const username = typeof req.body?.username === 'string' ? req.body.username.trim() : ''
  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  if (!username || !password) {
    res.status(400).json({ ok: false, code: 'credentials_required' })
    return
  }
  try {
    const pool = getPool()
    const { rows } = await pool.query<{ id: string; password_hash: string; role: string; username: string }>(
      `SELECT id, username, password_hash, role::text AS role FROM users WHERE username = $1`,
      [username]
    )
    const row = rows[0]
    if (!row || !(await verifyPassword(password, row.password_hash))) {
      res.status(401).json({ ok: false, code: 'invalid_credentials' })
      return
    }
    const token = signToken({
      sub: row.id,
      username: row.username,
      role: row.role as 'admin' | 'contributor',
    })
    res.json({
      ok: true,
      token,
      user: { id: row.id, username: row.username, role: row.role },
    })
  } catch (e) {
    console.error('[admin/login]', e)
    res.status(503).json({ ok: false, code: 'database_unavailable' })
  }
})

adminAuthRouter.get('/me', requireAuth, (req: AuthedRequest, res: Response) => {
  const u = req.user!
  res.json({
    ok: true,
    user: { id: u.sub, username: u.username, role: u.role },
  })
})
