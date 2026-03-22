import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { adminDeleteUseCase, adminListUseCases, type UseCaseRow } from '../lib/adminApi'

export function AdminUseCases() {
  const [rows, setRows] = useState<UseCaseRow[]>([])
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)

  async function load() {
    setErr('')
    try {
      setRows(await adminListUseCases())
    } catch {
      setErr('Could not load use cases.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function remove(projectId: string) {
    if (!confirm('Delete this use case?')) return
    try {
      await adminDeleteUseCase(projectId)
      await load()
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed.')
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-publicSans text-2xl font-bold text-neutral-900">Use cases</h1>
        <Link
          to="/admin/use-cases/new"
          className="rounded-lg bg-neutral-900 px-4 py-2 text-body-sm font-semibold text-white hover:bg-neutral-800"
        >
          New use case
        </Link>
      </div>
      {loading ? <p className="mt-6 text-neutral-500">Loading…</p> : null}
      {err ? <p className="mt-6 text-red-600">{err}</p> : null}
      <div className="mt-6 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
        <table className="w-full text-left text-body-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th className="p-3 font-semibold">ID</th>
              <th className="p-3 font-semibold">Title</th>
              <th className="p-3 font-semibold">Sector</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.project_id} className="border-b border-neutral-100">
                <td className="p-3 font-mono text-body-xs">{r.project_id}</td>
                <td className="p-3 font-medium">{r.title}</td>
                <td className="p-3">{r.sector}</td>
                <td className="p-3 capitalize">{r.status}</td>
                <td className="p-3 text-right">
                  <Link
                    to={`/admin/use-cases/${encodeURIComponent(r.project_id)}`}
                    className="mr-3 text-[#10064B] hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(r.project_id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && rows.length === 0 ? (
          <p className="p-6 text-center text-neutral-500">No database use cases yet (static projects still show on site).</p>
        ) : null}
      </div>
    </div>
  )
}
