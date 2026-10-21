# Sanity setup and Our Medicines section

## Goal

Connect the site to a new Sanity project (schemas, embedded Studio at `/studio`, typed CDN reads, tag revalidation webhook, seed script) and render the **Our Medicines** section on `/` from Sanity `product` documents.

## Skills and docs read

- `AGENTS.md` §1, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14
- `PRD.md` §5.4 Our Medicines, §6 F3, §9.2–9.3 content flow and Sanity model, §10 assets, §11 open questions
- `DESIGN.md` §2 palette, §3 typography, §4 layout/breakpoints/radius, §5 chip + product card, §7 row 5, §10 accessibility
- `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`, `09-revalidating.md` (`"use cache"` + `cacheLife` + `cacheTag`; `revalidateTag(tag, 'max')` from a Route Handler)
- npm registry: `next-sanity@13.3.4` (peers: `next ^16`, `react ^19.2.3`, `sanity ^5.29 || ^6`, `styled-components ^6.1`), `sanity@6.20.0`, `@sanity/image-url@2.1.1` — all compatible with Next 16.4 / React 19.3
- To read during implementation (after install): `next-sanity` README (Studio embedding, `defineQuery`, webhook `parseBody`), `sanity` TypeGen docs, `@sanity/image-url` README

## Existing code inspected

- `app/page.tsx` — renders `SiteHeader` + `Hero` only
- `app/layout.tsx` — renders `<Preloader />` and JSON-LD for every route
- `components/layout/section.tsx` (`Section` with `tone`), `container.tsx`
- `components/typography/eyebrow.tsx` (`index` prop → `05 · …`), `section-heading.tsx`, `company-name.tsx`
- `components/ui/chip.tsx` — `default` (blue-50 / blue-700) and `rx` (navy-900 / white) variants already match DESIGN §5
- `lib/site-nav.ts` — `sectionIds.medicines = "medicines"` already defined and linked from the header
- `app/globals.css` — palette tokens (`blue-25`, `blue-100`, `navy-900`, `ink-muted`, `line` …), radius tokens (`rounded-card` = 22 px)
- `next.config.ts` — `cacheComponents: true`, no `images` config yet
- `.env.example` — only `NEXT_PUBLIC_SITE_URL`; `.gitignore` already has `!.env.example`
- **No product pack images exist in the repo** (not in `public/` or `assets/brand-source/`)

## Decisions and assumptions

### Sanity account (you do this — I can't create accounts)

1. You sign up and create the project in the browser (steps in "Manual setup" below). Done: project ID `ah0gumek`, dataset `production`.

### Content flow

2. **Revalidation by tag, not deploy hook.** PRD §9.1–9.2 says "Sanity webhook → Vercel deploy hook"; AGENTS.md §9 (newer, more specific) says webhook → `/api/revalidate` → tag revalidation and "do not use full Vercel deploy hooks unless asked". I'm following AGENTS.md. Flagging the difference rather than choosing silently.
3. Fetch functions use `"use cache"` + `cacheLife("max")` + `cacheTag("product")` / `cacheTag("siteSettings")`. Pages stay fully static; the webhook calls `revalidateTag(<_type>, "max")`. Long lifetime is safe because the webhook is the refresh trigger.
4. Reads use the CDN client (`useCdn: true`, no token). Sanity's API CDN can lag a few seconds behind a publish, so a refetch triggered by the webhook might pick up the old data. I'll test this on a publish; if it does, the cached fetch switches to `useCdn: false`. That's safe because Next's cache, not Sanity, absorbs the traffic.

### Schemas

5. **Schema extended beyond PRD §9.3** at the user's request, modelled on the reference product page <https://www.mslbiotech.in/products/amerab-dsr-capsules> (fields: category, name, composition + strength, description, dosage form, pack size, storage, therapeutic indications, related products, Rx disclaimer). The client writes all content in Studio. Studio is split into groups (tabs): **Basics · Composition · Details · Images · Website**.

   **`category`** (new document type; replaces the fixed `focusArea` list). The portfolio is expanding (liver, pancreas, gastric), so editors can add a category without a code change.
   - `title`* (e.g. "Bone & Calcium"), `slug`*, `order`

   **`product`**
   | Group | Field | Type | Notes |
   |---|---|---|---|
   | Basics | `name`* | string | brand name only, no ™/® |
   | | `mark` | list `''` / `™` / `®` | rendered as superscript |
   | | `slug`* | slug from name | for Phase 2 detail pages |
   | | `productType`* | list: Pharmaceutical / Nutraceutical / Wellness | matches the hero categories |
   | | `category`* | reference → `category` | shown as the card tag |
   | | `dosageForm`* | list: Tablets, Capsules, Softgel Capsules, Syrup, Suspension, Drops, Sachet / Powder, Gel / Cream, Other | default Tablets |
   | | `schedule`* | list: OTC (not scheduled) / Schedule H / Schedule H1 | replaces `isRx`; Rx tag shows for H and H1; default OTC |
   | Composition | `composition`* | string | short line for the card (the generic name printed on the pack front) |
   | | `unitStatement` | string | e.g. "Each film coated tablet contains:" (as printed) |
   | | `ingredients[]` | `{ingredient*, standard (IP/BP/USP), strength}` | the full strength table, e.g. "Benfotiamine · IP · 150 mg" |
   | | `excipients` | string | default "q.s." |
   | | `colour` | string | e.g. "Red Oxide of Iron" |
   | Details | `description` | text, 3 rows | "supports" wording; validation warns on banned words |
   | | `supports[]` | string list, max 6 | the reference page's "Therapeutic Indications", **renamed and reworded**: each line must start "Helps support…" / "Supports…" (validation **error** if not). Hidden for Schedule H/H1 products (Rx = factual info only, AGENTS §10.2) |
   | | `directions` | string | default "As directed by the Physician." (as printed on packs) |
   | | `pack`* | string | e.g. `10 × 10 Tablets`; help text says use `×` |
   | | `packType` | list: Alu-Alu, Blister, Strip, Bottle, Sachet, Tube, Other | e.g. Nersovia-CD3 = Alu-Alu |
   | | `storage` | text | default "Store in a cool, dry & dark place. Keep medicine out of reach of children." (pack wording) |
   | | `shelfLife` | string | e.g. "24 months" |
   | | `manufacturer` | object `{name, address, licenceNo}` | "Mfd. by" + "Mfg. Lic. No." exactly as printed on the pack |
   | | (auto) caution | — | not a field: Schedule H/H1 cards and pages render the standard caution "Not to be sold by retail without the prescription of a Registered Medical Practitioner." from `schedule` |
   | Images | `packImage`* | image + `alt`* | **front of the 3D pack only** (shown on the card) |
   | | `gallery[]` | image + `alt`* + `caption` each | composition side, licence/marketed-by side, strip. PRD had no alt here; added. **Flat print artwork (dielines with mm dimensions, upside-down panels) is not uploaded**: it's a printer file, not a web image |
   | | `leaflet` | file (PDF only) | optional product leaflet for doctors and distributors |
   | Website | `relatedProducts[]` | references → `product`, max 3, can't be itself | "Related formulations" on Phase 2 pages |
   | | `order` | number | |
   | | `visible` | boolean, default true | |
   | | `seo{title, description}` | optional | Phase 2 detail pages; falls back to name + composition |

   **Validation on all free-text product fields:** a custom rule flags `treat`, `cure`, `prevent`, `heal`, `fight`, `guarantee`, `relief`, `management of`. It's a **warning**, so editors can still publish while you review, except in `supports[]`, where it's an error.

   **Not included from the reference, on purpose:**
   - The "Therapeutic Indications" wording ("Relief from…", "Management of GERD", "Reduces…"). These are treatment claims (AGENTS §10.1), so the field is `supports[]` instead.
   - The newsletter, the WhatsApp float, and the extra Terms/Medical Disclaimer pages. They're out of scope or "Could" items.
   - A price or MRP field (AGENTS §10.4).

6. **`siteSettings`** (singleton): the PRD fields (`companyName`, `logo`, `address`, `phone`, `email`, `whatsapp`, `cin`, `gstin`) **plus** `drugLicence` (wholesale drug licence nos., e.g. 20B/21B; distributors check these) and `fssaiLicence` (for nutraceuticals). Both are optional and render only when filled. Studio shows one fixed "Site settings" item (ID `siteSettings`). The type is removed from "Create new", and its duplicate/delete actions are disabled.
7. `siteSettings` is **only the schema** in this task. Rendering it (Contact, footer, JSON-LD) belongs with the Contact section task. **Product detail pages** (`/medicines/[slug]`, like the reference page) are Phase 2 (AGENTS §1). The schema is ready for them, but this task builds only the cards on `/`.
8. PRD §9.3 and AGENTS §8 still describe the old schema (`focusArea`, `isRx`). After approval I update both, so the docs and the code agree.

### Seed data

9. `scripts/seed-sanity.ts` (run once with `npx sanity exec scripts/seed-sanity.ts --with-user-token`) creates the 4 products from PRD §5.4 **exactly as written there**, with `createOrReplace` and fixed IDs (`product-wecalix`, …), so it's safe to rerun:

| name | mark | category | composition | pack | schedule | order |
|---|---|---|---|---|---|---|
| WeCalix | ™ | Bone & Calcium | Calcium Carbonate, Vitamin D3 & Folic Acid Tablets | 10 × 15 Tablets | OTC | 1 |
| Cynovera | ® | Women's Wellness | Myo-Inositol, Folic Acid, Vitamin D3 & Essential Micronutrients | 10 × 10 Tablets | OTC | 2 |
| Nersovia-CD3 | '' | Nerve Health | Benfotiamine, Methylcobalamin, Alpha Lipoic Acid & 6 more (see below) | 10 × 10 Tablets | Schedule H | 3 |
| Haemoverse | ™ | Iron & Haemoglobin | Ferrous Ascorbate & Folic Acid Tablets | 10 × 10 Tablets | OTC | 4 |

   - Nersovia's full composition with strengths goes into `ingredients[]` (all 9 rows from PRD); the short `composition` string is the full PRD line, since PRD gives no shorter version — I won't abridge product facts. (Card handles long text; see layout.)
   - The 4 categories are seeded as `category` docs (order 1–4). `productType`, `storage`, `shelfLife`, `manufacturedBy`, `supports[]` are left for the client (only `storage` gets its default).
   - Nersovia-CD3 seeded as Schedule H because PRD says Rx: yes. Exact schedule (H vs H1) is client to confirm.
   - `description`: **left empty** for all 4. PRD gives none, and I won't write medicine benefit copy. The card hides the line when empty. You/client write them in Studio using "supports" wording.
   - `dosageForm: "Tablets"`, `visible: true`.
   - **Pack artwork received for Nersovia-CD3 (2 versions) disagrees with itself**, so only PRD values are seeded until the client confirms:

     | Item | 3D mockup | Flat print artwork | PRD |
     |---|---|---|---|
     | Inositol | 300 mg | **100 mg** | 300 mg |
     | Methylcobalamin / Alpha Lipoic Acid standard | – / – | IP / USP | – |
     | Spelling | Calcium Citrate **Malate** | Calcium Citrate **Maleate** | Malate |
     | Mfd. by | Bio Altus Pharma Pvt. Ltd., Haridwar (Uttarakhand) | Dr. Edwin Medilabs Pvt. Ltd., Kurali (Punjab) | – |
     | Mfg. Lic. No. | 1191-OSP(H) & 1191-B | 1874-OSP & 1894-B | – |

     `manufacturer` and `standard` columns are left empty in the seed; the client fills them in Studio once confirmed.
   - Packs print "Marketed by: WhiteHill Lifecares Pvt Ltd, Bye lane 6, Pub Sarania, Chandmari, Guwahati, Kamrup, Assam, India Pin-781003". This is the first company address we've seen (PRD §11 open question), but it's **not seeded**; the client confirms it and enters it in Site settings.
   - The packs' front badges ("Supports Nerve Health", "Muscle Function", "Metabolic Support") are the model for `supports[]` wording. Nersovia-CD3 is Rx, so its `supports[]` stays hidden on the site per AGENTS §10.2, even though the pack prints them.
   - **Pack images:** the 3D mockup the client sent combines the front and two side panels in one image. For each product I crop it into `assets/products/<slug>.png` (front 3D pack → `packImage`) and `<slug>-composition.png`, `<slug>-licence.png` (→ `gallery`). The script uploads from `assets/products/<slug>.(png|jpg|webp)` if present and sets `packImage.alt` per AGENTS §5 pattern, e.g. `"WeCalix — Calcium Carbonate, Vitamin D3 & Folic Acid tablets, 10 × 15 pack"`. **You need to drop the 4 pack images there** (PRD §10 says they were received, but they're not in the repo). If missing, the product is created without an image and won't render until you add one in Studio.
   - Rx/OTC and exact strengths are "client to confirm" (PRD §5.4) — seeded as given, flagged below.

### Medicines section (`DESIGN.md` §5 product card, §7 row 5)

10. Placed in `app/page.tsx` after `Hero`. Sections About/Focus Areas are not built yet; Medicines slots in their correct order later.
11. Eyebrow `03 · OUR MEDICINES` (About = 01, Focus = 02 per page order), H2 **"Our Medicines"**, disclaimer paragraph (exact AGENTS §10.5 text) under the heading.
12. If no products come back, the section shows a short muted line ("Product information will be available here soon.") rather than an empty grid. Header link still works.
13. **Preloader moves from `app/layout.tsx` to `app/page.tsx`**, otherwise its splash overlays the Studio at `/studio`. Behaviour on `/` is unchanged.

## Manual setup (you, before I run the seed)

Done: account created, project **WhiteHill Lifecares**, ID **`ah0gumek`**, dataset `production`. Sanity's own "getting started" page (separate `studio/` + new `web/` app, standalone Studio) is **not followed**: this repo already is the Next.js app and the Studio is embedded at `/studio` (AGENTS.md §1, §9).

Remaining:
1. <https://www.sanity.io/manage/project/ah0gumek> → **API → CORS origins → Add**: `http://localhost:3000`, **Allow credentials** ✔ (needed for the embedded Studio). Add the Vercel URL later.
2. Check **Datasets** → `production` is **Public**.
3. Run `npx sanity login` once in this folder (opens the browser). The seed then runs with `sanity exec --with-user-token`, so **no API token is created or stored**. `SANITY_API_WRITE_TOKEN` stays in `.env.example` as optional, for CI or other machines.
4. Put the 3D pack mockups in `assets/products/` (see Seed data).

The webhook (`/api/revalidate`) is configured after deploy, since Sanity can't reach `localhost`. Steps go in the closing report.

## Files to create or modify

| File | Change |
|---|---|
| `package.json` | add `sanity`, `next-sanity`, `@sanity/image-url`, `styled-components`; scripts `typecheck`, `typegen`, `seed` |
| `sanity.config.ts` | `defineConfig` — projectId/dataset from env, `basePath: "/studio"`, `structureTool` with singleton structure, `visionTool` |
| `sanity.cli.ts` | CLI config (for `sanity typegen` and `sanity schema extract`) |
| `sanity/env.ts` | read + assert `NEXT_PUBLIC_SANITY_*` env vars |
| `sanity/structure.ts` | Desk: "Site settings" singleton, then "Products" list ordered by `order` |
| `sanity/schemaTypes/index.ts`, `product.ts`, `category.ts`, `siteSettings.ts` | schemas per decisions 5–6 |
| `sanity/lib/claim-check.ts` | banned-word validation rule shared by product text fields |
| `app/studio/[[...tool]]/page.tsx` | `NextStudio` with `metadata`/`viewport` from `next-sanity/studio` (route segment `dynamic` export is not allowed with `cacheComponents`; follow the next-sanity docs for the cacheComponents case) |
| `lib/sanity/client.ts` | `createClient` (CDN, no token, `perspective: "published"`) |
| `lib/sanity/image.ts` | `urlFor()` builder |
| `lib/sanity/queries.ts` | `defineQuery` GROQ for products (PRD query + `_id`, filtered so incomplete docs are skipped) and siteSettings |
| `lib/sanity/fetch.ts` | `getProducts()`, `getSiteSettings()` — `"use cache"`, `cacheLife("max")`, `cacheTag(...)` |
| `lib/sanity/types.ts` (generated) → `sanity.types.ts` at root | TypeGen output |
| `app/api/revalidate/route.ts` | POST; `parseBody` from `next-sanity/webhook` with `SANITY_REVALIDATE_SECRET`; 401 on bad/missing signature, 400 on missing `_type`; `revalidateTag(_type, "max")` |
| `components/sections/medicines.tsx` | Server Component section |
| `components/product-card.tsx` | presentational card |
| `app/page.tsx` | add `<Medicines />`, add `<Preloader />` |
| `app/layout.tsx` | remove `<Preloader />` |
| `next.config.ts` | `images.remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }]` |
| `scripts/seed-sanity.ts` | one-off seed (above), via `sanity exec --with-user-token` |
| `.env.example` | add the Sanity + revalidate vars from AGENTS §12 (Web3Forms var added with the form task) |
| `app/robots.ts` | already disallows `/studio` — verify only |
| `AGENTS.md` §8, `PRD.md` §9.3 | update the data model to match the new schema |

## Implementation requirements

### Query

```groq
*[_type == "product" && visible == true
  && defined(name) && defined(composition) && defined(category)
  && defined(packImage.asset) && defined(packImage.alt)]
| order(order asc) {
  _id, name, mark, "slug": slug.current, composition,
  description, dosageForm, pack, schedule,
  "category": category->title,
  packImage{ alt, asset->{ _id, url, metadata{ dimensions, lqip } } }
}
```

- Filtering in GROQ means incomplete docs never reach the UI (AGENTS §8). `visible == true` also excludes docs where `visible` is unset — the schema defaults it to `true`, and the seed sets it.
- Types come from TypeGen (`ProductsQueryResult`), no hand-written duplicates, no `any`.

### Product card (`components/product-card.tsx`)

Card: `rounded-card` (22 px), 1 px `border-blue-100`, `bg-white`, no shadow, `overflow-hidden`, flex column, full height in grid.

1. **Image panel** — `bg-blue-25`, height 300 px (240 px below 640 px), padding 24 px. `next/image` with `fill`-free explicit `width`/`height` from asset dimensions, `className="h-full w-full object-contain"`, `sizes="(min-width: 1024px) 560px, 100vw"`, `loading="lazy"` (below fold), `placeholder="blur"` with `lqip`. URL built with `urlFor(...).width(1120).fit("max").auto("format")`. Never cropped (no hotspot crop on the card).
2. **Body** — padding 28 px (24 px mobile), gap 12 px.
3. **Tags row** — `Chip` default with the category title; `Chip variant="rx"` reading **"Rx"** when `schedule` is H or H1, with `aria-label`/visually hidden text "Prescription only" for screen readers.
4. **Brand name** — `h3`, `font-heading`, 30 px desktop / 26 px mobile, `font-bold`, `text-navy-900`; `mark` rendered as `<sup className="text-[0.5em] ml-0.5">`.
5. **Composition** — 15 px, `font-medium`, `text-blue-600`.
6. **Description** — 15 px, `text-ink-muted`, leading 1.6; omitted entirely when empty.
7. **Footer row** — `mt-auto`, `border-t border-line`, `pt-4`, 14 px `text-ink-muted`: "**Dosage form:** Tablets" · "**Pack:** 10 × 10 Tablets", labels `font-semibold text-ink`. Each part omitted if its field is empty; the row is omitted if both are.

- Rx cards (AGENTS §10.2; `schedule` H/H1): show only factual fields above — no extra copy. Add the small line **"For the use of registered medical practitioners only."** under the footer row on Rx cards (factual HCP framing). ⚠️ placeholder copy, listed for approval.
- The card is not a link (no detail pages in Phase 1).

### Section (`components/sections/medicines.tsx`)

- `Section tone="white" id={sectionIds.medicines}` with `aria-labelledby` → H2 id.
- Header block: `Eyebrow index="03"` "Our Medicines" → `SectionHeading` "Our Medicines" → disclaimer `p`, 15 px `text-ink-muted`, `max-w-2xl`, `mt-4`. Block bottom margin 48 px (40 px mobile).
- Grid: `ul` with `grid gap-6 lg:grid-cols-2 lg:gap-8`, each card in `li`. Single column below 1024 px (DESIGN breakpoints: tablet = single-column cards).
- Scroll margin: anchors already clear the fixed header via existing `--header-height` handling; verify.

### Studio

- `/studio` renders full-viewport Studio; no site header, no preloader.
- `robots.ts` already disallows `/studio`; also `robots: { index: false }` via the Studio metadata export.

## Security requirements

- Seeding uses the logged-in user's token through `sanity exec --with-user-token`; `SANITY_API_WRITE_TOKEN` is optional and, if set, read only by `scripts/seed-sanity.ts`, never imported by app code; `SANITY_REVALIDATE_SECRET` only in the route handler.
- Client components read only `NEXT_PUBLIC_*`. The Studio bundle reads only `NEXT_PUBLIC_SANITY_*`.
- `/api/revalidate` returns 401 for missing/invalid signature, never echoes the body; only POST is exported.
- `images.remotePatterns` allows only `cdn.sanity.io`.
- `.env.local` is gitignored (verified: `.env*` ignored, `!.env.example` whitelisted).

## Compliance check

| Copy | Source | Status |
|---|---|---|
| "03 · Our Medicines", "Our Medicines" | PRD §4 | ✔ |
| Disclaimer | AGENTS §10.5 verbatim | ✔ |
| Product names, compositions, packs, Rx | PRD §5.4 verbatim | ✔ — Rx status/strengths "client to confirm" |
| Descriptions | none written | ✔ — editors fill in, "supports" wording (schema help text says so) |
| "For the use of registered medical practitioners only." (Rx cards) | placeholder | ⚠️ needs approval |
| "Product information will be available here soon." (empty state) | placeholder | ⚠️ needs approval |
| Category tags on cards | product data | ✔ allowed by AGENTS §10.9 (therapy areas only on product data) |
| No prices, MRP, stats, claims | — | ✔ |

## Acceptance criteria

1. `/studio` loads after Sanity login and shows **Site settings** (single, can't create a second), **Categories**, and **Products** (tabbed groups). Typing "cures" in a description shows a warning; a `supports[]` line not starting with "Supports"/"Helps support" blocks publishing.
2. Seed creates 4 categories and 4 products; rerunning doesn't duplicate.
3. `/#medicines` shows the cards in `order` with pack image (uncropped), focus tag, Rx tag on Nersovia-CD3 only, name + superscript mark, composition, dosage form and pack with `×`.
4. A product missing `packImage`/`alt`, or with `visible: false`, does not render; no broken cards.
5. Adding a 5th product in Studio shows it with no code change (after revalidation/redeploy).
6. `POST /api/revalidate` without a valid signature → 401.
7. Only palette tokens used; no hex in components; no Tailwind default colours.
8. 2 × 2 grid ≥ 1024 px, single column below; no horizontal scroll at 360 px.
9. `npx tsc --noEmit`, `npm run lint`, `npm run build` pass; `/` stays static (build output shows `○`/prerendered `/`).

## Checks to run

- `npm run typegen` (schema extract + typegen) — output committed
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build` — confirm `/` is prerendered and `/studio` builds
- `npm run dev` → browser at 360 / 768 / 1024 / 1440 px

## Manual test steps

1. `.env.local` gets `NEXT_PUBLIC_SANITY_PROJECT_ID=ah0gumek`, dataset `production`, API version `2026-10-01`, and a random `SANITY_REVALIDATE_SECRET` (I create it). Run `npx sanity login`.
2. `npm run seed` → expect "4 products written".
3. `npm run dev` → open `http://localhost:3000/studio`, log in → see Site settings, Categories (4), Products (4, in order).
4. Open `http://localhost:3000/#medicines` → 4 cards, Rx tag only on Nersovia-CD3, packs uncropped on light-blue panels.
5. Resize 360 / 768 / 1024 / 1440 → 1 col / 1 col / 2 col / 2 col; text readable, no overflow.
6. Tab through the page → no focusable element inside cards (cards are static); header "Products" link scrolls to the section with the heading visible below the header.
7. In Studio, set Haemoverse "Show on website" off → publish → restart dev (no webhook locally) → card gone. Turn back on.
8. In Studio, remove Cynovera's alt text → that card disappears (not broken). Restore.
9. `curl -X POST http://localhost:3000/api/revalidate -d '{}'` → `401`.
