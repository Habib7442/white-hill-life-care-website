# Homepage motion and desktop layout fixes

## Goal

Fix the desktop trust row, logo size and capsule position, then add subtle entrance, float, tilt, scroll-reveal and button motion to the homepage, without an animation library.

## Skills and docs read

- `AGENTS.md` §5 (motion: respect `prefers-reduced-motion`, no carousels/pop-ups), §6 (keep `"use client"` low), §7 (**no animation libraries: Framer Motion, GSAP**), §13 (performance, LCP)
- `DESIGN.md` §8 motion (150 ms colour transitions, optional fade-up and slow float, reduced motion respected)
- `prompts/homepage-polish.md` (current hero), `prompts/preloader.md` behaviour via `components/preloader/splash-gate.tsx`

## Decisions from the user

1. **No Framer Motion.** AGENTS.md §7 forbids it. Built with CSS keyframes plus two small client components (about 1 KB together). Sections stay Server Components.
2. **Headline slides only.** It is visible from the first paint (no opacity 0 in the server HTML, so LCP isn't delayed) and only moves up 20 px. Subheading, buttons and trust row fade up.

## Existing code inspected

- `components/hero/hero.tsx`, `hero-highlights.tsx`, `lib/site.ts` (`heroTrust`)
- `components/site-header/site-header.tsx` (logo `h-10 nav:h-11`, `sizes="108px"`, header 72 px from 820 px)
- `components/ui/button.tsx` (`transition-colors duration-150` in the base)
- `components/sections/medicines.tsx`, `quality.tsx`, `contact.tsx`
- `components/preloader/splash-gate.tsx`: on the **first** visit to `/` in a tab, `<html>` has no `data-splash` for 2.9 s while the splash plays (it starts fading at ~2.1 s); every other visit has `data-splash="skip"` before first paint. The splash is hidden for reduced motion.
- `app/globals.css`: existing `float` keyframes (6 px, used on the About molecule)

## Layout fixes (≥ 1024 px)

1. **Trust row on one line:** `lg:flex-nowrap lg:justify-between` with even gaps. I'll measure the rendered widths at 1024 px. If the three items don't fit, "WHO-GMP Certified Manufacturing Partners" becomes **"WHO-GMP Certified Partners"** at `lg`+ only (mobile keeps the full wording, stacked). The full approved wording stays in the accessible name via `aria-label` only if the label is shortened visually; otherwise unchanged.
2. **Logo:** desktop height 54 px (`nav:h-[54px]`, header is 72 px tall there), mobile stays 40 px. `sizes="132px"` = 2× the ~66 px display width, so it stays sharp. Source is 640 × 523, so nothing is upscaled.
3. **Capsule shift:** an outer wrapper gets `lg:-translate-x-12 xl:-translate-x-24` (48 px / ~100 px toward the centre). Transform only: no layout change, no cropping (the section's `overflow-hidden` is far away). I'll check it doesn't touch the trust row.

## Motion

All keyframes live in `app/globals.css` `@theme` next to the existing ones. Only `transform` and `opacity` animate (button shadow is the one paint-only extra the request asks for).

| # | Effect | How | Timing |
|---|---|---|---|
| 1 | Hero entrance | CSS classes on headline (`hero-slide`: translateY 20→0 only), subheading, buttons, trust row (`hero-rise`: opacity 0→1 + translateY 20→0). `animation-fill-mode: both` | 0.5 s ease-out, delays 0 / 0.1 / 0.2 / 0.3 s, done by 0.8 s |
| — | Splash sync | `html:not([data-splash])` sets `--hero-delay: 2s` (first visit only, motion-safe only) so the entrance plays as the splash fades. Other visits: 0 s, plays immediately | first visit finishes ~2.8 s, before the splash flag flips at 2.9 s |
| 2 | Capsule in + float | Three nested layers so transforms don't fight: **outer** (shift), **tilt** layer (client), **float** layer (`animate-hero-float`: y 0 → −10 → 0, 6 s ease-in-out infinite, starts after the entrance), **img** (`animate-hero-pop`: opacity 0→1, scale 0.95→1, 0.6 s) | |
| 3 | Mouse tilt | `components/hero/capsule-tilt.tsx` (`"use client"`). Runs only if `matchMedia("(pointer: fine)")` and not reduced motion. `pointermove` on window → target rotateX/rotateY ±6° from the cursor's position relative to the capsule centre. A hand-written spring (stiffness/damping, `requestAnimationFrame`) writes `transform` straight to the element's style: no React re-renders. The loop stops when settled; listeners removed on unmount | |
| 4 | Scroll reveal | `components/reveal.tsx` (`"use client"`). Server-rendered content is visible by default (works without JS). On mount, if the element is still below the fold it gets `data-reveal="hidden"`; an `IntersectionObserver` (`rootMargin: "0px 0px -20% 0px"`, the robust equivalent of "30 % visible" that also works for sections taller than the screen) flips it to `"shown"` once, then disconnects. Children with `reveal-item` and `--i` stagger by 0.1 s | 0.5 s ease-out |
| 5 | Buttons | `buttonVariants` default / outline / secondary: `motion-safe:hover:-translate-y-0.5`, `hover:shadow-md shadow-blue-600/20`, `motion-safe:active:scale-[0.98]`. Base transition widened from colours to colours + transform + shadow, still 150 ms. Ghost, link and icon buttons unchanged | 150 ms |

**Reveal targets:** feature strip (4 items staggered), Medicines (heading block, grid block), Quality (heading block, 4 cards staggered), Contact (text column, form card).

### Reduced motion (`prefers-reduced-motion: reduce`)

- Hero entrance, capsule pop and scroll reveal become **opacity fades only** (no translate/scale). Headline: no animation at all.
- Float, tilt, button lift and tap scale are off. No splash delay (the splash is hidden for these users).

## Files

| File | Change |
|---|---|
| `app/globals.css` | Keyframes `hero-rise`, `hero-slide`, `hero-pop`, `hero-float`, `reveal-up`, `fade-in`; hero/reveal utility classes; splash-delay variable; reduced-motion overrides |
| `components/hero/hero.tsx` | Entrance classes, capsule layers, trust row one line at `lg` |
| `components/hero/capsule-tilt.tsx` | New client island (tilt + spring) |
| `components/reveal.tsx` | New client island (IntersectionObserver) |
| `components/hero/hero-highlights.tsx` | Wrapped in `Reveal`, items staggered |
| `components/sections/medicines.tsx`, `quality.tsx`, `contact.tsx` | Blocks wrapped in `Reveal` (they stay Server Components) |
| `components/ui/button.tsx` | Hover lift, shadow, tap scale |
| `components/site-header/site-header.tsx` | Logo 54 px desktop, `sizes="132px"` |
| `lib/site.ts` | Optional short label for the WHO-GMP item (only if needed) |
| `AGENTS.md` | No change: no library added |

## Security requirements

None. No data, no env vars, no new dependencies.

## Compliance check

No copy changes except the possible shortened WHO-GMP label. "WHO-GMP Certified Partners" is shorter than the approved "WHO-GMP certified manufacturing partners" (AGENTS §10.6), so the full wording stays as the `aria-label` and on mobile. **Flag for the client.**

## Acceptance criteria

1. At 1024 and 1440 px the trust row is on one line with even gaps; on mobile it stays stacked.
2. Logo 54 px tall on desktop and 40 px on mobile, sharp.
3. Capsule visibly closer to the text at 1440 px, fully visible, not overlapping the trust row.
4. Hero entrance finishes within ~0.8 s (after the splash on a first visit); the headline is visible in the server HTML.
5. Capsule pops in, then floats; on a mouse device it tilts up to ±6° smoothly; never on touch.
6. Feature strip and later sections fade up once when scrolled into view; content is visible with JS disabled.
7. Buttons lift on hover and press in on tap.
8. Reduced motion: only opacity fades.
9. No horizontal scroll at 390 and 1440 px. `tsc`, lint, build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; measured screenshots at 1440 and 390 px (scrollWidth, trust-row line count, logo height); a reduced-motion emulation pass.

## Manual test steps

1. Open `/` in a fresh tab: the splash plays, then the hero text rises in as it fades.
2. Reload: the entrance plays immediately.
3. At 1440 px move the mouse around: the capsule tilts gently and settles; it keeps floating.
4. Scroll down: the strip items, Medicines, Quality and Contact fade up once each; scrolling back up doesn't replay them.
5. Hover and click the buttons: small lift, press-in.
6. DevTools → Rendering → "prefers-reduced-motion: reduce": only fades, no float, no tilt.
7. At 390 px (touch emulation): no tilt, no horizontal scroll.

## Update: full WHO-GMP wording restored (code review)

Review flagged that the desktop-only "WHO-GMP Certified Partners" hid the approved wording from sighted visitors (AGENTS.md §10.6). The short label is removed; "WHO-GMP Certified Manufacturing Partners" shows at every width.

- 1024–1279 px: the trust row wraps to two lines; the text column is capped at 560 px so the capsule keeps its size.
- 1280 px and up: one line at 13 px, text column sized to its content (`auto`).
- The 80 px capsule shift is removed: the wider text column already narrows the middle gap, and the shift would bring the capsule within reach of the row.

The tilt also ignores non-mouse pointers (touchscreen laptops pass `(pointer: fine)` but send touch moves).
