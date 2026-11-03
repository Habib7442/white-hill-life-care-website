# Preloader Fix: Sequential Layout, Below-Loading-Bar Placement & Remove Dots

## Goal

Refactor the preloader layout so the hospital scene sits cleanly **after and below** the logo, company name, tagline, and loading spinner in a non-overlapping vertical flow, removing all top halftone dots and applying a soft top edge dissolve so the image never feels cut off or overpowers the text.

## Skills and Docs Read

- `AGENTS.md` sections 2 (workflow), 3 (prompt files), 5 (UI rules, colors, typography, motion, accessibility), 10 (compliance & company name), 13 (performance)
- `DESIGN.md` §1 (clean laboratory feel, simple & honest), §2 (palette), §3 (typography)
- User feedback and screenshot: `media_1793690607650_74d48aa7.png`

## Existing Code Inspected

- `components/preloader/preloader.tsx`: currently positioned `HospitalScene` as an absolute layer with `h-[76vh]`, which caused it to rise up into the upper 24% of the screen and collide directly with the text and spinner.
- `components/preloader/splash-background.tsx`: contains SVG halftone dot clusters in the corners that the user requested removed.
- `components/preloader/hospital-scene.tsx`: image frame for `Modern Blue Medical Hospital Scene.png` (`public/brand/hospital-scene.webp`).
- `components/preloader/spinner.tsx`: circular glowing loading spinner.

## Visual Interpretation & User Requirements

1. **Remove Top Dots**:
   - Eliminate all halftone dot matrix patterns from `SplashBackground`.
   - Maintain a pristine, calm laboratory background: soft sky gradient (`#E7F3FD` to `#F4F9FE`) with subtle, translucent fluid wave swooshes across the top corners.
2. **Prevent Image From Overpowering Text**:
   - The logo mark, company legal name (`WhiteHill Lifecares Pvt Ltd`), tagline (`— HEALTHCARE & WELLNESS —`), and loading spinner must sit in their own dedicated top section on clean, unobstructed sky.
   - The hospital illustration must be placed **strictly below / after** the branding stack and loading indicator.
3. **Move Image Downwards & Eliminate Hard Cuts**:
   - Give the hospital scene the remaining lower portion of the screen in a flexible, non-overlapping container (`flex-1 min-h-0 flex items-end justify-center`).
   - Add a smooth top feather gradient blend so the image blends seamlessly into the sky above it with zero harsh rectangular seams.
   - Ensure the hospital building, clinic cross, trees, and foreground pharmaceuticals (bottle, pills, capsules, blister pack) remain fully visible and comfortable.

## Responsive Behavior

- **Mobile (360–480 px)**: Logo and text stacked compactly at top (~190px total height), followed by the spinner, followed by the hospital scene filling the bottom half without collision.
- **Tablet (768 px)**: Top branding ~220px, hospital scene filling the lower ~55% of the viewport.
- **Desktop (1024–1440 px+)**: Top branding ~240px with generous breathing room. Hospital scene occupies the lower ~52–58% of the screen, anchored edge-to-edge with the top dissolving into the clean background sky.

## Files to Create or Modify

- **Modify**:
  - `components/preloader/splash-background.tsx`: Remove all halftone dot clusters; retain clean soft waves and gradient.
  - `components/preloader/preloader.tsx`: Switch from overlapping absolute layers to a clean sequential flex layout where the image is placed strictly after the logo, text, and spinner.
  - `components/preloader/hospital-scene.tsx`: Refine top edge gradient blend and responsive sizing so the illustration feels natural, grounded, and unclipped.

## Implementation Requirements

- React 19 / Next.js 16 Server Component for `<Preloader />`.
- Zero text overlap; clear visual hierarchy.
- Design tokens only (`--navy-900`, `--blue-600`, etc.).

## Security Requirements

- Pure static presentation; no security implications.

## Compliance Check

- Standard legal name `WhiteHill Lifecares Pvt Ltd` and tagline `Healthcare & Wellness` preserved.

## Acceptance Criteria

1. Top halftone dots are completely removed; background is clean and elegant.
2. Text and logo are 100% unobstructed on a clean background sky.
3. Hospital scene sits below the loading spinner without collision or overpowering.
4. Top edge of the hospital scene blends smoothly with no harsh cut.
5. All TypeScript checks pass cleanly.

## Checks to Run

- `npm run typecheck`
- `npm run lint`

## Exact Manual Test Steps

1. Clear `sessionStorage` in DevTools (delete `wh-splash-seen`) or open an Incognito tab at [http://localhost:3000](http://localhost:3000).
2. Verify:
   - No dots in the upper background.
   - WH leaf mark, `WhiteHill Lifecares Pvt Ltd`, `— HEALTHCARE & WELLNESS —`, and the circular glowing spinner sit comfortably at the top on a clean sky background.
   - The modern hospital building and medicines sit below the spinner with no text collision.
   - The transition between the sky and the hospital image is soft and natural with no visible cut.
