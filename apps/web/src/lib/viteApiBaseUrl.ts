/**
 * Normalizes VITE_API_URL: trims trailing slashes and strips a trailing `/api`
 * so callers never hit …/api/api/contact or …/api/api/admin/login (common paste mistake).
 */
export function viteApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL
  if (typeof raw !== 'string' || !raw.trim()) return ''
  let base = raw.trim().replace(/\/+$/, '')
  if (base.endsWith('/api')) {
    base = base.slice(0, -4).replace(/\/+$/, '')
  }
  return base
}
