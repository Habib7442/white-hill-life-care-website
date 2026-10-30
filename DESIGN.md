# Design — WhiteHill Lifecares Pvt Ltd Website

| | |
|---|---|
| **Document** | Design specification |
| **Version** | 1.0 (draft) |
| **Date** | 12 October 2026 |
| **Companion** | PRD.md |

---

## 1. Design direction

**"Clean laboratory."** A calm, scientific, blue-and-white website that lets the medicine packs be the hero.

- **Scientific:** molecule illustrations, dot-grid textures, ingredient labels — echoing the molecular art on the WeCalix and Nersovia packs.
- **Simple & honest:** plenty of white space, short copy, no flashy effects. Feels like a credible young company, not a multinational.
- **Product-first:** pack images are shown large, on soft blue panels, with composition right beneath.

**Do:** white space, thin borders, rounded cards, molecules, clear typography.
**Don't:** gradients washing across the whole page, stock photos of smiling models (except on product packs), dark mode themes, flashy animations, colours outside the palette.

---

## 2. Colour palette (blue & white only)

Taken from the WhiteHill logo.

| Token | Hex | Use |
|---|---|---|
| `--navy-900` | `#172C6B` | Headings, Quality band background, Rx tag |
| `--blue-700` | `#1E3A8A` | Button hover, link hover |
| `--blue-600` | `#1D4ED8` | Primary buttons, eyebrow labels, links, icons |
| `--blue-300` | `#9CC3FB` | Molecule highlights, eyebrow on navy |
| `--blue-200` | `#BCD5FB` | Light molecule atoms, secondary bonds |
| `--blue-100` | `#DBE6F8` | Card borders |
| `--blue-50`  | `#E8F0FE` | Icon tiles, tags |
| `--blue-25`  | `#F3F7FE` | Alternate section background, product image panels |
| `--border`   | `#E3EAF7` | Section dividers |
| `--white`    | `#FFFFFF` | Main background, cards |
| `--text`     | `#13234A` | Body text (dark navy, not black) |
| `--text-muted` | `#3A4A6E` | Paragraphs, descriptions |
| `--text-faint` | `#56648A` | Footer small print |

**Contrast checks:** `#3A4A6E` on white ≈ 9:1 ✔, `#1D4ED8` on white ≈ 6.7:1 ✔, white on `#1D4ED8` ✔, `#D6E2F7` on `#172C6B` ✔.

**Section rhythm:** alternate white and `--blue-25`, with one navy band (Quality) for contrast.

> Product pack colours (pink, orange, red) appear **only inside the pack images**. They are never used in the site UI.

> **Approved exception (product range section only):** the four tiles after the hero use one soft palette: `--tile-blue #EAF2FF`, `--tile-mint #EAF7EF`, `--tile-sand #FBF6EA`, `--tile-slate #EEF2F7`. Titles `--navy-900`, lines `--ink-muted` (≥ 7.8:1). Do not use these colours anywhere else (`prompts/product-range-section.md`).

> **Approved exception (product cards only):** the "Nutraceutical" badge is green `--nutra #15803D` with white text (5.0:1), next to the navy "Rx" badge (user request). Not used anywhere else.

---

## 3. Typography

| Role | Font | Weight | Size (desktop) | Size (mobile) |
|---|---|---|---|---|
| H1 (hero) | Plus Jakarta Sans | 800, −0.02em tracking; key words in `--blue-600` | 60 px / 1.05 | 38 px |
| H2 (section) | Source Serif 4 | 700 | 40 px / 1.15 | 30 px |
| H3 (card title) | Source Serif 4 | 600–700 | 22–30 px | 20–26 px |
| Eyebrow | IBM Plex Sans | 600, uppercase, 0.14em tracking | 13 px | 12 px |
| Body large | IBM Plex Sans | 400 | 17–18 px / 1.65 | 16 px |
| Body | IBM Plex Sans | 400 | 15 px / 1.6 | 15 px |
| Button | IBM Plex Sans | 600 | 15 px | 15 px |

- **Why a serif for headings:** matches the serif "WhiteHill" wordmark in the logo and feels established and trustworthy.
- **Why IBM Plex Sans for body:** technical, scientific feel; very readable.
- Both from Google Fonts.

---

## 4. Layout & spacing

- **Max content width:** 1240 px, centred, 24 px side padding.
- **Section padding:** 96 px top/bottom (desktop), 64 px (mobile).
- **Spacing scale:** 4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 72 · 96 px.
- **Grid:** two-column splits (text / visual) that stack on mobile; card grids with `auto-fit` columns.
- **Corner radius:** 10 px (inputs, tags), 14 px (icon tiles), 18 px (small cards), 22 px (product cards, form), 28 px (hero illustration), pill (buttons, chips).
- **Borders:** 1 px `--blue-100`. No heavy drop shadows.

### Breakpoints
| Name | Width | Behaviour |
|---|---|---|
| Mobile | < 640 px | Single column, hamburger menu, product cards full width |
| Tablet | 640–1023 px | Two-column focus tiles, single-column product cards |
| Desktop | ≥ 1024 px | Full layout, 2 × 2 product grid, 4 focus tiles in a row |

---

## 5. Components

### Buttons
- **Primary:** `--blue-600` fill, white text, pill shape, min height 48 px, hover → `--blue-700`.
- **Secondary (ghost):** white fill, 1.5 px `--blue-600` border, blue text, hover → `--blue-25` fill.
- Arrow icon optional on primary.

### Eyebrow label
Numbered small caps label above each section heading, e.g. `01 · WHO WE ARE`. Colour `--blue-600` (or `--blue-300` on navy).

### Chip / tag
Pill, `--blue-50` background, `--blue-700` text, 12 px uppercase. Rx tag uses `--navy-900` background with white text.

### Focus-area tile
White card, 18 px radius, 52 px icon tile in `--blue-50`, serif title, short text, brand name at the bottom in blue.

### Product card
1. Image panel — `--blue-25` background, 300 px high, pack image centred with `object-fit: contain`
2. Tags — focus area (+ Rx if applicable)
3. Brand name — serif, 30 px, navy
4. Composition — 15 px, blue, medium weight
5. Description — 15 px, muted
6. Footer row — "Dosage form: Tablets" · "Pack: 10 × 10 Tablets", separated by a top border

### Form fields
48 px min height, 10 px radius, 1 px `#C9D6EE` border, focus → 2 px `--blue-600` outline. Labels above fields, 14 px medium.

### Icons
Simple line icons, 1.8 px stroke, rounded caps (Lucide style). Colour `--blue-600`. No emoji.

---

## 6. Scientific / molecular visual language

The signature element of the site.

- **Hero molecule:** a hexagonal ring with attached atoms, drawn as SVG. Atoms are glossy spheres (radial gradient white → `--blue-300` → `--blue-600`), bonds in `#7FA9F2`. A few darker "heavy" atoms in navy for depth.
- **Ingredient chips** floating over the molecule: Vitamin D3, Methylcobalamin, Folic Acid, Ferrous Ascorbate (one chip filled blue as an accent).
- **Dot-grid texture** (`--blue-100` dots every 28 px) behind the molecule for a lab-notebook feel.
- **Faint background molecules** in `--blue-100`/`--blue-200` at the corners.
- Optional for later: a softly blurred lab photograph with a blue overlay (like the logo presentation) for the Quality band or a page banner.

Rules: molecules are decorative (hidden from screen readers), never cover text, and stay within the blue palette.

---

## 7. Page structure (section by section)

| # | Section | Background | Layout |
|---|---|---|---|
| 1 | Header | White 96% opacity, sticky, bottom border | Logo left · links centre · primary button right |
| 2 | Hero | `--blue-25` | Text left (eyebrow, H1, intro, 2 buttons, 3 facts) · molecule panel right |
| 3 | About | White | Heading left · two paragraphs + 3 value tags right |
| 4 | Focus areas | `--blue-25` | Heading · 4 tiles in a row |
| 5 | Our Medicines | White | Heading + disclaimer · 2 × 2 product cards |
| 6 | Quality | `--navy-900` | Heading left · 4 outlined cards right (2 × 2) |
| 7 | Contact | `--blue-25` | Details left (address, phone, email) · form card right |
| 8 | Footer | `--navy-900` (user decision), white logo, `#D6E2F7` text | Logo + blurb · Company links · Medicine links · © + disclaimer row |

---

## 8. Imagery

| Image | Treatment |
|---|---|
| Logo | Colour version on white header/footer; white version on navy if needed. Ask designer for SVG. |
| Product packs | As supplied; shown on `--blue-25` panels, never cropped (contain, not cover). Export as WebP ~1200 px wide. |
| Molecules | Custom SVG, built in code — no stock files needed. |
| Photography (optional) | Lab / scientist images only, with a blue overlay so they stay on-palette. |

---

## 9. Interaction & motion

Keep it minimal:
- Smooth scroll to sections on nav click.
- Button and link colour transitions (150 ms).
- Optional: gentle fade-up of sections on scroll (respect `prefers-reduced-motion`).
- Optional: very slow float on hero molecule chips.
- No carousels, auto-playing videos or pop-ups.

---

## 10. Accessibility

- All text meets 4.5:1 contrast (see palette).
- Touch targets ≥ 44 px.
- Real `<button>`, `<a>`, `<label>` + `<input>` elements.
- Descriptive alt text on product images, e.g. "WeCalix — Calcium Carbonate, Vitamin D3 & Folic Acid tablets, 10 × 15 pack".
- Decorative SVGs marked `aria-hidden="true"`.
- Visible focus outline on every interactive element.

---

## 11. Design preview

A working visual draft of this design is on the **WhiteHill Lifecares Website** canvas. Any changes agreed in this document will be applied there before development.