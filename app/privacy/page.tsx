import type { ReactNode } from "react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container } from "@/components/layout/container"
import { SiteFooter } from "@/components/site-footer/site-footer"
import { SiteHeader } from "@/components/site-header/site-header"
import { CompanyName } from "@/components/typography/company-name"
import { getSiteSettings } from "@/lib/sanity/fetch"
import { privacyMetadata } from "@/lib/seo"
import { company } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

export const metadata = privacyMetadata

const LAST_UPDATED = "5 November 2026"

const linkClasses =
  "font-medium break-all text-blue-600 underline underline-offset-2 transition-colors duration-150 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600"

export default async function PrivacyPage() {
  const settings = await getSiteSettings()
  const address = settings?.address?.trim()
  const email = settings?.email?.trim() || company.email

  const contactLinks = (
    <>
      email us at{" "}
      <a href={`mailto:${email}`} className={linkClasses}>
        {email}
      </a>
    </>
  )

  return (
    <>
      <SiteHeader solid />
      <main id={sectionIds.main} tabIndex={-1} className="outline-none">
        <div className="bg-white pt-(--header-height)">
          <Container className="pt-8 pb-16 lg:pb-24">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />

            <article className="mt-6 max-w-[720px]">
              <h1 className="font-heading text-[30px] leading-[1.15] font-bold text-navy-900 lg:text-[40px]">
                Privacy Policy
              </h1>
              <p className="mt-3 text-sm text-ink-faint">Last updated: {LAST_UPDATED}</p>

              <PolicySection title="Who we are">
                <p>
                  This website is run by <CompanyName legal />, a pharmaceutical marketing
                  company in India. This policy explains how we handle the personal details you
                  share with us through the enquiry form, in line with the Digital Personal Data
                  Protection Act, 2023.
                </p>
                {address && (
                  <address className="mt-3 whitespace-pre-line not-italic">{address}</address>
                )}
              </PolicySection>

              <PolicySection title="What we collect">
                <p>
                  Only what you type into the enquiry form: your name, your email address, your
                  message, and your role (for example distributor or pharmacy) and a phone number
                  if you add them.
                </p>
              </PolicySection>

              <PolicySection title="How your enquiry reaches us">
                <p>
                  When you press &ldquo;Send enquiry&rdquo;, your details are sent from your browser
                  to Web3Forms, a form service, which delivers them to our email inbox. Our website
                  does not store them itself. Web3Forms states that it may keep submissions for up
                  to 3 years, and its own privacy policy applies to them.
                </p>
              </PolicySection>

              <PolicySection title="Why we use it">
                <p>
                  To reply to your enquiry and, if you ask, to share product information or
                  discuss supply. We do not sell your details or use them for unrelated marketing.
                </p>
              </PolicySection>

              <PolicySection title="How long we keep it">
                <p>
                  We keep your enquiry only as long as we need it to handle your request and any
                  business that follows from it, or as long as the law requires.
                </p>
              </PolicySection>

              <PolicySection title="Your rights">
                <p>
                  You can ask us to show, correct or delete the details you have shared, or
                  withdraw your consent at any time. To do this, {contactLinks}.
                </p>
              </PolicySection>

              <PolicySection title="Cookies and analytics">
                <p>
                  This website does not use advertising or analytics cookies. Your browser may
                  keep a small note so the welcome screen shows only once per visit; it holds no
                  personal details.
                </p>
              </PolicySection>

              <PolicySection title="Changes to this policy">
                <p>
                  If we change this policy, we will update it on this page with a new date.
                </p>
              </PolicySection>
            </article>
          </Container>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-heading text-[22px] leading-[1.25] font-bold text-navy-900 lg:text-2xl">
        {title}
      </h2>
      <div className="mt-3 text-base leading-[1.7] text-ink-muted">{children}</div>
    </section>
  )
}
