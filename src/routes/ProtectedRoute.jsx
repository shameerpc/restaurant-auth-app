import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  // Wait while authentication is restored
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="
            h-8
            w-8
            animate-spin
            rounded-full
            border-4
            border-gray-200
            border-t-red-600
          "
        />
      </div>
    )
  }

  // Not authenticated → login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute