"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Brand";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#community", label: "Community" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-line bg-base/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-humia flex h-16 items-center justify-between md:h-20"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="HUMIA, home"
        >
          <Wordmark />
        </a>

        <div className="hidden items-center gap-9 md:flex">
          <ul className="flex items-center gap-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-underline text-sm text-body transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#support" className="btn btn-signal h-9 px-4 text-[0.8125rem]">
            Donate
            <span
              aria-hidden="true"
              className="transition-transform duration-200"
            >
              &rarr;
            </span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="flex w-5 flex-col gap-[5px]">
            <span
              className={`h-px w-full bg-ink transition-transform duration-200 ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-full bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-full bg-ink transition-transform duration-200 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-line bg-base`}
      >
        <ul className="container-humia flex flex-col py-2">
          {LINKS.map((link) => (
            <li key={link.href} className="border-b border-line last:border-0">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 text-lg text-ink"
              >
                {link.label}
                <span aria-hidden="true" className="text-muted">
                  &rarr;
                </span>
              </a>
            </li>
          ))}
          <li className="pt-4 pb-6">
            <a
              href="#support"
              onClick={() => setOpen(false)}
              className="btn btn-signal w-full"
            >
              Donate to HUMIA
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
