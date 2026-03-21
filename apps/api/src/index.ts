import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { greetingRouter } from './routes/greeting.js'
import { contactRouter } from './routes/contact.js'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: true }))
app.use(express.json({ limit: '64kb' }))
app.use('/api', greetingRouter)
app.use('/api', contactRouter)

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
})
