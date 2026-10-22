import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

type WebhookPayload = { _type?: string; source?: string }

// Content types the site caches by tag (lib/sanity/fetch.ts).
const contentTypes = new Set(["product", "category", "siteSettings"])

// Called by the Sanity webhook (publish/unpublish/delete, projection {_type})
// and directly by the admin panel after each save ({_type, source: "admin"}),
// both signed with SANITY_REVALIDATE_SECRET. Expires every cached fetch
// tagged with the document's type immediately ({ expire: 0 }): with "max",
// a page rebuilt right after a change could be built from the stale data
// and then cached as fresh (seen on 22 Oct 2026).
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ message: "Not configured" }, { status: 500 })
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, false)

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
    }
    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type" }, { status: 400 })
    }
    if (!contentTypes.has(body._type)) {
      return NextResponse.json({ ignored: body._type })
    }

    // Sanity webhooks can arrive before the change is readable by queries,
    // so wait as next-sanity does by default. The admin calls only after its
    // write is committed and visible, so it skips the wait.
    if (body.source !== "admin") {
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }

    revalidateTag(body._type, { expire: 0 })
    return NextResponse.json({ revalidated: body._type })
  } catch {
    return NextResponse.json({ message: "Bad request" }, { status: 400 })
  }
}
