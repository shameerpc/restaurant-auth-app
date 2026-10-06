import {
  useEffect,
  useRef,
} from 'react'
import { X } from 'lucide-react'

/**
 * Accessible bottom sheet used for the cart and account panels.
 * Renders nothing when closed.
 */
function Sheet({
  isOpen,
  title,
  onClose,
  children,
}) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Close panel"
        onClick={onClose}
        className="
          absolute
          inset-0
          w-full
          cursor-default
          bg-black/40
          backdrop-blur-[2px]
        "
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="
          absolute
          bottom-0
          left-0
          right-0
          flex
          max-h-[80vh]
          flex-col
          rounded-t-3xl
          bg-white
          pb-[83px]
          shadow-[0_-10px_40px_rgba(0,0,0,0.2)]
          sm:mx-auto
          sm:max-w-[520px]
          sm:rounded-b-3xl
        "
      >
        <header className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-lg font-bold text-gray-800">
            {title}
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              text-gray-500
              transition
              hover:bg-gray-100
              active:scale-95
            "
          >
            <X size={20} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {children}
        </div>
      </section>
    </div>
  )
}

export default Sheet