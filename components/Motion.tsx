"use client";

import { useEffect, useRef, useState } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Arms the `[data-reveal]` scroll animations. Anything already on screen is
 * marked visible in the same frame, so above-the-fold content never flickers.
 * Without JavaScript (or with reduced motion) nothing is ever hidden.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (reducedMotion() || !("IntersectionObserver" in window)) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    for (const el of els) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      else observer.observe(el);
    }
    document.documentElement.classList.add("reveal-ready");

    return () => observer.disconnect();
  }, []);

  return null;
}

/**
 * Counts up to `value` the first time it scrolls into view. The server renders
 * the final figure, so the real number is what crawlers and no-JS visitors see.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  duration = 1600,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !("IntersectionObserver" in window)) return;

    let frame = 0;
    let settle = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setShown(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
        // Never leave a half-counted figure if frames are throttled (background tab).
        settle = window.setTimeout(() => setShown(value), duration + 200);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(settle);
    };
  }, [value, duration]);

  const format = (n: number) =>
    prefix +
    n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  // Screen readers get the final figure, never the in-between frames.
  return (
    <>
      <span className="sr-only">{format(value)}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {format(shown)}
      </span>
    </>
  );
}
