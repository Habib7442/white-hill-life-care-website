# Navy preloader redesign

## Goal

Redesign the home splash to match the client's new reference: a deep blue screen over a tablets-and-molecules photo, the white WhiteHill logo in the centre, "Health & Wellness" below it, and a loading bar instead of a spinner.

## Skills and docs read

- `AGENTS.md` §5 (reference is the source of truth, palette, motion, contrast), §10 (rule 7), §13 (performance)
- `DESIGN.md` §2 palette, §9 motion
- `prompts/preloader-reference-redesign.md` (current splash, its timing, once-per-tab gate)
- Project memory: the client keeps the 2.8 s splash; timing and once-per-tab behaviour stay

## Reference (attached by the user)

- Full screen deep royal blue, slightly lighter towards the top left, with blurred molecules and bokeh.
- Three or four white tablets on a reflective surface near the bottom centre, tinted blue.
- White WhiteHill logo (WH leaf mark, "WhiteHill", "Lifecares Pvt Ltd") in the centre, a little above the middle.
- A small spinner near the bottom. The user asked for a **loading bar** instead, and **"Health & Wellness"** added.

## Assets supplied

| File | What it is | Use |
|---|---|---|
| Tablets photo (736 × 736, light blue and white) | The background in the reference, before the blue tint | Background, converted to WebP and tinted blue on the page |
| White logo PNG (1512 × 1040) | White logo whose transparent background was cut out roughly: about 625,000 half-transparent pixels make the edges speckled | **Not used.** The site already has a clean white logo (`/brand/whitehill-logo-white.webp`), the same design, used in the footer |

## Existing code inspected

- `components/preloader/preloader.tsx`: three art files (landscape, tablet, phone), real logo mark, name, tagline and loading bar sized by `--splash-sky` and `--splash-unit`
- `app/globals.css`: `--splash-sky` and `--splash-unit` rules, splash keyframes (`splash-exit`, `splash-pop`, `splash-rise`, `splash-progress`)
- `components/preloader/splash-gate.tsx`: once-per-tab gate, unchanged
- `lib/site.ts`: `company.tagline` ("Pharmaceutical Company"), used only by the splash
- `scripts/prepare-splash-art.py` and `public/brand/splash-scene*.webp`: used only by the current splash

## Decisions and assumptions

1. **Background:** the tablets photo, `object-cover`, anchored to the bottom so the tablets stay in view, over `navy-900`. A blue tint and a soft lighter glow at the top left reproduce the reference, using palette colours only (`navy-900`, `blue-600`). The exact tint strength is tuned against the reference in screenshots.
2. **One background file for every screen,** since the photo is square and mostly soft bokeh. The three old art files and their script are deleted.
3. **Logo:** `whitehill-logo-white.webp`, centred. It already contains "WhiteHill" and "Lifecares Pvt Ltd", so the company name is not repeated as text.
4. **"Health & Wellness"** under the logo, in spaced capitals with thin rules on each side, in `white` on navy (`blue-200` measured about 4.4:1 against the background, under 4.5:1). `company.tagline` changes to "Health & Wellness"; nothing else uses it.
5. **Loading bar** under the tagline: `white/20` track, `white` fill. It fills over 2.2 s, just before the splash fades, as today.
6. **Fixed sizes instead of the sky calculations,** since nothing in the background has to be avoided except the tablets near the bottom. The `--splash-sky` and `--splash-unit` CSS is removed.
7. **Timing, once-per-tab gate and reduced-motion skip are unchanged.** Entrance motion stays as today: logo pop, tagline and bar rise, fade-out at the end.
8. **Background loads directly** (`unoptimized`, `fetchPriority="high"`, lazy so it is not downloaded when the splash is skipped), as the current art does.

## Files

| File | Change |
|---|---|
| `public/brand/splash-tablets.webp` | New, from the client's 1672 × 941 tablets photo (replaced a first 736 px version) |
| `components/preloader/preloader.tsx` | New layout |
| `app/globals.css` | Remove `--splash-sky` and `--splash-unit` |
| `lib/site.ts` | `company.tagline` becomes "Health & Wellness" |
| `public/brand/splash-scene.webp`, `splash-scene-portrait.webp`, `splash-scene-phone.webp`, `scripts/prepare-splash-art.py` | Delete |

## Implementation requirements

- Palette tokens only, with no hex values.
- No new dependencies. CSS motion only.
- The splash stays `aria-hidden` and does not block the page underneath.

## UI

**Visual interpretation:** a calm, dark brand screen: logo first, tagline second, a slim bar third, with the tablets quietly at the bottom.

**Layout:** a centred column, slightly above the middle of the screen. Tablets visible below it.

**Typography:**
- Logo: 240 px wide on phones, 300 px from 768 px, 340 px from 1440 px.
- Tagline: IBM Plex Sans semibold, 0.3em letter spacing, uppercase; 12 px on phones, 14 px from 768 px.

**Spacing:** tagline 20 px below the logo, bar 24 px below the tagline. Bar 160 px wide on phones, 200 px from 768 px, 3 px tall, rounded.

**Colours:** `navy-900`, `blue-600` (glow), `white` (logo, tagline, rules and bar), `white`.

**Responsive behaviour:**

| Width | Behaviour |
|---|---|
| 360 px | Logo, tagline and bar centred; tablets cropped from the sides as needed and kept visible at the bottom |
| 768 px | Larger logo; same column |
| 1024 px | Same |
| 1440 px | Same, with the background scaled up; it is soft by design, and the tint hides the low resolution |

**States:** no interactive elements. Reduced motion: no splash, as today.

**Pixel expectations:** colour and mood match the reference side by side. The logo is crisp. Tablets stay visible at the bottom on every size.

## Security requirements

None. Static images and text; the splash gate script is unchanged.

## Compliance check

- Registered name shown through the logo; no claims, numbers or prices.
- "Health & Wellness" is the client's own wording, as printed on the Cynovera pack.
- The photo shows no people.

## Acceptance criteria

1. At 1440 × 900 the splash matches the reference: deep blue, molecules, tablets at the bottom, white logo centred.
2. "Health & Wellness" and a loading bar appear under the logo; no spinner.
3. Text contrast at least 4.5:1 against the background beneath it.
4. Tablets visible and the logo not covering them at 360, 768, 1024 and 1440 px, and on a short 1366 × 650 window.
5. Background under about 80 KB, and only downloaded when the splash plays.
6. Timing, once-per-tab and reduced motion unchanged; no hydration warnings.
7. Old splash art and script removed, with no references left.
8. `tsc`, lint and build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; screenshots of the splash at 360, 768, 1024, 1366 × 650 and 1440 px; contrast measured from the screenshots; a network check that the background is not downloaded on a repeat visit.

## Manual test steps

1. `npm run build`, then `npm start`.
2. Open http://localhost:3000 in a **new tab** and compare the splash with the reference.
3. Refresh: no splash.
4. Check the splash in the device toolbar at 360 px and 768 px, using a new tab each time.

## Update: sharper photo (user request)

- Client supplied a 1672 × 941 version; the tint is lighter (photo 70%, softer navy overlay) so the tablets and molecules show more.
- A soft navy shade sits behind the logo, tagline and bar, so the tablets behind them never lower text contrast.
