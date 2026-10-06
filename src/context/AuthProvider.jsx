import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { AuthContext } from './AuthContext'
import {
  authenticate,
  authenticateAsGuest,
  clearStoredSession,
  restoreSession,
} from '../services/mockAuthService'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    // Restores the session on reload, mirroring a token validation request.
    const initializeSession = async () => {
      const restoredUser = await restoreSession()

      if (!isActive) return

      if (restoredUser) {
        setUser(restoredUser)
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    initializeSession()

    return () => {
      isActive = false
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const loggedInUser = await authenticate(email, password)

    setUser(loggedInUser)
    setIsAuthenticated(true)

    return loggedInUser
  }, [])

  const loginAsGuest = useCallback(async () => {
    const guestUser = await authenticateAsGuest()

    setUser(guestUser)
    setIsAuthenticated(true)

    return guestUser
  }, [])

  const logout = useCallback(() => {
    clearStoredSession()

    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      loginAsGuest,
      logout,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      login,
      loginAsGuest,
      logout,
    ],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}