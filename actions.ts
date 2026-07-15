"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type ActionResult = { error?: string };

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

function refresh() {
  // Public site reads published rows; admin dashboard re-reads all.
  revalidatePath("/");
  revalidatePath("/admin");
}

/* ------------------------------------------------------------------ NEWS */

export async function createNews(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const published = formData.get("published") === "on";

  if (!title) return { error: "Title is required." };

  const { error } = await supabase.from("news").insert({ title, body, published });
  if (error) return { error: error.message };
  refresh();
  return {};
}

export async function updateNews(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const published = formData.get("published") === "on";

  if (!id) return { error: "Missing id." };
  if (!title) return { error: "Title is required." };

  const { error } = await supabase
    .from("news")
    .update({ title, body, published })
    .eq("id", id);
  if (error) return { error: error.message };
  refresh();
  return {};
}

export async function deleteNews(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await supabase.from("news").delete().eq("id", id);
  refresh();
}

export async function toggleNewsPublished(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const next = formData.get("next") === "true";
  if (id) await supabase.from("news").update({ published: next }).eq("id", id);
  refresh();
}

/* ---------------------------------------------------------------- EVENTS */

export async function createEvent(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const startsAt = String(formData.get("starts_at") ?? "").trim();
  const published = formData.get("published") === "on";

  if (!title) return { error: "Title is required." };
  if (!startsAt) return { error: "Start date/time is required." };

  const { error } = await supabase.from("events").insert({
    title,
    description,
    location: location || null,
    starts_at: new Date(startsAt).toISOString(),
    published,
  });
  if (error) return { error: error.message };
  refresh();
  return {};
}

export async function updateEvent(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const startsAt = String(formData.get("starts_at") ?? "").trim();
  const published = formData.get("published") === "on";

  if (!id) return { error: "Missing id." };
  if (!title) return { error: "Title is required." };
  if (!startsAt) return { error: "Start date/time is required." };

  const { error } = await supabase
    .from("events")
    .update({
      title,
      description,
      location: location || null,
      starts_at: new Date(startsAt).toISOString(),
      published,
    })
    .eq("id", id);
  if (error) return { error: error.message };
  refresh();
  return {};
}

export async function deleteEvent(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await supabase.from("events").delete().eq("id", id);
  refresh();
}

export async function toggleEventPublished(formData: FormData): Promise<void> {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const next = formData.get("next") === "true";
  if (id) await supabase.from("events").update({ published: next }).eq("id", id);
  refresh();
}

/* ------------------------------------------------------------------ AUTH */

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
