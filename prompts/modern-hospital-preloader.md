# Preloader Redesign: Modern Blue Medical Hospital Scene

## Goal

Redesign the full-screen splash preloader to match the user's reference mockup, incorporating the high-resolution modern hospital scene (`assets/modern-blue-medical-hospital-scene.png` converted to optimized WebP), the WhiteHill branding with "— HEALTHCARE & WELLNESS —", a circular glowing gradient spinner, and decorative soft wave and dot-grid accents.

## Skills and Docs Read

- `AGENTS.md` sections 2 (workflow), 3 (prompt files), 5 (UI rules, colors, motion, accessibility), 10 (compliance & company name), 13 (performance)
- `DESIGN.md` §1 (scientific, clean laboratory feel), §2 (palette tokens: `--navy-900`, `--blue-600`, `--blue-50`, `--blue-25`, `--white`), §3 (typography: Source Serif 4, IBM Plex Sans), §6 (dot-grid textures & curves), §9 (motion & `prefers-reduced-motion`)
- `prompts/preloader.md` (previous preloader specification and rationale)

## Existing Code Inspected

- `components/preloader/preloader.tsx`: currently renders WH mark, company legal name, tagline, horizontal bar progress, and SVG `RuralScene`
- `components/preloader/splash-gate.tsx`: runs inline script to prevent flash on reload/navigation via `data-splash="skip"`
- `components/preloader/rural-scene.tsx`: previously used SVG scene
- `app/globals.css`: splash keyframe definitions (`splash-exit`, `splash-pop`, `splash-rise`, `splash-scene`, `splash-progress`)
- `lib/site.ts`: `company.legalName`, `company.tagline` ("Healthcare & Wellness"), `company.mark`
- `assets/modern-blue-medical-hospital-scene.png`: 1672×941 source illustration provided by the user in Downloads

## Visual Interpretation of the Reference

Based on the reference mockup (`media_1793676216394_cc027c7d.png`) and the user's high-res asset:

1. **Top Corner & Background Accents**:
   - Soft gradient background: from pale blue-white (`#F0F6FE` / `--blue-25`) to pure white.
   - Dynamic curved wave bands in the upper area with fading blue halftone dot clusters.
2. **Top / Center Branding Stack**:
   - **WH Leaf Mark**: Centered 3D-styled glossy blue monogram (`public/brand/whitehill-mark.webp`). Sized ~140–180 px on mobile, ~220–240 px on desktop.
   - **Company Legal Name**: "WhiteHill Lifecares Pvt Ltd" in Source Serif 4, weight 600, color `--navy-900` (`#172C6B`). Size 24–28 px on mobile, 36 px on desktop.
   - **Tagline**: `— HEALTHCARE & WELLNESS —` in IBM Plex Sans 600, uppercase with 0.18em tracking, color `--blue-600` (`#2563EB`), with thin horizontal rule dividers on both sides.
3. **Loader / Spinner**:
   - Centered between company branding and hospital scene.
   - Circular rotating spinner (~48–56 px diameter).
   - Smooth gradient ring arc with an illuminated glowing leading tip (`#2563EB` to `#9CC3FB`), spinning smoothly via CSS animation.
4. **Bottom Modern Hospital Illustration**:
   - Full-width modern hospital building facade flanked by trees, with foreground pharmaceutical elements (medicine bottle with blue cross, blue/white capsules, tablets, blister foil pack, mortar & pestle with herbal leaves, and laboratory flask).
   - Converted to high-quality, lightweight WebP (`public/brand/hospital-scene.webp`, ~127 KB).
   - Anchored to the bottom (`bottom-0 w-full`), seamlessly blending upward with a subtle soft gradient mask into the canvas.

## Decisions and Assumptions

1. **Asset Optimization**:
   - Convert `assets/modern-blue-medical-hospital-scene.png` (1.65 MB) into `public/brand/hospital-scene.webp` (127 KB) using `sharp` at 88% quality, preserving full 1672×941 detail while cutting bandwidth by >92%.
2. **Replacing Rural Scene**:
   - Replace the previous line-art `RuralScene` component with the modern medical hospital scene requested by the user.
   - The scene is rendered using `next/image` with `priority` and `sizes="100vw"` on an eager loading pipeline.
3. **Circular Spinner vs Horizontal Bar**:
   - The user reference replaces the horizontal bar with a circular loading spinner. We implement this as a pure SVG/CSS circular spinner with gradient stroke and glowing bead at the leading tip.
4. **Frequency & Hydration**:
   - Keep the existing `SplashGate` behavior: it displays on initial visit to `/`, smoothly exits after ~2.8 s, and sets `data-splash="skip"` so return visits and internal page navigations are instant and never flicker.
5. **Reduced Motion**:
   - `motion-reduce:hidden` is preserved; visitors preferring reduced motion bypass the splash instantly.
6. **Tokens & Typography**:
   - Use strict project tokens: `--navy-900`, `--blue-600`, `--blue-100`, `--blue-50`, `--blue-25`, `--white`. No arbitrary hex values in components.

## Responsive Behavior

- **Mobile (360–480 px)**: Stack vertically with comfortable padding. WH mark ~140 px, text 22–24 px, spinner 44 px, hospital scene height ~30–35vh with `object-cover object-bottom`.
- **Tablet (768 px)**: WH mark ~180 px, text 30 px, spinner 48 px, hospital scene height ~32vh.
- **Desktop (1024–1440 px+)**: WH mark ~220 px, text 36 px, spinner 52 px, hospital scene anchored cleanly along the bottom with max-height ~380 px, centered with soft side fades so it scales gracefully on ultrawide monitors.

## Files to Create or Modify

- **Generate**:
  - `public/brand/hospital-scene.webp` (optimized from `assets/modern-blue-medical-hospital-scene.png`)
- **Modify**:
  - `components/preloader/preloader.tsx`: update layout, replace horizontal bar with circular spinner, add top decorative wave/halftone accents, and render the hospital scene WebP
  - `components/preloader/hospital-scene.tsx` (or update within `components/preloader/`): presentational image wrapper with responsive framing and bottom anchor
  - `app/globals.css`: adjust keyframes if needed for the circular spinner and smooth exit transition

## Implementation Requirements

- Clean React 19 / Next.js 16 Server Component for `<Preloader />`.
- SVG / CSS gradient circular spinner without heavy external libraries.
- Strict compliance with `DESIGN.md` palette and typography.
- Retain `data-preloader` attribute and `aria-hidden="true"`.

## Security Requirements

- Purely static presentation; no user input or external script execution.

## Compliance Check

- Uses exact legal name `WhiteHill Lifecares Pvt Ltd` and tagline `Healthcare & Wellness`.
- No false claims or medical advice; generic hospital & pharmacy artistic visualization.

## Acceptance Criteria

1. Preloader visually matches the user's reference mockup (logo mark, serif company name, framed tagline, glowing circular spinner, bottom modern medical hospital illustration).
2. `public/brand/hospital-scene.webp` is properly generated, optimized (<150 KB), and sharp on high-DPI displays.
3. Preloader runs smoothly on `/`, spins the circular loader, and gracefully fades out after ~2.8 s.
4. `SplashGate` continues to prevent replays on subsequent navigation or tab reloads.
5. No layout shift, no hydration errors, and typecheck passes cleanly.

## Checks to Run

- `node scripts/prepare-brand-assets.mjs` (or node sharp script)
- `npm run typecheck`
- `npm run lint`

## Exact Manual Test Steps

1. Clear session storage or open an incognito window at `http://localhost:3000/`.
2. Observe the initial load:
   - Curved blue wave & dot-pattern accents at top.
   - WH leaf mark and "WhiteHill Lifecares Pvt Ltd" appear.
   - "— HEALTHCARE & WELLNESS —" rendered with flanking lines in `--blue-600`.
   - Glowing circular spinner spins continuously.
   - Modern hospital scene sits anchored at the bottom.
3. Observe smooth exit transition after ~2.6–2.8 s.
4. Refresh or navigate to another page and back to ensure no re-triggering flicker occurs.
