import { createClient } from "@supabase/supabase-js";

/**
 * Read-only Supabase client for public data (no auth session/cookies).
 * RLS restricts anon reads to published rows only. Keeps public pages
 * cacheable; admin mutations call revalidatePath("/") to refresh.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
