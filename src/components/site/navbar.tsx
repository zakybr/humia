"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/#services", label: "What we do" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="HUMIA home">
          <Image
            src="/humia-logo.png"
            alt="HUMIA logo"
            width={150}
            height={59}
            priority
            className="h-11 w-auto sm:h-12"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-body transition-colors hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/donate" className="btn-primary !h-10 px-5 text-sm">
            Donate
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center text-navy md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-white px-4 pb-6 pt-2 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line py-3.5 text-[15px] font-medium text-body"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/donate"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4 w-full"
          >
            Donate
          </Link>
        </div>
      )}
    </header>
  );
}
