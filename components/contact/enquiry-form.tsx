"use client"

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react"
import Link from "next/link"
import { CheckCircle2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import { enquiryFormData, enquiryRoles, medicineEnquiryMessage } from "@/lib/contact"
import {
  MESSAGE_MAX,
  enquirySchema,
  type EnquiryField,
} from "@/lib/enquiry-schema"

type Errors = Partial<Record<EnquiryField, string>>
type Phase = "idle" | "sending" | "sent" | "failed"

const WEB3FORMS_URL = "https://api.web3forms.com/submit"
const SEND_TIMEOUT = 15_000

const subscribeNever = () => () => {}

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
  /** Shown if sending fails, so the customer can still reach the company. */
  email: string
  /** Consent line text before the Privacy Policy link (includes <CompanyName />). */
  consentLabel: ReactNode
}

/**
 * Sends the enquiry from the browser to Web3Forms, which emails it to the
 * company (its docs recommend browser use; server use needs a paid plan).
 * Nothing is stored or logged by the site.
 */
export function EnquiryForm({ email, consentLabel }: EnquiryFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLHeadingElement>(null)
  const sendingRef = useRef(false)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [messageLength, setMessageLength] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")
  // Send stays off until the form is running: a native submit before then would
  // put the customer's details in the page URL.
  const ready = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  )

  // "Send an Enquiry" on a medicine page links here with ?medicine=. Read after
  // load so the page stays static. Dispatching input also updates the counter.
  useEffect(() => {
    const medicine = new URLSearchParams(window.location.search).get("medicine")?.trim()
    const message = formRef.current?.querySelector("textarea")
    if (!medicine || !message) return
    message.value = medicineEnquiryMessage(medicine)
    message.dispatchEvent(new Event("input", { bubbles: true }))
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sendingRef.current) return
    const form = event.currentTarget
    const { values, errors } = validate(form)
    setSubmitted(true)
    setErrors(errors)

    if (!values) {
      const first = fieldOrder.find((field) => errors[field])
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    // Only a bot fills the hidden box: look successful, send nothing.
    if (new FormData(form).get("botcheck")) {
      showSent()
      return
    }

    sendingRef.current = true
    setPhase("sending")
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
      if (!accessKey) throw new Error("Missing access key")
      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        body: enquiryFormData(values, accessKey),
        signal: AbortSignal.timeout(SEND_TIMEOUT),
      })
      const result: { success?: boolean } = await response.json()
      if (!response.ok || !result.success) throw new Error("Not sent")
      showSent()
    } catch {
      // What was typed stays in the form so the customer can try again.
      setPhase("failed")
    } finally {
      sendingRef.current = false
    }
  }

  function showSent() {
    setPhase("sent")
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
    setErrors({})
    setSubmitted(false)
    setMessageLength(0)
    setPhase("idle")
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus())
  }

  const describedBy = (field: EnquiryField, hint?: string) =>
    [hint, errors[field] && `enquiry-${field}-error`].filter(Boolean).join(" ") || undefined

  if (phase === "sent") {
    return (
      <div role="status" className="rounded-card-sm border border-blue-100 bg-blue-25 p-5 sm:p-6">
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
              Thank you. We have received your enquiry.
            </h3>
            <p className="mt-1 text-[15px] leading-[1.6] text-ink-muted">
              We will reply by email.
            </p>
            <Button type="button" variant="outline" size="sm" onClick={reset} className="mt-4">
              Send another enquiry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const sending = phase === "sending"

  return (
    <>
      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        onChange={(event) => recheck(event, "clear")}
        onBlur={(event) => recheck(event, "flag")}
        aria-label="Enquiry form"
        className="grid gap-5"
      >
        {/* Honeypot: hidden from people and screen readers, so only bots fill it. */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <Field id="enquiry-name" label="Full name" required error={errors.name}>
          <Input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            maxLength={100}
            placeholder="Enter Full Name"
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
              placeholder="+91"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy("phone", "enquiry-contact-hint")}
            />
          </Field>
          <Field id="enquiry-email" label="Email" required error={errors.email}>
            <Input
              id="enquiry-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              aria-required="true"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
            />
          </Field>
          <p id="enquiry-contact-hint" className="-mt-2 text-xs text-ink-muted sm:col-span-2">
            Phone is optional. Add a number if you would like a call back.
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
            <NativeSelectOption value="">Choose One</NativeSelectOption>
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
          <p id="enquiry-message-count" className="mt-1 text-right text-xs text-ink-muted">
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
              className="cursor-pointer text-xs sm:text-[13px] leading-[1.6] text-ink-muted"
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

        {phase === "failed" && (
          <p role="alert" className="text-sm text-error">
            We could not send your enquiry. Please try again, or email us at{" "}
            <a href={`mailto:${email}`} className="font-medium break-all underline underline-offset-2">
              {email}
            </a>
            .
          </p>
        )}

        <div className="flex justify-end pt-1">
          <Button
            type="submit"
            disabled={sending || !ready}
            className="w-full min-h-11 rounded-full bg-navy-900 px-7 font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
          >
            {sending ? "Sending…" : "Send enquiry"}
            <Send aria-hidden="true" strokeWidth={1.8} data-icon="inline-end" className="size-4.5" />
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
