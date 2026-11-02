# About Page Hero Redesign

Redesign the hero section of the `/about` page into an edge-to-edge visual banner using the user-provided `Icy Blue Glass Honeycomb Wave.png` asset (converted to WebP), centered "About Us" display heading, and primary/secondary action buttons linking to medicines and contact.

---

## Visual Interpretation of Reference

- **Background Image**: Edge-to-edge full bleed `Icy Blue Glass Honeycomb Wave.png`, converted to high-performance WebP (`public/brand/about-hero.webp`). Shows a smooth gradient of icy blue and white glassy hexagonal/molecular honeycomb wave on the left flowing into soft translucent molecular networks on the right.
- **Heading**: Centered `"About Us"` in bold dark typography (`text-black` / `text-navy-900`, Plus Jakarta Sans / font-heading, `text-4xl sm:text-5xl lg:text-[56px] tracking-tight font-bold`).
- **Call-to-Action Buttons**:
  - **Primary**: Solid vibrant blue pill (`bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 shadow-xs transition-colors`), label: `"Explore our medicines"`, links to `/medicines`.
  - **Secondary / Outline**: Translucent outline pill (`border border-blue-600/70 text-blue-600 bg-white/40 hover:bg-white font-medium rounded-lg px-6 py-2.5 transition-colors`), label: `"Contact us"`, links to `/#contact`.
  - Side-by-side on tablet/desktop, cleanly centered with `gap-3.5`.
- **Layout & Spacing**:
  - Edge-to-edge width (`w-full`), responsive height: `h-[340px] sm:h-[400px] lg:h-[460px]`.
  - Centered flex layout (`flex flex-col items-center justify-center text-center px-4`).
- **Responsive Behaviour**:
  - 360 px (mobile): Heading `text-3xl`, buttons stack or wrap with full touch targets (min 44px height).
  - 768 px (tablet): Heading `text-4xl`, buttons side-by-side.
  - 1024 px & 1440 px (desktop): Full-bleed banner with `text-5xl` or `text-[56px]`, ample negative space matching the mockup.

---

## Skills and Docs Read

- `AGENTS.md` (§1 Product scope, §5 UI rules, §6 Architecture, §10 Compliance and content rules)
- `PRD.md` (§4 Information Architecture, §5 Page sections)
- `DESIGN.md` (§2 Palette, §3 Typography, §5 Components)

---

## Existing Code Inspected

- `app/about/page.tsx`: About page route, renders `<SiteHeader solid />`, `<AboutHero />`, and existing narrative sections ("Who we are", "Our values", "Who we work with", "Our approach to quality", "Company details", and `<AboutCta />`).
- `components/about/about-hero.tsx`: Current 2-column box layout with SVG molecule.

---

## Files to Modify

- `components/about/about-hero.tsx`: Replace the current 2-column box with the edge-to-edge full-bleed hero banner matching the mockup.
- `app/about/page.tsx`: Ensure clean spacing and flow directly beneath the new edge-to-edge hero.
- `public/brand/about-hero.webp`: Generated WebP asset (1672×941, 129 KB).

---

## Compliance Check

- Brand palette adhered to (icy blue, white, navy).
- No medical claims or unverified statistics.
- Buttons clearly direct users to `/medicines` and `/#contact`.
- WCAG AA contrast maintained.

---

## Acceptance Criteria

- [ ] Edge-to-edge full-bleed hero banner renders with `about-hero.webp` without horizontal scrollbars.
- [ ] Heading displays `"About Us"` centered with bold typography.
- [ ] `"Explore our medicines"` button links directly to `/medicines`.
- [ ] `"Contact us"` button links smoothly to `/#contact`.
- [ ] Responsive across mobile (360px), tablet (768px), and desktop (1024px+).
- [ ] Page returns HTTP 200 with no TypeScript or layout errors.

---

## Manual Test Steps

1. Open `http://localhost:3000/about` in your browser.
2. Confirm the edge-to-edge icy blue honeycomb background displays crisply.
3. Confirm the centered `"About Us"` headline and two buttons match the reference image.
4. Click `"Explore our medicines"` and verify it routes to `/medicines`.
5. Click `"Contact us"` and verify it routes to `/#contact`.
