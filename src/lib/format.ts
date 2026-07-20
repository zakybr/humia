const NZ = "Pacific/Auckland";

export function formatEventDate(iso: string): string {
  return new Intl.DateTimeFormat("en-NZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: NZ,
  }).format(new Date(iso));
}

export function formatEventTime(iso: string): string {
  return new Intl.DateTimeFormat("en-NZ", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: NZ,
  }).format(new Date(iso));
}

export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: NZ,
  }).format(new Date(iso));
}

/** Day number and short month, for calendar-style date badges. */
export function dateBadge(iso: string): { day: string; month: string } {
  const d = new Date(iso);
  return {
    day: new Intl.DateTimeFormat("en-NZ", { day: "numeric", timeZone: NZ }).format(d),
    month: new Intl.DateTimeFormat("en-NZ", { month: "short", timeZone: NZ }).format(d),
  };
}

/** Value for a datetime-local input, in NZ local time. */
export function toDatetimeLocal(iso: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: NZ,
  }).formatToParts(new Date(iso));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}
