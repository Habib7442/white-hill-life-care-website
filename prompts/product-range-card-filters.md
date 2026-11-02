# Product Range Card Filters & Coming Soon Routing

Connect the "Committed to Better Health and Wellness" homepage range tiles (Pharmaceuticals, Nutraceuticals, Wellness Products) directly to filtered `/medicines` catalogue views when matching products exist, or route to their dedicated `/range/[slug]` "Coming soon" page when no products are listed.

---

## Skills and Docs Read

- `AGENTS.md` (§1 Product scope, §6 Architecture, §9 Routes and API contracts, §10 Compliance and content rules)
- `PRD.md` (§4 Information Architecture, §5.4 Medicines catalogue, §5.5 Product range)
- `DESIGN.md` (§2 Palette, §5 Components)

---

## Existing Code Inspected

- `lib/site.ts`: `productRange` defining the 4 cards (Pharmaceuticals, Nutraceuticals, Wellness Products, Quality Assured) and `exploreRange.tiles`.
- `components/sections/product-range.tsx`: Renders the DNA helix feature panel and the 4 cards.
- `lib/products.ts`: `rangeHref`, `matchesRange`, `productTypeOptions`, `productTypeLabels`.
- `app/range/[slug]/page.tsx`: Existing "Coming soon" page with breadcrumbs, icon, status pill, and actions ("See available medicines", "Send an enquiry").
- `components/sections/medicines-catalog.tsx`: Reads URL state `?type=`, renders `FilterDropdown` controls and filters results.

---

## Decisions and Assumptions

1. **Card Routing Logic**:
   - **Pharmaceuticals**: If products with `productType === "pharmaceutical"` exist, route to `/medicines?type=pharmaceutical`. If 0 products, route to `/range/pharmaceuticals`.
   - **Nutraceuticals**: If products with `productType === "nutraceutical"` exist, route to `/medicines?type=nutraceutical`. If 0 products, route to `/range/nutraceuticals`.
   - **Wellness Products**: If products with `productType === "wellness"` exist, route to `/medicines?type=wellness`. If 0 products, route to `/range/wellness`.
   - **Quality Assured**: Keeps anchor link `/#quality` pointing to the Quality section.
2. **Filter Preselection on `/medicines`**:
   - When navigated to `/medicines?type=<type>`, `MedicinesCatalog` reads `typeParam` from URL query params.
   - `FilterDropdown` for "Type" shows the active type (`Pharmaceutical`, `Nutraceutical`, or `Wellness`) pre-selected.
   - Products are filtered reactively on load.
3. **Coming Soon Page Support**:
   - Extend `findTile` in `app/range/[slug]/page.tsx` and `generateStaticParams()` to support `pharmaceuticals`, `nutraceuticals`, and `wellness` slugs with their respective icons, titles, and descriptions.

---

## Files to Modify

- `lib/site.ts`:
  - Update `RangeTile` type to include optional `slug?: string` and `productType?: "pharmaceutical" | "nutraceutical" | "wellness"`.
  - Update `productRange.tiles` with their respective `slug` and `productType` values.
- `lib/products.ts`:
  - Ensure `productTypeOptions` returns all defined product types so that pre-selected filters from the URL remain visible and active even during empty states.
  - Update `rangeHref` to format clean `?type=` links when matching type-only ranges.
- `components/sections/product-range.tsx`:
  - Make `ProductRange` an async Server Component that fetches `products = await getProducts()`.
  - Dynamically assign tile `href`: `/medicines?type=<type>` if matching products exist, or `/range/<slug>` if 0 products exist.
  - Switch `<a>` to Next.js `<Link>`.
- `app/range/[slug]/page.tsx`:
  - Allow `findTile` and `generateStaticParams` to resolve tiles from both `exploreRange` and `productRange`.

---

## Compliance Check

- No curative or treatment claims added.
- Complies with India DPDP and Drug regulations: factual representation only.
- Modest coming soon messaging: "We are preparing our ... range. In the meantime, see the medicines available today or send us an enquiry."

---

## Acceptance Criteria

- [ ] Clicking **Pharmaceuticals** on the home page navigates to `/medicines?type=pharmaceutical` with the Type filter pre-selected if products exist, or `/range/pharmaceuticals` if none exist.
- [ ] Clicking **Nutraceuticals** navigates to `/medicines?type=nutraceutical` with the Type filter pre-selected if products exist, or `/range/nutraceuticals` if none exist.
- [ ] Clicking **Wellness Products** navigates to `/medicines?type=wellness` if products exist, or `/range/wellness` if none exist.
- [ ] Clicking **Quality Assured** scrolls smoothly to `/#quality`.
- [ ] On `/medicines?type=...`, the Type filter dropdown displays the active selection immediately, and the list filters to match.
- [ ] The `/range/[slug]` pages render clean 200 responses with the proper title, icon, and "Coming soon" state.

---

## Test Steps

1. Visit `http://localhost:3000/`.
2. Scroll to the "Committed to Better Health and Wellness" section.
3. Click **Nutraceuticals** -> verify it routes to `/medicines?type=nutraceutical`, the Type filter displays "Nutraceutical", and only nutraceutical products show.
4. Click **Pharmaceuticals** -> verify it routes to `/medicines?type=pharmaceutical` with "Pharmaceutical" selected.
5. Click **Wellness Products** -> if no wellness products are published yet, verify it opens `/range/wellness` with "Coming soon".
6. Click **Quality Assured** -> verify it scrolls to `#quality`.
