const RAW = import.meta.env.VITE_ASSET_BASE_URL

function normalizedBase(): string {
  if (typeof RAW !== 'string') return ''
  return RAW.trim().replace(/\/+$/, '')
}

/**
 * Static files under `public/images` (synced to R2 as `images/...`).
 * When `VITE_ASSET_BASE_URL` is set (e.g. https://cdn.example.com), returns that origin + path so assets load from the CDN.
 */
export function assetUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  const base = normalizedBase()
  if (base && p.startsWith('/images/')) {
    return `${base}${p}`
  }
  return p
}
