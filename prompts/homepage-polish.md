# Homepage polish: one blue, logo sizing, hero grid, trust row, CTAs, feature strip

## Goal

Tighten the home hero, header and navy feature strip without redesigning them: one primary blue, a correctly sized logo, a balanced desktop grid, a placeholder trust row, a distributor CTA, a capsule-first mobile hero, and a single-column strip on mobile.

## Skills and docs read

- `AGENTS.md` §5 (UI rules), §10 (compliance: rule 3 no invented statistics, rule 6 WHO-GMP wording), §14 (`cn` and radius tokens)
- `DESIGN.md` §2 palette
- `prompts/hero-capsule-redesign.md` (previous hero build)
- `node_modules/next/dist/docs/` image guide (`sizes`, density candidates)

## Existing code inspected

- `components/hero/hero.tsx`, `components/hero/hero-highlights.tsx`, `lib/site.ts` (`heroCapsule`, `heroHighlights`)
- `components/site-header/site-header.tsx` (logo via `next/image`, `h-13 nav:h-15`, `sizes="74px"`), `header-shell.tsx`, `mobile-menu.tsx`, `lib/site-nav.ts`
- `components/ui/button.tsx` (`buttonVariants`, pill radius in the base class)
- `app/globals.css` (`@theme` palette, shadcn mapping, `--radius: 0.625rem`, so `rounded-md` = 8 px)
- Logo assets: `public/brand/whitehill-logo.webp` (640 × 523). **No SVG logo exists** in `public/` or anywhere in the repo

## Decision from the user

**Placeholders are dev-only.** Every unverified trust-row item and feature-strip line lives in `lib/site.ts` with `verified: false` and a `// TODO: Replace with client-verified figures before launch` comment. `npm run dev` shows them; production builds (`NODE_ENV === "production"`) drop them, so a bracketed placeholder can never go live. This is the user's explicit override of AGENTS §10.3 ("the hero has no facts/numbers row"), limited to placeholders that never ship unverified.

## 1. Colours: one primary, one navy, one tint

Current blues: `blue-600 #1D4ED8` (site primary, links, focus), `blue-500 #2563EB` (hero buttons only), `blue-700 #1E3A8A` (hover/pressed, borders on navy), `navy-900 #172C6B` (strip, footer). No component has a hex value; everything is already a token, so the fix is in the tokens.

| Role | Token | Value | Change |
|---|---|---|---|
| Primary blue | `blue-600` (→ `--primary`, `--ring`) | `#2563EB` | was `#1D4ED8`. Now matches the hero design site-wide |
| Dark navy | `navy-900` | `#172C6B` | unchanged |
| Light tint (backgrounds) | `blue-25` / hero gradient end `sky-100` | `#F3F7FE` / `#D5E8F7` | unchanged |
| Hover shade of primary | `blue-700` | `#1E3A8A` | unchanged; documented as the primary's hover shade, not a separate brand colour (used in ~15 places incl. borders on navy, so folding it into navy would hide those borders) |
| `blue-500` | removed | | hero switches to `blue-600` |

Contrast of the new primary: white on `#2563EB` 5.17:1; `#2563EB` on white 5.17, on `blue-25` 4.81, on `blue-50` 4.51 (all ≥ 4.5). On `blue-100` it is 4.11, which passes only for large text/UI; no element pairs `text-blue-600` with `bg-blue-100` today (grep checked).

## 2. Logo

- No SVG: keep `whitehill-logo.webp`, rendered by `next/image`.
- Height `h-9` (36 px) below 820 px, `nav:h-11` (44 px) from 820 px, `w-auto` (aspect kept, no stretching).
- `sizes="108px"`: 2× the 44 px-tall logo's width (≈ 54 px), so the browser always picks a ≥ 2× candidate.
- Header row is already `flex items-center`; the logo link gets `self-center` and no extra padding so it lines up with the nav links.

## 3. Desktop hero layout (≥ 1024 px)

- `Container` grid `lg:grid-cols-[11fr_9fr]` (55/45), `items-center`, `lg:gap-12`.
- Capsule stays inside the container: remove `lg:w-[112%]`, `lg:-mt-8` and the bleed. Image `h-auto w-full max-h-[min(62vh,520px)] object-contain`, centred in its column. Fully visible, no cropping.
- Headline and intro unchanged.

## 4. Trust row (under the hero buttons)

`lib/site.ts` → `heroTrust: { label, icon, verified }[]`:

| Label | Icon | verified |
|---|---|---|
| `[XX]+ Products` | `Package` | false |
| `WHO-GMP Certified Manufacturing Partners` | `ShieldCheck` | **true** (approved wording, AGENTS §10.6; the requested "WHO-GMP Certified Partners" is lengthened to that exact wording) |
| `[XX]+ Years` | `CalendarCheck` | false |
| `Serving [X] States` | `MapPin` | false |

Rendered as `ul` with `flex flex-wrap gap-x-6 gap-y-2.5`, `mt-8`, `text-sm text-ink-muted`, icons `size-4 text-blue-600 strokeWidth 1.8 aria-hidden`. A `{/* TODO: Replace with client-verified figures before launch */}` comment above it. In production only the WHO-GMP item shows.

## 5. CTAs

- `buttonVariants` gets a `shape` variant: `pill` (default, `rounded-full`, so every other button stays as is) and `rounded` (`rounded-md`, 8 px). The radius moves out of the base class so `cn` never sees two radius classes (AGENTS §14).
- Hero: "Explore our medicines" = `buttonVariants({ shape: "rounded" })`; "Know more" becomes **"Become a distributor"** → `#contact`, `buttonVariants({ variant: "outline", shape: "rounded", className: "bg-white/45 hover:bg-white" })`. The local `heroButton` string is deleted.
- Header "Connect With Us" (desktop and in the mobile menu): `shape: "rounded"`, primary token.

## 6. Mobile hero (< 768 px)

- Capsule moves **above** the headline (`order-first md:order-none`), `max-h-[220px] w-auto mx-auto`, fully visible.
- 768–1023 px: one column, capsule below the buttons (`max-w-[480px]`) as today.
- Stacked full-width buttons with the gap reduced from 12 px to 10 px (`gap-2.5`).

## 7. Feature strip

`heroHighlights` gains `text` and `verified` (all four lines are placeholders, `verified: false`, same TODO comment):

| Title | Line (dev only) |
|---|---|
| Scientific Formulations | Formulated to [standard] |
| Quality Manufacturing Partners | Made at [partner facility detail] |
| Made for Healthcare Professionals | Detailed product information for [audience] |
| Focus on India's Health & Wellness | Serving patients across [region] |

- Title `text-[15px] font-medium text-white`; line `text-sm text-ink-on-navy` under it.
- Mobile (< 640 px): `grid-cols-1`, icon left, text right. `sm`: 2 columns. `lg`: 4 columns with `white/45` dividers.
- Background `bg-navy-900`, white 1.8-stroke line icons.

## Files to modify

- `app/globals.css`: `blue-600` → `#2563eb`, remove `blue-500`, comment `blue-700` role
- `components/ui/button.tsx`: `shape` variant
- `components/site-header/site-header.tsx`, `components/site-header/mobile-menu.tsx`: logo size, CTA shape
- `components/hero/hero.tsx`: grid, capsule sizing/order, trust row, CTAs
- `components/hero/hero-highlights.tsx`: subline, mobile 1 column
- `lib/site.ts`: `heroTrust`, `heroHighlights` lines, `verified` flags, `showUnverified` helper

## Security requirements

None new. Static content, no client code added.

## Compliance check

- No real numbers invented. All figures are bracketed placeholders and never ship to production.
- WHO-GMP wording is exactly "WHO-GMP certified manufacturing partners" (rule 6).
- "Become a distributor": no claims. "Serving patients across [region]" is a placeholder. Client must confirm the wording.
- "[XX]+ Years": WhiteHill is newly launched. The client may prefer to drop this item.

## Acceptance criteria

1. Only `#2563EB` is the primary blue site-wide; no `blue-500` left anywhere.
2. Logo is 36 px tall on mobile and 44 px on desktop, not stretched, vertically centred with the nav.
3. At 1024 and 1440 px the hero is a 55/45 grid with no empty gap; capsule fully visible inside the container.
4. Trust row under the buttons: four items in dev, only WHO-GMP in a production build.
5. Hero secondary CTA reads "Become a distributor" and scrolls to Contact; header CTA has the same 8 px radius and primary colour.
6. Below 768 px the capsule sits above the headline, ≤ 220 px tall, centred.
7. Feature strip: one column below 640 px, sublines in dev only.
8. No horizontal scroll at 390, 768, 1024, 1440 px. `tsc`, lint, build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; screenshots at 390 / 768 / 1024 / 1440 px (dev for placeholders, production for the shipped view), plus a `scrollWidth` check at each width.

## Manual test steps

1. `npm run dev` → `http://localhost:3000/` at 1440, 1024, 768, 390 px.
2. Confirm the trust-row and strip placeholders appear in dev.
3. `npm run build && npm run start` → placeholders gone, WHO-GMP badge only.
4. Click "Become a distributor" → scrolls to Contact. Tab through header and hero: focus outlines visible.
5. Check buttons elsewhere (medicines filters, contact form, about page) are still pills and in the new blue.

## Update: placeholders replaced (user request)

The user asked to drop the placeholders: WhiteHill is a newly launched pharmaceutical marketing company that distributes across India. The dev-only mechanism (`verified`, `showUnverified`) is removed and all copy ships:

- Trust row: "A growing range of medicines" · "WHO-GMP Certified Manufacturing Partners" · "Distribution across India" (the `[XX]+ Years` item is dropped)
- Strip lines: "Each formula chosen with a clear purpose" · "Manufacturer named on every pack" · "Full composition and Rx status for every product" · "Marketing and supplying medicines across India"

No numbers, no cure claims, no therapy areas. Lines reuse wording already on the site (`companyValues`, `qualityPoints`, `audiences`).
