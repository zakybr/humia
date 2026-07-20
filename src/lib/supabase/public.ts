import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Read-only Supabase client for public data (no auth session/cookies).
 * RLS restricts anon reads to published rows only. Keeps public pages
 * cacheable; admin mutations call revalidatePath("/") to refresh.
 *
 * Returns null when env vars are missing (e.g. Vercel build before env is
 * configured). Callers fall back to bundled defaults so static pages still
 * prerender.
 */
export function createPublicClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
