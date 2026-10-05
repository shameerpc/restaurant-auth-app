import { useMemo, useState } from 'react'
import { ShoppingCart } from 'lucide-react'

import {
  categories,
  foodItems,
} from '../data/foodData'

import RestaurantHeader from '../components/RestaurantHeader'
import PromoBanner from '../components/PromoBanner'
import CategoryTabs from '../components/CategoryTabs'
import FoodCard from '../components/FoodCard'
import BottomNavigation from '../components/BottomNavigation'

function Home() {
  const [activeCategory, setActiveCategory] = useState('Chicken Chop')
  const [cart, setCart] = useState([])

  // Fix 1: Added foodItems to dependency array to prevent React hooks linting errors
  const filteredFoods = useMemo(() => {
    if (activeCategory === 'For You') {
      return foodItems
    }
    return foodItems.filter((item) => item.category === activeCategory)
  }, [activeCategory, foodItems])

  // Fix 2: Improved cart logic to handle quantities instead of duplicate objects
  const handleAddToCart = (itemToAdd) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find((item) => item.id === itemToAdd.id)
      
      if (existingItem) {
        // If item is already in cart, increase its quantity
        return previousCart.map((item) =>
          item.id === itemToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      // If item is new, add it to cart with quantity 1
      return [...previousCart, { ...itemToAdd, quantity: 1 }]
    })
  }

  // Fix 3: Calculate total items in cart properly based on quantity
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-[#f8f8f8] pb-[120px]">
      
      {/* Header */}
      <RestaurantHeader />

      {/* Promotional Banner */}
      <PromoBanner />

      {/* Categories */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Food */}
      <main className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 lg:py-10">
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredFoods.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white py-20 text-center">
            <p className="text-lg font-semibold">
              No items available
            </p>
          </div>
        )}
      </main>

      {/* Floating cart */}
      {/* Fix 4: Changed bg color to a darker, more standard app color to match UI conventions */}
      {totalCartItems > 0 && (
        <button
          type="button"
          aria-label="Open shopping cart"
          className="fixed bottom-[105px] right-5 z-40 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-gray-900 text-white shadow-xl transition-all hover:scale-105 active:scale-90 sm:right-8"
        >
          <ShoppingCart size={31} strokeWidth={1.7} />

          <span className="absolute right-0 top-0 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#ed1717] px-1 text-xs font-bold">
            {totalCartItems}
          </span>
        </button>
      )}

      {/* Bottom navigation */}
      <BottomNavigation />
      
      {/* Fix 5: Added the "Powered By" footer to match the screenshot */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-2 text-center text-xs text-gray-400 z-30">
        Powered By Hush Lush
      </div>
      
    </div>
  )
}

export default Home