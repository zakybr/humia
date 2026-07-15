type FigureProps = {
  /** When set, the image renders. Until then a labelled placeholder shows. */
  src?: string;
  alt?: string;
  /** Short caption. Placeholder label; overlaid on photos; alt text otherwise. */
  caption: string;
  /** CSS aspect-ratio, e.g. "16 / 7", "4 / 3", "4 / 5". */
  ratio?: string;
  className?: string;
  /** Reticle corner marks on the frame. */
  corners?: boolean;
  /**
   * Decorative artwork (e.g. the generated Islamic-geometry SVGs) rather than
   * a photo: rendered clean with no dark caption overlay. Swap `art` off and
   * point `src` at a real photo to get the photo treatment instead.
   */
  art?: boolean;
};

/**
 * A framed image slot. Real HUMIA photography drops straight in via `src`
 * (files under /public/images). While a slot is empty it shows a tasteful,
 * on-brand placeholder so the layout and placement can be reviewed.
 */
export default function Figure({
  src,
  alt,
  caption,
  ratio = "4 / 3",
  className = "",
  corners = true,
  art = false,
}: FigureProps) {
  return (
    <figure
      className={`${corners ? "corners" : ""} relative overflow-hidden border border-line-strong bg-panel-2 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={art ? "" : (alt ?? caption)}
          aria-hidden={art ? "true" : undefined}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="grid-backdrop absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center"
        >
          <svg
            viewBox="0 0 48 48"
            width="40"
            height="40"
            fill="none"
            className="text-line-strong"
          >
            <rect
              x="3"
              y="7"
              width="42"
              height="34"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="16" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M6 38 L19 26 L28 34 L34 29 L42 37"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
          <span className="eyebrow">{caption}</span>
        </div>
      )}
      {src && !art ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--overlay)] to-transparent p-4 pt-10">
          <span className="mono text-[0.6875rem] uppercase tracking-[0.16em] text-white">
            {caption}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
