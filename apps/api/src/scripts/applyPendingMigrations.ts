/**
 * Applies migration files that are safe to re-run (e.g. ALTER ... IF NOT EXISTS),
 * without replaying 001_init (which fails on existing DBs when migrate runs all *.sql).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import { getPool, closePool } from '../db/pool.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../.env') })

const PENDING = ['002_article_keywords.sql']

async function main() {
  const pool = getPool()
  const dir = path.resolve(__dirname, '../../db/migrations')
  for (const file of PENDING) {
    const sqlPath = path.join(dir, file)
    if (!fs.existsSync(sqlPath)) {
      console.warn('Skip missing:', sqlPath)
      continue
    }
    const sql = fs.readFileSync(sqlPath, 'utf8')
    await pool.query(sql)
    console.log('Applied:', file)
  }
  await closePool()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
