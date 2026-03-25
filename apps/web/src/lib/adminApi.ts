import { viteApiBaseUrl } from './viteApiBaseUrl.js'

const TOKEN_KEY = 'baterino_admin_token'

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

async function adminFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = getAdminToken()
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) headers.set('Authorization', `Bearer ${token}`)
  return fetch(`${viteApiBaseUrl()}${path}`, { ...init, headers })
}

export type AdminUser = { id: string; username: string; role: 'admin' | 'contributor' }

export async function adminLogin(username: string, password: string): Promise<{ token: string; user: AdminUser }> {
  if (import.meta.env.PROD && !viteApiBaseUrl()) {
    throw new Error(
      'Admin API URL is not set. In Vercel → Environment Variables, add VITE_API_URL with your Railway API base URL (no trailing slash), then redeploy.'
    )
  }

  let res: Response
  try {
    res = await adminFetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  } catch {
    throw new Error(
      'Could not reach the API. Confirm VITE_API_URL, that Railway is online, and the URL uses HTTPS.'
    )
  }

  const rawBody = await res.text()
  const trimmed = rawBody.trim()
  const contentType = res.headers.get('content-type') ?? ''
  const looksLikeHtml =
    contentType.includes('text/html') || trimmed.startsWith('<!') || trimmed.startsWith('<html')

  let data = {} as {
    ok?: boolean
    token?: string
    user?: AdminUser
    code?: string
    error?: string
    message?: string
  }
  try {
    data = trimmed ? (JSON.parse(rawBody) as typeof data) : {}
  } catch {
    if (looksLikeHtml || res.status === 404) {
      throw new Error(
        'The app returned a web page instead of API JSON — usually VITE_API_URL points at your Vercel site (or www) instead of the Railway API. Set VITE_API_URL to the Railway service URL only (https://….up.railway.app), save, redeploy Vercel, then try again.'
      )
    }
    throw new Error(
      'The server did not return valid JSON. Open Railway → your API → Logs while signing in, and confirm POST /api/admin/login responds with JSON.'
    )
  }

  if (res.ok && data.ok && data.token && data.user) {
    return { token: data.token, user: data.user }
  }

  const code = typeof data.code === 'string' ? data.code.trim() : ''

  if (res.status === 401 || code === 'invalid_credentials') {
    throw new Error(
      'Invalid username or password. The username must match the value in the database (often ADMIN_EMAIL or ADMIN_USERNAME from seed, or "admin").'
    )
  }
  if (res.status === 503 || code === 'database_unavailable') {
    throw new Error('Database unreachable. On Railway, set DATABASE_URL from Postgres and run migrations + seed.')
  }
  if (res.status === 404) {
    throw new Error(
      'Admin API not found. Set VITE_API_URL to your Railway service URL and ensure JWT_SECRET and DATABASE_URL are set on Railway.'
    )
  }
  if (res.status === 405) {
    throw new Error(
      'Method not allowed (HTTP 405). POST was rejected for this URL. Set VITE_API_URL to the Railway API hostname only (no /api at the end — the app adds /api/admin/login). Confirm the Railway service is the Node API, not Postgres or another app.'
    )
  }
  if (res.status === 429) {
    throw new Error('Too many sign-in attempts. Wait a minute and try again.')
  }

  if (code === 'credentials_required') {
    throw new Error('Enter username and password.')
  }

  const serverHint =
    typeof data.message === 'string' && data.message.trim()
      ? data.message.trim()
      : typeof data.error === 'string' && data.error.trim()
        ? data.error.trim()
        : ''

  if (res.status >= 500) {
    throw new Error(
      serverHint
        ? `Server error (HTTP ${res.status}): ${serverHint}`
        : `Server error (HTTP ${res.status}). Check Railway → API → Logs, DATABASE_URL, JWT_SECRET, and run db:migrate + db:seed.`
    )
  }

  if (res.status === 403) {
    throw new Error(
      'Access forbidden (HTTP 403). Confirm the Railway service URL and that nothing is blocking POST /api/admin/login.'
    )
  }

  if (res.ok) {
    throw new Error(
      'The server returned HTTP 200 but no login token. VITE_API_URL may point at the wrong host (not the Node API), or the deployed API is missing admin routes. Check Railway build/start and logs for POST /api/admin/login.'
    )
  }

  throw new Error(
    code
      ? `Sign-in failed (${code}). Check Railway API logs.`
      : serverHint
        ? `Sign-in failed: ${serverHint}`
        : `Sign-in failed (HTTP ${res.status}). Check Railway API logs — ensure admin routes are enabled (DATABASE_URL + JWT_SECRET on the API service).`
  )
}

export async function adminMe(): Promise<AdminUser> {
  const res = await adminFetch('/api/admin/me')
  const data = (await res.json()) as { ok?: boolean; user?: AdminUser }
  if (!res.ok || !data.ok || !data.user) throw new Error('unauthorized')
  return data.user
}

export type ArticleRow = {
  id: string
  slug: string
  type: string
  title: string
  excerpt: string
  image_url: string
  status: string
  published_at: string | null
  author_id: string | null
  created_at: string
  updated_at: string
}

export type ArticleDetail = ArticleRow & {
  body_html: string
  author_name: string
  location_label: string
  category_label: string
}

export async function adminListArticles(): Promise<ArticleRow[]> {
  const res = await adminFetch('/api/admin/articles')
  const data = (await res.json()) as { ok?: boolean; articles?: ArticleRow[] }
  if (!res.ok || !data.ok) throw new Error('list_failed')
  return data.articles ?? []
}

export async function adminGetArticle(id: string): Promise<ArticleDetail> {
  const res = await adminFetch(`/api/admin/articles/${encodeURIComponent(id)}`)
  const data = (await res.json()) as { ok?: boolean; article?: ArticleDetail }
  if (!res.ok || !data.ok || !data.article) throw new Error('not_found')
  return data.article
}

export async function adminCreateArticle(body: Record<string, unknown>): Promise<string> {
  const res = await adminFetch('/api/admin/articles', { method: 'POST', body: JSON.stringify(body) })
  const data = (await res.json()) as { ok?: boolean; id?: string; code?: string }
  if (!res.ok || !data.ok || !data.id) throw new Error(data.code ?? 'create_failed')
  return data.id
}

export async function adminUpdateArticle(id: string, body: Record<string, unknown>): Promise<void> {
  const res = await adminFetch(`/api/admin/articles/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
  const data = (await res.json()) as { ok?: boolean; code?: string }
  if (!res.ok || !data.ok) throw new Error(data.code ?? 'update_failed')
}

export async function adminDeleteArticle(id: string): Promise<void> {
  const res = await adminFetch(`/api/admin/articles/${encodeURIComponent(id)}`, { method: 'DELETE' })
  const data = (await res.json()) as { ok?: boolean; code?: string }
  if (!res.ok || !data.ok) throw new Error(data.code ?? 'delete_failed')
}

export async function adminUploadMedia(params: {
  kind: 'article' | 'use-case'
  entityId: string
  file: File
}): Promise<{ url: string; key: string }> {
  const token = getAdminToken()
  if (!token) throw new Error('Not signed in')
  const base = viteApiBaseUrl()
  if (import.meta.env.PROD && !base) {
    throw new Error('VITE_API_URL is not set; cannot upload.')
  }
  const form = new FormData()
  form.append('kind', params.kind)
  form.append('entityId', params.entityId)
  form.append('file', params.file)
  const res = await fetch(`${base}/api/admin/media/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  })
  const data = (await res.json()) as { ok?: boolean; url?: string; key?: string; code?: string }
  if (!res.ok || !data.ok || !data.url) {
    const code = data.code ?? 'upload_failed'
    const messages: Record<string, string> = {
      r2_not_configured: 'Server is not configured for file storage (R2).',
      file_required: 'Choose a file to upload.',
      invalid_kind: 'Invalid upload type.',
      entity_id_required: 'Missing article or project id.',
      invalid_article_id: 'Invalid article id.',
      invalid_project_id: 'Invalid project id.',
      not_found: 'Article or use case not found.',
      forbidden: 'You cannot upload for this item.',
      invalid_file_type: 'Only JPEG, PNG, WebP, GIF, or AVIF images are allowed.',
      file_too_large: 'File is too large (max 12 MB).',
      upload_failed: 'Upload failed.',
    }
    throw new Error(messages[code] ?? code)
  }
  return { url: data.url, key: data.key ?? '' }
}

export type UseCaseRow = {
  project_id: string
  sector: string
  install_type: string
  solar: boolean
  search_loc: string
  title: string
  location: string
  specs: Record<string, unknown>
  use_tags: string[]
  images: unknown
  status: string
  author_id: string | null
  created_at: string
  updated_at: string
}

export async function adminListUseCases(): Promise<UseCaseRow[]> {
  const res = await adminFetch('/api/admin/use-cases')
  const data = (await res.json()) as { ok?: boolean; projects?: UseCaseRow[] }
  if (!res.ok || !data.ok) throw new Error('list_failed')
  return data.projects ?? []
}

export async function adminGetUseCase(projectId: string): Promise<UseCaseRow> {
  const res = await adminFetch(`/api/admin/use-cases/${encodeURIComponent(projectId)}`)
  const data = (await res.json()) as { ok?: boolean; project?: UseCaseRow }
  if (!res.ok || !data.ok || !data.project) throw new Error('not_found')
  return data.project
}

export async function adminCreateUseCase(body: Record<string, unknown>): Promise<void> {
  const res = await adminFetch('/api/admin/use-cases', { method: 'POST', body: JSON.stringify(body) })
  const data = (await res.json()) as { ok?: boolean; code?: string }
  if (!res.ok || !data.ok) throw new Error(data.code ?? 'create_failed')
}

export async function adminUpdateUseCase(projectId: string, body: Record<string, unknown>): Promise<void> {
  const res = await adminFetch(`/api/admin/use-cases/${encodeURIComponent(projectId)}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
  const data = (await res.json()) as { ok?: boolean; code?: string }
  if (!res.ok || !data.ok) throw new Error(data.code ?? 'update_failed')
}

export async function adminDeleteUseCase(projectId: string): Promise<void> {
  const res = await adminFetch(`/api/admin/use-cases/${encodeURIComponent(projectId)}`, { method: 'DELETE' })
  const data = (await res.json()) as { ok?: boolean; code?: string }
  if (!res.ok || !data.ok) throw new Error(data.code ?? 'delete_failed')
}

export type UserRow = { id: string; username: string; role: string; created_at: string }

export async function adminListUsers(): Promise<UserRow[]> {
  const res = await adminFetch('/api/admin/users')
  const data = (await res.json()) as { ok?: boolean; users?: UserRow[] }
  if (!res.ok || !data.ok) throw new Error('list_failed')
  return data.users ?? []
}

export async function adminCreateUser(body: {
  username: string
  password: string
  role: 'admin' | 'contributor'
}): Promise<void> {
  const res = await adminFetch('/api/admin/users', { method: 'POST', body: JSON.stringify(body) })
  const data = (await res.json()) as { ok?: boolean; code?: string }
  if (!res.ok || !data.ok) throw new Error(data.code ?? 'create_failed')
}

export async function adminDeleteUser(id: string): Promise<void> {
  const res = await adminFetch(`/api/admin/users/${encodeURIComponent(id)}`, { method: 'DELETE' })
  const data = (await res.json()) as { ok?: boolean; code?: string }
  if (!res.ok || !data.ok) throw new Error(data.code ?? 'delete_failed')
}

export async function adminPatchUserRole(id: string, role: 'admin' | 'contributor'): Promise<void> {
  const res = await adminFetch(`/api/admin/users/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  })
  const data = (await res.json()) as { ok?: boolean; code?: string }
  if (!res.ok || !data.ok) throw new Error(data.code ?? 'update_failed')
}
