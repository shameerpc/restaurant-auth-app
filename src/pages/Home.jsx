import {
  useMemo,
  useState,
} from 'react'
import {
  ShoppingCart,
  SearchX,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import {
  categories,
  foodItems,
} from '../data/foodData'
import { useAuth } from '../context/AuthContext'

import AccountPanel from '../components/AccountPanel'
import BottomNavigation from '../components/BottomNavigation'
import CartPanel from '../components/CartPanel'
import CategoryTabs from '../components/CategoryTabs'
import FoodCard from '../components/FoodCard'
import PromoBanner from '../components/PromoBanner'
import RestaurantHeader from '../components/RestaurantHeader'
import SearchBar from '../components/SearchBar'
import Sheet from '../components/Sheet'

const ALL_CATEGORIES = 'For You'
const DEFAULT_CATEGORY = 'Chicken Chop'

function Home() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORY)
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  const visibleFoodItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    // An active search looks across every category so results are
    // never hidden by whichever tab happens to be selected.
    if (normalizedQuery) {
      return foodItems.filter((item) =>
        item.name.toLowerCase().includes(normalizedQuery),
      )
    }

    if (activeCategory === ALL_CATEGORIES) {
      return foodItems
    }

    return foodItems.filter(
      (item) => item.category === activeCategory,
    )
  }, [activeCategory, searchQuery])

  const addToCart = (itemToAdd) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.id === itemToAdd.id,
      )

      if (existingItem) {
        return previousCart.map((item) =>
          item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [
        ...previousCart,
        { ...itemToAdd, quantity: 1 },
      ]
    })
  }

  const decrementCartItem = (cartItem) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === cartItem.id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => setCart([])

  const handleLogout = () => {
    setIsAccountOpen(false)
    setCart([])
    logout()
    navigate('/login')
  }

  const handleToggleSearch = () => {
    setIsSearchOpen((previousIsOpen) => !previousIsOpen)

    if (isSearchOpen) {
      setSearchQuery('')
    }
  }

  const totalCartItems = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const hasSearchQuery = searchQuery.trim().length > 0

  return (
    <div className="min-h-screen bg-[#f8f8f8] pb-[83px]">
      <RestaurantHeader
        isSearchOpen={isSearchOpen}
        onToggleSearch={handleToggleSearch}
      />

      {isSearchOpen && (
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
        />
      )}

      <PromoBanner />

      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={(category) => {
          setSearchQuery('')
          setActiveCategory(category)
        }}
      />

      <main className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 lg:py-10">
        {visibleFoodItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {visibleFoodItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onAdd={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white py-20 text-center">
            {hasSearchQuery ? (
              <>
                <SearchX
                  size={40}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-4 text-lg font-semibold text-gray-800">
                  No dishes match your search
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Try a different dish name.
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-800">
                  No items available
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Please check back soon.
                </p>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-4 text-center text-xs font-medium text-gray-400">
        Powered By Hush Lush
      </footer>

      {/* Floating cart */}
      {totalCartItems > 0 && (
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label="Open cart"
          className="
            fixed
            bottom-[103px]
            right-5
            z-40
            flex
            h-[64px]
            w-[64px]
            cursor-pointer
            items-center
            justify-center
            rounded-full
            bg-gray-900
            text-white
            shadow-xl
            transition-all
            hover:scale-105
            active:scale-90
            sm:right-8
          "
        >
          <ShoppingCart
            size={31}
            strokeWidth={1.7}
          />

          <span
            aria-hidden="true"
            className="
              absolute
              right-0
              top-0
              flex
              h-6
              min-w-6
              items-center
              justify-center
              rounded-full
              bg-[#ed1717]
              px-1
              text-xs
              font-bold
            "
          >
            {totalCartItems}
          </span>

          <span className="sr-only">
            {totalCartItems} items in cart
          </span>
        </button>
      )}

      <BottomNavigation onOpenAccount={() => setIsAccountOpen(true)} />

      <Sheet
        isOpen={isCartOpen}
        title={`Your Cart (${totalCartItems})`}
        onClose={() => setIsCartOpen(false)}
      >
        <CartPanel
          items={cart}
          onIncrement={addToCart}
          onDecrement={decrementCartItem}
          onClear={clearCart}
        />
      </Sheet>

      <Sheet
        isOpen={isAccountOpen}
        title="Account"
        onClose={() => setIsAccountOpen(false)}
      >
        <AccountPanel
          user={user}
          onLogout={handleLogout}
        />
      </Sheet>
    </div>
  )
}

export default Home