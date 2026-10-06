import { useState } from 'react'
import {
  Plus,
  ArrowRight,
  Utensils,
} from 'lucide-react'

function FoodCard({
  item,
  onAdd,
}) {
  const [hasImageError, setHasImageError] =
    useState(false)

  return (
    <article
      className="
        overflow-hidden
        rounded-[20px]
        border
        border-[#d6d6d6]
        bg-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Image */}
      <div className="relative h-[190px] sm:h-[230px]">
        {hasImageError ? (
          <div
            role="img"
            aria-label={`${item.name} - image unavailable`}
            className="
              flex
              h-full
              w-full
              flex-col
              items-center
              justify-center
              gap-2
              bg-[#f3f4f6]
              px-4
              text-center
              text-gray-400
            "
          >
            <Utensils size={30} />

            <span className="text-xs font-medium">
              Image unavailable
            </span>
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={() => setHasImageError(true)}
            className="
              h-full
              w-full
              object-cover
            "
          />
        )}

        {/* Add button */}
        <button
          type="button"
          onClick={() => onAdd(item)}
          aria-label={`Add ${item.name} to cart`}
          className="
            absolute
            bottom-[-21px]
            right-4
            flex
            h-[44px]
            w-[44px]
            cursor-pointer
            items-center
            justify-center
            rounded-full
            bg-[#777]
            text-white
            shadow-lg
            transition-all
            hover:bg-[#ed1717]
            hover:scale-105
            active:scale-90
          "
        >
          <Plus
            size={28}
            strokeWidth={1.8}
          />
        </button>
      </div>

      {/* Food name */}
      <div
        className="
          flex
          min-h-[105px]
          items-center
          justify-center
          px-4
          pt-5
          text-center
        "
      >
        <h3
          className="
            text-[18px]
            font-bold
            leading-6
            text-[#202020]
            sm:text-[20px]
          "
        >
          {item.name}
        </h3>
      </div>

      {/* Price */}
      <div
        className="
          flex
          items-center
          justify-between
          bg-[#fff7f7]
          px-6
          py-4
        "
      >
        <span
          className="
            text-[27px]
            font-semibold
            text-[#ff4145]
          "
        >
          ${item.price.toFixed(2)}
        </span>

        <button
          type="button"
          onClick={() => onAdd(item)}
          aria-label={`Quick add ${item.name} to cart`}
          className="
            cursor-pointer
            text-[#ed1717]
            transition
            hover:translate-x-1
          "
        >
          <ArrowRight
            size={35}
            strokeWidth={1.7}
          />
        </button>
      </div>
    </article>
  )
}

export default FoodCard