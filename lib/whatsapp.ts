import { company } from "@/lib/site"

/**
 * wa.me link that opens a chat with a prefilled message. `number` may include
 * spaces, "+" or a leading 0; a 10-digit Indian mobile gets the 91 prefix.
 */
export function whatsappHref(number: string, text: string) {
  let digits = number.replace(/\D/g, "").replace(/^0+/, "")
  if (digits.length === 10) digits = `91${digits}`
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

/** Prefilled enquiry for a product. The link makes WhatsApp show the pack image preview. */
export function productEnquiryMessage(product: {
  name: string
  mark?: string | null
  pack?: string | null
  url: string
}) {
  const name = `${product.name}${product.mark ?? ""}`
  return [
    `Hello ${company.name},`,
    `I would like to enquire about ${name}${product.pack ? ` (${product.pack})` : ""}.`,
    product.url,
  ].join("\n")
}
