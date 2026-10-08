# Terranile platform direction

The owner plans to expand Terranile beyond the corporate website into APIs, user accounts, signups and authenticated product experiences. Keep that requirement in mind when adding features.

## Current release

The corporate site now runs on Next.js App Router with TypeScript on Vercel. Marketing pages are pre-rendered. Native routing, React navigation/footer, metadata routes, HTTP redirects, a real 404 and a dynamic `/api/health/` route are implemented. Client commissioning routes, Supabase email-link authentication, an owner-scoped project-request API and a database migration are implemented. They require the owner’s Supabase configuration before signup or persisted submissions are enabled. The public email-brief flow works without that configuration.

## Recommended next step

The framework migration preserves the design, content, media, product destinations and public routes. Existing marketing templates currently enter server components as trusted, build-time HTML. Convert sections to native React components when modifying their application behavior; never inject user or API data into the HTML bridge. New signup, login and dashboard pages should use native React components, with server-side route handlers for application endpoints.

Choose an established authentication provider and a persistent database when the first account flow is specified. Authentication must include server-side authorization for protected data and actions. Do not build a custom password/session system solely because the framework supports APIs.

Separate product accounts and permissions deliberately: a Terranile account should not silently imply access to AVAN, AvanBnB, Helios or OPEX. Define the actual relationship before implementing shared sign-in. Keep existing product applications independent while that decision is pending.

Keep long-running scientific computations, backtesting and background jobs in suitable worker services rather than page requests. The web application can submit jobs and show their status through APIs.

## Not yet decided

- The first signup use case is Terranile client commissioning; email-link identity and name are implemented.
- Whether accounts are Terranile-wide or specific to individual products.
- Supabase project credentials and production email delivery setup.
- User roles and organization membership.
- API consumers, access rules and background-job requirements.

See COMMISSIONING-SETUP.md for enabling and verifying client accounts. Shared-product sign-in is not implemented.

References: https://nextjs.org/docs/app/getting-started/route-handlers and https://nextjs.org/docs/app/guides/authentication
