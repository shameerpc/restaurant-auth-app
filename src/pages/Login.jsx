import {
  useState,
} from 'react'
import {
  Eye,
  EyeOff,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import {
  FacebookIcon,
  GoogleIcon,
  TelegramIcon,
} from '../components/SocialIcons'
import { useAuth } from '../context/AuthContext'
import { validateLogin } from '../utils/validation'
import logo from '../assets/hush-lush-logo.png'

const OUT_OF_SCOPE_HINT =
  'Not part of this technical assignment'

const SOCIAL_PROVIDERS = [
  {
    id: 'facebook',
    label: 'Continue with Facebook',
    Icon: FacebookIcon,
  },
  {
    id: 'telegram',
    label: 'Continue with Telegram',
    Icon: TelegramIcon,
  },
  {
    id: 'google',
    label: 'Continue with Google',
    Icon: GoogleIcon,
  },
]

function Login() {
  const navigate = useNavigate()

  const {
    login,
    loginAsGuest,
  } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGuestLoading, setIsGuestLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setAuthError('')

    const validationErrors = validateLogin(
      email,
      password,
    )

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      await login(email, password)
      navigate('/home')
    } catch (error) {
      setAuthError(
        error.message ||
          'Unable to login. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuestLogin = async () => {
    setAuthError('')
    setIsGuestLoading(true)

    try {
      await loginAsGuest()
      navigate('/home')
    } catch {
      setAuthError(
        'Unable to continue as guest. Please try again.',
      )
    } finally {
      setIsGuestLoading(false)
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)

    if (errors.email) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        email: '',
      }))
    }

    if (authError) setAuthError('')
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)

    if (errors.password) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        password: '',
      }))
    }

    if (authError) setAuthError('')
  }

  const handleTogglePasswordVisibility = () =>
    setShowPassword(
      (previousIsVisible) => !previousIsVisible,
    )

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-6 py-7 sm:px-8 sm:py-8 lg:py-9">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Hush Lush Advertising & Technologies"
            className="w-64 object-contain sm:w-72"
          />
        </div>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-center text-base font-medium leading-relaxed text-gray-500 sm:text-lg sm:leading-8">
          Warely Pass Grants Access to Log in at any of
          Our Partnered Restaurants.
        </p>

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-7 sm:mt-8"
        >
          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-lg font-semibold text-gray-800 sm:text-xl"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Mail ID"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email
                  ? 'email-error'
                  : undefined
              }
              className={`
                h-14
                w-full
                rounded-xl
                border-2
                bg-white
                px-4
                text-base
                text-gray-800
                outline-none
                transition-all
                duration-200
                placeholder:text-gray-400
                focus:border-[#E91B23]
                sm:h-[60px]
                sm:text-lg
                ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-gray-200'
                }
              `}
            />

            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="mt-2 text-sm font-medium text-red-500"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Password field */}
          <div className="mt-4">
            <label
              htmlFor="password"
              className="mb-2 block text-lg font-semibold text-gray-800 sm:text-xl"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={
                  showPassword ? 'text' : 'password'
                }
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password
                    ? 'password-error'
                    : undefined
                }
                className={`
                  h-14
                  w-full
                  rounded-xl
                  border-2
                  bg-white
                  px-4
                  pr-14
                  text-base
                  text-gray-800
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-gray-400
                  focus:border-[#E91B23]
                  sm:h-[60px]
                  sm:text-lg
                  ${
                    errors.password
                      ? 'border-red-500'
                      : 'border-gray-200'
                  }
                `}
              />

              <button
                type="button"
                onClick={
                  handleTogglePasswordVisibility
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
                aria-pressed={showPassword}
                className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
              >
                {showPassword ? (
                  <EyeOff size={24} />
                ) : (
                  <Eye size={24} />
                )}
              </button>
            </div>

            {errors.password && (
              <p
                id="password-error"
                role="alert"
                className="mt-2 text-sm font-medium text-red-500"
              >
                {errors.password}
              </p>
            )}
          </div>

          {/* Use Email ID Instead */}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              disabled
              title={OUT_OF_SCOPE_HINT}
              className="cursor-not-allowed text-sm font-medium text-[#E91B23] underline underline-offset-4 opacity-60"
            >
              Use Email-ID Instead
            </button>
          </div>

          {/* OR divider */}
          <div className="my-5 flex items-center">
            <div className="flex-1 border-t border-gray-200" />

            <span className="mx-4 text-sm font-semibold text-gray-400">
              OR
            </span>

            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="flex justify-center gap-5 sm:gap-7">
            {SOCIAL_PROVIDERS.map(
              ({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  disabled
                  title={OUT_OF_SCOPE_HINT}
                  aria-label={`${label} (not available)`}
                  className="flex h-14 w-14 cursor-not-allowed items-center justify-center rounded-xl border border-gray-200 bg-white opacity-70 sm:h-[68px] sm:w-[68px]"
                >
                  <Icon />
                </button>
              ),
            )}
          </div>

          {/* Terms */}
          <p className="mt-5 text-sm font-medium leading-7 text-gray-600 sm:text-base sm:leading-8">
            By ordering, You have Read and Agreement to
            Our{' '}
            <span className="text-[#E91B23] underline underline-offset-2">
              Terms of Use
            </span>{' '}
            and{' '}
            <span className="text-[#E91B23] underline underline-offset-2">
              Privacy Policy
            </span>
          </p>

          {/* Authentication error */}
          {authError && (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600"
            >
              {authError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 flex h-14 w-full cursor-pointer items-center justify-center rounded-xl bg-[#E91B23] text-lg font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:h-[60px]"
          >
            {isLoading ? (
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
                />

                Signing in...
              </span>
            ) : (
              'Submit'
            )}
          </button>
        </form>

        {/* Guest login */}
        <div className="flex justify-center py-4">
          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={isGuestLoading}
            className="cursor-pointer text-base font-semibold text-gray-600 underline underline-offset-4 transition hover:text-[#E91B23] disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
          >
            {isGuestLoading
              ? 'Continuing...'
              : 'Sign as Guest'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-3 text-center">
        <span className="text-sm font-semibold text-gray-800">
          Powered By
        </span>

        <span className="ml-1 font-serif text-base text-[#E91B23]">
          Hush Lush
        </span>
      </footer>
    </main>
  )
}

export default Login