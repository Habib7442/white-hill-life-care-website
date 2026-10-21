import { Settings } from "lucide-react"
import { defineField, defineType } from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: Settings,
  fields: [
    defineField({
      name: "companyName",
      title: "Company name",
      type: "string",
      initialValue: "WhiteHill Lifecares Pvt Ltd",
    }),
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "address", type: "text", rows: 3 }),
    defineField({ name: "phone", type: "string" }),
    defineField({
      name: "email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp number",
      type: "string",
    }),
    defineField({ name: "cin", title: "CIN", type: "string" }),
    defineField({ name: "gstin", title: "GSTIN", type: "string" }),
    defineField({
      name: "drugLicence",
      title: "Drug licence no(s).",
      type: "string",
      description: "Wholesale drug licence numbers, e.g. 20B / 21B.",
    }),
    defineField({
      name: "fssaiLicence",
      title: "FSSAI licence no.",
      type: "string",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
})
