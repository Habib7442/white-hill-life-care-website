# Separate About page (`/about`)

## Goal

Move About off the home page into its own well-designed `/about` page, and point every "About" link (header, mobile menu, footer, hero "Know More") to it.

## Change from the original plan (user decision, 22 Oct 2026)

AGENTS §1 listed a separate `/about` as Phase 2 / out of scope. The user asked for it now, with About removed from the home page. `AGENTS.md` §1, §9 and `PRD.md` §4 are updated to match.

## Skills and docs read

- `AGENTS.md` §1, §5, §8, §9, §10, §14 (fixed header: `<SiteHeader solid />` + `pt-(--header-height)`)
- `PRD.md` §1, §3 audience, §5.2 About, §8 compliance
- `DESIGN.md` §1 direction ("clean laboratory"), §2 palette + section rhythm, §3 type, §4 layout, §5 components, §6 molecules (hexagon molecule, glossy atoms, dot grid), §9 motion
- Next.js docs: static metadata, Server Components, `"use cache"` (only `getSiteSettings()` / `getProducts()` already cached)

## Existing code inspected

- `components/sections/about.tsx` (built in the last step; its copy is reused and then the file is deleted)
- `app/privacy/page.tsx` and `app/medicines/page.tsx`: the pattern for a sub-page (solid header, breadcrumbs, footer)
- `lib/site-nav.ts`: `NavLink.href` type is `/#…` | `"/medicines"`; "About Us" → `/#about`
- `components/hero/hero.tsx`: "Know More" button → `#about`
- `components/site-footer/site-footer.tsx`: "About Us" → `/#about`
- `lib/site.ts`: `aboutValues`, `qualityPoints`; `lib/seo.ts` metadata pattern; `app/sitemap.ts`
- `components/molecules/corner-molecule.tsx`, `dot-grid` utility in `globals.css`
- `lib/sanity/fetch.ts`: `getSiteSettings()` (address, CIN, GSTIN, licences), `getProducts()` (categories)

## Decisions and assumptions

1. **No photos.** None of our assets show Indian people (AGENTS §10.10), so the page's visual identity comes from DESIGN §6: a large SVG molecule on a dot-grid panel in the page hero, plus faint corner molecules. It's original, on-palette and light.
2. **Home sections renumber:** Focus Areas `01`, Our Medicines `02`, Quality `03`, Contact `04`. `sectionIds.about` is removed.
3. **No invented facts.** No founding year, team, people, numbers, cities served or certificates beyond the agreed "WHO-GMP certified manufacturing partners" wording. Company facts come from `siteSettings` and are hidden when empty.
4. **"Our range" on About uses Sanity categories** (as Focus Areas does) to stay within AGENTS §10.9: chips listing the category titles, linking to `/medicines?category=…`. There's no therapy wording in the copy.
5. **Quality on About** reuses `qualityPoints` in a different layout (a numbered list), so the home Quality band and the About page say the same thing without duplicating copy in code.
6. Static page, Server Components only; no new client JS.

## Page structure and copy (draft for client approval)

### 1. Page hero (`bg-blue-25`, `pt-(--header-height)`)
- Breadcrumbs: Home › About us
- ≥ 1024 px: text left 6/12, molecule panel right 6/12; below that the panel goes under the text, ~260 px tall.
- Eyebrow: "About us"
- H1 (Source Serif 4, 40 / 30 px): "Medicines for better support of health, with the facts in plain view"
- Intro (17 / 16 px, `text-ink-muted`): "`<CompanyName legal />` is a newly established, India-based pharmaceutical marketing company. We work with distributors, stockists, pharmacies and healthcare professionals to make a focused range of medicines available."
- Buttons: primary "Explore our medicines" → `/medicines`; outline "Contact us" → `/#contact`
- Molecule panel: white `rounded-hero` card, 1 px `border-blue-100`, `dot-grid` background, a new `AboutMolecule` SVG (hexagon ring, glossy atoms via a radial gradient white → `blue-300` → `blue-600`, bonds `bond` colour, two navy "heavy" atoms) and the WhiteHill leaf mark (`company.mark`) in a small white badge in one corner. `aria-hidden` on the SVG. Optional slow float on one atom group, `motion-safe:` only.

### 2. Who we are (white)
- 5/7 split: eyebrow "Who we are" + H2 "A young company with a careful approach" left; right:
  - P1: "We started WhiteHill Lifecares to offer medicines that people in the supply chain can stock and recommend with confidence. Our role is marketing and distribution: our medicines are made by WHO-GMP certified manufacturing partners, and we make sure each one reaches the market with clear, accurate information."
  - P2: "We are starting small on purpose. Rather than a long list of products, we are building a focused range and adding new medicines step by step, as each one is ready."

### 3. What we value (`bg-blue-25`)
- Eyebrow "Our values", H2 "What guides our work"
- 3 cards (white, `rounded-card-sm`, `border-blue-100`, 52 px `bg-blue-50` icon tile):
  1. `FlaskConical` **Quality-led formulations**: "Each medicine is chosen with a clear purpose and made by WHO-GMP certified manufacturing partners."
  2. `FileText` **Transparent information**: "Composition, pack, storage and manufacturer details are shared openly on the pack and on our website."
  3. `Sprout` **Responsible growth**: "We add medicines to our range one at a time, only when we can supply them properly."

### 4. Who we work with (white)
- Eyebrow "Who we work with", H2 "Built for the people who supply and prescribe"
- 3 cards in a row (icon top, title, one line), with a 1 px `border-blue-100` and no fill:
  1. `Warehouse` **Distributors & stockists**: "Product details and a direct line to us for stocking enquiries."
  2. `Store` **Pharmacies**: "Clear compositions and pack sizes for every medicine we offer."
  3. `Stethoscope` **Healthcare professionals**: "Accurate composition, strengths and Rx status for each product."

### 5. Our approach to quality (navy band, `CornerMolecule`)
- Eyebrow (onNavy) "Quality", H2 "Our approach to quality"
- The 4 `qualityPoints` as a numbered list (01–04 in `text-blue-300`, serif number 28 px), 2 × 2 at ≥ 768 px, with a hairline `border-blue-700` between rows.

### 6. Our range (`bg-blue-25`)
- Eyebrow "Our range", H2 "Our current range"
- Line: "Our medicines are grouped into these areas, and new medicines are being added."
- Category chips (from Sanity, as links to `/medicines?category=…`, 44 px tall, `bg-white border-blue-100 text-blue-700`, hover `bg-blue-50`) + a "View all medicines" primary button.
- Hidden if there are no products.

### 7. Company information (white)
- Eyebrow "Company information", H2 "Company details"
- A definition list in a white `rounded-card` bordered card, 2 columns ≥ 768 px: Registered name (`<CompanyName legal />`), Registered office (address, `pre-line`), CIN, GSTIN, Drug licence, FSSAI licence. Each row only when set (today: name + office).

### 8. Closing CTA (navy-900 rounded panel inside a white section)
- H2 (white): "Interested in working with us?"
- Line: "Distributors, stockists and pharmacies can send an enquiry and we will get back to you."
- Buttons: "Send an enquiry" → `/#contact` (white fill, navy text variant via `className`); WhatsApp link (outline on navy) using `siteSettings.whatsapp` / `company.whatsapp` with `contactWhatsappMessage`.

## Files to create or modify

Create:
- `app/about/page.tsx`: the page (sections as local components or in `components/about/`)
- `components/about/about-hero.tsx`, `about-molecule.tsx`, `company-facts.tsx`, `about-cta.tsx`
- `lib/site.ts`: `companyValues` (icon + title + text; replaces `aboutValues`), `audiences`

Modify:
- `app/page.tsx`: remove `<About />`; renumber eyebrows in `focus-areas.tsx` (01), `medicines.tsx` (02), `quality.tsx` (03), `contact.tsx` (04)
- `lib/site-nav.ts`: `NavLink.href` accepts `"/about"`; "About Us" → `/about`; drop `sectionIds.about`
- `components/hero/hero.tsx`: "Know More" → `/about` (`next/link`)
- `components/site-footer/site-footer.tsx`: "About Us" → `/about`
- `lib/seo.ts`: `aboutMetadata` (title "About us", description "WhiteHill Lifecares Pvt Ltd is a newly established, India-based pharmaceutical marketing company offering medicines for better support of health.", canonical `/about`)
- `app/sitemap.ts`: add `/about` (priority 0.7)
- Delete `components/sections/about.tsx`
- `AGENTS.md` §1 (home order without About; `/about` added at the user's request; remove "/about" from Out of scope), §9 routes table + anchors line; `PRD.md` §4 sitemap

## Implementation requirements

- `<SiteHeader solid />`, `<main id=main>`, `<SiteFooter />`; the first section has `pt-(--header-height)`.
- Section padding from `Section`; content in `Container` (1240 px).
- Only one H1; H2 per section with `aria-labelledby`.
- Icons: Lucide, `strokeWidth={1.8}`, `text-blue-600` (or `text-blue-300` on navy), `aria-hidden`.
- Motion: colour transitions 150 ms only; the optional molecule float uses the existing `animate-float` with `motion-safe:`.
- Leaf mark image via `next/image`, not priority; the molecule is inline SVG.

## Security requirements

- No client components, no env vars. Sanity strings render as escaped text; the address uses `pre-line`.
- WhatsApp link built with `whatsappHref`; `target="_blank" rel="noopener noreferrer"`.

## Compliance check (AGENTS §10)

- No cure/treatment words; "better support of health" only. ✔
- No numbers, years, team, testimonials, awards, "leading/trusted". ✔
- WHO-GMP only as "WHO-GMP certified manufacturing partners". ✔
- No therapy areas in copy; category names only from Sanity. ✔
- No people imagery. ✔ Company name via `<CompanyName legal />`; CIN/GSTIN only when set. ✔

## UI details

- **Reference:** none (the user's screenshot shows the current home About section to be replaced). Built from `DESIGN.md`.
- **Rhythm:** blue-25 hero → white → blue-25 → white → navy → blue-25 → white → navy CTA panel → navy footer. A white gap separates the CTA panel from the footer.
- **Type:** H1 serif 40/30; H2 `SectionHeading`; card titles serif 22 px (values) or Plex 17 px semibold (audiences, quality); body 15–17 px.
- **Radius:** hero panel `rounded-hero`, cards `rounded-card-sm`, facts card and CTA panel `rounded-card`, chips pill.
- **Responsive:** 360 everything single column, molecule panel 260 px · 768 values 3-col? no, 1 col until 1024; audiences 1 col → 3 at ≥ 768; quality 2 × 2 at ≥ 768; facts 2-col at ≥ 768 · 1024 hero and Who-we-are splits · 1440 capped.
- **States:** hover/focus-visible on all links, chips and buttons (`outline-blue-600`; `outline-blue-300` on navy).

## Acceptance criteria

1. `/about` renders all 8 parts, header solid, nothing hidden under it, footer present.
2. The home page has no About section; sections are numbered 01–04.
3. Header (desktop + mobile menu), footer and hero "Know More" all go to `/about`.
4. Company facts show only filled `siteSettings` fields; range chips come from Sanity and link to filtered `/medicines`.
5. `/about` is in `sitemap.xml` with its own title/description/canonical.
6. Tokens only, no horizontal scroll at 360 px, visible focus everywhere, one H1.

## Checks to run

- `npx tsc --noEmit`, `npm run lint`, `npm run build`
- Browser at 360 / 768 / 1024 / 1440

## Manual test steps

1. `npm run dev`, open `/`: no About section; Focus Areas is `01`.
2. Click header **About Us** (desktop), then the mobile menu at 360 px: `/about` opens.
3. On `/`, click hero **Know More**: `/about`.
4. On `/about`, scroll all sections; click a range chip (e.g. Nerve Health): `/medicines` with that filter selected.
5. Click **Send an enquiry**: home Contact section; the WhatsApp button opens a chat.
6. In the admin, add a CIN and save: it appears under Company details after reload; remove it again.
7. Resize 360 / 768 / 1024 / 1440; tab through the page with the keyboard.
