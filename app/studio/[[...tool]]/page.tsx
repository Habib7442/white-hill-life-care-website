import { connection } from "next/server"
import { NextStudio } from "next-sanity/studio"
import { Suspense } from "react"

import config from "@/sanity.config"

export { metadata, viewport } from "next-sanity/studio"

// The catch-all params make this route's metadata request-time. The marker
// tells Next that's intended (Studio is an admin tool, rendered client-side).
async function RequestTimeMarker() {
  await connection()
  return null
}

export default function StudioPage() {
  return (
    <>
      <NextStudio config={config} />
      <Suspense>
        <RequestTimeMarker />
      </Suspense>
    </>
  )
}
