"use client";

import { useState } from "react";

const PRESETS = [20, 50, 100];

export default function DonateButton({
  variant = "block",
}: {
  /** "block" = full donation panel; "compact" = single button that expands. */
  variant?: "block" | "compact";
}) {
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function donate() {
    setLoading(true);
    setError("");
    const value = custom ? Number(custom) : amount;

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className={variant === "block" ? "" : "inline-block"}>
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((p) => {
          const active = !custom && amount === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => {
                setAmount(p);
                setCustom("");
              }}
              aria-pressed={active}
              className={`h-11 min-w-[4rem] border px-4 text-sm transition-colors duration-200 ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-line-strong text-ink hover:border-ink"
              }`}
            >
              ${p}
            </button>
          );
        })}
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
            $
          </span>
          <input
            type="number"
            min={2}
            step={1}
            inputMode="decimal"
            placeholder="Other"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            aria-label="Custom donation amount in NZD"
            className="h-11 w-28 border border-line-strong bg-surface pl-6 pr-3 text-sm text-ink transition-colors focus:border-accent-ink"
          />
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-sm text-[#b3261e]">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={donate}
        disabled={loading}
        className="group mt-4 inline-flex h-12 items-center justify-center gap-2 border border-accent-ink bg-accent-ink px-6 text-sm text-paper transition-colors duration-200 hover:bg-transparent hover:text-accent-ink disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting…" : "Donate securely"}
        {!loading ? (
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        ) : null}
      </button>
      <p className="mt-3 text-xs text-muted">
        Secure payment via Stripe. NZD. You&rsquo;ll be redirected to complete
        your donation.
      </p>
    </div>
  );
}
