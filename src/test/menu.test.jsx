import {
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import {
  MOCK_SESSION,
  renderApp,
  SESSION_STORAGE_KEY,
} from './testUtils'

const LOGIN_TIMEOUT = 5000

const renderMenu = () =>
  renderApp({
    route: '/home',
    session: MOCK_SESSION,
  })

const waitForMenu = () =>
  screen.findByText('103 Black Pepper Chicken Chop', undefined, {
    timeout: LOGIN_TIMEOUT,
  })

const showAllCategories = async (user) => {
  await waitForMenu()

  await user.click(
    screen.getByRole('button', { name: 'For You' }),
  )

  await screen.findByText('Grilled Fish')
}

const selectCategory = async (user, category) => {
  await user.click(
    screen.getByRole('button', { name: category }),
  )
}

describe('Restaurant menu', () => {
  it('filters dishes by the selected category', async () => {
    const user = userEvent.setup()
    renderMenu()

    expect(
      await screen.findByText(
        '103 Black Pepper Chicken Chop',
      ),
    ).toBeInTheDocument()

    await selectCategory(user, 'Burger')

    await waitFor(() =>
      expect(
        screen.getByText('Classic Chicken Burger'),
      ).toBeInTheDocument(),
    )

    expect(
      screen.queryByText(
        '103 Black Pepper Chicken Chop',
      ),
    ).not.toBeInTheDocument()
  })

  it('searches across every category', async () => {
    const user = userEvent.setup()
    renderMenu()

    await showAllCategories(user)

    await user.click(
      screen.getByRole('button', { name: 'Search' }),
    )

    await user.type(
      screen.getByRole('searchbox', {
        name: 'Search food',
      }),
      'pizza',
    )

    await waitFor(() =>
      expect(
        screen.getByText('Margherita Pizza'),
      ).toBeInTheDocument(),
    )

    expect(
      screen.queryByText('Grilled Fish'),
    ).not.toBeInTheDocument()
  })

  it('shows an empty state when a search matches nothing', async () => {
    const user = userEvent.setup()
    renderMenu()

    await showAllCategories(user)

    await user.click(
      screen.getByRole('button', { name: 'Search' }),
    )

    await user.type(
      screen.getByRole('searchbox', {
        name: 'Search food',
      }),
      'no-such-dish',
    )

    expect(
      await screen.findByText(
        'No dishes match your search',
      ),
    ).toBeInTheDocument()
  })

  it('adds a dish to the cart and updates the item count', async () => {
    const user = userEvent.setup()
    renderMenu()

    await showAllCategories(user)

    expect(
      screen.queryByRole('button', {
        name: 'Open cart',
      }),
    ).not.toBeInTheDocument()

    await user.click(
      screen.getByRole('button', {
        name: 'Add Grilled Fish to cart',
      }),
    )

    expect(
      await screen.findByRole('button', {
        name: /Open cart/i,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByText('1 items in cart'),
    ).toBeInTheDocument()
  })

  it('opens the cart panel with the correct total', async () => {
    const user = userEvent.setup()
    renderMenu()

    await showAllCategories(user)

    await user.click(
      screen.getByRole('button', {
        name: 'Add Grilled Fish to cart',
      }),
    )

    await user.click(
      await screen.findByRole('button', {
        name: /Open cart/i,
      }),
    )

    const dialog = await screen.findByRole('dialog')

    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveTextContent('$12.00')
  })

  it('signs the user out from the account panel', async () => {
    const user = userEvent.setup()
    renderMenu()

    await showAllCategories(user)

    await user.click(
      screen.getByRole('button', { name: 'Account' }),
    )

    await user.click(
      await screen.findByRole('button', {
        name: 'Sign out',
      }),
    )

    expect(
      await screen.findByLabelText('Email'),
    ).toBeInTheDocument()

    expect(
      window.localStorage.getItem(SESSION_STORAGE_KEY),
    ).toBeNull()
  })
})