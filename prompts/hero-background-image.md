# Hero background image

## Goal

Replace the hero's right-side molecule panel with the lab photograph `public/hero_bg.png` as a full-bleed hero background, following the layout of the user's reference (Luminara screenshot): text on the left over the light part of the photo, scientist on the right.

## Skills and docs read

- `AGENTS.md` sections 5, 10, 13
- `DESIGN.md` §1 (no stock photos of smiling models), §6 (optional blurred lab photo with blue tone), §8 imagery (lab/scientist photos only, kept on-palette)
- `node_modules/next/dist/docs/01-app/01-getting-started/12-images.md` (`fill`, `sizes`, `priority`/preload for LCP)

## Existing code and assets inspected

- `components/hero/hero.tsx`: two-column grid, text left, `<MoleculePanel />` right, two faint `MoleculeOutline` corner decorations; facts row already removed
- `components/hero/molecule-panel.tsx`, `components/hero/molecule.tsx`: used only by the hero
- `lib/site.ts`: `heroIngredients` used only by the molecule panel
- `public/hero_bg.png`: 1672×941, 1.6 MB PNG. Bright, blue-tinted lab scene. The left ~45% is near-white haze; a pale-blue circle with molecules sits in the centre; the scientist (blue gloves, pipette) is on the right. Already on-palette, and not a "smiling model" shot, so it fits `DESIGN.md` §8.

Reference screenshot (Luminara): full-bleed photo behind the whole hero, large headline + intro + two buttons on the left, subject on the right, no card or panel around the image. Its facts row and its header style are **not** part of this change.

## Decisions and assumptions

1. **Asset:** convert to `public/brand/hero-bg.webp` (1672 px wide, ~150 KB) with the existing `scripts/prepare-brand-assets.mjs` (adds one step). The original PNG moves to `assets/brand-source/hero_bg.png`. `next/image` also serves AVIF/WebP at the right size per device.
2. **Desktop (≥ 1024 px):** the photo fills the whole hero behind the content (`next/image` `fill`, `object-cover`, anchored right so the scientist is never cropped off). The hero is at least `min-h-[640px]`, text vertically centred in the left column (max ~36rem).
3. **Readability overlay:** a left-to-right gradient from `blue-25` (opaque) to transparent at ~60% width, so text keeps ≥ 4.5:1 contrast even where it reaches the blue circle at 1024 px. Palette token only, no new colour.
4. **Mobile and tablet (< 1024 px):** there's no mobile reference, and a full background would put the scientist's face behind the text. So text stays on `blue-25` first, and the photo shows **below** it as a full-width image (aspect ≈ 16:10, cropped to keep the scientist, i.e. `object-[75%_center]`), with the same right-anchored crop. Same single image file, rendered once.
5. **Image is decorative** (`alt=""`); the message is in the text. It's the LCP element on desktop, so it gets `priority` and `sizes="100vw"`.
6. **Remove the molecule panel entirely:** delete `molecule-panel.tsx`, `molecule.tsx`, the corner `MoleculeOutline` decorations, and `heroIngredients` from `lib/site.ts`. The photo already carries the molecule motif. If a later section needs a molecule, it gets built for that section.
7. **Text, buttons, and the H1** are unchanged.
8. **Document drift:** PRD §5.1 ("Molecule illustration with ingredient labels") and DESIGN §6–7 (hero "molecule panel right") no longer match. I won't edit those documents; this is flagged for you to update.

## Files to create or modify

Modify:
- `components/hero/hero.tsx`: background image + overlay (desktop), stacked image (mobile), molecules removed
- `lib/site.ts`: remove `heroIngredients`; add `heroImage` (`src`, `width`, `height`)
- `scripts/prepare-brand-assets.mjs`: add the hero image step (moves the original, writes the WebP)

Delete:
- `components/hero/molecule-panel.tsx`, `components/hero/molecule.tsx`

Move: `public/hero_bg.png` → `assets/brand-source/hero_bg.png`
Create (generated): `public/brand/hero-bg.webp`

Unused after this: the `animate-float` and `dot-grid` utilities in `app/globals.css`. **Leaving them in place** for other sections; flagged in case you'd rather they go.

## Implementation requirements

- One `<Image>` element; placement switches by breakpoint with CSS, never JS.
- No hex values; overlay uses `from-blue-25` / `to-blue-25/0`-style palette classes.
- Hero keeps `id="top"`, `aria-labelledby="hero-heading"`, and the single `<h1>`.
- No layout shift: the mobile image box has a fixed aspect ratio; the desktop hero has a min-height.
- Container alignment unchanged (text left edge lines up with the header logo).

## Security requirements

None (static asset, no data).

## Compliance check

No copy changes. The photo shows a lab scientist at work, not a patient or a testimonial; it makes no claim.

## Acceptance criteria

- [ ] No molecule panel, chips, or corner molecules remain; deleted files aren't referenced
- [ ] ≥ 1024 px: photo fills the hero behind the text, scientist fully visible on the right, text readable on the left
- [ ] < 1024 px: text on `blue-25`, photo full-width below it with the scientist in frame
- [ ] Served image is WebP/AVIF from `/_next/image`, not the 1.6 MB PNG
- [ ] No horizontal scroll at 360 / 768 / 1024 / 1440 px
- [ ] Typecheck, lint, build pass

## Checks to run

- `node scripts/prepare-brand-assets.mjs`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Manual test steps

1. `npm run dev`, open http://localhost:3000.
2. At 1440 and 1280 px: compare with the reference. Photo behind, text left, scientist right.
3. At 1024 px: the text should still read clearly where it meets the blue circle.
4. At 768 and 360 px: text first on light blue, photo below with the scientist visible.
5. DevTools → Network → Img: the hero image comes from `/_next/image` as AVIF/WebP.
