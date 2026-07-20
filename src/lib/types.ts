/** Row shape of the existing `news_items` table in Supabase. */
export type NewsItem = {
  id: string;
  title: string;
  excerpt: string | null; // used as the event location
  body: string | null; // event description
  image_url: string | null;
  category: string | null;
  size: "sm" | "md" | "lg";
  type: "update" | "event";
  event_date: string | null;
  featured: boolean;
  published_at: string | null;
  sort_order: number;
  created_at: string;
};

export type EventRecord = NewsItem & { type: "event"; event_date: string };
