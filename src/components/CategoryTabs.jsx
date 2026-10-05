function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div
      className="
        overflow-x-auto
        border-b
        border-gray-200
        bg-white
        px-5
        py-5
        sm:px-8
      "
    >
      <div
        className="
          mx-auto
          flex
          w-max
          gap-5
          lg:w-full
          lg:max-w-[1200px]
        "
      >
        {categories.map((category) => {
          const active =
            category === activeCategory

          return (
            <button
              key={category}
              type="button"
              onClick={() =>
                onCategoryChange(category)
              }
              className={`
                min-w-[120px]
                rounded-full
                border-2
                px-7
                py-3
                text-[17px]
                font-semibold
                transition-all
                duration-200
                active:scale-95
                sm:min-w-[140px]
                ${
                  active
                    ? 'border-[#ff4145] bg-[#ff4145] text-white'
                    : 'border-[#d7d7d7] bg-white text-[#222] hover:border-[#ff4145]'
                }
              `}
            >
              {category}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryTabs