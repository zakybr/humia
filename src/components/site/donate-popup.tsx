"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeartHandshake, X } from "lucide-react";

const DISMISS_KEY = "humia-donate-popup-dismissed";

/**
 * One-time donation prompt. Appears a few seconds after the page loads,
 * and once dismissed stays away for the rest of the browser session.
 */
export function DonatePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Support HUMIA"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm rounded-2xl border border-line bg-white p-5 shadow-xl sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close"
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-soft hover:bg-sky hover:text-navy"
      >
        <X size={16} />
      </button>

      <div className="flex items-start gap-3.5">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sky text-navy">
          <HeartHandshake size={20} />
        </div>
        <div>
          <p className="pr-6 text-[15px] font-semibold text-ink">
            Help keep our community going
          </p>
          <p className="mt-1 text-sm leading-relaxed text-soft">
            HUMIA is run entirely by volunteers. Your sadaqah funds lectures,
            Quran classes and support for families in need.
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2.5">
        <Link href="/donate" onClick={dismiss} className="btn-primary !h-10 flex-1 text-sm">
          Donate
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="btn-secondary !h-10 flex-1 text-sm"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
