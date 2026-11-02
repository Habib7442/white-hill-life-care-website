# Implementation Prompt: Contact Section & Form Redesign

## Goal
Redesign the Contact section and WhatsApp enquiry form to match the user's reference mockup: a unified card with a vibrant blue left sidebar containing company contact details and white circular badges, and a clean right-hand form with refined inputs, placeholders, character counter, and a navy pill "Send on Whatsapp" button.

---

## Skills and Docs Read
- `AGENTS.md` (Sections 1, 2, 5, 10, 11, 14, 15)
- `PRD.md` (Sections 5.6, 8, 10)
- `DESIGN.md` (Sections 2, 3, 4, 5)
- Reference mockup image attached by user

---

## Existing Code Inspected
- `components/sections/contact.tsx`: Existing section wrapper and grid layout.
- `components/contact/contact-details.tsx`: Contact detail rows for office address, phone, email, and WhatsApp.
- `components/contact/enquiry-form.tsx`: Client-side form handling, Zod validation, error clearing, WhatsApp message building, and opening logic.
- `lib/contact.ts`: Formatting utilities (`formatPhone`, `telHref`, `enquiryMessage`).
- `lib/enquiry-schema.ts`: Validation schema for the enquiry form.
- `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/native-select.tsx`, `components/ui/button.tsx`: UI primitives.

---

## Visual Interpretation of Reference Mockup
1. **Container & Layout**:
   - Single unified card container with a subtle border (`border-blue-100`), clean white surface, rounded-3xl / 24px radius, and light outer padding framing both columns.
   - Two-column split on desktop (approx. 5 cols for sidebar, 7 cols for form); stacks gracefully on mobile and tablet.
2. **Left Panel (Blue Sidebar)**:
   - Deep vibrant brand blue fill (`bg-blue-600`), rounded-2xl / 20px radius.
   - Padding: `p-8 sm:p-10`.
   - Header:
     - Heading: "Get in touch" in bold white text (`font-heading text-3xl sm:text-4xl font-bold text-white`).
     - Subtitle: "Contact us via WhatsApp, call or email." in `text-white/90 text-[15px]`.
   - Contact rows:
     - Circular white badge tiles (`size-11 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow-sm`).
     - Row 1: **Registered office** with pin icon; bold label in white, full address in `text-white/85 text-[13px] leading-relaxed`.
     - Row 2: **Phone** with telephone icon; formatted phone number in `text-white text-sm font-medium`.
     - Row 3: **Email** with mail icon; email address in `text-white text-sm font-medium break-all`.
     - Row 4: **WhatsApp** with chat/WhatsApp icon; "Chat on WhatsApp (+91 70029 16175)" in `text-white text-sm font-medium`.
     - All phone, email, and WhatsApp items have hover underline and click-to-contact links.
3. **Right Panel (Enquiry Form)**:
   - Clean white background with generous padding (`p-6 sm:p-8 lg:p-10`).
   - Title: "Send an enquiry on WhatsApp" (`font-heading text-2xl sm:text-[28px] font-bold text-navy-900`).
   - Subtitle: "Fill in the form and WhatsApp opens with your details ready to send." (`text-ink-muted text-sm mt-1.5 mb-6`).
   - Fields:
     - **Full name \***: Input placeholder `"Enter Full Name"`.
     - **Phone & Email row**: 2-column grid. Phone placeholder `"+91"`, Email placeholder `"name@example.com"`.
     - Helper text directly beneath: `"Optional. Add these if you would like us to reply by phone or email as well."` in `text-[13px] text-ink-muted`.
     - **I am a**: Dropdown select with default placeholder `"Choose One"`.
     - **Message \***: Textarea with placeholder `"Which medicines are you interested in, and where are you based?"` and right-aligned character count (`0/1000`).
     - **Consent checkbox**: Square checkbox with `"I agree to send these details to WhiteHill Lifecares Pvt Ltd on WhatsApp so they can reply to my enquiry. See our Privacy Policy."` (`/privacy` link).
     - **Submit button**: Right-aligned (`flex justify-end`), pill-shaped (`rounded-full`), dark navy fill (`bg-navy-900 hover:bg-blue-700 text-white`), label `"Send on Whatsapp"` with WhatsApp/message icon on the right side.

---

## Responsive Specifications
- **Mobile (< 640px)**:
  - Sidebar and form stack vertically with 16px gap.
  - Sidebar has `p-6`, rounded-xl.
  - Phone and Email fields stack into a single column.
  - Submit button spans full width or right-aligned.
- **Tablet (640px – 1023px)**:
  - Outer card has `p-4 sm:p-6`.
  - Phone and Email sit side-by-side in 2 columns.
  - Sidebar and form can stack or split 5/7 depending on viewport width.
- **Desktop (≥ 1024px)**:
  - Outer card has `p-4 lg:p-5`, side-by-side 5/7 grid.
  - Left blue sidebar stretches to full container height (`flex flex-col justify-between`).
  - Right form has balanced padding and right-aligned button.

---

## Files to Modify / Create
1. `components/sections/contact.tsx`:
   - Reconfigure the section container to hold the unified card layout.
2. `components/contact/contact-details.tsx`:
   - Update rows to support white-on-blue theme with white circular badges (`bg-white text-blue-600`), white typography, and clean links.
3. `components/contact/enquiry-form.tsx`:
   - Update input placeholders to match the mockup ("Enter Full Name", "+91", "name@example.com", "Choose One").
   - Align button to the right with pill shape, navy background, and icon on the right (`inline-end`).
   - Ensure message character counter and helper notes align cleanly.

---

## Security & Compliance
- **No data storage**: No personal data is sent to a custom backend or logged in local storage. All values are formatted into a `wa.me` URL.
- **DPDP Act 2023**: Mandatory consent checkbox with link to `/privacy`.
- **Compliance Rule 7**: Company name rendered with `<CompanyName legal />` (bold registered entity).
- **Accessibility**:
  - Labels linked via `htmlFor`.
  - Error messages linked via `aria-describedby` and `aria-invalid`.
  - 44px minimum touch targets on all interactive elements (inputs, select, checkbox, links, buttons).
  - High-contrast text on blue (white text on `#2563EB` exceeds 5.2:1 contrast ratio).

---

## Acceptance Criteria
- [ ] Contact section matches the reference mockup visually: unified card, rounded blue panel on the left with white circular icon tiles, and crisp form on the right.
- [ ] Left blue panel displays "Get in touch", subtitle, and contact items (Address, Phone, Email, WhatsApp) with white circle icon badges.
- [ ] Right panel displays "Send an enquiry on WhatsApp", subtitle, and all fields with matching placeholders and labels.
- [ ] Submit button is dark navy, pill-shaped, right-aligned, with "Send on Whatsapp" and icon on the right.
- [ ] Clicking submit with invalid fields focuses the first invalid field and renders accessible error messages.
- [ ] Clicking submit with valid fields opens WhatsApp with prefilled enquiry details and shows the status confirmation banner.
- [ ] Layout is fully responsive across mobile (360px), tablet (768px), and desktop (1024px+).
- [ ] Typecheck (`npm run typecheck`) and lint (`npm run lint`) pass with zero errors.

---

## Manual Test Steps
1. Navigate to `/#contact`.
2. Verify visual appearance against the reference mockup:
   - Check blue panel background, white circular badges, and white typography.
   - Check right-side form layout, placeholders, and navy pill button.
3. Test validation: Click "Send on Whatsapp" without filling fields -> verify error states and focus on "Full name".
4. Fill in valid details, tick consent, and click submit -> verify WhatsApp link opens in a new tab with prefilled parameters.
5. Check mobile view (< 640px) to verify responsive stacking and touch target sizing.
