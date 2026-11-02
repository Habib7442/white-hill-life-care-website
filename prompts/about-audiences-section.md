# About "Who We Work With" Section Redesign

Redesign the "Who we work with" section on the `/about` page to match the user's reference mockup, featuring a dual-tone display heading ("Built for the people who supply and prescribe"), introductory narrative, and a staggered layout of solid royal blue cards for Distributors & Stockists, Healthcare Professionals, and Pharmacies.

---

## Visual Interpretation of Reference

- **Left Column**:
  - Eyebrow Pill: `inline-flex rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700`, text: `"WHO WE WORK WITH"`.
  - Dual-tone Heading:
    - `"Built for "` in vibrant blue (`text-blue-600`)
    - `"the people who "` in black (`text-black`)
    - `"supply "` in vibrant blue (`text-blue-600`)
    - `"and "` in black (`text-black`)
    - `"prescribe"` in vibrant blue (`text-blue-600`)
    - Typography: `font-heading font-bold text-3xl sm:text-4xl lg:text-[46px] lg:leading-[1.18] tracking-tight`.
  - Intro Paragraph:
    - Text: `"Empowering healthcare professionals with smarter solutions for seamless supply and better patient care."`
    - Typography: `mt-6 max-w-md text-base leading-relaxed text-slate-600 sm:text-[17px]`.
- **Right Column (Balanced 2×2 Blue Cards Grid)**:
  - 4 cards with solid vibrant royal blue background (`bg-blue-600`) forming a complete, balanced 2×2 grid:
    1. **Distributors & stockists**: Icon: `Network`. Text: `"Product details and a direct line to us for stocking enquiries."`
    2. **Pharmacies**: Icon: Store with medical cross (`PharmacyIcon`). Text: `"Clear compositions and pack sizes for every medicine we offer."`
    3. **Healthcare professionals**: Icon: `Stethoscope`. Text: `"Accurate composition, strengths and Rx status for each product."`
    4. **Hospitals & clinics**: Icon: `Hospital`. Text: `"Reliable supply channels and documentation for institutional dispensing."`
  - Card Styling:
    - `rounded-2xl` (`rounded-[20px]`).
    - Padding: `p-6 sm:p-7`.
    - Text: White bold heading (`font-heading font-bold text-lg sm:text-xl text-white`), white/90 text (`text-white/90 text-sm leading-relaxed mt-2.5`).
    - Icons: White outline icons (`size-7 text-white stroke-[1.8]`).
    - Balanced 2×2 layout (`sm:grid-cols-2 gap-5 sm:gap-6` on tablet and desktop) without any empty gaps.
    - Mobile (360px): Stacks gracefully into a vertical card list.

---

## Skills and Docs Read

- `AGENTS.md` (§1 Product scope, §5 UI rules, §6 Architecture, §10 Compliance and content rules)
- `PRD.md` (§4 Information Architecture, §8 Compliance)
- `DESIGN.md` (§2 Palette, §3 Typography, §5 Components)

---

## Existing Code Inspected

- `app/about/page.tsx`: Current "Who we work with" section (lines 65-85).
- `lib/site.ts`: `audiences` definition.

---

## Files to Create / Modify

- `components/about/about-audiences.tsx`: New component implementing the staggered layout and blue cards.
- `app/about/page.tsx`: Replace old audiences section with `<AboutAudiences />`.

---

## Compliance Check

- Respects modest tone; frames information for distributors, pharmacies, and healthcare professionals.
- No cure/treatment claims.
- Accessible text contrast (white text on `bg-blue-600` exceeds WCAG AA 4.5:1).

---

## Acceptance Criteria

- [ ] Dual-tone heading matches mockup ("Built for", "supply", "prescribe" in blue).
- [ ] 3 solid blue cards (`bg-blue-600`) rendered with white icons and typography.
- [ ] Staggered layout on desktop matching the mockup (Distributors top right, Healthcare professionals bottom left, Pharmacies bottom right).
- [ ] Fully responsive on mobile viewports without horizontal overflow.
- [ ] Page returns HTTP 200 with no TypeScript errors.

---

## Manual Test Steps

1. Visit `http://localhost:3000/about`.
2. Scroll to the "Who We Work With" section.
3. Confirm the dual-tone heading, intro paragraph, and the 3 staggered solid blue cards.
4. Verify responsive stacking on mobile screens.
