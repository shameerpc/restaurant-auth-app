import { Search } from 'lucide-react'
import logo from '../assets/hush-lush-logo.png'

function RestaurantHeader() {
  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-[82px]
        items-center
        justify-between
        border-b
        border-gray-200
        bg-white
        px-5
        sm:px-8
        lg:px-10
      "
    >
      {/* Restaurant Logo */}
      <div
        className="
          flex
          h-[62px]
          w-[62px]
          items-center
          justify-center
          overflow-hidden
          rounded-[10px]
          bg-white
          shadow-[0_2px_12px_rgba(0,0,0,0.12)]
          sm:h-[68px]
          sm:w-[68px]
        "
      >
        <img
          src={logo}
          alt="Hush Lush"
          className="h-full w-full object-contain p-2"
        />
      </div>

      {/* Table */}
      <h1
        className="
          absolute
          left-1/2
          -translate-x-1/2
          whitespace-nowrap
          text-[20px]
          font-bold
          text-[#202020]
          sm:text-[24px]
        "
      >
        Table 13 (4 PAX)
      </h1>

      {/* Search */}
      <button
        type="button"
        aria-label="Search"
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          transition
          hover:bg-gray-100
          active:scale-95
        "
      >
        <Search
          size={34}
          strokeWidth={1.7}
        />
      </button>
    </header>
  )
}

export default RestaurantHeader