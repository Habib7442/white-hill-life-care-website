import type { EnquiryValues } from "@/lib/enquiry-schema"
import { contactHref } from "@/lib/site-nav"

export const enquiryRoles = [
  "Distributor / Stockist",
  "Pharmacy",
  "Healthcare professional",
  "Other",
] as const

/** Longest medicine text accepted from a link, since anyone can edit a URL. */
const MEDICINE_MAX = 200

/** Contact page link that prefills the form's message with this medicine. */
export function medicineEnquiryHref(product: {
  name: string
  mark?: string | null
  pack?: string | null
}) {
  const name = `${product.name}${product.mark ?? ""}`
  const medicine = product.pack ? `${name} (${product.pack})` : name
  return `${contactHref}?medicine=${encodeURIComponent(medicine)}`
}

export function medicineEnquiryMessage(medicine: string) {
  return `I would like to enquire about ${medicine.slice(0, MEDICINE_MAX)}.`
}

/** The enquiry as Web3Forms expects it. These labels appear in the email. Empty fields are left out. */
export function enquiryFormData(values: EnquiryValues, accessKey: string) {
  const data = new FormData()
  data.append("access_key", accessKey)
  data.append("subject", `New website enquiry from ${values.name}`)
  data.append("name", values.name)
  // Web3Forms makes this the reply-to address, so Reply answers the customer.
  data.append("email", values.email)
  if (values.phone) data.append("phone", values.phone)
  if (values.role) data.append("I am a", values.role)
  data.append("message", values.message)
  return data
}
