/** Central place for site-wide constants and outbound links. */

export const SITE_NAME = "HUMIA";
export const SITE_TAGLINE = "Indonesian Muslim Society in Auckland";
export const SITE_TAGLINE_ID = "Himpunan Ummat Muslim Indonesia di Auckland";

export const CONTACT_EMAIL = "humianewzealand@gmail.com";
export const FACEBOOK_URL = "https://www.facebook.com/groups/HUMIA/";

/**
 * WhatsApp click-to-chat. This is a plain wa.me deep link, so it costs
 * nothing to run: tapping it opens WhatsApp with a pre-filled message and
 * the conversation happens on the committee member's own phone.
 *
 * 021-948-642 in international format (drop the leading 0, prefix 64).
 */
export const WHATSAPP_NUMBER = "6421948642";

export function whatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Suggested one-off donation amounts (NZD). */
export const DONATION_PRESETS = [10, 25, 50, 100] as const;
export const DONATION_MIN = 2;
export const DONATION_MAX = 50000;

/** ANZ accounts as printed on the HUMIA Trust banner. */
export const BANK_ACCOUNTS = [
  { label: "HUMIA Kas (general fund)", number: "06-0293-0134482-00" },
  { label: "TPQ (Quran classes)", number: "06-0293-0134482-01" },
  { label: "Dep. Akherat", number: "06-0293-0134482-02" },
] as const;
