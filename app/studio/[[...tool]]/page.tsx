import { notFound } from "next/navigation"
import { connection } from "next/server"
import { NextStudio } from "next-sanity/studio"
import { Suspense } from "react"

import config from "@/sanity.config"

export { metadata, viewport } from "next-sanity/studio"

// The client edits content in the separate admin panel, so the embedded
// Studio is for local development only (`npm run dev`). Production builds
// (including Vercel previews) answer /studio with the site's 404.
const studioEnabled = process.env.NODE_ENV !== "production"

// The catch-all params make this route's metadata request-time. The marker
// tells Next that's intended (Studio is an admin tool, rendered client-side).
async function RequestTimeMarker() {
  await connection()
  return null
}

export default function StudioPage() {
  if (!studioEnabled) notFound()

  return (
    <>
      <NextStudio config={config} />
      <Suspense>
        <RequestTimeMarker />
      </Suspense>
    </>
  )
}
