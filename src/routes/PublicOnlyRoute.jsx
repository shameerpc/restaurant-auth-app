import { Navigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import FullScreenLoader from '../components/FullScreenLoader'

/**
 * Keeps signed-in users away from the login screen so they are always
 * redirected to the restaurant menu.
 */
function PublicOnlyRoute({ children }) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth()

  if (isLoading) {
    return (
      <FullScreenLoader label="Restoring your session" />
    )
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/home"
        replace
      />
    )
  }

  return children
}

export default PublicOnlyRoute