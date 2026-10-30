import { Hero } from "@/components/hero/hero";
import { Preloader } from "@/components/preloader/preloader";
import { Contact } from "@/components/sections/contact"
import { ExploreRange } from "@/components/sections/explore-range";
import { Medicines } from "@/components/sections/medicines"
import { ProductRange } from "@/components/sections/product-range";
import { Quality } from "@/components/sections/quality";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { SiteHeader } from "@/components/site-header/site-header";
import { sectionIds } from "@/lib/site-nav";

export default function Home() {
  return (
    <>
      <Preloader />
      <SiteHeader />
      <main id={sectionIds.main} tabIndex={-1} className="outline-none">
        <Hero />
        <ProductRange />
        <ExploreRange />
        <Medicines />
        <Quality />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
