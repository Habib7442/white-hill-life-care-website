# Preloader Redesign: Fully Coded Medical Screen with Hospital Scene Asset

## Goal

Build the preloader completely in React/HTML/Tailwind code using the reference visual (`media_1793689189738_45a283b4.png`), featuring real typography (Source Serif 4, IBM Plex Sans), WH leaf mark, live glowing circular SVG spinner, corner wave & halftone dot vector backgrounds, and anchoring `"Modern Blue Medical Hospital Scene.png"` (optimized WebP) edge-to-edge at the bottom.

## Skills and Docs Read

- `AGENTS.md` sections 2 (workflow), 3 (prompt files), 5 (UI rules, colors, typography, motion, accessibility), 10 (compliance & company name), 13 (performance)
- `DESIGN.md` §1 (clean laboratory direction), §2 (palette tokens: `--navy-900`, `--blue-600`, `--blue-200`, `--blue-50`, `--blue-25`), §3 (typography: Source Serif 4 bold, IBM Plex Sans uppercase)
- Reference image: `media_1793689189738_45a283b4.png` / `WhiteHill Healthcare Wellness Poster.png`

## Existing Code Inspected

- `components/preloader/preloader.tsx`: previously used a single composite poster WebP; must be refactored into modular, coded UI components.
- `components/preloader/hospital-scene.tsx`: wrapper for the bottom medical illustration asset (`public/brand/hospital-scene.webp`).
- `components/preloader/spinner.tsx`: live SVG circular gradient spinner with a glowing cyan tip bead.
- `components/preloader/splash-background.tsx`: decorative waves and halftone dot grids.
- `public/brand/hospital-scene.webp`: optimized WebP (127 KB) generated from `Modern Blue Medical Hospital Scene.png` (1672×941).
- `public/brand/whitehill-mark.webp`: clean 3D leaf monogram mark.
- `lib/site.ts`: `company.legalName` ("WhiteHill Lifecares Pvt Ltd"), `company.tagline` ("Healthcare & Wellness"), `company.mark`.

## Visual Interpretation of Reference Mockup

Examining `media_1793689189738_45a283b4.png`:

1. **Background & Atmosphere**:
   - Soft vertical gradient background from pale sky blue (`#E4F2FD`) at top to white/sky at mid-canvas.
   - Dynamic curved wave bands sweeping from top-center down to left-middle.
   - Two dense halftone dot matrices: top-right corner and top-left under the wave.
   - Soft rolling hill horizon lines in the upper mid-ground.

2. **Top / Center Branding Stack (Coded in React JSX & CSS)**:
   - **WH Monogram Logo**: Real `next/image` using `public/brand/whitehill-mark.webp`, with subtle blue elevation shadow (`drop-shadow-[0_12px_24px_rgba(37,99,235,0.18)]`). Sized ~130–150px on mobile, ~190–220px on desktop.
   - **Company Legal Name**: Real text `<p className="font-heading ... text-navy-900">WhiteHill Lifecares Pvt Ltd</p>` in Source Serif 4 bold.
   - **Tagline with Flanking Rules**: Real text `— HEALTHCARE & WELLNESS —` in IBM Plex Sans bold (`text-blue-600 tracking-[0.22em] uppercase`), flanked by fine gradient rule dividers.
   - **Live Circular Glowing Spinner**: Real SVG/CSS circular spinner with dynamic gradient arc and glowing cyan tip bead (`#38BDF8`), continuously spinning at 60fps.

3. **Bottom Hospital Scene (`Modern Blue Medical Hospital Scene.png`)**:
   - Anchored edge-to-edge at the base (`w-full absolute inset-x-0 bottom-0`).
   - Sized so that the hospital clinic, roof, blue cross, trees, and foreground pharmaceuticals (bottle, pills, capsules, blister pack, mortar/pestle, flask) are 100% visible.
   - Soft top gradient mask so the sky of the image merges invisibly into the preloader background.

## Decisions and Assumptions

1. **No Baked Poster Image**: We do not use a single flat image with text and logo baked in. All text, logo, spinner, and background vectors are implemented as real HTML/React components, preserving SEO, typography rendering, accessibility, and dynamic scaling.
2. **Bottom Asset**: The bottom artwork uses `public/brand/hospital-scene.webp` (converted from `"Modern Blue Medical Hospital Scene.png"` at 1672×941, 127 KB).
3. **Exact Layout Proportions**:
   - Screen divided vertically into:
     - Upper ~30–35%: Branding stack (Logo, Legal Name, Tagline, Live Spinner) centered in the sky.
     - Lower ~65–70%: Hospital scene spanning edge-to-edge with the clinic, trees, and medicines completely unclipped.
4. **Hydration & Replay**:
   - Retain `SplashGate` behavior (`data-splash="skip"` after initial visit to `/`).
   - Retain `motion-reduce:hidden` accessibility compliance.
   - Smooth 0.4s fade-out at the end of the 2.8s duration.

## Responsive Behavior

- **Mobile (360–480 px)**: Stack vertically with compact padding. WH mark ~120px, text 20px, tagline 10px, spinner 38px. Hospital scene occupies the lower 55–60% of screen height (`object-cover object-bottom`), showing the clinic and medicines.
- **Tablet (768 px)**: WH mark ~160px, text 26px, tagline 11px, spinner 42px. Hospital scene occupies lower 65% of screen.
- **Desktop (1024–1440 px+)**: WH mark ~190–210px, text 32–36px, tagline 12–13px, spinner 46px. Hospital scene fills lower 70–75% of screen width edge-to-edge, with the full hospital building and medicines displayed.

## Files to Create or Modify

- **Modify**:
  - `components/preloader/preloader.tsx`: Reconstruct the coded layout with real text, logo, tagline, spinner, and bottom hospital scene.
  - `components/preloader/hospital-scene.tsx`: Ensure full-width edge-to-edge rendering with seamless sky blend.
  - `components/preloader/splash-background.tsx`: Refine vector wave curves and halftone dot patterns to match the reference.
  - `components/preloader/spinner.tsx`: Match the glowing circular loader style from the reference.

## Implementation Requirements

- Clean React 19 / Next.js 16 Server Component for `<Preloader />`.
- Strict use of design system tokens: `--navy-900`, `--blue-600`, `--blue-200`, `--blue-50`, `--blue-25`.
- No new external runtime libraries.

## Security Requirements

- Static UI components; no user input or external script execution.

## Compliance Check

- Displays the verified legal name `WhiteHill Lifecares Pvt Ltd` and tagline `Healthcare & Wellness`.
- No cure/treatment claims.

## Acceptance Criteria

1. Preloader is constructed from real code components (typography, logo, spinner, vector waves) rather than a single static poster image.
2. The bottom illustration is `"Modern Blue Medical Hospital Scene.png"` (`hospital-scene.webp`), spanning edge-to-edge with the clinic, cross, trees, and foreground pharmaceuticals fully visible.
3. The circular loader spins live in real-time above the hospital building.
4. Runs smoothly on `/`, does not flash or replay on subsequent visits, and passes `npm run typecheck` cleanly.

## Checks to Run

- `npm run typecheck`
- `npm run lint`

## Exact Manual Test Steps

1. Clear `sessionStorage` or open an Incognito tab at [http://localhost:3000](http://localhost:3000).
2. Verify:
   - WH leaf mark and text "WhiteHill Lifecares Pvt Ltd" are rendered as real elements.
   - Tagline "— HEALTHCARE & WELLNESS —" rendered in tracked blue font with horizontal rules.
   - Circular spinner with cyan glow rotates live.
   - Modern hospital scene spans across the bottom edge-to-edge with full building and medicines visible.
   - The preloader transitions smoothly away after ~2.8 seconds.
