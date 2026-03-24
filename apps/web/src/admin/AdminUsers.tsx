import { useEffect, useState } from 'react'
import { Navigate, useOutletContext } from 'react-router-dom'
import {
  adminCreateUser,
  adminDeleteUser,
  adminListUsers,
  adminPatchUserRole,
  type AdminUser,
  type UserRow,
} from '../lib/adminApi'

export function AdminUsers() {
  const user = useOutletContext<AdminUser>()
  const [rows, setRows] = useState<UserRow[]>([])
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  const [nu, setNu] = useState({ username: '', password: '', role: 'contributor' as 'admin' | 'contributor' })

  if (user.role !== 'admin') {
    return <Navigate to="/admin" replace />
  }

  async function load() {
    setErr('')
    try {
      setRows(await adminListUsers())
    } catch {
      setErr('Could not load users.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function createUser(e: React.FormEvent) {
    e.preventDefault()
    try {
      await adminCreateUser(nu)
      setNu({ username: '', password: '', role: 'contributor' })
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed')
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this user?')) return
    try {
      await adminDeleteUser(id)
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed')
    }
  }

  async function setRole(id: string, role: 'admin' | 'contributor') {
    try {
      await adminPatchUserRole(id, role)
      await load()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed')
    }
  }

  return (
    <div>
      <h1 className="font-publicSans text-2xl font-bold text-neutral-900">Users</h1>
      <p className="mt-2 max-w-xl text-body-sm text-neutral-600">
        Admins can create contributors or other admins. Contributors can manage articles and use cases but not users.
      </p>

      <form
        className="mt-8 max-w-lg space-y-3 rounded-lg border border-neutral-200 bg-white p-4"
        onSubmit={createUser}
      >
        <h2 className="font-semibold text-neutral-900">New user</h2>
        <input
          placeholder="Username"
          className="w-full rounded border border-neutral-300 px-3 py-2"
          value={nu.username}
          onChange={(e) => setNu((n) => ({ ...n, username: e.target.value }))}
          required
        />
        <input
          type="password"
          placeholder="Password (min 8 chars)"
          className="w-full rounded border border-neutral-300 px-3 py-2"
          value={nu.password}
          onChange={(e) => setNu((n) => ({ ...n, password: e.target.value }))}
          required
          minLength={8}
        />
        <select
          className="w-full rounded border border-neutral-300 px-3 py-2"
          value={nu.role}
          onChange={(e) =>
            setNu((n) => ({ ...n, role: e.target.value as 'admin' | 'contributor' }))
          }
        >
          <option value="contributor">Contributor</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="rounded bg-neutral-900 px-4 py-2 text-body-sm font-semibold text-white">
          Create user
        </button>
      </form>

      {loading ? <p className="mt-6 text-neutral-500">Loading…</p> : null}
      {err ? <p className="mt-6 text-red-600">{err}</p> : null}

      <div className="mt-8 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-left text-body-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th className="p-3 font-semibold">Username</th>
              <th className="p-3 font-semibold">Role</th>
              <th className="p-3 font-semibold">Created</th>
              <th className="p-3 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-neutral-100">
                <td className="p-3 font-medium">{r.username}</td>
                <td className="p-3">
                  <select
                    className="rounded border border-neutral-300 px-2 py-1"
                    value={r.role}
                    onChange={(e) => setRole(r.id, e.target.value as 'admin' | 'contributor')}
                  >
                    <option value="contributor">contributor</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="p-3 text-neutral-600">{new Date(r.created_at).toLocaleString()}</td>
                <td className="p-3 text-right">
                  {r.id === user.id ? (
                    <span className="text-neutral-400">You</span>
                  ) : (
                    <button type="button" onClick={() => remove(r.id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
