import jwt, { type Secret } from 'jsonwebtoken'

export type UserRole = 'admin' | 'contributor'

export type JwtPayload = {
  sub: string
  username: string
  role: UserRole
}

const ISS = 'baterino-api'

function secret(): string {
  const s = process.env.JWT_SECRET?.trim()
  if (!s) {
    throw new Error('JWT_SECRET is not set')
  }
  return s
}

export function signToken(payload: JwtPayload, expiresIn: string = '7d'): string {
  const body = { sub: payload.sub, username: payload.username, role: payload.role }
  return jwt.sign(body, secret() as Secret, { expiresIn, issuer: ISS } as jwt.SignOptions)
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, secret() as Secret, { issuer: ISS }) as jwt.JwtPayload & JwtPayload
  if (!decoded.sub || !decoded.username || !decoded.role) {
    throw new Error('invalid_token')
  }
  if (decoded.role !== 'admin' && decoded.role !== 'contributor') {
    throw new Error('invalid_token')
  }
  return { sub: decoded.sub, username: decoded.username, role: decoded.role }
}
