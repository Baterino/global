function apiBase(): string {
  const raw = import.meta.env.VITE_API_URL
  if (typeof raw === 'string' && raw.trim()) return raw.replace(/\/$/, '')
  return ''
}

export type PublicArticleListItem = {
  id: string
  slug: string
  type: string
  title: string
  excerpt: string
  image_url: string
  author_name: string
  location_label: string
  category_label: string
  published_at: string | null
}

export type PublicArticleDetail = PublicArticleListItem & {
  body_html: string
}

export async function fetchPublishedArticles(): Promise<PublicArticleListItem[]> {
  try {
    const res = await fetch(`${apiBase()}/api/public/articles`, { headers: { Accept: 'application/json' } })
    if (!res.ok) return []
    const data = (await res.json()) as { ok?: boolean; articles?: PublicArticleListItem[] }
    return data.ok && data.articles ? data.articles : []
  } catch {
    return []
  }
}

export async function fetchPublishedArticleBySlug(slug: string): Promise<PublicArticleDetail | null> {
  try {
    const res = await fetch(`${apiBase()}/api/public/articles/slug/${encodeURIComponent(slug)}`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const data = (await res.json()) as { ok?: boolean; article?: PublicArticleDetail }
    return data.ok && data.article ? data.article : null
  } catch {
    return null
  }
}

export type PublicUseCaseProject = {
  id: string
  sector: string
  type: string
  solar: boolean
  loc: string
  title: string
  location: string
  specs: Record<string, unknown>
  useTags: string[]
  images: string[]
}

export async function fetchPublishedUseCases(): Promise<PublicUseCaseProject[]> {
  try {
    const res = await fetch(`${apiBase()}/api/public/use-cases`, { headers: { Accept: 'application/json' } })
    if (!res.ok) return []
    const data = (await res.json()) as { ok?: boolean; projects?: PublicUseCaseProject[] }
    return data.ok && data.projects ? data.projects : []
  } catch {
    return []
  }
}
