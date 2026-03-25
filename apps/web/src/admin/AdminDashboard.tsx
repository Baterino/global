import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminListArticles, adminListUseCases, type ArticleRow, type UseCaseRow } from '../lib/adminApi'

function formatWhen(iso: string | null | undefined): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

export function AdminDashboard() {
  const [articles, setArticles] = useState<ArticleRow[] | null>(null)
  const [useCases, setUseCases] = useState<UseCaseRow[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [a, u] = await Promise.all([adminListArticles(), adminListUseCases()])
        if (!cancelled) {
          setArticles(a)
          setUseCases(u)
        }
      } catch {
        if (!cancelled) setError('Could not load content lists.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const articlePreview = articles?.slice(0, 12) ?? []
  const useCasePreview = useCases?.slice(0, 12) ?? []

  return (
    <div>
      <h1 className="font-publicSans text-2xl font-bold text-neutral-900">Dashboard</h1>
      <p className="mt-2 max-w-xl text-body-md text-neutral-600">
        Recent blog articles and use-case projects. Open an item to edit, or use the links below to manage everything.
      </p>

      {error ? <p className="mt-4 text-body-sm text-red-700">{error}</p> : null}

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-publicSans text-lg font-semibold text-neutral-900">Blog articles</h2>
            <Link to="/admin/articles" className="text-body-sm font-semibold text-[#10064B] hover:underline">
              View all →
            </Link>
          </div>
          {articles === null ? (
            <p className="mt-3 text-body-sm text-neutral-500">Loading…</p>
          ) : articlePreview.length === 0 ? (
            <p className="mt-3 text-body-sm text-neutral-500">No articles yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
              {articlePreview.map((row) => (
                <li key={row.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <Link
                      to={`/admin/articles/${row.id}`}
                      className="font-medium text-[#10064B] hover:underline"
                    >
                      {row.title || row.slug}
                    </Link>
                    <p className="truncate text-body-xs text-neutral-500">
                      /{row.slug} · {row.type}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 text-body-xs text-neutral-600">
                    <span
                      className={
                        row.status === 'published'
                          ? 'rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-800'
                          : 'rounded-full bg-neutral-100 px-2 py-0.5 font-medium text-neutral-700'
                      }
                    >
                      {row.status}
                    </span>
                    <span className="text-neutral-400">{formatWhen(row.published_at ?? row.updated_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-publicSans text-lg font-semibold text-neutral-900">Use cases</h2>
            <Link to="/admin/use-cases" className="text-body-sm font-semibold text-[#10064B] hover:underline">
              View all →
            </Link>
          </div>
          {useCases === null ? (
            <p className="mt-3 text-body-sm text-neutral-500">Loading…</p>
          ) : useCasePreview.length === 0 ? (
            <p className="mt-3 text-body-sm text-neutral-500">No use cases yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
              {useCasePreview.map((row) => (
                <li
                  key={row.project_id}
                  className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <Link
                      to={`/admin/use-cases/${encodeURIComponent(row.project_id)}`}
                      className="font-medium text-[#10064B] hover:underline"
                    >
                      {row.title || row.project_id}
                    </Link>
                    <p className="truncate text-body-xs text-neutral-500">
                      {row.project_id} · {row.sector} / {row.install_type}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 text-body-xs text-neutral-600">
                    <span
                      className={
                        row.status === 'published'
                          ? 'rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-800'
                          : 'rounded-full bg-neutral-100 px-2 py-0.5 font-medium text-neutral-700'
                      }
                    >
                      {row.status}
                    </span>
                    <span className="text-neutral-400">{formatWhen(row.updated_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <ul className="mt-10 flex flex-col gap-3 text-body-md">
        <li>
          <Link to="/admin/articles" className="font-semibold text-[#10064B] hover:underline">
            Blog articles →
          </Link>
        </li>
        <li>
          <Link to="/admin/use-cases" className="font-semibold text-[#10064B] hover:underline">
            Use cases →
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="font-semibold text-[#10064B] hover:underline">
            Users (admins only) →
          </Link>
        </li>
      </ul>
    </div>
  )
}
