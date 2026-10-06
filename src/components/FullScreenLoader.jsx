function FullScreenLoader({
  label = 'Loading',
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-col items-center justify-center gap-4"
    >
      <span
        aria-hidden="true"
        className="
          h-8
          w-8
          animate-spin
          rounded-full
          border-4
          border-gray-200
          border-t-red-600
        "
      />

      <span className="text-sm font-medium text-gray-500">
        {label}
      </span>
    </div>
  )
}

export default FullScreenLoader