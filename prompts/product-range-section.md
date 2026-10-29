# Product range section (after the hero)

## Goal

Add the client's "Committed to Better Health and Wellness" section directly after the hero: a large feature panel on the left and four product-range tiles (Pharmaceuticals, Nutraceuticals, Wellness Products, Commitment to Quality) on the right, using the supplied images as WebP.

## Skills and docs read

- `AGENTS.md` §5 (reference image is the source of truth; palette; images), §6 (sections are Server Components, content in `lib/`), §10 (compliance, rule 9: no therapy areas in company copy)
- `DESIGN.md` §2 palette, §5 components (cards, radius), §7 page structure
- `node_modules/next/dist/docs/` image guide (`sizes`, lazy loading below the fold)
- `prompts/hero-highlights.md` (the same four tile titles and lines were approved there as the hero's category cards, later removed with the old hero)

## Reference (attached by the user)

- **Left:** a tall panel with a glass DNA helix photo, heading "Committed to Better Health and Wellness" in black at the bottom-left.
- **Right:** a 2 × 2 grid of rounded tiles, each with a 3D illustration top-right and title + one line bottom-left:
  - Pharmaceuticals · "Quality medicines for better health" · light blue
  - Nutraceuticals · "Everyday nutrition for active living" · light green
  - Wellness Products · "Care for every stage of life" · light yellow
  - Commitment to Quality · "Carefully sourced, clearly labelled" · light orange
- Sampled tile colours: `#BBDDFC`, `#D8F8C3`, `#F1E699`, `#FFE8B6`. Titles black, lines grey. White page background.

Images (`Downloads/New folder`): four 1254 × 1254 transparent PNGs (medical packaging, herbal supplement jar, citrus skincare, shield + checklist) and the DNA photo (1170 × 1555).

## Decisions from the user

1. **DNA photo: placeholder until licensed.** The supplied photo carries a third-party watermark ("平面Chen.") exactly where the heading sits, so it is not used. The panel uses a blue gradient with the site's own `AboutMolecule` art and dot grid. The image slot is a single constant in `lib/site.ts`, so a licensed copy drops in without layout changes.
2. **Tile colours match the design.** Four new tokens, used only in this section, recorded in `DESIGN.md` §2 as an approved exception to blue-and-white:
   `--color-tile-blue #bbddfc`, `--color-tile-green #d8f8c3`, `--color-tile-yellow #f1e699`, `--color-tile-orange #ffe8b6`.

## Existing code inspected

- `app/page.tsx` (section order), `components/sections/*`, `components/layout/section.tsx`, `components/layout/container.tsx`
- `components/about/about-molecule.tsx` (`AboutMolecule`, blue SVG with a slow motion-safe float), `dot-grid` utility
- `components/reveal.tsx` (scroll fade-up used by the other sections)
- `lib/site.ts`, `lib/site-nav.ts`

## Visual interpretation and layout

| Width | Layout |
|---|---|
| ≥ 1024 px | Grid `lg:grid-cols-[1.15fr_1fr_1fr]`, two rows. Feature panel spans both rows on the left; tiles 2 × 2 on the right. Gap 16 px. Tile min-height ~ 190 px |
| 640–1023 px | Feature panel full width (min-height 260 px), tiles 2 × 2 below |
| < 640 px | Feature panel full width (min-height 220 px); tiles one per row, **horizontal**: text left, illustration right (~110 px), so four tiles stay short |

- **Feature panel:** `rounded-card` (22 px), `bg-linear-to-br from-blue-50 to-blue-200`, dot grid, `AboutMolecule` large and faded on the right half. Heading `h2` bottom-left, Plus Jakarta Sans 600, black, 26 px → 32 px at `lg`, max ~14 em so it breaks onto two lines as in the reference.
- **Tiles:** whole tile is a link. `rounded-card-sm` (18 px), tile colour background, illustration top-right (`object-contain`, ~ 55 % of tile width at `sm`+, never cropped), title `h3` (Plus Jakarta Sans 600, 17 px, black), line 14 px `text-ink-muted` (contrast ≥ 6.2:1 on all four colours; black titles ≥ 14.8:1).
- **Links:** Pharmaceuticals, Nutraceuticals, Wellness Products → `/medicines`; Commitment to Quality → `/#quality`.
- **States:** hover lifts 2 px with a soft shadow (motion-safe) and nudges the illustration up slightly; visible focus outline; pressed scale 0.98 (same feel as the buttons).
- **Motion:** the section fades up on scroll with `Reveal`; tiles stagger 0.1 s. Reduced motion: fade only.
- **Section spacing:** white section, `py-16 lg:py-20`, `aria-labelledby` the panel heading.

## Images

- Converted with `sharp` to `public/brand/range/*.webp`, 640 px wide (covers 2× at the largest tile illustration size), alpha kept, quality 85. Expected ~ 30–60 KB each (from 1.4–1.9 MB).
- Kebab-case names: `pharmaceuticals.webp`, `nutraceuticals.webp`, `wellness.webp`, `quality.webp`.
- `next/image`, lazy (below the fold), `sizes` matching the tile widths. Decorative (`alt=""`): the tile title already names the content.
- The DNA photo is **not** copied into the project.

## Files

| File | Change |
|---|---|
| `public/brand/range/*.webp` | 4 new images |
| `app/globals.css` | 4 tile colour tokens |
| `lib/site.ts` | `productRange` tiles (title, text, href, image, tone) and the panel heading |
| `components/sections/product-range.tsx` | New Server Component |
| `app/page.tsx` | Render `<ProductRange />` between `<Hero />` and `<Medicines />` |
| `DESIGN.md` | §2: note the four tile colours as an approved exception for this section only |

## Security requirements

None. Static content, no client code beyond the existing `Reveal`.

## Compliance check

- Copy is the reference's own wording, already approved for the earlier hero cards. "Quality medicines for better health", "Everyday nutrition for active living", "Care for every stage of life", "Carefully sourced, clearly labelled": no cure/treatment words, no numbers.
- Pharmaceuticals / Nutraceuticals / Wellness are product types (`productType` in Sanity), not therapy areas, so client rule 10.9 holds.
- No people in the images (rule 10.10 n/a).

## Acceptance criteria

1. Section appears between the hero and Our Medicines, matching the reference layout at 1440 px.
2. Tiles use the four sampled colours; everything else stays on the palette.
3. Illustrations are WebP, never cropped, lazy-loaded.
4. The DNA photo isn't used; the panel shows the blue placeholder with the heading at the bottom-left.
5. Each tile is a keyboard-focusable link with a visible focus outline and the stated destination.
6. Works at 390 / 768 / 1024 / 1440 px with no horizontal scroll.
7. `tsc`, lint and build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; screenshots and `scrollWidth` at 390 / 768 / 1024 / 1440 px.

## Manual test steps

1. `npm run dev`, open `/`, scroll past the hero: the section fades in, tiles in turn.
2. Compare with the reference at 1440 px.
3. Resize to 1024, 768, 390 px: panel above the tiles below 1024 px; horizontal tiles below 640 px.
4. Tab to each tile: focus outline; Enter opens `/medicines` (first three) or scrolls to Quality (fourth).
5. DevTools → Network: four `range/*.webp` requests via `/_next/image`, loaded only when scrolled near.

## Needs attention (after build)

- A licensed, watermark-free DNA image (or another image the client owns) for the feature panel.
- DESIGN.md exception for the four tile colours: confirm with the client.

## Update: DNA image added (user request)

The molecule placeholder is replaced by an original glass DNA helix generated in Canva for this project (no third-party watermark or licence). Saved as `public/brand/range/dna-helix.webp` (900 × 1204, 46 KB), shown with `object-cover` (`object-[75%_30%]` on the wide mobile/tablet panel so the helix stays in view) and a soft white gradient behind the heading for contrast. The watermarked supplied photo is still not used.
