# Contact section, WhatsApp enquiry form, footer and Privacy Policy

## Goal

Add the Contact section (company details from Sanity `siteSettings` plus an enquiry form that sends the details to the client's WhatsApp with the customer's consent), a site-wide footer, and a `/privacy` page.

## Change from the original plan (user decision)

The user asked for enquiries to go to the client's WhatsApp, not by email. **Web3Forms is dropped.** On submit, the form builds a `wa.me` link to the company WhatsApp number with every field in a prefilled message, and opens it. The customer then presses **Send** in WhatsApp. WhatsApp does not allow a website to send a message on someone's behalf, so the enquiry reaches the client only once the customer sends it.

Effects:
- No third-party form service, no API key, and no data leaves the browser until the customer sends it from their own WhatsApp.
- No honeypot: a bot cannot press Send in WhatsApp, so spam protection (F6) is met by design.
- No network success/error states. Instead there's an "opening WhatsApp" state with a retry link.
- `AGENTS.md` and `PRD.md` are updated to match (see Files).

## Skills and docs read

- `AGENTS.md` §1, §5, §8–§12, §14–§15
- `PRD.md` §5.6 Contact, §5.7 Footer, §6 F4–F8, §8 Compliance
- `DESIGN.md` §2 palette, §4 layout, §5 Buttons / Form fields / Icons, §7 rows 7–8, §10 accessibility
- `lib/whatsapp.ts`: the existing `whatsappHref(number, text)` (normalises a 10-digit number to `91…`, URL-encodes the text)
- Next.js docs in `node_modules/next/dist/docs/`: `"use cache"` / `cacheTag`, Server/Client composition, metadata for `/privacy`

## Existing code inspected

- `app/page.tsx`: Hero and Medicines only
- `lib/sanity/queries.ts` `siteSettingsQuery` + `lib/sanity/fetch.ts` `getSiteSettings()` (tag `siteSettings`; the admin's save already revalidates it)
- Live `siteSettings` (admin): `companyName` "WHITEHILL LIFECARES PRIVATE LIMITED", `address` (9 lines, GST-form "Label: value" layout), `phone` "7002916175", `email` "whitehilllifecarespvtltd@gmail.com", `whatsapp` "7002916175". `cin`, `gstin`, `drugLicence`, `fssaiLicence` are empty.
- `lib/site.ts` (`company.whatsapp` fallback), `lib/site-nav.ts`, `components/layout/*`, `components/typography/*`
- `components/ui/`: only `button.tsx`, `chip.tsx`. `zod` is not installed.
- `lib/seo.ts` `organizationJsonLd()`: static, no contact data
- Pages with `<SiteHeader solid />`: `/medicines`, `/medicines/[slug]`, `not-found`

## Decisions and assumptions

1. **All contact details come from `siteSettings`.** Empty fields aren't rendered (no placeholder, no empty label).
2. **WhatsApp number:** `siteSettings.whatsapp`, else `company.whatsapp` (as on medicine pages). It's passed from the Server Component to the form as a prop. If neither exists, the form isn't shown and the details column remains.
3. **Message format** (plain text; empty fields left out):
   ```
   Hello WhiteHill Lifecares,
   I would like to make an enquiry.

   Name: …
   I am a: …
   Phone: …
   Email: …
   Message: …

   Sent from whitehilllifecares.com
   ```
4. **Validation (Zod, client-side):** Full name required (2–100 chars); Message required (5–1000 chars), so the enquiry isn't empty; Phone optional (Indian, tolerant: spaces, `-`, `+91` / `91` / `0`, then 10 digits starting 6–9); Email optional (valid format when given); "I am a" optional; consent required. The old "phone **or** email required" rule is dropped, because WhatsApp already shows the client the sender's number. Phone stays useful for a different contact number.
5. **Consent** (required checkbox): "I agree to send these details to WhiteHill Lifecares Pvt Ltd on WhatsApp so they can reply to my enquiry. See our Privacy Policy." The company name uses `<CompanyName legal />`, and "Privacy Policy" links to `/privacy`.
6. **Opening WhatsApp:** `window.open(href, "_blank", "noopener,noreferrer")` inside the submit handler (a user gesture, so not popup-blocked). If it returns `null`, fall back to `window.location.assign(href)`. On mobile, `wa.me` opens the WhatsApp app; on desktop, WhatsApp Web or Desktop.
7. **After submit:** the form stays filled and a `role="status"` panel shows: "WhatsApp is opening with your enquiry. Press **Send** in WhatsApp to deliver it." plus an "Open WhatsApp again" link (same href) and a "Start a new enquiry" button that resets. No data is stored.
8. **Address renders as stored** with line breaks (`whitespace-pre-line`). The client should re-enter a clean postal address in the admin (flagged).
9. **Phone display:** a 10-digit number shows as `+91 70029 16175`, with `tel:+917002916175` (helpers in `lib/contact.ts`).
10. **Company name in copy** uses `<CompanyName legal />`, not the all-caps admin value. CIN / GSTIN / drug licence / FSSAI show in the footer only when set.
11. **"I am a"** uses shadcn `native-select` (a real `<select>`). Consent is a native checkbox.
12. **Footer** on `/`, `/medicines`, `/medicines/[slug]`, `/privacy`, not-found (per page, not the root layout, so `/studio` stays clean). Company links: Home, Products, Contact, Privacy Policy. About and Quality are added when those sections exist. Medicine links: first 6 from `getProducts()` + "View all medicines".
13. **Organization JSON-LD** gains `email`, `telephone`, `address.streetAddress` from `siteSettings` when set.
14. **Home order:** Hero → Medicines → Contact. About / Focus Areas / Quality come in a later prompt.

## Files to create or modify

Create:
- `lib/contact.ts`: `formatPhone`, `telHref`, `enquiryRoles`, `enquiryMessage(values)` (builds the text in decision 3)
- `lib/enquiry-schema.ts`: Zod schema + type
- `components/sections/contact.tsx`: Server section
- `components/contact/contact-details.tsx`: Server; address / phone / email / WhatsApp chat link
- `components/contact/enquiry-form.tsx`: `"use client"`; receives `whatsappNumber`
- `components/site-footer/site-footer.tsx`: Server
- `app/privacy/page.tsx`
- `components/ui/input.tsx`, `textarea.tsx`, `label.tsx`, `native-select.tsx` via `npx shadcn@latest add input textarea label native-select`, restyled to tokens (no neutral greys, no `dark:`)

Modify:
- `app/page.tsx`: add `<Contact />`, `<SiteFooter />`
- `app/medicines/page.tsx`, `app/medicines/[slug]/page.tsx`, `app/not-found.tsx`: add `<SiteFooter />`
- `app/sitemap.ts`: add `/privacy`
- `lib/seo.ts` + `app/layout.tsx`: `organizationJsonLd(settings)`
- `package.json`: add `zod`
- `AGENTS.md`: §1 in-scope line ("Enquiry form opens WhatsApp with the details prefilled, after consent; added at the user's request"), §4 remove the Web3Forms docs line, §7 replace Web3Forms with "WhatsApp (`wa.me`) for enquiries", §9 replace the Web3Forms paragraph, §11 rewrite validation/spam/states to match, §12 nothing to add (no new env var), §14 remove the Web3Forms trap, §15 update the form test list
- `PRD.md`: F4 → "Enquiry form opens the company WhatsApp with the details prefilled (user decision)"; F5 → name + message required; F6 → "met by design: the customer sends the message from their own WhatsApp"; §9.1/§9.2 form rows; §13 "Enquiry form opens WhatsApp with all details prefilled"; §11 Q5 answered

## Implementation requirements

### Contact section (`#contact`, `tone="tint"`)
- Eyebrow `Contact`, H2 "Get in touch", intro: "Distributors, stockists, pharmacies and healthcare professionals can send us an enquiry on WhatsApp, or call or email us."
- ≥ 1024 px: details left (~5/12), form card right (~7/12). Below that they stack, details first.
- Detail rows: Lucide icon (`MapPin`, `Phone`, `Mail`, `MessageCircle`; `text-blue-600`, `strokeWidth={1.8}`) in a 44 px `bg-blue-50 rounded-tile` tile, a 14 px medium label ("Registered office", "Phone", "Email", "WhatsApp"), and the value. Phone, email and WhatsApp are links with a ≥ 44 px hit area. Email gets `break-all`.
- Form card: white, `rounded-card`, 1 px `border-blue-100`, `p-6 lg:p-10`, no shadow. Card heading: "Send an enquiry on WhatsApp".

### Enquiry form
- Fields in order: Full name*, Phone, Email (side by side ≥ 640 px), I am a (select, placeholder "Select one"), Message* (textarea, 4 rows, counter `n/1000`), consent*.
- Validate on submit; after the first submit, re-validate on blur. Errors under the field (`text-error`, 14 px) via `aria-describedby`; `aria-invalid` on the field; focus moves to the first invalid field.
- Submit button: primary, `MessageCircle` icon, "Send on WhatsApp", full width < 640 px.
- Field values are trimmed before going into the message; the user's input isn't put anywhere except the `wa.me` text parameter. No `console.log` of values. No storage.

### Footer
- White, 1 px top `border-line`, `py-12 lg:py-16`.
- Row 1 (desktop 4 cols, brand spans 2; tablet 2; mobile 1): logo `public/brand/whitehill-logo.webp` (~120 px, not priority), `company.description`, address / phone / email from `siteSettings` · "Company" · "Medicines". Headings 14 px semibold `text-navy-900`; links 15 px `text-ink-muted` → `text-blue-600`, `py-2.5` on mobile for 44 px targets.
- Row 2 (top border): `medicinesDisclaimer` (14 px `text-ink-faint`), then `© {year} <CompanyName legal />. All rights reserved.`, plus CIN · GSTIN · Drug licence · FSSAI when set.
- Year: check the Next docs for reading `Date` under `cacheComponents`. Render it inside a cached component so prerender doesn't break.

### Privacy Policy (`/privacy`)
- `<SiteHeader solid />`, first section `pt-(--header-height)`, `Breadcrumbs` (Home › Privacy Policy), H1 "Privacy Policy", "Last updated: <implementation date>", 720 px prose.
- Placeholder copy (DPDP Act 2023): who we are (`<CompanyName legal />`, address and email from `siteSettings`); what we collect (only what you type in the form, and your WhatsApp number when you send it); how it reaches us (the site opens WhatsApp on your device with your details; nothing is sent or stored by this website; WhatsApp's own privacy policy applies to the message); why (to reply to your enquiry); how long (only as long as needed for your enquiry and any business that follows); your rights (access, correction, erasure, withdraw consent; contact by email/phone); no cookies or analytics today; changes; contact.
- Metadata: title "Privacy Policy", one-line description, canonical `/privacy`.

## Security requirements

- No env vars, keys, or tokens used by the form.
- No submitted data is logged, stored, or sent to any server by the site; it only goes into the `wa.me` URL the customer opens.
- `siteSettings` strings render as escaped React text. The address uses CSS `pre-line`, never `dangerouslySetInnerHTML`. JSON-LD keeps the `<` escaping.
- `tel:` / `mailto:` / `wa.me` hrefs are built from digits / a validated email only. New-tab links use `rel="noopener noreferrer"`.

## Compliance check (AGENTS §10)

- No cure/treatment words, statistics, testimonials or "trusted/leading" claims. ✔
- No therapy areas in contact, footer or privacy copy. ✔
- Disclaimer in the footer. ✔ Registered name via `<CompanyName legal />`. ✔ CIN/GSTIN only when set. ✔
- Consent line links to `/privacy` and says the data goes to WhatsApp. ✔
- No prices, no new WHO-GMP claim. ✔

## UI details

- **Reference:** none, so this follows `DESIGN.md` §7 rows 7–8.
- **Typography:** H2 Source Serif 4 (`SectionHeading`); the rest IBM Plex Sans. Labels 14 px medium `text-ink`; inputs 15 px; help/counter 13 px `text-ink-muted`.
- **Colours (tokens only):** `bg-blue-25` section; `bg-white` card/footer; `border-blue-100`, `border-line`, `border-field`; focus `outline-2 outline-blue-600`; `text-error` / `border-error`; links `text-blue-600` → `text-blue-700`.
- **Fields:** min-h 48 px, `rounded-tag`, `px-4`, white, placeholder `text-ink-faint`. 20 px between fields, 8 px label→field, 6 px field→error.
- **Responsive:** 360: one column, `p-6`, full-width button, email wraps · 768: stacked, phone/email side by side · 1024: 5/7 columns · 1440: capped at 1240.
- **States:** hover, `focus-visible` on every control incl. checkbox/select, invalid, "opening WhatsApp" status, empty settings.

## Acceptance criteria

1. `/#contact` shows address, phone `+91 70029 16175`, email and WhatsApp from the admin; editing them in the admin updates the site after save.
2. A cleared admin field hides that row.
3. Empty submit shows name, message and consent errors; focus goes to Full name.
4. Invalid email or a 9-digit phone fails; leaving both phone and email empty passes.
5. A valid submit opens `wa.me/917002916175` with every filled field in the message and the status panel shows.
6. Footer on `/`, `/medicines`, a medicine page, `/privacy`, 404, with working links and the disclaimer.
7. `/privacy` renders, is in `sitemap.xml`, and is linked from consent and the footer.
8. Tokens only; keyboard-only use reaches every control with a visible focus ring.
9. No `web3forms` reference remains in the code or docs.

## Checks to run

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- `npm run dev` + browser at 360 / 768 / 1024 / 1440

## Manual test steps

1. `npm run dev`, open `http://localhost:3000/#contact`; check the details match the admin; click phone, email, WhatsApp.
2. Click **Send on WhatsApp** empty: three errors; focus on Full name.
3. Enter email `abc@`: email error. Enter phone `12345`: phone error.
4. Fill name, role "Pharmacy", phone `+91 98765 43210`, message, tick consent, submit: a new tab opens WhatsApp Web (desktop) with the full message; the status panel shows. On a phone, the WhatsApp app opens.
5. Click "Open WhatsApp again": same message. "Start a new enquiry": form clears.
6. Keyboard-only through the form: visible focus on every control.
7. In the admin, clear the WhatsApp number and save: the site falls back to `company.whatsapp`; clear the email: the email row disappears.
8. Visit `/medicines`, a medicine page, `/privacy`, `/nope`: footer present, `/privacy` header solid and nothing hidden under it.
9. 360 / 768 / 1024 / 1440 px: layouts as described, no horizontal scroll.
