import { useState } from 'react'
import {
  Eye,
  EyeOff,
  Send,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { validateLogin } from '../utils/validation'
import logo from '../assets/hush-lush-logo.png'

function Login() {
  const navigate = useNavigate()

  const {
    login,
    loginAsGuest,
  } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] =
    useState(false)

  const [errors, setErrors] = useState({})

  const [authError, setAuthError] =
    useState('')

  const [isLoading, setIsLoading] =
    useState(false)

  const [isGuestLoading, setIsGuestLoading] =
    useState(false)

  // Login submit
  const handleSubmit = async (event) => {
    event.preventDefault()

    setAuthError('')

    const validationErrors =
      validateLogin(email, password)

    if (
      Object.keys(validationErrors).length > 0
    ) {
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
          'Unable to login. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Guest login
  const handleGuestLogin = async () => {
    setAuthError('')
    setIsGuestLoading(true)

    try {
      await loginAsGuest()

      navigate('/home')
    } catch {
      setAuthError(
        'Unable to continue as guest. Please try again.'
      )
    } finally {
      setIsGuestLoading(false)
    }
  }

  // Email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value)

    if (errors.email) {
      setErrors((previous) => ({
        ...previous,
        email: '',
      }))
    }

    if (authError) {
      setAuthError('')
    }
  }

  // Password change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)

    if (errors.password) {
      setErrors((previous) => ({
        ...previous,
        password: '',
      }))
    }

    if (authError) {
      setAuthError('')
    }
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Main content */}
      <div
        className="
          mx-auto
          flex
          min-h-screen
          w-full
          max-w-[620px]
          flex-col
          px-5
          py-7
          sm:px-8
          sm:py-10
          lg:py-12
        "
      >

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Hush Lush Advertising & Technologies"
            className="
              w-[280px]
              object-contain
              sm:w-[350px]
              lg:w-[390px]
            "
          />
        </div>

        {/* Description */}
        <p
          className="
            mx-auto
            mt-7
            max-w-[570px]
            text-center
            text-[17px]
            font-medium
            leading-7
            text-[#606060]
            sm:mt-8
            sm:text-[20px]
            sm:leading-8
          "
        >
          Warely Pass Grants Access to Log in at
          any of Our Partnered Restaurants.
        </p>

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-14 sm:mt-16"
        >

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="
                mb-3
                block
                text-[20px]
                font-semibold
                text-[#222222]
                sm:text-[22px]
              "
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
                h-[64px]
                w-full
                rounded-[15px]
                border-2
                bg-white
                px-4
                text-[17px]
                text-[#222222]
                outline-none
                transition-all
                duration-200
                placeholder:text-[#c8c8c8]
                sm:h-[72px]
                sm:text-[18px]
                ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-[#d4d4d4] focus:border-[#e91b23]'
                }
              `}
            />

            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="
                  mt-2
                  text-sm
                  text-red-500
                "
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mt-8 sm:mt-10">

            <label
              htmlFor="password"
              className="
                mb-3
                block
                text-[20px]
                font-semibold
                text-[#222222]
                sm:text-[22px]
              "
            >
              Password
            </label>

            <div className="relative">

              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                aria-invalid={Boolean(
                  errors.password
                )}
                aria-describedby={
                  errors.password
                    ? 'password-error'
                    : undefined
                }
                className={`
                  h-[64px]
                  w-full
                  rounded-[15px]
                  border-2
                  bg-white
                  px-4
                  pr-16
                  text-[17px]
                  text-[#222222]
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-[#c8c8c8]
                  sm:h-[72px]
                  sm:text-[18px]
                  ${
                    errors.password
                      ? 'border-red-500'
                      : 'border-[#d4d4d4] focus:border-[#e91b23]'
                  }
                `}
              />

              {/* Password visibility */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  flex
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  p-2
                  text-[#666666]
                  transition
                  hover:bg-gray-100
                "
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff size={27} />
                ) : (
                  <Eye size={27} />
                )}
              </button>

            </div>

            {errors.password && (
              <p
                id="password-error"
                role="alert"
                className="
                  mt-2
                  text-sm
                  text-red-500
                "
              >
                {errors.password}
              </p>
            )}

          </div>

          {/* Use Email ID */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="
                text-[16px]
                font-medium
                text-[#ed1c24]
                underline
                underline-offset-4
                transition
                hover:text-red-700
                sm:text-[18px]
              "
            >
              Use Email-ID Instead
            </button>
          </div>

          {/* OR */}
          <div
            className="
              my-9
              flex
              items-center
              justify-center
              sm:my-10
            "
          >
            <span
              className="
                text-[27px]
                font-semibold
                text-[#c8c8c8]
              "
            >
              Or
            </span>
          </div>

          {/* Social buttons */}
          <div
            className="
              flex
              justify-center
              gap-5
              sm:gap-10
            "
          >

            {/* Facebook */}
            <button
              type="button"
              aria-label="Continue with Facebook"
              className="
                flex
                h-[70px]
                w-[90px]
                items-center
                justify-center
                rounded-[13px]
                border
                border-[#d8d8d8]
                bg-white
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-md
                active:scale-95
                sm:h-[80px]
                sm:w-[105px]
              "
            >
              <span
                className="
                  text-[42px]
                  font-bold
                  leading-none
                  text-[#1877f2]
                "
              >
                f
              </span>
            </button>

            {/* Telegram */}
            <button
              type="button"
              aria-label="Continue with Telegram"
              className="
                flex
                h-[70px]
                w-[90px]
                items-center
                justify-center
                rounded-[13px]
                border
                border-[#d8d8d8]
                bg-white
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-md
                active:scale-95
                sm:h-[80px]
                sm:w-[105px]
              "
            >
              <Send
                size={36}
                fill="#29a9ea"
                color="#29a9ea"
              />
            </button>

            {/* Google */}
            <button
              type="button"
              aria-label="Continue with Google"
              className="
                flex
                h-[70px]
                w-[90px]
                items-center
                justify-center
                rounded-[13px]
                border
                border-[#d8d8d8]
                bg-white
                transition-all
                duration-200
                hover:-translate-y-1
                hover:shadow-md
                active:scale-95
                sm:h-[80px]
                sm:w-[105px]
              "
            >
              <span
                className="
                  text-[36px]
                  font-bold
                  text-[#4285f4]
                "
              >
                G
              </span>
            </button>

          </div>

          {/* Terms */}
          <p
            className="
              mt-10
              text-[15px]
              font-semibold
              leading-7
              text-[#626262]
              sm:text-[17px]
              sm:leading-8
            "
          >
            By ordering, You have Read and
            Agreement to Our{' '}

            <button
              type="button"
              className="
                text-[#ed1c24]
                underline
                underline-offset-2
              "
            >
              Terms of Use
            </button>

            {' '}and{' '}

            <button
              type="button"
              className="
                text-[#ed1c24]
                underline
                underline-offset-2
              "
            >
              Privacy Policy
            </button>
          </p>

          {/* Authentication error */}
          {authError && (
            <div
              role="alert"
              className="
                mt-5
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-center
                text-sm
                font-medium
                text-red-600
              "
            >
              {authError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              mt-6
              flex
              h-[64px]
              w-full
              items-center
              justify-center
              rounded-[12px]
              bg-[#ed1717]
              text-[20px]
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:bg-[#d91414]
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:h-[70px]
            "
          >
            {isLoading ? (
              <span className="flex items-center gap-3">
                <span
                  className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-white
                    border-t-transparent
                  "
                />
                Signing in...
              </span>
            ) : (
              'Submit'
            )}
          </button>

        </form>

        {/* Guest login */}
        <div className="flex justify-center py-9 sm:py-10">

          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={isGuestLoading}
            className="
              text-[18px]
              font-semibold
              text-[#626262]
              underline
              underline-offset-4
              transition
              hover:text-[#ed1c24]
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:text-[20px]
            "
          >
            {isGuestLoading
              ? 'Continuing...'
              : 'Sign as Guest'}
          </button>

        </div>

      </div>

      {/* Footer */}
      <footer
        className="
          border-t
          border-gray-100
          bg-white
          py-4
          text-center
        "
      >
        <span
          className="
            text-[14px]
            font-semibold
            text-[#222222]
          "
        >
          Powered By
        </span>

        <span
          className="
            ml-1
            font-serif
            text-[20px]
            text-[#d92727]
          "
        >
          Hush Lush
        </span>
      </footer>

    </main>
  )
}

export default Login