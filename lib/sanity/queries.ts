import { defineQuery } from "next-sanity"

// A product is shown only when it's visible and complete (name, slug,
// composition, category, and pack image with alt text), so the site never
// renders a broken card or page.
const completeProduct = `
  _type == "product" && visible == true
  && defined(name) && defined(slug.current) && defined(composition)
  && defined(category->title)
  && defined(packImage.asset) && defined(packImage.alt)
`

const imageAsset = `asset->{ _id, url, metadata { lqip, dimensions { width, height } } }`

// Shared by every query that renders a ProductCard.
const productCardFields = `
  _id,
  name,
  mark,
  "slug": slug.current,
  composition,
  description,
  dosageForm,
  productType,
  pack,
  schedule,
  "category": category->{ _id, title, "slug": slug.current, order },
  "ingredientNames": ingredients[].ingredient,
  packImage { alt, ${imageAsset} }
`

export const productsQuery = defineQuery(`
  *[${completeProduct}] | order(order asc) { ${productCardFields} }
`)

export const productSlugsQuery = defineQuery(`
  *[${completeProduct}] { "slug": slug.current }
`)

export const productBySlugQuery = defineQuery(`
  *[${completeProduct} && slug.current == $slug][0] {
    ${productCardFields},
    unitStatement,
    ingredients[]{ _key, ingredient, standard, strength },
    excipients,
    colour,
    supports,
    directions,
    packType,
    storage,
    shelfLife,
    manufacturer,
    gallery[defined(asset) && defined(alt)]{ _key, alt, caption, ${imageAsset} },
    "leafletUrl": leaflet.asset->url,
    seo,
    "related": *[${completeProduct} && _id in ^.relatedProducts[]._ref]
      | order(order asc) { ${productCardFields} },
    "sameCategory": *[${completeProduct} && category._ref == ^.category._ref && _id != ^._id]
      | order(order asc) [0...3] { ${productCardFields} }
  }
`)

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    companyName, address, phone, email, whatsapp, cin, gstin, drugLicence, fssaiLicence
  }
`)
