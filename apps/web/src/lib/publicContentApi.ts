import { viteApiBaseUrl } from './viteApiBaseUrl.js'

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
  /** Up to 4 curator-defined keywords; empty if unset. */
  keywords?: string[]
  published_at: string | null
}

export type PublicArticleDetail = PublicArticleListItem & {
  body_html: string
}

export async function fetchPublishedArticles(): Promise<PublicArticleListItem[]> {
  try {
    const res = await fetch(`${viteApiBaseUrl()}/api/public/articles`, { headers: { Accept: 'application/json' } })
    if (!res.ok) return []
    const data = (await res.json()) as { ok?: boolean; articles?: PublicArticleListItem[] }
    if (!data.ok || !data.articles) return []
    return data.articles.map((a) => ({
      ...a,
      keywords: Array.isArray(a.keywords) ? a.keywords : [],
    }))
  } catch {
    return []
  }
}

export async function fetchPublishedArticleBySlug(slug: string): Promise<PublicArticleDetail | null> {
  try {
    const res = await fetch(`${viteApiBaseUrl()}/api/public/articles/slug/${encodeURIComponent(slug)}`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const data = (await res.json()) as { ok?: boolean; article?: PublicArticleDetail }
    if (!data.ok || !data.article) return null
    const a = data.article
    return {
      ...a,
      keywords: Array.isArray(a.keywords) ? a.keywords : [],
    }
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
    const res = await fetch(`${viteApiBaseUrl()}/api/public/use-cases`, { headers: { Accept: 'application/json' } })
    if (!res.ok) return []
    const data = (await res.json()) as { ok?: boolean; projects?: PublicUseCaseProject[] }
    return data.ok && data.projects ? data.projects : []
  } catch {
    return []
  }
}
