/**
 * Humia brand marks. The logo is a simple geometric aperture / open-door
 * motif — restrained line-art in the Palantir/Anduril spirit, warmed by the
 * accent stroke. Purely decorative, so the SVGs are aria-hidden and the
 * accessible name is provided by the surrounding link/label.
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
      {/* outer frame */}
      <rect
        x="1.5"
        y="1.5"
        width="21"
        height="21"
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      {/* open doorway / path inward */}
      <path
        d="M12 4.5 L12 19.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M7.5 8.5 L12 12 L7.5 15.5"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="text-ink" />
      <span
        className="text-[1.05rem] font-semibold uppercase tracking-[0.28em] text-ink"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        Humia
      </span>
    </span>
  );
}
