import * as React from "react";

import portfolio from "@/content/content";
import { Container } from "@/components/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[hsl(var(--border))] py-10">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[hsl(var(--muted))]">
          © {year} {portfolio.basics.name}
        </p>
        <p className="text-sm text-[hsl(var(--muted))]">Built with Next.js</p>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <a
            className="link-sweep text-[hsl(var(--muted))] hover:text-[hsl(var(--text))]"
            href={portfolio.basics.links.github}
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
          <a
            className="link-sweep text-[hsl(var(--muted))] hover:text-[hsl(var(--text))]"
            href={portfolio.basics.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}


