# Custom 404 page and navigation progress bar

## Goal

Add a branded 404 page and a thin top progress bar that shows while the site moves from one page to another.

## Decisions

1. **Loader style:** top progress bar (user chose it over a full-screen logo loader). The first-visit splash screen stays as is.
2. **Progress bar** (`components/navigation-progress.tsx`, mounted once in the root layout inside the existing `<Suspense>`):
   - **Starts** on a left-click of an internal link to a *different* path. Ignored: modifier keys, `target`, downloads, external links, and same-page section links (`SectionScroll` handles those).
   - **Finishes** when the pathname changes. A 10 s safety timeout also finishes it.
   - **Look:** 3 px `bg-blue-600`, fixed at the very top above the header (`z-[60]`). It creeps to ~85 % while loading, jumps to 100 %, then fades out.
   - `aria-hidden` (purely visual). With reduced motion, it shows without the creeping animation.
   - Full page loads (plain `<a>` to `/#section` from another page) show the browser's own loading state; the bar isn't needed there.
3. **404 page** (`app/not-found.tsx`) also covers unknown `/medicines/<slug>` (the detail page calls `notFound()`):
   - Solid header and a white section with a small decorative molecule SVG (`aria-hidden`, blue palette).
   - Eyebrow "Error 404", H1 (Source Serif 4) "Page not found", one line of text.
   - Two buttons: "Back to home" (`/`) and "View our medicines" (`/#medicines`).
   - Metadata: title "Page not found", `robots: noindex`.

## Copy (placeholder, needs approval)

- "Page not found"
- "The page you're looking for may have moved or no longer exists."

## Checks

`npx tsc --noEmit`, `npm run lint`, `npm run build`; manual: open `/xyz` and `/medicines/xyz` → 404 page; click a product card → bar runs and finishes; header links on `/` don't start the bar.
