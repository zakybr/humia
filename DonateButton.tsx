"use client";

import { useState } from "react";

const PRESETS = [20, 50, 100];

export default function DonateButton() {
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
    <div>
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
              className={`mono h-11 min-w-[4.25rem] border px-4 text-sm transition-colors duration-200 ${
                active
                  ? "border-signal bg-signal text-on-signal"
                  : "border-line-strong text-ink hover:border-signal"
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
            className="mono h-11 w-28 border border-line-strong bg-panel-2 pl-6 pr-3 text-sm text-ink transition-colors placeholder:font-sans focus:border-signal"
          />
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-sm text-danger">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={donate}
        disabled={loading}
        className="btn btn-signal mt-4 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting to secure checkout" : "Donate securely"}
        {!loading ? (
          <span aria-hidden="true" className="transition-transform duration-200">
            &rarr;
          </span>
        ) : null}
      </button>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Secure payment via Stripe, in New Zealand dollars. You will be
        redirected to complete your donation.
      </p>
    </div>
  );
}
