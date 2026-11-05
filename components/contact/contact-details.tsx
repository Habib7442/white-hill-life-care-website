import type { ReactNode } from "react"
import { Clock, Mail, MapPin, type LucideIcon } from "lucide-react"

import type { SiteSettings } from "@/lib/sanity/fetch"
import { company } from "@/lib/site"

const linkClasses =
  "inline-flex min-h-8 items-center font-medium text-white text-sm break-all transition-opacity duration-150 hover:underline hover:opacity-95 focus-visible:outline-2 focus-visible:outline-white"

type ContactDetailsProps = {
  settings: SiteSettings | null
}

export function ContactDetails({ settings }: ContactDetailsProps) {
  const address =
    settings?.address?.trim() ||
    "Sumi Nath, Silpukuri, Near GMC,\nPub Sarania, Chandmari,\nGuwahati, Kamrup Metropolitan,\nAssam - 781003"
  const email = settings?.email?.trim() || company.email

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden">
      {/* Decorative molecular lattice watermark */}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 320"
        fill="none"
        className="pointer-events-none absolute -right-20 -bottom-20 size-80 text-white/10"
      >
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polygon points="160,50 220,85 220,155 160,190 100,155 100,85" />
          <polygon points="220,155 280,190 280,260 220,295 160,260 160,190" />
          <line x1="160" y1="50" x2="160" y2="15" />
          <line x1="220" y1="85" x2="260" y2="60" />
          <line x1="100" y1="85" x2="60" y2="60" />
          <line x1="100" y1="155" x2="50" y2="185" />
          <line x1="280" y1="190" x2="315" y2="170" />
          <line x1="220" y1="295" x2="220" y2="318" />
        </g>
        <g fill="currentColor">
          <circle cx="160" cy="50" r="8" />
          <circle cx="220" cy="85" r="8" />
          <circle cx="220" cy="155" r="9" />
          <circle cx="160" cy="190" r="9" />
          <circle cx="100" cy="155" r="8" />
          <circle cx="100" cy="85" r="8" />
          <circle cx="280" cy="190" r="8" />
          <circle cx="280" cy="260" r="8" />
          <circle cx="220" cy="295" r="8" />
          <circle cx="160" cy="260" r="8" />
          <circle cx="160" cy="15" r="6" />
          <circle cx="260" cy="60" r="7" />
          <circle cx="60" cy="60" r="6" />
          <circle cx="50" cy="185" r="7" />
        </g>
      </svg>

      {/* Header and Operational note */}
      <div className="relative z-10">
        <h2 id="contact-heading" className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Get in touch
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/90">
          Contact us by email.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/95 backdrop-blur-xs">
          <Clock aria-hidden="true" strokeWidth={2} className="size-3.5 text-blue-200" />
          <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
        </div>
      </div>

      {/* Contact item cards */}
      <ul className="relative z-10 mt-6 space-y-3 sm:space-y-3.5">
        {address && (
          <DetailRow icon={MapPin} label="Registered office">
            <address className="mt-0.5 text-xs leading-relaxed text-white/90 whitespace-pre-line not-italic sm:text-[13px]">
              {address}
            </address>
          </DetailRow>
        )}
        {email && (
          <DetailRow icon={Mail} label="Email">
            <a href={`mailto:${email}`} className={linkClasses}>
              {email}
            </a>
          </DetailRow>
        )}
      </ul>
    </div>
  )
}

type DetailRowProps = {
  icon: LucideIcon
  label?: string
  children: ReactNode
}

function DetailRow({ icon: Icon, label, children }: DetailRowProps) {
  return (
    <li className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-xs transition-colors hover:bg-white/15 sm:p-3.5">
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-xs sm:size-11">
        <Icon aria-hidden="true" strokeWidth={1.8} className="size-5 text-blue-600" />
      </span>
      <div className="min-w-0 flex-1">
        {label && <p className="text-[11px] font-semibold uppercase tracking-wider text-white/75">{label}</p>}
        {children}
      </div>
    </li>
  )
}


