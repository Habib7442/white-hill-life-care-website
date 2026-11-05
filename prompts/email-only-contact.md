# Email-only contact

## Goal

Remove the company phone number and WhatsApp from the whole site, and have the enquiry form send directly to the company's email from the page.

## Skills and docs read

- `AGENTS.md` §1, §7, §9, §10 (rules 7 and 8), §11, §12
- `PRD.md` §5.6 and goal G3 ("visible phone/email on every page"; the phone part is superseded by this user request)
- `DESIGN.md` page structure table
- Web3Forms API reference: https://docs.web3forms.com/getting-started/api-reference. The pricing page refused the request (403), so its terms are unconfirmed; see Open items.

## Existing code inspected

- `components/contact/enquiry-form.tsx`: builds a `wa.me` link and opens it
- `components/contact/contact-details.tsx`: phone, email and WhatsApp rows; hardcoded email and address fallbacks
- `components/sections/contact.tsx`: WhatsApp heading, intro and consent wording
- `components/site-footer/site-footer.tsx`: "Chat on WhatsApp" link and phone row
- `components/about/about-cta.tsx`, `app/about/page.tsx`: "Chat on Whatsapp" button
- `components/product-detail/product-summary.tsx`, `app/medicines/[slug]/page.tsx`: "Send an Enquiry" opens WhatsApp
- `app/privacy/page.tsx`: phone link and WhatsApp wording
- `lib/whatsapp.ts`, `lib/contact.ts`, `lib/enquiry-schema.ts`, `lib/seo.ts` (JSON-LD `telephone`), `lib/site.ts` (`company.whatsapp`)

## Decisions (user-approved)

1. **Form sends from the site** through Web3Forms. The customer presses Send and sees a confirmation.
2. **Whole site:** no company phone number or WhatsApp link anywhere.
3. **Customer's own phone box stays optional.** Email becomes required, so the company can always reply.

## Decisions and assumptions

4. **Browser submission with a public key.** The Web3Forms docs recommend browser use and say server use needs a paid plan with IP whitelisting. So the form posts directly to `https://api.web3forms.com/submit`, and the key is `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. The docs do not say outright that the key is safe to expose, but browser use requires it to be visible. Its only power is sending to the company's own inbox, and it is not a Sanity or revalidation secret.
5. **Recipient:** the docs say the key sends "to your email address". Create the key with the inbox the client wants enquiries in.
6. **Reply-to:** the customer's email goes in the `email` field, so pressing Reply answers them.
7. **Spam:** a hidden `botcheck` honeypot, as Web3Forms documents. AGENTS §11's "no honeypot needed" applied only to WhatsApp.
8. **"Send an Enquiry" on medicine pages** links to `/contact?medicine=<name and pack>`. The form looks up nothing: it takes that text from the link and prefills the message with "I would like to enquire about <name> (<pack>)." The value is read in the browser after load, capped at 200 characters and only used as editable field text, so the page stays static.
9. **About page second button** "Chat on Whatsapp" becomes "Email us" (`mailto:`).
10. **Email address** comes from `siteSettings.email`, else a new `company.email` in `lib/site.ts`, replacing the fallbacks now hardcoded in components.
11. **Sanity `phone` and `whatsapp` fields stay in the schema, unused.** The admin panel is a separate project and removing them is not needed to hide them. Say if you want them removed too.
12. **Dead code removed:** `lib/whatsapp.ts`, `formatPhone`, `telHref`, `company.whatsapp`.

## Files

| File | Change |
|---|---|
| `components/contact/enquiry-form.tsx` | POST to Web3Forms; sending, success and error states; honeypot; email required; prefill |
| `lib/enquiry-schema.ts` | Email required |
| `lib/contact.ts` | `enquiryPayload`, `medicineEnquiryHref`, `medicineEnquiryMessage`; remove phone and WhatsApp helpers |
| `components/contact/contact-details.tsx` | Keep hours, office and email; new intro; remove phone and WhatsApp rows |
| `components/sections/contact.tsx` | New heading, intro and consent; remove WhatsApp number |
| `components/site-footer/site-footer.tsx` | Remove WhatsApp link and phone row |
| `components/about/about-cta.tsx`, `app/about/page.tsx` | "Email us" |
| `components/product-detail/product-summary.tsx`, `app/medicines/[slug]/page.tsx` | Link to `/contact?medicine=…` |
| `app/privacy/page.tsx` | Rewrite the collection and delivery wording; email only |
| `lib/seo.ts` | Remove `telephone`; keep `email` |
| `lib/site.ts` | `company.email`; remove `company.whatsapp` |
| `lib/whatsapp.ts` | Delete |
| `.env.example` | Add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` |
| `AGENTS.md` | §1, §7, §9, §11, §12: email delivery through Web3Forms |
| `DESIGN.md` | Contact row: address, email |

## Implementation requirements

- Zod validation stays client-side in `lib/enquiry-schema.ts`.
- Never log or store submitted data in the app.
- Only `fetch` from the submit handler. Treat a non-200 response, `success: false`, a network failure and a missing key all as the error state.
- Keep the entered values on error, and stop double submits while sending.

## UI

**Visual interpretation:** no new design and no new reference. The contact card keeps its layout, with fewer rows in the blue panel.

**Layout:** unchanged 5/7 split from 1024 px, stacked below. The panel now holds the hours, registered office and email; it stretches to the form's height, as it does today.

**Typography, spacing and colours:** existing styles and tokens (`blue-600`, `white`, `navy-900`, `ink-muted`). The submit button keeps its style with a `Send` icon replacing the WhatsApp icon.

**Responsive behaviour at 360, 768, 1024 and 1440 px:** same as today, with no sideways scroll. The footer contact column closes up with no gap where the rows were.

**States:**
- Idle and invalid: as today, with email now marked required.
- Sending: button disabled, reads "Sending…".
- Success: status panel "Thank you. We have received your enquiry and will reply by email." with "Send another enquiry"; focus moves to it.
- Error: "We could not send your enquiry. Please try again, or email us at <address>." Values stay.
- Hover and focus: unchanged, with visible outlines.

**Pixel expectations:** only the listed content changes.

## Copy (for client approval)

- Panel intro: "Contact us by email."
- Form heading: "Send an enquiry"
- Form intro: "Fill in the form and we will reply by email."
- Button: "Send enquiry"
- Consent: "I agree to send these details to <CompanyName legal /> so they can reply to my enquiry. See our Privacy Policy."
- Phone hint: "Optional. Add a number if you would like a call back."

## Security requirements

- Only the public Web3Forms key reaches the browser. No Sanity write token or revalidate secret is involved.
- The prefilled text renders as a form value only, never as HTML.
- The honeypot field is hidden from people and from assistive technology.

## Compliance check

- **Privacy Policy (DPDP Act 2023):** must now state that enquiries pass through Web3Forms to reach the company's inbox. It must not state how long Web3Forms keeps data unless confirmed. The client should review this wording.
- Consent line stays and links to `/privacy` (rule 8). Company name is rendered with `<CompanyName />` (rule 7).
- No claims, statistics or prices.

## Open items (not confirmed from the docs I could read)

- The free plan's monthly limit.
- How long Web3Forms keeps submissions. Check this before the client signs off the Privacy Policy.
- Whether `from_name` is a special field. It is not sent.

## Acceptance criteria

1. No company phone number, `tel:` link, `wa.me` link or WhatsApp wording appears in any page or the JSON-LD. `grep` finds none in `app`, `components` or `lib`, except the customer's optional phone box and the image comment about link previews.
2. A real test enquiry arrives in the inbox with all fields, and Reply goes to the customer's email.
3. Empty name, empty or invalid email, invalid phone, short message and unticked consent each show an error and send nothing.
4. A failed request (simulated) shows the error state with the email address, and keeps what was typed.
5. Double-clicking Send submits once.
6. A filled honeypot sends nothing through the form as a normal enquiry.
7. "Send an Enquiry" on a medicine page opens `/contact` with an editable prefilled message; `/contact` alone has an empty message.
8. Footer, About and Contact show the email as a `mailto:` link, with no empty gaps at 360, 768, 1024 and 1440 px.
9. `/contact` stays static; `tsc`, lint and build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; the `grep` in criterion 1; a production-build browser test of criteria 3 to 8 with the request intercepted; one real submission for criterion 2 once the key exists.

## Manual test steps

1. Get a free key at https://web3forms.com using the inbox for enquiries.
2. Add `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` to `.env.local` and to Vercel for Production.
3. `npm run dev` and open http://localhost:3000/contact.
4. Submit with empty fields, a bad email and consent unticked. Check each error.
5. Submit correctly. Check the thank-you message, the inbox, and that Reply goes to the address you typed.
6. Open a medicine page and click "Send an Enquiry". Check the message is prefilled and editable.
7. Check the footer, `/about` and `/privacy` show no phone number or WhatsApp.
8. Resize to 1024, 768 and 360 px, and tab through the form to check focus.

## Update: found during testing

- Send is disabled until the form is running. A native submit before then put the customer's details in the page URL, which would reach server logs (AGENTS §11).
- Web3Forms' Cloudflare protection answers headless browsers with a 403 challenge, so the real send (criterion 2) must be tested from a normal browser. Normal browsers get a CORS-enabled response from any origin. Faked responses cover everything else.
- Privacy Policy says Web3Forms may keep submissions for up to 3 years, from its website. Update it if the client sets a shorter period.
