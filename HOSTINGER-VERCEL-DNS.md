# terranile.com on Vercel

Vercel project: `muhammads-projects-c70ef934/terranile`.

Production URL: https://terranile.vercel.app

The GitHub repository is connected to this Vercel project. DNS and HTTPS at https://terranile.com were verified on 7 October 2026. The domain serves the migrated Next.js site and actual product homepage captures. No additional root-domain change is currently required. The record below documents the setup for future reference.

In Hostinger, open Domains → terranile.com → DNS / Nameservers. Vercel's domain inspection currently requests:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 76.76.21.21 |

Replace conflicting website A/AAAA records for `@` with this record. Keep Hostinger's existing nameservers and all email MX/TXT records. The previous Sites DNS addresses must not be used for this Vercel setup. Recheck the current record recommendation in Vercel's project domain settings before editing if this document is used later.

When reconfiguring DNS later, wait for Vercel to validate it and issue HTTPS before treating the domain as live.

No Hostinger DNS edits were performed by the agent because no registrar session was available.
