# HUMIA — Indonesian Muslim Society in Auckland

Website for **Himpunan Ummat Muslim Indonesia di Auckland (HUMIA)**. Built with
Next.js 16 (App Router) + Tailwind v4, with a Supabase backend for content and
Stripe for donations.

## Getting started

```bash
bun install
cp .env.example .env.local   # then fill in the values (see below)
bun dev
```

Open http://localhost:3000.

> This repo uses **bun**. The Next.js CLI runs under bun with `bun --bun run <script>`
> (e.g. `bun --bun run dev`, `bun --bun run build`).

## Environment variables

See [`.env.example`](./.env.example). Copy it to `.env.local` (gitignored):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable/anon key (safe to expose; RLS enforces access) |
| `NEXT_PUBLIC_SITE_URL` | Base URL for Stripe redirects / auth callbacks |
| `STRIPE_SECRET_KEY` | Stripe secret key — **server-only**, enables donations |

## Content management (admin)

Editors manage **News** and **Events** at [`/admin`](http://localhost:3000/admin).
Published items appear on the homepage immediately; drafts stay hidden.

**First-time setup — create the admin account:**

1. In the [Supabase dashboard](https://supabase.com/dashboard) → **Authentication → Users → Add user**,
   create a user with an email + password and tick **Auto Confirm User**.
2. That first user is **automatically granted admin rights** (a database trigger adds
   the first-ever user to the `admins` allowlist). Later users get no admin access.
3. Recommended: **Authentication → Providers → Email** → turn **off** "Allow new users to sign up"
   so only you can add editors (add them via the dashboard, then allowlist them in the `admins` table).
4. Visit `/admin`, sign in, and start posting.

### Security model

- **Row Level Security** on `news` / `events`: the public (anon key) can read only
  `published = true` rows; **writes require being in the `admins` allowlist** (checked by a
  `private.is_admin()` security-definer function — not exposed via the API).
- `/admin` is gated in `src/proxy.ts` (Next 16's replacement for middleware) and
  re-checked server-side in the dashboard.
- Secrets live only in `.env.local` (gitignored). No service-role key is used.

## Donations (Stripe)

The **Support** section and the **Dompet Dhuafa** card offer donations via Stripe Checkout
(custom NZD amounts). To enable:

1. Add `STRIPE_SECRET_KEY` to `.env.local` (use a **test** key while developing).
2. Restart the dev server. Clicking **Donate** creates a Checkout Session and redirects to Stripe;
   success/cancel return to `/donate/success` and `/donate/cancelled`.

Until a key is set, the Donate button shows a friendly "not yet configured" message
(the API returns `503`) — nothing breaks.

## Project structure

- `src/app/page.tsx` — public homepage (server-rendered; pulls published News/Events)
- `src/app/admin/*` — admin login, dashboard, and server actions
- `src/app/api/donate/route.ts` — Stripe Checkout session
- `src/lib/supabase/*` — browser / server / public Supabase clients
- `src/proxy.ts` — session refresh + `/admin` gating (Next 16 `proxy` convention)

## Notes on this Next.js

This is Next.js 16, which has breaking changes vs. earlier versions — notably the
`middleware` convention is renamed to **`proxy`**, and `cookies()`/`params`/`searchParams`
are **async**. See `node_modules/next/dist/docs/` for the bundled reference.
