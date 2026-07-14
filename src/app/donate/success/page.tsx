import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank you — HUMIA",
  robots: { index: false, follow: false },
};

export default function DonateSuccess() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-paper px-6 py-16">
      <div className="max-w-md text-center">
        <span className="eyebrow eyebrow-accent">Dompet Dhuafa</span>
        <h1 className="mt-5 text-4xl">Thank you.</h1>
        <p className="mt-5 text-lg leading-relaxed text-body">
          Your generosity supports the HUMIA community and those in need. May it
          be a source of blessing — jazakumullahu khayran.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 border border-ink bg-ink px-6 text-sm text-paper transition-colors duration-200 hover:bg-transparent hover:text-ink"
        >
          Back to home
        </a>
      </div>
    </main>
  );
}
