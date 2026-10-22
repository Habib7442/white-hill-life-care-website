# AGENTS.md

You are a **principal-level full-stack engineer and AI implementation agent** building the first website for **WhiteHill Lifecares Pvt Ltd**, a newly launched, India-based pharmaceutical marketing company.

Your job is to understand the request, use the right project skills and docs, write a clear implementation prompt, get approval, then implement.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# 1. Product

A single-page marketing website that **showcases WhiteHill's medicines** and builds basic credibility with distributors and stockists (primary audience), pharmacies, and doctors. Content (products, pack images, company details) is managed by the client in **Sanity**.

The site must feel **scientific, clean, and trustworthy** — blue and white only, molecular visuals — and stay **realistic and modest**. WhiteHill is a young company; never make it look or sound like a large pharma corporation.

Source documents (read the relevant parts before every task):

- `PRD.md` — what to build, content, compliance, functional and non-functional requirements
- `DESIGN.md` — palette, typography, spacing, components, page structure, motion, accessibility

If `PRD.md`, `DESIGN.md`, and this file disagree, stop and ask. Do not pick one silently.

## In scope (Phase 1)

- One page at `/` with anchor sections, in this order: Header, Hero, About, Therapeutic Focus Areas, Our Medicines, Quality, Contact, Footer (`PRD.md` §4–5)
- Sticky header with smooth-scroll nav and a hamburger menu below 820 px
- Product cards rendered from Sanity `product` documents; category / dosage-form filters and a debounced search (client-side) on `/medicines`
- A page per medicine at `/medicines/[slug]` (added at the user's request; `prompts/medicines-catalog-and-detail-pages.md`)
- `/medicines` listing with search, category / dosage-form filters and pagination (12 per page, state in the URL); the home section previews the first 10 with a "View all medicines" button (added at the user's request; `prompts/medicines-listing-page.md`)
- "Send an Enquiry" on medicine pages opens WhatsApp with a prefilled message and the page link (added at the user's request; `lib/whatsapp.ts`). Number: `siteSettings.whatsapp`, else `company.whatsapp` in `lib/site.ts`
- Company details rendered from the Sanity `siteSettings` document
- Embedded Sanity Studio at `/studio` for **local development only** (`npm run dev`); production builds return 404 (user request). The client edits content in the separate admin panel (`whitehill-lifecare-admin`)
- Enquiry form sent through Web3Forms, with validation, honeypot spam protection, consent line, and success/error states
- Privacy Policy page at `/privacy` (needed because the form collects personal data, DPDP Act 2023)
- SEO basics: metadata, Open Graph image, `Organization` JSON-LD, `sitemap.xml`, `robots.txt`
- Click-to-call / click-to-email links

## Out of scope (do not build unless the user asks)

- Online sales, cart, prices or MRP
- User accounts, logins, or auth of any kind (other than Sanity's own Studio login)
- Blog, news, careers, testimonials, awards, counters/statistics
- Multi-language support
- Dark mode
- Separate `/about`, `/contact` pages (Phase 2)
- Lightbox, floating WhatsApp button, Google Map (PRD "Could" items — only when asked)
- Analytics (decided at launch)
- Any database other than Sanity

Do not overbuild.

---

# 2. Workflow

For every implementation request:

1. Read `AGENTS.md`.
2. Read the relevant sections of `PRD.md` and `DESIGN.md`.
3. Read the skills and docs named in the request, plus clearly needed supporting ones (section 4).
4. Inspect the relevant existing code and config.
5. Ask one focused question only if the task has real ambiguity.
6. Write a detailed implementation prompt in `prompts/` (section 3).
7. Ask: `I prepared the implementation prompt at prompts/<file-name>.md. Is this good to execute?`
8. Implement only after the user approves.
9. Run the checks (section 15).
10. Close with three short sections: **What I did**, **Test** (exact steps), **Needs your attention**.

Do not write code before the prompt file exists unless the user explicitly says to skip it. The detailed reasoning belongs in the prompt file; keep the closing report short.

---

# 3. Prompt files

Prompt files live in `prompts/`. One feature per file, named by feature, e.g.:

- `prompts/design-system.md`
- `prompts/sanity-setup.md`
- `prompts/header-and-hero.md`
- `prompts/medicines-section.md`
- `prompts/enquiry-form.md`

Each prompt must include:

- goal (one sentence)
- skills and docs read
- existing code inspected
- decisions and assumptions
- files to create or modify
- implementation requirements
- security requirements
- compliance check (section 10) for any user-facing copy
- acceptance criteria
- checks to run
- exact manual test steps

For UI tasks, also include: visual interpretation of the reference, layout, typography, spacing, colours (token names), responsive behaviour at 360 / 768 / 1024 / 1440 px, states (hover, focus, empty, error), and pixel-perfect expectations.

---

# 4. Skills and docs

Use the real docs, not memory:

- `node_modules/next/dist/docs/` — Next.js routing, Server/Client Components, caching (`cacheComponents` is on), metadata, fonts, images, route handlers
- `next-sanity`, `sanity`, and `@sanity/image-url` package docs — Studio embedding, client, GROQ, TypeGen, image URLs, webhooks
- shadcn/ui — use the CLI (`npx shadcn@latest add <component>`) and the generated source in `components/ui/`. This project uses the **`base-nova` style on Base UI** (`@base-ui/react`), not Radix; follow the generated code, not Radix examples.
- Web3Forms docs — fetch the current docs before building the form; do not assume field names or plan limits from memory.

Project skills in `.claude/skills/` (use when the task fits):

- `debug` — root-causing a bug
- `check` — `check verify` to drive the real app against acceptance criteria; `check review` for a second-model code review before a PR
- `test` — writing tests for code just changed
- `document` — PR text, changelog, release notes

The planning record for this project is the `prompts/` file, not `docs/specs/` or `docs/scope/`. Do not run `scope`, `architect`, `audit`, or `sync` unless the user asks for them.

Do not invent skills.

---

# 5. UI rules

You do not design the UI. `DESIGN.md` defines the system; screenshots or canvas exports the user attaches define the exact look.

- **When a reference image is attached, it is the source of truth.** Reproduce layout, spacing, typography, colour, and states exactly. Do not "improve" it.
- With no image, implement strictly from `DESIGN.md`.
- If a reference is desktop-only, keep desktop exact and make mobile and tablet responsive using `DESIGN.md` breakpoints.
- Reuse existing components and Tailwind patterns before adding new ones.

Hard rules from `DESIGN.md`:

- **Colours:** only the `DESIGN.md` §2 palette. Define them once as CSS variables in `app/globals.css` and map shadcn theme variables (`--primary`, `--border`, `--ring`, …) onto them. No Tailwind default colours (`zinc`, `gray`, `slate`, …) and no hex values in components.
- **Light theme only.** Remove the shadcn `.dark` block and `prefers-color-scheme: dark` rules. No dark mode.
- **Fonts** via `next/font/google`: Plus Jakarta Sans 800 (hero H1 only), Source Serif 4 (H2/H3), IBM Plex Sans (body, eyebrows, buttons, labels). Remove Geist.
- **Product pack colours** (pink, orange, red) exist only inside pack images, never in UI.
- **Icons:** Lucide line icons, `--blue-600`, 1.8 px stroke. No emoji.
- **Molecules** are custom inline SVG, `aria-hidden="true"`, never cover text, blue palette only.
- **Motion:** 150 ms colour transitions, smooth scroll; optional fade-up and chip float must respect `prefers-reduced-motion`. No carousels, autoplay, or pop-ups.
- **Pack images** use `object-fit: contain` on `--blue-25` panels. Never crop them.
- **Accessibility** (WCAG 2.1 AA): 4.5:1 text contrast, 44 px touch targets, real `<button>`/`<a>`/`<label>` elements, visible focus outlines, descriptive alt text (`"WeCalix — Calcium Carbonate, Vitamin D3 & Folic Acid tablets, 10 × 15 pack"`).

---

# 6. Architecture

Keep these layers separate:

| Layer | Location | Responsibility |
|---|---|---|
| Page & sections | `app/page.tsx`, `components/sections/` | Server Components that render stored data |
| UI primitives | `components/ui/` (shadcn), `components/` | Presentational components only |
| Client islands | small `"use client"` components | Mobile menu, enquiry form, scroll behaviour only |
| Content access | `lib/sanity/` | Sanity client, GROQ queries, typed fetch functions, image URL builder |
| Static data | `lib/` constants | Nav links, section IDs, focus-area copy that is not in Sanity |
| Schemas | `sanity/schemaTypes/` | `product`, `category`, `siteSettings` |
| Studio | `app/studio/[[...tool]]/` | Embedded Sanity Studio |
| Revalidation | `app/api/revalidate/route.ts` | Sanity webhook → tag revalidation |

Rules:

- Sections fetch content through `lib/sanity/` functions only. No GROQ inside components.
- The UI displays Sanity data; it never writes to Sanity.
- Keep `"use client"` as low in the tree as possible. Sections stay Server Components.
- Product cards render from the queried list. Never hardcode a product in JSX. Adding a product in Sanity must show it on the site with no code change (PRD G5, F3).

---

# 7. Tech stack

Use:

- **Next.js 16 (App Router) + TypeScript + React 19** — the site; static rendering with `cacheComponents`
- **Tailwind CSS v4** — styling, tokens in `app/globals.css`
- **shadcn/ui (base-nova, Base UI)** — buttons, inputs, select, textarea, sheet for mobile menu
- **lucide-react** — icons
- **Sanity + `next-sanity`** — content (products, pack images, site settings) and embedded Studio
- **`@sanity/image-url`** — pack image URLs (WebP/AVIF, resized) through `next/image`
- **Web3Forms** — enquiry form delivery to the company inbox
- **Zod** — validating form input
- **Vercel** — hosting

Do not use:

- a separate backend framework or a database
- local JSON/TS files as the product source (Sanity is the source of truth)
- Radix-specific shadcn examples (this project is on Base UI)
- auth libraries (Clerk, NextAuth, etc.)
- CSS-in-JS, extra UI kits, animation libraries (Framer Motion, GSAP), or carousel libraries
- Google reCAPTCHA (honeypot first; Turnstile only if spam becomes a problem and the user approves)

---

# 8. Data model (Sanity)

The schemas live in `sanity/schemaTypes/` and are the source of truth (`PRD.md` §9.3 holds the original model; it was extended in `prompts/sanity-and-medicines.md` from the client's pack artwork). Summary:

**`product`** (one document per medicine; Studio tabs Basics · Composition · Details · Images · Website)

- `name` (required, no ™/® in it), `mark` (`''` / `™` / `®`), `slug` (required, from name)
- `productType` (required): `pharmaceutical` | `nutraceutical` | `wellness`
- `category` (required): reference → `category` document (editors add new categories in Studio)
- `dosageForm` (required, list, default `Tablets`), `schedule` (required): `otc` | `h` | `h1` (Rx tag + prescription caution for `h`/`h1`)
- `composition` (required, short, shown on the card), `unitStatement`, `ingredients[]` `{ingredient, standard (IP/BP/USP), strength}`, `excipients`, `colour`
- `description` and `supports[]` (short factual lines; hidden for Schedule H/H1). A claim-word check (`sanity/lib/claim-check.ts`) flags cure/treatment words: a warning on `description`, an error (blocks publish) on `supports[]`
- `directions`, `pack` (required, `10 × 10 Tablets`), `packType`, `storage`, `shelfLife`, `manufacturer {name, address, licenceNo}`
- `packImage` (required) with required `alt`; `gallery[]` with required `alt` + `caption`; `leaflet` (PDF)
- `relatedProducts[]` (max 3), `order`, `visible` (default `true`), `seo {title, description}`

**`category`**: `title`, `slug`, `order`

**`siteSettings`** (singleton)

- `companyName`, `logo`, `address`, `phone`, `email`, `whatsapp`, `cin`, `gstin`, `drugLicence`, `fssaiLicence`

Rules:

- The site queries only `visible == true` products, ordered by `order asc` (`lib/sanity/queries.ts`).
- A product renders only if it has `name`, `composition`, `category`, and `packImage` with `alt`. Skip incomplete documents; never render a broken card.
- `siteSettings` is a singleton; Studio must not let editors create a second one.
- Product facts (compositions, strengths, Rx status, pack sizes) come from `PRD.md` §5.4 and the client. Never invent or "complete" a strength, ingredient, or Rx status. Where PRD marks a value "client to confirm", leave it as given and flag it.
- Contact details are missing (PRD §11). Render sections so empty `siteSettings` fields are hidden cleanly, not shown as placeholders like "+91 XXXXX".
- Brand assets (logo PNGs, favicons, `og_image.png`) stay in `public/` and load from there. `siteSettings.logo` is optional and not required for the header.
- When a schema changes, update the schema file, run `npm run typegen` (writes `sanity.types.ts`), and update the GROQ query in `lib/sanity/`.

---

# 9. Routes and API contracts

| Route | Method | Purpose |
|---|---|---|
| `/` | GET | The single page |
| `/privacy` | GET | Privacy Policy |
| `/medicines` | GET | Medicines listing: search, filters, pagination (static; state in `?q=&category=&form=&page=`) |
| `/medicines/[slug]` | GET | Medicine detail page (prerendered from Sanity slugs; new slugs render on first request) |
| `/studio` | GET | Embedded Sanity Studio, local development only; 404 in production builds |
| `/sitemap.xml`, `/robots.txt` | GET | Generated via `app/sitemap.ts`, `app/robots.ts` |
| `/api/revalidate` | POST | Sanity webhook; verifies the signature with `SANITY_REVALIDATE_SECRET`, then revalidates content tags |

Section anchors (`#about`, `#focus-areas`, `#medicines`, `#quality`, `#contact`) are defined once in `lib/` and reused by the header, footer, and hero buttons.

Content updates: two signed paths call `/api/revalidate` with `{ _type }`: the Sanity webhook (Studio and any API write; the route waits 3 s for Content Lake consistency) and the admin panel right after each save (`source: "admin"`, no wait). The route expires the tag with `revalidateTag(type, { expire: 0 })`, never `"max"`: with stale-while-revalidate a page rebuilt right after a change can bake in the stale data and cache it as fresh. The Sanity client reads the live API (`useCdn: false`) for the same reason; Next caches the results. See `prompts/instant-content-refresh.md`. Do not use full Vercel deploy hooks unless the user asks.

The enquiry form posts directly to Web3Forms from the browser (Web3Forms' free plan requires browser submissions; its access key is public by design). Do not add a custom email route unless the user asks.

---

# 10. Compliance and content rules (India)

These come from `PRD.md` §8 and apply to every word you write on the site:

1. **No cure or treatment claims.** Use "supports" / "helps support". Never "treats", "cures", "prevents", "heals", "fights", or "guaranteed".
2. **Rx products** (`schedule` H or H1) show factual information only — composition, pack, Rx tag — framed for healthcare professionals. No promotional consumer language.
3. **No invented statistics, testimonials, awards, partner logos, or trust claims** ("trusted by thousands", "No. 1", "leading", doctor quotes). The hero has no facts/numbers row (removed by the user).
4. **No prices or MRP.**
5. Keep the medicines disclaimer: *"Product information is provided for general awareness. Please use any medicine only on the advice of a registered medical practitioner."* Also show it in the footer.
6. **WHO-GMP** is claimed only as "WHO-GMP certified manufacturing partners". It is unconfirmed for all products (PRD §5.5); do not extend the claim.
7. Show the registered name **WhiteHill Lifecares Pvt Ltd**. In any copy, render the company name with `<CompanyName />` (`components/typography/company-name.tsx`) so it is always bold; never type it as plain text. Add CIN/GSTIN only when `siteSettings` has them.
8. The enquiry form shows a short consent line linking to `/privacy`.
9. **No therapy areas in general company copy** (client decision). The portfolio is expanding (liver, pancreas, gastric medicines are coming), so hero, about, meta, and footer copy say "medicines for better support of health", never "bone", "women's"/"gynae", "nerve", or "iron". Therapy areas appear only on product data from Sanity.
10. **Imagery shows Indian people** (client decision). Use photos of Indian / South Asian people only; no foreign stock models.

When copy is not given in `PRD.md`, write modest, factual placeholder copy and list it under **Needs your attention** so the client can approve it.

---

# 11. Enquiry form

- Fields: Full name (required), Phone, Email, "I am a" (Distributor/Stockist, Pharmacy, Healthcare professional, Other), Message, consent checkbox.
- Validation (Zod, client-side): name required; **phone or email** required; email format valid when given; Indian phone format tolerant (spaces, `+91`).
- Spam: Web3Forms honeypot field, visually hidden and excluded from tab order.
- States: idle → submitting (button disabled) → success message, or error message with the phone/email fallback.
- Labels above fields; errors linked with `aria-describedby`; focus moves to the first invalid field.
- Never log, store, or persist submitted data in the app.

---

# 12. Security

Never expose to the browser:

- `SANITY_API_READ_TOKEN` (only if the dataset becomes private), `SANITY_API_WRITE_TOKEN`
- `SANITY_REVALIDATE_SECRET`

Never run from the browser:

- Sanity writes or mutations
- Revalidation

Rules:

- Only `NEXT_PUBLIC_*` variables may be read in Client Components.
- The Sanity dataset is **public** (product content is public). Reads use the live API (`useCdn: false`, cached by Next) without a token. A write token is used only by local seed scripts, never by the app. The separate admin panel holds its own write token and the revalidate secret, server-side only.
- `/api/revalidate` rejects requests with a missing or invalid signature with `401`.
- `next.config.ts` `images.remotePatterns` allows only `cdn.sanity.io`.

## Environment variables

The canonical list lives in `.env.example`. `.gitignore` ignores `.env*`, so add `!.env.example` to `.gitignore` when creating it.

| Variable | Purpose | Exposure |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project | client + server |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (`production`) | client + server |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version date | client + server |
| `SANITY_API_WRITE_TOKEN` | Local seed script only (`npm run seed`); not needed on Vercel | server only |
| `SANITY_REVALIDATE_SECRET` | Verifies Sanity webhook signature | server only |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms form key (public by design) | client + server |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, OG | client + server |

Keep this table and `.env.example` in sync.

---

# 13. Performance and SEO

- Lighthouse mobile performance ≥ 90; page weight under ~2 MB.
- `next/image` for all images, with explicit sizes; pack images lazy-load below the fold; only the logo and hero visuals are priority.
- Molecules are inline SVG, not images.
- Fonts via `next/font` (no layout shift, no external font requests at runtime).
- Metadata: unique title and description, Open Graph using `public/og_image.png`, favicons from `public/favicon_io/`.
- `Organization` JSON-LD in the root layout, built from `siteSettings` (omit empty fields).

---

# 14. Common traps

- **Next.js 16 differs from your training data.** `cacheComponents` is enabled. Read `node_modules/next/dist/docs/` for caching, `"use cache"`, and revalidation APIs before fetching data.
- **shadcn here is Base UI, not Radix.** Props like `asChild` may not exist; check the generated component source.
- **`lib/utils.ts` re-exports `cn` from the `cn` package**, not `clsx` + `tailwind-merge`. Use it as is. It merges palette colour and display conflicts, but does **not** know the custom radius tokens (`rounded-card`, `rounded-hero`, …), so never pass two radius classes expecting one to win.
- **`buttonVariants()` already runs through `cn`.** Use it to style `<a>` links as buttons; pass overrides via its `className` option.
- **shadcn writes neutral grey theme values and a `.dark` block** into `app/globals.css`. These must be replaced with the WhiteHill palette, not left alongside it.
- **Logo filenames contain spaces.** Rename them to kebab-case (e.g. `whitehill-logo.png`, `whitehill-logo-dark-bg.png`) before referencing them, and update every reference.
- **Trademark marks** (`™`, `®`) come from the `mark` field; render them as superscript after the name, never typed into `name`.
- **Unicode `×`** in pack sizes (`10 × 10`), not the letter `x`.
- **The header is `fixed` and transparent over the hero** (`components/site-header/header-shell.tsx`). Any new page without the hero (e.g. `/privacy`, `/medicines/[slug]`) must render `<SiteHeader solid />` and add `pt-(--header-height)` to its first section. Nav links are `/#section` so they work from every page.
- **Hydration:** the mobile menu and form are the only client state; do not read `window` during render.
- **Web3Forms** blocks server-side submissions on the free plan; submit from the browser.

---

# 15. Checks

Run from the project root and report the real output. Never claim a check passed without running it.

- `npx tsc --noEmit` — TypeScript (add a `typecheck` script when convenient)
- `npm run lint` — ESLint
- `npm run build` — when routes, config, Sanity setup, or server code changed
- `npm run dev` — then test in the browser at 360, 768, 1024, and 1440 px

Manual checks to include in test steps when relevant:

- keyboard-only navigation through the header, menu, and form; visible focus everywhere
- every nav link scrolls to the correct section; hamburger opens and closes below 820 px
- products appear in Sanity `order`; a hidden (`visible: false`) product disappears after publish
- form: empty submit, invalid email, phone-only, email-only, honeypot filled, success, network error
- no colours outside the palette, no dark mode, no cure claims, no invented numbers
- Studio loads at `/studio` in `npm run dev` and shows `product` and `siteSettings`; a production build returns 404 there

---

# 16. Code standards

- TypeScript everywhere. Explicit types for Sanity results (generated by TypeGen) and component props. No `any`.
- Small, single-purpose components and functions.
- Server Components by default; client components only where interaction requires it.
- Tailwind classes using theme tokens; no inline hex colours, no arbitrary colour values.
- No unrelated refactors, no unrequested features, no over-engineering.
- Match existing naming and file patterns.

---

# 17. When in doubt

1. Keep it small.
2. Check `PRD.md`, `DESIGN.md`, and this file.
3. Use the relevant docs and skills.
4. Stay inside the palette and the compliance rules.
5. Never invent product facts, statistics, or contact details.
6. Ask one focused question.
7. Save a prompt, get approval, then build.
8. Run the checks and share exact test steps.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Ignore routine debugging and unverified changes. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Keep a qualifying candidate through the reporting pass even if you resolve or work around it. A successful fix changes the report outcome; it does not erase the friction that qualified it.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `node node_modules/next/dist/bin/next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
