# Terranile platform direction

The owner plans to expand Terranile beyond the corporate website into APIs, user accounts, signups and authenticated product experiences. Keep that requirement in mind when adding features.

## Current release

The current website is a static corporate site deployed on Vercel. It does not provide authentication, user records or runtime APIs. Deploying it to Vercel does not itself implement these capabilities.

## Recommended next step

Migrate the existing design and routes to Next.js App Router with TypeScript before implementing signup, login or user dashboards. Preserve the public pages, media, project destinations and SEO metadata during migration. Keep public content pre-rendered where appropriate, and add server-side route handlers for application endpoints.

Choose an established authentication provider and a persistent database when the first account flow is specified. Authentication must include server-side authorization for protected data and actions. Do not build a custom password/session system solely because the framework supports APIs.

Separate product accounts and permissions deliberately: a Terranile account should not silently imply access to AVAN, AvanBnB, Helios or OPEX. Define the actual relationship before implementing shared sign-in. Keep existing product applications independent while that decision is pending.

Keep long-running scientific computations, backtesting and background jobs in suitable worker services rather than page requests. The web application can submit jobs and show their status through APIs.

## Not yet decided

- The first signup use case and required profile fields.
- Whether accounts are Terranile-wide or specific to individual products.
- Authentication and database providers.
- User roles and organization membership.
- API consumers, access rules and background-job requirements.

Next.js migration and account implementation are recommendations for the next phase; they have not been performed in this release.

References: https://nextjs.org/docs/app/getting-started/route-handlers and https://nextjs.org/docs/app/guides/authentication
