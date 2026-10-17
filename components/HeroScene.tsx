"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

// Illustrative sample figures only — not Jacob's sales or real seller data.
const TOTALS = [8460, 8490, 8550, 8580, 8670, 8730];
const ORDERS = [282, 283, 285, 286, 289, 291];

const GROWTH =
  "M5 110L35 105L60 111L85 84L112 91L140 75L165 80L195 54L220 65L247 40L275 49L305 25L332 34L365 13L395 5";

const isPaused = () => document.body.classList.contains("motion-paused");

/** Animated sample dashboard with Jacob's cutout and two floating "sale" cards. */
export default function HeroScene() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden || isPaused()) return;
      setStep((s) => (s + 1) % TOTALS.length);
    }, 3400);
    return () => clearInterval(id);
  }, []);

  const sales = "$" + TOTALS[step].toLocaleString("en-US");

  return (
    <div className="relative mx-auto flex w-full max-w-[560px] flex-col lg:max-w-[620px]">
      <div className="relative isolate h-[390px] min-[600px]:h-[540px]">
        {/* Sample dashboard */}
        <div className="absolute inset-x-0 top-[5px] h-[280px] overflow-hidden rounded-[17px] border border-[#e9e3ed] bg-[linear-gradient(150deg,#fff,#fcfaff)] p-[17px] shadow-[0_16px_50px_#49255212] min-[600px]:left-[4%] min-[600px]:right-[3%] min-[600px]:top-4 min-[600px]:h-[350px] min-[600px]:px-[25px] min-[600px]:py-[22px] min-[600px]:[transform:perspective(1000px)_rotateY(-5deg)_rotateX(2deg)]">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-2.5 min-[600px]:pb-[18px]">
            <strong className="text-lg tracking-[-0.04em] text-[#1670c7] min-[600px]:text-xl">
              Walmart{" "}
              <span className="inline-block align-middle text-[25px] text-[#f6b41c]" aria-hidden="true">
                ✳
              </span>
            </strong>
            <span className="text-[10px] text-muted min-[600px]:text-[11px]">
              Sample sales dashboard
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2.5 min-[600px]:mt-4 min-[600px]:gap-4">
            <DashStat label="Gross sales" value={sales} note="Illustrative example" />
            <DashStat label="Orders" value={String(ORDERS[step])} note="Sample store activity" />
          </div>
          <svg
            className="mt-1.5 block h-[92px] w-full min-[600px]:mt-2.5 min-[600px]:h-[125px]"
            viewBox="0 0 400 130"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="sales-fill" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#a56bc2" stopOpacity=".25" />
                <stop offset="1" stopColor="#a56bc2" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 115H400M0 75H400M0 35H400" stroke="#eee8f2" fill="none" />
            <path d={`${GROWTH}V130H5Z`} fill="url(#sales-fill)" />
            <path pathLength={1} d={GROWTH} fill="none" stroke="#783d91" strokeWidth="3" />
            <path
              className="growth-tracer"
              pathLength={1}
              d={GROWTH}
              fill="none"
              stroke="#d4a5ec"
              strokeWidth="5"
            />
          </svg>
          <div className="flex justify-between text-[10px] text-muted">
            <span>Week 1</span>
            <span>Week 4</span>
          </div>
        </div>

        {/* Upper-body crop of Jacob, faded at the bottom edge */}
        <div className="absolute bottom-[76px] left-[5%] z-[2] aspect-[1.2] w-[90%] overflow-hidden [mask-image:linear-gradient(#000_92%,transparent_100%)] min-[600px]:bottom-[83px] min-[600px]:left-[-2%] min-[600px]:w-[72%]">
          <Image
            src="/jacob-cutout.png"
            alt="Jacob Jones, webinar host"
            width={1086}
            height={1448}
            priority
            sizes="(min-width: 600px) 450px, 90vw"
            className="block h-auto w-full drop-shadow-[0_8px_10px_#321c2914]"
          />
        </div>

        <div className="absolute inset-x-[3%] bottom-0 z-[4] rounded-[13px] border border-border bg-white/95 px-4 py-3 text-center shadow-[0_12px_30px_#4223520c] min-[600px]:inset-x-[13%] min-[600px]:bottom-px min-[600px]:py-[13px]">
          <strong className="block text-[23px] leading-snug tracking-[-0.04em] min-[600px]:text-2xl">
            Jacob Jones
          </strong>
          <span className="text-xs text-muted">7-figure seller · Founder of SourceDart</span>
        </div>
      </div>

      {/* Floating sample notifications */}
      <div className="mt-[19px] grid grid-cols-2 gap-2.5 min-[600px]:absolute min-[600px]:right-0 min-[600px]:top-[235px] min-[600px]:z-[3] min-[600px]:mt-0 min-[600px]:w-[41%] min-[600px]:grid-cols-1 min-[600px]:gap-[15px]">
        <SalePopup icon="↗" label="Total sales · demo" value={sales} note="Growing sample activity" positive />
        <SalePopup
          icon="✓"
          label="Example order"
          value={step % 3 === 0 ? "+$60.00" : "+$30.00"}
          note="Illustrative notification"
          delayed
        />
      </div>

      <p className="mt-[13px] text-center text-[11px] leading-normal text-[#756e7c] min-[600px]:mt-[15px]">
        Animated illustration — not Jacob’s sales or a promise of results.
      </p>
    </div>
  );
}

function DashStat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[10px] border border-border bg-white px-2.5 py-2 min-[600px]:px-[13px] min-[600px]:py-[11px]">
      <small className="block text-xs">{label}</small>
      <b className="block text-[22px] leading-snug tabular-nums min-[600px]:text-[25px]">{value}</b>
      <span className="text-[10px] text-[#638371]">{note}</span>
    </div>
  );
}

function SalePopup({
  icon,
  label,
  value,
  note,
  positive = false,
  delayed = false,
}: {
  icon: string;
  label: string;
  value: string;
  note: string;
  positive?: boolean;
  delayed?: boolean;
}) {
  return (
    <div
      className={`float-sales flex min-w-0 items-center gap-2 rounded-xl border border-[#e9e1ef] bg-white/[0.97] px-[11px] py-[13px] shadow-[0_8px_25px_#38204210] min-[600px]:gap-2.5 min-[600px]:rounded-[15px] min-[600px]:p-4 min-[600px]:shadow-[0_13px_38px_#38204218] ${delayed ? "[animation-delay:-2.5s]" : ""}`}
    >
      <span
        className="hidden size-[25px] shrink-0 place-items-center rounded-full bg-[#f2e7f6] text-[17px] font-extrabold text-purple min-[361px]:grid min-[600px]:size-[33px] min-[600px]:text-xl"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <small className="block text-[10px] text-muted min-[600px]:text-xs">{label}</small>
        <strong className="block text-[22px] leading-snug tracking-[-0.03em] tabular-nums min-[600px]:text-2xl">
          {value}
        </strong>
        <span
          className={`block text-[9px] min-[600px]:text-[10px] ${positive ? "text-success" : "text-[#69706e]"}`}
        >
          {note}
        </span>
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
    <div className="mx-auto flex w-[min(1180px,calc(100%-36px))] items-center justify-between gap-2.5 pb-5 text-[13px] text-muted sm:gap-4 sm:pb-6 sm:pt-2">
      <span className="flex max-w-[180px] items-center gap-[9px] text-[11px] leading-normal sm:max-w-none sm:text-[13px]">
        <i
          aria-hidden="true"
          className="size-[7px] shrink-0 rounded-full bg-[#a571b8] shadow-[0_0_0_4px_#f3eaf7]"
        />
        A closer look at the business behind the store
      </span>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setOverride(!paused)}
        className="min-h-11 whitespace-nowrap rounded-[30px] border border-border bg-white px-3 py-2 text-[11px] text-purple sm:px-4 sm:text-[13px]"
      >
        {paused ? "Resume animations" : "Pause animations"}
      </button>
    </div>
  );
}
