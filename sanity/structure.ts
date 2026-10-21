import { Package, Settings, Tag } from "lucide-react"
import type { StructureResolver } from "sanity/structure"

export const singletonTypes = new Set(["siteSettings"])

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .icon(Settings)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site settings")
        ),
      S.divider(),
      S.documentTypeListItem("product")
        .title("Products")
        .icon(Package)
        .child(
          S.documentTypeList("product")
            .title("Products")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      S.documentTypeListItem("category")
        .title("Categories")
        .icon(Tag)
        .child(
          S.documentTypeList("category")
            .title("Categories")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
    ])
