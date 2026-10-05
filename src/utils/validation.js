export const validateLogin = (email, password) => {
  const errors = {}

  if (!email.trim()) {
    errors.email = 'Email is required'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address'
    }
  }

  if (!password) {
    errors.password = 'Password is required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return errors
}