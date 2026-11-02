# Implementation Prompt: Health CTA Banner Section

## Goal
Implement a visually rich, responsive CTA banner section placed directly after the Contact section on the homepage (`/`), matching the user's reference mockup featuring a smooth sky-blue gradient, bold headline, B2B pharmaceutical copy, white pill action button linking to `/medicines`, and the supplied cut-out image of hands pouring medicine capsules.

---

## Skills and Docs Read
- `AGENTS.md` (Sections 1, 2, 5, 9, 10, 13, 14, 15)
- `PRD.md` (Sections 4, 5, 8)
- `DESIGN.md` (Sections 2, 3, 4, 5)
- User's reference mockup and attached image `99b20bfb6e7b316fd0b0e05971454c3c1f1f7ae4.png`

---

## Existing Code Inspected
- `app/page.tsx`: Homepage sections order (`Hero`, `ProductRange`, `ExploreRange`, `Medicines`, `Quality`, `Contact`, `SiteFooter`).
- `components/layout/section.tsx`: Section wrapper with tone options.
- `components/layout/container.tsx`: Max-width container (`max-w-7xl px-4 sm:px-6 lg:px-8`).
- `components/ui/button.tsx`: Button primitive and variants.
- `components/reveal.tsx`: Scroll reveal animation component.

---

## Decisions and Assumptions
1. **Placement**: Directly after `<Contact />` in [app/page.tsx](file:///e:/Web%20Dev/whitehill-lifecare/app/page.tsx).
2. **Copy Selection**: Following the user's selected choice, use B2B pharmaceutical marketing-compliant copy:
   - Heading: **"Care for Your Health, Effortlessly"**
   - Subtitle: *"Explore trusted medicines and wellness essentials with assured quality and reliable supply."*
   - Button: **"Explore Medicines →"** (links to `/medicines`).
3. **Asset**: Cut-out transparent PNG saved to `public/brand/capsules-hand.png` (1180 × 1333 px).
4. **Visual Interpretation & Background**:
   - Card wrapper with rounded corners (`rounded-3xl` / `rounded-hero`), subtle border (`border border-blue-200/60`), and smooth horizontal gradient echoing the reference mockup (`from-[#a8cbff] via-[#7aaeff] to-[#508cf3]`).
   - Left column (approx 7 cols): Headline, description, white pill button with hover micro-interaction.
   - Right column (approx 5 cols): Hands pouring medicine capsules image rendered with `next/image`, positioned flush to the right/bottom edge.

---

## Files to Create / Modify
1. `components/sections/health-cta-banner.tsx` (Create):
   - Server Component with Container, Reveal animation, gradient card, responsive 2-column flex/grid, typography, and `next/image` integration.
2. `app/page.tsx` (Modify):
   - Import and render `<HealthCtaBanner />` directly after `<Contact />`.

---

## Responsive Specifications
- **Mobile (< 640px)**:
  - Text and image stack vertically.
  - Image is centered with max-height ~260px.
  - Heading scaled to 28px/32px.
  - Button full width or auto-centered.
- **Tablet (640px – 1023px)**:
  - Two-column split with image scaled to fit right side cleanly (~300px width).
  - Heading 36px.
- **Desktop (≥ 1024px)**:
  - Full banner layout with min-height ~340px.
  - Hands pouring capsules image positioned flush to the right/bottom edge with crisp containment.
  - Heading 42px – 48px Plus Jakarta Sans bold in `text-slate-900`.

---

## Compliance & Accessibility Check
- **Compliance Rule 1 & 4**: No cure/treatment claims; no prices or MRP.
- **Accessibility**:
  - Image has descriptive alt text: `"Hands pouring health and wellness capsules from a medicine bottle"`.
  - Contrast: Dark slate text (`#0f172a` / `text-slate-900`) on sky-blue gradient (`#a8cbff`) exceeds 8:1 contrast ratio.
  - White button with dark text has 14:1 contrast ratio.
  - 44px minimum touch target for the button.

---

## Acceptance Criteria
- [ ] Section renders cleanly on the homepage directly after `<Contact />` and before `<SiteFooter />`.
- [ ] Visual appearance matches the reference mockup: sky-blue gradient banner, bold headline, descriptive subtitle, white pill CTA button, and high-res image of hands pouring capsules.
- [ ] Button links to `/medicines`.
- [ ] Layout is fully responsive across mobile, tablet, and desktop without layout shift or clipping.
- [ ] Typecheck (`npm run typecheck`) and lint (`npm run lint`) pass with zero errors.

---

## Manual Test Steps
1. Navigate to [http://localhost:3000](http://localhost:3000) and scroll past the Contact section.
2. Verify the new banner section appears before the footer.
3. Check visual alignment, gradient colors, typography, and capsule image rendering.
4. Click the "Explore Medicines →" button and verify it navigates to `/medicines`.
5. Test responsive viewports on mobile (375px), tablet (768px), and desktop (1280px).
