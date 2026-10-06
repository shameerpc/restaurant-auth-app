import { NavLink } from 'react-router-dom'
import {
  Menu,
  Store,
  UserRound,
  ClipboardList,
} from 'lucide-react'

const NOT_AVAILABLE_HINT =
  'Not part of this technical assignment'

function BottomNavigation({
  onOpenAccount,
}) {
  const tabClassName = ({ isActive }) => `
    flex
    flex-col
    items-center
    gap-1
    transition
    ${
      isActive
        ? 'relative text-[#ff4145]'
        : 'text-gray-800 hover:text-[#ff4145]'
    }
  `

  return (
    <nav
      aria-label="Main"
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
          h-[83px]
          max-w-[900px]
          items-center
          justify-around
        "
      >
        {/* Outlet - placeholder tab from the design */}
        <button
          type="button"
          disabled
          title={NOT_AVAILABLE_HINT}
          aria-label="Outlet (not available)"
          className="
            flex
            cursor-not-allowed
            flex-col
            items-center
            gap-1
            text-gray-400
            opacity-70
          "
        >
          <Store
            size={27}
            strokeWidth={1.7}
          />

          <span className="text-sm">
            Outlet
          </span>
        </button>

        {/* Menu - the active route */}
        <NavLink
          to="/home"
          className={tabClassName}
          aria-label="Menu"
        >
          {({ isActive }) => (
            <>
              <ClipboardList
                size={27}
                strokeWidth={1.7}
              />

              <span className="text-sm">
                Menu
              </span>

              {isActive && (
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-px
                    left-1/2
                    h-[3px]
                    w-[52px]
                    -translate-x-1/2
                    rounded-t-full
                    bg-[#ff4145]
                  "
                />
              )}
            </>
          )}
        </NavLink>

        {/* Account - opens the account panel with sign out */}
        <button
          type="button"
          onClick={onOpenAccount}
          className={`
            ${tabClassName({ isActive: false })}
            cursor-pointer
          `}
        >
          <UserRound
            size={28}
            strokeWidth={1.5}
          />

          <span className="text-sm">
            Account
          </span>
        </button>

        {/* More - placeholder tab from the design */}
        <button
          type="button"
          disabled
          title={NOT_AVAILABLE_HINT}
          aria-label="More (not available)"
          className="
            flex
            cursor-not-allowed
            flex-col
            items-center
            gap-1
            text-gray-400
            opacity-70
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