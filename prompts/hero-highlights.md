# Hero highlights: category cards, trust band, new headline

## Goal

Add the two bottom rows from the client's reference to the hero (a white row of four category cards and a navy row of four trust points) and update the hero eyebrow, headline, and intro using the reference's wording, adjusted to the project's compliance rules.

## Skills and docs read

- `AGENTS.md` sections 1 (modest tone), 5 (UI rules, icons), 10 (compliance, incl. client rules 9–10)
- `DESIGN.md` §2 palette (blue and white only), §5 components (cards, icons), §7 page structure
- Reference image (client mock-up): logo + nav; eyebrow "SCIENCE · QUALITY · CARE"; H1 "Advancing Healthcare, Enriching Lives."; intro; two buttons; photo of Indian doctors; **white card row** (Pharmaceuticals, Nutraceuticals, Wellness Products, Commitment to Quality, each with round icon, title, one line, chevron); **navy band** (Scientific Formulations, Quality Manufacturing, Trusted by Healthcare Professionals, Focus on India's Health & Wellness, line icons with dividers)

## Existing code inspected

- `components/hero/hero.tsx`: full-height hero (`min-h-svh`), photo background, eyebrow, H1, intro, two buttons
- `components/typography/company-name.tsx`, `components/layout/container.tsx`, `lib/site.ts`, `lib/site-nav.ts`
- `lucide-react`: `Pill`, `Leaf`, `HeartPulse`, `ShieldCheck`, `Microscope`, `BadgeCheck`, `Stethoscope`, `MapPin`, `ChevronRight` all exist

## What I take from the reference and what I change

**Layout is copied** (card row overlapping the bottom of the photo, navy band below). **Colours are not:** the reference uses green (headline, icon circles, a green logo). The site is blue and white only (`DESIGN.md` §2), so green becomes `blue-600` / `blue-50`. The reference's header (new logo, search icon, different nav) is **not** part of this change.

### Copy: reference vs. proposed

| Place | Reference | Proposed | Why |
|---|---|---|---|
| Eyebrow | SCIENCE · QUALITY · CARE | **Science · Quality · Care** | Kept as is |
| H1 | Advancing Healthcare, Enriching Lives. | **Quality Medicines, Healthier Lives.** (second line in blue-600) | "Advancing healthcare" sounds like a large pharma corporation; `AGENTS.md` §1 asks for a modest tone. Same rhythm, honest scale |
| Intro | WhiteHill Lifecares is a pharmaceuticals and wellness company committed to providing high-quality, affordable and reliable healthcare solutions for a healthier India. | **WhiteHill Lifecares** is an India-based pharmaceutical and wellness company, bringing quality, reliable and affordable medicines to distributors, pharmacies and healthcare professionals for better support of health. | Keeps the client's points (quality, reliable, affordable, India) and the "better support of health" line the client asked for; says who it serves |
| Buttons | Explore Our Products · Know More | **Explore Our Medicines** · **Partner With Us** (unchanged) | Ours point to real sections; "Know More" is vague |

**Category cards (white row):**

| Reference | Proposed title | Proposed line | Icon | Links to |
|---|---|---|---|---|
| Pharmaceuticals: "Quality medicines for better health" | Pharmaceuticals | Quality medicines for better health | `Pill` | `#medicines` |
| Nutraceuticals: "Everyday nutrition for active living" | Nutraceuticals | Everyday nutrition for active living | `Leaf` | `#medicines` |
| Wellness Products: "Care for every stage of life" | Wellness Products | Care for every stage of life | `HeartPulse` | `#medicines` |
| Commitment to Quality: "Safe, effective and reliable solutions" | Commitment to Quality | **Carefully sourced, clearly labelled** | `ShieldCheck` | `#quality` |

"Safe, effective" is an efficacy and safety claim (`AGENTS.md` §10.1), so it's replaced.

**Trust band (navy row):**

| Reference | Proposed | Icon | Why |
|---|---|---|---|
| Scientific Formulations | Scientific Formulations | `Microscope` | Kept |
| Quality Manufacturing | **Quality Manufacturing Partners** | `BadgeCheck` | WhiteHill is a marketing company and doesn't manufacture; "partners" keeps it true |
| Trusted by Healthcare Professionals | **Made for Healthcare Professionals** | `Stethoscope` | "Trusted by…" is an unverified trust claim, explicitly banned (`AGENTS.md` §10.3) |
| Focus on India's Health & Wellness | Focus on India's Health & Wellness | `MapPin` | Kept. Lucide has no India map icon; a pin is used (a custom India outline SVG is possible later) |

## Decisions and assumptions

1. **Hero height.** The hero is currently a full screen. To show the card row and band in the first view on desktop (as in the reference), the photo area shrinks to `lg:min-h-[620px]`, the card row overlaps the photo's bottom edge by half its height, and the navy band starts behind the card's lower half. On mobile, everything stacks naturally.
2. **Card row:** one white card (`rounded-card` 22 px, 1 px `blue-100` border, `shadow-sm`), four columns at `lg` with thin `line` dividers, 2 × 2 at `sm`, one column below `sm`. Each item is a whole-item link (`<a>`): 56 px round icon in `blue-50` with a `blue-600` icon (1.8 stroke), Source Serif 4 600 title in `navy-900` (18 px), 14 px `ink-muted` line, `ChevronRight` on the right. Hover: title turns `blue-600`, chevron nudges 2 px right (150 ms, off under reduced motion). Visible focus ring.
3. **Navy band:** `bg-navy-900`, four items with white 1.8-stroke line icons (32 px) and two-line white labels (15 px), thin `white/20` vertical dividers at `lg`; 2 × 2 grid on mobile. Plain solid navy (no photo behind it, unlike the reference) to stay on palette and keep text contrast high.
4. **Content lives in `lib/site.ts`** (`heroCategories`, `heroHighlights`) so copy edits don't touch JSX.
5. **This settles the open Focus Areas question in the hero's favour:** the category cards are generic (no therapy areas), matching client rule 9. The separate Focus Areas section and its nav link stay **undecided** and untouched here.
6. **OG image drift:** the social share image (`app/opengraph-image.jpg`) still says "Trusted medicines for everyday health." If the new headline is approved, that image needs a new version from the designer. Not changed in this task.
7. The PRD/DESIGN hero descriptions drift further. Not edited; flagged.

## Files to create or modify

Create:
- `components/hero/hero-categories.tsx`: white card row (Server Component)
- `components/hero/hero-highlights.tsx`: navy band (Server Component)

Modify:
- `components/hero/hero.tsx`: eyebrow, H1, intro, height; render both rows
- `lib/site.ts`: `heroCategories`, `heroHighlights` data (with Lucide icon references)

## Implementation requirements

- Palette tokens only; no green, no hex.
- Lucide icons with `strokeWidth={1.8}`, `aria-hidden="true"`.
- Category items are `<a>` elements with 44 px+ touch targets; the band items are plain text (not links).
- Company name in the intro via `<CompanyName />`.
- No layout shift; the photo keeps loading with `fetchPriority="high"`.

## Security requirements

None.

## Compliance check

- No cure, treatment, safety, or efficacy claims ("safe, effective" removed).
- No unverified trust claims ("Trusted by Healthcare Professionals" replaced).
- No therapy areas in general copy (client rule 9).
- No WHO-GMP mention (removed by the user earlier).
- **All new copy is a draft for client approval.**

## Acceptance criteria

- [ ] Eyebrow, H1 (two-tone), and intro show the approved copy
- [ ] Desktop (1280/1440): card row overlaps the photo bottom; navy band below; both visible in the first screen at 1440 × 900
- [ ] 1024 / 768 / 360: rows reflow (4 → 2 × 2 → 1 column for cards, 2 × 2 for the band), no horizontal scroll
- [ ] Cards link to `#medicines` / `#quality`, with hover and focus states
- [ ] Only palette colours; contrast ≥ 4.5:1 on the navy band
- [ ] Typecheck, lint, build pass

## Checks to run

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

## Manual test steps

1. `npm run dev`, open http://localhost:3000 at 1440 × 900: hero, card row, and navy band are visible together.
2. Hover each card: title goes blue, chevron nudges right. Tab through: each card shows a focus ring.
3. Check 1024, 768, and 360 px: cards reflow to 2 × 2, then a single column; band reflows to 2 × 2; nothing overflows.
4. Click a category card: the page scrolls toward Medicines (section not built yet, so nothing scrolls until it exists).
