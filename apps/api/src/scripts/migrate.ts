import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPool, closePool } from '../db/pool.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const pool = getPool()
  const sqlPath = path.resolve(__dirname, '../../db/migrations/001_init.sql')
  const sql = fs.readFileSync(sqlPath, 'utf8')
  await pool.query(sql)
  console.log('Migration applied:', sqlPath)
  await closePool()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
