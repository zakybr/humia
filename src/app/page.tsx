import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import { Section, SectionHeader } from "./components/Section";

const BELIEFS = [
  {
    index: "01",
    title: "Grace, not performance",
    body: "You don't have to have it all together. The table is set for the doubting, the searching, and the worn-out alike.",
  },
  {
    index: "02",
    title: "Rooted in Scripture",
    body: "We teach the Bible plainly and honestly — ancient words that still speak clearly into ordinary, modern life.",
  },
  {
    index: "03",
    title: "Formed in community",
    body: "Faith isn't meant to be carried alone. We grow through shared meals, honest conversation, and showing up for one another.",
  },
  {
    index: "04",
    title: "For the city",
    body: "We exist beyond our walls — serving our neighbours, our schools, and our streets with tangible, unhurried love.",
  },
];

const GATHERINGS = [
  {
    label: "Sunday Gatherings",
    time: "9:00 & 11:00 AM",
    detail: "Teaching, sung worship, and space to breathe. Around 60 minutes.",
  },
  {
    label: "Kids & Family",
    time: "Both services",
    detail: "Safe, joyful spaces for newborns through Grade 5, staffed by trained volunteers.",
  },
  {
    label: "Midweek Groups",
    time: "Tue – Thu, Evenings",
    detail: "Smaller circles across the city for conversation, prayer, and friendship.",
  },
  {
    label: "Prayer & Quiet",
    time: "Sun, 8:15 AM",
    detail: "A quiet room open before each gathering for anyone who wants to pray.",
  },
];

const NEXT_STEPS = [
  {
    index: "01",
    title: "Come this Sunday",
    body: "No sign-up, no dress code, no cost. Arrive a few minutes early and we'll help you find your way.",
    cta: { label: "Plan your visit", href: "#visit" },
  },
  {
    index: "02",
    title: "Join a group",
    body: "The best way to belong. Groups meet across the city throughout the week — there's one near you.",
    cta: { label: "Find a group", href: "#visit" },
  },
  {
    index: "03",
    title: "Serve the city",
    body: "From the welcome desk to the food pantry, there's a place to give your time and gifts.",
    cta: { label: "Start serving", href: "#visit" },
  },
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
          {/* faint structural grid — decorative */}
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
            <Reveal className="flex items-center gap-3">
              <span className="eyebrow eyebrow-accent">A church for the city</span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              <span className="eyebrow">Est. 2011</span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-8 max-w-4xl text-[2.6rem] leading-[1.04] sm:text-6xl md:text-7xl">
                Come as you are.
                <br />
                <span className="italic text-accent-ink">Find</span> where you
                belong.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-body md:text-xl">
                Humia is an ordinary community of people learning to follow Jesus
                together — in doubt and in faith, in the city we call home.
                Whoever you are, there&rsquo;s a seat here for you.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#visit"
                  className="group inline-flex h-12 items-center justify-center gap-2 border border-ink bg-ink px-6 text-sm text-paper transition-colors duration-200 hover:bg-transparent hover:text-ink"
                >
                  Plan your visit
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    &rarr;
                  </span>
                </a>
                <a
                  href="#gather"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-line-strong px-6 text-sm text-ink transition-colors duration-200 hover:border-ink"
                >
                  Watch online
                </a>
              </div>
            </Reveal>

            {/* service line — spec-sheet detail */}
            <Reveal delay={320}>
              <dl className="mt-16 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
                {[
                  { k: "Sundays", v: "9:00 & 11:00 AM" },
                  { k: "Location", v: "48 Harbor Lane" },
                  { k: "Kids", v: "Every service" },
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

        {/* ------------------------------------------------------- BELIEVE */}
        <Section id="believe" surface>
          <SectionHeader
            index="A"
            eyebrow="What we believe"
            title="A faith that meets you where you are."
            intro="We hold to the historic Christian faith and try to live it with honesty and warmth. Here's what shapes us."
          />

          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {BELIEFS.map((item, i) => (
              <Reveal
                key={item.index}
                delay={i * 60}
                className="group bg-surface p-8 transition-colors duration-200 hover:bg-paper md:p-10"
              >
                <span className="eyebrow eyebrow-accent">{item.index}</span>
                <h3 className="mt-4 text-2xl">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* -------------------------------------------------------- GATHER */}
        <Section id="gather">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <SectionHeader
                index="B"
                eyebrow="When we gather"
                title="One church, gathering all week."
                intro="Sunday is the front door, but the week is where life together really happens."
              />
              <Reveal delay={160}>
                <a
                  href="#visit"
                  className="link-underline mt-8 inline-flex text-sm text-accent-ink"
                >
                  Get directions &amp; times &rarr;
                </a>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ul className="border-t border-line">
                {GATHERINGS.map((g, i) => (
                  <Reveal
                    as="li"
                    key={g.label}
                    delay={i * 60}
                    className="grid grid-cols-1 gap-1 border-b border-line py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                  >
                    <div>
                      <h3 className="text-xl">{g.label}</h3>
                      <p className="mt-1.5 max-w-md text-body">{g.detail}</p>
                    </div>
                    <span className="font-[family-name:var(--font-geist-mono)] text-sm tracking-wide text-accent-ink sm:text-right">
                      {g.time}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ----------------------------------------------- RHYTHM / QUOTE */}
        <section className="border-t border-line bg-ink text-paper">
          <div className="container-humia py-24 md:py-32">
            <Reveal className="mx-auto max-w-4xl text-center">
              <span className="eyebrow text-paper/50">Isaiah 40:31</span>
              <blockquote className="mt-8">
                <p
                  className="text-3xl leading-[1.25] text-paper sm:text-4xl md:text-5xl"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  &ldquo;Those who wait upon the Lord will renew their strength;
                  they will soar on wings like eagles.&rdquo;
                </p>
              </blockquote>
            </Reveal>

            <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-paper/15 pt-10 text-center">
              {[
                { v: "14 yrs", k: "In the city" },
                { v: "600+", k: "Every Sunday" },
                { v: "20+", k: "Groups citywide" },
              ].map((s, i) => (
                <Reveal key={s.k} delay={i * 80}>
                  <p
                    className="text-3xl text-paper sm:text-4xl"
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
          <SectionHeader
            index="C"
            eyebrow="Your next step"
            title="Belonging happens one step at a time."
            intro="You don't need to figure out everything at once. Pick the step that fits where you are today."
          />

          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {NEXT_STEPS.map((step, i) => (
              <Reveal
                key={step.index}
                delay={i * 70}
                className="flex flex-col bg-surface p-8 md:p-10"
              >
                <span className="eyebrow eyebrow-accent">{step.index}</span>
                <h3 className="mt-4 text-2xl">{step.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-body">{step.body}</p>
                <a
                  href={step.cta.href}
                  className="link-underline mt-6 inline-flex self-start text-sm text-accent-ink"
                >
                  {step.cta.label} &rarr;
                </a>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* --------------------------------------------------------- VISIT */}
        <Section id="visit">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <SectionHeader
                index="D"
                eyebrow="Plan your visit"
                title="We'd love to meet you this Sunday."
                intro="Tell us you're coming and we'll have someone ready to welcome you, save you a seat, and help with the kids."
              />
              <Reveal delay={160}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="mailto:hello@humia.church?subject=Planning%20my%20visit"
                    className="group inline-flex h-12 items-center justify-center gap-2 border border-ink bg-ink px-6 text-sm text-paper transition-colors duration-200 hover:bg-transparent hover:text-ink"
                  >
                    Let us know you&rsquo;re coming
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      &rarr;
                    </span>
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="inline-flex h-12 items-center justify-center border border-line-strong px-6 text-sm text-ink transition-colors duration-200 hover:border-ink"
                  >
                    Call us
                  </a>
                </div>
              </Reveal>
            </div>

            {/* details card */}
            <div className="lg:col-span-6">
              <Reveal className="border border-line bg-surface">
                <dl className="divide-y divide-line">
                  {[
                    { k: "Gathering times", v: "Sundays — 9:00 & 11:00 AM" },
                    { k: "Address", v: "48 Harbor Lane, Suite 2, City Center" },
                    { k: "Parking", v: "Free on-site & street parking after 9 AM" },
                    { k: "Kids", v: "Check-in opens 30 minutes before each service" },
                    { k: "Contact", v: "hello@humia.church" },
                  ].map((row) => (
                    <div
                      key={row.k}
                      className="grid grid-cols-1 gap-1 p-6 sm:grid-cols-[10rem_1fr] sm:gap-6 md:p-7"
                    >
                      <dt className="eyebrow pt-1">{row.k}</dt>
                      <dd className="text-base text-ink">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
