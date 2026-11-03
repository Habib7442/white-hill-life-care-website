import Image from "next/image"

import { PreloaderSpinner } from "@/components/preloader/spinner"

/**
 * Modern Blue Medical Preloader (splash screen).
 * Renders the full-screen edge-to-edge WhiteHill Healthcare & Wellness composition
 * exactly matching the user's reference mockup, with a live rotating glowing spinner.
 */
export function Preloader() {
  return (
    <aside
      data-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex animate-splash-exit items-center justify-center overflow-hidden bg-[#EDF6FD] motion-reduce:hidden"
    >
      {/* Full-bleed edge-to-edge visual matching the user's design reference exactly */}
      <div className="relative h-full w-full">
        <Image
          src="/brand/preloader-poster-clean.webp"
          alt="WhiteHill Lifecares - Healthcare & Wellness"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Live rotating glowing circular spinner */}
        <div className="pointer-events-none absolute top-[47.2%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <PreloaderSpinner
            size={48}
            className="drop-shadow-[0_0_12px_rgba(56,189,248,0.85)] sm:size-14 md:size-16"
          />
        </div>
      </div>
    </aside>
  )
}
