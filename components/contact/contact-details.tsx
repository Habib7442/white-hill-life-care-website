import type { ReactNode } from "react"
import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react"

import { contactWhatsappMessage, formatPhone, telHref } from "@/lib/contact"
import type { SiteSettings } from "@/lib/sanity/fetch"
import { whatsappHref } from "@/lib/whatsapp"

const linkClasses =
  "inline-flex min-h-11 items-center rounded-tag font-medium break-all text-blue-600 transition-colors duration-150 hover:text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-blue-600"

type ContactDetailsProps = {
  settings: SiteSettings | null
  whatsappNumber: string | null
}

// Each row renders only when its siteSettings field is filled in.
export function ContactDetails({ settings, whatsappNumber }: ContactDetailsProps) {
  const address = settings?.address?.trim()
  const phone = settings?.phone?.trim()
  const email = settings?.email?.trim()

  return (
    <ul className="grid gap-6">
      {address && (
        <DetailRow icon={MapPin} label="Registered office">
          <address className="pt-1 text-[15px] leading-[1.65] whitespace-pre-line text-ink not-italic">
            {address}
          </address>
        </DetailRow>
      )}
      {phone && (
        <DetailRow icon={Phone} label="Phone">
          <a href={telHref(phone)} className={linkClasses}>
            {formatPhone(phone)}
          </a>
        </DetailRow>
      )}
      {email && (
        <DetailRow icon={Mail} label="Email">
          <a href={`mailto:${email}`} className={linkClasses}>
            {email}
          </a>
        </DetailRow>
      )}
      {whatsappNumber && (
        <DetailRow icon={MessageCircle} label="WhatsApp">
          <a
            href={whatsappHref(whatsappNumber, contactWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
          >
            Chat on WhatsApp ({formatPhone(whatsappNumber)})
          </a>
        </DetailRow>
      )}
    </ul>
  )
}

type DetailRowProps = {
  icon: LucideIcon
  label: string
  children: ReactNode
}

function DetailRow({ icon: Icon, label, children }: DetailRowProps) {
  return (
    <li className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-tile bg-blue-50">
        <Icon aria-hidden="true" strokeWidth={1.8} className="size-5 text-blue-600" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink-muted">{label}</p>
        {children}
      </div>
    </li>
  )
}
