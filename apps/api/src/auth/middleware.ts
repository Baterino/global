import type { Request, Response, NextFunction } from 'express'
import { verifyToken, type JwtPayload } from './jwt.js'

export type AuthedRequest = Request & { user?: JwtPayload }

function bearerToken(req: Request): string | null {
  const h = req.headers.authorization
  if (!h?.startsWith('Bearer ')) return null
  return h.slice(7).trim() || null
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): void {
  const token = bearerToken(req)
  if (!token) {
    res.status(401).json({ ok: false, code: 'unauthorized' })
    return
  }
  try {
    req.user = verifyToken(token)
    next()
  } catch {
    res.status(401).json({ ok: false, code: 'invalid_token' })
  }
}

export function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction): void {
  if (req.user?.role !== 'admin') {
    res.status(403).json({ ok: false, code: 'forbidden' })
    return
  }
  next()
}

export function canDeleteArticle(user: JwtPayload | undefined, authorId: string | null): boolean {
  if (!user) return false
  if (user.role === 'admin') return true
  return authorId !== null && authorId === user.sub
}

export function canDeleteUseCase(user: JwtPayload | undefined, authorId: string | null): boolean {
  return canDeleteArticle(user, authorId)
}

/** Same rules as delete: admins or owning author may edit / upload media. */
export function canEditArticle(user: JwtPayload | undefined, authorId: string | null): boolean {
  return canDeleteArticle(user, authorId)
}

export function canEditUseCase(user: JwtPayload | undefined, authorId: string | null): boolean {
  return canDeleteUseCase(user, authorId)
}
