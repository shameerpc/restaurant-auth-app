/**
 * Official brand glyphs for the social sign-in buttons.
 * Rendered as inline SVG so they render identically on every platform.
 */

const iconClassName = (size) =>
  `h-${size} w-${size}`

export function FacebookIcon({ size = 7 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={iconClassName(size)}
      fill="#1877F2"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function GoogleIcon({ size = 7 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={iconClassName(size)}
    >
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.86c2.26-2.08 3.6-5.15 3.6-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.86-3c-1.08.72-2.45 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.96H1.25v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.25 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.25a12 12 0 0 0 0 10.74l4-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.25 6.63l4 3.09C6.2 6.87 8.86 4.75 12 4.75z"
      />
    </svg>
  )
}

export function TelegramIcon({ size = 7 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={iconClassName(size)}
      fill="#29A9EA"
    >
      <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.388-8.775l-1.902 9.019c-.143.634-.518.988-1.062.988-.475 0-.874-.232-1.206-.536l-3.334-2.453-.806.774c-.446.446-.767.534-1.204.446l1.428-.689 4.883 3.596c.283.141.475.067.545-.259l1.872-8.78c.143-.635-.142-.921-.698-.544L7.333 12.63l-4.55-1.423c-.793-.247-.809-.793.166-1.174l17.764-6.848c.634-.247 1.19.142 1.175.94z" />
    </svg>
  )
}