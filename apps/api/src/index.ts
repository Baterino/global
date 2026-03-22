import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { greetingRouter } from './routes/greeting.js'
import { contactRouter } from './routes/contact.js'
import { hasDatabase } from './db/pool.js'
import { adminAuthRouter } from './routes/adminAuth.js'
import { adminUsersRouter } from './routes/adminUsers.js'
import { adminArticlesRouter } from './routes/adminArticles.js'
import { adminUseCasesRouter } from './routes/adminUseCases.js'
import { publicContentRouter } from './routes/publicContent.js'

const app = express()
const PORT = process.env.PORT ?? 3001

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
      console.log('[api] CMS enabled: /api/public/* and /api/admin/*')
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
})
