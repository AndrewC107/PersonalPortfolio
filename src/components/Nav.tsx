"use client";

import * as React from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { motion, useReducedMotion, useScroll } from "framer-motion";

import portfolio from "@/content/content";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";
import { navItems } from "@/lib/sections";
import { useActiveSection } from "@/lib/useActiveSection";

export function Nav() {
  const [open, setOpen] = React.useState(false);
  const resume = portfolio.basics.resume;
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const ids = navItems.map((i) => i.id);
  const { activeId, setLastIntentId } = useActiveSection(ids);

  const mobileButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const mobilePanelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  React.useEffect(() => {
    // Lock background scroll when the mobile menu is open.
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    // Basic focus help: move focus into the opened panel.
    const t = window.setTimeout(() => {
      const firstLink = mobilePanelRef.current?.querySelector<HTMLAnchorElement>("a[href^=\"#\"]");
      firstLink?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [open]);

  const close = () => setOpen(false);

  const onAnchorClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    close();
    mobileButtonRef.current?.focus();

    const el = document.getElementById(id);
    if (!el) return;

    // Stable offset via scroll-margin-top (see `.section-anchor` utility).
    setLastIntentId(id);
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <header className="relative sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--bg)/0.72)] shadow-[0_1px_0_hsl(var(--text)/0.04)] backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--bg)/0.6)]">
      {/* Scroll progress (subtle, no layout shift) */}
      {reduced ? null : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-[hsl(var(--border))]"
        >
          <motion.div
            className="h-full w-full origin-left bg-[hsl(var(--accent)/0.55)]"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      )}

      <Container className="flex h-16 items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <a
            href="#home"
            className="rounded-lg px-2 py-1 text-sm font-semibold tracking-tight hover:bg-[hsl(var(--surface2))]"
            onClick={onAnchorClick("home")}
          >
            {portfolio.basics.name}
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={onAnchorClick(item.id)}
                    className={cn(
                      "relative link-sweep rounded-lg px-3 py-2 text-sm transition-colors",
                      item.id === activeId
                        ? "bg-[hsl(var(--surface2))] text-[hsl(var(--accent))]"
                        : "text-[hsl(var(--muted))]",
                      "hover:bg-[hsl(var(--surface2))] hover:text-[hsl(var(--text))]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent)/0.9)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--bg))]"
                    )}
                    aria-current={item.id === activeId ? "page" : undefined}
                  >
                    {item.label}
                    {item.id === activeId ? (
                      reduced ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3 -bottom-[2px] h-[2px] rounded-full bg-[hsl(var(--accent)/0.8)]"
                        />
                      ) : (
                        <motion.span
                          aria-hidden="true"
                          layoutId="nav-active-indicator"
                          className="absolute inset-x-3 -bottom-[2px] h-[2px] rounded-full bg-[hsl(var(--accent)/0.8)]"
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 md:flex">
            <a
              href={portfolio.basics.links.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="rounded-lg p-2 text-[hsl(var(--muted))] hover:bg-[hsl(var(--surface2))] hover:text-[hsl(var(--text))]"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={portfolio.basics.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="rounded-lg p-2 text-[hsl(var(--muted))] hover:bg-[hsl(var(--surface2))] hover:text-[hsl(var(--text))]"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <div className="hidden md:block">
            <Button
              href={resume.href}
              variant="secondary"
              target="_blank"
              rel="noreferrer noopener"
            >
              {resume.label}
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-2 text-[hsl(var(--text))] shadow-sm hover:bg-[hsl(var(--surface2))] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            ref={mobileButtonRef}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        ref={mobilePanelRef}
        className={cn(
          "md:hidden",
          "overflow-hidden border-t border-[hsl(var(--border))] bg-[hsl(var(--bg)/0.9)] backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--bg)/0.78)]",
          "transition-[max-height,opacity] duration-300 motion-reduce:transition-none",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Container className="py-3">
          <nav aria-label="Mobile navigation">
            <ul className="grid gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={onAnchorClick(item.id)}
                    className={cn(
                      "link-sweep block rounded-lg px-3 py-2 text-sm hover:bg-[hsl(var(--surface2))]",
                      item.id === activeId ? "text-[hsl(var(--accent))]" : "text-[hsl(var(--text))]"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button
              href={resume.href}
              variant="secondary"
              target="_blank"
              rel="noreferrer noopener"
              className="w-full sm:w-auto"
            >
              {resume.label}
            </Button>

            <a
              href={portfolio.basics.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-2 text-sm text-[hsl(var(--text))] hover:bg-[hsl(var(--surface2))]"
              onClick={close}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={portfolio.basics.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--surface))] px-3 py-2 text-sm text-[hsl(var(--text))] hover:bg-[hsl(var(--surface2))]"
              onClick={close}
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}


