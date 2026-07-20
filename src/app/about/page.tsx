import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/ui/reveal";
import { STORY_MILESTONES } from "@/lib/about";
import { getSiteImages, getAboutContent } from "@/lib/data";

export const metadata = {
  title: "About | HUMIA",
  description:
    "The story of HUMIA, the Indonesian Muslim Society in Auckland, and the people who serve the community.",
};

export default async function AboutPage() {
  const [images, about] = await Promise.all([
    getSiteImages(),
    getAboutContent(),
  ]);
  const {
    trustees: BOARD_OF_TRUSTEES,
    representatives: UMMAH_REPRESENTATIVES,
    advisory: ADVISORY_BOARD,
  } = about;

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-navy-deep text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <Reveal>
              <h1 className="max-w-2xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Cerita Kami
              </h1>
              <p className="mt-3 text-xl text-white/80 sm:text-2xl">Our story</p>
              <p className="mt-1 text-lg text-white/60">Ā tātou kōrero</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
                From living-room lectures to a registered trust serving
                generations of Indonesian Muslims in Tamaki Makaurau.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Story */}
        <section className="bg-sky">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
              <Reveal>
                <div className="lg:sticky lg:top-24">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[3/4]">
                    <Image
                      src={images.about_story}
                      alt="HUMIA community members at a pengajian in front of the Trust banner"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 440px"
                      priority
                    />
                  </div>
                </div>
              </Reveal>

              <div>
                <Reveal>
                  <blockquote className="border-l-4 border-blue pl-5 text-xl font-medium leading-relaxed text-ink sm:text-2xl">
                    What began as a few families meeting for pengajian has
                    grown into a community that spans generations.
                  </blockquote>
                </Reveal>

                <div className="mt-12 space-y-0">
                  {STORY_MILESTONES.map((item, i) => (
                    <Reveal key={item.year} delay={i * 80}>
                      <div className="relative border-l border-line pl-8 pb-10 last:pb-0">
                        <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-navy" />
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue">
                          {item.year}
                        </p>
                        <h2 className="mt-1 text-xl font-semibold text-ink">
                          {item.title}
                        </h2>
                        <p className="mt-2 leading-relaxed text-body">
                          {item.text}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Board of Trustees */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <span className="eyebrow">Leadership</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">Board of Trustees</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-body">
              Ummah representatives are elected by the community. They then
              vote for the Board of Trustees every two years.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {BOARD_OF_TRUSTEES.map((trustee, i) => (
              <Reveal key={`${trustee.name}-${i}`} delay={i * 60}>
                <article className="overflow-hidden rounded-2xl border border-line bg-white">
                  <div className="relative aspect-[4/5] bg-sky">
                    {trustee.photo ? (
                      <Image
                        src={trustee.photo}
                        alt={trustee.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 50vw, 220px"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-3xl font-semibold text-navy/40">
                        {trustee.name.charAt(0) || "?"}
                      </div>
                    )}
                  </div>
                  <div className="border-t border-line px-4 py-4 text-center">
                    <h3 className="font-semibold text-ink">{trustee.name}</h3>
                    <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-soft">
                      Trustee
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Ummah representatives */}
        <section className="bg-sky">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <Reveal>
              <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
                Ummah representatives
              </h2>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-blue">
                Perwakilan / Wali Umat
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {UMMAH_REPRESENTATIVES.map((name, i) => (
                <Reveal key={`${name}-${i}`} delay={i * 40}>
                  <li className="rounded-xl border border-line bg-white px-4 py-3.5 text-[15px] font-medium text-ink">
                    {name}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Advisory board */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
              Advisory board
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {ADVISORY_BOARD.map((member, i) => (
              <Reveal key={`${member.name}-${i}`} delay={i * 80}>
                <article className="rounded-2xl border border-line bg-white p-6 sm:p-7">
                  <h3 className="text-lg font-semibold text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-body">
                    {member.bio}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-navy-deep p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <p className="max-w-lg text-lg leading-relaxed text-white/90">
                Want to come along to a lecture or get involved? Everyone is
                welcome.
              </p>
              <Link href="/#contact" className="btn-primary !bg-white !text-navy hover:!bg-sky">
                Get in touch
                <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
