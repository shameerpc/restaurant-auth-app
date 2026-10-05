import { useAuth } from '../context/AuthContext'

function Home() {
  const { user, logout } = useAuth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">

      <h1 className="text-3xl font-bold">
        Home
      </h1>

      <p className="text-gray-600">
        Welcome, {user?.name}
      </p>

      <p className="text-sm text-gray-500">
        Account type: {user?.type}
      </p>

      <button
        onClick={logout}
        className="
          rounded-lg
          bg-red-600
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-red-700
        "
      >
        Logout
      </button>

    </main>
  )
}

export default Home