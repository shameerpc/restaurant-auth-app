import { render } from '@testing-library/react'

import App from '../App'
import { AuthProvider } from '../context/AuthProvider'
import { MOCK_CREDENTIALS } from '../services/mockAuthService'

export const SESSION_STORAGE_KEY = 'hushLushAuth'

export const MOCK_SESSION = {
  isAuthenticated: true,
  user: {
    id: 'user-001',
    name: MOCK_CREDENTIALS.name,
    email: MOCK_CREDENTIALS.email,
    type: 'user',
  },
}

export const storeSession = (
  session = MOCK_SESSION,
) =>
  window.localStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify(session),
  )

/**
 * Renders the real application at a given route.
 * `App` owns the router, so the route is set through the browser
 * history API rather than by nesting another router.
 */
export const renderApp = ({
  route = '/login',
  session,
} = {}) => {
  window.history.pushState({}, '', route)

  if (session) {
    storeSession(session)
  }

  return render(
    <AuthProvider>
      <App />
    </AuthProvider>,
  )
}