// zod/mini: same validation as zod with a much smaller client bundle.
import * as z from "zod/mini"

import { enquiryRoles } from "@/lib/contact"

export const MESSAGE_MAX = 1000

// Tolerates spaces, dashes, brackets and a +91 / 91 / 0 prefix.
const indianMobile = /^(?:\+?91|0)?[6-9]\d{9}$/

const emailSchema = z.email()

export const enquirySchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Enter your full name."),
      z.maxLength(100, "Name is too long.")
    ),
  phone: z
    .string()
    .check(
      z.trim(),
      z.refine(
        (value) => value === "" || indianMobile.test(value.replace(/[\s\-()]/g, "")),
        "Enter a valid 10-digit mobile number."
      )
    ),
  email: z
    .string()
    .check(
      z.trim(),
      z.refine(
        (value) => value === "" || z.safeParse(emailSchema, value).success,
        "Enter a valid email address."
      )
    ),
  role: z.union([z.enum(enquiryRoles), z.literal("")]),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(5, "Tell us briefly what you would like to know."),
      z.maxLength(MESSAGE_MAX, `Keep the message under ${MESSAGE_MAX} characters.`)
    ),
  consent: z.literal(true, "Please agree before sending."),
})

export type EnquiryValues = z.infer<typeof enquirySchema>
export type EnquiryField = keyof EnquiryValues
