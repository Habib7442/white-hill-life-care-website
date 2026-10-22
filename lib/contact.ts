import { company } from "@/lib/site"
import type { EnquiryValues } from "@/lib/enquiry-schema"

function digitsOf(phone: string) {
  return phone.replace(/\D/g, "")
}

/** "7002916175" → "+91 70029 16175". Other formats are shown as entered. */
export function formatPhone(phone: string) {
  const digits = digitsOf(phone).replace(/^(91|0)(?=\d{10}$)/, "")
  if (digits.length !== 10) return phone.trim()
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
}

/** tel: link; a bare 10-digit Indian number gets the +91 prefix. */
export function telHref(phone: string) {
  const digits = digitsOf(phone).replace(/^0+/, "")
  return `tel:+${digits.length === 10 ? `91${digits}` : digits}`
}

export const enquiryRoles = [
  "Distributor / Stockist",
  "Pharmacy",
  "Healthcare professional",
  "Other",
] as const

/** Opening line for a WhatsApp chat started from the contact details. */
export const contactWhatsappMessage = `Hello ${company.name},\nI would like to make an enquiry.`

/** The enquiry form's WhatsApp message. Empty fields are left out. */
export function enquiryMessage(values: EnquiryValues, siteHost: string) {
  const rows = [
    ["Name", values.name],
    ["I am a", values.role],
    ["Phone", values.phone],
    ["Email", values.email],
    ["Message", values.message],
  ].filter(([, value]) => value)

  return [
    contactWhatsappMessage,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Sent from ${siteHost}`,
  ].join("\n")
}
