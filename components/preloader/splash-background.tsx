// Clean modern clinical background for the splash screen:
// soft sky gradients and translucent flowing wave ribbons, with all dot grids removed.
export function SplashBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Base vertical gradient: soft sky blue at top, blending down to crisp blue-25 */}
      <div className="absolute inset-0 bg-linear-to-b from-[#E7F3FD] via-[#F4F9FE] to-[#EAF4FD]" />

      {/* Decorative flowing wave ribbons across top-left */}
      <svg
        className="absolute -top-16 -left-16 h-80 w-[420px] sm:h-96 sm:w-[600px] lg:h-[420px] lg:w-[720px]"
        viewBox="0 0 720 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -30 -30 Q 320 60 220 420 L -30 420 Z"
          fill="url(#wave-grad-1)"
          opacity="0.65"
        />
        <path
          d="M -30 20 Q 400 120 290 440 L -30 440 Z"
          fill="url(#wave-grad-2)"
          opacity="0.38"
        />
        <path
          d="M -30 60 Q 480 180 360 460 L -30 460 Z"
          fill="url(#wave-grad-3)"
          opacity="0.2"
        />
        <defs>
          <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#BFDBFE" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#93C5FD" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="wave-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Decorative flowing wave ribbons across top-right */}
      <svg
        className="absolute -top-16 -right-16 h-72 w-[360px] sm:h-80 sm:w-[480px] lg:h-96 lg:w-[560px]"
        viewBox="0 0 560 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 590 -30 Q 280 80 380 400 L 590 400 Z"
          fill="url(#wave-grad-tr-1)"
          opacity="0.5"
        />
        <path
          d="M 590 20 Q 200 140 310 420 L 590 420 Z"
          fill="url(#wave-grad-tr-2)"
          opacity="0.25"
        />
        <defs>
          <linearGradient id="wave-grad-tr-1" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#BFDBFE" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="wave-grad-tr-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
