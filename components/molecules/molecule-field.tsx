import { cn } from "cn"

// Glowing molecule clusters for the navy Quality background (DESIGN.md §6).
// Clusters sit in the corners, clear of the heading and cards.

type Atom = [x: number, y: number, r: number]

// One cluster: atoms and the bonds between them (indexes into atoms).
const atoms: Atom[] = [
  [60, 40, 7],
  [100, 63, 9],
  [100, 109, 7],
  [60, 132, 10],
  [20, 109, 7],
  [20, 63, 8],
  [145, 38, 12],
  [145, 135, 6],
  [60, 180, 9],
  [180, 70, 5],
]
const bonds: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [1, 6],
  [2, 7],
  [3, 8],
  [6, 9],
]

function Cluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={cn("absolute", className)}>
      <g className="stroke-blue-300" strokeWidth="2.5" strokeLinecap="round">
        {bonds.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={atoms[a][0]} y1={atoms[a][1]} x2={atoms[b][0]} y2={atoms[b][1]} />
        ))}
      </g>
      {atoms.map(([x, y, r], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={r}
          className={index % 3 === 0 ? "fill-blue-200" : "fill-blue-300"}
        />
      ))}
    </svg>
  )
}

export function MoleculeField({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      {/* Soft light behind the clusters. */}
      <div className="absolute -top-32 -left-32 size-[28rem] rounded-full bg-blue-600/30 blur-3xl" />
      <div className="absolute -right-24 -bottom-40 size-[32rem] rounded-full bg-blue-600/30 blur-3xl" />

      <Cluster className="-top-6 -left-8 w-44 rotate-12 opacity-40 blur-[1px] lg:w-56" />
      <Cluster className="top-24 left-40 hidden w-24 -rotate-12 opacity-20 blur-[3px] xl:block" />
      <Cluster className="-top-10 right-6 hidden w-36 -rotate-6 opacity-25 blur-[2px] md:block" />
      <Cluster className="-right-10 -bottom-8 w-52 rotate-45 opacity-40 lg:w-72" />
      <Cluster className="bottom-6 left-[38%] hidden w-28 rotate-90 opacity-20 blur-[3px] lg:block" />
      <Cluster className="-bottom-12 -left-6 hidden w-40 -rotate-[30deg] opacity-30 blur-[2px] sm:block" />
    </div>
  )
}
