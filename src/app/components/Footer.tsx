import { LogoMark } from "./Brand";

const NAV = [
  { href: "#gather", label: "Gather" },
  { href: "#believe", label: "Believe" },
  { href: "#community", label: "Community" },
  { href: "#visit", label: "Visit" },
];

const SOCIAL = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://youtube.com", label: "YouTube" },
  { href: "https://open.spotify.com", label: "Podcast" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="container-humia py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand + statement */}
          <div className="md:col-span-5">
            <span className="flex items-center gap-2.5 text-paper">
              <LogoMark className="text-paper" />
              <span className="text-[1.05rem] font-semibold uppercase tracking-[0.28em]">
                Humia
              </span>
            </span>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-paper/70">
              A community church in the heart of the city. Come as you are —
              there&rsquo;s a place for you here.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow text-paper/50">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[15px] text-paper/80 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit + connect */}
          <div className="md:col-span-4">
            <p className="eyebrow text-paper/50">Sundays</p>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/80">
              9:00 &amp; 11:00 AM
              <br />
              48 Harbor Lane, Suite 2
              <br />
              City Center
            </p>
            <p className="eyebrow mt-8 text-paper/50">Connect</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-paper/80 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="mailto:hello@humia.church"
              className="mt-5 inline-block text-[15px] text-paper/80 underline underline-offset-4 transition-colors hover:text-paper"
            >
              hello@humia.church
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[family-name:var(--font-geist-mono)] tracking-wide">
            &copy; {new Date().getFullYear()} HUMIA CHURCH
          </p>
          <p className="font-[family-name:var(--font-geist-mono)] tracking-wide">
            MADE WITH CARE FOR THE CITY
          </p>
        </div>
      </div>
    </footer>
  );
}
