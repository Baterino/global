import type { VercelRequest, VercelResponse } from '@vercel/node'
import { processContactPost } from './processContactPost.js'

/**
 * Vercel serverless: POST /api/contact
 * Env: RESEND_API_KEY / RESEND_FROM_EMAIL, or SMTP_*, CONTACT_TO_EMAIL, etc.
 */
export default async function vercelContactHandler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).setHeader('Allow', 'POST').json({ ok: false, code: 'method_not_allowed' })
  }

  try {
    const result = await processContactPost(req.body)
    return res.status(result.status).json(result.body)
  } catch (err) {
    console.error('[api/contact]', err)
    return res.status(500).json({ ok: false, code: 'send_failed' })
  }
}
