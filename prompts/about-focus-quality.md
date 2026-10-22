# About, Therapeutic Focus Areas and Quality sections

## Goal

Add the three remaining home-page sections (About, Therapeutic Focus Areas, Quality) in PRD order, so the page is complete and the header/footer "About" and "Quality" anchors work.

## Skills and docs read

- `AGENTS.md` §1, §5, §6, §8, §10 (rules 1, 3, 6, 9 matter most here), §16
- `PRD.md` §4 (section order), §5.2 About, §5.3 Focus Areas, §5.5 Quality, §11 open questions
- `DESIGN.md` §2 palette + section rhythm, §3 typography, §4 layout, §5 Eyebrow / Chip / Focus-area tile, §6 molecules, §7 rows 3, 4, 6
- Next.js docs: Server Components and `"use cache"` (data comes from the existing cached `getProducts()`)

## Existing code inspected

- `app/page.tsx`: Hero → Medicines → Contact; footer after `main`
- `components/sections/medicines.tsx` (eyebrow `03`), `contact.tsx` (eyebrow `05`), so About = `01`, Focus = `02`, Quality = `04`
- `components/layout/section.tsx`: tones `white` | `tint` | `navy`; `Eyebrow` and `SectionHeading` already support `onNavy`
- `components/ui/chip.tsx` (value tags), `components/typography/company-name.tsx`
- `lib/products.ts`: `categoryOptions(products)` (categories with ≥ 1 product, in category order) and `productHref`
- `lib/sanity/fetch.ts` `getProducts()`: every product carries `category { title, slug, order }`
- `components/sections/medicines-catalog.tsx`: `/medicines?category=<slug>` preselects a category chip
- `components/site-footer/site-footer.tsx`: `companyLinks` (About / Quality left out until now)
- `lib/site-nav.ts`: `sectionIds.about`, `focusAreas`, `quality` already defined
- Live Sanity: 4 categories (Bone & Calcium → WeCalix XT, Nerve Health → Nersovia-CD3, Women's Wellness → Cynovera, Iron & Haemoglobin → Haemoverse). Manufacturers: Dr. Edwin Medilabs (Nersovia-CD3, Haemoverse), Erwin Healthcare & Ayurveda (Cynovera), none set for WeCalix XT.

## Decisions and assumptions

1. **WHO-GMP is claimed (user decision, 22 Oct 2026),** using only the AGENTS §10.6 wording "WHO-GMP certified manufacturing partners". It's not extended to individual products and not shown as a badge or logo. The basis no longer appears in Sanity (PRD §5.5 cited Bio Altus Pharma; the confirmed packs name Dr. Edwin Medilabs and Erwin Healthcare), so the client should keep certificates on file.
2. **Focus Areas are built from Sanity, not hardcoded.** AGENTS §10.9 allows therapy areas only through product data. Tiles come from `categoryOptions(getProducts())`: one tile per category that has a visible product, in category `order`. A category added in the admin appears automatically, and an empty one is hidden.
3. **Tile content:** icon · category title (serif) · the brand names in that category as links to their pages (brand row in blue, as DESIGN §5 specifies) · a "View medicines" link to `/medicines?category=<slug>`. There's **no descriptive text per tile**: categories have no description field, and writing therapy text in code would break §10.9.
4. **Tile icons:** a small slug → Lucide icon map in `lib/site.ts` (`bone` → `Bone`, `nerve` → `Activity`, `women` → `Flower2`, `iron` → `Droplet`), with the `Pill` fallback for new categories. Icons aren't copy, so this doesn't add therapy text.
5. **Section backgrounds** follow DESIGN §7 rhythm: About white, Focus `blue-25`, Medicines white, Quality navy, Contact `blue-25`, footer navy. The light-blue Contact section keeps the two navy bands apart.
6. **No photos.** DESIGN §8 allows only an optional lab photo, and AGENTS §10.10 requires Indian people in any people imagery. Only a faint decorative molecule (inline SVG, `aria-hidden`) goes in the Quality band corner, `blue-200` / `blue-300` at low opacity, never behind text.
7. **The footer gains "About Us" and "Quality"** links now that the anchors exist.
8. All copy below is **placeholder for client approval** (AGENTS §10). It avoids therapy areas, statistics and "leading/trusted" wording.

## Copy (draft for approval)

### 01 · Who we are (About)
- H2: **About us**
- P1: "`<CompanyName legal />` is a newly established, India-based pharmaceutical marketing company. We bring a focused range of medicines for better support of health to distributors, stockists, pharmacies and healthcare professionals."
- P2: "Our medicines are made by WHO-GMP certified manufacturing partners. For every product we share the composition, pack and manufacturer details openly, so the people who stock and prescribe them have the facts they need. We are starting small and adding new medicines to the range step by step."
- Value tags (chips): Quality-led formulations · Transparent information · Responsible growth

### 02 · Focus areas
- H2: **Therapeutic focus areas**
- Intro: "Our current medicines are grouped into these areas. New medicines are being added to the range."
- Tiles from Sanity (decision 2)

### 04 · Quality (navy)
- H2: **Our commitment to quality**
- Intro: "Simple standards we hold every medicine to, so you know exactly what you are getting."
- Cards (icon · title · one line):
  1. `ShieldCheck` **Certified manufacturing**: "Our medicines are made by WHO-GMP certified manufacturing partners, named on each pack."
  2. `FlaskConical` **Considered formulations**: "Every formulation is chosen with a clear purpose and listed with its full composition."
  3. `Tags` **Clear labelling**: "Composition, pack size, storage and Rx status are printed on the pack and shown on our website."
  4. `Truck` **Reliable supply**: "We plan stock with our distributors and stockists so orders can be met on time."

## Files to create or modify

Create:
- `components/sections/about.tsx`: Server, static
- `components/sections/focus-areas.tsx`: Server, `getProducts()` → tiles
- `components/sections/quality.tsx`: Server, static
- `components/focus-area-tile.tsx`: presentational tile
- `components/molecules/corner-molecule.tsx`: small decorative SVG for the Quality band

Modify:
- `app/page.tsx`: Hero → About → Focus Areas → Medicines → Quality → Contact
- `lib/site.ts`: `aboutValues`, `qualityPoints` (icon + title + text), `focusAreaIcons` map + fallback
- `components/site-footer/site-footer.tsx`: add About Us and Quality to `companyLinks`
- `PRD.md` §5.5: record the user's decision to claim "WHO-GMP certified manufacturing partners" (22 Oct 2026) and that the original Bio Altus basis no longer appears on the packs

## Implementation requirements

### About (`#about`, `tone="white"`)
- ≥ 1024 px: two columns 5/7, with eyebrow + H2 left and the paragraphs + chips right. Below that, stacked.
- Paragraphs: body large 17 px / 1.65 (`text-ink-muted`), 16 px on mobile; 16 px gap between paragraphs.
- Chips: existing `Chip` (default variant), `flex flex-wrap gap-2`, 24 px above.

### Focus areas (`#focus-areas`, `tone="tint"`)
- Header block max-w-2xl, 32 px above the grid.
- Grid: 1 col < 640, 2 cols 640–1023, 4 cols ≥ 1024 (DESIGN §4). With 1–3 categories the tiles keep their width and align left; no stretching.
- Tile: `bg-white rounded-card-sm border border-blue-100 p-6`, `flex flex-col h-full`; 52 px `bg-blue-50 rounded-tile` icon box (icon 24 px `text-blue-600`, stroke 1.8); H3 serif 22 px `text-navy-900` 16 px below; brand links 15 px medium `text-blue-600`, mark as `<sup>`, min 44 px hit area on mobile; "View medicines" link with `ArrowRight` pinned to the bottom (`mt-auto`), separated by a top `border-line`.
- Hover on links: `text-blue-700` + underline. No hover lift (no motion beyond colour).
- No visible products: the section is not rendered (and its header link scrolls nowhere, which is acceptable; it can't happen while products exist).

### Quality (`#quality`, `tone="navy"`)
- ≥ 1024 px: two columns 5/7, with eyebrow (`onNavy`) + H2 (`onNavy`) + intro (`text-ink-on-navy`) left, and a 2 × 2 card grid right. Below 640 px the cards are 1 col; 640–1023 px they're 2 cols under the heading.
- Card: transparent, `border border-blue-700 rounded-card-sm p-6`; icon 24 px `text-blue-300`; title IBM Plex 17 px semibold white; text 15 px `text-ink-on-navy`.
- Corner molecule: `absolute` bottom-right, `pointer-events-none`, hidden < 1024 px, section `relative overflow-hidden`; never overlaps the text column.

## Security requirements

- No new data access beyond the existing cached `getProducts()`; no client components; no env vars.
- Sanity strings render as escaped React text.

## Compliance check (AGENTS §10)

- No cure/treatment words. ✔ ("better support of health")
- No statistics, testimonials, awards, "leading"/"trusted". ✔ (no counts on tiles)
- WHO-GMP: only as "WHO-GMP certified manufacturing partners" (About P2, Quality card 1); no product-level claim, no badge. ✔
- No therapy areas in About/Quality copy; therapy areas only via Sanity category titles. ✔
- Company name via `<CompanyName legal />`. ✔
- No people imagery. ✔ No prices. ✔

## UI details

- **Reference:** none, so this follows `DESIGN.md` §5 and §7.
- **Typography:** H2 via `SectionHeading` (Source Serif 4, 30/40 px); H3 tiles Source Serif 22 px; body IBM Plex.
- **Colours (tokens):** `bg-white`, `bg-blue-25`, `bg-navy-900`, `bg-blue-50`, `border-blue-100`, `border-blue-700`, `border-line`, `text-navy-900`, `text-ink-muted`, `text-blue-600/700`, `text-blue-300`, `text-ink-on-navy`, `text-white`.
- **Spacing:** section padding from `Section`; grid gaps 16 px mobile, 24 px desktop.
- **Responsive:** 360 (all single column) · 768 (focus 2 cols, quality 2 cols under heading) · 1024 (about 5/7, focus 4 cols, quality 5/7 with 2 × 2) · 1440 (capped at 1240).
- **States:** link hover/focus-visible (outline `blue-600`; `blue-300` on navy).

## Acceptance criteria

1. The home page order is Hero → About → Focus Areas → Medicines → Quality → Contact → Footer.
2. Header "About Us" and the footer About/Quality links scroll to the right sections.
3. Focus tiles match the Sanity categories that have visible products, in category order; each brand link opens its medicine page; "View medicines" opens `/medicines` with that category selected.
4. Adding a category + product in the admin adds a tile with no code change; hiding the last product of a category removes its tile.
5. WHO-GMP appears only as "WHO-GMP certified manufacturing partners"; no therapy-area or numeric claims in About/Quality copy.
6. Tokens only; visible focus on every link; no horizontal scroll at 360 px.

## Checks to run

- `npx tsc --noEmit`, `npm run lint`, `npm run build`
- Browser at 360 / 768 / 1024 / 1440

## Manual test steps

1. `npm run dev`, open `/`. Scroll through: About, Focus Areas, Our Medicines, Quality, Contact, footer.
2. Click header **About Us**: it scrolls to About. Footer **Quality**: it scrolls to Quality.
3. Click **WeCalix XT** on the Bone & Calcium tile: the medicine page opens. Back, then **View medicines** on Nerve Health: `/medicines` with the Nerve Health chip selected.
4. Tab through the Focus tiles and Quality band: a focus ring is visible on navy too.
5. In the admin, hide Haemoverse and save: the Iron & Haemoglobin tile disappears after reload; show it again.
6. Resize to 360 / 768 / 1024 / 1440: layouts as above, the molecule never covers text.
