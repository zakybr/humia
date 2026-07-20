/**
 * Registry of every editable photo on the public website.
 *
 * Each slot has a stable `key` (stored in the `site_images` table), a plain
 * language label/description for the admin portal, and a bundled default that
 * is used until a committee member uploads a replacement. Adding a new
 * editable photo is a matter of adding a slot here and reading it on the page.
 */
/** Groups the photo slots into named sections in the admin portal. */
export type SiteImageGroup = "Homepage" | "What we do carousel" | "About page";

export const SITE_IMAGE_GROUP_ORDER: SiteImageGroup[] = [
  "Homepage",
  "What we do carousel",
  "About page",
];

export type SiteImageSlot = {
  key: string;
  group: SiteImageGroup;
  label: string;
  description: string;
  defaultUrl: string;
  /** CSS aspect-ratio used for the preview in the admin portal. */
  aspect: string;
};

export const SITE_IMAGE_SLOTS: SiteImageSlot[] = [
  {
    key: "home_hero",
    group: "Homepage",
    label: "Hero photo",
    description: "Large photo at the top of the home page, beside the welcome text.",
    defaultUrl: "/images/gathering-2.png",
    aspect: "4 / 3",
  },
  {
    key: "home_gallery_1",
    group: "Homepage",
    label: "Gallery — left",
    description: "First photo in the 'This is what community looks like' row.",
    defaultUrl: "/images/gathering-1.png",
    aspect: "3 / 4",
  },
  {
    key: "home_gallery_2",
    group: "Homepage",
    label: "Gallery — middle",
    description: "Second photo in the community gallery row.",
    defaultUrl: "/images/gathering-3.png",
    aspect: "3 / 4",
  },
  {
    key: "home_gallery_3",
    group: "Homepage",
    label: "Gallery — right",
    description: "Third photo in the community gallery row.",
    defaultUrl: "/images/banner.png",
    aspect: "3 / 4",
  },
  {
    key: "service_pengajian",
    group: "What we do carousel",
    label: "Pengajian card",
    description: "Photo on the 'Pengajian' card in the What we do carousel.",
    defaultUrl: "/images/banner.png",
    aspect: "3 / 4",
  },
  {
    key: "service_tpq",
    group: "What we do carousel",
    label: "Quran classes card",
    description: "Photo on the 'Quran classes (TPQ)' card.",
    defaultUrl: "/images/gathering-3.png",
    aspect: "3 / 4",
  },
  {
    key: "service_nikah",
    group: "What we do carousel",
    label: "Marriage celebrant card",
    description: "Photo on the 'Marriage celebrant' card.",
    defaultUrl: "/images/gathering-2.png",
    aspect: "3 / 4",
  },
  {
    key: "service_charity",
    group: "What we do carousel",
    label: "Dompet Dhuafa card",
    description: "Photo on the 'Dompet Dhuafa' charity card.",
    defaultUrl: "/images/gathering-1.png",
    aspect: "3 / 4",
  },
  {
    key: "about_story",
    group: "About page",
    label: "Story photo",
    description: "Tall photo beside the 'Our story' timeline on the About page.",
    defaultUrl: "/images/banner.png",
    aspect: "4 / 5",
  },
];

/** Slots bucketed by group, preserving the group display order. */
export function groupedSiteImageSlots(): {
  group: SiteImageGroup;
  slots: SiteImageSlot[];
}[] {
  return SITE_IMAGE_GROUP_ORDER.map((group) => ({
    group,
    slots: SITE_IMAGE_SLOTS.filter((slot) => slot.group === group),
  })).filter((entry) => entry.slots.length > 0);
}

export type SiteImages = Record<string, string>;

/** Map of slot key to its bundled default image. */
export const SITE_IMAGE_DEFAULTS: SiteImages = Object.fromEntries(
  SITE_IMAGE_SLOTS.map((slot) => [slot.key, slot.defaultUrl]),
);

/** Merge stored overrides over the bundled defaults. */
export function resolveSiteImages(overrides?: SiteImages | null): SiteImages {
  return { ...SITE_IMAGE_DEFAULTS, ...(overrides ?? {}) };
}
