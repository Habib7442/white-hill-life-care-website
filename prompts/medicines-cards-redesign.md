# Our Medicines: section and product card redesign

## Goal

Restyle the home "Our Medicines" section and the shared product card to match the client's reference: plain heading and disclaimer, soft cards with the transparent pack image on top, name, short line, dosage-form and pack row with icons, an outline "View Details" button, and a navy "View all medicines" pill.

## Skills and docs read

- `AGENTS.md` §5 (reference is the source of truth; palette; pack images never cropped), §8 (product fields, Rx), §10 (rules 2 and 5)
- `DESIGN.md` §2 palette, §5 cards
- `node_modules/next/dist/docs/` image guide (`sizes`, blur placeholder)

## Reference (attached by the user)

- H2 "Our Medicines" (geometric sans, ~44 px, black), left-aligned, no eyebrow; the disclaimer under it in grey.
- 3 cards per row. Card: light grey `#F4F4F4`, ~16 px radius, no border. Pack image straight on the card (no panel), then name (bold, black, ~20 px), a two-line description in grey, a row with a dosage-form icon + "Tablet" on the left and a box icon + "10 × 15 Tablet" on the right, and a full-width outline button "View Details" (blue text and border, white fill, ~8 px radius).
- Centred navy pill "View all medicines →" (`#172C6B`).

## Existing code inspected

- `components/sections/medicines.tsx` (eyebrow "01 · Our Medicines", serif `SectionHeading`, disclaimer, `ProductGrid` of the first 10, primary "View all medicines (n)" pill)
- `components/product-card.tsx` (white card with border, square `blue-25` image panel, serif name, blue composition line, description for non-Rx, `Dosage form:` / `Pack:` list, Rx chip and prescription caution, primary "View details" button; one card-wide link)
- `components/product-grid.tsx`; card also used by `/medicines` and "Related medicines" on detail pages
- Live data: all 5 pack images are **transparent PNGs** (1254 × 1254), so they sit on the card background like the reference. 3 of 5 products are Schedule H.

## Decisions and assumptions

1. **One shared card.** The new card replaces the old one everywhere (home, `/medicines`, related medicines) so the catalogue looks the same on every page.
2. **Card colour: `blue-25` (`#F3F7FE`)** instead of the reference's neutral `#F4F4F4`. Visually almost identical, and it keeps the site on its palette (no neutral greys, AGENTS §5). Say if you want the exact grey and I'll add it as a token.
3. **Rx products (Schedule H/H1) stay compliant (AGENTS §10.2):** the description is never shown for them; the card shows the **composition** in that slot instead (factual), plus a small **"Rx" tag** at the top-left of the image. The prescription caution stays on the detail page (it was also on the card; dropped from the card to match the reference). OTC cards show the description (composition if there's none).
4. **Composition line removed from OTC cards** (the reference shows only one text line); it remains on the detail page.
5. **Meta row icons (Lucide, 1.8 stroke, `text-ink-muted`):** dosage form picks an icon by form: Tablets → `Tablets`, Capsules → `Pill`, Suspension / Syrup / Drops → `PillBottle`, anything else → `Pill`. Pack → `Package`. Text comes from Sanity as is ("Tablets", "10 × 15 Tablets"; the reference's singular "Tablet" is placeholder text).
6. **Heading:** Plus Jakarta Sans 600 black (same as the other new sections), eyebrow removed per the reference. The disclaimer stays (AGENTS §10.5).
7. **Buttons:** card button `outline` + `shape: "rounded"` (as in the hero); "View all medicines" becomes a navy pill (`bg-navy-900`, white text, arrow). The reference has no count, so the current "(5)" count is **dropped** to match.
8. **Hover:** same as the other homepage cards: lift 4 px, soft shadow, pack image scales 1.03 (reduced motion: shadow only). Card-wide link and single tab stop kept; visible focus ring.

## Layout

| Width | Grid |
|---|---|
| ≥ 1024 px | 3 columns, gap 24 px |
| 640–1023 px | 2 columns, gap 16 px |
| < 640 px | 1 column |

Card: `rounded-card-sm` (18 px), padding 20 px; image area `aspect-[4/3]`, image `object-contain` with 8 px inset (never cropped); name 20 px; line 14 px `line-clamp-2`; meta row 13 px, `justify-between`; button full width at the bottom (cards in a row align their buttons).

## Files

| File | Change |
|---|---|
| `components/product-card.tsx` | New layout as above |
| `components/sections/medicines.tsx` | Heading/eyebrow, navy "View all medicines" pill |
| `lib/products.ts` | `dosageFormIcon(form)` helper |
| `components/product-grid.tsx` | Gaps (24 / 16 px) |

## Security requirements

None. Display-only changes.

## Compliance check

- Rx cards: composition + Rx tag only, no description (rule 2). OTC cards: description from Sanity (already claim-checked in Studio).
- Disclaimer kept (rule 5). No prices.

## Acceptance criteria

1. Home section matches the reference at 1440 px: plain heading, disclaimer, 3-column cards, navy pill.
2. Pack images are never cropped; transparent packs sit on the card colour.
3. Haemoverse, Haemoverse Suspension and Nersovia-CD3 show their composition and an Rx tag, never a description.
4. Meta row shows the right icon per dosage form and the pack size with `×`.
5. Each card is one tab stop opening its detail page; `/medicines` and related cards use the same design.
6. 360 / 768 / 1024 / 1440 px with no horizontal scroll; `tsc`, lint, build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; screenshots at 390 / 768 / 1024 / 1440 of the home section, `/medicines` and one detail page's related cards.

## Manual test steps

1. `npm run dev`, scroll to Our Medicines; compare with the reference.
2. Check an Rx card (Haemoverse): composition + Rx tag, no description.
3. Tab through the cards: one focus stop each; Enter opens the detail page.
4. Open `/medicines` and a product's detail page: the cards look the same.
5. Resize to 1024, 768, 390 px.

## Update: card polish (user request)

- Identical image box: 180 px tall below 768 px, 240 px from 768 px; `object-contain`, centred, 16 px top and bottom padding.
- Badge from existing data (no new field): Schedule H/H1 → navy "Rx"; otherwise `productType` nutraceutical → green "Nutraceutical" (`--color-nutra #15803D`, DESIGN.md exception); otherwise none (`productBadge()` in `lib/products.ts`). Today: Rx = Nersovia-CD3, Haemoverse, Haemoverse Suspension; Nutraceutical = WeCalix XT, Cynovera.
- Text line unchanged: composition for Rx, description for others. The three Rx descriptions in Sanity are factual (no health-benefit claims) and are never displayed, so no review TODO was needed.
- Meta row: dosage form `text-ink-faint`, pack size semibold.
- Mobile: one column (two columns at 390 px leave ~125 px of text width per card, too narrow for names like "Haemoverse Suspension" and the pack row).
