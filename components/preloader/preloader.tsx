import Image, { getImageProps } from "next/image"

import { company } from "@/lib/site"

// Pre-sized in scripts/prepare-splash-art.py and served as they are: the splash
// only lasts 2.8 s, too short to wait for the on-demand image optimizer.
const art = {
  landscape: { src: "/brand/splash-scene.webp", width: 1672, height: 941 },
  /** Tablets upright: phone art would leave too little sky above the roof. */
  portrait: { src: "/brand/splash-scene-portrait.webp", width: 996, height: 2150 },
  phone: { src: "/brand/splash-scene-phone.webp", width: 941, height: 2090 },
}

/**
 * Home splash screen (prompts/preloader-reference-redesign.md). The brand stack
 * sits in the art's sky and scales with it (--splash-unit in app/globals.css),
 * so it stays clear of the building at any window shape.
 */
export function Preloader() {
  const { props: image } = getImageProps({
    ...art.landscape,
    alt: "",
    unoptimized: true,
    fetchPriority: "high",
  })

  return (
    <aside
      data-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[100] animate-splash-exit overflow-hidden bg-blue-25 motion-reduce:hidden"
    >
      <picture>
        <source media="(orientation: portrait) and (max-width: 640px)" srcSet={art.phone.src} />
        <source media="(orientation: portrait)" srcSet={art.portrait.src} />
        <img
          {...image}
          alt=""
          style={undefined}
          className="absolute inset-0 size-full object-cover object-bottom"
        />
      </picture>

      <div className="relative flex h-(--splash-sky) flex-col items-center justify-center px-4 text-center">
        <Image
          src={company.mark.src}
          alt=""
          width={company.mark.width}
          height={company.mark.height}
          unoptimized
          fetchPriority="high"
          className="h-[calc(var(--splash-unit)*0.38)] w-auto animate-splash-pop"
        />

        <p className="mt-[calc(var(--splash-unit)*0.03)] animate-splash-rise font-heading text-[length:calc(var(--splash-unit)*0.105)] leading-tight font-bold tracking-tight whitespace-nowrap text-navy-900 [animation-delay:0.1s]">
          {company.legalName}
        </p>

        <div className="mt-[calc(var(--splash-unit)*0.025)] flex animate-splash-rise items-center gap-[calc(var(--splash-unit)*0.03)] [animation-delay:0.18s]">
          <span className="h-px w-[calc(var(--splash-unit)*0.08)] bg-blue-600/70 max-[359px]:hidden" />
          <p className="text-[length:max(10px,calc(var(--splash-unit)*0.036))] font-semibold tracking-[0.22em] whitespace-nowrap text-blue-600 uppercase [@media(orientation:portrait)_and_(max-width:640px)]:text-blue-700">
            {company.tagline}
          </p>
          <span className="h-px w-[calc(var(--splash-unit)*0.08)] bg-blue-600/70 max-[359px]:hidden" />
        </div>

        {/* Loading bar: fills over the splash's life, just before it fades out. */}
        <div className="mt-[calc(var(--splash-unit)*0.03)] h-1 w-[calc(var(--splash-unit)*0.62)] animate-splash-rise overflow-hidden rounded-full bg-blue-200 [animation-delay:0.25s] [@media(orientation:portrait)_and_(max-width:640px)]:bg-white/70">
          <div className="h-full origin-left animate-splash-progress rounded-full bg-blue-600" />
        </div>
      </div>
    </aside>
  )
}
