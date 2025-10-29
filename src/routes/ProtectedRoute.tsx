import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/auth'
type Props = { children: React.ReactElement }
export default function ProtectedRoute({ children }: Props) {
  const { state } = useAuth()
  const location = useLocation()
  if (!state.isAuthenticated) return <Navigate to="/" replace state={{ from: location }} />
  return children
}
