import React from 'react'
import { Link } from 'react-router-dom'
import { useUsers } from '../../hooks/useApi'

const UsersCard: React.FC = () => {
  const { data, isLoading, error } = useUsers()

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <h2 className="font-semibold mb-2">Users & Posts Manager</h2>
      <p className="text-xs text-slate-500 mb-3">
        Click a user to open their posts and to-dos.
      </p>
      {isLoading && <p className="text-sm">Loading users...</p>}
      {error && (
        <p className="text-sm text-red-600">Error loading users. Try again.</p>
      )}
      <ul className="space-y-1 flex-1 overflow-auto">
        {data?.map((user) => (
          <li key={user.id}>
            <Link
              to={`/users/${user.id}`}
              className="text-sm px-2 py-1 rounded block hover:bg-slate-100"
            >
              {user.name} <span className="text-xs text-slate-500">
                ({user.username})
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/dashboard"
        className="mt-3 text-[11px] text-slate-500 self-end"
      >
        Back to dashboard
      </Link>
    </div>
  )
}

export default UsersCard
