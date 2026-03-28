/**
 * Uploads apps/web/public/images/** to Cloudflare R2 with keys images/<relative-path>.
 * Matches site URLs (/images/...) once VITE_ASSET_BASE_URL points at this bucket’s public origin.
 *
 * Prerequisites (apps/api/.env):
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY
 * Optional dedicated bucket for /images (recommended if API media lives in another bucket):
 *   R2_IMAGES_BUCKET_NAME
 *   R2_IMAGES_PUBLIC_URL   (https://pub-….r2.dev or https://cdn.example.com)
 *   If that bucket uses a different Cloudflare API token:
 *     R2_IMAGES_ACCESS_KEY_ID, R2_IMAGES_SECRET_ACCESS_KEY
 *     Optional: R2_IMAGES_ACCOUNT_ID (defaults to R2_ACCOUNT_ID)
 * Fallback when R2_IMAGES_* bucket/Public URL unset: R2_BUCKET_NAME + R2_PUBLIC_URL (same as API media)
 *
 * Run: pnpm --filter api sync:public-images
 * Dry run: pnpm --filter api sync:public-images --dry-run
 */
import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import {
  isR2PublicUrlS3ApiEndpoint,
  putPublicObject,
  shouldUseR2ImagesCredentialsForBucket,
} from '../storage/r2.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../.env') })

const IMAGES_DIR = path.join(__dirname, '../../../web/public/images')
const KEY_PREFIX = 'images'

function normalizeScalarEnv(v: string | undefined): string {
  if (v == null) return ''
  let s = v.trim()
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim()
  }
  return s
}

function imagesBucketName(): string {
  return (
    normalizeScalarEnv(process.env.R2_IMAGES_BUCKET_NAME) ||
    normalizeScalarEnv(process.env.R2_BUCKET_NAME) ||
    normalizeScalarEnv(process.env.R2_BUCKET) ||
    ''
  ).toLowerCase()
}

function imagesPublicBase(): string {
  const base =
    normalizeScalarEnv(process.env.R2_IMAGES_PUBLIC_URL) ||
    normalizeScalarEnv(process.env.R2_PUBLIC_URL)
  return base.replace(/\/+$/, '')
}

function extToMime(ext: string): string | null {
  const e = ext.toLowerCase()
  const map: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.avif': 'image/avif',
    '.svg': 'image/svg+xml',
  }
  return map[e] ?? null
}

async function collectFiles(dir: string, out: string[]): Promise<void> {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    if (ent.name.startsWith('.')) continue
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      await collectFiles(full, out)
    } else if (ent.isFile()) {
      out.push(full)
    }
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const bucket = imagesBucketName()
  const pubBase = imagesPublicBase()
  const useImagesCreds = shouldUseR2ImagesCredentialsForBucket(bucket)
  const accountId = useImagesCreds
    ? normalizeScalarEnv(process.env.R2_IMAGES_ACCOUNT_ID) || normalizeScalarEnv(process.env.R2_ACCOUNT_ID)
    : normalizeScalarEnv(process.env.R2_ACCOUNT_ID)
  const accessKey = useImagesCreds
    ? normalizeScalarEnv(process.env.R2_IMAGES_ACCESS_KEY_ID)
    : normalizeScalarEnv(process.env.R2_ACCESS_KEY_ID)
  const secret = useImagesCreds
    ? normalizeScalarEnv(process.env.R2_IMAGES_SECRET_ACCESS_KEY)
    : normalizeScalarEnv(process.env.R2_SECRET_ACCESS_KEY)

  if (!accountId || !accessKey || !secret) {
    console.error(
      useImagesCreds
        ? 'Missing R2 images credentials. Set R2_IMAGES_ACCESS_KEY_ID, R2_IMAGES_SECRET_ACCESS_KEY, and R2_ACCOUNT_ID (or R2_IMAGES_ACCOUNT_ID) in apps/api/.env'
        : 'Missing R2 credentials. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in apps/api/.env',
    )
    process.exit(1)
  }
  if (!bucket) {
    console.error('No bucket: set R2_IMAGES_BUCKET_NAME or R2_BUCKET_NAME')
    process.exit(1)
  }
  if (!pubBase) {
    console.error('No public URL: set R2_IMAGES_PUBLIC_URL or R2_PUBLIC_URL (must be https://pub-….r2.dev or your media domain, NOT *.r2.cloudflarestorage.com)')
    process.exit(1)
  }
  if (isR2PublicUrlS3ApiEndpoint(pubBase)) {
    console.error('R2_IMAGES_PUBLIC_URL / R2_PUBLIC_URL must be the browser-public hostname, not the S3 API endpoint.')
    process.exit(1)
  }

  let st
  try {
    st = await stat(IMAGES_DIR)
  } catch {
    console.error('Local folder not found:', IMAGES_DIR)
    process.exit(1)
  }
  if (!st.isDirectory()) {
    console.error('Not a directory:', IMAGES_DIR)
    process.exit(1)
  }

  const files: string[] = []
  await collectFiles(IMAGES_DIR, files)
  files.sort()

  console.log(
    dryRun ? `[dry-run] Would upload ${files.length} files` : `Uploading ${files.length} files`,
    `→ bucket "${bucket}"`,
  )
  console.log(`Public base: ${pubBase}`)
  console.log(`Key prefix: ${KEY_PREFIX}/`)

  let uploaded = 0
  let skipped = 0
  for (const abs of files) {
    const rel = path.relative(IMAGES_DIR, abs)
    const posixRel = rel.split(path.sep).join('/')
    const ext = path.extname(abs)
    const mime = extToMime(ext)
    if (!mime) {
      console.warn('  skip (unknown type):', posixRel)
      skipped++
      continue
    }
    const key = `${KEY_PREFIX}/${posixRel}`
    if (dryRun) {
      console.log(' ', key, `(${mime})`)
      uploaded++
      continue
    }
    const body = await readFile(abs)
    await putPublicObject(key, body, mime, { bucket })
    uploaded++
    if (uploaded % 25 === 0) console.log(`  … ${uploaded} uploaded`)
  }

  console.log(
    dryRun ? `[dry-run] Done. ${uploaded} planned, ${skipped} skipped.` : `Done. ${uploaded} uploaded, ${skipped} skipped.`,
  )
  if (!dryRun && files.length) {
    const sample = `${KEY_PREFIX}/${path.relative(IMAGES_DIR, files[0]).split(path.sep).join('/')}`
    console.log('Example URL:', `${pubBase}/${sample}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
