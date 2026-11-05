import { AboutAudiences } from "@/components/about/about-audiences"
import { AboutCta } from "@/components/about/about-cta"
import { AboutHero } from "@/components/about/about-hero"
import { AboutOverview } from "@/components/about/about-overview"
import { AboutQuality } from "@/components/about/about-quality"
import { AboutValues } from "@/components/about/about-values"
import { AboutWhoWeAre } from "@/components/about/about-who-we-are"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container } from "@/components/layout/container"
import { SiteFooter } from "@/components/site-footer/site-footer"
import { SiteHeader } from "@/components/site-header/site-header"
import { getSiteSettings } from "@/lib/sanity/fetch"
import { aboutMetadata } from "@/lib/seo"
import { company } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

export const metadata = aboutMetadata

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return (
    <>
      <SiteHeader solid />
      <main id={sectionIds.main} tabIndex={-1} className="outline-none">
        <div className="bg-white pt-(--header-height)">
          <AboutHero />
          <Container className="pt-8">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About us" }]} />
          </Container>
          <AboutOverview />
        </div>

        {/* Who we are */}
        <AboutWhoWeAre />

        {/* Values */}
        <AboutValues />

        {/* Audiences */}
        <AboutAudiences />

        {/* Quality */}
        <AboutQuality />


        <AboutCta email={settings?.email?.trim() || company.email} />
      </main>
      <SiteFooter />
    </>
  )
}
