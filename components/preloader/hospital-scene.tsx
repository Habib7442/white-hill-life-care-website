import Image from "next/image"

interface HospitalSceneProps {
  className?: string
}

export function HospitalScene({ className = "" }: HospitalSceneProps) {
  return (
    <div
      className={`relative w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_100%)] ${className}`}
    >
      {/* Soft gradient blend at top edge so the sky dissolves naturally with zero harsh cut */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-[#EAF4FD] via-[#EAF4FD]/30 to-transparent" />

      {/* Modern Blue Medical Hospital Scene (Edge-to-edge full width) */}
      <div className="relative h-full w-full">
        <Image
          src="/brand/hospital-scene.webp"
          alt="Modern medical healthcare center with medicines"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      </div>
    </div>
  )
}
