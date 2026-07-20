/** Content for the About page, sourced from aucklandhumia.net/about-1 */

export const STORY_MILESTONES = [
  {
    year: "Before 2005",
    title: "Pengajian Kampung Auckland",
    text: "Islamic lectures started small, held from home to home. A handful of families called it Pengajian Kampung Auckland, the Auckland Village Lecture.",
  },
  {
    year: "20 August 2005",
    title: "HUMIA is inaugurated",
    text: "The community registered HUMIA, Himpunan Umat Muslim Indonesia di Auckland. Indonesia's Ambassador, Mr Primo Alui Joelianto, opened the first inauguration.",
  },
  {
    year: "2006",
    title: "A home in the community",
    text: "Lectures moved to a community centre so newcomers would not have to find their way to a stranger's house. The fortnightly gathering became more than study. It became connection.",
  },
  {
    year: "Today",
    title: "One community, many paths here",
    text: "HUMIA now brings together international students, new migrants, and Indonesian New Zealanders born in Aotearoa. Lectures, Quran classes, charity, and the meals that follow.",
  },
] as const;

export type Trustee = { name: string; photo: string };
export type AdvisoryMember = { name: string; bio: string };

/** All committee content on the About page that admins can edit. */
export type AboutContent = {
  trustees: Trustee[];
  representatives: string[];
  advisory: AdvisoryMember[];
};

export const BOARD_OF_TRUSTEES: Trustee[] = [
  {
    name: "Dwi Siswanti",
    photo: "/images/trustees/dwi-siswanti.jpeg",
  },
  {
    name: "Firly Aboud Alweny",
    photo: "/images/trustees/firly-aboud-alweny.jpg",
  },
  {
    name: "Hanhan Suryansyah",
    photo: "/images/trustees/hanhan-suryansyah.jpeg",
  },
  {
    name: "Milky Sunkar",
    photo: "/images/trustees/milky-sunkar.jpeg",
  },
  {
    name: "Zed Assegaf",
    photo: "/images/trustees/zed-assegaf.jpg",
  },
];

export const UMMAH_REPRESENTATIVES: string[] = [
  "Abid",
  "B. Bintang Rachmadi",
  "Dwi Siswanti",
  "Endi",
  "Firly Aboud Alweny",
  "Frisnadi Sunarryanto",
  "Hanhan Suryansyah",
  "Milky Sungkar",
  "Purwanti Soegeng-Pangestoe",
  "Zainab",
];

export const ADVISORY_BOARD: AdvisoryMember[] = [
  {
    name: "Frisnadi Sunaryo, BAS., MArch.",
    bio: "Frisnadi holds a Master of Architecture from the University of Auckland and is a graduate architect. He is a member of the ummah representative and served on the HUMIA Board of Trustees for two terms, from 2007 to 2009 and from 2009 to 2011.",
  },
  {
    name: "B. Bintang Rachmadi, SE., LLM.",
    bio: "Bintang moved to New Zealand in 2005. He holds a Bachelor's degree in Economics from Brawijaya University and a Master's in Economic Law from Padjajaran University in Bandung, Indonesia. He has served two terms on the Board of Trustees and as an ummah representative.",
  },
];

/** Stored-content keys for the editable About sections. */
export const ABOUT_TRUSTEES_KEY = "about_trustees";
export const ABOUT_REPRESENTATIVES_KEY = "about_representatives";
export const ABOUT_ADVISORY_KEY = "about_advisory";

export const DEFAULT_ABOUT_CONTENT: AboutContent = {
  trustees: BOARD_OF_TRUSTEES,
  representatives: UMMAH_REPRESENTATIVES,
  advisory: ADVISORY_BOARD,
};

/** Merge stored About overrides over the bundled defaults. */
export function resolveAboutContent(overrides?: {
  about_trustees?: Trustee[] | null;
  about_representatives?: string[] | null;
  about_advisory?: AdvisoryMember[] | null;
}): AboutContent {
  return {
    trustees: overrides?.about_trustees ?? DEFAULT_ABOUT_CONTENT.trustees,
    representatives:
      overrides?.about_representatives ?? DEFAULT_ABOUT_CONTENT.representatives,
    advisory: overrides?.about_advisory ?? DEFAULT_ABOUT_CONTENT.advisory,
  };
}
