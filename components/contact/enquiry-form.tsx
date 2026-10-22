"use client"

import { useRef, useState, type FormEvent, type ReactNode, type SyntheticEvent } from "react"
import Link from "next/link"
import { CheckCircle2, MessageCircle } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { enquiryMessage, enquiryRoles } from "@/lib/contact"
import {
  MESSAGE_MAX,
  enquirySchema,
  type EnquiryField,
} from "@/lib/enquiry-schema"
import { whatsappHref } from "@/lib/whatsapp"

type Errors = Partial<Record<EnquiryField, string>>

// Order in which focus goes to the first invalid field.
const fieldOrder: EnquiryField[] = ["name", "phone", "email", "role", "message", "consent"]

function readForm(form: HTMLFormElement) {
  const data = new FormData(form)
  const text = (name: string) => String(data.get(name) ?? "")
  return {
    name: text("name"),
    phone: text("phone"),
    email: text("email"),
    role: text("role"),
    message: text("message"),
    consent: data.get("consent") === "on",
  }
}

function validate(form: HTMLFormElement) {
  const result = enquirySchema.safeParse(readForm(form))
  if (result.success) return { values: result.data, errors: {} as Errors }

  const errors: Errors = {}
  for (const issue of result.error.issues) {
    const field = issue.path[0] as EnquiryField
    errors[field] ??= issue.message
  }
  return { values: null, errors }
}

type EnquiryFormProps = {
  whatsappNumber: string
  /** Consent line text before the Privacy Policy link (includes <CompanyName />). */
  consentLabel: ReactNode
}

/**
 * Builds a WhatsApp message from the fields and opens a chat with the company
 * number. Nothing is sent or stored by the site: the customer presses Send in
 * WhatsApp themselves.
 */
export function EnquiryForm({ whatsappNumber, consentLabel }: EnquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLHeadingElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [messageLength, setMessageLength] = useState(0)
  const [chatHref, setChatHref] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const { values, errors } = validate(form)
    setSubmitted(true)
    setErrors(errors)

    if (!values) {
      const first = fieldOrder.find((field) => errors[field])
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    const href = whatsappHref(whatsappNumber, enquiryMessage(values, window.location.host))
    // Opened in the submit handler (a user gesture), so it isn't popup-blocked.
    // If a browser still blocks it, open WhatsApp in this tab instead. (A
    // "noopener" feature would make window.open return null, so cut the
    // opener link by hand.)
    const opened = window.open(href, "_blank")
    if (opened) opened.opener = null
    else window.location.assign(href)
    setChatHref(href)
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  // After the first submit, an error clears as soon as the field is fixed
  // (while typing) and appears when an invalid field is left. Clearing on blur
  // would shift the layout under the pointer and swallow the next click.
  function recheck(event: SyntheticEvent<HTMLFormElement>, mode: "clear" | "flag") {
    if (!submitted || !formRef.current) return
    const target = event.target
    if (
      !(target instanceof HTMLInputElement) &&
      !(target instanceof HTMLTextAreaElement) &&
      !(target instanceof HTMLSelectElement)
    ) {
      return
    }
    const field = target.name as EnquiryField
    if (!fieldOrder.includes(field)) return
    const message = validate(formRef.current).errors[field]
    if (mode === "clear" ? !message : message) {
      setErrors((current) => ({ ...current, [field]: message }))
    }
  }

  function reset() {
    formRef.current?.reset()
    setErrors({})
    setSubmitted(false)
    setMessageLength(0)
    setChatHref(null)
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus())
  }

  const describedBy = (field: EnquiryField, hint?: string) =>
    [hint, errors[field] && `enquiry-${field}-error`].filter(Boolean).join(" ") || undefined

  return (
    <>
      {chatHref && (
        <div
          role="status"
          className="mb-8 rounded-card-sm border border-blue-100 bg-blue-25 p-5 sm:p-6"
        >
          <div className="flex gap-3">
            <CheckCircle2
              aria-hidden="true"
              strokeWidth={1.8}
              className="mt-0.5 size-6 shrink-0 text-blue-600"
            />
            <div>
              <h3
                ref={statusRef}
                tabIndex={-1}
                className="text-base font-semibold text-navy-900 outline-none"
              >
                WhatsApp is opening with your enquiry.
              </h3>
              <p className="mt-1 text-[15px] leading-[1.6] text-ink-muted">
                Press <strong className="font-semibold text-ink">Send</strong> in WhatsApp to
                deliver it to us.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={chatHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ size: "sm" })}
                >
                  <MessageCircle aria-hidden="true" strokeWidth={1.8} data-icon="inline-start" />
                  Open WhatsApp again
                </a>
                <Button type="button" variant="outline" size="sm" onClick={reset}>
                  Start a new enquiry
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        onChange={(event) => recheck(event, "clear")}
        onBlur={(event) => recheck(event, "flag")}
        aria-label="Enquiry form"
        className="grid gap-5"
      >
        <Field id="enquiry-name" label="Full name" required error={errors.name}>
          <Input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            maxLength={100}
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="enquiry-phone" label="Phone" error={errors.phone}>
            <Input
              id="enquiry-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy("phone", "enquiry-contact-hint")}
            />
          </Field>
          <Field id="enquiry-email" label="Email" error={errors.email}>
            <Input
              id="enquiry-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email", "enquiry-contact-hint")}
            />
          </Field>
          <p id="enquiry-contact-hint" className="-mt-3 text-[13px] text-ink-muted sm:col-span-2">
            Optional. Add these if you would like us to reply by phone or email as well.
          </p>
        </div>

        <Field id="enquiry-role" label="I am a" error={errors.role}>
          <NativeSelect
            id="enquiry-role"
            name="role"
            defaultValue=""
            aria-invalid={errors.role ? true : undefined}
            aria-describedby={describedBy("role")}
          >
            <NativeSelectOption value="">Select one</NativeSelectOption>
            {enquiryRoles.map((role) => (
              <NativeSelectOption key={role} value={role}>
                {role}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>

        <Field id="enquiry-message" label="Message" required error={errors.message}>
          <Textarea
            id="enquiry-message"
            name="message"
            rows={4}
            maxLength={MESSAGE_MAX}
            placeholder="Which medicines are you interested in, and where are you based?"
            onInput={(event) => setMessageLength(event.currentTarget.value.length)}
            aria-required="true"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message", "enquiry-message-count")}
          />
          <p id="enquiry-message-count" className="mt-1.5 text-right text-[13px] text-ink-muted">
            {messageLength}/{MESSAGE_MAX}
          </p>
        </Field>

        <div>
          <div className="flex items-start gap-3">
            {/* 44 px hit area around a 20 px box. */}
            <span className="-m-3 flex size-11 shrink-0 items-center justify-center">
              <input
                id="enquiry-consent"
                name="consent"
                type="checkbox"
                aria-required="true"
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={describedBy("consent")}
                className="size-5 cursor-pointer rounded-sm accent-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              />
            </span>
            <label
              htmlFor="enquiry-consent"
              className="cursor-pointer text-sm leading-[1.6] text-ink-muted"
            >
              {consentLabel}{" "}
              <Link
                href="/privacy"
                className="font-medium text-blue-600 underline underline-offset-2 transition-colors duration-150 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          <FieldError id="enquiry-consent-error" message={errors.consent} />
        </div>

        <div>
          <Button type="submit" className="w-full sm:w-auto">
            <MessageCircle aria-hidden="true" strokeWidth={1.8} data-icon="inline-start" />
            Send on WhatsApp
          </Button>
        </div>
      </form>
    </>
  )
}

type FieldProps = {
  id: string
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}

function Field({ id, label, required = false, error, children }: FieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2">
        {label}
        {required && (
          <span aria-hidden="true" className="text-error">
            {" "}
            *
          </span>
        )}
      </Label>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-sm text-error">
      {message}
    </p>
  )
}
