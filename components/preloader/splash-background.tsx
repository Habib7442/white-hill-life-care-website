// Decorative fluid waves and halftone dot grids for the top of the splash screen,
// echoing the clean modern clinical aesthetic from the design reference.
export function SplashBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Base vertical gradient: soft sky blue at top, blending down to crisp blue-25 */}
      <div className="absolute inset-0 bg-linear-to-b from-[#E7F3FD] via-[#F4F9FE] to-blue-25" />

      {/* Decorative flowing wave curve across top-left */}
      <svg
        className="absolute -top-12 -left-12 h-64 w-96 text-blue-200/40 sm:h-80 sm:w-[500px]"
        viewBox="0 0 500 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -20 -20 Q 240 60 160 320 L -20 320 Z"
          fill="url(#wave-grad-1)"
          opacity="0.6"
        />
        <path
          d="M -20 20 Q 300 120 220 340 L -20 340 Z"
          fill="url(#wave-grad-2)"
          opacity="0.35"
        />
        <defs>
          <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9CC3FB" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#DBE6F8" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#DBE6F8" stopOpacity="0.0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Halftone dot cluster - top right */}
      <svg
        className="absolute -top-6 -right-6 h-48 w-48 text-blue-300/35 sm:h-64 sm:w-64"
        viewBox="0 0 200 200"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="halftone-fade-tr">
          <radialGradient id="fade-rad-tr" cx="80%" cy="20%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <rect width="200" height="200" fill="url(#fade-rad-tr)" />
        </mask>
        <g mask="url(#halftone-fade-tr)">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((row) =>
            [0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
              const cx = 20 + col * 22
              const cy = 20 + row * 22
              const dist = Math.hypot(180 - cx, cy - 20)
              const r = Math.max(1, 4.2 - dist * 0.02)
              return (
                <circle
                  key={`dot-tr-${row}-${col}`}
                  cx={cx}
                  cy={cy}
                  r={r}
                  opacity={0.6}
                />
              )
            })
          )}
        </g>
      </svg>

      {/* Halftone dot cluster - top left along the wave */}
      <svg
        className="absolute top-8 left-4 h-36 w-36 text-blue-300/25 sm:top-12 sm:left-12 sm:h-48 sm:w-48"
        viewBox="0 0 160 160"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="halftone-fade-tl">
          <radialGradient id="fade-rad-tl" cx="20%" cy="40%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <rect width="160" height="160" fill="url(#fade-rad-tl)" />
        </mask>
        <g mask="url(#halftone-fade-tl)">
          {[0, 1, 2, 3, 4, 5].map((row) =>
            [0, 1, 2, 3, 4, 5].map((col) => (
              <circle
                key={`dot-tl-${row}-${col}`}
                cx={16 + col * 22}
                cy={16 + row * 22}
                r={2.8}
                opacity={0.5}
              />
            ))
          )}
        </g>
      </svg>
    </div>
  )
}
