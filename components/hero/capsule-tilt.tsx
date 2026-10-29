"use client"

import { useEffect, useRef, type ReactNode } from "react"

const MAX_DEG = 6
// Spring tuned to settle in ~0.6s with a little give.
const STIFFNESS = 0.06
const DAMPING = 0.82

// Tilts the capsule toward the cursor (mouse/trackpad only, never touch or
// reduced motion). Writes the transform straight to the element on each frame,
// so React never re-renders; the loop stops once the spring settles.
export function CapsuleTilt({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!el || !finePointer || reduced) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    const velocity = { x: 0, y: 0 }
    let frame = 0

    function step() {
      for (const axis of ["x", "y"] as const) {
        velocity[axis] = (velocity[axis] + (target[axis] - current[axis]) * STIFFNESS) * DAMPING
        current[axis] += velocity[axis]
      }
      el!.style.transform = `perspective(900px) rotateX(${current.x.toFixed(2)}deg) rotateY(${current.y.toFixed(2)}deg)`

      const settled =
        Math.abs(target.x - current.x) < 0.01 &&
        Math.abs(target.y - current.y) < 0.01 &&
        Math.abs(velocity.x) < 0.01 &&
        Math.abs(velocity.y) < 0.01
      frame = settled ? 0 : requestAnimationFrame(step)
    }

    function onPointerMove(event: PointerEvent) {
      const box = el!.getBoundingClientRect()
      // -1..1 from the capsule centre, measured across half the viewport.
      const dx = (event.clientX - (box.left + box.width / 2)) / (window.innerWidth / 2)
      const dy = (event.clientY - (box.top + box.height / 2)) / (window.innerHeight / 2)
      const clamp = (n: number) => Math.max(-1, Math.min(1, n))
      target.x = -clamp(dy) * MAX_DEG
      target.y = clamp(dx) * MAX_DEG
      if (!frame) frame = requestAnimationFrame(step)
    }

    function onLeave() {
      target.x = 0
      target.y = 0
      if (!frame) frame = requestAnimationFrame(step)
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onPointerMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
