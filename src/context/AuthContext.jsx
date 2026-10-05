import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const TEST_USER = {
  email: 'test@hushlush.com',
  password: '123456',
  name: 'Test User',
}

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Restore authentication after page refresh
  useEffect(() => {
    const storedAuth = localStorage.getItem('hushLushAuth')

    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth)

        if (authData?.isAuthenticated) {
          setUser(authData.user)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Failed to restore authentication:', error)
        localStorage.removeItem('hushLushAuth')
      }
    }

    setIsLoading(false)
  }, [])

  // Login
  const login = async (email, password) => {
    await delay(1000)

    const normalizedEmail = email.trim().toLowerCase()

    if (
      normalizedEmail !== TEST_USER.email ||
      password !== TEST_USER.password
    ) {
      throw new Error('Invalid email or password')
    }

    const loggedInUser = {
      id: 'user-001',
      name: TEST_USER.name,
      email: TEST_USER.email,
      type: 'user',
    }

    const authData = {
      isAuthenticated: true,
      user: loggedInUser,
    }

    localStorage.setItem(
      'hushLushAuth',
      JSON.stringify(authData)
    )

    setUser(loggedInUser)
    setIsAuthenticated(true)

    return loggedInUser
  }

  // Guest login
  const loginAsGuest = async () => {
    await delay(700)

    const guestUser = {
      id: 'guest-001',
      name: 'Guest',
      type: 'guest',
    }

    const authData = {
      isAuthenticated: true,
      user: guestUser,
    }

    localStorage.setItem(
      'hushLushAuth',
      JSON.stringify(authData)
    )

    setUser(guestUser)
    setIsAuthenticated(true)

    return guestUser
  }

  // Logout
  const logout = () => {
    localStorage.removeItem('hushLushAuth')

    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    loginAsGuest,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    )
  }

  return context
}