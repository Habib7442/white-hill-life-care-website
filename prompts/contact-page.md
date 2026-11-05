# Separate contact page

## Goal

Move the contact details and WhatsApp enquiry form to their own page at `/contact`, and point every contact link on the site to it.

## Skills and docs read

- `AGENTS.md` §1 (a separate `/contact` page was out of scope until the user asked; the user has now asked), §5, §9, §10 (rules 7 and 8), §11, §14 (pages without the hero)
- `PRD.md` §4, §5.6, goal G3
- `DESIGN.md` §3 and the page structure table
- `node_modules/next/dist/docs/` metadata guide

## Existing code inspected

- `components/sections/contact.tsx`: blue details panel and enquiry form card, rendered on the home page
- `components/contact/contact-details.tsx`, `components/contact/enquiry-form.tsx`: stay as they are
- `app/about/page.tsx`, `app/privacy/page.tsx`: page pattern (`SiteHeader solid`, `pt-(--header-height)`, `Breadcrumbs`, `SiteFooter`)
- `lib/seo.ts`: `aboutMetadata` pattern; `app/sitemap.ts`
- `lib/site-nav.ts`: `sectionIds.contact`, `mainNav`, `headerCta`
- Links to `#contact`: `lib/site-nav.ts` (main nav, header button), `components/site-footer/site-footer.tsx`, `components/hero/hero.tsx`, `components/about/about-hero.tsx`, `components/about/about-cta.tsx`, `app/range/[slug]/page.tsx`

## Decisions and assumptions

1. **The Contact section leaves the home page (needs confirmation).** The form then lives in one place, and the home page goes from Quality straight to the "Care for Your Health" banner. Every home button that used to scroll down now opens `/contact`. If you would rather keep the form on both pages, only `app/page.tsx` and the anchor change.
2. **No new form or details code.** The page reuses the existing section, so validation, WhatsApp delivery, consent wording and Sanity details work exactly as today.
3. **No reference image, so the layout follows the site's other inner pages** and `DESIGN.md`. If you have a design, send it and it will replace this layout.
4. **Page heading:** H1 "Contact Us" with one intro line, so the page has a proper top-level heading. The panel's "Get in touch" stays as its H2.
5. **Old `/#contact` links:** a saved link opens the home page at the top. The part after `#` never reaches the server, so it cannot be redirected, and the site is too new for this to matter much.

## Files

| File | Change |
|---|---|
| `app/contact/page.tsx` | New page |
| `components/sections/contact.tsx` | Drop the home anchor id; stays the shared section |
| `app/page.tsx` | Remove `<Contact />` |
| `lib/site-nav.ts` | Add `contactHref = "/contact"`, use it for the main nav and header button, remove `sectionIds.contact`, extend the `NavLink` type |
| `components/site-footer/site-footer.tsx`, `components/hero/hero.tsx`, `components/about/about-hero.tsx`, `components/about/about-cta.tsx`, `app/range/[slug]/page.tsx` | Link to `contactHref` |
| `lib/seo.ts` | `contactMetadata` |
| `app/sitemap.ts` | Add `/contact` |
| `AGENTS.md` | Move `/contact` into scope, add it to the routes table, update the section list and anchors |
| `DESIGN.md` | Update the page structure table |

## Implementation requirements

- Server Component page. It fetches through the existing `getSiteSettings()` inside the section, with no GROQ in components.
- `<SiteHeader solid />` and `pt-(--header-height)` on the first section (AGENTS §14).
- Palette tokens only, no hex values.

## UI

**Visual interpretation:** a calm, plain page. Heading block on white, then the existing blue details panel and form card on the `blue-25` band, then the footer.

**Layout, top to bottom:**
1. Breadcrumbs: Home / Contact
2. H1 and intro, left-aligned, max width ~40rem
3. Existing contact card (5/7 column split from 1024 px, stacked below)

**Typography:** H1 `font-display` 600 `text-black`, 34 px (44 px from `lg`), matching the `/range` page. Intro 16 px (17 px from `lg`) `text-slate-800`.

**Spacing:** 32 px above the breadcrumbs, 32 px to the H1, 16 px to the intro, 40 px below the block (48 px from `lg`).

**Colours:** `white`, `black`, `slate-800`, and the section's existing `blue-25`, `blue-600`, `blue-100`.

**Responsive behaviour:**

| Width | Behaviour |
|---|---|
| 360 px | Single column, details above the form, 16 px gutters, no sideways scroll |
| 768 px | Single column, wider fields |
| 1024 px | Details and form side by side |
| 1440 px | Same, inside the site container |

**States:** the form's idle, invalid and "WhatsApp is opening" states are unchanged. Empty `siteSettings` fields keep today's behaviour. Links keep their existing hover and visible focus styles.

**Pixel expectations:** the contact card looks identical to the one on the home page today.

## Security requirements

No change. The form still sends nothing to any server, opens `wa.me` only after consent, and stores nothing. No new environment variables.

## Compliance check

- **New copy (for client approval):** H1 "Contact Us"; intro "Contact us for product details, stocking enquiries or any other questions."; meta title "Contact Us"; meta description "Contact WhiteHill Lifecares Pvt Ltd for product details and stocking enquiries."
- No claims, statistics or prices. The registered name is used in metadata and the consent line links to `/privacy`.

## Acceptance criteria

1. `/contact` shows the breadcrumbs, H1, details panel and working form, with one H1 on the page.
2. The header nav, header button, mobile menu, footer, hero "Become a distributor", About buttons and `/range` "Send an enquiry" all open `/contact`.
3. No `#contact` link remains in the code.
4. The home page no longer shows the form and has no gap where it was.
5. A valid form submission opens WhatsApp with every field; empty, invalid and unticked consent cases show the same errors as today.
6. `/contact` has its own title, description and canonical URL, and appears in `sitemap.xml`.
7. No sideways scroll at 360, 768, 1024 or 1440 px; the header does not cover the breadcrumbs.
8. `tsc`, lint and build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; screenshots of `/contact` and the home page at 360, 768, 1024 and 1440 px; a browser test of every link in criterion 2 and of the form.

## Manual test steps

1. `npm run dev` and open http://localhost:3000/contact.
2. Click Contact in the header and footer, then "Connect With Us", from `/`, `/about` and `/medicines`.
3. Below 820 px, open the hamburger menu and tap Contact.
4. On the home page, click "Become a distributor".
5. Open a `/range` "Coming soon" page and click "Send an enquiry".
6. Submit the form empty, with a bad email, with a bad phone number, and without ticking consent. Then submit it correctly and check WhatsApp opens with every field.
7. Tab through the page with the keyboard and check the focus outline is visible.
8. Resize to 1024, 768 and 360 px.
9. Open http://localhost:3000/sitemap.xml and find `/contact`.

## Update: home banner (user approved, compliance)

- With the form gone, the home banner sits right after the navy Quality band, so it now has top padding.
- Banner line changed to "Explore our medicines and wellness products, with clear information on every pack." The old "trusted" and "assured quality" wording broke AGENTS §10.3.
