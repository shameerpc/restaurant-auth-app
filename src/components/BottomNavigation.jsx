import {
  Menu,
  Store,
  UserRound,
  ClipboardList,
} from 'lucide-react'

function BottomNavigation() {
  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-gray-200
        bg-white
        shadow-[0_-3px_15px_rgba(0,0,0,0.08)]
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[82px]
          max-w-[900px]
          items-center
          justify-around
        "
      >

        <button
          type="button"
          className="
            flex
            flex-col
            items-center
            gap-1
            text-gray-800
          "
        >
          <Store size={27} strokeWidth={1.7} />
          <span className="text-sm">
            Outlet
          </span>
        </button>

        <button
          type="button"
          className="
            relative
            flex
            h-full
            flex-col
            items-center
            justify-center
            gap-1
            text-[#ff4145]
          "
        >
          <ClipboardList
            size={27}
            strokeWidth={1.7}
          />

          <span className="text-sm">
            Menu
          </span>

          <span
            className="
              absolute
              bottom-0
              h-[3px]
              w-[95px]
              rounded-t-full
              bg-[#ff4145]
            "
          />
        </button>

        <button
          type="button"
          className="
            flex
            flex-col
            items-center
            gap-1
            text-gray-800
          "
        >
          <UserRound
            size={28}
            fill="currentColor"
            strokeWidth={1.5}
          />

          <span className="text-sm">
            Account
          </span>
        </button>

        <button
          type="button"
          className="
            flex
            flex-col
            items-center
            gap-1
            text-gray-800
          "
        >
          <Menu size={30} />

          <span className="text-sm">
            More
          </span>
        </button>

      </div>
    </nav>
  )
}

export default BottomNavigation