import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, FACEBOOK_URL, SITE_TAGLINE_ID } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-navy-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Image
              src="/humia-logo.png"
              alt="HUMIA logo"
              width={160}
              height={63}
              className="h-14 w-auto rounded bg-white p-1.5 sm:h-16"
              style={{ width: "auto", height: "auto" }}
            />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {SITE_TAGLINE_ID}. Serving the Indonesian Muslim community of
              Auckland since 2005.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
                Visit
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link href="/about" className="text-white/85 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-white/85 hover:text-white">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="text-white/85 hover:text-white">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-white/85 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
                Connect
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/85 hover:text-white"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-white/85 hover:text-white"
                  >
                    Email us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row sm:justify-between">
          <p>HUMIA Trust, Auckland, New Zealand. NZBN 9429043050758.</p>
          <Link href="/admin" className="hover:text-white/80">
            Committee sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}
