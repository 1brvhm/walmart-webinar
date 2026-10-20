"use client";

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
  lg: "min-h-[68px] gap-4 rounded-[10px] px-8 py-[18px] text-xl sm:text-[22px]",
} as const;

/**
 * "Save my free seat" — every one of these opens the same registration modal.
 */
export default function SeatButton({
  variant = "solid",
  size = "md",
  className = "",
  label = "Save my free seat",
}: {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  className?: string;
  label?: string;
}) {
  const { open } = useRegistration();

  return (
    <button
      type="button"
      onClick={open}
      className={`seat-cta inline-flex items-center justify-center font-extrabold leading-snug transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      <WalmartSpark
        tone={variant === "sun" ? "fill-navy" : "fill-spark"}
        className={size === "nav" ? "size-4 sm:size-[18px]" : "size-[21px] sm:size-[23px]"}
      />
      <span className="min-w-0">{label}</span>
      <span className="cta-arrow text-2xl leading-none" aria-hidden="true">
        &rarr;
      </span>
    </button>
  );
}
