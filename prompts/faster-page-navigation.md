# Faster page navigation and lighter product images

## Goal

Make moving between pages feel close to instant by using client-side links in the header and mobile menu, and reduce product card image size without any visible loss of quality.

## Skills and docs read

- `AGENTS.md` §5 (pack images never cropped), §13 (performance), §14 (hydration)
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md` (prefetching, hash links, `scroll`)
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` (`sizes`)

## Existing code inspected

- `components/site-header/site-header.tsx`: logo, main nav and "Connect With Us" are plain `<a>` tags, so each click reloads the whole page. The skip link is also `<a>`, and correctly so.
- `components/site-header/mobile-menu.tsx`: nav links and button are plain `<a>` tags with `onClick={close}`.
- `components/site-footer/site-footer.tsx`: page links already use `<Link>`.
- `components/navigation-progress.tsx`: top progress bar that starts on link clicks and finishes when the path changes. It was built for client-side navigation, so it starts working from the header once these links change.
- `components/product-card.tsx`: asks Sanity for 800 px images, and `sizes` says up to 360 px wide on desktop and 92vw on phones.
- All 7 pack images in Sanity are square (1254 × 1254). With `object-contain` in a box 240 px tall (180 px on phones, less 32 px padding), they display at about 208 px (148 px on phones).

## Measurements before the change (live site)

- `/medicines` first visit on desktop: about 630 KB, main content at about 1.5 s. Repeat visit: about 0.6 s.
- First visit on a phone on a simulated slower connection: about 750 KB, of which images are about 384 KB; main content at about 3.9 s.
- Largest pack image on a phone: 84 KB.
- A not-yet-cached image size: 0.75 to 1.25 s. Cached: 0.45 to 0.6 s.

Page and file requests were served from Vercel's cache, so data fetching is not the problem. No change to caching or Sanity queries.

## Decisions and assumptions

1. **`<Link>` for the logo, main nav, header button and mobile menu links.** The skip link stays `<a>`, because it moves focus within the page.
2. **Default link prefetching stays on,** as the footer already does. It uses a little extra data to make the click fast. Acceptance criterion 6 checks the cost.
3. **Correct `sizes` to what is actually displayed:** `(min-width: 768px) 240px, 180px`. My earlier estimate of 360 px was the width of the box; a square image in that box is limited by its height.
4. **Source image request drops from 800 px to 640 px.** That still covers a 3× phone (540 px) and a 2× desktop (480 px).
5. **Assumption:** packs stay square. A wider image added later would display wider than 240 px, but would still be sharp on a 2× screen because the browser picks a 640 px file.

## Files

| File | Change |
|---|---|
| `components/site-header/site-header.tsx` | `<a>` to `<Link>` for the logo, nav links and button |
| `components/site-header/mobile-menu.tsx` | `<a>` to `<Link>`; keep `onClick={close}` |
| `components/product-card.tsx` | New `sizes`, source width 640 |
| `AGENTS.md` §14 | Note: internal page links use `<Link>`, not `<a>` |

## Implementation requirements

- No visual change to the header, menu or cards.
- No new dependencies. Styling classes stay as they are.
- `/#section` links keep working from every page, with the existing smooth scroll and header offset.

## UI

**Visual interpretation:** no new design, and no reference image applies. Everything looks the same; only speed changes.

**Layout, typography, spacing and colours:** unchanged, using the existing tokens.

**Responsive behaviour:** unchanged at 360, 768, 1024 and 1440 px. The hamburger menu still appears below 820 px and closes after a tap.

**States:**
- Hover and visible focus styles on links are unchanged.
- The thin progress bar now shows when moving between pages from the header.
- The empty catalog message and the blur placeholder on images are unchanged.

**Pixel expectations:** pack images look equally sharp on 1× and 2× screens and are never cropped.

## Security requirements

None. No data, secrets or server code change.

## Compliance check

No copy changes.

## Acceptance criteria

1. Clicking any header or mobile menu link between `/`, `/about`, `/medicines` and `/contact` does not reload the page (a value set on `window` survives the click).
2. Page-to-page time from a click is measured before and after, and is reported.
3. "Home", the logo and any `/#section` link land in the right place from another page and from the home page, below the fixed header.
4. The mobile menu closes after a tap and keyboard focus is not lost.
5. The header is transparent on the home page and solid on other pages after moving between them. The splash does not replay, and hero and section animations do not get stuck hidden on returning to the home page.
6. `/medicines` first-visit weight on a phone drops, with images well under the current 384 KB, and prefetching adds no more than about 100 KB to the first load of any page.
7. Pack images are not visibly softer on 1× and 2× screens.
8. Browser Back and Forward work and restore the page.
9. `tsc`, lint and build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; a production-build browser test of criteria 1 to 8 at 1440 and 390 px; screenshots of the header and cards at 360, 768, 1024 and 1440 px. Final timing on the live site after the deploy, because local timings do not include real network delays.

## Manual test steps

1. `npm run build`, then `npm start`.
2. Click Home, About Us, Products and Contact in the header. The page should change without a full reload, with the thin bar at the top.
3. Click the logo from `/about`, and "Quality" in the footer from `/contact`. Check where each one lands.
4. At 390 px, open the menu, tap a link and check it closes.
5. Use the browser's Back and Forward buttons.
6. Go to `/medicines`, and compare the pack images with the live site side by side.
7. Tab through the header with the keyboard and check the focus outline is visible.
