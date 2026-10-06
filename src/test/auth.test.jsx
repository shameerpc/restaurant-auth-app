import {
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { MOCK_CREDENTIALS } from '../services/mockAuthService'
import {
  MOCK_SESSION,
  renderApp,
  SESSION_STORAGE_KEY,
} from './testUtils'

const LOGIN_TIMEOUT = 5000

const waitForLoginScreen = () =>
  screen.findByLabelText('Email', undefined, {
    timeout: LOGIN_TIMEOUT,
  })

const fillCredentials = async (
  user,
  email,
  password,
) => {
  await waitForLoginScreen()

  await user.clear(screen.getByLabelText('Email'))
  if (email) {
    await user.type(screen.getByLabelText('Email'), email)
  }

  await user.clear(screen.getByLabelText('Password'))
  if (password) {
    await user.type(screen.getByLabelText('Password'), password)
  }
}

const submitForm = async (user) => {
  await waitForLoginScreen()

  await user.click(
    screen.getByRole('button', { name: 'Submit' }),
  )
}

describe('Login validation', () => {
  it('shows an error when email and password are empty', async () => {
    const user = userEvent.setup()
    renderApp()

    await submitForm(user)

    expect(
      await screen.findByText('Email is required'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Password is required'),
    ).toBeInTheDocument()

    // No authentication request should be attempted.
    expect(
      window.localStorage.getItem(SESSION_STORAGE_KEY),
    ).toBeNull()
  })

  it('shows an error for a malformed email address', async () => {
    const user = userEvent.setup()
    renderApp()

    await fillCredentials(
      user,
      'not-an-email',
      '123456',
    )
    await submitForm(user)

    expect(
      await screen.findByText(
        'Please enter a valid email address',
      ),
    ).toBeInTheDocument()

    expect(
      screen.queryByText('Password is required'),
    ).not.toBeInTheDocument()
  })

  it('shows an error when the password is missing', async () => {
    const user = userEvent.setup()
    renderApp()

    await fillCredentials(
      user,
      MOCK_CREDENTIALS.email,
      '',
    )
    await submitForm(user)

    expect(
      await screen.findByText('Password is required'),
    ).toBeInTheDocument()
  })

  it('shows an error when the password is shorter than 6 characters', async () => {
    const user = userEvent.setup()
    renderApp()

    await fillCredentials(
      user,
      MOCK_CREDENTIALS.email,
      '123',
    )
    await submitForm(user)

    expect(
      await screen.findByText(
        'Password must be at least 6 characters',
      ),
    ).toBeInTheDocument()
  })

  it('clears a field error once the user types again', async () => {
    const user = userEvent.setup()
    renderApp()

    await submitForm(user)
    expect(
      await screen.findByText('Email is required'),
    ).toBeInTheDocument()

    await user.type(
      screen.getByLabelText('Email'),
      'a',
    )

    await waitFor(() =>
      expect(
        screen.queryByText('Email is required'),
      ).not.toBeInTheDocument(),
    )
  })

  it('shows a loading state while authenticating', async () => {
    const user = userEvent.setup()
    renderApp()

    await fillCredentials(
      user,
      MOCK_CREDENTIALS.email,
      MOCK_CREDENTIALS.password,
    )
    await submitForm(user)

    expect(
      await screen.findByText('Signing in...'),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /Signing in/ }),
    ).toBeDisabled()
  })
})

describe('Authentication', () => {
  it('signs in with the mock credentials and redirects to the menu', async () => {
    const user = userEvent.setup()
    renderApp()

    await fillCredentials(
      user,
      MOCK_CREDENTIALS.email,
      MOCK_CREDENTIALS.password,
    )
    await submitForm(user)

    expect(
      await screen.findByRole(
        'heading',
        { name: 'Welcome to Hush Lush' },
        { timeout: LOGIN_TIMEOUT },
      ),
    ).toBeInTheDocument()
  })

  it('accepts the email address regardless of case and padding', async () => {
    const user = userEvent.setup()
    renderApp()

    await fillCredentials(
      user,
      `  ${MOCK_CREDENTIALS.email.toUpperCase()}  `,
      MOCK_CREDENTIALS.password,
    )
    await submitForm(user)

    expect(
      await screen.findByRole(
        'heading',
        { name: 'Welcome to Hush Lush' },
        { timeout: LOGIN_TIMEOUT },
      ),
    ).toBeInTheDocument()
  })

  it('rejects incorrect credentials and stays on the login screen', async () => {
    const user = userEvent.setup()
    renderApp()

    await fillCredentials(
      user,
      MOCK_CREDENTIALS.email,
      'wrong-password',
    )
    await submitForm(user)

    expect(
      await screen.findByText(
        'Invalid email or password',
      ),
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText('Email'),
    ).toBeInTheDocument()

    expect(
      window.localStorage.getItem(SESSION_STORAGE_KEY),
    ).toBeNull()
  })
})

describe('Guest access', () => {
  it('signs in as a guest and reaches the menu', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(
      await screen.findByRole(
        'button',
        { name: 'Sign as Guest' },
        { timeout: LOGIN_TIMEOUT },
      ),
    )

    expect(
      await screen.findByRole(
        'heading',
        { name: 'Welcome to Hush Lush' },
        { timeout: LOGIN_TIMEOUT },
      ),
    ).toBeInTheDocument()

    const storedSession =
      window.localStorage.getItem(SESSION_STORAGE_KEY)

    expect(storedSession).toContain('guest')
  })
})

describe('Route protection', () => {
  it('redirects an unauthenticated visitor from /home to /login', async () => {
    renderApp({ route: '/home' })

    expect(
      await screen.findByLabelText('Email'),
    ).toBeInTheDocument()
  })

  it('redirects a signed-in visitor from /login to /home', async () => {
    renderApp({
      route: '/login',
      session: MOCK_SESSION,
    })

    expect(
      await screen.findByRole(
        'heading',
        { name: 'Welcome to Hush Lush' },
      ),
    ).toBeInTheDocument()
  })

  it('renders a 404 page for unknown routes', async () => {
    renderApp({ route: '/definitely-not-a-page' })

    expect(
      await screen.findByText('404'),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', {
        name: /Back to Menu/i,
      }),
    ).toHaveAttribute('href', '/home')
  })
})