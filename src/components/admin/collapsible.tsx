"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Simple collapsible panel used to group admin sections. Large tap target
 * and a clear chevron so less technical users can find their way around.
 */
export function Collapsible({
  title,
  subtitle,
  icon: Icon,
  badge,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-5 text-left"
      >
        <span className="flex items-center gap-3">
          {Icon ? (
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky text-navy">
              <Icon size={19} />
            </span>
          ) : null}
          <span>
            <span className="flex items-center gap-2">
              <span className="text-lg font-semibold text-ink">{title}</span>
              {badge}
            </span>
            {subtitle ? (
              <span className="mt-0.5 block text-sm text-soft">{subtitle}</span>
            ) : null}
          </span>
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-soft transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? <div className="border-t border-line p-5">{children}</div> : null}
    </section>
  );
}
