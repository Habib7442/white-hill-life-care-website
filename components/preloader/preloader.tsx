import Image from "next/image"

import { HospitalScene } from "@/components/preloader/hospital-scene"
import { PreloaderSpinner } from "@/components/preloader/spinner"
import { SplashBackground } from "@/components/preloader/splash-background"
import { company } from "@/lib/site"

/**
 * Modern Blue Medical Preloader (splash screen).
 * Coded architecture with clear visual hierarchy:
 * 1. Clean sky background with subtle flowing wave ribbons (no dot grids).
 * 2. Unobstructed header stack (Logo mark, Legal name, Tagline, and Live spinner).
 * 3. Hospital scene grounded at the bottom, placed strictly after the loading bar
 *    with a soft feather top edge dissolve so it never collides or feels cut.
 */
export function Preloader() {
  return (
    <aside
      data-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex animate-splash-exit flex-col justify-between overflow-hidden bg-[#EBF5FD] motion-reduce:hidden"
    >
      {/* Background soft sky gradient and elegant flowing wave ribbons */}
      <SplashBackground />

      {/* Top Section: Branding & Spinner Stack (Placed on clean, unobstructed sky) */}
      <div className="relative z-20 flex shrink-0 flex-col items-center justify-center px-4 pt-6 text-center sm:pt-8 md:pt-10">
        {/* WH 3D Leaf Monogram Mark */}
        <Image
          src={company.mark.src}
          alt=""
          width={company.mark.width}
          height={company.mark.height}
          loading="eager"
          sizes="(min-width: 1024px) 220px, 150px"
          fetchPriority="high"
          className="w-28 animate-splash-pop drop-shadow-[0_10px_20px_rgba(37,99,235,0.15)] sm:w-36 md:w-40 lg:w-44"
        />

        {/* Company Legal Name in Serif Typography */}
        <p className="mt-2.5 animate-splash-rise font-heading text-lg font-bold tracking-tight text-navy-900 [animation-delay:0.1s] sm:mt-3 sm:text-2xl md:text-3xl">
          {company.legalName}
        </p>

        {/* Tagline framed by fine horizontal rules: — HEALTHCARE & WELLNESS — */}
        <div className="mt-1.5 flex items-center justify-center gap-2.5 animate-splash-rise [animation-delay:0.18s] sm:mt-2 sm:gap-3.5">
          <span className="h-px w-8 bg-linear-to-r from-transparent to-blue-600/70 sm:w-12" />
          <p className="text-[10px] font-semibold tracking-[0.22em] text-blue-600 uppercase sm:text-xs">
            {company.tagline}
          </p>
          <span className="h-px w-8 bg-linear-to-l from-transparent to-blue-600/70 sm:w-12" />
        </div>

        {/* Circular Glowing Spinner placed directly below the tagline */}
        <div className="mt-3 animate-splash-rise [animation-delay:0.25s] sm:mt-4">
          <PreloaderSpinner size={38} />
        </div>
      </div>

      {/* Bottom Section: Modern Blue Medical Hospital Scene (Placed below header, edge-to-edge) */}
      <div className="relative z-10 flex min-h-0 w-full flex-1 items-end justify-center animate-splash-scene overflow-hidden">
        <HospitalScene className="h-full w-full max-h-[50vh] sm:max-h-[54vh] lg:max-h-[58vh]" />
      </div>
    </aside>
  )
}
