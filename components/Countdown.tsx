"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { WEBINAR } from "@/lib/business";

const TARGET = new Date(WEBINAR.startsAt).getTime();

const UNITS = [
  ["days", "Days"],
  ["hours", "Hours"],
  ["minutes", "Minutes"],
  ["seconds", "Seconds"],
] as const;

type Parts = Record<(typeof UNITS)[number][0], number>;

function partsUntil(now: number): Parts {
  const total = Math.max(0, Math.floor((TARGET - now) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor(total / 3600) % 24,
    minutes: Math.floor(total / 60) % 60,
    seconds: total % 60,
  };
}

/** Ticks once a second. Null until mounted so server and client HTML match. */
function useCountdown(): Parts | null {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setParts(partsUntil(Date.now()));
    tick();
    if (Date.now() >= TARGET) return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return parts;
}

const pad = (n: number | undefined) => String(n ?? 0).padStart(2, "0");

/** Slim blue bar pinned above the header. */
export function CountdownBar() {
  const parts = useCountdown();
  const started = parts !== null && Object.values(parts).every((v) => v === 0);

  return (
    <div className="bg-navy-deep py-3 text-white">
      <div className="mx-auto flex w-[min(1180px,calc(100%-36px))] items-center justify-center gap-3 sm:gap-[26px]">
        <p className="max-w-[100px] text-[13px] font-bold leading-snug sm:max-w-none sm:text-base">
          {started ? "The scheduled start time has arrived" : "Our live webinar starts in"}
        </p>
        <div
          className="flex gap-[7px]"
          role="timer"
          aria-label="Time until the webinar"
          aria-live="off"
        >
          {UNITS.map(([key, label]) => (
            <div
              key={key}
              className="min-w-[38px] overflow-hidden rounded-md bg-white px-[5px] py-1 text-center text-blue shadow-[0_3px_10px_#00000030] sm:min-w-[53px] sm:px-[9px]"
            >
              <strong className="block text-lg leading-tight tabular-nums sm:text-xl">
                <span key={pad(parts?.[key])} className="tick">{pad(parts?.[key])}</span>
              </strong>
              <small className="block text-[9px] sm:text-[10px]">{label}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Large tiles inside the blue "Join Jacob live" panel. */
export function CountdownTiles() {
  const parts = useCountdown();

  return (
    <div
      className="my-[26px] flex justify-center gap-2 sm:gap-3"
      role="timer"
      aria-label="Time until the webinar"
      aria-live="off"
    >
      {UNITS.map(([key, label]) => (
        <div
          key={key}
          className="min-w-[59px] overflow-hidden rounded-xl border border-white/25 bg-white/[0.1] backdrop-blur-[2px] px-[7px] py-2.5 text-center sm:min-w-[73px] sm:p-3"
        >
          <strong className="block text-[29px] leading-tight tabular-nums sm:text-[34px]">
            <span key={pad(parts?.[key])} className="tick">{pad(parts?.[key])}</span>
          </strong>
          <small className="block text-xs sm:text-sm">{label}</small>
        </div>
      ))}
    </div>
  );
}

const noopSubscribe = () => () => {};

function formatLocalStart(): string {
  try {
    return (
      "Your time: " +
      new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZoneName: "short",
      }).format(new Date(WEBINAR.startsAt))
    );
  } catch {
    return "EST = UTC−5";
  }
}

/** "Your time: …" line plus an .ics download, under the panel's CTA. */
export function LocalTimeAndCalendar() {
  // Viewer's own timezone — only knowable in the browser, so empty on the server.
  const localTime = useSyncExternalStore(noopSubscribe, formatLocalStart, () => "");

  function downloadIcs() {
    const stamp = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const start = new Date(WEBINAR.startsAt);
    const end = new Date(start.getTime() + WEBINAR.durationMinutes * 60_000);
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Jacob Jones//Walmart Webinar//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:walmart-webinar-2026-10-30@jacobjones-webinar",
      "DTSTAMP:" + stamp(new Date()),
      "DTSTART:" + stamp(start),
      "DTEND:" + stamp(end),
      "SUMMARY:" + WEBINAR.title,
      "DESCRIPTION:75-minute live Walmart Marketplace training followed by Q&A. Register separately to receive access details.",
      "LOCATION:Online - access details provided after registration",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "Walmart-Webinar-Oct-30-2026.ics";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <>
      <p className="mt-5 min-h-6 text-[15px] text-[#dce8fb]">{localTime}</p>
      <button
        type="button"
        onClick={downloadIcs}
        className="mt-2 min-h-11 p-3 text-base text-white underline"
      >
        Add to my calendar
      </button>
    </>
  );
}
