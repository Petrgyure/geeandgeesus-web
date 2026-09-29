# Gee & Geesus — demo readiness (2026-09-29)

This branch reconstructs the 2026-06-25 Vercel production deployment `dpl_4Co3YW9NzaNh5BW6xg3FAXieJeSq` from its authenticated source tree. All 104 deployment source files were compared to public GitHub `main` by SHA-1; 20 differing/missing files were recovered. The branch then removes nonfunctional account forms and prepares a non-indexed demo on `geeandgeesus.vercel.app`.

## Demo scope
- Present public pages, services, gallery, blog, location and the Noona service selection screen.
- Do **not** claim that a booking has completed; no live booking was submitted.
- Do **not** demonstrate `/manage.html`: its login is browser-side only, and publishing requires a GitHub token entered into the browser. This admin is not a secure or verified production workflow.
- Client accounts are explicitly marked as in preparation. The login/registration controls were removed; a booking CTA remains.
- `www.geeandgeesus.cz` still serves the older site. Do not change DNS or claim domain cutover.

## Before domain cutover
- Remove the preview-only global `noindex,nofollow` in `src/app/layout.tsx`.
- Update `metadataBase`, `openGraph.url`, `src/app/sitemap.ts` and `src/app/robots.ts` to the actual canonical domain; add distinct canonical URLs for each page instead of the former global `/` canonical.
- Rework or restrict `/manage.html` server-side; do not rely on its client-side password or browser token storage.
- Confirm the client's approved copy, prices, opening hours and completed Noona booking in coordination with the client.

## Rollback
The previous Vercel production deployment is `dpl_4Co3YW9NzaNh5BW6xg3FAXieJeSq` (2026-06-25). It can be restored via the Vercel rollback/promote workflow if the new deployment fails. Verify the alias after any rollback.

## Checks
`npm run build`, `npm run lint`, `node --test tests/demo-smoke.test.mjs`, and a read-only protected-preview route crawl. These checks do not test admin publishing or final booking completion.
