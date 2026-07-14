import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import ContactForm from "./components/ContactForm";
import { Section, SectionHeader } from "./components/Section";

const FACEBOOK_URL = "https://www.facebook.com/groups/HUMIA/";
const CONTACT_EMAIL = "humianewzealand@gmail.com";
const CONTACT_PHONE = "021 948 642";

const VALUES = [
  {
    index: "01",
    title: "Rooted in Quran & Sunnah",
    body: "Our lectures, classes, and services follow the Quran and Hadith, in the way of the Prophet Muhammad \u{FDFA}.",
  },
  {
    index: "02",
    title: "Indonesian, and at home in Aotearoa",
    body: "We hold onto the values we carry from Indonesia while embracing life in New Zealand — two homes, one identity.",
  },
  {
    index: "03",
    title: "Bonds of ukhuwah",
    body: "More than an association: a family that looks after one another through study, celebration, and every season of life.",
  },
  {
    index: "04",
    title: "Led by the community",
    body: "Our ummah elects its representatives, who appoint a Board of Trustees every two years.",
  },
];

const SERVICES = [
  {
    name: "Pengajian",
    en: "Islamic Lecture",
    status: "Biweekly",
    body: "Regular gatherings for reflection and learning — the heart of HUMIA since our earliest days as “Pengajian Kampung Auckland.”",
  },
  {
    name: "Kelas Quran",
    en: "Quran Classes · TPQ",
    status: "All ages",
    body: "A madrasah teaching Qaida, Quran, and Islamic studies — for children on Saturdays, teens online twice weekly, and women on Tuesdays, 11am–2pm.",
  },
  {
    name: "Penghulu Nikah",
    en: "Marriage Celebrant",
    status: "Coming soon",
    body: "Nikah and marriage celebrant services for couples and families in the community.",
  },
  {
    name: "Dompet Dhuafa",
    en: "Charity & Donation",
    status: "Coming soon",
    body: "Channelling sadaqah and support to those in need, both here in Auckland and abroad.",
  },
];

const CONTACT_ROWS = [
  { k: "Email", v: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { k: "Phone", v: CONTACT_PHONE, href: `tel:+64${CONTACT_PHONE.replace(/\D/g, "").replace(/^0/, "")}` },
  { k: "Facebook", v: "HUMIA community group", href: FACEBOOK_URL },
  { k: "Location", v: "Auckland, New Zealand", href: null },
];

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <span id="top" />
      <Nav />

      <main id="main" className="flex-1">
        {/* ---------------------------------------------------------- HERO */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.6]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--line) 1px, transparent 1px)",
              backgroundSize: "min(16.666%, 12rem) 100%",
              maskImage:
                "linear-gradient(to bottom, transparent, black 12%, black 70%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 12%, black 70%, transparent)",
            }}
          />
          <div className="container-humia relative pb-20 pt-16 md:pb-28 md:pt-24">
            <Reveal className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="eyebrow eyebrow-accent">
                Indonesian Muslim Society &middot; Auckland
              </span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              <span className="eyebrow">Est. 2005</span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-8 max-w-4xl text-[2.6rem] leading-[1.04] sm:text-6xl md:text-7xl">
                Together in faith,
                <br />
                <span className="italic text-accent-ink">at home</span> in
                Auckland.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-body md:text-xl">
                <span className="text-ink">
                  Himpunan Ummat Muslim Indonesia di Auckland
                </span>{" "}
                &mdash; the Indonesian Muslim Society. Since 2005 we&rsquo;ve
                gathered to learn, worship, and look after one another, carrying
                the values of home into the country we now call home.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="group inline-flex h-12 items-center justify-center gap-2 border border-ink bg-ink px-6 text-sm text-paper transition-colors duration-200 hover:bg-transparent hover:text-ink"
                >
                  Join us
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    &rarr;
                  </span>
                </a>
                <a
                  href="#services"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-line-strong px-6 text-sm text-ink transition-colors duration-200 hover:border-ink"
                >
                  Explore our services
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
                {[
                  { k: "Established", v: "20 Aug 2005" },
                  { k: "Based in", v: "Auckland, NZ" },
                  { k: "Rooted in", v: "Quran & Sunnah" },
                ].map((item) => (
                  <div key={item.k}>
                    <dt className="eyebrow">{item.k}</dt>
                    <dd className="mt-2 text-base text-ink">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------------------------- ABOUT */}
        <Section id="about" surface>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <SectionHeader
                index="A"
                eyebrow="Our story"
                title="From village lectures to a citywide community."
              />
            </div>
            <div className="lg:col-span-7">
              <Reveal className="space-y-5 text-lg leading-relaxed text-body">
                <p>
                  In the beginning, only a handful of people gathered for
                  Indonesian Islamic lectures, hosted from home to home. We
                  called it{" "}
                  <span className="text-ink">Pengajian Kampung Auckland</span>{" "}
                  &mdash; the Auckland Village Lecture. On{" "}
                  <span className="text-ink">20 August 2005</span>, the
                  Ambassador of Indonesia, Mr. Primo Alui Joelianto, opened our
                  first inauguration.
                </p>
                <p>
                  As the community grew, the gatherings moved from living rooms
                  to a community centre in 2006. HUMIA became more than a lecture
                  &mdash; a place that connects Indonesians across Auckland:
                  international students, new migrants, and Indonesian New
                  Zealanders, our tangata whenua.
                </p>
                <p>
                  Today we look after and develop the bonds between companions
                  through religious activities in the broadest sense &mdash;
                  blending Islamic values with the cultures of Indonesia and
                  Aotearoa.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {VALUES.map((item, i) => (
              <Reveal
                key={item.index}
                delay={i * 60}
                className="bg-surface p-8 transition-colors duration-200 hover:bg-paper md:p-10"
              >
                <span className="eyebrow eyebrow-accent">{item.index}</span>
                <h3 className="mt-4 text-2xl">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ------------------------------------------------------ SERVICES */}
        <Section id="services">
          <SectionHeader
            index="B"
            eyebrow="What we offer"
            title="Services grounded in the Quran and Sunnah."
            intro={
              "From weekly learning to lifelong milestones, HUMIA serves the community in the way of the Prophet Muhammad \u{FDFA}."
            }
          />

          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.name}
                delay={i * 60}
                className="flex flex-col bg-surface p-8 md:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="eyebrow">{s.en}</span>
                  <span
                    className={`shrink-0 border px-2 py-1 font-[family-name:var(--font-geist-mono)] text-[0.625rem] uppercase tracking-[0.14em] ${
                      s.status === "Coming soon"
                        ? "border-line-strong text-muted"
                        : "border-accent-ink/30 text-accent-ink"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl">{s.name}</h3>
                <p className="mt-3 leading-relaxed text-body">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* --------------------------------------------------- MISSION STRIP */}
        <section className="border-t border-line bg-ink text-paper">
          <div className="container-humia py-24 md:py-32">
            <Reveal className="mx-auto max-w-4xl text-center">
              <span className="eyebrow text-paper/50">Our purpose</span>
              <blockquote className="mt-8">
                <p
                  className="text-[1.75rem] leading-[1.3] text-paper sm:text-4xl md:text-[2.75rem]"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  &ldquo;The Indonesian community looks after and develops the
                  bond between companions through religious activities in the
                  broadest sense.&rdquo;
                </p>
              </blockquote>
              <p className="eyebrow mt-8 text-paper/50">HUMIA &middot; Since 2005</p>
            </Reveal>

            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-paper/15 pt-10 text-center">
              {[
                { v: "2005", k: "Established" },
                { v: "Biweekly", k: "Pengajian" },
                { v: "All ages", k: "Quran classes" },
              ].map((s, i) => (
                <Reveal key={s.k} delay={i * 80}>
                  <p
                    className="text-2xl text-paper sm:text-4xl"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                  >
                    {s.v}
                  </p>
                  <p className="eyebrow mt-2 text-paper/50">{s.k}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- COMMUNITY */}
        <Section id="community" surface>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <SectionHeader
                index="C"
                eyebrow="Community life"
                title="A community that grows together."
                intro="Beyond the lectures, HUMIA is a network of friendships, families, and shared celebration across the city."
              />
              <Reveal delay={160} className="mt-8 space-y-5 text-lg leading-relaxed text-body">
                <p>
                  Our young students showcase what they&rsquo;ve learned at their
                  annual Quran class performances. New arrivals find familiar
                  faces and a helping hand. Together we mark the rhythms of the
                  Islamic year, far from home but never alone.
                </p>
              </Reveal>
            </div>

            {/* Facebook / news callout */}
            <div className="lg:col-span-6">
              <Reveal className="flex h-full flex-col justify-between border border-line bg-surface p-8 md:p-10">
                <div>
                  <span className="eyebrow eyebrow-accent">Community news</span>
                  <h3 className="mt-4 text-2xl">
                    Stay close to what&rsquo;s happening.
                  </h3>
                  <p className="mt-3 leading-relaxed text-body">
                    Upcoming lectures, events, and announcements are shared with
                    our members on Facebook. Join the group to keep up with the
                    community.
                  </p>
                </div>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-8 inline-flex self-start text-sm text-accent-ink"
                >
                  Visit our Facebook group &rarr;
                </a>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ------------------------------------------------------- CONTACT */}
        <Section id="contact">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <SectionHeader
                index="D"
                eyebrow="Get in touch"
                title="We&rsquo;d love to hear from you."
                intro="Whether you&rsquo;re new to Auckland, looking for a class, or want to get involved, send us a message and we&rsquo;ll be in touch."
              />
              <Reveal delay={160} className="mt-10">
                <ContactForm />
              </Reveal>
            </div>

            {/* details card */}
            <div className="lg:col-span-6">
              <Reveal className="border border-line bg-surface">
                <dl className="divide-y divide-line">
                  {CONTACT_ROWS.map((row) => (
                    <div
                      key={row.k}
                      className="grid grid-cols-1 gap-1 p-6 sm:grid-cols-[9rem_1fr] sm:gap-6 md:p-7"
                    >
                      <dt className="eyebrow pt-1">{row.k}</dt>
                      <dd className="text-base text-ink">
                        {row.href ? (
                          <a
                            href={row.href}
                            target={row.href.startsWith("http") ? "_blank" : undefined}
                            rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="link-underline text-accent-ink"
                          >
                            {row.v}
                          </a>
                        ) : (
                          row.v
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="border-t border-line p-6 md:p-7">
                  <p className="text-sm leading-relaxed text-muted">
                    Gatherings are held at a community centre in Auckland. Get in
                    touch and we&rsquo;ll share the current venue and schedule.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
