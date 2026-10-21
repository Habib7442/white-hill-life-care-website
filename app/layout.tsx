import { Suspense } from "react";
import { IBM_Plex_Sans, Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";

import { NavigationProgress } from "@/components/navigation-progress";
import { SectionScroll } from "@/components/section-scroll";
import { JsonLd } from "@/components/seo/json-ld";
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
  weight: ["800"],
});

export const metadata = rootMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${plexSans.variable} ${sourceSerif.variable} ${jakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd()} />
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
