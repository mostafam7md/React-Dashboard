import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { logout } = useAuth()
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard" className="font-semibold text-lg">
           Dashboard
        </Link>
        <button
          onClick={logout}
          className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </header>
      <main className="flex-1 px-4 py-6 max-w-6xl w-full mx-auto">
        {children}
      </main>
    </div>
  )
}

export default Layout
