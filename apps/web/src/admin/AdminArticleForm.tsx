import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  adminCreateArticle,
  adminGetArticle,
  adminUpdateArticle,
  adminUploadMedia,
  type ArticleDetail,
} from '../lib/adminApi'
import { AdminArticleBodyEditor } from './AdminArticleBodyEditor'
import { AdminFeaturedImageCropModal } from './AdminFeaturedImageCropModal'
import { FEATURED_IMAGE_HEIGHT, FEATURED_IMAGE_WIDTH } from '../lib/cropFeaturedImage'
import { ARTICLE_BODY_IMAGE_MAX_H, ARTICLE_BODY_IMAGE_MAX_W } from '../lib/resizeArticleBodyImage'

function isArticleBodyEmpty(html: string): boolean {
  const t = html.trim()
  if (!t) return true
  const collapsed = t.replace(/\s/g, '')
  return /^<(p|div)(\s[^>]*)?>(<br\s*\/?>)*<\/\1>$/i.test(collapsed) || collapsed === '<p></p>'
}

const ARTICLE_TYPES = ['company', 'press-release', 'use-cases', 'news'] as const
type ArticleType = (typeof ARTICLE_TYPES)[number]

const TYPE_TO_CATEGORY_I18N: Record<ArticleType, string> = {
  company: 'insights.filters.company',
  'press-release': 'insights.filters.pressRelease',
  'use-cases': 'insights.filters.useCases',
  news: 'insights.filters.news',
}

const KEYWORD_SLOTS = 4 as const
/** Matches meta / Open Graph description length used on the public article page. */
const EXCERPT_MAX_LENGTH = 200

function clampExcerpt(s: string): string {
  return s.length <= EXCERPT_MAX_LENGTH ? s : s.slice(0, EXCERPT_MAX_LENGTH)
}

function padKeywordSlots(keys: string[] | undefined): [string, string, string, string] {
  const k = [...(keys ?? [])].slice(0, KEYWORD_SLOTS).map((x) => String(x).trim())
  return [k[0] ?? '', k[1] ?? '', k[2] ?? '', k[3] ?? '']
}

type FormState = {
  type: ArticleType
  title: string
  excerpt: string
  body_html: string
  image_url: string
  author_name: string
  location_label: string
  status: 'draft' | 'published'
  /** Four input slots; saved values are trimmed non-empty strings (max 4). */
  keywords: [string, string, string, string]
}

function buildArticleBody(form: FormState): Record<string, unknown> {
  const keywords = form.keywords.map((k) => k.trim()).filter(Boolean).slice(0, KEYWORD_SLOTS)
  return {
    type: form.type,
    title: form.title,
    excerpt: clampExcerpt(form.excerpt),
    body_html: form.body_html,
    image_url: form.image_url.trim(),
    author_name: form.author_name,
    location_label: form.location_label,
    category_label: TYPE_TO_CATEGORY_I18N[form.type],
    status: form.status,
    keywords,
  }
}

export function AdminArticleForm() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const isNew = location.pathname.endsWith('/articles/new')

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploadBusy, setUploadBusy] = useState(false)
  const [existingSlug, setExistingSlug] = useState('')
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null)
  /** Object URL + original filename; opened in crop modal before upload or pending save. */
  const [cropSession, setCropSession] = useState<{ src: string; name: string } | null>(null)
  const [form, setForm] = useState<FormState>({
    type: 'company',
    title: '',
    excerpt: '',
    body_html: '',
    image_url: '',
    author_name: 'Baterino',
    location_label: '',
    status: 'draft',
    keywords: ['', '', '', ''],
  })

  const [pendingImagePreviewUrl, setPendingImagePreviewUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!pendingImageFile) {
      setPendingImagePreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(pendingImageFile)
    setPendingImagePreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [pendingImageFile])

  useEffect(() => {
    if (isNew) return
    let cancelled = false
    ;(async () => {
      try {
        const a: ArticleDetail = await adminGetArticle(id!)
        if (cancelled) return
        setExistingSlug(a.slug)
        setForm({
          type: (ARTICLE_TYPES.includes(a.type as ArticleType) ? a.type : 'company') as ArticleType,
          title: a.title,
          excerpt: clampExcerpt(a.excerpt ?? ''),
          body_html: a.body_html,
          image_url: a.image_url,
          author_name: a.author_name || 'Baterino',
          location_label: a.location_label || '',
          status: a.status === 'published' ? 'published' : 'draft',
          keywords: padKeywordSlots(a.keywords),
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

  useEffect(() => {
    return () => {
      if (cropSession) URL.revokeObjectURL(cropSession.src)
    }
  }, [cropSession])

  function onFeaturedImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const src = URL.createObjectURL(file)
    setCropSession({ src, name: file.name })
  }

  function closeCropSession() {
    if (cropSession) {
      URL.revokeObjectURL(cropSession.src)
      setCropSession(null)
    }
  }

  async function onCroppedFeaturedImage(file: File) {
    closeCropSession()
    if (isNew || !id) {
      setPendingImageFile(file)
      return
    }
    setUploadBusy(true)
    try {
      const { url } = await adminUploadMedia({ kind: 'article', entityId: id, file })
      setForm((f) => ({ ...f, image_url: url }))
      setPendingImageFile(null)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploadBusy(false)
    }
  }

  function clearPendingImage() {
    setPendingImageFile(null)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isArticleBodyEmpty(form.body_html)) {
      alert('Article body is required.')
      return
    }
    setSaving(true)
    try {
      if (isNew) {
        const body = buildArticleBody(form)
        const newId = await adminCreateArticle(body)
        if (pendingImageFile) {
          setUploadBusy(true)
          try {
            const { url } = await adminUploadMedia({
              kind: 'article',
              entityId: newId,
              file: pendingImageFile,
            })
            await adminUpdateArticle(newId, { image_url: url })
            setPendingImageFile(null)
          } finally {
            setUploadBusy(false)
          }
        }
        navigate(`/admin/articles/${newId}`, { replace: true })
      } else {
        await adminUpdateArticle(id!, buildArticleBody(form))
        navigate('/admin/articles')
      }
    } catch (err) {
      const code = err instanceof Error ? err.message : ''
      const msg =
        code === 'slug_taken'
          ? 'That URL slug is already in use. Change the title slightly and try again.'
          : err instanceof Error
            ? err.message
            : 'Save failed'
      alert(msg)
    } finally {
      setSaving(false)
    }
  }

  const previewSrc = pendingImagePreviewUrl || form.image_url || ''

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
        {!isNew && existingSlug ? (
          <p className="text-body-sm text-neutral-600">
            <span className="font-medium text-neutral-800">URL slug</span>{' '}
            <code className="rounded bg-neutral-100 px-2 py-0.5 text-body-xs">{existingSlug}</code>
            <span className="ml-2 text-body-xs text-neutral-500">(set when created from title)</span>
          </p>
        ) : null}
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
          <label className="block text-body-sm font-medium">Category</label>
          <select
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2 sm:max-w-md"
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as ArticleType }))}
          >
            {ARTICLE_TYPES.map((ty) => (
              <option key={ty} value={ty}>
                {t(TYPE_TO_CATEGORY_I18N[ty])}
              </option>
            ))}
          </select>
          <p className="mt-1 text-body-xs text-neutral-500">Matches Insights filter tabs on the public site.</p>
        </div>
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label className="block text-body-sm font-medium">Excerpt</label>
            <span
              className={`text-body-xs tabular-nums ${
                form.excerpt.length >= EXCERPT_MAX_LENGTH ? 'font-medium text-amber-800' : 'text-neutral-500'
              }`}
              aria-live="polite"
            >
              {form.excerpt.length} / {EXCERPT_MAX_LENGTH}
            </span>
          </div>
          <p className="mt-1 text-body-xs text-neutral-500">
            Used for search, cards, and social preview text (max {EXCERPT_MAX_LENGTH} characters).
          </p>
          <textarea
            className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
            rows={3}
            maxLength={EXCERPT_MAX_LENGTH}
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-body-sm font-medium">Keywords (max {KEYWORD_SLOTS})</label>
          <p className="mt-1 text-body-xs text-neutral-500">
            Optional tags shown under the hero on the public article (same line style as site labels).
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {([0, 1, 2, 3] as const).map((i) => (
              <input
                key={i}
                type="text"
                maxLength={80}
                className="w-full rounded border border-neutral-300 px-3 py-2"
                placeholder={i === 0 ? 'e.g. Infrastructure' : `Keyword ${i + 1}`}
                value={form.keywords[i]}
                onChange={(e) =>
                  setForm((f) => {
                    const next: [string, string, string, string] = [...f.keywords]
                    next[i] = e.target.value
                    return { ...f, keywords: next }
                  })
                }
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-body-sm font-medium">Featured image</label>
          <p className="mt-1 text-body-xs text-neutral-500">
            Images are cropped to {FEATURED_IMAGE_WIDTH} × {FEATURED_IMAGE_HEIGHT} px before upload.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              disabled={uploadBusy || saving || Boolean(cropSession)}
              onChange={onFeaturedImageChange}
              className="text-body-sm text-neutral-700 file:mr-3 file:rounded file:border file:border-neutral-300 file:bg-white file:px-3 file:py-1.5"
            />
            {uploadBusy ? <span className="text-body-sm text-neutral-500">Uploading…</span> : null}
            {pendingImageFile ? (
              <button
                type="button"
                onClick={clearPendingImage}
                className="text-body-sm text-neutral-600 underline hover:text-neutral-900"
              >
                Remove selected file
              </button>
            ) : null}
          </div>
          <details className="mt-3">
            <summary className="cursor-pointer text-body-xs font-medium text-neutral-600">
              Paste image URL instead
            </summary>
            <input
              className="mt-2 w-full rounded border border-neutral-300 px-3 py-2"
              value={form.image_url}
              onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
              placeholder="https://… or /images/blog/example.jpg"
              disabled={Boolean(pendingImageFile && isNew)}
            />
            {pendingImageFile && isNew ? (
              <p className="mt-1 text-body-xs text-neutral-500">
                Clear the selected file above to edit the URL, or saving will upload the file.
              </p>
            ) : null}
          </details>
          {previewSrc ? (
            <img
              src={previewSrc}
              alt=""
              className="mt-3 max-h-48 max-w-full rounded border border-neutral-200 object-contain"
            />
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-body-sm font-medium">Author (display)</label>
            <input
              className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
              value={form.author_name}
              onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-body-sm font-medium">City</label>
            <input
              className="mt-1 w-full rounded border border-neutral-300 px-3 py-2"
              value={form.location_label}
              onChange={(e) => setForm((f) => ({ ...f, location_label: e.target.value }))}
              placeholder="Global"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-body-sm font-medium">Body</label>
          <AdminArticleBodyEditor
            instanceKey={isNew ? 'new' : (id ?? 'edit')}
            articleId={isNew ? null : (id ?? null)}
            value={form.body_html}
            onChange={(html) => setForm((f) => ({ ...f, body_html: html }))}
            disabled={saving || uploadBusy}
          />
          <p className="mt-2 text-body-xs text-neutral-500">
            Rich text and <strong className="font-medium text-neutral-700">Source</strong> (&lt;/&gt;) for raw HTML.
            Custom classes (e.g. <code className="rounded bg-neutral-100 px-1">article-rich</code>) are easiest to
            keep in Source mode. Use <code className="rounded bg-neutral-100 px-1">__LOCALE__</code> in links; it is
            replaced with the visitor&apos;s locale on the public site. Uploaded body images are scaled to fit up to{' '}
            {ARTICLE_BODY_IMAGE_MAX_W}×{ARTICLE_BODY_IMAGE_MAX_H} px without changing aspect ratio (save the article
            first to enable uploads on a new draft).
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
          disabled={saving || uploadBusy || Boolean(cropSession)}
          className="rounded-lg bg-neutral-900 px-6 py-2.5 font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
        >
          {saving ? 'Saving…' : isNew ? 'Create' : 'Save changes'}
        </button>
      </form>
      {cropSession ? (
        <AdminFeaturedImageCropModal
          imageSrc={cropSession.src}
          originalName={cropSession.name}
          onCancel={closeCropSession}
          onComplete={onCroppedFeaturedImage}
        />
      ) : null}
    </div>
  )
}
