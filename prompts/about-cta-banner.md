# About CTA Banner ("Interested in working with us?") Redesign

Redesign the CTA banner component (`AboutCta`) at the bottom of the `/about` page to match the user's Figma reference mockup: a rounded navy card (`rounded-3xl`) featuring the custom blue molecular background image (`public/brand/about-cta-bg.webp`), centered heading ("Interested in working with us?"), subtitle, and dual action buttons: a solid vibrant blue "Send an enquiry" button and an outlined white "Chat on Whatsapp" button.

---

## Visual Interpretation of Reference

1. **Card Container**:
   - Shape: High-radius rounded container (`rounded-[28px]` / `rounded-3xl overflow-hidden relative`).
   - Background:
     - Base color: Deep navy (`bg-[#0B1E48]`).
     - Image: `public/brand/about-cta-bg.webp` (converted from `1a282d87c3cf6a67ffe3a74b8b481ededc820f83.png`), rendered using `next/image` with `fill`, `priority={false}`, `className="object-cover object-center pointer-events-none"`.
     - Readability overlay: Subtle center vignette gradient to guarantee WCAG AA contrast for text.
   - Padding: `px-6 py-16 sm:px-12 sm:py-20 lg:py-24 text-center`.

2. **Typography & Content**:
   - Heading: `"Interested in working with us?"`
     - Typography: `font-heading font-bold text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] text-white tracking-tight`.
   - Subtitle: `"Distributors, stockists and pharmacies can send an enquiry and we will get back to you."`
     - Typography: `mt-4 max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-white/90`.

3. **Buttons**:
   - Container: `mt-8 sm:mt-10 flex flex-col justify-center items-center gap-4 sm:flex-row`.
   - Button 1 ("Send an enquiry"):
     - Destination: `/#contact` (`sectionIds.contact`).
     - Style: Solid vibrant blue (`bg-blue-600 hover:bg-blue-700 text-white font-medium text-[15px] px-7 py-3.5 rounded-xl shadow-md transition-[background-color,transform] duration-150 motion-safe:hover:-translate-y-0.5`).
   - Button 2 ("Chat on Whatsapp"):
     - Destination: `whatsappHref(whatsappNumber, contactWhatsappMessage)`.
     - Target: `_blank`, `rel="noopener noreferrer"`.
     - Style: White outline (`border border-white/80 bg-transparent hover:bg-white/10 text-white font-medium text-[15px] px-7 py-3.5 rounded-xl transition-[background-color,border-color,transform] duration-150 motion-safe:hover:-translate-y-0.5`).

---

## Skills and Docs Read

- `AGENTS.md` (§1 Product scope, §5 UI rules, §6 Architecture, §10 Compliance and content rules)
- `PRD.md` (§4 Information Architecture, §8 Compliance)
- `DESIGN.md` (§2 Palette, §3 Typography, §5 Components)

---

## Existing Code Inspected

- `components/about/about-cta.tsx`: Current CTA block (using `bg-navy-900` with inline corner molecules).
- `app/about/page.tsx`: Renders `<AboutCta whatsappNumber={settings?.whatsapp?.trim() || company.whatsapp} />`.

---

## Files to Create / Modify

- `public/brand/about-cta-bg.webp`: Converted background image.
- `components/about/about-cta.tsx`: Update layout, background image, typography, and button styling to match mockup.
- `prompts/about-cta-banner.md`: This planning record.

---

## Compliance Check

- Standard B2B enquiry copy for distributors, stockists, and pharmacies.
- No cure/treatment claims.
- WhatsApp enquiry flow preserved without third-party form services.

---

## Acceptance Criteria

- [ ] Banner matches reference mockup with rounded card shape and molecular background art.
- [ ] Heading "Interested in working with us?" and subtitle are centered and legible.
- [ ] "Send an enquiry" button is solid blue (`bg-blue-600`) and scrolls to `/#contact`.
- [ ] "Chat on Whatsapp" button is white-bordered and opens prefilled WhatsApp enquiry.
- [ ] Responsive across mobile, tablet, and desktop viewports.
- [ ] Page builds with zero errors.

---

## Manual Test Steps

1. Visit `http://localhost:3000/about`.
2. Scroll to the bottom of the page.
3. Verify the new molecular background, card curvature, and button styling.
4. Click "Send an enquiry" and confirm smooth navigation to the contact section.
5. Inspect WhatsApp link href for prefilled company enquiry parameters.
