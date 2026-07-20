"use client";

import { useState } from "react";
import { HeartHandshake, Loader2 } from "lucide-react";
import { DONATION_MAX, DONATION_MIN, DONATION_PRESETS } from "@/lib/site";

export function DonateForm() {
  const [selected, setSelected] = useState<number | null>(DONATION_PRESETS[1]);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const amount = custom ? Number(custom) : selected;

  async function startCheckout() {
    if (!amount || !Number.isFinite(amount)) {
      setError("Please choose or enter an amount.");
      return;
    }
    if (amount < DONATION_MIN || amount > DONATION_MAX) {
      setError(`Please enter an amount between $${DONATION_MIN} and $${DONATION_MAX.toLocaleString()}.`);
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Could not reach the server. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-ink">Give a one-off donation</h2>
      <p className="mt-1.5 text-sm text-soft">
        Secure card payment through Stripe, in New Zealand dollars.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2.5">
        {DONATION_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setSelected(preset);
              setCustom("");
              setError("");
            }}
            className={`h-12 rounded-xl border text-[15px] font-semibold transition-colors ${
              selected === preset && !custom
                ? "border-navy bg-navy text-white"
                : "border-line bg-white text-navy hover:border-blue"
            }`}
          >
            ${preset}
          </button>
        ))}
      </div>

      <label htmlFor="custom-amount" className="mt-5 block text-sm font-semibold text-ink">
        Or enter your own amount
      </label>
      <div className="relative mt-2">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-soft">
          $
        </span>
        <input
          id="custom-amount"
          type="number"
          inputMode="decimal"
          min={DONATION_MIN}
          max={DONATION_MAX}
          placeholder="0.00"
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            setError("");
          }}
          className="h-12 w-full rounded-xl border border-line bg-white pl-8 pr-4 text-[15px] text-ink outline-none focus:border-blue"
        />
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Opening secure checkout
          </>
        ) : (
          <>
            <HeartHandshake size={18} />
            Donate{amount ? ` $${amount}` : ""}
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-soft">
        You will be taken to Stripe to complete payment. HUMIA never sees your
        card details.
      </p>
    </div>
  );
}
