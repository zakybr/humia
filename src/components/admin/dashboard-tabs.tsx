"use client";

import { useState } from "react";
import { CalendarDays, ImageIcon, Users } from "lucide-react";
import type { EventRecord } from "@/lib/types";
import type { SiteImages } from "@/lib/site-images";
import type { AboutContent } from "@/lib/about";
import { EventsManager } from "./events-manager";
import { SiteImagesManager } from "./site-images-manager";
import { AboutManager } from "./about-manager";

type Tab = "events" | "photos" | "about";

export function DashboardTabs({
  upcoming,
  past,
  images,
  about,
}: {
  upcoming: EventRecord[];
  past: EventRecord[];
  images: SiteImages;
  about: AboutContent;
}) {
  const [tab, setTab] = useState<Tab>("events");

  const tabs: { id: Tab; label: string; icon: typeof CalendarDays }[] = [
    { id: "events", label: "Events", icon: CalendarDays },
    { id: "photos", label: "Website photos", icon: ImageIcon },
    { id: "about", label: "About page", icon: Users },
  ];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Admin sections"
        className="flex gap-1 rounded-2xl border border-line bg-white p-1"
      >
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
              tab === id
                ? "bg-navy text-white"
                : "text-body hover:bg-sky hover:text-navy"
            }`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "events" ? (
          <EventsManager upcoming={upcoming} past={past} />
        ) : tab === "photos" ? (
          <SiteImagesManager images={images} />
        ) : (
          <AboutManager about={about} />
        )}
      </div>
    </div>
  );
}
