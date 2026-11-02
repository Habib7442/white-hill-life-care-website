# Implementation Prompt: Medicines Hero Edge-to-Edge Banner

## Goal
Implement a full-width (edge-to-edge, zero side padding) hero banner on `/medicines` matching the exact Figma specifications (1440px width, ~616px height), featuring the crystal-clear `glassy-capsules-hero.webp` artwork, soft Figma gradient overlay (`#E6EFF4` to `#2563EB`), and centered headline/subtitle.

---

## Skills and Docs Read
- `AGENTS.md` (Sections 1, 2, 5, 10, 13, 14, 15)
- `PRD.md` (Sections 5.4, 8)
- `DESIGN.md` (Sections 2, 3, 4, 5, 6)
- User's Figma design screenshots showing:
  - Full width edge-to-edge (no container side padding, no rounded card)
  - Layout: `1,440px × 616px`
  - Colors: Linear gradient `#E6EFF4` to `#2563EB`
  - Converted image: `public/brand/glassy-capsules-hero.webp` (1672 × 941 px, high-quality WebP)

---

## Existing Code Inspected
- `app/medicines/page.tsx`: Current page structure with `MedicinesHero` inside a padded container.
- `components/medicines/medicines-hero.tsx`: Existing banner component currently constrained by `Container` and `rounded-hero`.

---

## Design Specifications & Layout
1. **Edge-to-Edge Banner**:
   - Remove `<Container>` wrapper and `rounded-hero` border from `MedicinesHero`.
   - Full width `w-full relative overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[616px] flex items-center justify-center`.
   - Background image:
     - High-res WebP converted from `"Glassy Capsules and Molecular Networks.png"` at `/brand/glassy-capsules-hero.webp`.
     - Rendered with `next/image` (`fill`, `priority`, `object-cover object-center`, high quality).
   - Scrim & Gradient Overlay:
     - Soft linear gradient overlay (`#E6EFF4` at 25% to `#2563EB` at 15% with subtle center light) ensuring maximum clarity of the 3D glassy capsules and molecular networks while maintaining WCAG AA contrast for text.
2. **Typography (Centered)**:
   - Headline: `"Advancing Healthcare. Enhancing Lives."` in `font-heading font-bold text-navy-900 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-center`.
   - Subtitle: `"Discover quality pharmaceutical products developed with a commitment to care, innovation, and better health outcomes."` in `text-slate-800 text-sm sm:text-base lg:text-[17px] max-w-2xl text-center mx-auto mt-4 leading-relaxed`.
3. **Below Banner**:
   - `<Container>` begins after the hero banner for Breadcrumbs, disclaimer, filter chips, search input, and product cards.

---

## Files to Modify
1. `components/medicines/medicines-hero.tsx`:
   - Refactor to edge-to-edge layout, apply `glassy-capsules-hero.webp`, and match Figma dimensions and gradient.
2. `app/medicines/page.tsx`:
   - Render `MedicinesHero` full-bleed directly under the fixed header.

---

## Acceptance Criteria
- [ ] Banner spans 100% viewport width with zero side padding or rounded card borders.
- [ ] Image `/brand/glassy-capsules-hero.webp` is crisp, clear, and high-definition across all viewports.
- [ ] Centered headline and subtitle match the Figma mockup.
- [ ] Below the banner, the catalog container (`Breadcrumbs`, filters, search, products) retains its standard max-width layout.
- [ ] Responsive across mobile, tablet, and desktop without clipping or layout shift.
- [ ] Typecheck (`npx tsc --noEmit`) passes cleanly.

---

## Manual Test Steps
1. Navigate to [http://localhost:3000/medicines](http://localhost:3000/medicines).
2. Verify the hero banner spans edge-to-edge across the screen with zero side padding.
3. Confirm the 3D glassy capsules and molecular networks are crystal-clear and beautiful.
4. Verify text readability and catalog functionality beneath the banner.
