import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  adminCreateArticle,
  adminGetArticle,
  adminUpdateArticle,
  type ArticleDetail,
} from '../lib/adminApi'

const TYPES = ['company', 'press-release', 'use-cases', 'news'] as const

export function AdminArticleForm() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const isNew = location.pathname.endsWith('/articles/new')

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    slug: '',
    type: 'company' as (typeof TYPES)[number],
    title: '',
    excerpt: '',
    body_html: '',
    image_url: '',
    author_name: 'Baterino',
    location_label: '',
    category_label: 'Insights',
    status: 'draft' as 'draft' | 'published',
  })

  useEffect(() => {
    if (isNew) return
    let cancelled = false
    ;(async () => {
      try {
        const a: ArticleDetail = await adminGetArticle(id!)
        if (cancelled) return
        setForm({
          slug: a.slug,
          type: (TYPES.includes(a.type as (typeof TYPES)[number]) ? a.type : 'company') as (typeof TYPES)[number],
          title: a.title,
          excerpt: a.excerpt,
          body_html: a.body_html,
          image_url: a.image_url,
          author_name: a.author_name || 'Baterino',
          location_label: a.location_label || '',
          category_label: a.category_label || '',
          status: a.status === 'published' ? 'published' : 'draft',
        })
      } catch {
        navigate('/admin/articles', { replace: true })
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id, isNew, navigate])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      if (isNew) {
        const newId = await adminCreateArticle(form)
        navigate(`/admin/articles/${newId}`, { replace: true })
      } else {
        await adminUpdateArticle(id!, form)
        navigate('/admin/articles')
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-neutral-500">Loading…</p>

  return (
    <div>
      <Link to="/admin/articles" className="text-body-sm text-[#10064B] hover:underline">
        ← Back to articles
      </Link>
      <h1 className="mt-4 font-publicSans text-2xl font-bold text-neutral-900">
        {isNew ? 'New article' : 'Edit article'}
      </h1>
      <form className="mt-6 max-w-3xl space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-body-sm font-medium">Slug (URL)</label>
            <input
              className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              required
              disabled={!isNew}
            />
            {!isNew ? <p className="mt-1 text-body-xs text-neutral-500">Slug cannot be changed after create.</p> : null}
          </div>
          <div>
            <label className="block text-body-sm font-medium">Type</label>
            <select
              className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
              value={form.type}
              onChange={(e) =>
                setForm((f) => ({ ...f, type: e.target.value as (typeof TYPES)[number] }))
              }
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-body-sm font-medium">Title</label>
          <input
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-body-sm font-medium">Excerpt</label>
          <textarea
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
            rows={3}
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-body-sm font-medium">Featured image URL</label>
          <input
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
            value={form.image_url}
            onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
            placeholder="/images/blog/example.jpg"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-body-sm font-medium">Author (display)</label>
            <input
              className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
              value={form.author_name}
              onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-body-sm font-medium">Location line</label>
            <input
              className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
              value={form.location_label}
              onChange={(e) => setForm((f) => ({ ...f, location_label: e.target.value }))}
              placeholder="Global"
            />
          </div>
          <div>
            <label className="block text-body-sm font-medium">Category line</label>
            <input
              className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
              value={form.category_label}
              onChange={(e) => setForm((f) => ({ ...f, category_label: e.target.value }))}
            />
          </div>
        </div>
        <div>
          <label className="block text-body-sm font-medium">Body (HTML)</label>
          <textarea
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 font-mono text-body-sm"
            rows={18}
            value={form.body_html}
            onChange={(e) => setForm((f) => ({ ...f, body_html: e.target.value }))}
            required
            placeholder='<div class="article-rich"><p>…</p></div>'
          />
          <p className="mt-1 text-body-xs text-neutral-500">
            Use <code className="rounded bg-neutral-100 px-1">__LOCALE__</code> in links; it is replaced with the
            visitor&apos;s locale on the public site.
          </p>
        </div>
        <div>
          <label className="block text-body-sm font-medium">Status</label>
          <select
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 sm:w-48"
            value={form.status}
            onChange={(e) =>
              setForm((f) => ({ ...f, status: e.target.value as 'draft' | 'published' }))
            }
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-neutral-900 px-6 py-2.5 font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {saving ? 'Saving…' : isNew ? 'Create' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}
