"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ActionResult = { error?: string; ok?: boolean };

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/events");
  revalidatePath("/admin");
}

function rlsError(error: { message: string }): ActionResult {
  if (error.message.includes("row-level security")) {
    return {
      error:
        "Permission denied. Run supabase/setup.sql in the Supabase SQL Editor, then sign out and back in.",
    };
  }
  return { error: error.message };
}

/** Shared field parsing for create and update. */
function eventFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const eventDate = String(formData.get("event_date") ?? "").trim();

  if (!title) return { error: "Please give the event a name." } as const;
  if (!eventDate) return { error: "Please choose a date and time." } as const;

  return {
    row: {
      title,
      category: category || null,
      excerpt: location || null, // location lives in the excerpt column
      body: description || null,
      image_url: imageUrl || null,
      event_date: new Date(eventDate).toISOString(),
      type: "event" as const,
    },
  } as const;
}

export async function createEvent(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await requireAdmin();
  const parsed = eventFields(formData);
  if ("error" in parsed) return { error: parsed.error };

  const { error } = await supabase.from("news_items").insert({
    ...parsed.row,
    published_at: new Date().toISOString().slice(0, 10),
  });
  if (error) return rlsError(error);
  refresh();
  return { ok: true };
}

export async function updateEvent(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing event id." };

  const parsed = eventFields(formData);
  if ("error" in parsed) return { error: parsed.error };

  const { error } = await supabase
    .from("news_items")
    .update(parsed.row)
    .eq("id", id);
  if (error) return rlsError(error);
  refresh();
  return { ok: true };
}

export async function deleteEvent(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await supabase.from("news_items").delete().eq("id", id);
  refresh();
}

/** Set (or replace) the photo used in a site slot. */
export async function updateSiteImage(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await requireAdmin();
  const key = String(formData.get("key") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  if (!key) return { error: "Missing image slot." };
  if (!url) return { error: "Please choose a photo first." };

  const { error } = await supabase.from("site_images").upsert(
    { key, url, updated_at: new Date().toISOString() },
    { onConflict: "key" },
  );
  if (error) return rlsError(error);
  refresh();
  return { ok: true };
}

/** Remove a slot's override so it falls back to the bundled default photo. */
export async function resetSiteImage(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const key = String(formData.get("key") ?? "").trim();
  if (key) await supabase.from("site_images").delete().eq("key", key);
  refresh();
}

const ABOUT_SECTION_KEYS = [
  "about_trustees",
  "about_representatives",
  "about_advisory",
] as const;

/** Save one editable About page section (trustees, reps, or advisory). */
export async function saveAboutSection(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await requireAdmin();
  const key = String(formData.get("key") ?? "").trim();
  const raw = String(formData.get("value") ?? "");

  if (!ABOUT_SECTION_KEYS.includes(key as (typeof ABOUT_SECTION_KEYS)[number])) {
    return { error: "Unknown section." };
  }

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { error: "Could not read the content. Please try again." };
  }
  if (!Array.isArray(value)) {
    return { error: "Content must be a list." };
  }

  const { error } = await supabase.from("site_content").upsert(
    { key, value, updated_at: new Date().toISOString() },
    { onConflict: "key" },
  );
  if (error) return rlsError(error);
  refresh();
  return { ok: true };
}

/** Reset one About section back to the bundled default content. */
export async function resetAboutSection(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const key = String(formData.get("key") ?? "").trim();
  if (ABOUT_SECTION_KEYS.includes(key as (typeof ABOUT_SECTION_KEYS)[number])) {
    await supabase.from("site_content").delete().eq("key", key);
  }
  refresh();
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
