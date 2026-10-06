import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <p className="text-7xl font-bold text-[#E91B23]">
        404
      </p>

      <h1 className="mt-4 text-2xl font-bold text-gray-800 sm:text-3xl">
        Page not found
      </h1>

      <p className="mt-3 max-w-md text-base leading-relaxed text-gray-500">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/home"
        className="
          mt-8
          inline-flex
          h-12
          items-center
          gap-2
          rounded-xl
          bg-[#E91B23]
          px-6
          text-base
          font-semibold
          text-white
          shadow-md
          transition
          duration-200
          hover:bg-red-700
          active:scale-[0.98]
        "
      >
        <Home size={18} />

        Back to Menu
      </Link>
    </main>
  )
}

export default NotFound