# HUMIA website

Community website for Himpunan Ummat Muslim Indonesia di Auckland (HUMIA),
the Indonesian Muslim Society in Auckland. Built with Next.js 16, Tailwind
CSS 4, Supabase and Stripe.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage: hero, upcoming events, services carousel, gallery, contact |
| `/about` | Our story, Board of Trustees, ummah representatives, advisory board |
| `/events` | Upcoming and past events, read live from Supabase |
| `/donate` | Donation page with Stripe Checkout and bank transfer details |
| `/admin` | Committee portal: events, website photos, About page content |

## Local development

```bash
cp .env.example .env.local   # then fill in the values
npm install
npm run dev
```

If the dev server shows internal errors after a build, stop it and run:

```bash
rm -rf .next && npm run dev
```

## First-time Supabase setup

Run `supabase/setup.sql` once in the Supabase Dashboard → SQL Editor. This
creates:

- Committee write access on `news_items` (events)
- Public `media` storage bucket (photo uploads)
- `site_images` table (editable website photos)
- `site_content` table (About page trustees, reps, advisory board)

Then sign out and back in to the admin portal if you were already logged in.

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (safe to expose; RLS controls access) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (Stripe redirects, auth callbacks). Set to your production domain on Vercel. |
| `STRIPE_SECRET_KEY` | Stripe secret key for donations (server-side only). Leave empty until ready; donations show a friendly message. |

**WhatsApp contact:** the committee number is in `src/lib/site.ts`
(`WHATSAPP_NUMBER`). Contact uses a free wa.me link — no backend cost.

**Admin accounts:** create users in Supabase Dashboard → Authentication.
There is no public signup.

## Admin portal

Sign in at `/admin`. Three tabs:

1. **Events** — add, edit, delete upcoming and past events with photos
2. **Website photos** — replace homepage, carousel, and About story photos
3. **About page** — edit Board of Trustees, ummah representatives, advisory board

Changes go live immediately after saving.

## Imagery

Community photos live in `public/images/`. The logo is
`public/humia-logo.png`. Uploaded admin photos are stored in Supabase
Storage and served through Next.js image optimization (AVIF/WebP).

## Deploy (Vercel)

1. Connect the GitHub repo to Vercel (or push to `main` if already linked).
2. Set the environment variables above in Vercel → Project → Settings → Environment Variables.
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://aucklandhumia.net`).
4. Deploy. Vercel builds with `npm run build` automatically on push to `main`.
