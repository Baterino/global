import { Link } from 'react-router-dom'

export function AdminDashboard() {
  return (
    <div>
      <h1 className="font-publicSans text-2xl font-bold text-neutral-900">Dashboard</h1>
      <p className="mt-2 max-w-xl text-body-md text-neutral-600">
        Create and publish insights (blog) articles and use-case projects. Public pages merge CMS content with
        existing static entries.
      </p>
      <ul className="mt-8 flex flex-col gap-3 text-body-md">
        <li>
          <Link to="/admin/articles" className="font-semibold text-[#10064B] hover:underline">
            Blog articles →
          </Link>
        </li>
        <li>
          <Link to="/admin/use-cases" className="font-semibold text-[#10064B] hover:underline">
            Use cases →
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="font-semibold text-[#10064B] hover:underline">
            Users (admins only) →
          </Link>
        </li>
      </ul>
    </div>
  )
}
