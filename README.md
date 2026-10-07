# Terranile

Official Terranile corporate website, running on Next.js App Router and TypeScript.

Production: https://terranile.vercel.app

Custom domain: https://terranile.com (Hostinger DNS validation pending).

## Develop

Use Node 24. Run `npm ci`, then `npm run dev`. Open http://127.0.0.1:5174.

`npm run build` prepares the marketing content and builds Next.js. `npm run start` serves the production build. `npm run check` checks content, local links, assets and TypeScript. With a production server running, `npm run test:routes` checks all public routes, redirects, HTTP 404, the health API, sitemap and video range responses. Set `TEST_ORIGIN` to test a deployed site.

## Structure

- `app/`: native Next.js pages, metadata routes, 404 and API route handlers.
- `components/site-shell.tsx`: React navigation, shared footer and interaction loading.
- `scripts/`: approved marketing templates and content generation.
- `scripts/data.mjs`: project facts, statuses and external destinations.
- `scripts/ecosystem.mjs`: one dominant product preview with logo selectors.
- `public/`: local media, CSS and existing browser interactions.
- `generated/`: ignored build-time marketing content consumed only by server components.

This migration retains the approved marketing templates as trusted build-time HTML. New account pages and application features should use native React components. Never inject user submissions or API responses into the marketing HTML bridge. Current links load whole documents so the existing interaction scripts initialize once per page.

## Product screenshots

What we build shows actual AVAN, AvanBnB and OPEX homepage captures. Helios uses labelled conceptual imagery until a public interface is available. The captures are local WebP assets, not live embeds. AVAN currently shows its first-visit welcome tour. See `ASSETS.md` for sources and `scripts/capture-products.py` for refresh tooling.

## Platform plans

APIs, user accounts, signups and authenticated product experiences are planned. `/api/health/` verifies the server runtime; no account system or database has been implemented. See `ARCHITECTURE.md` before adding account features. Backtesting figures await the owner's data.

## Deployment

Vercel is connected to https://github.com/iammuhammads/terranile. The included `vercel.json` selects Next.js. Canonical URLs default to https://terranile.com; set the server build variable `SITE_URL` to override this. See `HOSTING.md` and `HOSTINGER-VERCEL-DNS.md`.

Photography and films are illustrative unless labelled as actual product captures. No Terranile-owned facilities, completed developments or validated research results are represented. Asset sources and generated-image prompts are documented in `ASSETS.md`.
