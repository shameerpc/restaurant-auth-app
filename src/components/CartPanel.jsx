import {
  Minus,
  Plus,
  Trash2,
} from 'lucide-react'

function CartPanel({
  items,
  onIncrement,
  onDecrement,
  onClear,
}) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-gray-500">
        Your cart is empty. Add a dish from the menu to get
        started.
      </p>
    )
  }

  return (
    <>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="
              flex
              items-center
              justify-between
              gap-3
              rounded-xl
              bg-[#f8f8f8]
              px-4
              py-3
            "
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-800">
                {item.name}
              </p>

              <p className="text-xs text-gray-500">
                ${item.price.toFixed(2)} each
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => onDecrement(item)}
                aria-label={`Decrease quantity of ${item.name}`}
                className="
                  flex
                  h-8
                  w-8
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-gray-700
                  transition
                  hover:bg-gray-200
                  active:scale-90
                "
              >
                {item.quantity === 1 ? (
                  <Trash2 size={15} />
                ) : (
                  <Minus size={15} />
                )}
              </button>

              <span
                aria-live="polite"
                className="w-5 text-center text-sm font-bold text-gray-800"
              >
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() => onIncrement(item)}
                aria-label={`Increase quantity of ${item.name}`}
                className="
                  flex
                  h-8
                  w-8
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-gray-700
                  transition
                  hover:bg-gray-200
                  active:scale-90
                "
              >
                <Plus size={15} />
              </button>
            </div>

            <span className="w-20 shrink-0 text-right text-sm font-bold text-[#ff4145]">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-sm font-semibold text-gray-600">
          Total
        </span>

        <span className="text-xl font-bold text-[#ff4145]">
          $
          {items
            .reduce(
              (total, item) =>
                total + item.price * item.quantity,
              0,
            )
            .toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="
          mt-4
          h-11
          w-full
          cursor-pointer
          rounded-xl
          border
          border-gray-200
          text-sm
          font-semibold
          text-gray-600
          transition
          hover:bg-gray-50
          hover:text-red-600
          active:scale-[0.98]
        "
      >
        Clear cart
      </button>

      <p className="mt-3 text-center text-xs text-gray-400">
        Checkout and payment are outside the scope of
        this assignment.
      </p>
    </>
  )
}

export default CartPanel