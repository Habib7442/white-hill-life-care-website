# Preloader redesign from the client reference

## Goal

Make the home splash match the attached reference: one continuous full-screen illustration, with a large WH mark, the company name, the tagline and a clear spinner sitting on its sky, and no cropped building or visible seam at any screen size.

## Skills and docs read

- `AGENTS.md` §5 (reference is the source of truth; palette; motion), §10 (company name), §13 (performance), §14 (hydration)
- `DESIGN.md` §2 palette, §3 type, §9 motion
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` (`getImageProps`, art direction, `fetchPriority`)
- Project memory: the client keeps the 2.8 s splash, so its timing and once-per-tab behaviour do not change

## Reference (attached by the user)

1672 × 941 px, 16:9. Pale sky with soft waves and halftone dots in the top corners. Centred at the top: WH leaf mark (~19% of the width), "WhiteHill Lifecares Pvt Ltd" in dark navy serif (~41% of the width), "— HEALTHCARE & WELLNESS —" in spaced blue capitals, and a ring spinner (~4.5% of the width). The bottom half shows the hospital, trees, bottle, capsules, tablets, blister strip, mortar and flask.

## Existing code inspected, and what is wrong today

Screenshots of the current production build at 1440 × 810 and 390 × 844:

| Problem | Cause |
|---|---|
| At 1440 px the hospital's roof and cross are cut off, and a hard horizontal seam crosses the screen | `hospital-scene.tsx` crops a 16:9 image into a short strip with `object-cover object-bottom` |
| At 390 px there is a big empty gap mid-screen, and the bottle and mortar are cut off | The same strip layout, with one image for every screen shape |
| The waves end in hard-edged shapes in the corners | `splash-background.tsx` draws its own SVG waves, separate from the art |
| The logo and name are small, and the spinner is faint | Sizes are about half the reference (spinner 38 px) |
| On a cold load the logo and scene were still missing at 1.5 s of the 2.8 s splash | Images wait for the on-demand image optimizer |
| Hex colours in components | `bg-[#…]` and `stopColor` values break AGENTS §5 |

Also inspected: `splash-gate.tsx` (no change), the splash keyframes in `app/globals.css`, and `rural-scene.tsx` (no longer imported anywhere).

## Decisions and assumptions

1. **Art comes from the reference itself,** so the desktop view matches it exactly, including the corner dots. This reverses the 3 Nov "remove the dots" change, because the new reference has them.
2. **The logo, name, tagline and spinner stay real, not baked into the image.** I retouch them out of the reference and render the real logo file, real text (`company.legalName`, `company.tagline`) and a live spinner in the same positions. The text stays sharp and the spinner moves.
3. **Two images, chosen by screen shape:**
   - `splash-scene.webp` (landscape, 1672 × 941): the retouched reference.
   - `splash-scene-portrait.webp` (about 955 × 2070): the same art rebuilt for phones. The scene is cropped from bottle to flask, with extra sky above and the corner dots moved into its top corners. Nothing is redrawn.
   - A `<picture>` loads only the one that fits (`getImageProps`, per the docs).
4. **Fast first paint:** the scripted WebPs are pre-sized and served directly (`unoptimized`, `fetchPriority="high"`), so they skip the optimizer delay. Target under ~150 KB each. The mark is served the same way.
5. **Timing unchanged:** 2.8 s, once per tab, skipped for reduced motion. The entrance animations stay.
6. **Sharpness limit:** the reference is 1672 px wide, so it is slightly soft on 1920 px and larger screens. A larger original would fix that.

## Layout

The splash is `fixed inset-0` with the art as a full-bleed layer (`object-cover object-bottom`) and the brand stack above it, centred horizontally.

| Viewport | Art | Stack |
|---|---|---|
| Landscape (wider than 1:1) | Landscape image | Starts ~4svh from the top and must stay within the top ~43svh, clear of the roof. Sizes scale with viewport height (`svh`) so short laptop windows such as 1366 × 650 still fit |
| Portrait | Portrait image | Centred in the sky above the hills |

Stack at 1440 × 810 (from the reference, scaled):

- Mark ~270 px wide (phone ~190 px)
- Name: `font-heading` bold `text-navy-900`, ~44 px (phone 24 px)
- Tagline: 13–16 px, tracking 0.22em, `text-blue-600`, with thin `blue-600` rules on each side (phone 11 px)
- Spinner ~60 px (phone 44 px): `blue-100` track, `blue-600` arc, palette tokens only

Fallback colour behind the art while it loads: `bg-blue-25`.

## Files

| File | Change |
|---|---|
| `scripts/prepare-splash-art.py` | New: repeatable retouch and portrait build from the reference |
| `public/brand/splash-scene.webp`, `splash-scene-portrait.webp` | New art |
| `public/brand/hospital-scene.webp` | Delete (unused after this) |
| `components/preloader/preloader.tsx` | New layout and `<picture>` |
| `components/preloader/spinner.tsx` | Larger, palette tokens, no hex |
| `components/preloader/hospital-scene.tsx`, `splash-background.tsx`, `rural-scene.tsx` | Delete (unused after this) |
| `app/globals.css` | Remove the unused `splash-progress` animation |

## States and motion

Stack pops and rises as today; the art fades in over 0.4 s and the whole splash fades out at the end. Reduced motion: no splash. Motion stays CSS only.

## Security requirements

None. Static images and text; the splash gate script is unchanged.

## Compliance check

- Registered name from `company.legalName`; tagline already in use. No claims, numbers or prices.
- **Needs client confirmation:**
  - **Hospital building:** WhiteHill is a young marketing company with no hospital. AGENTS §1 says never to look like a large corporation, and a big building with a cross could suggest a facility it does not own. Kept because the reference shows it.
  - **Green and teal:** the trees and leaves fall outside the blue-and-white palette (AGENTS §5). Kept because the reference shows them; treated as an exception inside this illustration only, not in the UI.
  - **People:** the silhouettes in the doorway are too small to identify, so rule 10 is not affected.

## Acceptance criteria

1. At 1440 × 810 the splash matches the reference side by side: same art, dots, stack position and proportions.
2. The hospital roof and cross are fully visible at 1920 × 1080, 1440 × 810, 1366 × 650 and 1024 × 768, with no overlap between the stack and the building.
3. At 768 × 1024, 390 × 844 and 360 × 640: bottle, capsules, blister strip and hospital are visible, with no empty band and no overlap. Leaf and flask edges may trim slightly.
4. No visible seam, and no leftover traces of the baked-in logo, text or spinner.
5. The logo and art are visible within ~1 s on a cold load of a production build.
6. Only one art file downloads per visit.
7. Splash timing, once-per-tab and reduced-motion behaviour are unchanged; no hydration warnings.
8. No hex values left in `components/preloader/`.
9. `tsc`, lint and build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; screenshots of the production build at every size in criteria 2 and 3, plus a cold-load shot.

## Manual test steps

1. `npm run build && npm start`, then open http://localhost:3000 in a **new tab**; compare with the reference.
2. Refresh: no splash (once per tab).
3. DevTools device toolbar: check 1920 × 1080, 1366 × 650, 1024 × 768, 768 × 1024, 390 × 844 and 360 × 640 (open a new tab for each so the splash replays).
4. DevTools Network with the cache disabled: only one `splash-scene` file loads.
5. Emulate `prefers-reduced-motion: reduce`: no splash.

## Update: loading bar and implementation notes (user request, 5 Nov)

- **Spinner removed, loading bar added** (user request): a 4 px rounded bar, `blue-200` track and `blue-600` fill, that fills over 2.2 s and finishes just before the fade. `spinner.tsx` is deleted, and the `splash-progress` animation stays because the bar uses it. Only the unused `splash-scene` animation is removed.
- **Stack sizing:** `--splash-sky` in `app/globals.css` works out the height above the roof for the current window shape, and `--splash-unit` scales the stack from it, also capped by width. This replaces the fixed `svh` sizes in Layout, so the stack never reaches the building.
- **Art entrance:** no fade-in on the art; it paints as soon as it loads, on the `blue-25` fallback.

## Update: tagline and bar position (user request, 5 Nov)

- Tagline is now "Pharmaceutical Marketing Company" (`company.tagline`, used only on the splash).
- Loading bar moved closer, directly under the tagline. Tagline rules shortened and its size floored at 10 px so the longer text fits at 360 px.

## Update: client's phone artwork (user request, 5 Nov)

- `splash-scene-phone.webp` (941 × 1672), from the client's portrait image, is used on upright screens up to 640 px wide. Upright tablets keep `splash-scene-portrait.webp`, because this art's roof sits high and would leave too little sky on a wider screen.
- On phones the tagline is `blue-700` (`blue-600` is under 4.5:1 on this deeper sky, about 3.8 to 4.5) and the bar track is `white/70`.
- Below 360 px the tagline's side rules are hidden so it fits.
- Tall phones: the script adds sky above the client's art (941 × 2090 in total) so the art fits the phone's width and nothing is trimmed at the sides on phones up to 20:9.
