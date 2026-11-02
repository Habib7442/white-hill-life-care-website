# About Overview Section Redesign

Add the newly designed "About Us" overview section to the `/about` page right below the hero banner, featuring the dual-tone heading ("Medicines for better support of health, with the facts in plain view"), company introduction with bold legal name, and an authentic photograph of a compassionate Indian doctor consulting with an Indian family.

---

## Visual Interpretation of Reference

- **Eyebrow Pill**: Rounded soft pill `inline-flex rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700`, text: `"ABOUT US"`.
- **Heading**:
  - Dual-tone styling matching the mockup:
    - `"Medicines "` in vibrant blue (`text-blue-600`)
    - `"for better support of health, "` in solid black (`text-black`)
    - `"with the facts in plain view"` in vibrant blue (`text-blue-600`)
  - Typography: `font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] lg:leading-[1.18] tracking-tight`.
- **Description**:
  - Starts with bold legal name rendered via `<CompanyName legal />` (AGENTS.md §10.7).
  - Body copy: `"WhiteHill Lifecares Pvt Ltd is a newly established, India-based pharmaceutical marketing company. We work with distributors, stockists, pharmacies and healthcare professionals to make a focused range of medicines available."`
  - Typography: `text-base sm:text-[17px] leading-[1.65] text-slate-700`.
- **Image**:
  - Warm, authentic, high-resolution photograph of an Indian female doctor consulting with a smiling multi-generational Indian family (grandmother, father, child).
  - WebP asset: `public/brand/about-doctor-family.webp` (1200×896, 117 KB).
  - Contained with `rounded-2xl border border-blue-100 shadow-sm overflow-hidden`.
- **Layout & Spacing**:
  - Two-column responsive grid (`grid items-center gap-10 lg:grid-cols-2 lg:gap-16`).
  - Mobile (360px): Stacks image below text, full-width touch friendly.
  - Desktop (1024px+): Side-by-side with balanced vertical alignment.

---

## Skills and Docs Read

- `AGENTS.md` (§1 Product scope, §5 UI rules, §6 Architecture, §10 Compliance and content rules)
- `PRD.md` (§4 Information Architecture, §8 Compliance)
- `DESIGN.md` (§2 Palette, §3 Typography, §5 Components)

---

## Existing Code Inspected

- `app/about/page.tsx`: Section ordering and container structure.
- `components/typography/company-name.tsx`: Component ensuring WhiteHill Lifecares Pvt Ltd is always properly formatted.
- `components/about/about-hero.tsx`: Recently updated edge-to-edge hero banner.

---

## Files to Create / Modify

- `components/about/about-overview.tsx`: New component implementing the 2-column overview section.
- `app/about/page.tsx`: Integrate `<AboutOverview />` directly after `<AboutHero />` and breadcrumbs.
- `public/brand/about-doctor-family.webp`: Converted WebP asset (1200×896, 117 KB).

---

## Compliance Check

- **Rule 10 adhered to**: Photo features authentic Indian people (female doctor and Indian family), no foreign stock imagery.
- **Rule 7 adhered to**: Uses `<CompanyName legal />` for **WhiteHill Lifecares Pvt Ltd**.
- **Rule 1 adhered to**: No curative or exaggerated claims; modest phrasing ("medicines for better support of health").

---

## Acceptance Criteria

- [ ] Dual-tone heading matches the reference ("Medicines" in blue, middle phrase in black, "with the facts in plain view" in blue).
- [ ] Registered company name is bolded via `<CompanyName legal />`.
- [ ] Photograph of Indian doctor and family displays crisply on right side with rounded corners and subtle border.
- [ ] Fully responsive on mobile, tablet, and desktop without horizontal overflow.
- [ ] Page returns HTTP 200 with no TypeScript errors.

---

## Manual Test Steps

1. Visit `http://localhost:3000/about`.
2. Scroll below the hero banner.
3. Verify the "ABOUT US" pill, dual-tone heading, and introductory text.
4. Verify the photo of the Indian doctor and patient family renders crisply on the right.
5. Resize to mobile width to confirm clean stacking.
