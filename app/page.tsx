import { Hero } from "@/components/hero/hero";
import { Preloader } from "@/components/preloader/preloader";
import { Contact } from "@/components/sections/contact";
import { Medicines } from "@/components/sections/medicines";
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
        <Medicines />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
