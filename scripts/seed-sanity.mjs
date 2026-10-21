// One-off seed: the 4 categories and 3 of the products from PRD.md §5.4.
// WeCalix was replaced by WeCalix XT (product-wecalix-xt), which was entered
// with the client's full data directly in Sanity and is not seeded here.
// Run with `npm run seed` (reads .env.local). Safe to rerun: fixed IDs +
// createOrReplace. Rerunning overwrites edits made in Studio to these 4
// products, so only rerun before the client starts editing.
//
// Pack images: put `assets/products/<slug>.(png|jpg|jpeg|webp)` in place to
// upload them; otherwise add them in Studio.

import { createReadStream, existsSync } from "node:fs"
import path from "node:path"

import { createClient } from "@sanity/client"

const { NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN } =
  process.env

if (!NEXT_PUBLIC_SANITY_PROJECT_ID || !NEXT_PUBLIC_SANITY_DATASET || !SANITY_API_WRITE_TOKEN) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET or SANITY_API_WRITE_TOKEN in .env.local"
  )
  process.exit(1)
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-10-01",
  token: SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const categories = [
  { id: "bone", title: "Bone & Calcium", order: 1 },
  { id: "women", title: "Women's Wellness", order: 2 },
  { id: "nerve", title: "Nerve Health", order: 3 },
  { id: "iron", title: "Iron & Haemoglobin", order: 4 },
]

const storage = "Store in a cool, dry & dark place. Keep medicine out of reach of children."

// Values exactly as PRD.md §5.4. Strengths, Rx status and manufacturer are
// "client to confirm"; anything not in the PRD is left for the client.
const products = [
  {
    slug: "cynovera",
    name: "Cynovera",
    mark: "®",
    category: "women",
    composition: "Myo-Inositol, Folic Acid, Vitamin D3 & Essential Micronutrients",
    pack: "10 × 10 Tablets",
    schedule: "otc",
    order: 2,
    alt: "Cynovera — Myo-Inositol, Folic Acid, Vitamin D3 & essential micronutrients tablets, 10 × 10 pack",
  },
  {
    slug: "nersovia-cd3",
    name: "Nersovia-CD3",
    mark: "",
    category: "nerve",
    composition:
      "Benfotiamine, Methylcobalamin, Alpha Lipoic Acid, Chromium Polynicotinate, Folic Acid, Inositol, Pyridoxine HCl, Calcium Citrate Malate & Vitamin D3 Tablets",
    unitStatement: "Each film coated tablet contains:",
    ingredients: [
      ["Benfotiamine", "150 mg"],
      ["Methylcobalamin", "1500 mcg"],
      ["Alpha Lipoic Acid", "300 mg"],
      ["Chromium Polynicotinate", "200 mcg"],
      ["Folic Acid", "1.5 mg"],
      ["Inositol", "300 mg"],
      ["Pyridoxine HCl", "3 mg"],
      ["Calcium Citrate Malate", "500 mg"],
      ["Vitamin D3", "1000 I.U."],
    ],
    pack: "10 × 10 Tablets",
    schedule: "h",
    order: 3,
    alt: "Nersovia-CD3 — Benfotiamine, Methylcobalamin, Alpha Lipoic Acid & Vitamin D3 tablets, 10 × 10 pack",
  },
  {
    slug: "haemoverse",
    name: "Haemoverse",
    mark: "™",
    category: "iron",
    composition: "Ferrous Ascorbate & Folic Acid Tablets",
    pack: "10 × 10 Tablets",
    schedule: "otc",
    order: 4,
    alt: "Haemoverse — Ferrous Ascorbate & Folic Acid tablets, 10 × 10 pack",
  },
]

async function uploadPackImage(slug) {
  for (const ext of ["png", "jpg", "jpeg", "webp"]) {
    const file = path.join("assets", "products", `${slug}.${ext}`)
    if (existsSync(file)) {
      const asset = await client.assets.upload("image", createReadStream(file), {
        filename: path.basename(file),
      })
      return asset._id
    }
  }
  return null
}

const tx = client.transaction()

for (const c of categories) {
  tx.createOrReplace({
    _id: `category-${c.id}`,
    _type: "category",
    title: c.title,
    slug: { _type: "slug", current: c.id },
    order: c.order,
  })
}

for (const p of products) {
  const assetId = await uploadPackImage(p.slug)
  console.log(`${p.name}: ${assetId ? "pack image uploaded" : "no image in assets/products/, add it in Studio"}`)

  tx.createOrReplace({
    _id: `product-${p.slug}`,
    _type: "product",
    name: p.name,
    mark: p.mark,
    slug: { _type: "slug", current: p.slug },
    category: { _type: "reference", _ref: `category-${p.category}` },
    dosageForm: "Tablets",
    schedule: p.schedule,
    composition: p.composition,
    ...(p.unitStatement && { unitStatement: p.unitStatement }),
    ...(p.ingredients && {
      ingredients: p.ingredients.map(([ingredient, strength], i) => ({
        _key: `ingredient-${i}`,
        _type: "ingredientRow",
        ingredient,
        strength,
      })),
    }),
    excipients: "q.s.",
    directions: "As directed by the Physician.",
    pack: p.pack,
    storage,
    ...(assetId && {
      packImage: { _type: "image", asset: { _type: "reference", _ref: assetId }, alt: p.alt },
    }),
    order: p.order,
    visible: true,
  })
}

await tx.commit()
console.log(`${categories.length} categories and ${products.length} products written.`)
