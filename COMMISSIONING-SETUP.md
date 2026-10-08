# Build with Terranile

Public route: `/build/`. Websites, apps and custom software start at USD 10,000; AI and research engagements at USD 20,000. Final scope, delivery and commercial terms require a proposal. No payment or legally binding contract is created by the enquiry flow.

Without account configuration, the public form validates a brief and opens a prepared mailto draft or copies its text. This does not send an email automatically or save the enquiry on the server. The UI explains the handoff. No fake account creation or local password storage is used.

## Enable real client accounts and persisted requests

The owner must connect a Supabase project. No Supabase project or external account was created by this change.

1. Create or select the owner's Supabase project. Run `supabase/migrations/20261008_project_requests.sql` once through its migration tooling or SQL editor. It enables owner-scoped RLS, denies anonymous reads/writes and client status changes, enforces minimum budgets and limits inserts to 5 per account in a rolling 24 hours.
2. Enable email sign-in and configure production SMTP for delivery. Set Site URL to `https://terranile.com` and allow `https://terranile.com/auth/callback/` as a redirect. Add only intended development/test callbacks.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to Vercel Production (and separately to approved previews). These are the public project settings, not a service-role/secret key. Never put a service-role key in the browser. Redeploy after configuration changes.
4. Verify email-link signup in the same browser, session refresh, sign-out, dashboard requests and account deletion behavior. Browser sign-in uses Supabase SSR cookies; the Next proxy refreshes only account/auth/request routes. Server authorization uses verified `getUser`, with RLS as an additional database boundary. Account URLs are noindex and private/no-store.
5. Submit a real test brief, confirm it appears in the owner's Supabase dashboard, then test another account cannot read it or change status. Test minimum budgets, ownership forgery and the rate limit. Requests do not automatically send a staff notification; staff review submissions in the provider dashboard. Configure monitored notifications before promising automatic response times.

The account is for Terranile project commissioning only. It does not grant access to AVAN, AvanBnB, OPEX or Helios product accounts. Online submission creates a request, not a signed contract or invoice.

## Validation

`npm run build`, `npm run check`, `npm run test:routes`, and `npm run test:commissioning` against a local production server. Configure a separate test Supabase project for two-account RLS/integration testing before enabling accounts in production. Never test authorization against other people's real data.
