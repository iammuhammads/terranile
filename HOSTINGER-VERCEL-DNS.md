# terranile.com on Vercel

Vercel project: `muhammads-projects-c70ef934/terranile`.

Production URL: https://terranile.vercel.app

The GitHub repository is connected to this Vercel project. DNS and HTTPS at https://terranile.com were verified on 7 October 2026. The domain serves the migrated Next.js site and actual product homepage captures. No additional root-domain change is currently required. The record below documents the setup for future reference.

In Hostinger, open Domains → terranile.com → DNS / Nameservers. Public DNS on 8 October 2026 was independently observed through Google and Cloudflare resolvers as follows. This is an observation, not a substitute for the current Vercel project domain recommendation:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 216.198.79.1 |
| CNAME | www | terranile.com |

Both hostnames resolve and HTTPS works. No live DNS change is required by this verification. If reconfiguring, use the exact records recommended in the current Vercel project settings rather than reverting to the older documented `76.76.21.21` address. Keep Hostinger's existing nameservers and all email MX/TXT records. The previous Sites DNS addresses must not be used for this Vercel setup. Recheck the current record recommendation in Vercel's project domain settings before editing if this document is used later.

When reconfiguring DNS later, wait for Vercel to validate it and issue HTTPS before treating the domain as live.

No Hostinger DNS edits were performed by the agent because no registrar session was available.

Canonical host: `https://terranile.com`. Next.js permanently redirects the exact `www.terranile.com` and production `terranile.vercel.app` hosts to the apex, preserving paths and queries. DNS CNAME records do not perform HTTP redirects. Preview deployment hostnames are not covered by these rules.
