import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { adminLogin, setAdminToken } from '../lib/adminApi'

export function AdminLogin() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const next = params.get('next') || '/admin'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token } = await adminLogin(username.trim(), password)
      setAdminToken(token)
      navigate(next, { replace: true })
    } catch {
      setError('Invalid username or password, or CMS is unavailable.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="font-publicSans text-2xl font-bold text-neutral-900">Baterino Admin</h1>
        <p className="mt-1 text-body-sm text-neutral-600">Sign in to manage articles and use cases.</p>
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-body-sm font-medium text-neutral-700" htmlFor="user">
              Username
            </label>
            <input
              id="user"
              autoComplete="username"
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-body-md focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-body-sm font-medium text-neutral-700" htmlFor="pass">
              Password
            </label>
            <input
              id="pass"
              type="password"
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-body-md focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? <p className="text-body-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-neutral-900 py-2.5 font-body text-body-md font-semibold text-white hover:bg-neutral-800 disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
