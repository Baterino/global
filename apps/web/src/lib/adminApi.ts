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

function apiBase(): string {
  const raw = import.meta.env.VITE_API_URL
  if (typeof raw === 'string' && raw.trim()) return raw.replace(/\/$/, '')
  return ''
}

async function adminFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = getAdminToken()
  const headers = new Headers(init.headers)
  headers.set('Accept', 'application/json')
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) headers.set('Authorization', `Bearer ${token}`)
  return fetch(`${apiBase()}${path}`, { ...init, headers })
}

export type AdminUser = { id: string; username: string; role: 'admin' | 'contributor' }

export async function adminLogin(username: string, password: string): Promise<{ token: string; user: AdminUser }> {
  const res = await adminFetch('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  const data = (await res.json()) as { ok?: boolean; token?: string; user?: AdminUser; code?: string }
  if (!res.ok || !data.ok || !data.token || !data.user) {
    throw new Error(data.code ?? 'login_failed')
  }
  return { token: data.token, user: data.user }
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
