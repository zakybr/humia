/**
 * HUMIA brand marks. The logo is an aperture / reticle: a precise square
 * frame with a converging crosshair and a single emerald point at the
 * centre, a gathering point, located and held. Restrained line-art in the
 * defence-tech spirit. Purely decorative, so the SVG is aria-hidden and the
 * accessible name comes from the surrounding link/label.
 */

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width="22"
      height="22"
      aria-hidden="true"
      focusable="false"
    >
      {/* registration frame */}
      <rect
        x="1.5"
        y="1.5"
        width="21"
        height="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* converging crosshair, gapped at the centre (the aperture) */}
      <path
        d="M12 3.5 V8.4 M12 20.5 V15.6 M3.5 12 H8.4 M20.5 12 H15.6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
      {/* the point: the community, held at centre */}
      <rect x="10.4" y="10.4" width="3.2" height="3.2" fill="var(--signal)" />
    </svg>
  );
}

export function Wordmark({
  className = "",
  tone = "ink",
}: {
  className?: string;
  /** "ink" for standard, "signal" tints the mark emerald. */
  tone?: "ink" | "signal";
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className={tone === "signal" ? "text-signal" : "text-ink"} />
      <span
        className="text-[1.05rem] font-semibold uppercase tracking-[0.3em] text-ink"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Humia
      </span>
    </span>
  );
}
