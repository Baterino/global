import { Router, Request, Response } from 'express'
import { getGreetingMessage } from '../locales/greeting.js'

export const greetingRouter = Router()

greetingRouter.get('/greeting', (req: Request, res: Response) => {
  const acceptLanguage = req.headers['accept-language'] ?? 'en'
  const lang = acceptLanguage.startsWith('id') ? 'id' : 'en'
  const message = getGreetingMessage(lang)
  res.json({ message })
})
