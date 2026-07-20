import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { EventRecord } from "@/lib/types";
import { getSiteImages, getAboutContent } from "@/lib/data";
import { DashboardTabs } from "@/components/admin/dashboard-tabs";
import { signOut } from "./actions";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Defense-in-depth (proxy.ts already gates this route).
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("news_items")
    .select("*")
    .eq("type", "event")
    .order("event_date", { ascending: true });

  const events = (data ?? []) as EventRecord[];
  const now = new Date().toISOString();
  const upcoming = events.filter((e) => e.event_date >= now);
  const past = events.filter((e) => e.event_date < now).reverse();

  const [images, about] = await Promise.all([
    getSiteImages(),
    getAboutContent(),
  ]);

  return (
    <div className="min-h-dvh bg-sky">
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Image
              src="/humia-logo.png"
              alt="HUMIA logo"
              width={120}
              height={47}
              className="h-10 w-auto"
              style={{ width: "auto", height: "auto" }}
            />
            <span className="rounded-full bg-sky px-2.5 py-1 text-xs font-semibold text-navy">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-body hover:text-navy">
              View website
            </Link>
            <form action={signOut}>
              <button type="submit" className="btn-secondary !h-10 text-sm">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl">Manage the website</h1>
        <p className="mt-2 max-w-xl leading-relaxed text-soft">
          Welcome, {user.email}. Anything you save here appears on the public
          website straight away.
        </p>

        <div className="mt-8">
          <DashboardTabs
            upcoming={upcoming}
            past={past}
            images={images}
            about={about}
          />
        </div>
      </main>
    </div>
  );
}
