import type { ReactNode } from "react"

import { CompanyName } from "@/components/typography/company-name"
import type { SiteSettings } from "@/lib/sanity/fetch"

// Registered company details from siteSettings; empty fields are left out.
export function CompanyFacts({ settings }: { settings: SiteSettings | null }) {
  const facts: [string, ReactNode][] = [["Registered name", <CompanyName key="name" legal />]]
  const optional: [string, string | null | undefined][] = [
    ["Registered office", settings?.address],
    ["CIN", settings?.cin],
    ["GSTIN", settings?.gstin],
    ["Drug licence", settings?.drugLicence],
    ["FSSAI licence", settings?.fssaiLicence],
  ]
  for (const [label, value] of optional) {
    if (value?.trim()) facts.push([label, value.trim()])
  }

  return (
    <dl className="grid overflow-hidden rounded-card border border-blue-100 bg-white md:grid-cols-2">
      {facts.map(([label, value]) => (
        <div key={label} className="border-b border-line p-6 last:border-b-0 md:odd:border-r md:[&:nth-last-child(-n+2):nth-child(odd)]:border-b-0">
          <dt className="text-sm font-medium text-ink-muted">{label}</dt>
          <dd className="mt-1.5 text-[15px] leading-[1.65] whitespace-pre-line text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
