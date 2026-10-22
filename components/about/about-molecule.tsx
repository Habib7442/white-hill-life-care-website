import { cn } from "cn"

type Atom = { x: number; y: number; r: number; heavy?: boolean }

// Hexagonal ring with side chains (DESIGN.md §6): glossy blue atoms, a few
// navy "heavy" atoms for depth, bonds in the bond colour.
const ring: Atom[] = [
  { x: 200, y: 110, r: 22 },
  { x: 262, y: 146, r: 18 },
  { x: 262, y: 218, r: 22, heavy: true },
  { x: 200, y: 254, r: 18 },
  { x: 138, y: 218, r: 22 },
  { x: 138, y: 146, r: 18 },
]

const branches: { from: number; atom: Atom }[] = [
  { from: 0, atom: { x: 200, y: 44, r: 13 } },
  { from: 1, atom: { x: 322, y: 112, r: 16 } },
  { from: 2, atom: { x: 322, y: 252, r: 12 } },
  { from: 3, atom: { x: 200, y: 322, r: 15, heavy: true } },
  { from: 4, atom: { x: 78, y: 252, r: 14 } },
  { from: 5, atom: { x: 78, y: 112, r: 12 } },
]

// Small atoms that drift slowly (motion-safe only).
const floating: Atom[] = [
  { x: 356, y: 60, r: 7 },
  { x: 48, y: 318, r: 8 },
  { x: 340, y: 316, r: 6 },
]

export function AboutMolecule({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 360" fill="none" className={cn(className)}>
      <defs>
        <radialGradient id="about-atom" cx="35%" cy="30%" r="70%">
          <stop offset="0%" style={{ stopColor: "var(--color-white)" }} />
          <stop offset="45%" style={{ stopColor: "var(--color-blue-300)" }} />
          <stop offset="100%" style={{ stopColor: "var(--color-blue-600)" }} />
        </radialGradient>
        <radialGradient id="about-atom-heavy" cx="35%" cy="30%" r="70%">
          <stop offset="0%" style={{ stopColor: "var(--color-blue-300)" }} />
          <stop offset="55%" style={{ stopColor: "var(--color-blue-700)" }} />
          <stop offset="100%" style={{ stopColor: "var(--color-navy-900)" }} />
        </radialGradient>
      </defs>

      <g className="stroke-bond" strokeWidth="6" strokeLinecap="round">
        {ring.map((atom, i) => {
          const next = ring[(i + 1) % ring.length]
          return <line key={i} x1={atom.x} y1={atom.y} x2={next.x} y2={next.y} />
        })}
        {branches.map(({ from, atom }) => (
          <line key={from} x1={ring[from].x} y1={ring[from].y} x2={atom.x} y2={atom.y} />
        ))}
      </g>
      {/* Inner ring for the aromatic look. */}
      <circle cx="200" cy="182" r="38" className="stroke-blue-200" strokeWidth="4" />

      {[...ring, ...branches.map((b) => b.atom)].map((atom, i) => (
        <circle
          key={i}
          cx={atom.x}
          cy={atom.y}
          r={atom.r}
          fill={atom.heavy ? "url(#about-atom-heavy)" : "url(#about-atom)"}
        />
      ))}

      <g className="motion-safe:animate-float">
        {floating.map((atom, i) => (
          <circle key={i} cx={atom.x} cy={atom.y} r={atom.r} className="fill-blue-200" />
        ))}
      </g>
    </svg>
  )
}
