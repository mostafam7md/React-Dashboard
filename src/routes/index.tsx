import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { useTheme } from '../context/theme'

export default function Layout() {
  const { state, logout } = useAuth()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()

  const onLogout = () => { logout(); navigate('/') }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    'px-3 py-2 rounded-md text-sm font-medium ' +
    (isActive
      ? 'bg-brand-50 text-brand-800 dark:bg-slate-800 dark:text-white'
      : 'text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800')

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur dark:bg-slate-900/80 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/dashboard" className="text-lg font-semibold text-brand-700 dark:text-brand-400">React Dashboard</Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/dashboard" className={navLinkClass}>Home</NavLink>
            <NavLink to="/users" className={navLinkClass}>Users</NavLink>
            <NavLink to="/notes" className={navLinkClass}>Notes</NavLink>
            <NavLink to="/analytics" className={navLinkClass}>Analytics</NavLink>
            <NavLink to="/weather" className={navLinkClass}>Weather</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle theme" className="btn btn-ghost rounded-full px-3 py-2">
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
            <span className="hidden sm:inline text-sm text-gray-700 dark:text-slate-300">
              Signed in as <b>{state.username}</b>
            </span>
            <button onClick={onLogout} className="btn btn-primary">Logout</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t py-6 text-center text-sm text-gray-500 dark:text-slate-400 dark:border-slate-800">
        Built with React • TanStack Query • Tailwind
      </footer>
    </div>
  )
}
