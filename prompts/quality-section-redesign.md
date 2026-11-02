# Quality section redesign

## Goal

Restyle the home "Our Commitment to Quality" section to match the client's reference: centred heading on a deep navy molecule background, four numbered cards, the third one highlighted in blue with a photo.

## Skills and docs read

- `AGENTS.md` §5 (reference is the source of truth; palette; molecules are inline SVG, `aria-hidden`, never behind text), §10 (rules 1, 3, 6, 10), §13 (images)
- `DESIGN.md` §2 palette, §3 type (black/white Plus Jakarta 600 headings on redesigned sections), §6 molecules, §8 motion
- `node_modules/next/dist/docs/` image guide (`fill`, `sizes`)

## Reference (attached by the user)

- Navy background (~`#172C6B` deepening to darker navy) with blurred, glowing blue molecule clusters at the corners.
- Centred: small pill eyebrow "QUALITY" (translucent white fill, white uppercase text), H2 "Our Commitment to Quality" (white, ~44 px geometric sans), one line of intro in light white.
- Four cards in a row (~200 px wide, ~16 px radius):
  - **01, 02, 04 (white):** blue pill label top-left ("Certified Manufacturing", "Considered Formulations", "Reliable Supply"), two short lines of grey text, a large blue number "01." at the bottom (~64 px).
  - **03 (highlighted):** blue `#2563EB` card, taller than the others (overhangs top and bottom), white pill "Clear Labelling" with blue text, "03." top-right in light white, a rounded photo, title "Clear & Transparent Product Information" (white, bold, ~18 px), and the text in light white.

## Existing code inspected

- `components/sections/quality.tsx`: `Section tone="navy"`, eyebrow "02", serif heading left, 2 × 2 grid of outline cards with Lucide icons, `CornerMolecule`.
- `lib/site.ts` `qualityPoints` (title, text, icon), also rendered on `/about` (unchanged there).
- `components/molecules/corner-molecule.tsx`, `components/reveal.tsx`, `Container`.

## Decisions (user-approved)

1. **Background:** no photo. `bg-navy-900` with soft radial `blue-600` glows plus a new inline SVG `MoleculeField` (hexagon rings and bonds in `blue-300`/`blue-200`), some clusters blurred for the bokeh look. `aria-hidden`, placed in the corners and kept out from behind the heading and cards.
2. **Card photo:** an original image generated in Canva: an Indian person's hand ticking a calendar next to a tablet strip, bright and clean, no text or logos. Saved as `public/brand/quality/clear-labelling.webp` (~800 × 500), alt `""` (decorative; the card title carries the meaning).
3. **Copy** from the reference (same claims as today, shorter). New `short` field on `qualityPoints` for the home cards; `/about` keeps the longer text:
   - Certified Manufacturing: "Our medicines are made by WHO-GMP certified manufacturing partners"
   - Considered Formulations: "Every formulation is chosen with a clear purpose"
   - Clear Labelling (featured): title "Clear & Transparent Product Information", text "Composition, pack size, storage and Rx status are printed on the pack and shown on our website."
   - Reliable Supply: "We plan stock with our distributors and stockists"
4. **Featured card is static** (card 03, marked `featured` in data), as in the reference; no hover-swap.
5. Eyebrow pill replaces the "02" index eyebrow; heading white Plus Jakarta 600 (as the other redesigned sections, white because it's on navy).

## Layout

| Width | Cards |
|---|---|
| ≥ 1024 px | 4 columns, gap 24 px, items centred vertically; featured card overhangs ~24 px top and bottom |
| 640–1023 px | 2 columns, gap 16 px; no overhang |
| < 640 px | 1 column; no overhang |

- Section padding: 80 px top / 96 px bottom on desktop, 64 px on mobile.
- Heading block centred, max ~40rem; cards start 56 px below.
- White card: `bg-white rounded-card-sm p-5`, min height ~260 px on desktop, `flex-col` with the number pushed to the bottom (`mt-auto`). Pill `bg-blue-600 text-white text-xs font-semibold rounded-full px-3 py-1.5`. Text 14 px `text-slate-800`. Number `font-display` 600, 56 px (64 px at xl), `text-blue-600`, `leading-none`.
- Featured card: `bg-blue-600 p-5 shadow-xl shadow-navy-900/40`; header row pill (`bg-white text-blue-600`) + "03." (`font-display` 28 px `text-white/70`); photo `aspect-[16/10] rounded-xl` cover; title `text-lg font-semibold text-white`; text 13–14 px `text-white/85`.
- Colours: only `navy-900`, `blue-600`, `blue-300`, `blue-200`, `white`, `slate-800` tokens.

## Files

| File | Change |
|---|---|
| `components/sections/quality.tsx` | New layout |
| `components/molecules/molecule-field.tsx` | New decorative SVG background |
| `lib/site.ts` | `qualityPoints`: add `label`, `short`, optional `featured { title, image }`; export `qualitySection` (eyebrow, heading, intro) |
| `public/brand/quality/clear-labelling.webp` | New Canva photo |
| `DESIGN.md` | Note the redesigned Quality section |

## Motion

Heading `Reveal`; cards `Reveal stagger` (existing system). Hover on white cards: lift 4 px + soft shadow (reduced motion: shadow only). No new animation code.

## Security requirements

None. Display-only.

## Compliance check

- No cure claims, no numbers other than the card index (01–04, not statistics).
- WHO-GMP only as "WHO-GMP certified manufacturing partners" (rule 6).
- Photo shows an Indian person (rule 10); no foreign stock.
- "Rx status" factual (rule 2).

## Acceptance criteria

1. At 1440 px the section matches the reference: navy molecule background, centred pill + heading + intro, four cards with the blue featured third card overhanging.
2. Molecules never sit behind the heading or card text; they are `aria-hidden`.
3. 1024 / 768 / 390 px: 4 / 2 / 1 columns, no horizontal scroll, featured card readable.
4. Heading text contrast ≥ 4.5:1 on navy; card text ≥ 4.5:1 on white and on `blue-600`.
5. `#quality` nav link still scrolls here; `/about` quality list unchanged.
6. `tsc`, lint and build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; screenshots at 1440, 1024, 768, 390.

## Manual test steps

1. `npm run dev`, click "Quality" in the header; compare with the reference.
2. Resize to 1024, 768 and 390 px.
3. Open `/about`: the quality list still shows the longer text.
4. Turn on reduced motion: cards appear without movement.
