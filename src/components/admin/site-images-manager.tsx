"use client";

import { useActionState, useEffect, useState } from "react";
import { Check, Home, Images, Loader2, RotateCcw, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { resetSiteImage, updateSiteImage } from "@/app/admin/actions";
import {
  groupedSiteImageSlots,
  SITE_IMAGE_DEFAULTS,
  type SiteImageGroup,
  type SiteImageSlot,
  type SiteImages,
} from "@/lib/site-images";
import { Collapsible } from "./collapsible";
import { ImageUploader } from "./image-uploader";

const GROUP_ICONS: Record<SiteImageGroup, LucideIcon> = {
  Homepage: Home,
  "What we do carousel": Images,
  "About page": User,
};

function SiteImageRow({
  slot,
  currentUrl,
}: {
  slot: SiteImageSlot;
  currentUrl: string;
}) {
  const [state, formAction, pending] = useActionState(updateSiteImage, {});
  const [saved, setSaved] = useState(false);
  const isCustom = currentUrl !== SITE_IMAGE_DEFAULTS[slot.key];

  useEffect(() => {
    if (state.ok) {
      setSaved(true);
      const timer = setTimeout(() => setSaved(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <li className="rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-ink">{slot.label}</h3>
          <p className="mt-0.5 max-w-md text-sm text-soft">{slot.description}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
            isCustom
              ? "bg-sky text-navy"
              : "border border-line text-soft"
          }`}
        >
          {isCustom ? "Custom photo" : "Default photo"}
        </span>
      </div>

      <form action={formAction} className="mt-4">
        <input type="hidden" name="key" value={slot.key} />
        <ImageUploader name="url" initialUrl={currentUrl} />

        {state.error ? (
          <p
            role="alert"
            className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {state.error}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={pending}
            className="btn-primary !h-11 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving
              </>
            ) : (
              "Save photo"
            )}
          </button>

          {saved ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
              <Check size={16} />
              Saved and live on the website
            </span>
          ) : null}
        </div>
      </form>

      {isCustom ? (
        <form
          action={resetSiteImage}
          className="mt-2"
          onSubmit={(e) => {
            if (
              !confirm(
                `Reset "${slot.label}" back to the original photo?`,
              )
            ) {
              e.preventDefault();
            }
          }}
        >
          <input type="hidden" name="key" value={slot.key} />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 text-sm text-soft hover:text-navy"
          >
            <RotateCcw size={14} />
            Reset to original photo
          </button>
        </form>
      ) : null}
    </li>
  );
}

export function SiteImagesManager({ images }: { images: SiteImages }) {
  const groups = groupedSiteImageSlots();

  return (
    <div>
      <p className="max-w-2xl leading-relaxed text-soft">
        These are all the photos used across the public website, grouped by
        where they appear. Open a section, upload a new photo, and it replaces
        the old one straight away.
      </p>

      <div className="mt-6 space-y-4">
        {groups.map(({ group, slots }, i) => {
          const customCount = slots.filter(
            (slot) =>
              (images[slot.key] ?? slot.defaultUrl) !==
              SITE_IMAGE_DEFAULTS[slot.key],
          ).length;

          return (
            <Collapsible
              key={group}
              title={group}
              subtitle={`${slots.length} photo${slots.length === 1 ? "" : "s"}`}
              icon={GROUP_ICONS[group]}
              defaultOpen={i === 0}
              badge={
                customCount > 0 ? (
                  <span className="rounded-full bg-sky px-2 py-0.5 text-xs font-semibold text-navy">
                    {customCount} custom
                  </span>
                ) : null
              }
            >
              <ul className="space-y-4">
                {slots.map((slot) => (
                  <SiteImageRow
                    key={slot.key}
                    slot={slot}
                    currentUrl={images[slot.key] ?? slot.defaultUrl}
                  />
                ))}
              </ul>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
