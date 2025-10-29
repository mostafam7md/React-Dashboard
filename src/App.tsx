import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './routes'
import Login from './routes/Login'
import Dashboard from './routes/Dashboard'
import UsersList from './routes/users/UsersList'
import UserDetail from './routes/users/UserDetail'
import Notes from './routes/notes/Notes'
import Analytics from './routes/analytics/Analytics'
import Weather from './routes/weather/Weather'
import ProtectedRoute from './routes/ProtectedRoute'

class ErrorBoundary extends React.Component<React.PropsWithChildren, { hasError: boolean }> {
  constructor(props: React.PropsWithChildren) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: unknown) { console.error('ErrorBoundary caught:', error) }
  render() {
    if (this.state.hasError) return (<div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-semibold mb-2">Something went wrong.</h1>
      <p className="text-gray-600 dark:text-slate-400">Try refreshing the page.</p></div>)
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/weather" element={<Weather />} />
        </Route>
        <Route path="*" element={<div className="p-6">Not Found</div>} />
      </Routes>
    </ErrorBoundary>
  )
}
