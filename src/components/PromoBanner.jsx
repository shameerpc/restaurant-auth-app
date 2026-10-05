import { useState } from 'react'

const banners = [
  {
    image:
      'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1600&q=90',
    title: 'UAE New Year Promo',
    subtitle: 'From March 1 to April 1',
  },
  {
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=90',
    title: 'Special Chicken Offers',
    subtitle: 'Delicious food at special prices',
  },
  {
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=90',
    title: 'Enjoy Your Meal',
    subtitle: 'Fresh food made for you',
  },
]

function PromoBanner() {
  const [activeIndex, setActiveIndex] = useState(0)

  const banner = banners[activeIndex]

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[280px] sm:h-[350px] lg:h-[420px]">

        {/* Background */}
        <img
          src={banner.image}
          alt={banner.title}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-opacity
            duration-500
          "
        />

        {/* Dark gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/80
            via-black/20
            to-black/5
          "
        />

        {/* Content */}
        <div
          className="
            absolute
            bottom-8
            left-5
            right-5
            text-white
            sm:bottom-10
            sm:left-8
            lg:left-10
          "
        >
          <h2
            className="
              font-serif
              text-[35px]
              leading-tight
              sm:text-[46px]
              lg:text-[58px]
            "
          >
            {banner.title}
          </h2>

          <p
            className="
              mt-2
              text-[18px]
              font-medium
              sm:text-[22px]
            "
          >
            {banner.subtitle}
          </p>
        </div>

        {/* Dots */}
        <div
          className="
            absolute
            bottom-5
            right-5
            flex
            gap-1.5
            sm:right-8
          "
        >
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Banner ${index + 1}`}
              onClick={() =>
                setActiveIndex(index)
              }
              className={`
                h-3
                w-3
                rounded-full
                border
                border-white
                transition-all
                ${
                  activeIndex === index
                    ? 'bg-white'
                    : 'bg-white/50'
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PromoBanner