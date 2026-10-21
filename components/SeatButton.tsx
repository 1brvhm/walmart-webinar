"use client";

import { useEffect, useState } from "react";
import { WEBINAR } from "@/lib/business";
import { useRegistration } from "./RegistrationProvider";

/** Walmart-style six-spoke spark that sits inside every seat CTA. */
export function WalmartSpark({
  className = "size-[23px]",
  tone = "fill-spark",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <svg
      className={`walmart-spark block shrink-0 ${tone} ${className}`}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <rect
          key={deg}
          x="13.8"
          y="1"
          width="4.4"
          height="9"
          rx="2.2"
          transform={`rotate(${deg} 16 16)`}
        />
      ))}
    </svg>
  );
}

const VARIANTS = {
  /** Walmart blue fill — default on white and pale-blue sections. */
  solid:
    "border border-blue bg-blue text-white hover:bg-blue-dark hover:shadow-[0_10px_26px_#0453c42e]",
  /** Yellow fill — for the navy and blue panels. */
  sun: "border border-spark bg-spark text-navy hover:bg-spark-dark hover:shadow-[0_12px_30px_#ffc2203d]",
} as const;

const SIZES = {
  nav: "min-h-11 gap-2 rounded-[9px] px-3 py-2.5 text-xs sm:min-h-12 sm:px-5 sm:text-[15px]",
  md: "min-h-[60px] gap-3.5 rounded-[9px] px-[27px] py-[17px] text-lg sm:text-[19px]",
  lg: "min-h-[76px] gap-3 rounded-[14px] py-3 pl-4 pr-3 text-[19px] sm:min-h-[84px] sm:gap-4 sm:pl-6 sm:pr-4 sm:text-[23px]",
} as const;

/**
 * "Save my free seat" — every one of these opens the same registration modal.
 * Pass `detail` for the large two-line version used on the main CTAs.
 */
export default function SeatButton({
  variant = "solid",
  size = "md",
  className = "",
  label = "Save my free seat",
  detail,
}: {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  className?: string;
  label?: string;
  /** Second line under the label, e.g. the date. */
  detail?: string;
}) {
  const { open } = useRegistration();
  const sun = variant === "sun";

  if (detail) {
    return (
      <button
        type="button"
        onClick={open}
        className={`seat-cta seat-cta-big group inline-flex items-center justify-between text-left font-extrabold leading-tight transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      >
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-full sm:size-12 ${sun ? "bg-navy" : "bg-white/15"}`}
          aria-hidden="true"
        >
          <WalmartSpark tone="fill-spark" className="size-6 sm:size-7" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span>{label}</span>
          <span className={`mt-1 text-xs font-bold tracking-normal sm:text-sm ${sun ? "text-navy/75" : "text-white/80"}`}>
            {detail}
          </span>
        </span>
        <span
          className={`cta-arrow grid size-11 shrink-0 place-items-center rounded-full text-2xl leading-none sm:size-12 ${sun ? "bg-white/55 text-navy" : "bg-white text-blue"}`}
          aria-hidden="true"
        >
          &rarr;
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className={`seat-cta inline-flex items-center justify-center font-extrabold leading-snug transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      <WalmartSpark
        tone={sun ? "fill-navy" : "fill-spark"}
        className={size === "nav" ? "size-4 sm:size-[18px]" : "size-[21px] sm:size-[23px]"}
      />
      <span className="min-w-0 whitespace-nowrap">{label}</span>
      <span
        className={`cta-arrow text-2xl leading-none ${size === "nav" ? "max-[399px]:hidden" : ""}`}
        aria-hidden="true"
      >
        &rarr;
      </span>
    </button>
  );
}

const SEAT_DETAIL = `Free · ${WEBINAR.dateCompact} · ${WEBINAR.time}`;

/** The main CTA: big two-line button with reassurance ticks underneath. */
export function SeatCallout({
  tone = "dark",
  className = "",
}: {
  /** Background the callout sits on — sets the colour of the ticks. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={`w-full max-w-[540px] ${className}`}>
      <SeatButton
        variant={tone === "dark" ? "sun" : "solid"}
        size="lg"
        detail={SEAT_DETAIL}
        className="cta-pulse w-full"
      />
      <ul
        className={`mt-3.5 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[13px] font-semibold sm:text-sm ${tone === "dark" ? "text-[#e3ecfa]" : "text-muted"}`}
      >
        {["100% free", "No credit card", "Live Q&A with Jacob"].map((item) => (
          <li key={item} className="flex items-center gap-1.5">
            <span className={tone === "dark" ? "text-spark" : "text-blue"} aria-hidden="true">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Phone-only bar pinned to the bottom of the screen once the hero CTA has
 * scrolled away, so a seat is always one tap away.
 */
export function MobileSeatBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const nearEnd =
        window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 160;
      setShow(window.scrollY > 900 && !nearEnd);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-10px_30px_#0a2a631f] backdrop-blur transition-[translate,opacity] duration-300 md:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[calc(100%+48px)] opacity-0"}`}
    >
      <SeatButton
        variant="solid"
        size="lg"
        detail={SEAT_DETAIL}
        className="w-full"
      />
    </div>
  );
}
