# Preloader (splash screen)

## Goal

Show a polished full-screen splash once per visit: a big WhiteHill logo mark with the company name, a soft blue line-art Indian rural scene along the bottom, and a short progress line. It then fades away to reveal the page.

## Skills and docs read

- `AGENTS.md` sections 5 (motion, accessibility), 10 (company name; rule 10, Indian imagery), 13 (performance), 14 (fixed header, hydration)
- `DESIGN.md` §1 (scientific, clean, no flashy effects), §2 palette, §3 typography, §6 (dot-grid texture), §9 motion (respect `prefers-reduced-motion`)
- `node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md`: inline script runs synchronously before first paint; `suppressHydrationWarning` on the element the script changes; `InlineScript` helper (`type="text/javascript"` on server, `text/plain` on client) to avoid React's dev warning about `<script>` tags

## Existing code and assets inspected

- `app/layout.tsx`: fonts, JSON-LD, `{children}`
- `public/brand/whitehill-logo.webp` (640×523): the **WH leaf mark** is the top ~62%, the wordmark the bottom ~38%
- `scripts/prepare-brand-assets.mjs`: produces brand WebPs
- `app/globals.css`: `dot-grid` utility (currently unused), palette tokens

## User decisions

- **Rural imagery:** a hand-built **line-art SVG scene**, not photos
- **Frequency:** **every page load, including refresh** (changed from once-per-visit at the user's request; total ≈ 2.8 s)

## Design

**Background:** soft vertical gradient `white` → `blue-25`, with the `dot-grid` texture faintly over the upper half.

**Centre stack** (vertically centred, slightly above middle):

1. **WH leaf mark**, cropped from the logo: **160 px wide on mobile, 220 px from `lg`**
2. **"WhiteHill Lifecares Pvt Ltd"** in Source Serif 4 600, `navy-900`, **26 px mobile / 36 px desktop**, 20 px below the mark (rendered from `company.legalName`)
3. Eyebrow **"Science · Quality · Care"**: IBM Plex 600, uppercase, 0.14em tracking, `blue-600`, 12/13 px, 10 px below the name
4. **Progress line:** 160 px wide, 2 px tall, `blue-100` track with a `blue-600` fill that grows left to right over the splash's life, 24 px below

**Rural scene** (bottom of the screen, full width, ~28% of the viewport height, max 260 px, `aria-hidden`):

A calm Indian village panorama in thin blue lines (1.5–2 px, rounded caps) with very light fills:

- Two layers of rolling hills (back layer `blue-100` fill, front layer `blue-50` fill, outlines `blue-200`)
- Rows of crop fields as curved furrow lines across the foreground (`blue-200`)
- A small cluster of village homes: three huts with sloped tiled roofs and one flat-roof house (`blue-300` outlines, `white` fills)
- A **small village pharmacy / health centre**: a simple building with a medical cross sign (the cross in `blue-600`, the only strong colour in the scene, tying it to the business)
- Two neem / palm-style trees and a well
- A rising sun as a half circle on the horizon (`blue-100` fill, `blue-200` rays), and three small birds
- On wide screens the scene stretches; on phones it's cropped from the centre, so the pharmacy stays visible

**Motion** (all CSS):

| Time | What happens |
|---|---|
| 0–0.6 s | Mark fades and scales in (0.96 → 1); name and eyebrow fade up 8 px, staggered 0.1 s |
| 0–0.8 s | Rural scene rises 16 px and fades in; sun lifts 6 px |
| 0–1.8 s | Progress line fills |
| 1.8–2.3 s | Whole splash fades out and scales up very slightly (1 → 1.02), then is gone |

Total ≈ **2.3 s**. Gentle, no bounces, no spinning.

## Decisions and assumptions

1. **Mark, not full logo:** the full logo already contains the words "WhiteHill Lifecares Pvt Ltd", so the splash shows the **WH leaf mark** big with the name as real text below it (no duplicated name). The asset script crops the mark into `public/brand/whitehill-mark.webp`.
2. **Once per visit, without a flash:** the splash is server-rendered on every load. A tiny inline script placed directly after it checks `sessionStorage`. If the visitor has already seen it in this tab, it hides the splash **before the first paint**, so returning views never see a flicker. Otherwise it records the visit. Uses the Next.js `InlineScript` pattern and `suppressHydrationWarning` on the splash element. If `sessionStorage` is blocked (private mode), the splash simply shows.
3. **Never blocks the page:** the page renders fully underneath (search engines and the hero image are unaffected). After the fade, the splash gets `visibility: hidden` and `pointer-events: none`.
4. **Reduced motion:** visitors with `prefers-reduced-motion: reduce` don't see the splash at all.
5. **Accessibility:** the splash is `aria-hidden="true"`; screen readers start on the page.
6. **No extra images:** the scene is inline SVG (~4–6 KB), the mark ~15 KB WebP, `loading="eager"`.
7. **Placement:** `components/preloader/preloader.tsx` (Server Component) + `components/preloader/rural-scene.tsx` (SVG) + `components/preloader/inline-script.tsx`, rendered first inside `<body>` in `app/layout.tsx`; z-index above the fixed header.

**Trade-off:** first-time visitors wait ~2.3 s before they can read the page, and Lighthouse may score slightly lower. Once-per-visit, CSS-only animation, and the reduced-motion skip keep this small.

## Files to create or modify

Create:
- `components/preloader/preloader.tsx`
- `components/preloader/rural-scene.tsx`
- `components/preloader/inline-script.tsx`
- `public/brand/whitehill-mark.webp` (generated)

Modify:
- `scripts/prepare-brand-assets.mjs`: mark crop step
- `app/layout.tsx`: `<Preloader />` first in `<body>`
- `app/globals.css`: splash keyframes, reduced-motion rule
- `lib/site.ts`: `company.mark` (`src`, `width`, `height`)

## Implementation requirements

- Palette tokens only (SVG uses `stroke-*` / `fill-*` classes or `var(--color-…)`); no hex.
- Company name from `company.legalName`; no retyping.
- No new dependencies; no JavaScript animation.
- The inline script is tiny, has no external input, and is wrapped in `try/catch`.

## Security requirements

The inline script contains only a fixed string (no user or CMS data), so it adds no injection risk.

## Compliance check

Shows only the registered company name and the "Science · Quality · Care" eyebrow already used in the hero. The pharmacy cross is a generic symbol, with no medical claim. No people are drawn, so there's no conflict with the Indian-imagery rule.

## Acceptance criteria

- [ ] First visit: splash with big WH mark, "WhiteHill Lifecares Pvt Ltd", eyebrow, progress line, and rural scene; fades out at ~2.3 s
- [ ] Refresh in the same tab: no splash and no flicker
- [ ] New tab or new browser session: splash shows again
- [ ] Reduced motion: no splash
- [ ] Looks balanced at 360 / 768 / 1440 px; pharmacy visible on phones
- [ ] After fading, clicks reach the page immediately
- [ ] No hydration warnings in the console; typecheck, lint, and build pass

## Checks to run

- `node scripts/prepare-brand-assets.mjs`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Manual test steps

1. `npm run dev`; open http://localhost:3000 in a **new tab**: the splash plays, then the hero appears.
2. Refresh (F5): no splash, no flicker.
3. Close the tab and open the site in a new tab: the splash plays again.
4. DevTools → Console: no hydration warnings.
5. DevTools → device toolbar at 360 px: everything centred, scene cropped with the pharmacy visible.
6. DevTools → Rendering → emulate `prefers-reduced-motion: reduce`, open in a new tab: no splash.
