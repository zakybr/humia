import { LogoMark } from "./Brand";

const FACEBOOK_URL = "https://www.facebook.com/groups/HUMIA/";
const CONTACT_EMAIL = "humianewzealand@gmail.com";
const CONTACT_PHONE = "021 948 642";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#community", label: "Community" },
  { href: "#contact", label: "Contact" },
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
              Himpunan Ummat Muslim Indonesia di Auckland — the Indonesian Muslim
              Society, connecting our community in Aotearoa since 2005.
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

          {/* Contact + connect */}
          <div className="md:col-span-4">
            <p className="eyebrow text-paper/50">Get in touch</p>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-paper/80 transition-colors hover:text-paper"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="tel:+6421948642"
                  className="text-paper/80 transition-colors hover:text-paper"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="text-paper/80">Auckland, New Zealand</li>
            </ul>
            <p className="eyebrow mt-8 text-paper/50">Connect</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/80 transition-colors hover:text-paper"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[family-name:var(--font-geist-mono)] tracking-wide">
            &copy; {new Date().getFullYear()} HUMIA — AUCKLAND, NEW ZEALAND
          </p>
          <p className="font-[family-name:var(--font-geist-mono)] tracking-wide">
            HIMPUNAN UMMAT MUSLIM INDONESIA DI AUCKLAND
          </p>
        </div>
      </div>
    </footer>
  );
}
