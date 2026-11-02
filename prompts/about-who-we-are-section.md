# About "Who We Are" Section Redesign

Redesign the "Who We Are" section on the `/about` page to match the user's reference layout, replacing the glass DNA image with an authentic, high-quality photograph of an Indian pharmaceutical quality assurance specialist inspecting medicines, alongside a pill eyebrow, dual-tone display heading ("A young company with a careful approach"), and formatted narrative.

---

## Visual Interpretation of Reference

- **Eyebrow Pill**:
  - `inline-flex rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700`.
  - Label: `"WHO WE ARE"`.
- **Heading**:
  - Dual-tone blue and black display typography matching the mockup:
    - `"A young company"` in vibrant blue (`text-blue-600`)
    - `" with a"` in solid black (`text-black`)
    - `"careful approach"` in vibrant blue (`text-blue-600`)
  - Typography: `font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] lg:leading-[1.18] tracking-tight`.
- **Left Column Image**:
  - Replaces the DNA helix with an authentic, professional photograph of an Indian pharmaceutical specialist in a white lab coat meticulously inspecting medicine packaging in a modern, pristine quality assurance facility.
  - WebP asset: `public/brand/about-pharma-specialist.webp` (1200×896, 100 KB).
  - Styling: `rounded-2xl border border-blue-100/80 bg-blue-50/30 shadow-sm overflow-hidden aspect-[4/3]`.
- **Narrative Copy**:
  - Uses `<CompanyName />` for **WhiteHill Lifecares** and bolds **WHO-GMP**.
  - Paragraph 1: `"We started WhiteHill Lifecares to offer medicines that people in the supply chain can stock and recommend with confidence. Our role is marketing and distribution: our medicines are made by WHO-GMP certified manufacturing partners, and we make sure each one reaches the market with clear, accurate information."`
  - Paragraph 2: `"We are starting small on purpose. Rather than a long list of products, we are building a focused range and adding new medicines step by step, as each one is ready."`
  - Typography: `text-base sm:text-[17px] leading-[1.7] text-slate-700`.
- **Layout & Spacing**:
  - Responsive 2-column grid (`grid items-center gap-10 lg:grid-cols-2 lg:gap-16`).
  - Mobile: Stacks image above/below text gracefully.
  - Desktop: Image on left, text and pill on right.

---

## Skills and Docs Read

- `AGENTS.md` (§1 Product scope, §5 UI rules, §6 Architecture, §10 Compliance and content rules)
- `PRD.md` (§4 Information Architecture, §8 Compliance)
- `DESIGN.md` (§2 Palette, §3 Typography, §5 Components)

---

## Existing Code Inspected

- `app/about/page.tsx`: Current "Who we are" section (lines 35-58).
- `components/typography/company-name.tsx`: Company name component.

---

## Files to Create / Modify

- `components/about/about-who-we-are.tsx`: New component implementing the 2-column "Who We Are" layout with image and dual-tone text.
- `app/about/page.tsx`: Replace old text-only section with `<AboutWhoWeAre />`.
- `public/brand/about-pharma-specialist.webp`: High-resolution WebP asset (1200×896, 100 KB).

---

## Compliance Check

- **Rule 10 adhered to**: Features an authentic Indian pharmaceutical specialist in a modern Indian facility.
- **Rule 6 adhered to**: Claims WHO-GMP strictly as "WHO-GMP certified manufacturing partners".
- **Rule 7 adhered to**: Uses `<CompanyName />` for bold company rendering.

---

## Acceptance Criteria

- [ ] Dual-tone heading matches mockup: "A young company" (blue), "with a" (black), "careful approach" (blue).
- [ ] Left column displays the photograph of the Indian pharmaceutical specialist in a modern clean facility.
- [ ] Pill displays "WHO WE ARE".
- [ ] WhiteHill Lifecares and WHO-GMP are bolded in narrative.
- [ ] Fully responsive on mobile, tablet, and desktop without horizontal overflow.
- [ ] Page returns HTTP 200 with no TypeScript errors.

---

## Manual Test Steps

1. Visit `http://localhost:3000/about`.
2. Scroll to the "Who We Are" section.
3. Confirm the authentic specialist photograph on the left and the dual-tone heading and pill on the right.
4. Verify responsive stacking on mobile viewports.
