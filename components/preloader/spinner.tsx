interface SpinnerProps {
  className?: string
  size?: number
}

// Circular loading spinner with gradient stroke arc and a glowing bead at the leading tip,
// matching the modern circular loader in the design mockup.
export function PreloaderSpinner({ className = "", size = 48 }: SpinnerProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="size-full animate-spin"
        style={{ animationDuration: "1.1s" }}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="spinner-arc-gradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
            <stop offset="40%" stopColor="#3B82F6" stopOpacity="0.25" />
            <stop offset="75%" stopColor="#60A5FA" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.5"
              floodColor="#38BDF8"
              floodOpacity="0.8"
            />
          </filter>
        </defs>

        {/* Faint guide track */}
        <circle
          cx="24"
          cy="24"
          r="19"
          stroke="#DBE6F8"
          strokeWidth="3.2"
          strokeOpacity="0.45"
        />

        {/* Dynamic sweeping gradient arc (~270 degrees) */}
        <path
          d="M 5,24 A 19,19 0 1,1 24,5"
          stroke="url(#spinner-arc-gradient)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Glowing circular bead at the leading tip (at top center 24, 5) */}
        <circle
          cx="24"
          cy="5"
          r="2.6"
          fill="#38BDF8"
          filter="url(#glow)"
        />
      </svg>
    </div>
  )
}
