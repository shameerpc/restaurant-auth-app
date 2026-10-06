/**
 * Mock authentication service.
 *
 * Simulates a backend auth API so the UI can be developed against a real
 * async interface (loading states, failures, persistence) without a server.
 * Swap these functions for real `fetch` calls to connect a backend.
 */

export const MOCK_CREDENTIALS = Object.freeze({
  email: 'test@hushlush.com',
  password: '123456',
  name: 'Test User',
})

const AUTH_REQUEST_DELAY_MS = 1000
const GUEST_REQUEST_DELAY_MS = 700
const SESSION_RESTORE_DELAY_MS = 300

const SESSION_STORAGE_KEY = 'hushLushAuth'

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))

const storeSession = (user) => {
  localStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify({
      isAuthenticated: true,
      user,
    }),
  )
}

export const clearStoredSession = () => {
  localStorage.removeItem(SESSION_STORAGE_KEY)
}

const readStoredSession = () => {
  const storedSession = localStorage.getItem(SESSION_STORAGE_KEY)

  if (!storedSession) return null

  try {
    const parsedSession = JSON.parse(storedSession)

    if (!parsedSession?.isAuthenticated || !parsedSession.user) {
      return null
    }

    return parsedSession.user
  } catch {
    // A corrupted session should never break the app.
    clearStoredSession()

    return null
  }
}

export const restoreSession = async () => {
  await delay(SESSION_RESTORE_DELAY_MS)

  return readStoredSession()
}

export const authenticate = async (email, password) => {
  await delay(AUTH_REQUEST_DELAY_MS)

  const isValid =
    email.trim().toLowerCase() === MOCK_CREDENTIALS.email &&
    password === MOCK_CREDENTIALS.password

  if (!isValid) {
    throw new Error('Invalid email or password')
  }

  const user = {
    id: 'user-001',
    name: MOCK_CREDENTIALS.name,
    email: MOCK_CREDENTIALS.email,
    type: 'user',
  }

  storeSession(user)

  return user
}

export const authenticateAsGuest = async () => {
  await delay(GUEST_REQUEST_DELAY_MS)

  const guestUser = {
    id: 'guest-001',
    name: 'Guest',
    type: 'guest',
  }

  storeSession(guestUser)

  return guestUser
}