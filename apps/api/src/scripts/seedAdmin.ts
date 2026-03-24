import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { getPool, closePool } from '../db/pool.js'

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '../../.env') })
import { hashPassword } from '../auth/password.js'

/**
 * Creates or updates the initial admin user from env:
 * ADMIN_USERNAME (default: ADMIN_EMAIL or "admin")
 * ADMIN_PASSWORD (required)
 */
async function main() {
  const username =
    process.env.ADMIN_USERNAME?.trim() ||
    process.env.ADMIN_EMAIL?.trim() ||
    'admin'
  const password = process.env.ADMIN_PASSWORD?.trim()
  if (!password || password.length < 8) {
    console.error('ADMIN_PASSWORD must be set and at least 8 characters.')
    process.exit(1)
  }

  const pool = getPool()
  const password_hash = await hashPassword(password)
  await pool.query(
    `INSERT INTO users (username, password_hash, role)
     VALUES ($1, $2, 'admin'::user_role)
     ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = 'admin'::user_role`,
    [username, password_hash]
  )
  console.log('Seeded admin user:', username)
  await closePool()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
