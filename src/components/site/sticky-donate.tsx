"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";

/**
 * Floating donate button that appears once the visitor starts scrolling
 * and stays pinned to the corner for the rest of the page.
 */
export function StickyDonate() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShown(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/donate"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className={`btn-primary fixed bottom-5 left-5 z-40 !h-12 shadow-lg transition-all duration-300 sm:left-auto sm:right-6 sm:bottom-24 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <HeartHandshake size={18} />
      Donate
    </Link>
  );
}
