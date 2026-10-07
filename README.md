# Terranile

Official Terranile corporate website, running on Next.js App Router and TypeScript.

Production: https://terranile.vercel.app

Custom domain: https://terranile.com (DNS and HTTPS verified on 7 October 2026).

## Develop

Use Node 24. Run `npm ci`, then `npm run dev`. Open http://127.0.0.1:5174.

`npm run build` prepares the marketing content and builds Next.js. `npm run start` serves the production build. `npm run check` checks content, local links, assets and TypeScript. With a production server running, `npm run test:routes` checks all public routes, redirects, HTTP 404, the health API, sitemap and video range responses. Set `TEST_ORIGIN` to test a deployed site.

## Structure

- `app/`: native Next.js pages, metadata routes, 404 and API route handlers.
- `components/site-shell.tsx`: React navigation, shared footer and interaction loading.
- `scripts/`: approved marketing templates and content generation.
- `scripts/data.mjs`: project facts, statuses and external destinations.
- `scripts/ecosystem.mjs`: linked initiative logos with names underneath.
- `public/`: local media, CSS and existing browser interactions.
- `generated/`: ignored build-time marketing content consumed only by server components.

This migration retains the approved marketing templates as trusted build-time HTML. New account pages and application features should use native React components. Never inject user submissions or API responses into the marketing HTML bridge. Current links load whole documents so the existing interaction scripts initialize once per page.

## Product screenshots

Archived AVAN, AvanBnB and OPEX homepage captures are retained as local assets but are no longer displayed on the homepage. See `ASSETS.md` for sources and `scripts/capture-products.py` for refresh tooling.

## Platform plans

APIs, user accounts, signups and authenticated product experiences are planned. `/api/health/` verifies the server runtime; no account system or database has been implemented. See `ARCHITECTURE.md` before adding account features. Backtesting figures await the owner's data.

## Deployment

Vercel is connected to https://github.com/iammuhammads/terranile. The included `vercel.json` selects Next.js. Canonical URLs default to https://terranile.com; set the server build variable `SITE_URL` to override this. See `HOSTING.md` and `HOSTINGER-VERCEL-DNS.md`.

Photography and films are illustrative unless labelled as actual product captures. No Terranile-owned facilities, completed developments or validated research results are represented. Asset sources and generated-image prompts are documented in `ASSETS.md`.

The homepage now retains the four linked initiative logos with names below, without the What we build preview model. Newsroom routes are `/news/`, `/perspectives/` and `/announcements/`. Add approved updates in `scripts/news.mjs`; only records marked `published` appear publicly. No unannounced partnerships or releases are fabricated. Real estate is presented through partner-led projects and AVAN infrastructure.
