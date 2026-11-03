import Image from "next/image"

interface HospitalSceneProps {
  className?: string
}

export function HospitalScene({ className = "" }: HospitalSceneProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Soft gradient blend at top edge to smoothly merge with the sky */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-[#EBF4FD] via-[#EBF4FD]/40 to-transparent" />

      {/* Full-bleed edge-to-edge hospital illustration */}
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
