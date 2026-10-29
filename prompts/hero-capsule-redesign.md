# Hero redesign: capsule visual on a white-to-sky gradient

## Goal

Rebuild the home hero to match the client's new reference (headline and intro on the left, the opened blue capsule on the right, the navy highlights band below), fully responsive from 360 px to 1440 px.

## Skills and docs read

- `AGENTS.md` §1 (modest tone), §5 (UI rules, reference image is the source of truth), §6 (layers), §10 (compliance), §13 (images), §14 (header is fixed and transparent over the hero)
- `DESIGN.md` §2 palette, §3 type scale, §7 page structure, §8 motion
- `node_modules/next/dist/docs/` image guide (`next/image`, `priority`/`fetchPriority`, `sizes`)
- Reference (attached by the user):
  - **Hero mock-up:** logo + nav + "Connect with us" header; H1 "Quality Medicines. / Healthier Lives." on two lines in black; intro "Making quality-focused pharmaceutical products accessible to healthcare professionals, pharmacies and distributors."; buttons "Explore our medicines" (solid) and "Know more" (outline); opened capsule with molecules on the right; navy band with four line icons and labels separated by thin dividers
  - **Palette swatches:** `#FFFFFF`, `#1E293B`, `#2563EB`, `#000000`, `#FFFFFF` at 45 %, `#172C6B`, linear gradient `#FFFFFF → #D5E8F7`
  - **Capsule PNG** (`Downloads/c2328abf….png`): 1448 × 1086, transparent background, 1.27 MB

## Existing code inspected

- `components/hero/hero.tsx`: photo background (`HeroImage`), eyebrow, H1, intro with `<CompanyName />`, two buttons, then a navy area holding `HeroCategories` (white card row) and `HeroHighlights` (navy band)
- `components/hero/hero-image.tsx`, `components/hero/hero-categories.tsx`, `components/hero/hero-highlights.tsx`
- `lib/site.ts`: `heroImages`, `heroCategories`, `heroHighlights`
- `app/globals.css` palette tokens; `components/ui/button.tsx` (pill radius baked into `buttonVariants`); `app/layout.tsx` (Plus Jakarta Sans loaded at 800 only)
- `public/brand/hero-bg.webp`, `hero-bg-mobile.webp`: only used by `heroImages`

## Visual interpretation of the reference

| Element | Reference | Build |
|---|---|---|
| Background | Diagonal gradient, white top-left → pale sky blue bottom-right | `bg-linear-to-br from-white to-sky-100` (new token `#D5E8F7`) |
| H1 | Two lines, black, geometric sans, medium weight (not 800), large (~3.7× body) | Plus Jakarta Sans **600**, `text-black`, forced line break after "Quality Medicines." · 40 px (360) → 52 px (768) → 56 px (1024) → 64 px (1440), `leading-[1.2]`, `tracking-[-0.02em]` |
| Intro | Slate `#1E293B`, ~2 lines, ~ 34 rem wide | IBM Plex Sans 17 px (16 px mobile), `leading-[1.65]`, `text-slate-800` (new token), `max-w-[34rem]` |
| Primary button | Solid `#2563EB`, white text, **small radius (~8 px)**, not pill | `bg-blue-500` (new token), white, `rounded-lg`-style 8 px radius, `min-h-12`, `px-6`, hover `bg-blue-600` |
| Secondary button | White-ish fill, `#2563EB` 1.5 px border and text, same radius | `bg-white/45` (the 45 % white swatch), `border-blue-500`, hover `bg-white` |
| Capsule | Right half, large, slightly overlapping the header zone, bottom close to the band | `next/image`, `priority`, `object-contain`, ~ 46 % of the container width at `lg`, decorative (`alt=""`) |
| Band | Navy `#172C6B`, four items, white line icons, white two-line labels, thin vertical dividers | Existing `HeroHighlights` (already `bg-navy-900` = `#172C6B`), dividers `white/45`, sits directly under the hero (no card row) |

**Gaps between swatches and current tokens:** the reference blue `#2563EB` and slate `#1E293B` are not in the palette (`blue-600` is `#1D4ED8`, `ink` is `#13234A`). Per AGENTS §5 the reference wins, so I add them as **new tokens** and use them only in the hero. The rest of the site keeps its current tokens.

## Decisions and assumptions

1. **Font.** The H1 in the reference looks like Poppins Medium. DESIGN.md restricts the site to three families, so I use **Plus Jakarta Sans 600** (same family as today's H1, very close in shape) and load weight `600` alongside `800`. If you want exact Poppins, say so and I'll add it for the hero H1 only.
2. **Button radius.** The reference uses ~8 px corners; the site's buttons are pills. Because `cn` cannot override the radius in `buttonVariants` (AGENTS §14), the two hero buttons get their own classes in `hero.tsx` instead of changing the shared button. Other buttons on the site stay pills.
3. **Removed from the hero:** the background photo, the gradient overlays, the eyebrow ("Healthcare & Wellness"), and the white category-card row. None of them are in the reference. Their code (`hero-image.tsx`, `hero-categories.tsx`, `heroImages`, `heroCategories`) and the two unused photos in `public/brand/` are deleted. All are recoverable from git.
4. **Capsule asset.** Saved as `public/brand/hero-capsule.webp` (lossless alpha, resized to 1200 px wide) via `sharp`, which Next already ships. `next/image` then serves AVIF/WebP at the right width. Decorative, so `alt=""` and `aria-hidden`.
5. **Copy uses the reference text exactly.** "Explore our medicines" links to `#medicines`, "Know more" to `/about` (same targets as today). Button casing follows the reference (sentence case).
6. **Band icons** follow the reference: molecule → `Atom`, badge → `BadgeCheck`, stethoscope → `Stethoscope`, hand with heart → `HandHeart` (replacing `Microscope` and `MapPin`). Labels unchanged.
7. **Header is not changed.** The reference header shows nav "Home · About Us · Products · Contact" and a "Connect with us" button in `#2563EB`; ours differs slightly. Flagged, not touched.
8. **No motion.** The reference is static; no float on the capsule.

## Files to create or modify

| File | Change |
|---|---|
| `app/globals.css` | Add `--color-black: #000000`, `--color-slate-800: #1e293b`, `--color-blue-500: #2563eb`, `--color-sky-100: #d5e8f7` |
| `app/layout.tsx` | Plus Jakarta Sans weights `["600", "800"]` |
| `public/brand/hero-capsule.webp` | New (converted from the PNG) |
| `components/hero/hero.tsx` | Rebuilt: gradient section, two-column grid, capsule image, band |
| `components/hero/hero-highlights.tsx` | Dividers `white/45`; responsive grid tweaks |
| `lib/site.ts` | Add `heroCapsule` image constant; update highlight icons; delete `heroImages`, `heroCategories`, `HeroCategory` |
| `components/hero/hero-image.tsx`, `components/hero/hero-categories.tsx` | Delete |
| `public/brand/hero-bg.webp`, `public/brand/hero-bg-mobile.webp` | Delete (unused) |

## Implementation requirements

- `Hero` stays a Server Component. No client code.
- Section: `relative overflow-hidden bg-linear-to-br from-white to-sky-100`, `pt-(--header-height)` so the fixed transparent header sits on the gradient.
- Layout: `Container` → `grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:min-h-[600px]`.
- Text column order first in the DOM (LCP and reading order). H1 has `id="hero-heading"`; the section keeps `id={sectionIds.top}` and `aria-labelledby`.
- Line break: `Quality Medicines.<br />Healthier Lives.` with a `{" "}` so screen readers read a space.
- Capsule: `<Image src width height alt="" priority sizes="(min-width: 1024px) 560px, 90vw" className="h-auto w-full object-contain" />`. At `lg`+ it bleeds slightly right (`lg:-mr-6 xl:-mr-10`) and up (`lg:-mt-8`) like the reference; never covers text.
- Band directly below the grid: `bg-navy-900 py-8 lg:py-10`, contains `<HeroHighlights />`.
- Colours only via tokens; no hex in components.

## Responsive behaviour

| Width | Layout |
|---|---|
| 360 | One column. H1 40 px, intro 16 px, buttons stacked full width. Capsule below the buttons, `max-w-[420px]` centred. Band: 2 × 2 grid, 32 px icons, 14 px labels |
| 768 | One column, H1 52 px, buttons side by side. Capsule `max-w-[520px]` centred. Band 2 × 2 |
| 1024 | Two columns (text ~ 53 %, capsule ~ 47 %), H1 56 px, hero min-height 600 px. Band four in a row with dividers |
| 1440 | Container 1240 px. H1 64 px. Capsule ~ 560 px wide, bleeds a little right. Band four in a row |

No horizontal scroll at any width (`overflow-hidden` on the section clips the capsule bleed).

## States

- Buttons: hover (primary darkens to `blue-600`; secondary fills white), visible focus outline `outline-2 outline-offset-2 outline-blue-600`, 48 px min height (≥ 44 px target).
- No empty/error states (static content).

## Security requirements

None new. No data, no env vars, no client code.

## Compliance check (AGENTS §10)

- H1 "Quality Medicines. Healthier Lives." and intro "Making quality-focused pharmaceutical products accessible to healthcare professionals, pharmacies and distributors.": no cure/treatment words, no numbers, no therapy areas, no "leading"/"trusted". OK.
- The intro no longer names the company, so `<CompanyName />` isn't needed in the hero. The company name still appears in the header logo alt and elsewhere.
- Band labels unchanged ("Quality Manufacturing Partners" keeps the partner framing).
- No imagery of people. OK (rule 10).

## Accessibility

- Contrast: `#000` on `#D5E8F7` ≈ 17:1; `#1E293B` on `#D5E8F7` ≈ 12:1; white on `#2563EB` = 5.2:1; `#2563EB` on white = 5.2:1; white on `#172C6B` ≈ 13:1. All pass AA.
- Capsule decorative. Icons `aria-hidden`. Real `<a>` elements.

## Acceptance criteria

1. At 1440 px the hero matches the reference: white→sky gradient, black two-line H1, slate intro, two 8 px-radius blue buttons, capsule on the right, navy band with four items and dividers directly below.
2. No photo, eyebrow or white category cards remain in the hero.
3. Layout works at 360 / 768 / 1024 / 1440 px with no horizontal scroll and no overlap of text and capsule.
4. Capsule loads as an optimised image (WebP/AVIF from `/_next/image`), with priority.
5. `npx tsc --noEmit`, `npm run lint`, `npm run build` pass.

## Checks to run

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Manual test steps

1. `npm run dev`, open `http://localhost:3000/` (wait for the 2.8 s splash).
2. At 1440 px compare with the reference: gradient, H1 on two lines, buttons, capsule placement, band.
3. Resize to 1024, 768, 360 px: text first, capsule below on smaller widths, buttons stack at 360, band becomes 2 × 2, no sideways scroll.
4. Tab from the header: both hero buttons show a focus outline; "Explore our medicines" scrolls to Our Medicines, "Know more" opens `/about`.
5. Scroll down: the header turns solid white as before.
6. DevTools → Network: the capsule is requested through `/_next/image` as WebP/AVIF.

## Needs attention (after build)

- Font: Plus Jakarta Sans 600 used in place of the reference's Poppins-like face.
- New colours `#2563EB` / `#1E293B` are hero-only; the header button and other buttons still use `#1D4ED8`. Say if they should switch site-wide.
- The reference header (nav labels, "Connect with us") differs from the live header; not changed.
- `DESIGN.md` §3/§7 still describe the old hero (800 H1, eyebrow, molecule panel).
