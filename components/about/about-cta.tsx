import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

import { Container } from "@/components/layout/container"
import { CornerMolecule } from "@/components/molecules/corner-molecule"
import { buttonVariants } from "@/components/ui/button"
import { contactWhatsappMessage } from "@/lib/contact"
import { sectionIds } from "@/lib/site-nav"
import { whatsappHref } from "@/lib/whatsapp"

export function AboutCta({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    // Follows a white section, so only bottom padding.
    <section aria-labelledby="about-cta-heading" className="bg-white pb-16 lg:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-card bg-navy-900 px-6 py-12 text-center sm:px-12 lg:py-16">
          <CornerMolecule className="absolute -top-12 -right-10 w-56 opacity-15" />
          <CornerMolecule className="absolute -bottom-14 -left-12 hidden w-48 rotate-180 opacity-10 sm:block" />
          <div className="relative mx-auto max-w-xl">
            <h2
              id="about-cta-heading"
              className="font-heading text-[28px] leading-[1.2] font-bold text-white lg:text-[36px]"
            >
              Interested in working with us?
            </h2>
            <p className="mt-4 text-base leading-[1.65] text-ink-on-navy">
              Distributors, stockists and pharmacies can send an enquiry and we will get back to
              you.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={`/#${sectionIds.contact}`}
                className={buttonVariants({
                  className:
                    "bg-white text-navy-900 hover:bg-blue-50 focus-visible:outline-blue-300",
                })}
              >
                Send an enquiry
                <ArrowRight aria-hidden="true" strokeWidth={1.8} data-icon="inline-end" />
              </Link>
              <a
                href={whatsappHref(whatsappNumber, contactWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "border-blue-300 bg-transparent text-white hover:bg-blue-700 focus-visible:outline-blue-300",
                })}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.8} data-icon="inline-start" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
