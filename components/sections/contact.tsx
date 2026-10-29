import { ContactDetails } from "@/components/contact/contact-details"
import { EnquiryForm } from "@/components/contact/enquiry-form"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/reveal"
import { CompanyName } from "@/components/typography/company-name"
import { Eyebrow } from "@/components/typography/eyebrow"
import { SectionHeading } from "@/components/typography/section-heading"
import { getSiteSettings } from "@/lib/sanity/fetch"
import { company } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

export async function Contact() {
  const settings = await getSiteSettings()
  const whatsappNumber = settings?.whatsapp?.trim() || company.whatsapp

  return (
    <Section id={sectionIds.contact} tone="tint" aria-labelledby="contact-heading">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow index="03">Contact</Eyebrow>
          <SectionHeading id="contact-heading" className="mt-3">
            Get in touch
          </SectionHeading>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
            Distributors, stockists, pharmacies and healthcare professionals can send us an
            enquiry on WhatsApp, or call or email us.
          </p>
          <div className="mt-8">
            <ContactDetails settings={settings} whatsappNumber={whatsappNumber} />
          </div>
        </Reveal>

        <Reveal className="rounded-card border border-blue-100 bg-white p-6 sm:p-8 lg:col-span-7 lg:p-10">
          <h3 className="font-heading text-2xl font-bold text-navy-900">
            Send an enquiry on WhatsApp
          </h3>
          <p className="mt-2 mb-8 text-[15px] leading-[1.6] text-ink-muted">
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
        </Reveal>
      </Container>
    </Section>
  )
}
