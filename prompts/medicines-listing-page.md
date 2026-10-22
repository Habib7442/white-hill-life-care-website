# Medicines listing page and home page preview

## Goal

Show the first 10 medicines on the home page with a "View all medicines" button, and add a `/medicines` page with search, category and dosage-form filters, and pagination.

## Skills and docs read

- `AGENTS.md`: §1 (a separate `/medicines` listing page was Phase 2 and is now requested by the user), §5 UI rules, §6 architecture, §10 compliance, §13 SEO, §14 traps (solid header on pages without the hero)
- `PRD.md` §4 (Phase 2 lists `/medicines`), `DESIGN.md` product card, breakpoints, radii
- `node_modules/next/dist/docs/`: `useSearchParams` behind `<Suspense>` with Cache Components, native `history.pushState` / `replaceState` syncing with `useSearchParams`, metadata, sitemap

## Existing code inspected

- `components/sections/medicines.tsx`: home section, renders `MedicinesCatalog` with all products
- `components/sections/medicines-catalog.tsx`: client search + category / dosage-form chips (`FilterChips`), result count, empty state, product grid
- `lib/products.ts`: `filterProducts`, `categoryOptions`, `dosageFormOptions`, `ALL`, `medicinesDisclaimer`
- `lib/sanity/fetch.ts`: `getProducts()` (`"use cache"`, tags `product`/`category`, revalidated by the Sanity webhook), ordered by Sanity `order`
- `app/medicines/[slug]/page.tsx`: breadcrumb "Our Medicines" → `/#medicines`
- `lib/site-nav.ts`: header nav "Products" → `/#medicines`; `NavLink.href` is typed `/#…`
- `app/sitemap.ts`, `components/breadcrumbs.tsx`, `components/product-card.tsx`, `components/search-input.tsx`, `components/filter-chips.tsx`

## Decisions and assumptions

1. **Home section** shows the **first 10 products in Sanity display order**, without search or filters (they move to `/medicines`). Below the grid: **"View all medicines (N)"** button → `/medicines`, shown whenever there is at least one product. With 3 columns, 10 cards leave one card on the last row; that's expected.
2. **`/medicines` page**: search box, Category chips, Dosage form chips, result count, product grid, pagination. **12 per page** (fills 4 rows of 3 / 6 of 2 evenly). Tell me if you want another number.
3. **Filter rows keep the existing rule:** a row appears only when it has 2+ choices. Today all 4 products are Tablets, so the Dosage form row stays hidden until a Capsule / Syrup / … product is published, then it appears automatically. (Option: always show it. Say so if you prefer.)
4. **State lives in the URL**: `/medicines?q=calcium&category=bone&form=Tablets&page=2`. Links are shareable, Back returns to the same page, reloads keep the filters. Typing/filters use `replaceState` (no history spam); changing page uses `pushState` (Back goes to the previous page). Changing search or a filter resets to page 1.
5. **Rendering**: the page stays static and cached (all products fetched once via the existing cached `getProducts()`, revalidated by the webhook). Filtering and paging happen in the browser. That's instant and fine for hundreds of products. If the catalogue ever grows past ~1,000, we can switch to server-side paging.
6. **Navigation**: header "Products" link and the detail-page breadcrumb "Our Medicines" now go to `/medicines`. `NavLink.href` type widens to allow `/medicines`. The home section anchor `#medicines` stays for in-page links.
7. Reuse `ProductCard`, `FilterChips`, `SearchInput`, `filterProducts`, option helpers. New shared `Pagination` component in `components/`.

## Files to create or modify

- `app/medicines/page.tsx` (new): metadata, `<SiteHeader solid />`, breadcrumb (Home › Our Medicines), heading, disclaimer, `<Suspense>` → catalog
- `components/sections/medicines-catalog.tsx`: read/write URL params, pagination, keep search + chips + count + empty state
- `components/pagination.tsx` (new): Previous / numbered pages (1 … 4 5 6 … 12) / Next, `aria-current="page"`, 44 px targets
- `components/sections/medicines.tsx`: first 10 + "View all medicines (N)" button
- `lib/site-nav.ts`: Products → `/medicines`; widen `NavLink` type
- `app/medicines/[slug]/page.tsx`: breadcrumb → `/medicines`
- `app/sitemap.ts`: add `/medicines`
- `lib/seo.ts` (if needed): page metadata helper
- `AGENTS.md`: record `/medicines` listing as in scope (user request)

## Implementation requirements

- Server Components for page and section; the catalog stays the only client island.
- `useSearchParams` inside `<Suspense>` (Cache Components). Fallback: grid skeleton.
- Invalid params are ignored (unknown category → All; page out of range → last page).
- Page change scrolls to the top of the results and moves focus to the results heading (visually hidden) for keyboard / screen-reader users.
- Result count: "Showing 13–24 of 40 medicines" (live region).
- Empty state: "No medicines match your search." + "Clear filters".
- Metadata: title "Our Medicines", description (modest, no therapy areas in the meta description per §10.9: "Browse WhiteHill Lifecares medicines: composition, pack sizes and dosage forms."), canonical `/medicines`.

## UI

- Same section layout as the home section (Container, Eyebrow, Source Serif H1/H2, disclaimer), first section `pt-(--header-height)`.
- Grid: 1 column < 640 px, 2 columns 640–1023 px, 3 columns ≥ 1024 px (same as today).
- Pagination: pill buttons, `--blue-600` active page with white text, outline buttons otherwise (`buttonVariants`), centred; on mobile Previous/Next show icons only plus the page numbers.
- "View all medicines" button: primary `buttonVariants()` with arrow icon, below the home grid.
- Colours only from tokens; focus outlines visible; no carousel.
- Responsive checks at 360 / 768 / 1024 / 1440.

## Security requirements

None new: public, read-only data from the existing cached fetch. URL params are only compared against known values, never rendered as HTML.

## Compliance check

New copy: "View all medicines (N)", "Our Medicines", the meta description above, the result count and empty-state text. No claims, no therapy areas in general copy, disclaimer shown on the page. Rx tags unchanged on cards.

## Acceptance criteria

1. Home shows at most 10 products in Sanity order and a "View all medicines (N)" button to `/medicines`.
2. `/medicines` lists all visible, complete products, 12 per page, with working Previous / Next / page numbers.
3. Search (name, composition, ingredients, category) and category / dosage-form chips filter the list; changes reset to page 1.
4. URL reflects search, filters and page; reload and Back restore them; sharing the URL opens the same view.
5. Header "Products" and the detail breadcrumb go to `/medicines`; `/medicines` is in the sitemap.
6. No horizontal scroll at 360 px; keyboard-operable; visible focus.
7. `npx tsc --noEmit`, `npm run lint`, `npm run build` pass; `/medicines` builds as static/partial prerender.

## Checks to run

`npx tsc --noEmit` · `npm run lint` · `npm run build` · `npm run dev` + browser tests at 360 / 768 / 1024 / 1440.

## Manual test steps

1. Home → Our Medicines shows up to 10 cards and "View all medicines (N)". Click it.
2. `/medicines`: type "calcium" → results filter, URL has `?q=calcium`. Clear.
3. Tap a category chip → filtered, URL `?category=…`, page 1.
4. (With > 12 products) go to page 2 → URL `?page=2`, view jumps to results top; press Back → page 1.
5. Reload `/medicines?category=…&page=1` → same view restored.
6. Header "Products" → `/medicines`. Open a medicine → breadcrumb "Our Medicines" → `/medicines`.
7. Resize to 360 px: chips scroll sideways, pager fits, no sideways page scroll.
