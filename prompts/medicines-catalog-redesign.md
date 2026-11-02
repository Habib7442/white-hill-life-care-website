# Implementation Prompt: Medicines Catalog Redesign (Figma Matching)

## Goal
Redesign the `/medicines` catalog section below the hero banner to match the user's Figma design: replace the bulky filter chip rows with 3 compact dropdown filters (`All Categories`, `All Forms`, `All Types`), integrate the search input cleanly, add the `"OUR MEDICINES"` eyebrow pill and `"Explore our medicines"` heading with live product count, and style the product cards and grid to match the Figma mockup.

---

## Skills and Docs Read
- `AGENTS.md` (Sections 1, 2, 5, 10, 13, 14, 15)
- `PRD.md` (Sections 5.4, 8)
- `DESIGN.md` (Sections 2, 3, 4, 5)
- User's attached Figma reference screenshots

---

## Existing Code Inspected
- `app/medicines/page.tsx`: Breadcrumbs, header, disclaimer, and catalog mounting.
- `components/sections/medicines-catalog.tsx`: URL-synced search, filtering logic, chips, pagination.
- `components/product-card.tsx`: Product card rendering with pack image, title, composition, dosage form, pack size, and "View Details" button.
- `components/ui/native-select.tsx`: Dropdown select primitive.

---

## Design Specifications & Layout
1. **Header & Control Bar (Figma Matching)**:
   - Left side:
     - Eyebrow pill: `"OUR MEDICINES"` (`inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700`).
     - Heading: `"Explore our medicines"` in `font-heading font-bold text-3xl sm:text-4xl text-black`.
     - Subtext: Live count (e.g. `"5 Medicines"` or `"X of Y Medicines"`).
   - Right side:
     - Search input (`SearchInput`) with `"Search medicines..."` placeholder.
     - 3 Dropdown Filters:
       - Category: `All Categories` / categories
       - Dosage Form: `All Forms` / forms
       - Type: `All Types` / types
2. **Product Cards**:
   - Refined card container with soft neutral background (`rounded-card bg-slate-50/70 border border-slate-100 hover:shadow-md transition-all p-5`).
   - Centered pack photo with transparent background.
   - Title: Bold black heading (`font-display font-semibold text-black text-xl`).
   - Composition/Description: 2-line clamped preview in muted ink.
   - Metadata row: Dosage form icon + label, Package icon + pack size.
   - Action Button: Full-width outline button `"View Details"` with blue border and blue text.
3. **URL State & Search**:
   - Keep full URL synchronization (`?q=&category=&form=&type=&range=&page=`), debounced search, and pagination.

---

## Files to Modify
1. `components/sections/medicines-catalog.tsx`:
   - Replace the 3 chip rows with the Figma dropdown select controls and search input, integrated into the header bar.
2. `app/medicines/page.tsx`:
   - Streamline the container header to let `MedicinesCatalog` render the Figma `"Explore our medicines"` title and controls without duplicate headers.
3. `components/product-card.tsx`:
   - Fine-tune card background and button borders to match the Figma cards.

---

## Acceptance Criteria
- [ ] Catalog header matches the Figma design: `"OUR MEDICINES"` pill, `"Explore our medicines"` title, and product count.
- [ ] 3 Dropdown filters (`All`, `All Forms`, `All Types`) and the search input are displayed cleanly and function with URL state.
- [ ] Product cards render pack image, title, 2-line preview, dosage form, pack size, and `"View Details"` button.
- [ ] Search filtering works seamlessly across medicine names and compositions.
- [ ] Responsive across mobile, tablet, and desktop viewports.
- [ ] Typecheck (`npx tsc --noEmit`) passes cleanly.

---

## Manual Test Steps
1. Navigate to [http://localhost:3000/medicines](http://localhost:3000/medicines).
2. Check the catalog header: verify eyebrow pill, `"Explore our medicines"` title, and product count.
3. Use the search input: type "Calcium" -> verify filtering updates in real time.
4. Use dropdown filters: change Category, Form, or Type -> verify results filter correctly and URL updates.
5. Click "View Details" on any product card -> verify it navigates to `/medicines/[slug]`.
