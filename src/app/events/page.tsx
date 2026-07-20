import Image from "next/image";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { StickyDonate } from "@/components/site/sticky-donate";
import { EventCard } from "@/components/events/event-card";
import { Reveal } from "@/components/ui/reveal";
import { getPastEvents, getUpcomingEvents } from "@/lib/data";
import { formatShortDate } from "@/lib/format";

export const metadata = {
  title: "Events | HUMIA",
  description:
    "Upcoming pengajian, community gatherings and celebrations from HUMIA, the Indonesian Muslim Society in Auckland.",
};

// Always render fresh so newly published events appear immediately.
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(12),
  ]);

  return (
    <>
      <Navbar />

      <main>
        <section className="bg-sky">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <Reveal>
              <span className="eyebrow">Save the date</span>
              <h1 className="mt-3 text-4xl sm:text-5xl">Events</h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed">
                Pengajian, family gatherings and celebrations through the year.
                Everyone is welcome, bring the kids.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl">Coming up</h2>
          </Reveal>

          {upcoming.length > 0 ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event, i) => (
                <Reveal key={event.id} delay={i * 80}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-7 rounded-2xl border border-line bg-sky p-8 text-center text-soft">
              Nothing scheduled at the moment. Follow our Facebook group for
              the next announcement.
            </p>
          )}
        </section>

        {past.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 sm:pb-20">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl">Past events</h2>
              <p className="mt-2 text-soft">
                A look back at what the community has been up to.
              </p>
            </Reveal>

            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event, i) => (
                <Reveal key={event.id} delay={i * 60}>
                  <article className="overflow-hidden rounded-2xl border border-line bg-white">
                    {event.image_url ? (
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={event.image_url}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                        />
                      </div>
                    ) : null}
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-soft">
                        {formatShortDate(event.event_date)}
                        {event.category ? ` · ${event.category}` : ""}
                      </p>
                      <h3 className="mt-1.5 text-lg font-semibold text-ink">
                        {event.title}
                      </h3>
                      {event.body ? (
                        <p className="mt-2 text-sm leading-relaxed text-body">
                          {event.body}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <StickyDonate />
    </>
  );
}
