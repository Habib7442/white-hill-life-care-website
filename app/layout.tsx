import { Suspense } from "react";
import { IBM_Plex_Sans, Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";

import { NavigationProgress } from "@/components/navigation-progress";
import { SplashGate } from "@/components/preloader/splash-gate";
import { SectionScroll } from "@/components/section-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { organizationJsonLd, rootMetadata, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "800"],
});

export const metadata = rootMetadata;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    // suppressHydrationWarning: SplashGate sets data-splash on <html> before hydration.
    <html
      lang="en-IN"
      className={`${plexSans.variable} ${sourceSerif.variable} ${jakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: browser extensions add attributes to <body> before hydration. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SplashGate />
        <JsonLd data={organizationJsonLd(settings)} />
        <JsonLd data={websiteJsonLd()} />
        {children}
        {/* These read the pathname (URL data), so they stream in after prerender. */}
        <Suspense fallback={null}>
          <NavigationProgress />
          <SectionScroll />
        </Suspense>
      </body>
    </html>
  );
}
