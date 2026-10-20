"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { CountUp } from "./Motion";
import SeatButton from "./SeatButton";

/**
 * Hero visual: one of Jacob's own Seller Center snapshots, his cutout in front,
 * two floating figure cards lifted from the snapshots, then the main CTA.
 */
export default function HeroScene() {
  return (
    <div className="relative mx-auto flex w-full max-w-[600px] flex-col items-center">
      <div className="relative isolate h-[360px] w-full min-[600px]:h-[470px]">
        {/* Seller Center snapshot */}
        <div
          className="rise absolute inset-x-0 top-0 min-[600px]:left-0 min-[600px]:right-[2%]"
          style={{ animationDelay: "250ms" }}
        >
          <div className="float-dash overflow-hidden rounded-[12px] border-[5px] border-white bg-white shadow-[0_24px_60px_#00000040] min-[600px]:rounded-[16px] min-[600px]:[transform:perspective(1200px)_rotateY(-6deg)_rotateX(3deg)]">
            <div className="shot">
              <Image
                src="/dashboard-orders.webp"
                alt="Jacob's Walmart Seller Center home screen showing 880 orders today, 418 unshipped orders, a 4.62 account rating and a $59,907.79 balance"
                width={1583}
                height={727}
                priority
                sizes="(min-width: 900px) 590px, 100vw"
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>

        {/* Upper-body crop of Jacob, faded at the bottom edge */}
        <div
          className="rise absolute bottom-0 left-[2%] z-[2] aspect-[0.95] w-[58%] overflow-hidden [mask-image:linear-gradient(#000_88%,transparent_100%)] min-[600px]:left-[10%] min-[600px]:w-[54%]"
          style={{ animationDelay: "450ms" }}
        >
          <Image
            src="/jacob-cutout.png"
            alt="Jacob Jones, webinar host"
            width={1086}
            height={1448}
            priority
            sizes="(min-width: 600px) 330px, 58vw"
            className="block h-auto w-full drop-shadow-[0_14px_24px_#00000055]"
          />
        </div>

        {/* Figures lifted from the snapshots */}
        <div className="absolute bottom-2 right-0 z-[3] flex w-[46%] flex-col gap-2.5 min-[600px]:bottom-0 min-[600px]:w-[42%] min-[600px]:gap-3.5">
          <FigureCard
            delay={700}
            label="GMV · Last 90 days"
            value={<CountUp value={687716.68} decimals={2} prefix="$" duration={2000} />}
            note="From Jacob’s dashboard"
          />
          <FigureCard
            delay={850}
            label="Today’s orders"
            value={<CountUp value={880} duration={1600} />}
            note="At time of screenshot"
            float
          />
        </div>
      </div>

      <div className="rise relative z-[4] -mt-1 w-full max-w-[530px]" style={{ animationDelay: "1000ms" }}>
        <SeatButton variant="sun" size="lg" className="cta-pulse w-full border-2 border-[#ffe48a]" />
      </div>
      <p className="mt-4 text-[15px] text-white">
        <strong>Join Jacob live.</strong> Free to attend.
      </p>
      <p className="mt-3 max-w-[460px] text-center text-[11px] leading-normal text-[#c4d4ef] min-[600px]:text-xs">
        Jacob’s supplied dashboard snapshots. Past sales do not guarantee future results.
      </p>
    </div>
  );
}

function FigureCard({
  label,
  value,
  note,
  delay,
  float = false,
}: {
  label: string;
  value: React.ReactNode;
  note: string;
  delay: number;
  float?: boolean;
}) {
  return (
    <div className="rise" style={{ animationDelay: `${delay}ms` }}>
      <div
        className={`float-sales rounded-[12px] border border-[#dfe8f5] bg-white px-3 py-2.5 shadow-[0_16px_40px_#00000038] min-[600px]:rounded-[16px] min-[600px]:px-[18px] min-[600px]:py-4 ${float ? "[animation-delay:-2.5s]" : ""}`}
      >
        <small className="block text-[10px] text-muted min-[600px]:text-[13px]">{label}</small>
        <strong className="block text-[17px] font-extrabold leading-snug tracking-[-0.03em] text-ink min-[420px]:text-xl min-[600px]:text-[28px]">
          {value}
        </strong>
        <span className="block text-[9px] text-muted min-[600px]:text-[11px]">{note}</span>
      </div>
    </div>
  );
}


const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** Strip under the hero with the pause/resume control for all decorative motion. */
export function MotionToolbar() {
  // Follows the OS reduced-motion setting until the visitor clicks the toggle.
  const prefersReduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const [override, setOverride] = useState<boolean | null>(null);
  const paused = override ?? prefersReduced;

  useEffect(() => {
    document.body.classList.toggle("motion-paused", paused);
  }, [paused]);

  return (
    <div className="mx-auto flex w-[min(1180px,calc(100%-36px))] items-center justify-between gap-2.5 py-3 text-[13px] text-muted sm:gap-4">
      <span className="flex max-w-[180px] items-center gap-[9px] text-[11px] leading-normal sm:max-w-none sm:text-[13px]">
        <i
          aria-hidden="true"
          className="size-[7px] shrink-0 rounded-full live-dot bg-blue shadow-[0_0_0_4px_#e2edfd]"
        />
        A closer look at the business behind the store
      </span>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setOverride(!paused)}
        className="min-h-11 whitespace-nowrap rounded-[30px] border border-border bg-white px-3 py-2 text-[11px] text-blue sm:px-4 sm:text-[13px]"
      >
        {paused ? "Resume animations" : "Pause animations"}
      </button>
    </div>
  );
}
