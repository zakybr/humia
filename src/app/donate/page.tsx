import { BookOpen, HandHeart, Landmark, Users } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/ui/reveal";
import { DonateForm } from "@/components/donate/donate-form";
import { BANK_ACCOUNTS } from "@/lib/site";

export const metadata = {
  title: "Donate | HUMIA",
  description:
    "Support the Indonesian Muslim community of Auckland. Your donation funds lectures, Quran classes and help for families in need.",
};

const impact = [
  {
    icon: BookOpen,
    title: "Pengajian and lectures",
    text: "Venue hire and hosting visiting speakers.",
  },
  {
    icon: Users,
    title: "Quran classes for kids",
    text: "Books, materials and space for weekend TPQ classes.",
  },
  {
    icon: HandHeart,
    title: "Dompet Dhuafa",
    text: "Direct help for families in need, here and in Indonesia.",
  },
  {
    icon: Landmark,
    title: "Community events",
    text: "Eid celebrations, iftar and family gatherings.",
  },
];

export default function DonatePage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow">Support HUMIA</span>
              <h1 className="mt-3 text-4xl sm:text-5xl">
                Your sadaqah keeps this community running
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed">
                HUMIA is a registered charitable trust run entirely by
                volunteers. Every dollar goes back into the community.
              </p>
            </Reveal>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {impact.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="flex h-full items-start gap-3.5 rounded-2xl border border-line bg-white p-5">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky text-navy">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-body">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-9 rounded-2xl bg-sky p-6">
                <h2 className="text-lg font-semibold text-ink">
                  Prefer a bank transfer?
                </h2>
                <p className="mt-1.5 text-sm text-soft">
                  You can also give directly to our ANZ accounts:
                </p>
                <ul className="mt-4 space-y-2.5">
                  {BANK_ACCOUNTS.map((account) => (
                    <li
                      key={account.number}
                      className="flex flex-col justify-between gap-1 rounded-xl bg-white px-4 py-3 text-sm sm:flex-row sm:items-center"
                    >
                      <span className="font-medium text-ink">{account.label}</span>
                      <span className="font-mono text-navy">{account.number}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="lg:pt-14">
            <DonateForm />
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
