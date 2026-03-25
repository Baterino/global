import 'dotenv/config'
import dns from 'node:dns'
import express from 'express'
import cors from 'cors'
import { greetingRouter } from './routes/greeting.js'
import { contactRouter } from './routes/contact.js'
import { hasDatabase } from './db/pool.js'
import { adminAuthRouter } from './routes/adminAuth.js'
import { adminUsersRouter } from './routes/adminUsers.js'
import { adminArticlesRouter } from './routes/adminArticles.js'
import { adminUseCasesRouter } from './routes/adminUseCases.js'
import { adminMediaRouter } from './routes/adminMedia.js'
import { publicContentRouter } from './routes/publicContent.js'
import { hasResend } from './contact/resendChannel.js'
import { isR2Configured } from './storage/r2.js'

/** Prefer IPv4 for outbound connections (e.g. SMTP) — many PaaS networks have no IPv6 egress (ENETUNREACH). */
dns.setDefaultResultOrder('ipv4first')

const app = express()
const PORT = process.env.PORT ?? 3001

app.get(['/', '/health'], (_req, res) => {
  res.status(200).json({ ok: true })
})

app.use(cors({ origin: true }))
app.use(express.json({ limit: '2mb' }))
app.use('/api', greetingRouter)
app.use('/api', contactRouter)

if (hasDatabase()) {
  try {
    app.use('/api/public', publicContentRouter)
    if (process.env.JWT_SECRET?.trim()) {
      app.use('/api/admin', adminAuthRouter)
      app.use('/api/admin/users', adminUsersRouter)
      app.use('/api/admin/articles', adminArticlesRouter)
      app.use('/api/admin/use-cases', adminUseCasesRouter)
      app.use('/api/admin/media', adminMediaRouter)
      console.log('[api] CMS enabled: /api/public/* and /api/admin/*')
      if (!isR2Configured()) {
        console.warn('[api] R2 media uploads disabled — set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL')
      }
    } else {
      console.warn('[api] JWT_SECRET missing — public content API active; admin login disabled until JWT_SECRET is set.')
    }
  } catch (e) {
    console.error('[api] Failed to register CMS routes', e)
  }
} else {
  console.warn('[api] DATABASE_URL not set — CMS disabled. Contact API still active.')
}

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
  const smtpConfigured = Boolean(
    process.env.SMTP_HOST?.trim() && process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim(),
  )
  if (process.env.NODE_ENV === 'production' && smtpConfigured && !hasResend()) {
    console.warn(
      '[api] Contact mail will use SMTP, but RESEND_API_KEY is unset. Many hosts (e.g. Railway Hobby) block outbound SMTP (ETIMEDOUT); set RESEND_API_KEY + RESEND_FROM_EMAIL to use HTTPS delivery.',
    )
  }
})
