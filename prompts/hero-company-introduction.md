# Home hero company introduction

## Goal

Make the home hero tell a visiting doctor or distributor who the company is and what it does: company name as the large heading, then a short line and a plain description.

## Skills and docs read

- `AGENTS.md` §5, §10 (rules 1, 3, 6, 7, 9)
- `DESIGN.md` §3
- Client text supplied by the user

## Existing code inspected

- `components/hero/hero.tsx`: H1 "Quality Medicines. Healthier Lives."; one-sentence intro
- `components/typography/company-name.tsx`, `lib/site.ts` (`company.name`, `company.legalName`)
- `prompts/about-page-copy.md`: which client wording was left out, and why

## Decisions and assumptions

The user said to do this as I judge best, so these are my calls.

1. **H1 is the registered name on two lines:** "WhiteHill Lifecares" / "Pvt Ltd", so the width matches the old heading and the capsule keeps its space. It stays black in the display font (`DESIGN.md` §3). It is the heading itself, so it does not use the small `<CompanyName />` style.
2. **Client's tagline under it:** "Towards a Healthier India", in `blue-700` (`blue-600` fell under 4.5:1 where it crosses the honeycomb).
3. **Description (for client approval):** "An Indian pharmaceutical company bringing quality medicines and wellness products to healthcare professionals, pharmacies and distributors across India. We focus on consistent quality, clear product information and responsible healthcare practices."
4. **Left out, as on About:** "develop", "innovation", "excellence", "building trust".
5. **User update:** the second button is now "Know more" and opens `/about`. On phones the company name scales with the screen so it fills the width on one line.
6. **Trust row, capsule and background are unchanged.**

## Files

| File | Change |
|---|---|
| `components/hero/hero.tsx` | H1, tagline, description |

## Implementation requirements

Keep the existing `hero-slide` and `hero-rise` motion, with the tagline and text following in order. No new tokens or dependencies.

## UI

**Layout:** unchanged. Text left and capsule right from 1024 px; capsule above the text on phones.

**Typography:** H1 as today, with smaller phone sizes if needed so "WhiteHill Lifecares" stays on one line down to 360 px. Tagline `font-display` semibold, 20 px (24 px from `lg`). Description as today.

**Spacing:** tagline 12 px below the H1; description 16 px below the tagline.

**Colours:** `black`, `blue-700`, `slate-800`.

**Responsive behaviour:** checked at 360, 768, 1024 and 1440 px, with no sideways scroll and the capsule not squeezed.

**States:** button styles unchanged.

**Pixel expectations:** only the text block changes.

## Security requirements

None. Text only.

## Compliance check

- No cure or treatment claims, statistics, or trust claims. No therapy areas.
- "Pharmaceutical company" follows the user's decision; the client should confirm it, as the packs say "Marketed by".

## Acceptance criteria

1. The H1 reads "WhiteHill Lifecares Pvt Ltd", and there is one H1 on the page.
2. The tagline and description match this file.
3. "WhiteHill Lifecares" stays on one line at 360 px and up.
4. Text keeps at least 4.5:1 contrast on the background.
5. No sideways scroll; capsule size unchanged at 1024 px and up.
6. `tsc`, lint and build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; screenshots and contrast at 360, 768, 1024 and 1440 px.

## Manual test steps

1. `npm run dev` and open http://localhost:3000.
2. Read the hero as a first-time visitor.
3. Resize to 1024, 768 and 360 px.

## Update: shorter name and new tagline (user request)

- The H1 is now "WhiteHill Lifecares", without "Pvt Ltd". The registered name still appears in the logo, footer, About page and metadata.
- The tagline is now "Committed to Quality. Dedicated to Better Healthcare." (supplied by the user; client to approve).

- The description is now the two paragraphs supplied by the user ("We believe that access to quality medicines..."); client to approve, in particular "reliable" and "affordable" (AGENTS §10 rules 3 and 4).
- Third paragraph added at the user's request: "We believe that healthcare should not be a privilege but an assurance that every individual deserves."
- Capsule replaced by the client's realistic photo (`public/brand/hero-capsule-real.webp`), trimmed to the capsule and capped at 510 px tall on desktop.
- Capsule replaced by the client's clear, teal-and-pink capsule (`public/brand/hero-capsule-teal.webp`), cut along its outline to remove edge fringe and tilted 32 degrees. Teal and pink are a user-requested exception to the blue-and-white palette, inside this image only; client to confirm.
