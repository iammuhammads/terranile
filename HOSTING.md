# Vercel hosting

Repository: https://github.com/iammuhammads/terranile

Production: https://terranile.vercel.app

The project runs Next.js App Router with TypeScript on Vercel. Use Node 24. Build with `npm run build && npm run check`; use the standard Next.js output. Do not configure this release as a static `dist` deployment or upload it to Hostinger public_html: native APIs need the Next.js server runtime.

The Vercel project is `terranile` under `muhammads-projects-c70ef934`. GitHub is connected. For local development use `npm ci` then `npm run dev`; production verification uses `npm run build`, `npm run start` and `npm run test:routes`.

## Domain

`terranile.com` is attached to the Vercel project. DNS remains with Hostinger and is managed by the owner. HTTPS and the updated Next.js site were verified at the custom domain on 7 October 2026. No further root-domain DNS change is currently needed. Follow `HOSTINGER-VERCEL-DNS.md` only if reconfiguring it, preserving email records. Canonical metadata and sitemap are pinned to https://terranile.com, including on preview builds. Next.js redirects the exact www and production terranile.vercel.app aliases to this apex; preview deployment hostnames remain available. Public DNS verified on 8 October 2026: apex A 216.198.79.1 and www CNAME terranile.com. No DNS edit was needed.

## Secrets and accounts

The current corporate pages require no service credentials. Keep future secrets in Vercel environment variables, never in public assets or NEXT_PUBLIC variables. Signup and authentication providers are not selected or configured yet. The health endpoint confirms only the web runtime, not a database or product API.

## Updating content

Project destinations are in `scripts/data.mjs`; product screenshot filenames and selector order are in `scripts/ecosystem.mjs`. Public assets live in `public/assets`. Marketing templates are converted into trusted server-only content during build by `scripts/prepare-next.mjs`. New interactive applications should use native React components and server-side authorization.

## Search verification

After deployment, confirm www returns a 308 to the apex with path and query preserved; every sitemap URL returns 200 with its exact apex canonical. `npm run test:routes` checks metadata, sitemap membership, robots, JSON-LD, query canonicals and local host redirects. Verify the Domain property in Google Search Console using its supplied TXT token alongside existing email records, submit `https://terranile.com/sitemap.xml`, then inspect the homepage, company and OPEX research URLs. Successful HTTP checks do not prove Google indexing.

Structured data uses public company facts and visible page content only. Research publication dates, named authors and peer review status must not be invented. Generated content is rebuilt from a clean `dist` directory; do not hand-edit generated output.
