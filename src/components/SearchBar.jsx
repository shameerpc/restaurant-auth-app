import { Search, X } from 'lucide-react'

function SearchBar({
  value,
  onChange,
}) {
  const handleClear = () => onChange('')

  return (
    <div className="sticky top-[82px] z-30 border-b border-gray-200 bg-white px-5 py-3 sm:px-8">
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 rounded-xl bg-[#f5f5f5] px-4">
        <Search
          size={18}
          className="shrink-0 text-gray-400"
        />

        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search food..."
          aria-label="Search food"
          className="h-11 w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-full
              text-gray-400
              transition
              hover:bg-gray-200
              hover:text-gray-700
              active:scale-90
            "
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar