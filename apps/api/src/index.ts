import express from 'express'
import cors from 'cors'
import { greetingRouter } from './routes/greeting.js'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: true }))
app.use(express.json())
app.use('/api', greetingRouter)

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`)
})
