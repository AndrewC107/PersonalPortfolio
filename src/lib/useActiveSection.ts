import * as React from "react";

export interface UseActiveSectionOptions {
  /**
   * IntersectionObserver rootMargin tuned for sticky nav.
   * Default activates sections when they enter the upper-middle viewport.
   */
  rootMargin?: string;
  /**
   * Sticky-nav offset buffer used for fallback selection when no sections intersect.
   */
  topBufferPx?: number;
  /**
   * How long (ms) an intent can be used to avoid flicker during smooth scrolling.
   */
  intentMs?: number;
}

export interface UseActiveSectionResult {
  /**
   * The active section derived from viewport state (IntersectionObserver + fallback).
   */
  activeId: string;
  /**
   * Optional: used by Nav click handlers to set a short-lived "intent" during smooth scroll.
   * This never overrides a real viewport candidate.
   */
  setLastIntentId: (id: string) => void;
}

const DEFAULT_THRESHOLDS = [0, 0.1, 0.25, 0.5] as const;
const MEANINGFUL_RATIO = 0.12;

export function useActiveSection(
  sectionIds: string[],
  options: UseActiveSectionOptions = {}
): UseActiveSectionResult {
  const { rootMargin = "-20% 0px -70% 0px", topBufferPx = 96, intentMs = 900 } = options;
  const [activeId, setActiveId] = React.useState<string>(sectionIds[0] ?? "");

  const ratiosRef = React.useRef<Map<string, number>>(new Map());
  const lastObserverUpdateRef = React.useRef<number>(0);

  const intentIdRef = React.useRef<string>("");
  const intentUntilRef = React.useRef<number>(0);

  const cancelIntent = React.useCallback(() => {
    intentUntilRef.current = 0;
    intentIdRef.current = "";
  }, []);

  const setLastIntentId = React.useCallback(
    (id: string) => {
      if (!id) return;
      intentIdRef.current = id;
      intentUntilRef.current = Date.now() + intentMs;
    },
    [intentMs]
  );

  // If the user loads with a hash, treat it as a short-lived intent (no permanent override).
  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    if (!sectionIds.includes(hash)) return;
    const t = window.setTimeout(() => setLastIntentId(hash), 0);
    return () => window.clearTimeout(t);
  }, [sectionIds, setLastIntentId]);

  // Cancel intent immediately on user-driven scroll input.
  React.useEffect(() => {
    const onWheel = () => cancelIntent();
    const onMouseDown = () => cancelIntent();
    const onTouchMove = () => cancelIntent();
    const onKeyDown = (e: KeyboardEvent) => {
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
      if (keys.includes(e.key)) cancelIntent();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [cancelIntent]);

  const computeFallbackActive = React.useCallback((): string => {
    const buffer = topBufferPx + 8;

    let bestAbove: { id: string; dist: number } | null = null;
    let bestBelow: { id: string; dist: number } | null = null;

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      const dist = Math.abs(top - buffer);

      if (top <= buffer) {
        if (!bestAbove || dist < bestAbove.dist) bestAbove = { id, dist };
      } else {
        if (!bestBelow || dist < bestBelow.dist) bestBelow = { id, dist };
      }
    }

    // Prefer the nearest section whose top is above the sticky nav line; otherwise pick the nearest below.
    return bestAbove?.id ?? bestBelow?.id ?? (sectionIds[0] ?? "");
  }, [sectionIds, topBufferPx]);

  const computeObserverCandidate = React.useCallback((): { id: string; ratio: number } | null => {
    let bestId = "";
    let bestRatio = 0;
    for (const id of sectionIds) {
      const r = ratiosRef.current.get(id) ?? 0;
      if (r > bestRatio) {
        bestRatio = r;
        bestId = id;
      }
    }
    if (!bestId || bestRatio <= 0) return null;
    return { id: bestId, ratio: bestRatio };
  }, [sectionIds]);

  const setActiveIfChanged = React.useCallback((next: string) => {
    if (!next) return;
    setActiveId((prev) => (prev === next ? prev : next));
  }, []);

  const chooseActive = React.useCallback(() => {
    const candidate = computeObserverCandidate();

    // If the observer has a meaningful candidate, always prefer it (intent never blocks).
    if (candidate && candidate.ratio >= MEANINGFUL_RATIO) {
      setActiveIfChanged(candidate.id);
      return;
    }

    // No meaningful candidate: use fallback, but if we’re in an intent window and have no intersections,
    // prefer intent to avoid flicker during smooth scroll.
    const now = Date.now();
    const inIntent = now < intentUntilRef.current;
    const intent = intentIdRef.current;
    const anyIntersecting = !!candidate;

    if (inIntent && intent && !anyIntersecting) {
      setActiveIfChanged(intent);
      return;
    }

    if (candidate) {
      setActiveIfChanged(candidate.id);
      return;
    }

    setActiveIfChanged(computeFallbackActive());
  }, [computeFallbackActive, computeObserverCandidate, setActiveIfChanged]);

  React.useEffect(() => {
    if (!sectionIds.length) return;

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        lastObserverUpdateRef.current = Date.now();
        for (const e of entries) {
          const id = (e.target as HTMLElement).id;
          ratiosRef.current.set(id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        chooseActive();
      },
      { root: null, rootMargin, threshold: [...DEFAULT_THRESHOLDS] }
    );

    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, [chooseActive, rootMargin, sectionIds]);

  // Scroll fallback (rAF throttled).
  React.useEffect(() => {
    if (!sectionIds.length) return;
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const now = Date.now();
        const stale = now - lastObserverUpdateRef.current > 250;

        if (stale) {
          chooseActive();
          return;
        }

        const candidate = computeObserverCandidate();
        if (!candidate) chooseActive();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [chooseActive, computeObserverCandidate, sectionIds]);

  return { activeId, setLastIntentId };
}


