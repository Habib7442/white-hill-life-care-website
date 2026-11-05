import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container } from "@/components/layout/container"
import { Contact } from "@/components/sections/contact"
import { SiteFooter } from "@/components/site-footer/site-footer"
import { SiteHeader } from "@/components/site-header/site-header"
import { contactMetadata } from "@/lib/seo"
import { sectionIds } from "@/lib/site-nav"

export const metadata = contactMetadata

export default function ContactPage() {
  return (
    <>
      <SiteHeader solid />
      <main id={sectionIds.main} tabIndex={-1} className="outline-none">
        <div className="bg-white pt-(--header-height)">
          <Container className="pt-8 pb-10 lg:pb-12">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
            <h1 className="mt-8 font-display text-[34px] leading-[1.15] font-semibold text-black lg:text-[44px]">
              Contact Us
            </h1>
            <p className="mt-4 max-w-[40rem] text-base leading-[1.65] text-slate-800 lg:text-[17px]">
              Contact us for product details, stocking enquiries or any other questions.
            </p>
          </Container>
        </div>
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
