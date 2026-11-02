# Implementation Prompt: Site Footer Polish & 4-Column Layout

## Goal
Redesign and balance the site footer (`components/site-footer/site-footer.tsx`) into a clean, 4-column layout that eliminates the empty void on the right, structures the company contact details with icons into a dedicated 4th column, and adds a WhatsApp quick-contact badge in the brand column.

---

## Skills and Docs Read
- `AGENTS.md` (Sections 1, 2, 5, 10, 13, 14, 15)
- `PRD.md` (Sections 5.7, 8)
- `DESIGN.md` (Sections 2, 3, 4, 5)

---

## Existing Code Inspected
- `components/site-footer/site-footer.tsx`: Current footer implementation with 3 populated columns on a 4-column grid.
- `lib/site.ts`: Company logo (white), description, and fallback contact information.
- `lib/contact.ts`: `formatPhone`, `telHref`, `contactWhatsappMessage`.
- `lib/whatsapp.ts`: `whatsappHref`.
- `lib/products.ts`: `medicinesDisclaimer`, `medicinesHref`, `productHref`.

---

## Design Specifications & Layout
1. **Grid Structure**:
   - `grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8`
   - **Column 1 (Brand & About)** — `lg:col-span-4`:
     - WhiteHill logo (`company.logoWhite.src`).
     - Company description paragraph in `text-ink-on-navy text-sm leading-relaxed mt-4`.
     - Direct WhatsApp quick chat badge with green pulsing indicator.
   - **Column 2 (Company Navigation)** — `lg:col-span-2`:
     - Heading: `"Company"` in `text-sm font-semibold text-white tracking-wide`.
     - Navigation links: Home, About Us, Products, Quality, Contact, Privacy Policy.
   - **Column 3 (Our Medicines)** — `lg:col-span-3`:
     - Heading: `"Medicines"` in `text-sm font-semibold text-white tracking-wide`.
     - List of top products from Sanity with trademark marks (`™`/`®`), plus `"View all medicines →"`.
   - **Column 4 (Contact & Registered Office)** — `lg:col-span-3`:
     - Heading: `"Contact & Office"` in `text-sm font-semibold text-white tracking-wide`.
     - Registered Office with `MapPin` icon and formatted multi-line address.
     - Phone with `Phone` icon and click-to-call link.
     - Email with `Mail` icon and `mailto:` link.
2. **Bottom Legal & Compliance Bar**:
   - Top border in `border-blue-700/60 pt-8 mt-12`.
   - Statutory Indian medical disclaimer: *"Product information is provided for general awareness. Please use any medicine only on the advice of a registered medical practitioner."*
   - Copyright line with `<CompanyName legal onNavy />` and dynamic cached year.
   - Regulatory licences line (CIN, GSTIN, Drug Licence, FSSAI) when populated in `siteSettings`.

---

## Files to Modify
- `components/site-footer/site-footer.tsx`: Reorganize grid and columns into the balanced 4-column structure.

---

## Acceptance Criteria
- [ ] Footer spans across all 4 columns evenly on desktop with zero awkward empty voids.
- [ ] Column 1 displays the logo, description, and WhatsApp quick badge.
- [ ] Column 2 displays Company links.
- [ ] Column 3 displays Medicines links with trademark symbols and "View all medicines →".
- [ ] Column 4 displays Registered Office address, Phone, and Email with Lucide line icons.
- [ ] Bottom compliance bar shows the medicines disclaimer, copyright, and licence numbers.
- [ ] Typecheck (`npx tsc --noEmit`) and lint pass cleanly.

---

## Manual Test Steps
1. Navigate to the footer at the bottom of the page.
2. Confirm all 4 columns are evenly spaced and balanced across the container width.
3. Test all links (Company nav, Medicine detail pages, tel link, email link, WhatsApp badge).
4. Verify responsive stacking on mobile (single column) and tablet (2 columns).
