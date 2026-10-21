import { Container } from "@/components/layout/container"

// Placeholder shaped like the product page's top section. Pulses only when
// the visitor allows motion.
export function ProductPageSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading medicine details"
      className="bg-white pt-(--header-height)"
    >
      <Container className="pt-8 pb-16 lg:pb-24">
        <div className="h-5 w-56 rounded-tag bg-blue-25" />
        <div className="mt-6 grid gap-10 motion-safe:animate-pulse lg:grid-cols-2 lg:gap-16">
          <div className="aspect-square rounded-card bg-blue-25" />
          <div className="flex flex-col gap-5">
            <div className="h-7 w-40 rounded-full bg-blue-25" />
            <div className="h-11 w-3/4 rounded-tag bg-blue-25" />
            <div className="h-5 w-full rounded-tag bg-blue-25" />
            <div className="h-5 w-5/6 rounded-tag bg-blue-25" />
            <div className="h-28 w-full rounded-card-sm bg-blue-25" />
            <div className="h-12 w-48 rounded-full bg-blue-25" />
          </div>
        </div>
      </Container>
    </div>
  )
}
