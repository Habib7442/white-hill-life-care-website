import { ContactDetails } from "@/components/contact/contact-details"
import { EnquiryForm } from "@/components/contact/enquiry-form"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/reveal"
import { CompanyName } from "@/components/typography/company-name"
import { getSiteSettings } from "@/lib/sanity/fetch"
import { company } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

export async function Contact() {
  const settings = await getSiteSettings()
  const whatsappNumber = settings?.whatsapp?.trim() || company.whatsapp

  return (
    <Section id={sectionIds.contact} tone="tint" aria-labelledby="contact-heading">
      <Container>
        <Reveal className="rounded-hero border border-blue-100 bg-white p-3.5 shadow-xs sm:p-5 lg:p-6">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left sidebar: Vibrant Blue Panel with Contact Details */}
            <div className="flex flex-col rounded-card bg-blue-600 p-6 sm:p-8 lg:col-span-5 lg:p-10">
              <ContactDetails settings={settings} whatsappNumber={whatsappNumber} />
            </div>

            {/* Right panel: WhatsApp Enquiry Form */}
            <div className="flex flex-col justify-center p-2 sm:p-4 lg:col-span-7 lg:py-6 lg:pr-6">
              <h3 className="font-heading text-2xl font-bold text-navy-900 sm:text-3xl">
                Send an enquiry on WhatsApp
              </h3>
              <p className="mt-1.5 mb-6 text-sm leading-relaxed text-ink-muted">
                Fill in the form and WhatsApp opens with your details ready to send.
              </p>
              <EnquiryForm
                whatsappNumber={whatsappNumber}
                consentLabel={
                  <>
                    I agree to send these details to <CompanyName legal /> on WhatsApp so they can
                    reply to my enquiry. See our
                  </>
                }
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

