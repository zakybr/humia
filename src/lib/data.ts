import { createPublicClient } from "@/lib/supabase/public";
import type { EventRecord } from "@/lib/types";
import { resolveSiteImages, type SiteImages } from "@/lib/site-images";
import {
  resolveAboutContent,
  type AboutContent,
  type AdvisoryMember,
  type Trustee,
} from "@/lib/about";

/** Events with a start date from today onwards, soonest first. */
export async function getUpcomingEvents(limit?: number): Promise<EventRecord[]> {
  const supabase = createPublicClient();
  let query = supabase
    .from("news_items")
    .select("*")
    .eq("type", "event")
    .gte("event_date", new Date().toISOString())
    .order("event_date", { ascending: true });
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("getUpcomingEvents:", error.message);
    return [];
  }
  return (data ?? []) as EventRecord[];
}

/** Events that have already happened, most recent first. */
export async function getPastEvents(limit?: number): Promise<EventRecord[]> {
  const supabase = createPublicClient();
  let query = supabase
    .from("news_items")
    .select("*")
    .eq("type", "event")
    .lt("event_date", new Date().toISOString())
    .order("event_date", { ascending: false });
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("getPastEvents:", error.message);
    return [];
  }
  return (data ?? []) as EventRecord[];
}

/**
 * Resolved photo URLs for every editable slot on the public site. Stored
 * overrides win; anything not set (or if the table does not exist yet) falls
 * back to the bundled default images.
 */
export async function getSiteImages(): Promise<SiteImages> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("site_images").select("key,url");
  if (error) {
    // Table may not exist yet, or reads are blocked: use bundled defaults.
    return resolveSiteImages();
  }

  const overrides: SiteImages = {};
  for (const row of data ?? []) {
    if (row.key && row.url) overrides[row.key] = row.url as string;
  }
  return resolveSiteImages(overrides);
}

/**
 * Editable About page content (trustees, representatives, advisory board).
 * Falls back to bundled defaults if a section is unset or the table is
 * missing, so the public page always renders.
 */
export async function getAboutContent(): Promise<AboutContent> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("key,value");
  if (error) return resolveAboutContent();

  const byKey: Record<string, unknown> = {};
  for (const row of data ?? []) {
    if (row.key) byKey[row.key] = row.value;
  }

  return resolveAboutContent({
    about_trustees: byKey.about_trustees as Trustee[] | undefined,
    about_representatives: byKey.about_representatives as string[] | undefined,
    about_advisory: byKey.about_advisory as AdvisoryMember[] | undefined,
  });
}
