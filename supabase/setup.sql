-- HUMIA Supabase setup
-- Paste this into Supabase Dashboard -> SQL Editor -> Run.
-- Safe to re-run.

-- ---------------------------------------------------------------------------
-- 1. Fix news_items write access for committee accounts
--
-- The table already exists with RLS enabled. Writes were blocked unless the
-- JWT carried app_metadata.role = 'admin'. For a small committee site with
-- no public signup, any authenticated account may manage events.
-- ---------------------------------------------------------------------------

alter table public.news_items enable row level security;

drop policy if exists "Admins write news_items" on public.news_items;
drop policy if exists "Committee write news_items" on public.news_items;

create policy "Committee write news_items"
  on public.news_items for all
  to authenticated
  using (true)
  with check (true);

-- Keep public read for anon + authenticated (website visitors).
drop policy if exists "Public read news_items" on public.news_items;
create policy "Public read news_items"
  on public.news_items for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- 2. Storage bucket for admin photo uploads
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Authenticated insert media" on storage.objects;
create policy "Authenticated insert media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists "Authenticated update media" on storage.objects;
create policy "Authenticated update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

drop policy if exists "Authenticated delete media" on storage.objects;
create policy "Authenticated delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');

-- ---------------------------------------------------------------------------
-- 3. Editable site photos (Website photos tab in the admin portal)
--
-- Stores one row per photo "slot" on the public site (hero, gallery, service
-- cards, about story). Missing rows fall back to the bundled default images,
-- so the site keeps working before this table exists.
-- ---------------------------------------------------------------------------

create table if not exists public.site_images (
  key text primary key,
  url text,
  updated_at timestamptz not null default now()
);

alter table public.site_images enable row level security;

drop policy if exists "Public read site_images" on public.site_images;
create policy "Public read site_images"
  on public.site_images for select
  to anon, authenticated
  using (true);

drop policy if exists "Committee write site_images" on public.site_images;
create policy "Committee write site_images"
  on public.site_images for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- 4. Editable page content (About page cards in the admin portal)
--
-- Stores structured content (trustees, ummah representatives, advisory board)
-- as JSON, one row per section. Missing rows fall back to the bundled
-- defaults in src/lib/about.ts, so the site works before this table exists.
-- ---------------------------------------------------------------------------

create table if not exists public.site_content (
  key text primary key,
  value jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

drop policy if exists "Public read site_content" on public.site_content;
create policy "Public read site_content"
  on public.site_content for select
  to anon, authenticated
  using (true);

drop policy if exists "Committee write site_content" on public.site_content;
create policy "Committee write site_content"
  on public.site_content for all
  to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- 5. (Optional) Tag a specific user as admin instead of step 1
--
-- If you prefer strict admin-only writes, skip step 1's policy change and
-- run this instead, then sign out and back in so the JWT picks up the role:
--
--   update auth.users
--   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
--                           || '{"role":"admin"}'::jsonb
--   where email = 'humianewzealand@gmail.com';
-- ---------------------------------------------------------------------------
