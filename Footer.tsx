import { LogoMark } from "./Brand";

const FACEBOOK_URL = "https://www.facebook.com/groups/HUMIA/";
const CONTACT_EMAIL = "humianewzealand@gmail.com";
const CONTACT_PHONE = "021 948 642";

const NAV = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#community", label: "Community" },
  { href: "#support", label: "Donate" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-base">
      <div className="container-humia py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand + statement */}
          <div className="md:col-span-5">
            <span className="flex items-center gap-2.5">
              <LogoMark className="text-ink" />
              <span
                className="text-[1.05rem] font-semibold uppercase tracking-[0.3em] text-ink"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Humia
              </span>
            </span>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-body">
              Himpunan Ummat Muslim Indonesia di Auckland. The Indonesian Muslim
              Society, connecting our community in Aotearoa since 2005.
            </p>
            <div className="mt-6 inline-flex items-center gap-2.5">
              <span className="status-dot" aria-hidden="true" />
              <span className="eyebrow">Active community</span>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[15px] text-body transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + connect */}
          <div className="md:col-span-4">
            <p className="eyebrow">Get in touch</p>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-body transition-colors hover:text-ink"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="tel:+6421948642"
                  className="text-body transition-colors hover:text-ink"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="text-body">Auckland, New Zealand</li>
            </ul>
            <p className="eyebrow mt-8">Connect</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-body transition-colors hover:text-ink"
                >
                  Facebook group
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Telemetry bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[0.6875rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="mono uppercase tracking-[0.14em]">
            &copy; {new Date().getFullYear()} HUMIA / Auckland, New Zealand
          </p>
          <div className="flex items-center gap-5">
            <p className="mono uppercase tracking-[0.14em]">
              36.8485&deg; S &middot; 174.7633&deg; E
            </p>
            <a
              href="/admin"
              className="mono uppercase tracking-[0.14em] text-faint transition-colors hover:text-muted"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
