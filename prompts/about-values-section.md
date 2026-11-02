# About Values Section ("What guides our work") Redesign

Redesign the "Our Values" section on the `/about` page to match the user's reference mockup, featuring a centered header with the "OUR VALUES" pill and "What guides our work" title, and a 3-column grid of spacious white cards with blue borders, dark navy icon badges (`BadgeCheck`, `Truck`, `Sprout`), bold black headings, and clear narrative text.

---

## Visual Interpretation of Reference

- **Header**:
  - Left-aligned layout (`flex flex-col items-start text-left mb-12 sm:mb-16`).
  - Eyebrow Pill: `inline-flex rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700`, text: `"OUR VALUES"`.
  - Title: `"What guides our work"` in `font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] text-black tracking-tight mt-3.5`.
- **Cards (3-Column Grid)**:
  - `grid gap-6 md:grid-cols-3`: 3 equal-width cards.
  - Card Container:
    - Subtle surface gradient: `bg-gradient-to-b from-blue-50/70 via-blue-50/20 to-white`.
    - Crisp border: `border border-blue-200/90 hover:border-blue-400/90`.
    - Rounded corners: `rounded-2xl`.
    - Generous padding: `p-7 sm:p-8`.
    - Balanced natural vertical height without awkward blank gaps.
    - Subtle hover elevation: `transition-[translate,box-shadow,border-color] duration-200 ease-out hover:shadow-lg hover:shadow-blue-900/5 motion-safe:hover:-translate-y-1`.
  - Top Row:
    - Icon Badge on left: `flex size-12 items-center justify-center rounded-xl bg-navy-900 text-white shadow-xs`.
    - Step Numbers on right: `01`, `02`, `03` in `font-heading text-2xl sm:text-3xl font-bold text-blue-200 group-hover:text-blue-300`.
  - Card Content:
    - Natural margin below top row (`mt-6 sm:mt-7`).
    - Heading: `font-heading font-bold text-xl sm:text-2xl text-black leading-snug`.
    - Description: `mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-600`.
    - Copy:
      1. **Quality-led formulations**: "Each medicine is chosen with a clear purpose and made by WHO-GMP certified manufacturing partners."
      2. **Transparent information**: "Composition, pack, storage and manufacturer details shared openly on the pack and on our website."
      3. **Responsible growth**: "We add medicines to our range one at a time, only when we can supply them properly."

---

## Skills and Docs Read

- `AGENTS.md` (§1 Product scope, §5 UI rules, §6 Architecture, §10 Compliance and content rules)
- `PRD.md` (§4 Information Architecture, §8 Compliance)
- `DESIGN.md` (§2 Palette, §3 Typography, §5 Components)

---

## Existing Code Inspected

- `app/about/page.tsx`: Values section (currently using `Section tone="tint"` with `companyValues`).
- `lib/site.ts`: `companyValues` definition.

---

## Files to Create / Modify

- `lib/site.ts`: Update `companyValues` icons (`BadgeCheck`, `Truck`, `Sprout`) and exact reference copy.
- `components/about/about-values.tsx`: New component implementing the centered header and 3-column blue-bordered cards.
- `app/about/page.tsx`: Replace old values section with `<AboutValues />`.

---

## Compliance Check

- WHO-GMP is claimed strictly as "WHO-GMP certified manufacturing partners".
- No curative, therapeutic or exaggerated claims.
- Modest, factual representation of WhiteHill Lifecares' values.

---

## Acceptance Criteria

- [ ] Centered header with "OUR VALUES" pill and "What guides our work" title.
- [ ] 3 cards rendered with clean blue border, dark navy icon badge (`BadgeCheck`, `Truck`, `Sprout`), bold title, and description.
- [ ] Fully responsive on mobile (stacks to 1 column) and desktop (3 columns).
- [ ] Page returns HTTP 200 with no TypeScript errors.

---

## Manual Test Steps

1. Visit `http://localhost:3000/about`.
2. Scroll to the "What guides our work" section.
3. Confirm the centered header pill and title.
4. Verify the 3 white cards with blue borders, navy icon badges, and exact copy.
5. Resize browser to verify responsive layout across mobile and desktop.
