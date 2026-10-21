import { Package } from "lucide-react"
import { defineArrayMember, defineField, defineType } from "sanity"

import { claimCheck } from "../lib/claim-check"

export const scheduleOptions = [
  { title: "OTC (not scheduled)", value: "otc" },
  { title: "Schedule H", value: "h" },
  { title: "Schedule H1", value: "h1" },
]

const altField = defineField({
  name: "alt",
  title: "Alt text",
  type: "string",
  description:
    'Describe the pack for screen readers, e.g. "WeCalix — Calcium Carbonate, Vitamin D3 & Folic Acid tablets, 10 × 15 pack".',
  validation: (rule) => rule.required(),
})

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: Package,
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "composition", title: "Composition" },
    { name: "details", title: "Details" },
    { name: "images", title: "Images" },
    { name: "website", title: "Website" },
  ],
  fields: [
    // Basics
    defineField({
      name: "name",
      title: "Brand name",
      type: "string",
      group: "basics",
      description: "Brand name only. Add ™ or ® with the field below, not here.",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            typeof value === "string" && /[™®]/.test(value)
              ? "Remove ™ / ® from the name and use the Trademark symbol field."
              : true
          ),
    }),
    defineField({
      name: "mark",
      title: "Trademark symbol",
      type: "string",
      group: "basics",
      options: {
        list: [
          { title: "None", value: "" },
          { title: "™", value: "™" },
          { title: "®", value: "®" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "basics",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "productType",
      title: "Product type",
      type: "string",
      group: "basics",
      options: {
        list: [
          { title: "Pharmaceutical", value: "pharmaceutical" },
          { title: "Nutraceutical", value: "nutraceutical" },
          { title: "Wellness", value: "wellness" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      group: "basics",
      to: [{ type: "category" }],
      description: "Shown as the tag on the product card.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dosageForm",
      title: "Dosage form",
      type: "string",
      group: "basics",
      options: {
        list: [
          "Tablets",
          "Capsules",
          "Softgel Capsules",
          "Syrup",
          "Suspension",
          "Drops",
          "Sachet / Powder",
          "Gel / Cream",
          "Other",
        ],
      },
      initialValue: "Tablets",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "schedule",
      type: "string",
      group: "basics",
      description:
        "As printed on the pack. Schedule H / H1 products show an Rx tag and the prescription caution.",
      options: { list: scheduleOptions, layout: "radio" },
      initialValue: "otc",
      validation: (rule) => rule.required(),
    }),

    // Composition
    defineField({
      name: "composition",
      title: "Composition (short)",
      type: "string",
      group: "composition",
      description:
        "The generic name printed on the pack front. Shown on the product card.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "unitStatement",
      title: "Unit statement",
      type: "string",
      group: "composition",
      description: 'As printed, e.g. "Each film coated tablet contains:"',
    }),
    defineField({
      name: "ingredients",
      title: "Composition table",
      type: "array",
      group: "composition",
      of: [
        defineArrayMember({
          type: "object",
          name: "ingredientRow",
          fields: [
            defineField({
              name: "ingredient",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "standard",
              title: "IP / BP / USP",
              type: "string",
              options: { list: ["IP", "BP", "USP"] },
            }),
            defineField({
              name: "strength",
              type: "string",
              description: 'e.g. "150 mg", "1500 mcg", "1000 I.U."',
            }),
          ],
          preview: {
            select: { title: "ingredient", strength: "strength", standard: "standard" },
            prepare: ({ title, strength, standard }) => ({
              title,
              subtitle: [standard, strength].filter(Boolean).join(" · "),
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "excipients",
      type: "string",
      group: "composition",
      initialValue: "q.s.",
    }),
    defineField({
      name: "colour",
      type: "string",
      group: "composition",
      description: 'e.g. "Red Oxide of Iron"',
    }),

    // Details
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      group: "details",
      description:
        'One or two sentences. Use "supports" / "helps support" wording only. No cure or treatment claims.',
      validation: (rule) => rule.custom(claimCheck).warning(),
    }),
    defineField({
      name: "supports",
      title: "Supports",
      type: "array",
      group: "details",
      description:
        'Short factual lines like the pack badges, e.g. "Supports nerve health", "With active folate (5-MTHF)". No cure or treatment claims. Not shown for Schedule H / H1 products.',
      hidden: ({ document }) =>
        document?.schedule === "h" || document?.schedule === "h1",
      of: [
        defineArrayMember({
          type: "string",
          // Any factual wording; claim words block publishing.
          validation: (rule) => rule.custom(claimCheck),
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "directions",
      type: "string",
      group: "details",
      initialValue: "As directed by the Physician.",
    }),
    defineField({
      name: "pack",
      title: "Pack size",
      type: "string",
      group: "details",
      description: 'e.g. "10 × 10 Tablets". Use the × sign, not the letter x.',
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            typeof value === "string" && /\d\s*x\s*\d/i.test(value)
              ? 'Use the × sign instead of the letter "x".'
              : true
          )
          .warning(),
    }),
    defineField({
      name: "packType",
      title: "Pack type",
      type: "string",
      group: "details",
      options: {
        list: [
          "Alu-Alu",
          "Blister (Alu-PVC)",
          "Blister",
          "Strip",
          "Bottle",
          "Sachet",
          "Tube",
          "Other",
        ],
      },
    }),
    defineField({
      name: "storage",
      type: "text",
      rows: 2,
      group: "details",
      initialValue:
        "Store in a cool, dry & dark place. Keep medicine out of reach of children.",
    }),
    defineField({
      name: "shelfLife",
      title: "Shelf life",
      type: "string",
      group: "details",
      description: 'e.g. "24 months"',
    }),
    defineField({
      name: "manufacturer",
      title: "Manufactured by",
      type: "object",
      group: "details",
      description: "Exactly as printed on the pack.",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: "name", type: "string" }),
        defineField({ name: "address", type: "text", rows: 2 }),
        defineField({ name: "licenceNo", title: "Mfg. Lic. No.", type: "string" }),
      ],
    }),

    // Images
    defineField({
      name: "packImage",
      title: "Pack image",
      type: "image",
      group: "images",
      description:
        "Front of the 3D pack, on a white or transparent background. Not the flat print artwork.",
      options: { hotspot: true },
      fields: [altField],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "More pack images",
      type: "array",
      group: "images",
      description: "Composition side, licence side, strip.",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            altField,
            defineField({ name: "caption", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "leaflet",
      title: "Product leaflet (PDF)",
      type: "file",
      group: "images",
      options: { accept: "application/pdf" },
    }),

    // Website
    defineField({
      name: "relatedProducts",
      title: "Related products",
      type: "array",
      group: "website",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "product" }],
          options: {
            filter: ({ document }) => ({
              filter: "_id != $id",
              params: { id: document._id.replace(/^drafts\./, "") },
            }),
          },
        }),
      ],
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "website",
    }),
    defineField({
      name: "visible",
      title: "Show on website",
      type: "boolean",
      group: "website",
      initialValue: true,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "website",
      description: "Optional. For the product's own page (coming later).",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", type: "string", validation: (rule) => rule.max(60) }),
        defineField({
          name: "description",
          type: "text",
          rows: 2,
          validation: (rule) => rule.max(160),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      mark: "mark",
      composition: "composition",
      media: "packImage",
      visible: "visible",
    },
    prepare: ({ name, mark, composition, media, visible }) => ({
      title: `${name ?? "Untitled"}${mark ?? ""}${visible === false ? " (hidden)" : ""}`,
      subtitle: composition,
      media,
    }),
  },
})
