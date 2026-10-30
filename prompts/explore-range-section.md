# "Explore Our Product Range" section

## Goal

Add the client's "Explore Our Product Range" section after the product range bento: a centred heading and intro over eight category cards (icon, title, one line, arrow), where cards with products link to the filtered `/medicines` list and cards without products show "Coming soon".

## Skills and docs read

- `AGENTS.md` §5 (reference image is the source of truth), §6 (sections are Server Components; content via `lib/sanity/`), §8 (data model: `dosageForm`, `productType`, `category`), §10 (compliance: rules 1–3, **9**)
- `DESIGN.md` §2 palette, §5 cards
- `node_modules/next/dist/docs/` image guide (`sizes`, lazy loading)
- Existing `/medicines` filter code (`components/sections/medicines-catalog.tsx`, `lib/products.ts`)

## Reference (attached by the user)

Centred H2 "Explore Our Product Range" (geometric sans, ~44 px, near-black `#101010`), two-line intro (`#303030`). Below, a 4 × 2 grid of rounded cards (`#EAEEF9`), each: colourful flat icon centred at the top, title (bold, black) bottom-left, one grey line under it, a white circular button with a black ↗ arrow bottom-right.

Tiles: Tablets · Capsules · Syrups · Nutraceuticals · Pediatric Care · Diabetes Care · Gastro Care · Personal Care.

Icons (`Downloads/explore-products-white-hills`): eight 512 × 512 transparent PNGs, mapped by content: tablets (`c07d0e…`), capsule (`fb57d5…`), syrup bottle (`5466b8…`), supplement jar (`9e534e…`), baby in hands (`f2fbf0…`), glucometer (`46f5e9…`), stomach (`c0e601…`), soap and bottles (`31f011…`).

## What the live data has (Sanity, checked)

5 visible products: 4 × `Tablets`, 1 × `Suspension`; product types `pharmaceutical` and `nutraceutical`; categories Bone & Calcium, Nerve Health, Women's Wellness, Iron & Haemoglobin. **No capsules, syrups, pediatric, diabetes, gastro or personal-care products.**

## Decision from the user

**All 8 tiles as designed; tiles with no products show "Coming soon"** and are not clickable. This overrides client rule 10.9 (no therapy areas such as Pediatric / Diabetes / Gastro in general copy) for this section only; recorded in `AGENTS.md` §10.9 and flagged for client confirmation.

## Decisions and assumptions

1. **Availability is data-driven, not hardcoded.** Each tile declares what it matches; the section reads the products (`getProducts()`, already cached and revalidated by tag) and a tile becomes a link as soon as one visible product matches. No code change is needed when the client adds products.

   | Tile | Matches | Today | Link |
   |---|---|---|---|
   | Tablets | `dosageForm` Tablets | 4 products | `/medicines?form=Tablets` |
   | Capsules | `dosageForm` Capsules | — | Coming soon |
   | Syrups | `dosageForm` Syrup / Syrups / Suspension (the tile's own line is "liquid formulations") | 1 (Haemoverse Suspension) | `/medicines?form=Suspension` (first matching form present) |
   | Nutraceuticals | `productType` nutraceutical | 2 products | `/medicines?type=nutraceutical` |
   | Pediatric Care | category slug `pediatric-care` / `paediatric-care` | — | Coming soon |
   | Diabetes Care | category slug `diabetes-care` | — | Coming soon |
   | Gastro Care | category slug `gastro-care` | — | Coming soon |
   | Personal Care | category slug `personal-care` | — | Coming soon |

   For the four therapy tiles to activate later, the client creates a category with that slug in the admin panel and assigns products to it.

2. **New `type` filter on `/medicines`** (needed for the Nutraceuticals link). `?type=` joins `?q=&category=&form=&page=`; a "Type" chip group (Pharmaceutical / Nutraceutical / Wellness, only types that have products) appears with the existing groups when more than one type exists. Unknown values fall back to All, as the other filters do.
3. **Copy rewritten to the compliance rules** (the reference copy is in the right column):

   | Place | Proposed | Reference | Why changed |
   |---|---|---|---|
   | H2 | Explore Our Product Range | same | — |
   | Intro | We are building a focused range of medicines and wellness products. Choose a category to see what is available. | We market a comprehensive catalog of therapeutic solutions. Click on a category below to explore dedicated formulations. | "Comprehensive catalog" overstates a young company (§1, §10.3); "therapeutic solutions" implies treatment |
   | Tablets | Solid oral dose | same | — |
   | Capsules | Oral capsules | Gelatin Shelled | Shell material unknown; don't invent product facts (§8) |
   | Syrups | Liquid formulations | same | — |
   | Nutraceuticals | Daily supplements | same | — |
   | Pediatric Care | Formulations for children | Child Safe Drops | "Safe" is a safety claim (§10.1) |
   | Diabetes Care | Blood sugar support | Glycemic Solutions | "Solutions" implies treatment; "support" is the allowed verb |
   | Gastro Care | Digestive support | Reflux Inhibitors | Drug-action / treatment wording |
   | Personal Care | Skin and hygiene care | Somatic Skin Gels | No such products yet; neutral wording |

4. **Colours:** card background `#EAEEF9` added as token `--color-mist` (a blue tint, on palette). Following the reference's near-black text: H2 and titles `text-black`, lines `text-ink-muted`, intro `text-slate-800` (existing tokens). Arrow button white with a `text-black` Lucide `ArrowUpRight` (1.8 stroke).
5. **Icons** converted to WebP (256 px, alpha), lazy-loaded, decorative `alt=""` (the title names the tile). Flat multicolour icons are images, so the palette rule doesn't apply to them (same as pack artwork).
6. **Placement:** between the product range bento and Our Medicines. White background.

## Layout and states

| Width | Grid |
|---|---|
| ≥ 1024 px | 4 columns, gap 16 px |
| < 1024 px | 2 columns, gap 12 px (16 px from `sm`) |

- Card: `rounded-card-sm` (18 px), `bg-mist`, padding 20 px (16 px on phones), icon box 88 × 88 centred at the top (64 × 64 on phones), then title (Plus Jakarta Sans 600, 20 px desktop / 16 px phone) and line (14 px / 13 px) bottom-left, 40 px white round arrow button bottom-right (36 px on phones).
- Heading: Plus Jakarta Sans 600, 44 px desktop / 30 px phone, centred; intro 17 px / 15 px, max 40 rem, centred.
- **Active card (link):** hover lifts 4 px with a soft shadow, icon scales 1.04, arrow button turns `blue-600` with a white arrow. Visible focus outline. Reduced motion: no lift/scale, colour change only.
- **Coming soon card (not a link):** same layout, icon at 55 % opacity, the arrow button is replaced by a small "Coming soon" pill (white, `text-ink-muted`, 12 px). No hover effect.
- Section fades up on scroll with the existing `Reveal`; cards stagger 0.05 s.

## Files

| File | Change |
|---|---|
| `public/brand/explore/*.webp` | 8 icons (tablets, capsules, syrups, nutraceuticals, pediatric, diabetes, gastro, personal-care) |
| `app/globals.css` | `--color-mist: #eaeef9` |
| `lib/site.ts` | `exploreRange` (heading, intro, 8 tiles with `match` rules and icon) |
| `lib/products.ts` | `productType` in filters; `productTypeOptions()`; `exploreTileHref()` (first matching form / category / type present, else `null`) |
| `components/sections/explore-range.tsx` | New async Server Component |
| `components/sections/medicines-catalog.tsx` | Read/write `?type=`, "Type" chip group |
| `app/page.tsx` | `<ExploreRange />` after `<ProductRange />` |
| `AGENTS.md` | §10.9: note the user-approved exception for this section; §9 route table: `type` param |

## Security requirements

None new. Read-only use of already-fetched public product data; no client code added beyond the existing catalog component.

## Compliance check

- No cure/treatment words; "support" used for Diabetes and Gastro. No safety claims, no numbers, no "comprehensive/leading".
- Therapy-area tile names (Pediatric, Diabetes, Gastro) are a **user-approved exception to rule 10.9**, pending client confirmation.
- "Coming soon" is a forward-looking statement: the client should confirm each of these ranges is actually planned.

## Acceptance criteria

1. Section sits between the bento and Our Medicines and matches the reference layout at 1440 px.
2. Tablets, Syrups and Nutraceuticals are links (today); the other five show "Coming soon" and aren't focusable.
3. Each link opens `/medicines` with the right filter applied and the matching products listed.
4. Adding a product with a new form or category activates the matching tile without a code change.
5. `/medicines?type=nutraceutical` lists only the 2 nutraceuticals; the Type chips work with the other filters and the URL.
6. Works at 360 / 768 / 1024 / 1440 px, no horizontal scroll; `tsc`, lint, build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; screenshots + `scrollWidth` at 390 / 768 / 1024 / 1440 px; click-through of the three active tiles.

## Manual test steps

1. `npm run dev`, open `/`, scroll past the bento: heading, intro and 8 cards fade in.
2. Hover Tablets: lift, icon grows, arrow turns blue. Click: `/medicines?form=Tablets` lists 4 tablets.
3. Syrups → `/medicines?form=Suspension` (Haemoverse Suspension). Nutraceuticals → `/medicines?type=nutraceutical` (2 products).
4. Tab through the section: only the three active cards receive focus.
5. On `/medicines`, use the new Type chips with search and the other filters; reload and Back keep the state.
6. Resize to 1024, 768, 390 px: 4 → 2 columns, text not clipped.

## Needs attention (after build)

- Client confirmation of the rule 10.9 exception and of the "Coming soon" ranges.
- Category slugs the client must use in the admin to activate the therapy tiles: `pediatric-care`, `diabetes-care`, `gastro-care`, `personal-care`.
- Icon licence: the icons look like Flaticon artwork; the free licence requires an attribution credit unless the client has a premium licence.

## Update: every card is clickable (user request)

The user asked that no card shows "Coming soon" itself: **all 8 cards are links**.

- Cards with products link to the filtered `/medicines` list (as above).
- Cards without products link to a **"Coming soon" page** at `/range/[slug]` (`tablets`, `capsules`, `syrups`, `nutraceuticals`, `pediatric-care`, `diabetes-care`, `gastro-care`, `personal-care`; prerendered from the tile list, unknown slugs 404).
- The page (solid header, breadcrumbs Home / Our Medicines / *Range*) shows the tile icon, a "Coming soon" eyebrow, the range name as H1, one modest line ("We are preparing our {range} range. In the meantime, see the medicines available today or send us an enquiry.") and two buttons: "View available medicines" (`/medicines`) and "Send an enquiry" (`/#contact`). If the range has products by the time someone opens the page (e.g. an old link), it shows a "View {range}" button to the filtered list instead.
- `robots: noindex` and not in the sitemap (thin placeholder pages).
- Card states: all cards get the same hover (lift, icon scale, arrow turns blue) and focus outline; no "Coming soon" tag on the cards.
- Sanity: no content changes are needed; the four therapy cards activate when the client adds a category with the matching slug and assigns products.

Additional files: `app/range/[slug]/page.tsx` (new). `AGENTS.md` §9 route table gains `/range/[slug]`.

## Update: new 3D card images (user request)

The flat icons are replaced by the user's eight 3D renders (1254 × 1254 transparent PNGs), trimmed to their content and fitted into 320 × 320 WebP so all eight read the same size (11–32 KB each). Saved as `public/brand/explore/<slug>-3d.webp`: new names on purpose, because `/_next/image` (locally and on Vercel's CDN) caches by URL and would keep serving the old icons under the old names. The Flaticon licence note no longer applies to these images.
