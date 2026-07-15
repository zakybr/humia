import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeaderProps = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
};

/**
 * Standard section header: mono index + eyebrow, grotesk display title,
 * optional intro. This is the repeating "spec-sheet" rhythm across the page.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal className="flex items-center gap-3">
        {index ? (
          <span className="eyebrow eyebrow-signal">{index}</span>
        ) : null}
        {index ? (
          <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
        ) : null}
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="mt-5 text-[2rem] leading-[1.08] sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={120}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Elevated panel surface vs. base canvas. */
  surface?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  surface = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-line ${surface ? "bg-panel" : ""} ${className}`}
    >
      <div className="container-humia py-20 md:py-28">{children}</div>
    </section>
  );
}
