# Terranile Digital Infrastructure Ltd.

A lightweight, statically generated corporate site. No runtime dependencies or database are required.

## Develop

Run `npm run build`, then `npm run dev`. Open http://127.0.0.1:5173.

Run `npm run check` to verify page metadata, local links, assets and JavaScript syntax.

## Edit

- `scripts/data.mjs`: structured projects, capabilities, statuses, fields and perspectives.
- `scripts/build.mjs`: shared page layouts and navigation.
- `scripts/home-v3.mjs`: six hero panels and the editorial homepage.
- `scripts/helios.mjs`: biological imagery, laboratory clips and media credits.
- `dist/site.css`: shared design tokens, typography, responsive layouts and motion.
- `dist/visuals-v2.css`: titanium, teal and copper visual direction and cinematic layout.
- `dist/visuals-v3.css`: centered panel rail, progress controls and editorial imagery.
- `dist/panel-deck.js`: looped panel navigation, drag, horizontal wheel and accessible pause behavior.
- `dist/site.js`: navigation, viewport reveals and conceptual visualizations.

Add future initiatives to the projects array with a unique slug and path. The generator creates each detail page from the same layout. Add the initiative to the appropriate index and homepage selection as needed.

Company facts come from the supplied brief. The three perspective pieces are editorial summaries written from that brief; they are not dated news announcements or published scientific papers. Leadership profiles and vacancies await verified company information.

## Photography

Architecture: Joss Broward, https://unsplash.com/photos/a-black-and-white-photo-of-a-building-qJKUR2PLxMQ

Hospitality: Franco Debartolo, https://unsplash.com/photos/a-neutral-toned-living-room-with-modern-decor-KJVfcwpHI1w

License: https://unsplash.com/license. Photographs illustrate architecture and hospitality, not Terranile-owned developments. Assets are downloaded locally for reliable delivery.

Scientific and quantitative graphics are conceptual, not actual measurements, research findings or market data.

Generated image prompts and video sources are recorded in `ASSETS.md`. The six hero panels include distinct OPEX imagery. The carousel advances every ten seconds, supports mouse/touch drag, horizontal wheel navigation and keyboard selection. It pauses on hover, focus, offscreen, document hiding or explicit pause, and disables automatic movement for reduced motion. Company, Research and Careers pages include illustrative people scenes without visible faces. Laboratory clips load on intersection or explicit playback; only one selected clip plays.

AVAN's public overview route is `/avan/`; `/companies/avan/` is preserved as an alias. The current AVAN product link is `https://dist-peach-ten-62.vercel.app/`, recorded in `scripts/data.mjs`, alongside the future `https://terranile.com/avan` destination. AvanBnB opens `https://avanbnb.com/`. Changing AVAN's eventual hosting is a separate deployment task; the temporary platform remains the active external link.

## Hosting

Generated pages live in `dist/` and can be served by any static web host. This GitHub release includes Vercel configuration and Hostinger static-hosting instructions in `HOSTING.md`. Production metadata defaults to https://terranile.com; set SITE_URL to override it for another deployment.

## Product ecosystem

The homepage uses one large selected-product visual above a four-logo selector. Names sit beneath logos. It supports hover, click, keyboard selection and mobile swipe, with reduced-motion handling. Previews currently use labelled illustrative images; approved actual screenshots can be added through `scripts/ecosystem.mjs`.

For GitHub deployment, domain configuration and screenshot updates, see [HOSTING.md](HOSTING.md).
