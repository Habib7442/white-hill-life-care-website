import type { ComponentProps } from "react"

// Line-art Indian village panorama for the splash screen. Drawn on a
// 1440×260 canvas; `slice` crops from the centre on narrow screens, so the
// village pharmacy (centred at x≈720) always stays in view.
export function RuralScene(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 1440 260"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* Rising sun */}
      <g className="stroke-blue-200" strokeWidth={2}>
        <circle cx="1010" cy="150" r="44" className="fill-blue-100" />
        {[-60, -30, 0, 30, 60].map((angle) => {
          const rad = ((angle - 90) * Math.PI) / 180
          return (
            <line
              key={angle}
              x1={1010 + 56 * Math.cos(rad)}
              y1={150 + 56 * Math.sin(rad)}
              x2={1010 + 72 * Math.cos(rad)}
              y2={150 + 72 * Math.sin(rad)}
            />
          )
        })}
      </g>

      {/* Birds */}
      <g className="stroke-blue-300" strokeWidth={2}>
        <path d="M300 62 q8 -8 16 0 q8 -8 16 0" />
        <path d="M344 46 q6 -6 12 0 q6 -6 12 0" />
        <path d="M1150 70 q7 -7 14 0 q7 -7 14 0" />
      </g>

      {/* Back hills */}
      <path
        d="M0 172 C 180 128 360 140 540 156 S 900 112 1100 146 S 1340 128 1440 150 V260 H0 Z"
        className="fill-blue-100 stroke-blue-200"
        strokeWidth={2}
      />

      {/* Front hills */}
      <path
        d="M0 206 C 240 182 420 196 640 202 S 1000 186 1200 200 S 1380 194 1440 198 V260 H0 Z"
        className="fill-blue-50 stroke-blue-200"
        strokeWidth={2}
      />

      {/* Crop field furrows */}
      <g className="stroke-blue-200" strokeWidth={1.5}>
        <path d="M0 226 C 160 214 300 216 460 222" />
        <path d="M0 240 C 180 228 320 230 500 236" />
        <path d="M0 254 C 200 242 340 244 540 250" />
        <path d="M940 222 C 1100 214 1260 214 1440 220" />
        <path d="M900 236 C 1080 228 1260 228 1440 234" />
        <path d="M860 250 C 1060 242 1260 242 1440 248" />
      </g>

      {/* Neem tree, left */}
      <g className="stroke-blue-300" strokeWidth={2}>
        <path d="M340 200 V160" />
        <path d="M340 176 l-12 -10 M340 170 l12 -8" />
        <g className="fill-blue-50">
          <circle cx="324" cy="150" r="18" />
          <circle cx="352" cy="146" r="20" />
          <circle cx="338" cy="130" r="18" />
        </g>
      </g>

      {/* Huts, left of the pharmacy */}
      <g className="stroke-blue-300" strokeWidth={2}>
        <g className="fill-white">
          <path d="M440 202 V172 H500 V202" />
          <path d="M432 174 L470 148 L508 174 Z" />
          <path d="M520 202 V178 H572 V202" />
          <path d="M512 180 L546 158 L580 180 Z" />
        </g>
        <path d="M462 202 V184 H478 V202" />
        <path d="M538 202 V188 H554 V202" />
        <path d="M444 166 L496 166" />
      </g>

      {/* Village pharmacy / health centre (centre) */}
      <g className="stroke-blue-300" strokeWidth={2}>
        <path d="M660 204 V152 H780 V204" className="fill-white" />
        <path d="M652 152 H788 V142 H652 Z" className="fill-blue-50" />
        {/* Sign board */}
        <rect x="694" y="114" width="52" height="28" rx="4" className="fill-white" />
        {/* Door and windows */}
        <path d="M708 204 V172 H732 V204" />
        <rect x="672" y="164" width="22" height="18" rx="2" />
        <rect x="746" y="164" width="22" height="18" rx="2" />
      </g>
      {/* Medical cross: the one strong accent in the scene */}
      <path
        d="M716 120 h8 v6 h6 v8 h-6 v6 h-8 v-6 h-6 v-8 h6 Z"
        className="fill-blue-600"
      />

      {/* Well */}
      <g className="stroke-blue-300" strokeWidth={2}>
        <ellipse cx="840" cy="186" rx="18" ry="5" className="fill-white" />
        <path d="M822 186 V200 Q840 206 858 200 V186" className="fill-white" />
        <path d="M826 186 V160 M854 186 V160 M822 160 H858" />
        <path d="M840 160 V176" />
      </g>

      {/* Flat-roof house, right */}
      <g className="stroke-blue-300" strokeWidth={2}>
        <path d="M900 200 V166 H966 V200" className="fill-white" />
        <path d="M894 166 H972" />
        <path d="M924 200 V180 H942 V200" />
        <rect x="908" y="174" width="12" height="10" rx="1" />
        <rect x="948" y="174" width="12" height="10" rx="1" />
      </g>

      {/* Neem tree, right */}
      <g className="stroke-blue-300" strokeWidth={2}>
        <path d="M1090 196 V156" />
        <g className="fill-blue-50">
          <circle cx="1074" cy="146" r="18" />
          <circle cx="1104" cy="142" r="20" />
          <circle cx="1088" cy="124" r="18" />
        </g>
      </g>

      {/* Palm tree, far right */}
      <g className="stroke-blue-300" strokeWidth={2}>
        <path d="M1260 202 C 1262 172 1268 148 1278 126" />
        <path d="M1278 126 C 1262 118 1246 122 1236 132" />
        <path d="M1278 126 C 1268 110 1252 106 1240 108" />
        <path d="M1278 126 C 1290 110 1306 108 1318 114" />
        <path d="M1278 126 C 1296 122 1310 130 1316 142" />
      </g>
    </svg>
  )
}
