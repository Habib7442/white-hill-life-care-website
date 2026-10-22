# PRD — WhiteHill Lifecares Pvt Ltd Website

| | |
|---|---|
| **Client** | WhiteHill Lifecares Pvt Ltd |
| **Document** | Product Requirements Document (PRD) |
| **Version** | 1.0 (draft) |
| **Date** | 12 October 2026 |
| **Status** | For client review |

---

## 1. Overview

WhiteHill Lifecares Pvt Ltd is a newly launched, India-based pharmaceutical marketing company. The website is the company's first digital presence. Its main job is to **showcase the company's medicines** and establish basic credibility with doctors, pharmacies, distributors and stockists.

The site should feel **scientific, clean and trustworthy**: blue and white only, with molecular and scientific visuals. It must stay **realistic and modest**. As a launching company, WhiteHill should not try to look or sound like a large pharma corporation.

**Reference site:** https://tavisalifesciences.in/ (structure and tone reference only; not to be copied).

---

## 2. Goals

| # | Goal | How we know it's met |
|---|---|---|
| G1 | Showcase the product portfolio clearly | Every product has its pack image, composition, pack size and focus area visible |
| G2 | Build trust as a new company | Honest copy, no invented numbers, manufacturing credentials shown only where verifiable |
| G3 | Generate business enquiries | Working contact form and visible phone/email on every page |
| G4 | Look professional on every device | Fully usable on mobile, tablet and desktop |
| G5 | Be easy to grow | New products can be added without redesigning the site |

### Non-goals (for this version)
- Online sales, cart or pricing
- Patient accounts or logins
- Blog / news section
- Careers portal
- Multi-language support

---

## 3. Target audience

| Audience | What they need from the site |
|---|---|
| **Distributors & stockists** (primary) | Product range, company legitimacy, a quick way to enquire |
| **Pharmacies / chemists** | Product names, compositions, pack sizes |
| **Doctors & healthcare professionals** | Accurate composition and strengths, Rx status |
| **General public** | Basic company information (must not be promoted prescription medicines directly) |

---

## 4. Sitemap

**Phase 1 (launch) — single-page website** with anchor navigation:

1. Header (logo + navigation + "Connect With Us")
2. Hero
3. ~~About Us~~ (moved to its own `/about` page, user decision 22 Oct 2026)
4. Therapeutic Focus Areas
5. Our Medicines (product portfolio)
6. Quality
7. Contact (enquiry form + details)
8. Footer

**Phase 2 (optional, after launch):**
- Separate pages: `/about`, `/medicines`, `/medicines/<product>`, `/contact`
- Individual product detail pages with full composition tables
- Privacy Policy and Terms / Disclaimer pages (Privacy Policy is required once the form collects data — see §8)

---

## 5. Content requirements

### 5.1 Hero
- Eyebrow: "Pharmaceutical Company · India"
- Headline: *Trusted medicines for everyday health.* ("Trusted medicines" highlighted in blue)
- Short intro paragraph about the company
- Buttons: **Explore Our Medicines** (scrolls to products), **Partner With Us** (scrolls to contact)
- Three honest facts: **4** Medicine brands · **WHO-GMP** certified manufacturing partners · **India** based
- Molecule illustration with ingredient labels (Vitamin D3, Methylcobalamin, Folic Acid, Ferrous Ascorbate)

### 5.2 About Us
- Who WhiteHill is, what areas it covers, and that it works with WHO-GMP certified manufacturing partners
- Three value tags: Quality-led formulations · Transparent information · Responsible growth

### 5.3 Therapeutic Focus Areas
Four tiles, each linked to its brand:

| Focus area | Brand |
|---|---|
| Bone & Calcium Health | WeCalix |
| Women's Wellness | Cynovera |
| Nerve Health | Nersovia-CD3 |
| Iron & Haemoglobin | Haemoverse |

### 5.4 Our Medicines (core section)

Each product card shows: pack image, focus-area tag, Rx tag (if applicable), brand name, composition, one-line description, dosage form and pack size.

| Brand | Composition | Pack | Rx | Focus |
|---|---|---|---|---|
| **WeCalix™** | Calcium Carbonate, Vitamin D3 & Folic Acid Tablets | 10 × 15 Tablets | No (per pack) | Bone & Calcium |
| **Cynovera®** | Myo-Inositol, Folic Acid, Vitamin D3 & Essential Micronutrients | 10 × 10 Tablets | No (per pack) | Women's Wellness |
| **Nersovia-CD3** | Benfotiamine 150 mg, Methylcobalamin 1500 mcg, Alpha Lipoic Acid 200 mg, Chromium Polynicotinate 200 mcg, Folic Acid 1.5 mg, Inositol 100 mg, Pyridoxine HCl 3 mg, Calcium Citrate Maleate 500 mg, Vitamin D3 1000 IU (confirmed by the client on 22 Oct 2026 as printed on the final pack; Schedule H, Alu-Alu; Mfd. by Dr. Edwin Medilabs Pvt. Ltd., Kurali) | 10 × 10 Tablets | **Yes** | Nerve Health |
| **Haemoverse** | Ferrous Ascorbate IP eq. to elemental iron 100 mg, Folic Acid IP 1.5 mg (confirmed by the client on 22 Oct 2026 as printed on the final pack; Schedule H, no ™; Mfd. by Dr. Edwin Medilabs Pvt. Ltd., Kurali) | 10 × 10 Tablets | **Yes** | Iron & Haemoglobin |

> ⚠️ Client to confirm: Rx/OTC status and exact strengths for WeCalix and Cynovera, and final pack artwork for each. (Nersovia-CD3 and Haemoverse confirmed 22 Oct 2026.)

Section disclaimer: *Product information is provided for general awareness. Please use any medicine only on the advice of a registered medical practitioner.*

### 5.5 Quality
Four short points: Certified manufacturing · Considered formulations · Clear labelling · Reliable supply.
Only verifiable claims. The WHO-GMP claim was first based on the manufacturer named on the Nersovia-CD3 pack (Bio Altus Pharma Pvt Ltd, Haridwar), which no longer appears on the confirmed packs. **Decided 22 Oct 2026 (user): claim "WHO-GMP certified manufacturing partners" in About and Quality** (that wording only; no product-level claim or badge). Client to keep the manufacturers' certificates on file.

### 5.6 Contact
- Enquiry form fields: Full name, Phone, Email, "I am a" (Distributor/Stockist, Pharmacy, Healthcare professional, Other), Message
- Contact details: registered office address, phone, email
- Optional: WhatsApp button, Google Map embed

### 5.7 Footer
Logo, one-line company description, Company links, Medicine links, © line, medical-advice disclaimer.

---

## 6. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| F1 | Sticky header; nav links scroll smoothly to sections | Must |
| F2 | Mobile menu (hamburger) below 820 px width | Must |
| F3 | Product cards driven from one data list so new products are easy to add | Must |
| F4 | Enquiry form opens the company WhatsApp with the details prefilled, after consent (user decision; replaces email delivery) | Must |
| F5 | Form validation (required name + message; valid email / phone format when given) with a confirmation message | Must |
| F6 | Spam protection on form — met by design: the customer sends the message from their own WhatsApp | Must |
| F7 | Click-to-call and click-to-email links on mobile | Should |
| F8 | WhatsApp chat button | Could |
| F9 | Product image enlarges on click (lightbox) | Could |
| F10 | Product detail pages (Phase 2) | Could |

---

## 7. Non-functional requirements

- **Performance:** Lighthouse performance ≥ 90 on mobile; images in WebP, lazy-loaded below the fold; page weight under ~2 MB.
- **Responsive:** Tested at 360, 390, 768, 1024, 1280 and 1440 px widths.
- **Accessibility:** WCAG 2.1 AA — 4.5:1 text contrast, alt text on all product images, keyboard-navigable menu and form, visible focus states.
- **SEO:** Unique title and meta description; Open Graph image (logo); `Organization` structured data; sitemap.xml and robots.txt; descriptive alt text including brand + composition.
- **Browsers:** Latest Chrome, Safari, Edge, Firefox; Android Chrome and iOS Safari.
- **Security:** HTTPS only; no sensitive data stored on the front end.

---

## 8. Compliance & content rules (India)

These guide the copy; the client should have final copy checked by their regulatory adviser.

1. **No cure or treatment claims.** Use "supports" / "helps support" language, as on the packs. Avoid claims that a product treats or cures a disease.
2. **Prescription (Rx) products:** present as factual product information (composition, pack) aimed at healthcare professionals; no promotional consumer language. Keep the "use only on the advice of a registered medical practitioner" note.
3. **No invented statistics, testimonials or awards.** No "trusted by thousands", no fake doctor quotes.
4. **No prices (MRP) on the site** for this version.
5. **Data protection:** the enquiry form collects personal data, so add a short consent line and a Privacy Policy page (Digital Personal Data Protection Act, 2023).
6. **Company identity:** show the registered company name; client may add CIN / GSTIN in the footer.

---

## 9. Technical approach

### 9.1 Stack

| Item | Decision |
|---|---|
| Framework | Next.js (static generation) or Astro |
| Content & images | **Sanity** (headless CMS) — products, pack images and contact details |
| Image delivery | Sanity image CDN (auto WebP/AVIF, resizing via `@sanity/image-url`) |
| Database | **None** for Phase 1 — Sanity holds all content; no user data is stored |
| Enquiry form | Opens the company WhatsApp with the details prefilled (no form service, no backend) |
| Hosting | Vercel or Netlify |
| Rebuilds | Sanity webhook → Vercel/Netlify deploy hook, so publishing in Sanity updates the live site |
| Domain | Client-provided (to confirm) |
| Analytics | Google Analytics 4 or a privacy-friendly alternative |

### 9.2 How content flows

```
Editor publishes in Sanity Studio
        │
        ▼
Sanity webhook ──► Vercel/Netlify rebuild ──► Static site fetches products (GROQ)
                                                  │
                                                  ▼
                              Pack images served from Sanity CDN (WebP, resized)

Visitor submits enquiry form ──► WhatsApp opens with the details ──► Visitor presses Send ──► Company WhatsApp
```

### 9.3 Sanity content model

> **Updated:** the model below is the original plan. The built schema extends it (category documents, `schedule` instead of `isRx`, manufacturer, storage, gallery alt text, and more, taken from the client's pack artwork). See `sanity/schemaTypes/` and `AGENTS.md` §8.

**`product`** — one document per medicine

```ts
// schemas/product.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Brand name', type: 'string',
      validation: r => r.required()}),                         // e.g. "Nersovia-CD3"
    defineField({name: 'slug', type: 'slug',
      options: {source: 'name'}, validation: r => r.required()}),
    defineField({name: 'mark', title: 'Trademark symbol', type: 'string',
      options: {list: ['', '™', '®']}}),
    defineField({name: 'focusArea', title: 'Focus area', type: 'string',
      options: {list: [
        {title: 'Bone & Calcium', value: 'bone'},
        {title: "Women's Wellness", value: 'women'},
        {title: 'Nerve Health', value: 'nerve'},
        {title: 'Iron & Haemoglobin', value: 'iron'},
      ]}, validation: r => r.required()}),
    defineField({name: 'composition', title: 'Composition (short)', type: 'string',
      validation: r => r.required()}),                         // shown on the card
    defineField({name: 'ingredients', title: 'Composition table', type: 'array',
      of: [{type: 'object', fields: [
        {name: 'ingredient', type: 'string'},
        {name: 'standard', title: 'IP / USP', type: 'string'},
        {name: 'strength', type: 'string'},                      // "150 mg", "1000 I.U."
      ]}]}),                                                     // for Phase 2 detail pages
    defineField({name: 'description', type: 'text', rows: 3,
      description: 'Use "supports" wording only. No cure/treatment claims.'}),
    defineField({name: 'dosageForm', title: 'Dosage form', type: 'string',
      initialValue: 'Tablets'}),
    defineField({name: 'pack', title: 'Pack size', type: 'string'}), // "10 × 10 Tablets"
    defineField({name: 'isRx', title: 'Prescription only (Rx)', type: 'boolean',
      initialValue: false}),
    defineField({name: 'packImage', title: 'Pack image', type: 'image',
      options: {hotspot: true},
      fields: [{name: 'alt', title: 'Alt text', type: 'string',
        validation: r => r.required()}]}),
    defineField({name: 'gallery', title: 'More pack images', type: 'array',
      of: [{type: 'image'}]}),                                   // e.g. Nersovia side panels
    defineField({name: 'order', title: 'Display order', type: 'number'}),
    defineField({name: 'visible', title: 'Show on website', type: 'boolean',
      initialValue: true}),
  ],
  orderings: [{title: 'Display order', name: 'order',
    by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'composition', media: 'packImage'}},
})
```

**`siteSettings`** — a single document for company details

```ts
// schemas/siteSettings.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'companyName', type: 'string',
      initialValue: 'WhiteHill Lifecares Pvt Ltd'}),
    defineField({name: 'logo', type: 'image'}),
    defineField({name: 'address', type: 'text', rows: 3}),
    defineField({name: 'phone', type: 'string'}),
    defineField({name: 'email', type: 'string'}),
    defineField({name: 'whatsapp', type: 'string'}),
    defineField({name: 'cin', title: 'CIN', type: 'string'}),
    defineField({name: 'gstin', title: 'GSTIN', type: 'string'}),
  ],
})
```

**Query used by the site**

```groq
*[_type == "product" && visible == true] | order(order asc){
  name, mark, "slug": slug.current, focusArea, composition,
  description, dosageForm, pack, isRx,
  packImage{asset->{url, metadata{dimensions}}, alt}
}
```

### 9.4 When to add a database later

Not needed for Phase 1. Consider one only if the client later wants stored enquiry history / lead tracking, distributor logins, or order management.

---

## 10. Assets

All images below are uploaded to Sanity (pack images on each `product`, logo on `siteSettings`).

| Asset | Status |
|---|---|
| Logo (colour on white) | ✅ Received |
| Logo (white, for dark backgrounds) | ✅ Received (needs clean transparent PNG/SVG from designer) |
| WeCalix pack image | ✅ Received |
| Cynovera pack image | ✅ Received |
| Nersovia-CD3 pack images | ✅ Received |
| Haemoverse pack image | ✅ Received |
| Logo as SVG / high-res transparent PNG | ⏳ Needed |
| Office address, phone, email | ⏳ Needed |
| Domain name | ⏳ Needed |
| Lab / scientific photography (optional) | ⏳ Stock or client photos |

---

## 11. Open questions for the client

1. Registered office address, phone number(s) and email for enquiries?
2. Domain name — already purchased?
3. Are all products made by WHO-GMP certified manufacturers?
4. Rx status and exact strengths for WeCalix, Cynovera and Haemoverse?
5. ~~Should enquiries also go to WhatsApp?~~ Yes — enquiries go to WhatsApp only (decided).
6. Any states / cities of current presence to show (e.g. "Serving Assam and the North-East")?
7. Add CIN / GSTIN to the footer?
8. More products coming soon — should we show a "Coming soon" note?

---

## 12. Milestones

| # | Milestone | Output |
|---|---|---|
| 1 | PRD & Design sign-off | This document + Design.md approved |
| 2 | Homepage design | Visual design of the single-page site (draft ready) |
| 3 | Content finalised | Contact details, product data confirmed |
| 4 | Development | Responsive build, working form |
| 5 | QA | Device, browser, accessibility and speed checks |
| 6 | Launch | Live on domain, form tested, analytics on |

---

## 13. Acceptance criteria

- All four products displayed with correct composition and pack size as approved by the client.
- Site uses only the blue-and-white palette defined in Design.md.
- Enquiry form opens the company WhatsApp with all details prefilled and shows a confirmation.
- Works and looks correct on mobile and desktop.
- No unverified claims, statistics or testimonials anywhere on the site.