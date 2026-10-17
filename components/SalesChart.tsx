"use client";

import { useMemo, useRef, useState } from "react";

type Metric = "revenue" | "orders";
type Period = 7 | 30 | 90;

// Chart drawing area inside the 500×220 viewBox.
const X0 = 48;
const X1 = 480;
const Y_TOP = 22;
const Y_BASE = 172;

/** Fictional sample store — deterministic so server and client agree. */
function makeSampleSeries(days: number) {
  return Array.from({ length: days }, (_, i) => {
    const orders = Math.max(
      1,
      Math.round(4 + i * 0.34 + Math.sin(i * 1.7) * 2 + Math.cos(i * 0.43) * 1.5),
    );
    return { day: i + 1, orders, revenue: orders * 30 };
  });
}

const money = (n: number) => "$" + n.toLocaleString("en-US");

function Segmented<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex gap-px rounded-[10px] border border-border bg-[#faf7fc] p-[3px] sm:gap-[3px] sm:p-1"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
          className="min-h-11 rounded-md px-3 py-2 text-xs font-bold text-[#726779] aria-pressed:bg-white aria-pressed:text-purple aria-pressed:shadow-[0_2px_6px_#40214912] sm:min-h-10 sm:text-[13px]"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** "Sales overview" card: metric + period toggles, a scrubbable line, and a data table. */
export default function SalesChart() {
  const [metric, setMetric] = useState<Metric>("revenue");
  const [period, setPeriod] = useState<Period>(30);
  const [day, setDay] = useState(30);
  const svgRef = useRef<SVGSVGElement>(null);

  const series = useMemo(() => makeSampleSeries(period), [period]);

  const { max, points, line } = useMemo(() => {
    const values = series.map((p) => p[metric]);
    const step = metric === "revenue" ? 100 : 10;
    const max = Math.ceil(Math.max(...values) / step) * step;
    const points = values.map((v, i) => ({
      x: X0 + (i * (X1 - X0)) / (values.length - 1),
      y: Y_BASE - (v / max) * (Y_BASE - Y_TOP),
    }));
    const line = points
      .map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(" ");
    return { max, points, line };
  }, [series, metric]);

  const format = (n: number) => (metric === "revenue" ? money(n) : n.toLocaleString("en-US"));
  const noun = metric === "revenue" ? "sales" : "orders";
  const total = series.reduce((n, p) => n + p[metric], 0);
  const selected = series[day - 1];
  const dot = points[day - 1];

  function selectDay(value: number) {
    setDay(Math.max(1, Math.min(period, Math.round(value) || 1)));
  }

  function changePeriod(next: Period) {
    setPeriod(next);
    setDay(next);
  }

  function selectFromPointer(e: React.PointerEvent<SVGSVGElement> | React.MouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect?.width) return;
    const x = ((e.clientX - rect.left) / rect.width) * 500;
    selectDay(1 + ((x - X0) / (X1 - X0)) * (period - 1));
  }

  return (
    <div
      aria-label="Interactive sample store chart"
      className="mx-auto w-full min-w-0 max-w-[620px] rounded-[18px] border border-border bg-white px-[17px] py-5 shadow-[0_20px_65px_#4021490c] sm:rounded-3xl sm:p-7 lg:max-w-none"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-extrabold tracking-[0.13em] text-purple">SAMPLE STORE</span>
          <h3 className="display mt-[5px] text-[23px]">Sales overview</h3>
        </div>
        <span className="whitespace-nowrap rounded-[20px] bg-pale px-2 py-[5px] text-[9px] font-bold text-purple sm:px-2.5 sm:py-1.5 sm:text-[10px]">
          Illustrative data
        </span>
      </div>

      <div className="my-5 flex flex-wrap items-center justify-between gap-[7px] sm:my-6 sm:gap-3">
        <Segmented
          label="Chart metric"
          value={metric}
          onChange={setMetric}
          options={[
            { value: "revenue", label: "Sales" },
            { value: "orders", label: "Orders" },
          ]}
        />
        <Segmented
          label="Chart period"
          value={period}
          onChange={changePeriod}
          options={[
            { value: 7, label: "7D" },
            { value: 30, label: "30D" },
            { value: 90, label: "90D" },
          ]}
        />
      </div>

      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <span className="block text-[11px] text-muted sm:text-xs">
            Total {noun} · {period} days
          </span>
          <strong className="block text-[33px] font-extrabold leading-snug tracking-[-0.04em] tabular-nums sm:text-4xl">
            {format(total)}
          </strong>
        </div>
        <div className="border-l border-border pl-[15px] text-right">
          <span className="block text-xs text-muted">Day {day}</span>
          <b className="text-[19px] tabular-nums sm:text-xl">{format(selected[metric])}</b>
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 500 220"
        role="img"
        aria-label={`Illustrative daily ${noun} over ${period} days. Use the day slider for exact values.`}
        className="block h-auto w-full cursor-crosshair touch-pan-y overflow-visible"
        onPointerMove={(e) => e.pointerType === "mouse" && selectFromPointer(e)}
        onClick={selectFromPointer}
      >
        <defs>
          <linearGradient id="interactive-fill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#995ab0" stopOpacity=".23" />
            <stop offset="1" stopColor="#995ab0" stopOpacity=".01" />
          </linearGradient>
        </defs>
        <path
          d={`M${X0} 22H${X1}M${X0} 72H${X1}M${X0} 122H${X1}M${X0} 172H${X1}`}
          stroke="#ece5f0"
          strokeDasharray="4 5"
        />
        <g fill="#766d7c" fontSize="12">
          <text x="0" y="27">{metric === "revenue" ? `$${max}` : max}</text>
          <text x="20" y="177">0</text>
          <text x={X0} y="210">Day 1</text>
          <text x={X1} y="210" textAnchor="end">
            Day {period}
          </text>
        </g>
        <path d={`${line} L${X1} ${Y_BASE} L${X0} ${Y_BASE}Z`} fill="url(#interactive-fill)" />
        <path
          d={line}
          fill="none"
          stroke="#783d91"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d={`M${dot.x} ${Y_TOP}V${Y_BASE}`} stroke="#a56bc2" strokeDasharray="4 5" />
        <circle cx={dot.x} cy={dot.y} r="6" fill="#60296f" stroke="white" strokeWidth="3" />
      </svg>

      <div className="mt-2 flex items-center justify-between gap-2.5 text-xs">
        <label htmlFor="chart-day" className="font-extrabold text-purple">
          Explore by day
        </label>
        <span className="text-[10px] text-muted">Drag or use arrow keys</span>
      </div>
      <input
        id="chart-day"
        type="range"
        min={1}
        max={period}
        value={day}
        onChange={(e) => selectDay(Number(e.target.value))}
        aria-valuetext={`Day ${day}: ${format(selected[metric])} ${noun}`}
        className="m-0 block h-11 w-full min-w-0 cursor-pointer p-0 accent-purple"
      />

      <div className="mb-[18px] mt-2.5">
        <div className="flex justify-between gap-2.5 text-xs">
          <span>Days explored</span>
          <b>
            {day} / {period}
          </b>
        </div>
        <div className="mt-2 h-[7px] overflow-hidden rounded-[10px] bg-pale">
          <span
            className="block h-full rounded-[10px] bg-[linear-gradient(90deg,#ac71c0,#60296f)] transition-[width] duration-250"
            style={{ width: `${(day / period) * 100}%` }}
          />
        </div>
      </div>

      <p className="border-t border-border pt-[17px] text-xs leading-relaxed text-muted">
        Interactive example only. These are fictional figures, not marketplace statistics or actual
        seller results. Sales are before costs and fees.
      </p>

      <details className="mt-3">
        <summary className="min-h-11 cursor-pointer py-2.5 text-[13px] text-purple">
          View the example data
        </summary>
        <div className="max-h-60 overflow-auto">
          <table className="w-full border-collapse text-right text-[13px]">
            <caption className="py-2.5 text-left text-xs">Fictional sample store · {period} days</caption>
            <thead>
              <tr>
                {["Day", "Sales", "Orders"].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={`sticky top-0 border-b border-border bg-pale p-[9px] ${i === 0 ? "text-left" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {series.map((p) => (
                <tr key={p.day}>
                  <th scope="row" className="border-b border-border p-[9px] text-left font-normal">
                    {p.day}
                  </th>
                  <td className="border-b border-border p-[9px]">{money(p.revenue)}</td>
                  <td className="border-b border-border p-[9px]">{p.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
