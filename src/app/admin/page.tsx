import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { EventItem, NewsItem } from "@/lib/types";
import NewsManager from "./NewsManager";
import EventsManager from "./EventsManager";
import { signOut } from "./actions";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Defense-in-depth (proxy.ts already gates this route).
  if (!user) redirect("/admin/login");

  const [{ data: news }, { data: events }] = await Promise.all([
    supabase.from("news").select("*").order("created_at", { ascending: false }),
    supabase.from("events").select("*").order("starts_at", { ascending: true }),
  ]);

  return (
    <div className="min-h-dvh bg-paper">
      {/* Admin header */}
      <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="container-humia flex h-16 items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-[1.05rem] font-semibold uppercase tracking-[0.28em] text-ink">
              Humia
            </span>
            <span className="eyebrow">Admin</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="/"
              className="text-sm text-body transition-colors hover:text-ink"
            >
              View site &rarr;
            </a>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex h-9 items-center border border-line-strong px-4 text-sm text-ink transition-colors hover:border-ink"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container-humia py-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl">Content</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Signed in as {user.email}. Published items appear on the public site
            immediately; drafts stay hidden until you publish them.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-10">
          <section aria-labelledby="news-heading">
            <div className="flex items-center gap-3 border-b border-line pb-4">
              <span className="eyebrow eyebrow-accent">01</span>
              <h2 id="news-heading" className="text-xl text-ink">
                News &amp; updates
              </h2>
            </div>
            <div className="mt-6">
              <NewsManager items={(news as NewsItem[]) ?? []} />
            </div>
          </section>

          <section aria-labelledby="events-heading">
            <div className="flex items-center gap-3 border-b border-line pb-4">
              <span className="eyebrow eyebrow-accent">02</span>
              <h2 id="events-heading" className="text-xl text-ink">
                Events
              </h2>
            </div>
            <div className="mt-6">
              <EventsManager items={(events as EventItem[]) ?? []} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
