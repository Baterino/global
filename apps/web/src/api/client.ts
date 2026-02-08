/**
 * API client with base URL and Accept-Language from i18n.
 * Use getApiLang() when calling from components (after i18n is ready).
 */

const API_BASE = import.meta.env.VITE_API_URL ?? ''

export function getApiHeaders(lang: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Accept-Language': lang,
  }
}

export async function apiFetch<T = unknown>(
  path: string,
  options: { lang: string; signal?: AbortSignal } & Omit<RequestInit, 'headers'> = { lang: 'en' }
): Promise<{ data?: T; error?: string }> {
  const { lang, signal, ...rest } = options
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`
  const headers = new Headers()
  headers.set('Accept-Language', lang)
  headers.set('Content-Type', 'application/json')

  try {
    const res = await fetch(url, { ...rest, headers, signal })
    if (!res.ok) {
      const text = await res.text()
      return { error: text || res.statusText }
    }
    const data = (await res.json()) as T
    return { data }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { error: message }
  }
}
