import { Navigate } from 'react-router-dom'
import { useAuth } from '../services/AuthContext'

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center py-20">
          <div className="spinner mb-4">
            <i className="fas fa-spinner fa-spin text-4xl text-black"></i>
          </div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
