import { Router, type Response, type NextFunction } from 'express'
import multer from 'multer'
import { getPool } from '../db/pool.js'
import type { AuthedRequest } from '../auth/middleware.js'
import { requireAuth, canEditArticle, canEditUseCase } from '../auth/middleware.js'
import {
  isR2Configured,
  isR2PublicUrlMisconfiguredForBrowsers,
  publicUrlForKey,
  uniqueObjectKey,
  uploadPublicImage,
} from '../storage/r2.js'

export const adminMediaRouter = Router()
adminMediaRouter.use(requireAuth)

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    const mime = file.mimetype?.toLowerCase() ?? ''
    if (
      mime === 'image/jpeg' ||
      mime === 'image/png' ||
      mime === 'image/webp' ||
      mime === 'image/gif' ||
      mime === 'image/avif'
    ) {
      cb(null, true)
      return
    }
    cb(new Error('invalid_file_type'))
  },
})

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const PROJECT_ID_RE = /^[A-Za-z0-9._-]{1,80}$/

adminMediaRouter.post('/upload', upload.single('file'), async (req: AuthedRequest, res: Response) => {
  if (!isR2Configured()) {
    res.status(503).json({ ok: false, code: 'r2_not_configured' })
    return
  }
  if (isR2PublicUrlMisconfiguredForBrowsers()) {
    res.status(503).json({
      ok: false,
      code: 'r2_public_url_invalid',
      message:
        'R2_PUBLIC_URL on the API must be the bucket public hostname (https://pub-….r2.dev or your media domain), not *.r2.cloudflarestorage.com. See Cloudflare R2 → bucket → Public access.',
    })
    return
  }

  const kind = typeof req.body?.kind === 'string' ? req.body.kind.trim() : ''
  const entityId = typeof req.body?.entityId === 'string' ? req.body.entityId.trim() : ''
  const file = req.file

  if (!file || !file.buffer?.length) {
    res.status(400).json({ ok: false, code: 'file_required' })
    return
  }

  if (kind !== 'article' && kind !== 'use-case') {
    res.status(400).json({ ok: false, code: 'invalid_kind' })
    return
  }

  if (!entityId) {
    res.status(400).json({ ok: false, code: 'entity_id_required' })
    return
  }

  try {
    let keyPrefix: string

    if (kind === 'article') {
      if (!UUID_RE.test(entityId)) {
        res.status(400).json({ ok: false, code: 'invalid_article_id' })
        return
      }
      const pool = getPool()
      const { rows } = await pool.query<{ author_id: string | null }>(
        `SELECT author_id FROM blog_articles WHERE id = $1::uuid`,
        [entityId],
      )
      const row = rows[0]
      if (!row) {
        res.status(404).json({ ok: false, code: 'not_found' })
        return
      }
      if (!canEditArticle(req.user, row.author_id)) {
        res.status(403).json({ ok: false, code: 'forbidden' })
        return
      }
      keyPrefix = `articles/${entityId}`
    } else {
      if (!PROJECT_ID_RE.test(entityId)) {
        res.status(400).json({ ok: false, code: 'invalid_project_id' })
        return
      }
      const pool = getPool()
      const { rows } = await pool.query<{ author_id: string | null }>(
        `SELECT author_id FROM use_case_projects WHERE project_id = $1`,
        [entityId],
      )
      const row = rows[0]
      if (!row) {
        res.status(404).json({ ok: false, code: 'not_found' })
        return
      }
      if (!canEditUseCase(req.user, row.author_id)) {
        res.status(403).json({ ok: false, code: 'forbidden' })
        return
      }
      keyPrefix = `use-cases/${entityId}`
    }

    const objectKey = uniqueObjectKey(keyPrefix, file.originalname || 'image', file.mimetype)
    await uploadPublicImage(objectKey, file.buffer, file.mimetype)
    let url: string
    try {
      url = publicUrlForKey(objectKey)
    } catch (err) {
      const hint = err instanceof Error ? err.message : String(err)
      console.error('[admin/media upload] invalid R2_PUBLIC_URL:', hint)
      res.status(503).json({ ok: false, code: 'r2_public_url_invalid', message: hint })
      return
    }
    res.status(201).json({ ok: true, url, key: objectKey })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg === 'invalid_file_type' || msg.startsWith('unsupported_type:')) {
      res.status(400).json({ ok: false, code: 'invalid_file_type' })
      return
    }
    console.error('[admin/media upload]', e)
    res.status(503).json({ ok: false, code: 'upload_failed' })
  }
})

adminMediaRouter.use((err: unknown, _req: AuthedRequest, res: Response, next: NextFunction) => {
  if (err && typeof err === 'object' && 'code' in err) {
    const code = (err as { code: string }).code
    if (code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ ok: false, code: 'file_too_large' })
      return
    }
  }
  if (err instanceof Error && err.message === 'invalid_file_type') {
    res.status(400).json({ ok: false, code: 'invalid_file_type' })
    return
  }
  next(err)
})
