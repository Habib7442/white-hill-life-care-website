# About page copy

## Goal

Rewrite the About page's first two text blocks in natural language, using the client's text as a base, and remove wording that describes the company as young or new.

## Skills and docs read

- `AGENTS.md` §1 (realistic and modest), §10 (rules 1, 3, 6, 7, 9)
- `PRD.md` §5 and `DESIGN.md` §1
- Client text supplied by the user

## Existing code inspected

- `components/about/about-overview.tsx`: heading and intro
- `components/about/about-who-we-are.tsx`: heading and two paragraphs
- `lib/seo.ts`: `aboutDescription` also says "newly established"
- `lib/site.ts`: a code comment says "newly launched"; no visitor sees it

## Decisions and assumptions

1. **User decision:** the first heading stops at "health". "Newly established", "A young company" and "starting small" are removed.
2. **"Pharmaceutical marketing company" stays,** not the client text's "pharmaceutical and wellness company", because it is what the company is and what the preloader says.
3. **Client text left out, because it would claim more than is true or allowed:**
   - "develop … products": the medicines are made by manufacturing partners.
   - "innovation": nothing on the site supports it.
   - "commitment to excellence" and "building trust": trust claims (rule 3).
   - "address evolving healthcare needs": close to a health claim (rule 1).
4. **User decision:** the "Responsible growth" value card drops "one at a time" and now reads "We add medicines to our range only when we can supply them properly." Docs that describe the company as young stay, since they guide tone and visitors never see them.
5. No therapy areas (rule 9). `<CompanyName />` for the name (rule 7). WHO-GMP wording unchanged (rule 6).

## New copy

**First block**

- Heading: **Medicines** for better support of health ("Medicines" in blue, as today)
- Text: `<CompanyName legal />` is an Indian pharmaceutical company. We work with distributors, stockists, pharmacies and healthcare professionals so that quality medicines and wellness products reach the people who need them.

**Second block**

- Heading: Working towards a **healthier India** ("healthier India" in blue)
- Paragraph 1: Good health is the foundation of a better tomorrow. That belief guides our work at `<CompanyName />`, as we help make quality medicines and wellness products easier to access for people across India.
- Paragraph 2: Our role is marketing and distribution. Our medicines are made by **WHO-GMP** certified manufacturing partners, and we make sure each one reaches the market with clear, accurate information. Consistent quality and responsible practices guide every step.

**Search description (`lib/seo.ts`)**

`${company.legalName}` is an Indian pharmaceutical company offering medicines for better support of health.

## Files

| File | Change |
|---|---|
| `components/about/about-overview.tsx` | Heading and text |
| `components/about/about-who-we-are.tsx` | Heading and paragraphs |
| `lib/seo.ts` | `aboutDescription` |
| `lib/site.ts` | Comment wording |

## Implementation requirements

Text only. No new components, colours or dependencies.

## UI

**Visual interpretation:** same layout as the attached screenshot; the first heading is shorter.

**Typography, spacing and colours:** unchanged (`font-heading`, `text-black`, `text-blue-600`, `text-slate-700`).

**Responsive behaviour:** the two-column layout from 1024 px and stacked below stay as they are, at 360, 768, 1024 and 1440 px, with no sideways scroll. The shorter text sits beside the same photos.

**States:** no interactive elements change.

**Pixel expectations:** only the wording and line lengths change.

## Security requirements

None. Text only.

## Compliance check

- No cure or treatment claims, statistics, or trust claims.
- WHO-GMP appears only as "WHO-GMP certified manufacturing partners".
- The client should approve the new text.

## Acceptance criteria

1. The first heading reads "Medicines for better support of health", with nothing after it.
2. "newly", "young", "starting small" and "We started" no longer appear on `/about` or in its search description.
3. The new text matches this file exactly.
4. No sideways scroll at 360, 768, 1024 or 1440 px.
5. `tsc`, lint and build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; a search of the built `/about` page for the removed words; screenshots at 360, 768, 1024 and 1440 px.

## Manual test steps

1. `npm run dev` and open http://localhost:3000/about.
2. Read the first two blocks and compare them with this file.
3. Resize to 1024, 768 and 360 px.
