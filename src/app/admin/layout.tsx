import type { Metadata } from "next";
import type { ReactNode } from "react";

// Admin depends on the request session: never static, never indexed.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "HUMIA Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
