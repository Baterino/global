import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { adminCreateUseCase, adminGetUseCase, adminUpdateUseCase } from '../lib/adminApi'

const SECTORS = ['industrial', 'maritime', 'offgrid'] as const
const INSTALL = ['cabinet', 'container', 'rack', 'marine'] as const

function imagesToText(images: unknown): string {
  if (Array.isArray(images)) return images.filter((x): x is string => typeof x === 'string').join('\n')
  return ''
}

export function AdminUseCaseForm() {
  const { projectId: projectIdParam } = useParams<{ projectId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const isNew = location.pathname.endsWith('/use-cases/new')

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    project_id: '',
    sector: 'industrial' as (typeof SECTORS)[number],
    install_type: 'cabinet' as (typeof INSTALL)[number],
    solar: false,
    search_loc: '',
    title: '',
    location: '',
    specs_json: '{}',
    use_tags_csv: '',
    images_text: '',
    status: 'draft' as 'draft' | 'published',
  })

  useEffect(() => {
    if (isNew) return
    const pid = projectIdParam ? decodeURIComponent(projectIdParam) : ''
    if (!pid) {
      navigate('/admin/use-cases', { replace: true })
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const p = await adminGetUseCase(pid)
        if (cancelled) return
        setForm({
          project_id: p.project_id,
          sector: (SECTORS.includes(p.sector as (typeof SECTORS)[number]) ? p.sector : 'industrial') as (typeof SECTORS)[number],
          install_type: (INSTALL.includes(p.install_type as (typeof INSTALL)[number])
            ? p.install_type
            : 'cabinet') as (typeof INSTALL)[number],
          solar: p.solar,
          search_loc: p.search_loc || '',
          title: p.title,
          location: p.location,
          specs_json: JSON.stringify(p.specs ?? {}, null, 2),
          use_tags_csv: (p.use_tags || []).join(', '),
          images_text: imagesToText(p.images),
          status: p.status === 'published' ? 'published' : 'draft',
        })
      } catch {
        navigate('/admin/use-cases', { replace: true })
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [isNew, projectIdParam, navigate])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    let specs: Record<string, unknown> = {}
    try {
      specs = JSON.parse(form.specs_json) as Record<string, unknown>
    } catch {
      alert('Specs must be valid JSON')
      return
    }
    const use_tags = form.use_tags_csv
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const images = form.images_text
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    const payload = {
      sector: form.sector,
      install_type: form.install_type,
      solar: form.solar,
      search_loc: form.search_loc || form.location.toLowerCase(),
      title: form.title,
      location: form.location,
      specs,
      use_tags,
      images,
      status: form.status,
    }

    setSaving(true)
    try {
      if (isNew) {
        await adminCreateUseCase({ ...payload, project_id: form.project_id.trim() })
        navigate('/admin/use-cases')
      } else {
        await adminUpdateUseCase(form.project_id, payload)
        navigate('/admin/use-cases')
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
      <Link to="/admin/use-cases" className="text-body-sm text-[#10064B] hover:underline">
        ← Back to use cases
      </Link>
      <h1 className="mt-4 font-publicSans text-2xl font-bold text-neutral-900">
        {isNew ? 'New use case' : 'Edit use case'}
      </h1>
      <form className="mt-6 max-w-3xl space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-body-sm font-medium">Project ID</label>
          <input
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 font-mono"
            value={form.project_id}
            onChange={(e) => setForm((f) => ({ ...f, project_id: e.target.value }))}
            required
            disabled={!isNew}
            placeholder="e.g. GS-100"
          />
          {!isNew ? <p className="mt-1 text-body-xs text-neutral-500">ID cannot be changed.</p> : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-body-sm font-medium">Sector</label>
            <select
              className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
              value={form.sector}
              onChange={(e) =>
                setForm((f) => ({ ...f, sector: e.target.value as (typeof SECTORS)[number] }))
              }
            >
              {SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-body-sm font-medium">Install type</label>
            <select
              className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
              value={form.install_type}
              onChange={(e) =>
                setForm((f) => ({ ...f, install_type: e.target.value as (typeof INSTALL)[number] }))
              }
            >
              {INSTALL.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label className="flex items-center gap-2 text-body-sm">
          <input
            type="checkbox"
            checked={form.solar}
            onChange={(e) => setForm((f) => ({ ...f, solar: e.target.checked }))}
          />
          Solar
        </label>
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
          <label className="block text-body-sm font-medium">Location (display)</label>
          <input
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
            value={form.location}
            onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-body-sm font-medium">Search / filter text (optional)</label>
          <input
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
            value={form.search_loc}
            onChange={(e) => setForm((f) => ({ ...f, search_loc: e.target.value }))}
            placeholder="lowercase keywords for search"
          />
        </div>
        <div>
          <label className="block text-body-sm font-medium">Specs (JSON)</label>
          <textarea
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 font-mono text-body-sm"
            rows={8}
            value={form.specs_json}
            onChange={(e) => setForm((f) => ({ ...f, specs_json: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-body-sm font-medium">Tags (comma-separated)</label>
          <input
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
            value={form.use_tags_csv}
            onChange={(e) => setForm((f) => ({ ...f, use_tags_csv: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-body-sm font-medium">Image URLs (one per line)</label>
          <textarea
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 font-mono text-body-sm"
            rows={5}
            value={form.images_text}
            onChange={(e) => setForm((f) => ({ ...f, images_text: e.target.value }))}
            placeholder="/images/usecases/GS-229/GS-229_photo_01.jpg"
          />
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
          {saving ? 'Saving…' : isNew ? 'Create' : 'Save'}
        </button>
      </form>
    </div>
  )
}
