import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donation cancelled — HUMIA",
  robots: { index: false, follow: false },
};

export default function DonateCancelled() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-paper px-6 py-16">
      <div className="max-w-md text-center">
        <span className="eyebrow">Dompet Dhuafa</span>
        <h1 className="mt-5 text-4xl">No worries.</h1>
        <p className="mt-5 text-lg leading-relaxed text-body">
          Your donation was cancelled and you haven&rsquo;t been charged. You&rsquo;re
          always welcome to give whenever you&rsquo;re ready.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/#support"
            className="inline-flex h-12 items-center justify-center gap-2 border border-ink bg-ink px-6 text-sm text-paper transition-colors duration-200 hover:bg-transparent hover:text-ink"
          >
            Try again
          </a>
          <a
            href="/"
            className="inline-flex h-12 items-center justify-center border border-line-strong px-6 text-sm text-ink transition-colors duration-200 hover:border-ink"
          >
            Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
