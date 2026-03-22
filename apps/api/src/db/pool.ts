import pg from 'pg'

let pool: pg.Pool | null = null

export function getPool(): pg.Pool {
  const url = process.env.DATABASE_URL
  if (!url?.trim()) {
    throw new Error('DATABASE_URL is not set')
  }
  if (!pool) {
    pool = new pg.Pool({
      connectionString: url,
      max: 10,
      idleTimeoutMillis: 30_000,
    })
  }
  return pool
}

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim())
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
  }
}
