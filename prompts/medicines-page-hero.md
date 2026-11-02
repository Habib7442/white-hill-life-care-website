# Implementation Prompt: Medicines Page Hero Banner

## Goal
Implement a visual hero banner at the top of the `/medicines` page featuring the user's provided 3D medical visual of floating blue capsules and molecular structures, centered headline *"Advancing Healthcare. Enhancing Lives."*, and introductory pharmaceutical copy.

---

## Skills and Docs Read
- `AGENTS.md` (Sections 1, 2, 5, 10, 13, 14, 15)
- `PRD.md` (Sections 5.4, 8)
- `DESIGN.md` (Sections 2, 3, 4, 5, 6)
- User reference mockup and supplied image `e2f319610cc3bc4b58ad5ad32ce8804599b882da.png`

---

## Existing Code Inspected
- `app/medicines/page.tsx`: Current `/medicines` layout with header, breadcrumbs, simple text heading, and `MedicinesCatalog`.
- `components/sections/medicines-catalog.tsx`: Client-side search, category filter chips, dosage forms, pagination, and products grid.

---

## Design Specifications & Layout
1. **Hero Banner Section**:
   - Placed at the top of `/medicines` inside `<main>`, right below the fixed header (`pt-(--header-height)`).
   - Card wrapper: `rounded-hero border border-blue-100 shadow-sm overflow-hidden relative min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] flex items-center justify-center`.
   - Background image:
     - Optimized WebP image at `/brand/medicines-hero.webp` (51 KB).
     - Rendered with `next/image` (`fill`, `priority`, `object-cover object-center`).
     - Subtle soft-light overlay (`bg-white/35 backdrop-blur-[1px]`) to ensure text contrast and readability while maintaining the vibrant 3D capsule artwork.
2. **Typography**:
   - Headline: `"Advancing Healthcare. Enhancing Lives."` in `font-heading font-bold text-navy-900 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-center`.
   - Subtitle: `"Discover quality pharmaceutical products developed with a commitment to care, innovation, and better health outcomes."` in `text-slate-800/90 text-sm sm:text-base max-w-2xl text-center mx-auto mt-3 leading-relaxed`.
3. **Catalog & Filters Section**:
   - Below the hero banner, inside `<Container className="pt-8 pb-16 lg:pb-24">`:
     - Breadcrumbs (`Home / Our Medicines`).
     - Medicines awareness disclaimer.
     - Search bar, category filter chips, and interactive product catalog.

---

## Files to Modify / Create
1. `components/medicines/medicines-hero.tsx` (Create):
   - Hero banner component with responsive height, background image, soft overlay, and centered typography.
2. `app/medicines/page.tsx` (Modify):
   - Import and render `<MedicinesHero />` above the catalog container.

---

## Compliance & Accessibility
- Indian DPDP and CDSCO compliance: No cure claims; statutory medical practitioner advice disclaimer preserved beneath breadcrumbs.
- 4.5:1+ text contrast ratio with soft scrim overlay behind navy text.
- Image has descriptive alt text: `"3D visualization of pharmaceutical capsules and molecular structures"`.

---

## Acceptance Criteria
- [ ] Hero banner renders at the top of `/medicines` with the 3D capsule & molecular artwork.
- [ ] Centered headline `"Advancing Healthcare. Enhancing Lives."` and subtitle match the mockup.
- [ ] Catalog search, filters, pagination, and product detail navigation work without regression.
- [ ] Responsive across mobile, tablet, and desktop.
- [ ] Typecheck (`npx tsc --noEmit`) passes cleanly.

---

## Manual Test Steps
1. Navigate to [http://localhost:3000/medicines](http://localhost:3000/medicines).
2. Verify the 3D capsule hero banner renders at the top with centered headline and subtitle.
3. Verify that search, filter chips, pagination, and product cards below function properly.
4. Check responsive scaling on mobile viewport (< 640px).
