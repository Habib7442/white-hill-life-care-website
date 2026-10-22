import { cn } from "cn"

// Faint decorative molecule for section corners (DESIGN.md §6).
export function CornerMolecule({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 200"
      fill="none"
      className={cn("pointer-events-none", className)}
    >
      <g className="stroke-blue-300" strokeWidth="3" strokeLinecap="round">
        <polygon points="120,40 160,63 160,109 120,132 80,109 80,63" />
        <line x1="160" y1="63" x2="205" y2="38" />
        <line x1="80" y1="109" x2="38" y2="135" />
        <line x1="120" y1="132" x2="120" y2="178" />
        <line x1="120" y1="40" x2="120" y2="12" />
      </g>
      <g className="fill-blue-300">
        <circle cx="120" cy="40" r="9" />
        <circle cx="160" cy="63" r="9" />
        <circle cx="160" cy="109" r="9" />
        <circle cx="80" cy="63" r="9" />
        <circle cx="120" cy="178" r="7" />
      </g>
      <g className="fill-blue-200">
        <circle cx="120" cy="132" r="12" />
        <circle cx="80" cy="109" r="12" />
        <circle cx="205" cy="38" r="14" />
        <circle cx="38" cy="135" r="11" />
        <circle cx="120" cy="12" r="6" />
      </g>
    </svg>
  )
}
