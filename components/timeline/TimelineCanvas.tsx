"use client";

import { useMemo, useState } from "react";
import type { TimelineEntity } from "@/lib/types";

interface Props {
  events: TimelineEntity[];
}

const KIND_COLORS: Record<string, string> = {
  prehistoric: "#737373",
  antique: "#b8543a",
  medieval: "#2563eb",
  ottoman: "#7c2d12",
  colonial: "#525252",
  modern: "#16a34a",
  contemporary: "#7c3aed",
};

const KIND_LABELS: Record<string, string> = {
  prehistoric: "Prehistoric",
  antique: "Antique",
  medieval: "Medieval",
  ottoman: "Ottoman",
  colonial: "Colonial",
  modern: "Modern",
  contemporary: "Contemporary",
};

function parseYear(date: string | undefined): number {
  if (!date) return 0;
  const bce = date.match(/(\d+)\s*BCE/i);
  if (bce) return -parseInt(bce[1], 10);
  const m = date.match(/(-?\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

const STOPS: [number, number][] = [
  [-500, 0.0],
  [500, 0.16],
  [1500, 0.42],
  [1800, 0.58],
  [1900, 0.72],
  [2000, 0.96],
  [2030, 1.0],
];

function yearToFraction(year: number): number {
  if (year <= STOPS[0][0]) return 0;
  if (year >= STOPS[STOPS.length - 1][0]) return 1;
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [y1, p1] = STOPS[i];
    const [y2, p2] = STOPS[i + 1];
    if (year <= y2) {
      const t = (year - y1) / (y2 - y1);
      return p1 + t * (p2 - p1);
    }
  }
  return 1;
}

const AXIS_YEARS = [-300, 0, 500, 1000, 1500, 1800, 1900, 2000];

function formatYear(year: number): string {
  if (year < 0) return `${-year} BCE`;
  if (year === 0) return "0";
  return `${year}`;
}

interface Placed {
  event: TimelineEntity;
  start: number;
  end: number;
  lane: number;
  xStart: number;
  xWidth: number;
}

function place(events: TimelineEntity[], width: number): {
  placed: Placed[];
  lanes: number;
} {
  const sorted = [...events].sort((a, b) => {
    const ay = parseYear(a.date_start);
    const by = parseYear(b.date_start);
    return ay - by;
  });

  const placed: Placed[] = [];
  const laneEnds: number[] = []; // last x (in px) per lane

  for (const e of sorted) {
    const yStart = parseYear(e.date_start);
    const yEnd = e.date_end ? parseYear(e.date_end) : yStart;
    const xStart = yearToFraction(yStart) * width;
    const xEnd = yearToFraction(yEnd) * width;
    const xWidth = Math.max(4, xEnd - xStart);
    const labelMin = xStart + 160; // reserve label width
    let lane = 0;
    while (lane < laneEnds.length && laneEnds[lane] > xStart) lane++;
    if (lane === laneEnds.length) laneEnds.push(0);
    laneEnds[lane] = Math.max(xStart + xWidth, labelMin);
    placed.push({ event: e, start: yStart, end: yEnd, lane, xStart, xWidth });
  }

  return { placed, lanes: Math.max(1, laneEnds.length) };
}

export default function TimelineCanvas({ events }: Props) {
  const width = 3000;
  const laneHeight = 56;
  const topPad = 28;
  const bottomPad = 56;

  const { placed, lanes } = useMemo(() => place(events, width), [events]);
  const height = topPad + lanes * laneHeight + bottomPad;

  const [hoverId, setHoverId] = useState<string | null>(null);

  const kinds = useMemo(() => {
    const seen = new Set<string>();
    for (const e of events) seen.add(e.kind);
    return Array.from(seen).sort();
  }, [events]);

  return (
    <div>
      <div className="overflow-x-auto border border-border bg-codebg">
        <div
          className="relative"
          style={{ width, height, minWidth: width }}
        >
          {/* axis baseline */}
          <div
            className="absolute left-0 right-0 bg-border"
            style={{ bottom: bottomPad - 1, height: 1 }}
          />

          {/* axis years */}
          {AXIS_YEARS.map((y) => {
            const x = yearToFraction(y) * width;
            return (
              <div
                key={y}
                className="absolute flex flex-col items-start"
                style={{ left: x, bottom: 12 }}
              >
                <span
                  className="block bg-border"
                  style={{ width: 1, height: 8, marginLeft: 0 }}
                />
                <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-tertiary mt-2">
                  {formatYear(y)}
                </span>
              </div>
            );
          })}

          {/* events */}
          {placed.map((p) => {
            const e = p.event;
            const color = KIND_COLORS[e.kind] ?? "#737373";
            const top = topPad + p.lane * laneHeight;
            const isPoint = p.xWidth <= 6;
            const isHover = hoverId === e.id;
            return (
              <a
                key={e.id}
                href={`/timeline#${e.slug}`}
                className="absolute group"
                style={{
                  left: p.xStart,
                  top,
                  width: Math.max(p.xWidth, 6),
                  height: 32,
                }}
                onMouseEnter={() => setHoverId(e.id)}
                onMouseLeave={() => setHoverId(null)}
              >
                {isPoint ? (
                  <span
                    className="block rounded-full"
                    style={{
                      width: 10,
                      height: 10,
                      background: color,
                      marginTop: 8,
                      transform: isHover ? "scale(1.3)" : "scale(1)",
                      transition: "transform 0.15s ease",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    }}
                  />
                ) : (
                  <span
                    className="block rounded-sm"
                    style={{
                      width: "100%",
                      height: 6,
                      background: color,
                      marginTop: 12,
                      opacity: isHover ? 1 : 0.85,
                      transition: "opacity 0.15s ease",
                    }}
                  />
                )}
                <span
                  className="absolute font-sans text-[11px] text-ink leading-tight whitespace-nowrap pl-3"
                  style={{
                    left: Math.max(p.xWidth, 8),
                    top: 4,
                    maxWidth: 220,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {e.title}
                </span>
                <span
                  className="absolute font-sans text-[10px] uppercase tracking-[0.16em] text-tertiary pl-3"
                  style={{ left: Math.max(p.xWidth, 8), top: 22 }}
                >
                  {e.date_start}
                  {e.date_end && e.date_end !== e.date_start
                    ? ` – ${e.date_end}`
                    : ""}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[11px] uppercase tracking-[0.2em] text-tertiary">
        <span>Periods</span>
        {kinds.map((k) => (
          <span key={k} className="flex items-center gap-2">
            <span
              aria-hidden
              className="block w-3 h-3 rounded-full"
              style={{ background: KIND_COLORS[k] ?? "#737373" }}
            />
            <span>{KIND_LABELS[k] ?? k}</span>
          </span>
        ))}
        <span className="ml-auto">Scroll horizontally · click an event for detail</span>
      </div>
    </div>
  );
}
