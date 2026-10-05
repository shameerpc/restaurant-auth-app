import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/hush-lush-logo.png'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log({
      email,
      password,
    })
  }

  const handleGuestLogin = () => {
    localStorage.setItem('isGuest', 'true')
    navigate('/home')
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Main Container */}
      <div className="mx-auto w-full max-w-[920px] px-5 py-8 sm:px-8">

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Hush Lush Advertising & Technologies"
            className="w-[340px] max-w-full object-contain sm:w-[430px]"
          />
        </div>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-[720px] text-center text-[20px] font-medium leading-8 text-gray-600 sm:text-[25px]">
          Warely Pass Grants Access to Log in at any of Our
          <br className="hidden sm:block" />
          Partnered Restaurants.
        </p>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-24"
        >

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-4 block text-[24px] font-semibold text-gray-900"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Mail ID"
              className="
                h-[100px]
                w-full
                rounded-[18px]
                border-2
                border-gray-300
                px-4
                text-[22px]
                outline-none
                transition
                focus:border-red-500
              "
            />
          </div>

          {/* Password */}
          <div className="mt-12">
            <label
              htmlFor="password"
              className="mb-4 block text-[24px] font-semibold text-gray-900"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="
                  h-[100px]
                  w-full
                  rounded-[18px]
                  border-2
                  border-gray-300
                  px-4
                  pr-16
                  text-[22px]
                  outline-none
                  transition
                  focus:border-red-500
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-gray-600
                  transition
                  hover:text-red-500
                "
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff size={32} />
                ) : (
                  <Eye size={32} />
                )}
              </button>
            </div>
          </div>

          {/* Email Login Option */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="
                text-[20px]
                text-red-500
                underline
                underline-offset-4
                transition
                hover:text-red-700
              "
            >
              Use Email-ID Instead
            </button>
          </div>

          {/* Or */}
          <div className="my-12 text-center">
            <span className="text-[30px] font-semibold text-gray-300">
              Or
            </span>
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-12">

            {/* Facebook */}
            <button
              type="button"
              className="
                flex
                h-[90px]
                w-[120px]
                items-center
                justify-center
                rounded-[14px]
                border
                border-gray-300
                transition
                hover:scale-105
              "
              aria-label="Continue with Facebook"
            >
           <span className="text-[42px] font-bold text-[#1877F2]">
  f
</span>
            </button>

            {/* Telegram */}
            <button
              type="button"
              className="
                flex
                h-[90px]
                w-[120px]
                items-center
                justify-center
                rounded-[14px]
                border
                border-gray-300
                transition
                hover:scale-105
              "
              aria-label="Continue with Telegram"
            >
              <span className="text-[38px] text-sky-500">
                ➤
              </span>
            </button>

            {/* Google */}
            <button
              type="button"
              className="
                flex
                h-[90px]
                w-[120px]
                items-center
                justify-center
                rounded-[14px]
                border
                border-gray-300
                transition
                hover:scale-105
              "
              aria-label="Continue with Google"
            >
              <span className="text-[40px] font-bold">
                G
              </span>
            </button>

          </div>

          {/* Terms */}
          <p className="mt-14 text-[20px] font-semibold leading-9 text-gray-600">
            By ordering, You have Read and Agreement to Our{' '}

            <button
              type="button"
              className="text-red-500 underline"
            >
              Terms of Use
            </button>

            {' '}and{' '}

            <button
              type="button"
              className="text-red-500 underline"
            >
              Privacy Policy
            </button>
          </p>

          {/* Submit */}
          <button
            type="submit"
            className="
              mt-8
              h-[88px]
              w-full
              rounded-[14px]
              bg-red-600
              text-[26px]
              font-semibold
              text-white
              transition
              hover:bg-red-700
              active:scale-[0.99]
            "
          >
            Submit
          </button>

        </form>

        {/* Guest */}
        <div className="flex justify-center py-12">
          <button
            type="button"
            onClick={handleGuestLogin}
            className="
              text-[22px]
              font-semibold
              text-gray-600
              underline
              underline-offset-4
              transition
              hover:text-red-500
            "
          >
            Sign as Guest
          </button>
        </div>

      </div>

      {/* Footer */}
      <footer
        className="
          border-t
          border-gray-100
          py-5
          text-center
          text-gray-800
        "
      >
        <span className="font-semibold">
          Powered By
        </span>{' '}
        <span className="font-serif text-2xl text-red-600">
          Hush Lush
        </span>
      </footer>

    </main>
  )
}

export default Login