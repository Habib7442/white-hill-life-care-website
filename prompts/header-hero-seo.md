# Header, hero, and SEO foundation

## Goal

Build the sticky header (with mobile menu) and the hero section from `DESIGN.md`, prepare the brand assets in `public/` for the web, and set up the site's SEO foundation (`lib/seo.ts`, metadata, Open Graph, icons, manifest, JSON-LD, sitemap, robots).

## Skills and docs read

- `AGENTS.md` sections 5, 6, 9, 10, 13, 14
- `PRD.md` §4 sitemap, §5.1 hero, §6 F1/F2/F7, §7 SEO/performance/accessibility, §8 compliance
- `DESIGN.md` §4 layout, §5 buttons/eyebrow/chips, §6 molecular visuals, §7 rows 1–2, §8 imagery, §9 motion, §10 accessibility
- `node_modules/next/dist/docs/01-app/02-guides/json-ld.md` (render as `<script>` in layout/page; escape `<` as `<`)
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/` (`app-icons`, `manifest`, `opengraph-image`, `robots`, `sitemap`)

## Existing code and assets inspected

- Design system from `prompts/design-system.md`: `Container`, `Section`, `Eyebrow`, `Button`/`buttonVariants`, `Chip`, palette tokens, `--header-height: 72px`
- `app/page.tsx`: temporary design-system preview (gets replaced here)
- `app/favicon.ico`: still the **default Next.js favicon**
- `public/` assets (viewed):

| File | Size | What it is | Problem |
|---|---|---|---|
| `WhiteHill Lifecares Logo with Leaf Swoosh transparent.png` | 1254², 529 KB | Stacked colour logo (WH mark + "WhiteHill" + "Lifecares Pvt Ltd"), transparent | ~15% empty padding on every side; too heavy; filename has spaces |
| `WhiteHill Healthcare Logo with Leaf and Swoosh.png` | 1254², 1.1 MB | Same logo on a solid white background | Not needed (the transparent version covers it) |
| `WhiteHill Lifecares Logo dark bg.png` | 1254², 496 KB | All-white logo, transparent, for navy backgrounds | Same padding/weight issues |
| `og_image.png` | 1733×907, 1.5 MB | Logo + "Trusted medicines for everyday health." + glossy molecule | Too large for OG (recommended 1200×630, < 300 KB) |
| `favicon_io/*` | — | favicon.ico, 16/32 px, apple-touch 180, android 192/512, `site.webmanifest` | Manifest has empty `name`/`short_name` and icon paths that point to `/` instead of `/favicon_io/` |

## Decisions and assumptions

### Assets

1. **Trim and convert logos with `sharp`** (already installed with Next) in a one-off script, `scripts/prepare-brand-assets.mjs`:
   - `public/brand/whitehill-logo.webp`: colour logo, padding trimmed, 640 px wide
   - `public/brand/whitehill-logo-white.webp`: white logo, trimmed, 640 px wide (used later in the Quality band/footer)
   - The originals move to `assets/brand-source/`, which is not served, so they stay in the repo as masters without shipping 2 MB to visitors. The white-background PNG moves there too.
2. **OG image:** resized to 1200×630 JPEG (~150 KB) and saved as `app/opengraph-image.jpg` and `app/twitter-image.jpg`, with matching `.alt.txt` files (Next.js file conventions). `public/og_image.png` moves to `assets/brand-source/`.
3. **Icons via Next.js file conventions:**
   - `public/favicon_io/favicon.ico` → `app/favicon.ico` (replaces the Next default)
   - `apple-touch-icon.png` → `app/apple-icon.png`
   - `favicon-32x32.png` → `app/icon.png`
   - `android-chrome-192x192.png` / `512x512.png` → `public/icons/icon-192.png` / `icon-512.png` (referenced by the manifest)
   - `site.webmanifest` is replaced by `app/manifest.ts` (name "WhiteHill Lifecares Pvt Ltd", short name "WhiteHill", theme `#1D4ED8`, background `#FFFFFF`); `public/favicon_io/` is then deleted.

### SEO

4. **`lib/seo.ts` is the single source of site facts used in metadata:** name, legal name, short description, locale `en_IN`, the site URL from `NEXT_PUBLIC_SITE_URL` (falling back to `http://localhost:3000` in dev), and helpers that build `Metadata` and the JSON-LD objects. Contact details aren't known yet (PRD §11), so none are included. When Sanity `siteSettings` exists, phone, email, and address will come from there.
5. **Root metadata** (`app/layout.tsx`): `metadataBase`, title template `%s | WhiteHill Lifecares`, default title "WhiteHill Lifecares Pvt Ltd — Pharmaceutical Company, India", description, canonical `/`, Open Graph (`website`, `en_IN`, site name), Twitter `summary_large_image`, `robots: index, follow`, `formatDetection: { telephone: false }` (so iOS doesn't restyle numbers we haven't styled).
6. **JSON-LD** in the root layout through `components/seo/json-ld.tsx` (one generic component that escapes `<` per the Next.js docs):
   - `Organization`: `name`, `legalName`, `url`, `logo` (absolute URL to the colour logo), `description`, `address` with only `addressCountry: "IN"`, `areaServed: "IN"`
   - `WebSite`: `name`, `url`, `inLanguage: "en-IN"`
   - No `MedicalOrganization`, `Product`, ratings, or reviews. WhiteHill is a marketing company, not a care provider, and product markup belongs with the Sanity product data later.
7. **`app/sitemap.ts`**: `/` only for now (`/privacy` is added when that page exists). **`app/robots.ts`**: allow all, disallow `/studio` (ready for Sanity), point to the sitemap.
8. Add `NEXT_PUBLIC_SITE_URL` to a new `.env.example` and add `!.env.example` to `.gitignore` (per `AGENTS.md` §12).

### Header (`DESIGN.md` §7 row 1)

9. **Layout:** sticky `top-0`, `z-50`, `bg-white/96`, 1px `border-line` bottom border. Logo left · nav links centre · "Connect With Us" primary button right.
10. **Height:** 72 px on desktop, 64 px below 820 px. The logo renders at 48 px tall (≈ 60 px wide after trimming). At that size the "Lifecares Pvt Ltd" line is small, which is expected for a stacked logo; the `alt` text carries the full name. `--header-height` is updated to match, so anchor scrolling clears the header.
11. **Nav links** (from a single `lib/site-nav.ts` list, reused later by the footer): About `#about` · Focus Areas `#focus-areas` · Medicines `#medicines` · Quality `#quality` · Contact `#contact`. The logo links to `#top`. 15 px IBM Plex Sans 500, ink-muted, hover/active blue-600.
12. **Hamburger below 820 px** (PRD F2): a custom `nav` breakpoint at 820 px (`--breakpoint-nav: 820px`). The menu is a small client component (`components/site-header/mobile-menu.tsx`): 44 px icon button (Lucide `Menu`/`X`) with `aria-expanded` and `aria-controls`, and a full-width panel under the header listing the links plus the CTA. It closes on link click, Escape, and resize past 820 px, and returns focus to the toggle on Escape. No sheet/overlay library, because a simple disclosure panel is enough.
13. **"Connect With Us"** is an `<a href="#contact">` styled with `buttonVariants()` (an anchor, not a `<button>`, because it navigates). `size="sm"` in the header so it fits; it moves into the mobile panel below 820 px.
14. The header is a Server Component; only the mobile menu is `"use client"`.

### Hero (`PRD.md` §5.1, `DESIGN.md` §6, §7 row 2)

15. **Background** blue-25. Two columns at `lg` (text left ≈ 55% · molecule panel right ≈ 45%), stacked on smaller screens with the text first.
16. **Copy, exactly from PRD §5.1:**
    - Eyebrow (un-numbered): "Pharmaceutical Company · India"
    - H1 (`font-display`, 800, −0.02em, 38 → 60 px): "**Trusted medicines** for everyday health." with "Trusted medicines" in blue-600 and the rest navy-900. Matches the OG image.
    - Intro (body large, ink-muted, max ~34rem), **draft for client approval**: "WhiteHill Lifecares is an India-based pharmaceutical marketing company. We bring carefully formulated medicines for bone, women's, nerve and iron health to distributors, pharmacies and healthcare professionals, working with WHO-GMP certified manufacturing partners."
    - Buttons: "Explore Our Medicines" (primary, arrow icon) → `#medicines`; "Partner With Us" (outline) → `#contact`. Both are anchors styled with `buttonVariants`. Side by side, stacking full-width below 640 px.
    - Facts row (three items separated by thin blue-100 dividers): **4** Medicine brands · **WHO-GMP** Certified manufacturing partners · **India** Based. Value in Source Serif 4 700 navy, 26–30 px; label 13–14 px ink-muted.
17. **"4 Medicine brands" is a constant for now** (`lib/site.ts`). Once Sanity is wired, it becomes the count of visible products.
18. **Molecule panel** (`components/hero/molecule-panel.tsx`, Server Component, decorative):
    - Card with `rounded-hero` (28 px), white background, 1px blue-100 border, aspect ≈ 1 : 1 (min-height ~420 px desktop, ~320 px mobile)
    - Dot-grid texture: blue-100 dots every 28 px (CSS `radial-gradient` background)
    - Inline SVG molecule, `aria-hidden="true"`: a hexagonal ring of 6 atoms with 3–4 attached atoms. Atoms are glossy spheres (radial gradient white → blue-300 → blue-600 with a small white highlight), bonds in `bond` `#7FA9F2` (added to the palette, as noted in the design-system report), 2 "heavy" atoms in navy-900. Same feel as the molecule in the OG image, drawn flat-glossy rather than photoreal.
    - Faint background molecules in blue-100/blue-200 at two corners
    - 4 ingredient chips over the molecule, never covering it: Vitamin D3, Methylcobalamin, Folic Acid, Ferrous Ascorbate. White pills with blue-100 border and blue-700 text; **Methylcobalamin filled blue-600 with white text** as the accent. These are visible text, so they are not hidden from screen readers; the panel gets `role="img"` with an `aria-label` describing the illustration and its ingredient labels.
    - Optional slow float on the chips (6–8 s ease-in-out, 6 px), turned off under `prefers-reduced-motion`
19. **Hero spacing:** `py-16` mobile, `pt-20 pb-24` desktop; gap between columns 56–72 px. The hero renders `id="top"`.

### Page

20. `app/page.tsx` is replaced by `<SiteHeader />` + `<main><Hero /></main>`. The design-system preview is removed. Other sections come in later prompts, so their nav anchors won't scroll anywhere yet; that's expected.

## Files to create or modify

Create:
- `scripts/prepare-brand-assets.mjs`
- `public/brand/whitehill-logo.webp`, `public/brand/whitehill-logo-white.webp` (generated)
- `public/icons/icon-192.png`, `public/icons/icon-512.png` (moved)
- `app/opengraph-image.jpg`, `app/opengraph-image.alt.txt`, `app/twitter-image.jpg`, `app/twitter-image.alt.txt` (generated)
- `app/icon.png`, `app/apple-icon.png` (moved), `app/manifest.ts`, `app/sitemap.ts`, `app/robots.ts`
- `lib/seo.ts`, `lib/site.ts` (company constants, hero facts), `lib/site-nav.ts`
- `components/seo/json-ld.tsx`
- `components/site-header/site-header.tsx`, `components/site-header/mobile-menu.tsx`
- `components/hero/hero.tsx`, `components/hero/molecule-panel.tsx`, `components/hero/molecule.tsx`
- `.env.example`

Modify:
- `app/layout.tsx`: metadata from `lib/seo.ts`, JSON-LD
- `app/globals.css`: `--color-bond`, `--breakpoint-nav: 820px`, header height (72/64 px), dot-grid and chip-float utilities with reduced-motion guard
- `app/page.tsx`: header + hero
- `app/favicon.ico`: replaced
- `.gitignore`: `!.env.example`

Move (not deleted): original PNGs and `og_image.png` → `assets/brand-source/`.
Delete: `public/favicon_io/` (after its files are moved).

## Implementation requirements

- All colours from palette tokens; no hex in components (except inside the SVG `<defs>` gradient stops, which must use `var(--color-…)`).
- Logo via `next/image`, `priority`, explicit `width`/`height`, `alt="WhiteHill Lifecares Pvt Ltd"`.
- Header and hero anchors reference IDs from `lib/site-nav.ts`, not string literals scattered around.
- Touch targets ≥ 44 px; visible focus on every link and button; nav is a `<nav aria-label="Main">` with a `<ul>`.
- A skip link ("Skip to content" → `#main`), visible on focus, as the first focusable element.
- No layout shift: the logo has fixed dimensions, fonts come from `next/font`, the molecule is inline SVG.
- The hero H1 is the only `<h1>` on the page.
- The asset script is idempotent and safe to re-run, and logs what it wrote.

## Security requirements

- No secrets. `NEXT_PUBLIC_SITE_URL` is public by design.
- JSON-LD is serialised with `<` escaped to `<` (Next.js guidance), even though all values are static.

## Compliance check

- Headline "Trusted medicines for everyday health." is used exactly as PRD §5.1 specifies (client-chosen; matches their OG image).
- Hero facts are only the three PRD-approved facts. No other numbers.
- WHO-GMP is worded only as "WHO-GMP certified manufacturing partners".
- The intro copy is a **draft** and is listed under "Needs your attention" for client approval. It contains no treatment or cure claims.
- JSON-LD makes no medical, rating, or review claims.

## Acceptance criteria

- [ ] `public/` contains only `brand/` (two WebP logos) and `icons/` (two PNGs); originals are in `assets/brand-source/`
- [ ] The browser tab shows the WhiteHill favicon; `/manifest.webmanifest` returns the correct name and icons
- [ ] Page source has the OG/Twitter tags with an absolute 1200×630 image URL, a canonical URL, and valid `Organization` + `WebSite` JSON-LD
- [ ] `/sitemap.xml` and `/robots.txt` render (robots disallows `/studio`)
- [ ] Header: sticky, 96% white with bottom border, logo · links · CTA at ≥ 820 px; hamburger below 820 px
- [ ] Mobile menu: opens and closes; Escape closes it and focus returns; link click closes it and scrolls; correct `aria-expanded`
- [ ] Hero matches `DESIGN.md`: blue-25 background, eyebrow, two-tone H1, intro, two buttons, three facts, molecule panel with dot grid and four chips (Methylcobalamin filled)
- [ ] Responsive at 360 / 390 / 768 / 1024 / 1280 / 1440 px with no horizontal scroll and chips never overlapping text
- [ ] Reduced motion turns off the chip float and smooth scroll
- [ ] Typecheck, lint, and build pass

## Checks to run

- `node scripts/prepare-brand-assets.mjs`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Manual test steps

1. `npm run dev`, open http://localhost:3000.
2. Check the tab icon. Open `/manifest.webmanifest`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image.jpg`.
3. View page source: find `og:image`, `twitter:card`, `<link rel="canonical">`, and the `application/ld+json` script. Paste the JSON-LD into https://validator.schema.org.
4. Scroll: the header stays on top with its bottom border; content shows faintly through it.
5. Tab from the top: "Skip to content" appears first, then the logo, nav links, and CTA, all with visible focus.
6. Narrow to 819 px: the hamburger appears. Open it, Tab through the links, press Escape (closes, focus back on the toggle), reopen and click a link (closes).
7. Check the hero at 360, 768, 1024, and 1440 px: text stacks above the panel on small screens, the H1 grows from 38 to 60 px, buttons stack below 640 px, and the chips stay clear of each other.
8. DevTools → emulate reduced motion: the chips stop floating.
9. After deploying with `NEXT_PUBLIC_SITE_URL` set, test the URL in https://www.opengraph.xyz.
