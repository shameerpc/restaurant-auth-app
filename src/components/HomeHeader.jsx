import {
  MapPin,
  Search,
  UserRound,
} from 'lucide-react'

function HomeHeader({ user, onSearch }) {
  return (
    <header className="border-b border-gray-100 bg-white">

      <div
        className="
          mx-auto
          flex
          max-w-[1200px]
          items-center
          justify-between
          gap-4
          px-5
          py-4
          sm:px-8
        "
      >

        {/* Location */}
        <div className="flex items-center gap-2">

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-red-50
              text-[#ed1717]
            "
          >
            <MapPin size={20} />
          </div>

          <div className="hidden sm:block">
            <p className="text-xs text-gray-400">
              Delivering to
            </p>

            <p className="text-sm font-semibold text-gray-800">
              Your Location
            </p>
          </div>

        </div>

        {/* Logo */}
        <div className="text-xl font-bold text-[#ed1717]">
          Hush Lush
        </div>

        {/* User */}
        <button
          type="button"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-gray-100
            text-gray-700
            transition
            hover:bg-gray-200
          "
          aria-label="Profile"
        >
          <UserRound size={20} />
        </button>

      </div>

      {/* Search */}
      <div className="mx-auto max-w-[1200px] px-5 pb-4 sm:px-8">
        <div
          className="
            flex
            h-12
            items-center
            gap-3
            rounded-xl
            bg-[#f5f5f5]
            px-4
          "
        >
          <Search
            size={20}
            className="text-gray-400"
          />

          <input
            type="search"
            placeholder="Search food..."
            onChange={(event) =>
              onSearch(event.target.value)
            }
            className="
              w-full
              bg-transparent
              text-sm
              outline-none
              placeholder:text-gray-400
            "
          />
        </div>
      </div>

    </header>
  )
}

export default HomeHeader