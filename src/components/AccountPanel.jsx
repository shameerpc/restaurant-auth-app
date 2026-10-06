import { LogOut, UserRound } from 'lucide-react'

function AccountPanel({
  user,
  onLogout,
}) {
  const isGuest = user?.type === 'guest'

  return (
    <div className="flex flex-col items-center py-4 text-center">
      <span
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-red-50
          text-[#E91B23]
        "
      >
        <UserRound size={30} />
      </span>

      <p className="mt-4 text-lg font-bold text-gray-800">
        {user?.name ?? 'Guest'}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {isGuest
          ? 'Browsing as a guest'
          : user?.email}
      </p>

      <button
        type="button"
        onClick={onLogout}
        className="
          mt-6
          inline-flex
          h-12
          cursor-pointer
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#E91B23]
          px-6
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-red-700
          active:scale-[0.98]
        "
      >
        <LogOut size={18} />

        Sign out
      </button>
    </div>
  )
}

export default AccountPanel