import Image from "next/image"

import { RuralScene } from "@/components/preloader/rural-scene"
import { company } from "@/lib/site"

// Splash screen on every page load. CSS-only animation; skipped for reduced motion.
export function Preloader() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex animate-splash-exit flex-col overflow-hidden bg-linear-to-b from-white to-blue-25 motion-reduce:hidden"
    >
      <div className="absolute inset-x-0 top-0 h-1/2 dot-grid mask-b-from-0%" />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 pb-[22vh] text-center">
        <Image
          src={company.mark.src}
          alt=""
          width={company.mark.width}
          height={company.mark.height}
          loading="eager"
          fetchPriority="high"
          className="w-48 animate-splash-pop lg:w-[280px]"
        />
        <p className="mt-5 animate-splash-rise font-heading text-[26px] leading-tight font-semibold text-navy-900 [animation-delay:0.1s] lg:text-4xl">
          {company.legalName}
        </p>
        <p className="mt-2.5 animate-splash-rise text-xs font-semibold tracking-[0.14em] text-blue-600 uppercase [animation-delay:0.2s] lg:text-[13px]">
          {company.tagline}
        </p>
        <div className="mt-6 h-0.5 w-40 overflow-hidden rounded-full bg-blue-100">
          <div className="h-full origin-left animate-splash-progress rounded-full bg-blue-600" />
        </div>
      </div>

      <RuralScene className="absolute inset-x-0 bottom-0 h-[28vh] max-h-[260px] w-full animate-splash-scene" />
    </div>
  )
}
