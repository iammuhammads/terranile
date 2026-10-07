# Deploy from GitHub

Repository: https://github.com/iammuhammads/terranile

This website uses Node 22 or newer to generate static HTML. It has no runtime dependencies, database or environment secrets. All public images and videos are local in `dist/assets`.

## Vercel

Import the GitHub repository as a new Vercel project. The included `vercel.json` sets the build command to `npm run build && npm run check` and the output directory to `dist`.

When connecting the production domain, set the build environment variable `SITE_URL` to `https://terranile.com` and redeploy. This updates canonical URLs, social URLs and the sitemap. Add `terranile.com` (and optionally `www.terranile.com`) in the hosting project's domain settings.

In Hostinger's DNS settings, use the exact records shown by the chosen hosting provider. Preserve email MX and mail verification records. Remove conflicting website A/AAAA/CNAME records only for the hostname being connected. Wait for the hosting provider to confirm both DNS and HTTPS before treating the domain as live.

The earlier Sites-specific DNS instructions apply only to Sites hosting. Do not combine them with a Vercel setup.

## Hostinger static hosting

Run `npm run build` with `SITE_URL=https://terranile.com` in the build environment, then upload the contents of `dist` to the domain's `public_html` directory. Upload the files inside `dist`, rather than a enclosing `dist` folder. Configure the host's custom 404 page to use `404.html`.

## Content updates

Project destinations are in `scripts/data.mjs`. Ecosystem order, names, logos and optional screenshot filenames are in `scripts/ecosystem.mjs`. Add approved static screenshots to `dist/assets` and set each product's `preview` field. Helios currently uses conceptual imagery; no interface or research results are represented.

OPEX backtesting data is awaiting the owner's results. Do not publish example figures as actual performance.

The current AVAN platform remains external. `/avan/` is Terranile's AVAN overview, not a copy of the AVAN application.
