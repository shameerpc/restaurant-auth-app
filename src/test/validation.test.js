import { describe, expect, it } from 'vitest'

import { validateLogin } from '../utils/validation'

describe('validateLogin', () => {
  it('requires an email address', () => {
    const errors = validateLogin('', '123456')

    expect(errors.email).toBe('Email is required')
    expect(errors.password).toBeUndefined()
  })

  it('treats a whitespace-only email as missing', () => {
    const errors = validateLogin('   ', '123456')

    expect(errors.email).toBe('Email is required')
  })

  it('rejects a malformed email address', () => {
    const errors = validateLogin(
      'not-an-email',
      '123456',
    )

    expect(errors.email).toBe(
      'Please enter a valid email address',
    )
  })

  it.each([
    ['missing-domain@com'],
    ['missing-tld@example'],
    ['spaced out@example.com'],
  ])(
    'rejects the invalid address %s',
    (email) => {
      expect(
        validateLogin(email, '123456').email,
      ).toBeDefined()
    },
  )

  it.each([
    'test@hushlush.com',
    'user.name+tag@sub.domain.co',
  ])('accepts the valid address %s', (email) => {
    expect(
      validateLogin(email, '123456').email,
    ).toBeUndefined()
  })

  it('requires a password', () => {
    const errors = validateLogin(
      'test@hushlush.com',
      '',
    )

    expect(errors.password).toBe(
      'Password is required',
    )
    expect(errors.email).toBeUndefined()
  })

  it('enforces a minimum password length of 6', () => {
    const errors = validateLogin(
      'test@hushlush.com',
      '12345',
    )

    expect(errors.password).toBe(
      'Password must be at least 6 characters',
    )
  })

  it('returns no errors for valid credentials', () => {
    expect(
      validateLogin('test@hushlush.com', '123456'),
    ).toEqual({})
  })

  it('reports both fields when both are invalid', () => {
    const errors = validateLogin('bad', '1')

    expect(errors.email).toBeDefined()
    expect(errors.password).toBeDefined()
  })
})