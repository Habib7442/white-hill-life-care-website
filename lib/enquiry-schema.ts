import { z } from "zod"

import { enquiryRoles } from "@/lib/contact"

export const MESSAGE_MAX = 1000

// Tolerates spaces, dashes, brackets and a +91 / 91 / 0 prefix.
const indianMobile = /^(?:\+?91|0)?[6-9]\d{9}$/

const optional = z.string().trim().optional().default("")

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "Name is too long."),
  phone: optional.refine(
    (value) => value === "" || indianMobile.test(value.replace(/[\s\-()]/g, "")),
    "Enter a valid 10-digit mobile number."
  ),
  email: optional.refine(
    (value) => value === "" || z.email().safeParse(value).success,
    "Enter a valid email address."
  ),
  role: z.enum(enquiryRoles).or(z.literal("")).optional().default(""),
  message: z
    .string()
    .trim()
    .min(5, "Tell us briefly what you would like to know.")
    .max(MESSAGE_MAX, `Keep the message under ${MESSAGE_MAX} characters.`),
  consent: z.literal(true, "Please agree before sending."),
})

export type EnquiryValues = z.infer<typeof enquirySchema>
export type EnquiryField = keyof EnquiryValues
