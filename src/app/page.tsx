import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { DonatePopup } from "@/components/site/donate-popup";
import { StickyDonate } from "@/components/site/sticky-donate";
import { ContactSection } from "@/components/site/contact-section";
import { ServicesCarousel } from "@/components/site/services-carousel";
import { EventCard } from "@/components/events/event-card";
import { Reveal } from "@/components/ui/reveal";
import { getUpcomingEvents, getSiteImages } from "@/lib/data";

export default async function HomePage() {
  const [upcoming, images] = await Promise.all([
    getUpcomingEvents(3),
    getSiteImages(),
  ]);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-sky">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
            <div>
              <Reveal>
                <span className="eyebrow">Est. 20 August 2005, Auckland</span>
                <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
                  The Indonesian Muslim community of Auckland
                </h1>
                <p className="mt-5 max-w-lg text-lg leading-relaxed">
                  HUMIA brings Indonesian Muslims in Tamaki Makaurau together
                  through lectures, Quran classes for our kids, and the kind of
                  gatherings where everyone stays late talking over good food.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/events" className="btn-primary">
                    See upcoming events
                    <ArrowRight size={17} />
                  </Link>
                  <Link href="/about" className="btn-secondary">
                    About us
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={150}>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={images.home_hero}
                    alt="A HUMIA gathering with community members seated together in a hall"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                </div>
                <div className="absolute -bottom-4 -left-3 hidden rounded-xl bg-navy px-5 py-3.5 text-white shadow-lg sm:block">
                  <p className="text-2xl font-bold leading-none">20+</p>
                  <p className="mt-1 text-xs text-white/75">years serving Auckland</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Upcoming events */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Save the date</span>
                <h2 className="mt-3 text-3xl sm:text-4xl">Upcoming events</h2>
              </div>
              <Link
                href="/events"
                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-navy hover:text-blue"
              >
                All events
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          {upcoming.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event, i) => (
                <Reveal key={event.id} delay={i * 100}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-2xl border border-line bg-sky p-8 text-center text-soft">
              Nothing scheduled right now. Check back soon, or follow us on
              Facebook for announcements.
            </p>
          )}
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <Reveal>
              <span className="eyebrow">What we do</span>
              <h2 className="mt-3 max-w-xl text-3xl sm:text-4xl">
                From weekly lectures to lifelong milestones
              </h2>
            </Reveal>

            <ServicesCarousel images={images} />
          </div>
        </section>

        {/* Community photos */}
        <section className="bg-navy-deep">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <Reveal>
              <span className="eyebrow !text-white/70">Our gatherings</span>
              <h2 className="mt-3 max-w-xl text-3xl !text-white sm:text-4xl">
                This is what community looks like
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { src: images.home_gallery_1, alt: "Community members seated on mats during a HUMIA gathering" },
                { src: images.home_gallery_2, alt: "Attendees listening during an evening pengajian" },
                { src: images.home_gallery_3, alt: "Speakers in front of the HUMIA Trust banner" },
              ].map((photo, i) => (
                <Reveal key={photo.src} delay={i * 100}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl sm:aspect-[4/5]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 360px"
                    />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={150}>
              <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl bg-white/5 p-8 text-center sm:p-10">
                <p className="max-w-xl text-lg leading-relaxed text-white/85">
                  Everything we run is volunteer powered and funded by the
                  community. If HUMIA has meant something to you or your
                  family, help us keep it going.
                </p>
                <Link href="/donate" className="btn-primary !bg-white !text-navy hover:!bg-sky">
                  Support HUMIA
                  <ArrowRight size={17} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <Reveal>
              <ContactSection />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <DonatePopup />
      <StickyDonate />
    </>
  );
}
