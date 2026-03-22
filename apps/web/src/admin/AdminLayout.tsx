import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { adminMe, clearAdminToken, type AdminUser } from '../lib/adminApi'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-lg px-3 py-2 text-body-sm font-medium ${isActive ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'}`

export function AdminLayout() {
  const navigate = useNavigate()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const u = await adminMe()
        if (!cancelled) setUser(u)
      } catch {
        if (!cancelled) {
          clearAdminToken()
          navigate(`/admin/login?next=${encodeURIComponent('/admin')}`, { replace: true })
        }
      } finally {
        if (!cancelled) setReady(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [navigate])

  function logout() {
    clearAdminToken()
    navigate('/admin/login', { replace: true })
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-neutral-500">Loading…</div>
    )
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="w-56 shrink-0 border-r border-neutral-200 bg-white p-4">
        <div className="mb-6 font-publicSans text-lg font-bold text-neutral-900">CMS</div>
        <nav className="flex flex-col gap-1">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/articles" className={linkClass}>
            Blog articles
          </NavLink>
          <NavLink to="/admin/use-cases" className={linkClass}>
            Use cases
          </NavLink>
          {user.role === 'admin' ? (
            <NavLink to="/admin/users" className={linkClass}>
              Users
            </NavLink>
          ) : null}
        </nav>
        <div className="mt-8 border-t border-neutral-200 pt-4 text-body-xs text-neutral-500">
          <div className="font-medium text-neutral-800">{user.username}</div>
          <div className="capitalize">{user.role}</div>
          <button
            type="button"
            onClick={logout}
            className="mt-3 text-body-sm text-red-600 hover:underline"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        <Outlet context={user} />
      </main>
    </div>
  )
}
