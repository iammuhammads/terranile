# Vercel hosting

Repository: https://github.com/iammuhammads/terranile

Production: https://terranile.vercel.app

The project runs Next.js App Router with TypeScript on Vercel. Use Node 24. Build with `npm run build && npm run check`; use the standard Next.js output. Do not configure this release as a static `dist` deployment or upload it to Hostinger public_html: native APIs need the Next.js server runtime.

The Vercel project is `terranile` under `muhammads-projects-c70ef934`. GitHub is connected. For local development use `npm ci` then `npm run dev`; production verification uses `npm run build`, `npm run start` and `npm run test:routes`.

## Domain

`terranile.com` is attached to the Vercel project. DNS remains with Hostinger; the owner will make the DNS change. Follow `HOSTINGER-VERCEL-DNS.md`, preserving email records. Once DNS and HTTPS are confirmed, the production domain will serve the same site. Canonical metadata and sitemap default to https://terranile.com.

## Secrets and accounts

The current corporate pages require no service credentials. Keep future secrets in Vercel environment variables, never in public assets or NEXT_PUBLIC variables. Signup and authentication providers are not selected or configured yet. The health endpoint confirms only the web runtime, not a database or product API.

## Updating content

Project destinations are in `scripts/data.mjs`; product screenshot filenames and selector order are in `scripts/ecosystem.mjs`. Public assets live in `public/assets`. Marketing templates are converted into trusted server-only content during build by `scripts/prepare-next.mjs`. New interactive applications should use native React components and server-side authorization.
