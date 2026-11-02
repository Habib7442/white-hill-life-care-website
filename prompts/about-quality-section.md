# About Quality Section ("Our approach to quality") Redesign

Redesign the "Quality" section on the `/about` page to match the user's Figma reference mockup: a left-aligned header ("QUALITY" pill + "Our approach to quality" title), and a dynamic winding blue ribbon connecting 4 quality milestones, each featuring a 157px blue-to-transparent linear gradient number, a floating circular node icon badge, and concise pharmaceutical narrative copy.

---

## Visual Interpretation of Reference

1. **Header (Left-Aligned by User Instruction)**:
   - Eyebrow Pill: `inline-flex rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700`, text: `"QUALITY"`.
   - Title: `"Our approach to quality"` in `font-heading font-bold text-3xl sm:text-4xl lg:text-[44px] text-black tracking-tight mt-3.5 text-left`.

2. **Winding Ribbon & 4 Quality Milestones**:
   - **Wave Graphic**: A continuous organic curved SVG path in vibrant blue (`stroke-blue-600 stroke-[5] sm:stroke-[6] fill-none`) traversing from left to right across the 4 milestones.
   - **4 Circular Milestone Nodes**:
     - Circular white badges positioned on the ribbon: `size-12 sm:size-14 rounded-full bg-white border border-slate-100 shadow-md flex items-center justify-center`.
     - Node 1: `BadgeCheck` icon (`text-blue-600 size-6 sm:size-7`)
     - Node 2: `FlaskConical` icon (`text-blue-600 size-6 sm:size-7`)
     - Node 3: `ClipboardList` icon (`text-blue-600 size-6 sm:size-7`)
     - Node 4: `Truck` icon (`text-blue-600 size-6 sm:size-7`)
   - **Gradient Step Numbers (Exact Figma Inspector Specs)**:
     - Font: `font-heading font-bold` (700 weight)
     - Size: `text-[100px] sm:text-[130px] lg:text-[157px] leading-none`
     - Gradient: `linear-gradient(180deg, #2563EB 0%, rgba(255, 255, 255, 0) 100%)` via `bg-gradient-to-b from-[#2563EB] to-transparent bg-clip-text text-transparent select-none`
   - **Milestones Copy & Arrangement**:
     - **Milestone 1 (Certified manufacturing)**:
       - Position: Left (above wave)
       - Title: `Certified manufacturing` (`font-heading font-bold text-xl sm:text-2xl text-black`)
       - Description: `Our medicines are made by WHO-GMP certified manufacturing partners and noted on each pack.`
     - **Milestone 2 (Considered formulations)**:
       - Position: Center-left (below wave)
       - Title: `Considered formulations`
       - Description: `Every formulation is chosen with a clear purpose and listed with its full composition.`
     - **Milestone 3 (Clear labelling)**:
       - Position: Center-right (above wave)
       - Title: `Clear labelling`
       - Description: `Composition, pack size, storage and Rx status are printed on the pack and shown on our website.`
     - **Milestone 4 (Reliable supply)**:
       - Position: Right (below wave)
       - Title: `Reliable supply`
       - Description: `We plan stock with our distributors and stockists so orders can be met on time.`

3. **Responsive Behavior**:
   - **Desktop & Tablet (≥768px)**: Full winding wave with alternating top/bottom milestones and large gradient numbers.
   - **Mobile (<768px)**: Clean vertical timeline with connected vertical line, gradient numbers, circular icon badges, and stacked copy to prevent horizontal clipping.

---

## Skills and Docs Read

- `AGENTS.md` (§1 Product scope, §5 UI rules, §6 Architecture, §10 Compliance and content rules)
- `PRD.md` (§4 Information Architecture, §8 Compliance)
- `DESIGN.md` (§2 Palette, §3 Typography, §5 Components)

---

## Existing Code Inspected

- `app/about/page.tsx`: Current navy Quality section (lines 47–71).
- `lib/site.ts`: `qualityPoints` (copy and metadata).

---

## Files to Create / Modify

- `components/about/about-quality.tsx`: New component implementing the left-aligned header, winding wave path, 4 milestone nodes, and 157px gradient numbers.
- `app/about/page.tsx`: Replace the existing navy Quality block with `<AboutQuality />`.

---

## Compliance Check

- WHO-GMP certification is attributed strictly to "WHO-GMP certified manufacturing partners".
- No curative or exaggerated medical claims.
- Modest, factual representation of WhiteHill's quality process.

---

## Acceptance Criteria

- [ ] Header has "QUALITY" pill and "Our approach to quality" heading, both left-aligned as instructed.
- [ ] 4 milestones rendered with exact copy, circular icon badges (`BadgeCheck`, `FlaskConical`, `ClipboardList`, `Truck`), and 157px gradient numbers (`#2563EB` to transparent).
- [ ] Smooth winding wave connecting milestones on desktop.
- [ ] Responsive fallback on mobile screens with no horizontal overflow.
- [ ] Page returns HTTP 200 with zero TypeScript errors.

---

## Manual Test Steps

1. Visit `http://localhost:3000/about`.
2. Scroll to "Our approach to quality".
3. Verify that the header is left-aligned.
4. Verify the 4 milestones with their gradient numbers and icons along the wave.
5. Check mobile responsiveness at 360px and 768px viewports.
