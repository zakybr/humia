export type NewsItem = {
  id: string;
  title: string;
  body: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type EventItem = {
  id: string;
  title: string;
  description: string;
  location: string | null;
  starts_at: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};
