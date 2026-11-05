# Page scroll fix and larger page headings

## Goal

Stop page links from landing at the bottom of the new page, and make the main heading larger on the inner pages.

## Skills and docs read

- `AGENTS.md` §5 (fonts, accessibility), §14 (fixed header)
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md` (scroll behaviour, "Scroll offset with sticky headers")
- `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` (`data-scroll-behavior`)
- `node_modules/next/dist/client/components/layout-router.js` (how the scroll target is chosen)

## Root cause (reproduced on the live site)

| Start position | Link | Result before the fix |
|---|---|---|
| Top of the page | Header link, `/` to `/about` | Lands at the bottom (scrollY 3996 of 3996) |
| Halfway or at the bottom | Header or footer link | Lands at the top, correctly |

`app/globals.css` sets `scroll-padding-top: var(--header-height)`. Next.js treats a page as out of view when its top edge sits above that value. The home and About pages start at y = 0, behind the fixed header, so the page always counts as out of view, even when already at the top. Next.js then calls `scrollIntoView()` on the whole page, which lands at the last element: the footer.

The header used plain `<a>` tags until `prompts/faster-page-navigation.md`, which is why this appeared after that change.

Removing the padding and adding `data-scroll-behavior` on the live page, without changing code, fixed all 6 tested cases (scrollY 0 each time).

## Existing code inspected

`app/layout.tsx`, `app/globals.css`, and the H1 in `components/about/about-hero.tsx`, `components/medicines/medicines-hero.tsx`, `app/contact/page.tsx`, `app/privacy/page.tsx`, `app/range/[slug]/page.tsx`, `app/not-found.tsx`, `components/product-detail/product-summary.tsx`.

## Decisions and assumptions

1. **Remove `scroll-padding-top` from `html`, and use `scroll-margin-top: var(--header-height)` instead** on elements with an `id` and on focusable elements (`a`, `button`, `input`, `select`, `textarea`). `/#quality` and `/#medicines` still stop below the header, and keyboard focus stays clear of it.
2. **Add `data-scroll-behavior="smooth"` to `<html>`,** as the Next.js 16 guide describes, so a page change jumps straight to the top. Today it visibly slides for up to about 1.5 s on long pages. Same-page `#` links keep their smooth scroll.
3. **Heading sizes.** The user named About and "other pages". The home hero is not changed; it was just sized.

| Page | Phone | From 640 px | From 1024 px | Was |
|---|---|---|---|---|
| About | 44 px | 56 px | 64 px | 36 / 48 / 56 |
| Our Medicines (long title) | 36 px | 48 px | 60 px | 30 / 36 / 50 |
| Contact, `/range` | 40 px | 48 px | 56 px | 34 / 34 / 44 |
| Privacy, Not found | 38 px | 44 px | 52 px | 30 / 30 / 40 |
| Medicine detail (product names can be long) | 34 px | 40 px | 48 px | 30 / 30 / 40 |

4. Font, weight and colour stay as each page has them. `text-[#13234a]` on About is left alone, as this task is only about size.

## Files

| File | Change |
|---|---|
| `app/globals.css` | Replace `scroll-padding-top` with `scroll-margin-top` rules |
| `app/layout.tsx` | `data-scroll-behavior="smooth"` |
| `components/about/about-hero.tsx`, `components/medicines/medicines-hero.tsx`, `app/contact/page.tsx`, `app/privacy/page.tsx`, `app/range/[slug]/page.tsx`, `app/not-found.tsx`, `components/product-detail/product-summary.tsx` | H1 size classes |
| `AGENTS.md` §14 | Note: do not put `scroll-padding-top` on `html` |

## Implementation requirements

- CSS and class changes only. No new components or dependencies.
- Reduced-motion behaviour is unchanged.

## UI

**Visual interpretation:** no new design. Headings are larger, on the existing layouts.

**Layout and spacing:** unchanged.

**Typography:** see the table above.

**Colours:** unchanged.

**Responsive behaviour at 360, 768, 1024 and 1440 px:** no sideways scroll or clipped words. Long titles may wrap, without overlapping the band edges on About and Medicines.

**States:** link focus outlines stay visible and clear of the header.

**Pixel expectations:** only heading sizes change.

## Security requirements

None.

## Compliance check

No copy changes.

## Acceptance criteria

1. From the top of every main page, every header, hero and footer page link lands at the top of the new page.
2. The same from halfway down and from the bottom of the page.
3. A page change jumps straight to the top, with no visible slide.
4. `/#quality` and `/#medicines` land below the header, from another page and from the home page, and still scroll smoothly on the home page.
5. The skip link and keyboard Tab keep the focused element clear of the header.
6. Back and Forward restore sensible positions.
7. Headings match the table, with no sideways scroll at 360, 768, 1024 or 1440 px.
8. `tsc`, lint and build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; a production-build scroll test of the cases above; screenshots of each page's heading at 360, 768, 1024 and 1440 px. After the deploy, repeat the top-of-page test on the live site.

## Manual test steps

1. `npm run build`, then `npm start`.
2. At the top of the home page, click About Us. You should stay at the top of `/about`.
3. Repeat with Products and Contact, from the top, the middle and the bottom of a page, and with the footer links.
4. Click "Quality" in the footer from `/contact`: the section starts just below the header.
5. Use the Back button.
6. Press Tab through a long page and check the focused item is never hidden behind the header.
7. Check the headings on `/about`, `/medicines`, `/contact`, `/privacy` and a medicine page at 360 px and on desktop.
