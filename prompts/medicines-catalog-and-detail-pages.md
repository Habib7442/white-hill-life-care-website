# Medicines catalogue: filters, debounced search, and product detail pages

## Goal

Let visitors filter the Our Medicines section by category and dosage form and search it with a reusable debounced search input, and give each medicine its own page at `/medicines/[slug]` (modelled on <https://www.mslbiotech.in/products/amerab-dsr-capsules>).

## Skills and docs read

- `AGENTS.md` §1 (detail pages were Phase 2 / out of scope; **the user has now asked for them**), §5, §6, §8, §10, §13, §14
- `PRD.md` §3 (general public must not be promoted Rx medicines), §4 Phase 2 pages, §5.4, §6 F10
- `DESIGN.md` §2–5, §7, §9, §10
- `prompts/sanity-and-medicines.md` (schema, card, fetch layer)
- Next.js docs: `generate-static-params.md` (with Cache Components, `generateStaticParams` must return **at least one** param), `generate-metadata.md` (metadata with Cache Components), `08-caching.md`, `09-revalidating.md`

## Existing code inspected

- `components/sections/medicines.tsx`, `components/product-card.tsx`, `lib/products.ts`, `lib/sanity/{queries,fetch,image}.ts`
- `components/site-header/{site-header,header-shell,mobile-menu}.tsx`: links are bare `#about`-style anchors (broken off the home page); `HeaderShell` is transparent until scroll on every page. **AGENTS §14 says the header is solid automatically on pages without a hero, but no code does this.**
- `lib/site-nav.ts`, `app/sitemap.ts`, `components/ui/{button,chip}.tsx`
- Sanity data now: WeCalix XT (with image), Cynovera, Nersovia-CD3, Haemoverse (no images yet, so not shown). **All 4 are Tablets**; no gallery, related products, or leaflets yet.

## Decisions and assumptions

1. **Filters and search live in the home page's Our Medicines section** (it's a single-page site). No separate `/medicines` listing page.
2. **Filtering is client-side** over the already-fetched list (a handful of products). The section stays a Server Component that fetches, and passes the list to one small client island, `MedicinesCatalog`. The page stays static.
3. **Filters:**
   - **Category:** "All" + every category that has at least one visible product (from Sanity, in category `order`). Single-select.
   - **Dosage form:** "All forms" + every form present in the products. Single-select. Each filter row (category, dosage form) is shown only when it has 2+ real options (review feedback, replaces "always show"); options come from the products, so rows appear as products are published. Both groups have small visible labels ("Category", "Dosage form"). Search is full width; "View details" is a primary button (user request).
   - Both are pill toggle buttons (`aria-pressed`), wrapped in a labelled `role="group"`.
4. **Search** matches name, composition, category, and ingredient names, case- and accent-insensitive, 250 ms debounce.
5. **Filter state is not put in the URL.** It resets on reload. Reading `searchParams` would make `/` dynamic under `cacheComponents`; not worth it for 4–10 products.
6. **Reusable pieces:**
   - `lib/hooks/use-debounced-value.ts`: generic `useDebouncedValue<T>(value, delay = 250)`.
   - `components/search-input.tsx`: controlled `SearchInput` with props `value`, `onValueChange`, `onDebouncedChange`, `delay`, `label`, `placeholder`, plus a clear button. No knowledge of medicines.
   - `components/filter-chips.tsx`: generic single-select `FilterChips<T extends string>` (`label`, `options`, `value`, `onChange`).
7. **Detail page route** `app/medicines/[slug]/page.tsx`:
   - `generateStaticParams` from Sanity slugs. If Sanity returns none, it returns one placeholder slug that 404s, because Cache Components rejects an empty array.
   - New products published later render on first request and are then cached (default `dynamicParams`).
   - Data via `getProductBySlug(slug)` with `"use cache"`, `cacheLife("max")`, `cacheTag("product", "category")`; the existing webhook revalidates it.
   - `notFound()` for unknown, hidden, or incomplete products (same completeness rule as cards).
8. **Header:** nav links become `/#about`, `/#medicines`, etc. so they work from detail pages (on `/` the browser still just scrolls). `SiteHeader` gets a `solid` prop that detail pages pass; the home page keeps the transparent-over-hero behaviour. I'll fix the incorrect AGENTS §14 line.
9. **Cards become links:** the brand name links to the detail page and covers the whole card (stretched link), plus a "View details" text link with an arrow. One tab stop per card.
10. **Rx detail pages** (Schedule H/H1; PRD §3, AGENTS §10.2) show factual data only: composition table, pack, schedule, the pack caution, and a line "Information for registered medical practitioners." `description` and `supports[]` are **not shown for Rx products**, even if filled in.
11. **Related products:** `relatedProducts` from Sanity (complete + visible only). If none are set, up to 3 other products from the same category. If there are none, the section is hidden.
12. **Not built:** lightbox, WhatsApp button, newsletter, price/MRP, `Product`/`Drug` JSON-LD (structured data for medicines needs care with claims; separate task if wanted).
13. **Enquiry CTA** on detail pages links to `/#contact`. The Contact section isn't built yet, so for now the link lands at the bottom of the home page. Listed under attention.

## Files to create or modify

| File | Change |
|---|---|
| `lib/hooks/use-debounced-value.ts` | new, generic debounce hook |
| `components/search-input.tsx` | new, reusable debounced search field (client) |
| `components/filter-chips.tsx` | new, reusable single-select pill group (client) |
| `components/sections/medicines-catalog.tsx` | new client island: state, filtering, result count, empty state, renders cards |
| `components/sections/medicines.tsx` | fetch products, pass to `MedicinesCatalog` |
| `components/product-card.tsx` | link to detail page, "View details", category now an object |
| `lib/sanity/queries.ts` | products query adds `"category": category->{title, "slug": slug.current, order}` and `"ingredientNames": ingredients[].ingredient`; new `productSlugsQuery`, `productBySlugQuery`, `relatedProductsQuery` |
| `lib/sanity/fetch.ts` | `getProductSlugs()`, `getProductBySlug()`, `getRelatedProducts()` |
| `lib/products.ts` | `filterProducts()` (pure, testable), `productHref()`, `scheduleLabels` |
| `app/medicines/[slug]/page.tsx` | detail page, `generateStaticParams`, `generateMetadata` |
| `components/product-detail/*.tsx` | `ProductGallery`, `CompositionTable`, `ProductFacts`, `RelatedProducts`, `Breadcrumbs` (server components) |
| `components/site-header/site-header.tsx`, `header-shell.tsx` | `solid` prop; logo links to `/` |
| `lib/site-nav.ts` | `href`s become `/#…` |
| `app/sitemap.ts` | add `/medicines/<slug>` for each product |
| `sanity.types.ts` | regenerated (`npm run typegen`) |
| `AGENTS.md` | §1 move detail pages into scope; §14 fix the header line |

## Implementation requirements

### Catalogue (home `#medicines`)

Layout under the existing heading + disclaimer, before the grid:

- **Toolbar** (`flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between`, 32 px below the disclaimer):
  - Left: `SearchInput`, full width on mobile, `lg:w-[360px]`.
  - Below the search on all sizes: category chips, then (when shown) dosage-form chips. They wrap onto multiple lines with `flex flex-wrap gap-2`. No horizontal scroll at 360 px.
- **Result line** (`aria-live="polite"`, 14 px `text-ink-muted`, 24 px above the grid): "Showing 3 of 4 medicines". Only shown while a filter or search is active.
- **Empty result:** muted line "No medicines match your search." + `Button variant="outline" size="sm"` "Clear filters", which resets everything and focuses the search input.
- Grid: 1 column, 2 at `sm`, 3 at `lg` (cards ≈ 380 px wide, square edge-to-edge pack image; user request, overrides DESIGN.md 2 × 2).

`SearchInput`:
- Visible label is visually hidden (`sr-only`) "Search medicines"; `type="search"`, placeholder "Search by name or ingredient".
- 48 px min height, `rounded-tag` (10 px), 1 px `border-field`, white, 15 px text, left `Search` icon (Lucide, `text-blue-600`, 1.8 stroke), 44 px left padding.
- Focus: `outline-2 outline-blue-600 outline-offset-0`.
- Clear button (`X` icon, `aria-label="Clear search"`) only when there is text: 44 × 44 px hit area, inside the right edge. Escape also clears.
- Typing updates the input immediately; `onDebouncedChange` fires after `delay`. The clear action fires immediately (no debounce).

`FilterChips`:
- `role="group"` + `aria-label` (e.g. "Filter by category"). Each option is a `<button type="button" aria-pressed>`.
- Pill, min height 44 px (touch target), `px-4`, 14 px `font-medium`.
  - Off: `bg-white border border-blue-100 text-ink-muted`, hover `bg-blue-25 text-blue-700`.
  - On: `bg-blue-600 border-blue-600 text-white`.
- 150 ms colour transition; visible focus outline `outline-blue-600`.

`filterProducts(products, { query, category, dosageForm })`:
- Normalises text with `toLocaleLowerCase("en-IN")` + `normalize("NFD")`, stripping diacritics.
- Matches only when every whitespace-separated term is found in the combined haystack.

### Product card changes

- `h3` contains `<a href="/medicines/<slug>">`, with a `::after` overlay covering the card (`after:absolute after:inset-0`); the card is `relative`.
- Focus outline goes on the card via `has-[a:focus-visible]:outline-2 outline-blue-600 outline-offset-2`.
- Below the facts row: "View details" (`text-blue-600 font-semibold text-sm`, `ArrowRight` icon), `aria-hidden` since the title link already carries the name.
- Hover: border `blue-100` → `blue-300`, 150 ms.

### Detail page `/medicines/[slug]`

Page structure (white background, `pt-(--header-height)`; header `solid`):

1. **Breadcrumbs** (`nav aria-label="Breadcrumb"`, `ol`, 14 px muted, current page `aria-current="page"`): Home › Our Medicines (`/#medicines`) › {name}. 32 px top padding.
2. **Top split** (`grid lg:grid-cols-2 gap-10 lg:gap-16`, 24 px below breadcrumbs):
   - **Left: gallery.**
     - Main image: `bg-blue-25 rounded-card`, 4:3, `object-contain`, `priority` (above the fold), from `packImage`.
     - Under it, if `gallery` has items: a grid of small `bg-blue-25 rounded-card-sm` tiles with each image + caption. They're static, not a carousel or lightbox, each `object-contain`, lazy.
   - **Right: summary.**
     - Chips: category, `Rx` (H/H1).
     - `h1` = name + `<sup>` mark: Source Serif 4, 40 px desktop / 30 px mobile, navy. Not Plus Jakarta (that's reserved for the hero H1).
     - Composition (17 px, blue-600, medium).
     - Description (OTC only).
     - Supports list (OTC only; `CircleCheck` icons in `text-blue-600`).
     - Facts `dl` (2-column grid on ≥ 640 px): Dosage form, Pack, Pack type, Product type, Schedule (OTC / Schedule H / Schedule H1), Shelf life. Each item is shown only if filled.
     - CTA row: primary "Send an Enquiry" → `/#contact`; secondary (outline) "Download leaflet (PDF)" when `leaflet` exists (`asset->url`, `download`).
     - Rx only: caution box (`border-l-4 border-navy-900 bg-blue-25 p-4`, 14 px) with the pack caution + "Information for registered medical practitioners."
3. **Composition & details** (`bg-blue-25` section, 64/96 px padding), two columns at `lg`:
   - **Composition table:** caption = `unitStatement` or "Composition"; `<table>` with columns Ingredient · Standard · Strength; then rows for Excipients and Colour when set. White card, `rounded-card`, `border-blue-100`; rows divided by `border-line`. On mobile the table keeps 3 columns with wrapping text, no horizontal scroll.
   - **Storage & handling** card: Directions, Storage, and Manufactured by (name, address, Mfg. Lic. No.). Each shown only if filled. The whole card is hidden if all are empty.
4. **Disclaimer** (AGENTS §10.5), 14 px muted, above related products.
5. **Related products:** `h2` "Related Medicines", same `ProductCard`s, grid `md:grid-cols-2 lg:grid-cols-3`.

Metadata:
- `title`: `seo.title`, else `${name} ${dosageForm}`; the root template adds the brand.
- `description`: `seo.description`, else composition + pack.
- Canonical `/medicines/<slug>`.
- OG image: the pack image via `urlFor(...).width(1200).height(630).fit("fill").bg("ffffff")`. Pack on white, never cropped.
- Rx pages: same metadata, no promotional wording (the values come from Sanity fields, which are checked).

### Queries

- Shared projection (`productCardFields`) reused by the list and related queries, so cards always get the same shape. Uses GROQ string composition with `defineQuery`; I'll check TypeGen supports the template interpolation. If it doesn't, I'll inline it.
- `productBySlugQuery`: same completeness filter + `slug.current == $slug`, plus every detail field, `gallery[]{alt, caption, asset->{...}}`, `"leafletUrl": leaflet.asset->url`, `manufacturer`, and `relatedProducts[]->{...card fields}` filtered to complete + visible.

## Security requirements

- No new env vars, tokens, or server-to-client secrets. Reads stay on the public CDN client.
- The slug param is passed to GROQ as a **parameter** (`$slug`), never interpolated.
- Leaflet links point only at `cdn.sanity.io` asset URLs from Sanity.

## Compliance check

| Copy | Status |
|---|---|
| "Search medicines" / "Search by name or ingredient" / "All" / "All forms" / "Filter by category" | UI labels ✔ |
| "Showing X of Y medicines", "No medicines match your search.", "Clear filters" | UI labels ✔ |
| "View details", "Send an Enquiry", "Download leaflet (PDF)", "Related Medicines", "Our Medicines" | UI labels ✔ |
| "Information for registered medical practitioners." (Rx pages) | ⚠️ new placeholder, needs approval |
| Product text | from Sanity only; Rx pages hide description/supports ✔ |
| Disclaimer on every detail page | ✔ AGENTS §10.5 |
| No prices, MRP, stats, or claims | ✔ |

## Acceptance criteria

1. WeCalix XT appears on `/` (it now has an image); products without images stay hidden.
2. Typing in search filters cards after ~250 ms; clear button and Escape reset it; the result count is announced.
3. Category chips filter; the dosage-form group appears only when 2+ forms exist; filters + search combine (AND).
4. "No medicines match" state with a working "Clear filters".
5. Each card opens `/medicines/<slug>`; the detail page shows every filled field and hides empty ones; unknown slug → 404.
6. Nersovia-CD3 (Rx) detail page shows no description or supports list, and shows the caution + HCP line.
7. Header links work from a detail page (go to `/#section`); the header is solid on detail pages.
8. `SearchInput`, `FilterChips`, and `useDebouncedValue` have no medicine-specific code.
9. `/` stays static; detail pages are prerendered for existing slugs; the sitemap lists them.
10. tsc, lint, and build pass; no palette violations; no horizontal scroll at 360 px.

## Checks to run

- `npm run typegen`, `npx tsc --noEmit`, `npm run lint`, `npm run build` (look for `●`/`○` on `/medicines/[slug]`)
- `npm run dev` at 360 / 768 / 1024 / 1440 px

## Manual test steps

1. `npm run dev` → `/#medicines` → WeCalix XT card visible.
2. Type "calc" → only WeCalix XT; type "xyz" → empty state → "Clear filters" → all back, focus in search.
3. Click a category chip → only that category; click "All" → all.
4. Tab through: search → clear → chips (each announces pressed state) → each card link → focus ring visible.
5. Click WeCalix XT → detail page: breadcrumbs, image, chips, composition table with 5 rows + Excipients, supports list, facts, enquiry button.
6. Header "About Us" from the detail page → goes to home and scrolls. The header is solid at the top of the detail page.
7. In Studio, upload Nersovia-CD3's image, publish, restart dev → `/medicines/nersovia-cd3` shows the Rx caution and no supports list.
8. `/medicines/does-not-exist` → 404.
9. Resize 360 → 1440: chips wrap, the table fits, no horizontal scroll.
