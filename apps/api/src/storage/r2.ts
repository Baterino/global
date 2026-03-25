import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { randomBytes } from 'node:crypto'

let client: S3Client | null = null

/** Trim and strip a single pair of surrounding quotes from .env pastes. */
function normalizeScalarEnv(v: string | undefined): string {
  if (v == null) return ''
  let s = v.trim()
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim()
  }
  return s
}

export function getR2BucketName(): string {
  // S3-compatible names: lowercase, 3–63 chars, letters/digits/hyphens/dots (avoid upper case)
  return normalizeScalarEnv(process.env.R2_BUCKET_NAME).toLowerCase()
}

export function isR2Configured(): boolean {
  return Boolean(
    normalizeScalarEnv(process.env.R2_ACCOUNT_ID) &&
      normalizeScalarEnv(process.env.R2_ACCESS_KEY_ID) &&
      normalizeScalarEnv(process.env.R2_SECRET_ACCESS_KEY) &&
      getR2BucketName() &&
      normalizeScalarEnv(process.env.R2_PUBLIC_URL),
  )
}

function getClient(): S3Client {
  if (client) return client
  const accountId = normalizeScalarEnv(process.env.R2_ACCOUNT_ID)
  const accessKeyId = normalizeScalarEnv(process.env.R2_ACCESS_KEY_ID)
  const secretAccessKey = normalizeScalarEnv(process.env.R2_SECRET_ACCESS_KEY)
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('R2 credentials not configured')
  }
  client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
    /** Required for R2; avoids virtual-hosted bucket DNS validation errors. */
    forcePathStyle: true,
  })
  return client
}

export function publicUrlForKey(key: string): string {
  const base = normalizeScalarEnv(process.env.R2_PUBLIC_URL).replace(/\/+$/, '')
  const k = key.replace(/^\/+/, '')
  return `${base}/${k}`
}

/**
 * Values saved in the DB should use `publicUrlForKey` (browser-loadable). If an old or mistaken
 * value points at the R2 S3 API host (not publicly readable), or is only an object key, rewrite
 * using `R2_PUBLIC_URL` so `<img src>` works on the marketing site.
 */
export function publicImageUrlForResponse(storedUrl: string | null | undefined): string {
  const u = typeof storedUrl === 'string' ? storedUrl.trim() : ''
  if (!u) return u

  const pubBase = normalizeScalarEnv(process.env.R2_PUBLIC_URL).replace(/\/+$/, '')

  // Bare object key from manual fixes / migrations
  if (!/^https?:\/\//i.test(u) && pubBase) {
    const k = u.replace(/^\/+/, '')
    if (k.startsWith('articles/') || k.startsWith('use-cases/')) {
      return publicUrlForKey(k)
    }
    return u
  }

  try {
    const parsed = new URL(u)
    // Public site is HTTPS; R2.dev may be saved as http:// and blocked as mixed content.
    if (parsed.protocol === 'http:' && parsed.hostname.endsWith('.r2.dev')) {
      parsed.protocol = 'https:'
      return parsed.toString()
    }
    // Path-style S3 API: https://<account>.r2.cloudflarestorage.com/<bucket>/<key...>
    if (parsed.hostname.endsWith('.r2.cloudflarestorage.com') && pubBase) {
      const path = parsed.pathname.replace(/^\/+/, '')
      if (!path) return u
      const key = path.split('/').slice(1).join('/')
      if (key) return publicUrlForKey(key)
    }
  } catch {
    /* ignore parse errors */
  }

  return u
}

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
])

export function assertAllowedImageMime(mime: string): void {
  const m = mime.toLowerCase().split(';')[0].trim()
  if (!ALLOWED_TYPES.has(m)) {
    throw new Error(`unsupported_type:${m}`)
  }
}

export function mimeToExt(mime: string): string {
  const m = mime.toLowerCase().split(';')[0].trim()
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
  }
  return map[m] ?? 'bin'
}

export function safeFileBase(name: string): string {
  const base = (name.split(/[/\\]/).pop() ?? 'image').replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120)
  return base || 'image'
}

export function uniqueObjectKey(folder: string, originalName: string, mime: string): string {
  const id = randomBytes(8).toString('hex')
  const ext = mimeToExt(mime)
  let base = safeFileBase(originalName).replace(/\.[^.]+$/, '')
  if (!base) base = 'image'
  const prefix = folder.replace(/\/+$/, '').replace(/^\/+/, '')
  return `${prefix}/${id}-${base}.${ext}`
}

export async function uploadPublicImage(key: string, body: Buffer, contentType: string): Promise<void> {
  const bucket = getR2BucketName()
  if (!bucket) throw new Error('R2_BUCKET_NAME not set')
  if (bucket.includes('://') || bucket.includes('/')) {
    throw new Error(
      'R2_BUCKET_NAME must be only the bucket label (e.g. baterino-media), not a URL.',
    )
  }
  assertAllowedImageMime(contentType)
  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType.split(';')[0].trim(),
      // R2 + custom domain: public bucket or r2.dev public access
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  )
}
