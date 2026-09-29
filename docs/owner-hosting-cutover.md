# Gee & Geesus — owner access and hosting cutover gate

Status: **draft, not approved for cutover**. Branch `feat/owner-admin-auth` contains server-gated owner login code, but has not been deployed. The public Vercel site remains the presentation build. Do not tell the owner that admin login or publishing is live.

## Confirmed deployment facts

- Vercel project: `petrgyures-projects/geeandgeesus`, project ID `prj_oZsOJnm5TicF53PWmqQESQLuIySi`, framework Next.js, current public alias `geeandgeesus.vercel.app`.
- A read-only project API response did **not** include a Git repository `link`; production deployment metadata identifies a CLI promotion, not a Git commit. A write to GitHub alone therefore cannot be represented as a live Vercel publication.
- `Petrgyure/geeandgeesus-web` default `main` is older than the deployed source. The recovered deployment source was saved to `recovery/vercel-live-2026-09-29`, and the owner-auth work branches from it. Never connect old `main` to production unchanged.
- `www.geeandgeesus.cz` still serves the older site. Domain/DNS migration and real bookings remain out of scope under the prior explicit decision.

## Intended architecture for approval

1. Review the recovered branch against live Vercel content. Choose an explicit production Git branch containing that source plus reviewed admin changes; do not silently overwrite old `main`.
2. Link the Vercel project to `Petrgyure/geeandgeesus-web` **only after Péťa approves the exact branch and cutover**. Verify a benign Git change deploys to a preview URL and then the production alias. Define rollback to the last known good Vercel deployment.
3. Set an owner password and an independent session signing secret as Vercel server-side sensitive environment variables. Provision them without putting values in chat, repository, logs or browser automation. The owner uses only the site login; a GitHub credential must never be entered into the browser admin.
4. For content publishing, use a separate repo-scoped server-side GitHub credential. Commit only validated `public/content.json` and `public/gallery.json` to the explicitly configured production branch. Consider GitHub App instead of a long-lived PAT if operationally feasible. Verify Git commit, Vercel deployment completion, production alias and rendered content end-to-end; an accepted API write alone is not a live publication.
5. Rate-limit login, test on HTTPS Vercel preview, test cookie flags, unauthorized/CSRF failures and no-store caching. Resolve XSS in the legacy HTML admin before enabling write; disallow arbitrary file paths and unvalidated uploads.
6. Obtain client approval for copy, prices, hours, privacy/legal copy and final design; test one real booking only with client coordination. These cannot be inferred from HTTP 200 or a booking iframe.
7. For eventual custom-domain migration, remove preview noindex and correct canonical/sitemap only **in the same approved release** as DNS change. Confirm DNS, TLS and redirect behavior after cutover; do not pre-announce `www` as serving this build.

## Acceptance checks

- Public Vercel URL works anonymously on desktop and mobile; navigation, assets and booking widget load, without claiming a completed booking.
- Admin login page works over HTTPS; without session `/manage.html` redirects and `/api/admin/*` rejects access; wrong password, invalid Origin, malformed session and missing configuration fail closed. No secret is exposed client-side.
- Owner can save an authorized content change without a browser token; the Git commit appears on the chosen production branch; the linked Vercel deployment turns READY and the production alias reflects the change. Rollback is rehearsed.
- Domain change and client-facing launch are separate explicit approvals. Until the above is observed, admin access/publishing is **not done**.
