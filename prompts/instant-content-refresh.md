# Instant website refresh after admin edits

## Goal

When the client saves anything in the admin panel, the live website shows the change on the very next page load, without relying only on Sanity's webhook.

## Skills and docs read

- `AGENTS.md` §9 (revalidation contract), §12 (secrets, `/api/revalidate` signature check)
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/revalidateTag.md`: `"max"` = stale-while-revalidate (first visitor after a change still gets the old page); `{ expire: 0 }` = stale content is never served, the next request renders fresh
- `@sanity/webhook` v4: `encodeSignatureHeader` is async; signature `t=<ms>,v1=<HMAC-SHA256>`

## Existing code inspected

- Website `app/api/revalidate/route.ts`: verifies the Sanity signature, then `revalidateTag(_type, "max")`
- Website `lib/sanity/client.ts`: `useCdn: true`; `lib/sanity/fetch.ts`: `"use cache"` + `cacheLife("max")` + tags `product`, `category`, `siteSettings`
- Admin `lib/actions/guard.ts` `invalidate()`: updates the admin's own cache only; the website hears about changes only through Sanity's webhook
- Incident 22 Oct 2026: a Haemoverse image fix at 04:03:37 UTC never reached `/medicines/haemoverse`; a correctly signed manual call refreshed it at once (endpoint and secrets are fine; the webhook delivery is unconfirmed)

## Why changes can lag today

1. **Stale-while-revalidate**: `revalidateTag(tag, "max")` serves the old page to the first visitor while it rebuilds.
2. **Sanity CDN**: the site reads through `apicdn.sanity.io`; a rebuild right after a save can fetch the old data from the CDN and cache it again.
3. **Single path**: if a webhook delivery is lost or late, nothing else tells the site.

## Decisions

1. **Admin pings the website directly** after every successful write (save, delete, duplicate, show/hide, reorder, move, category and settings changes). It sends a signed `POST` to `https://whitehilllifecares.com/api/revalidate` with the same signature format Sanity uses and the body `{ _type, source: "admin" }` (see decision 4: without `source`, the route waits 3 s). The Sanity webhook stays as a second path (Studio edits still use it).
2. **Website revalidates with `{ expire: 0 }`** instead of `"max"`: no visitor is served the old page after a change; the next request renders fresh (one slower load, ~1 s, then cached again).
3. **Website reads Sanity's live API (`useCdn: false`)**. Pages are cached by Next and only rebuild after a change, so this adds a handful of requests per edit, not per visit. It prevents re-caching CDN-stale data.
4. `next-sanity`'s `parseBody` waits 3 s by default (Sanity webhooks can arrive before the change is queryable). The route now parses without that wait and sleeps 3 s itself only for webhook calls; admin calls send `{ _type, source: "admin" }` after the write is committed and visible (`visibility: "sync"`), so they skip it.
5. Admin waits for the ping (max 5 s timeout). If the website is unreachable, the save still succeeds and the admin shows a warning toast ("Saved. The website couldn't be refreshed; it will update via Sanity shortly.").
6. The admin never sends the secret anywhere but the website's own endpoint, from the server (Server Action), never from the browser.

## Files to create or modify

Website (`whitehill-lifecare`):
- `app/api/revalidate/route.ts`: `revalidateTag(body._type, { expire: 0 })`; also accept `product` / `category` / `siteSettings` only (ignore other types with 200 "ignored")
- `lib/sanity/client.ts`: `useCdn: false` with a comment explaining why
- `AGENTS.md` §9: document both refresh paths and `{ expire: 0 }`

Admin (`whitehill-lifecare-admin`):
- `lib/website.ts` (new, server-only): `refreshWebsite(type)` → signed POST via `@sanity/webhook` `encodeSignatureHeader` (await it), 5 s timeout, returns `true/false`, never throws, never logs the secret
- `lib/actions/guard.ts`: `invalidate()` also calls `refreshWebsite` for the affected type(s); actions return a `websiteRefreshed` flag
- client toasts: show the warning when `websiteRefreshed === false`
- `.env.example`, README: add `SANITY_REVALIDATE_SECRET` (same value as the website and the Sanity webhook)
- `package.json`: add `@sanity/webhook`

## Security requirements

- `SANITY_REVALIDATE_SECRET` is server-only in the admin (`server-only` module); never in client code, URLs or logs.
- The website endpoint keeps rejecting missing/invalid signatures with 401 (unchanged), and now ignores unknown `_type` values.
- Only the configured `NEXT_PUBLIC_SITE_URL` is called (no user-supplied URL).

## Compliance check

No user-facing copy on the website. Admin toast text only.

## Acceptance criteria

1. Edit any product field in the admin → reload the website product page and the listing → both show the change on the first reload (no "old page once").
2. Show/hide, reorder, category rename and site settings changes appear on the first reload.
3. Unsigned or wrongly signed requests to `/api/revalidate` still return 401.
4. With the website unreachable (wrong URL locally), the admin save succeeds and shows the warning toast.
5. `tsc`, `lint`, `build` pass in both projects.

## Checks to run

Both projects: `npx tsc --noEmit`, `npm run lint`, `npm run build`. Signed / unsigned `curl` tests against the local website. End-to-end: local admin → local website with matching secret.

## Manual test steps

1. Set `SANITY_REVALIDATE_SECRET` in the admin's Vercel project (same value as the website) and redeploy both.
2. In the admin, change a product's composition text, save, then open the product page on the website: the new text shows on the first load.
3. Toggle a product hidden: it disappears from `/medicines` on the first reload; toggle it back.
4. Change the phone number in Site settings: shows on the first reload.
