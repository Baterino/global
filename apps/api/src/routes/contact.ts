import { Router, type Request, type Response } from 'express'
import { processContactPost } from '../contact/processContactPost.js'

export type { ContactSubmission } from '../contact/processContactPost.js'

export const contactRouter = Router()

contactRouter.post('/contact', async (req: Request, res: Response) => {
  const result = await processContactPost(req.body)
  res.status(result.status).json(result.body)
})
