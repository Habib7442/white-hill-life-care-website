import Image from "next/image"

import { company } from "@/lib/site"

/**
 * Home splash screen (prompts/preloader-navy-redesign.md): white logo, tagline
 * and loading bar on the tablets photo, tinted to the brand navy.
 */
export function Preloader() {
  return (
    <aside
      data-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex animate-splash-exit items-center justify-center overflow-hidden bg-navy-900 motion-reduce:hidden"
    >
      {/* Served as it is: the splash lasts 2.8 s, too short to wait for the image
          optimizer. Lazy, so a skipped splash downloads nothing. */}
      <Image
        src="/brand/splash-bg.webp"
        alt=""
        fill
        unoptimized
        fetchPriority="high"
        className="object-cover opacity-45 mix-blend-luminosity"
      />
      {/* Darkens the edges towards the navy of the reference, with a soft glow top left. */}
      <div className="absolute inset-0 bg-radial from-navy-900/40 via-navy-900/60 to-navy-900/85" />
      <div className="absolute -top-1/4 -left-1/4 size-[70vmax] rounded-full bg-blue-600/30 blur-3xl" />

      <div className="relative -mt-[12svh] flex flex-col items-center px-6 text-center">
        <Image
          src={company.logoWhite.src}
          alt=""
          width={company.logoWhite.width}
          height={company.logoWhite.height}
          unoptimized
          fetchPriority="high"
          className="w-60 animate-splash-pop md:w-[300px] 2xl:w-[340px]"
        />

        <div className="mt-5 flex animate-splash-rise items-center gap-3 [animation-delay:0.15s]">
          <span className="h-px w-8 bg-white/50 md:w-12" />
          <p className="text-xs font-semibold tracking-[0.3em] text-white uppercase md:text-sm">
            {company.tagline}
          </p>
          <span className="h-px w-8 bg-white/50 md:w-12" />
        </div>

        {/* Loading bar: fills over the splash's life, just before it fades out. */}
        <div className="mt-6 h-[3px] w-40 animate-splash-rise overflow-hidden rounded-full bg-white/20 [animation-delay:0.25s] md:w-[200px]">
          <div className="h-full origin-left animate-splash-progress rounded-full bg-white" />
        </div>
      </div>
    </aside>
  )
}
