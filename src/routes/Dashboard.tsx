import { Link } from 'react-router-dom'
import Card from '../components/Card'

const tiles = [
  { title: 'User & Posts Manager', desc: 'Browse users, view posts, manage to-dos.', href: '/users', icon: '👤' },
  { title: 'Notes', desc: 'Create, categorize, and persist personal notes.', href: '/notes', icon: '🗒️' },
  { title: 'Analytics', desc: 'Quick stats from users, posts, and to-dos.', href: '/analytics', icon: '📊' },
  { title: 'Weather', desc: 'Search city weather or use your location.', href: '/weather', icon: '⛅' },
]

export default function Dashboard() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {tiles.map((t) => (
        <Card key={t.title} className="group">
          <div className="flex items-start gap-4">
            <div className="text-3xl select-none">{t.icon}</div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{t.title}</h2>
              <p className="text-gray-600 dark:text-slate-400 mb-4">{t.desc}</p>
              <Link to={t.href} className="btn btn-primary">Open</Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
