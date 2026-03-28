import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { adminLogin, setAdminToken } from '../lib/adminApi'
import { EMAIL_REGEX, EMAIL_MESSAGE_FORBIDDEN, sanitizeContactEmailInput } from '../lib/contactValidation'
import { assetUrl } from '@/lib/assetUrl'

const HERO_SRC = assetUrl('/images/og-images/og-global-presence.jpg')
const HERO_CAPTION = 'Global presence, local delivery'

function BackChevron() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  )
}

export function AdminLogin() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const next = params.get('next') || '/admin'

  function validateUsername(value: string): string {
    const v = value.trim()
    if (!v) return 'Enter your email or username.'
    if (EMAIL_MESSAGE_FORBIDDEN.test(v)) return 'Email cannot contain <, >, or /.'
    if (v.includes('@') && !EMAIL_REGEX.test(v)) return 'Enter a valid email address.'
    return ''
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const uErr = validateUsername(username)
    if (uErr) {
      setError(uErr)
      return
    }
    setLoading(true)
    try {
      const { token } = await adminLogin(username.trim(), password)
      setAdminToken(token)
      navigate(next, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#121212] font-publicSans md:flex-row">
      {/* Hero — mobile top, desktop right */}
      <div className="relative h-44 shrink-0 md:order-2 md:h-auto md:flex-1">
        <img
          src={HERO_SRC}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 md:bg-gradient-to-l md:from-black/40 md:via-transparent md:to-transparent" />
        <p className="absolute bottom-4 right-4 max-w-[85%] text-right font-body text-body-xs italic text-white/85 md:bottom-8 md:right-8 md:text-body-sm">
          &ldquo;{HERO_CAPTION}&rdquo;
        </p>
      </div>

      {/* Login column */}
      <div className="flex flex-1 flex-col px-6 py-8 text-white sm:px-10 md:order-1 md:w-[min(100%,420px)] md:max-w-[38%] md:shrink-0 md:px-12 md:py-12 lg:max-w-[440px]">
        <div className="mb-8 flex items-center justify-start gap-3">
          <Link
            to="/"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Back to website"
          >
            <BackChevron />
          </Link>
          <img
            src={assetUrl('/images/baterino-logo-white.png')}
            alt="Baterino Global"
            className="h-8 w-auto shrink-0 object-contain sm:h-9"
          />
        </div>

        <form className="flex flex-1 flex-col space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="mb-2 block font-body text-body-sm font-medium text-white/90" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              autoComplete="username"
              placeholder="name@host.com"
              className="w-full rounded-lg border border-white/15 bg-white/[0.07] px-4 py-3 font-body text-body-md text-white placeholder:text-white/35 focus:border-white/35 focus:outline-none focus:ring-1 focus:ring-white/25"
              value={username}
              onChange={(e) => setUsername(sanitizeContactEmailInput(e.target.value).slice(0, 320))}
              required
            />
          </div>
          <div>
            <label className="mb-2 block font-body text-body-sm font-medium text-white/90" htmlFor="admin-pass">
              Password
            </label>
            <div className="relative">
              <input
                id="admin-pass"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className="w-full rounded-lg border border-white/15 bg-white/[0.07] py-3 pl-4 pr-[4.5rem] font-body text-body-md text-white placeholder:text-white/35 focus:border-white/35 focus:outline-none focus:ring-1 focus:ring-white/25"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 font-body text-body-xs font-medium text-white/60 hover:text-white"
                onClick={() => setShowPassword((v) => !v)}
                aria-pressed={showPassword}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {error ? (
            <p className="rounded-lg border border-red-500/40 bg-red-950/50 px-3 py-2 font-body text-body-sm text-red-200">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white/12 py-3 font-body text-body-md font-semibold text-white transition-colors hover:bg-white/18 disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Continue'}
          </button>
        </form>

        <footer className="mt-auto flex flex-wrap justify-center gap-x-6 gap-y-2 pt-10 font-body text-body-xs text-white/40">
          <Link to="/en/privacy-policy" className="hover:text-white/60">
            Privacy Policy
          </Link>
          <Link to="/en/terms-of-use" className="hover:text-white/60">
            Terms of Service
          </Link>
        </footer>
      </div>
    </div>
  )
}
