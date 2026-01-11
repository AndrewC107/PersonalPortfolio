import * as React from "react";

import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

export type SectionTone = "default" | "tinted";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: SectionTone;
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-anchor relative",
        tone === "tinted" ? "bg-[hsl(var(--surface2))]" : "bg-transparent",
        "py-16 md:py-20",
        className
      )}
      aria-label={title}
      {...props}
    >
      <Container>
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted))]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
          {subtitle ? (
            <p className="mt-3 text-base leading-relaxed text-[hsl(var(--muted))]">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}


