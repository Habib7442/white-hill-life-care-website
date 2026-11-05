# Home hero honeycomb background

## Goal

Give the home hero the same glass honeycomb background as the About page, faded enough that the headline and capsule stay the focus.

## Skills and docs read

- `AGENTS.md` §5 (UI rules, contrast), §13 (performance)
- `DESIGN.md` §2 palette
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` (`fill`, `sizes`)

## Existing code inspected

- `components/hero/hero.tsx`: `bg-linear-to-br from-white to-sky-100`; text left, capsule right, navy highlights band below
- `components/about/about-hero.tsx`: full-bleed `/brand/about-hero.webp` with a light white overlay and centred text
- `public/brand/about-hero.webp` (1672 × 941): the honeycomb and glass cells fill the left and middle, and the right side is nearly empty

## Visual interpretation

The About image used as it is would put its strongest detail directly behind the home headline, because the home hero's text is on the left while About's is centred. So it needs flipping and fading here.

## Decisions and assumptions

1. **Same file, no new download:** reuses `/brand/about-hero.webp`.
2. **User decision: not flipped.** The image keeps its About page direction, so the honeycomb sits on the left behind the text, with a lighter white fade from the left to protect contrast.
3. **About 40% opacity** over the existing white-to-sky gradient. The exact opacity is tuned against screenshots, keeping the capsule as the strongest element.
4. **The navy highlights band stays solid;** the background covers only the area above it.
5. **Decorative:** `alt=""`. The splash covers the hero on a first visit, so it does not need top loading priority: the capsule keeps `priority`.

## Files

| File | Change |
|---|---|
| `components/hero/hero.tsx` | Add the background image and fade layers behind the existing content |

## Implementation requirements

- `next/image` with `fill`, `sizes="100vw"`, `object-cover`, `opacity-40`, `pointer-events-none`.
- The fade uses palette tokens only (`from-white`), with no hex values.
- Capsule tilt, float and entrance motion are unchanged.
- No new dependencies.

## UI

**Layout:** unchanged. Text left, capsule right from 1024 px; capsule above the headline on phones.

**Typography and spacing:** unchanged.

**Colours:** `white`, `sky-100`, and the image's own pale blues. Headline stays `text-black`, intro `text-slate-800`, trust row `text-ink-muted`.

**Responsive behaviour:**

| Width | Behaviour |
|---|---|
| 360 px | Image covers the hero; the fade runs top to bottom behind the text if needed |
| 768 px | Same, with text at full contrast |
| 1024 px | Honeycomb behind the capsule, text side calm |
| 1440 px | Same; the image scales up and stays faint enough that softness does not show |

**States:** buttons, hover and focus are unchanged. Reduced motion is unaffected, as the background does not move.

**Pixel expectations:** the header stays readable over the hero, and the join with the navy band stays a clean straight line.

## Security requirements

None. A static image already in the project.

## Compliance check

No copy changes. The image shows no people, claims or text.

## Acceptance criteria

1. The hero shows the same honeycomb as the About page, faint and in the same direction.
2. Headline, intro and trust row keep at least 4.5:1 contrast against the background beneath them.
3. The capsule remains the strongest visual; glass cells do not compete with it.
4. No visible seam at the navy band or the header.
5. No sideways scroll at 360, 768, 1024 or 1440 px.
6. No extra image download: the file weighs about the same as on About, and first-visit weight rises by no more than about 50 KB.
7. `tsc`, lint and build pass.

## Checks to run

`npx tsc --noEmit`, `npm run lint`, `npm run build`; production-build screenshots at 360, 768, 1024 and 1440 px; contrast measured from the screenshots at the text positions.

## Manual test steps

1. `npm run dev` and open http://localhost:3000. Open a new tab if you want the splash to play first.
2. Compare the hero with `/about`. It should be the same pattern, only fainter.
3. Check the headline and small trust row are easy to read.
4. Resize to 1024, 768 and 360 px.
