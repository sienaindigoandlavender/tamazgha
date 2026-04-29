"use client";

import { useMemo, useState } from "react";
import type { PersonEntity, TimelineEntity, PersonRole } from "@/lib/types";

interface Props {
  persons: PersonEntity[];
  events: TimelineEntity[];
}

const ROLE_COLORS: Record<PersonRole, string> = {
  ruler: "#b8543a",
  warrior: "#7c2d12",
  religious: "#7c3aed",
  scholar: "#2563eb",
  writer: "#0891b2",
  musician: "#16a34a",
  activist: "#d97706",
  explorer: "#525252",
  artist: "#65a30d",
  political: "#737373",
};

const KIND_COLORS: Record<string, string> = {
  prehistoric: "#737373",
  antique: "#b8543a",
  medieval: "#2563eb",
  ottoman: "#7c2d12",
  colonial: "#525252",
  modern: "#16a34a",
  contemporary: "#7c3aed",
};

function parseYear(date: string | undefined): number | null {
  if (!date) return null;
  const bce = date.match(/(\d+)\s*BCE/i);
  if (bce) return -parseInt(bce[1], 10);
  const m = date.match(/(-?\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

const STOPS: [number, number][] = [
  [-300, 0.0],
  [500, 0.18],
  [1500, 0.45],
  [1800, 0.6],
  [1900, 0.74],
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
const PRESENT_YEAR = new Date().getFullYear();

function formatYear(year: number): string {
  if (year < 0) return `${-year} BCE`;
  return `${year}`;
}

interface Entry {
  id: string;
  title: string;
  href: string;
  startYear: number;
  endYear: number;
  ongoing: boolean;
  color: string;
  category: string;
}

interface Placed extends Entry {
  lane: number;
  xStart: number;
  xWidth: number;
}

function place(entries: Entry[], width: number): {
  placed: Placed[];
  lanes: number;
} {
  const sorted = [...entries].sort((a, b) => a.startYear - b.startYear);
  const placed: Placed[] = [];
  const laneEnds: number[] = [];

  for (const e of sorted) {
    const xStart = yearToFraction(e.startYear) * width;
    const xEnd = yearToFraction(e.endYear) * width;
    const xWidth = Math.max(8, xEnd - xStart);
    const labelMin = xStart + xWidth + 200;
    let lane = 0;
    while (lane < laneEnds.length && laneEnds[lane] > xStart) lane++;
    if (lane === laneEnds.length) laneEnds.push(0);
    laneEnds[lane] = labelMin;
    placed.push({ ...e, lane, xStart, xWidth });
  }
  return { placed, lanes: Math.max(1, laneEnds.length) };
}

function buildPersonEntries(persons: PersonEntity[]): Entry[] {
  return persons.flatMap((p) => {
    const start = parseYear(p.birth);
    if (start === null) return [];
    const explicitEnd = parseYear(p.death);
    const ongoing = explicitEnd === null;
    const end = explicitEnd ?? PRESENT_YEAR;
    if (end - start < 5) return [];
    const role = p.roles[0] ?? "political";
    return [
      {
        id: p.id,
        title: p.name,
        href: `/persons/${p.slug}`,
        startYear: start,
        endYear: end,
        ongoing,
        color: ROLE_COLORS[role] ?? "#737373",
        category: role,
      },
    ];
  });
}

function buildEventEntries(events: TimelineEntity[]): Entry[] {
  return events.flatMap((e) => {
    const start = parseYear(e.date_start);
    if (start === null) return [];
    const end = parseYear(e.date_end ?? e.date_start);
    if (end === null) return [];
    if (end - start < 5) return [];
    return [
      {
        id: e.id,
        title: e.title,
        href: `/timeline#${e.slug}`,
        startYear: start,
        endYear: end,
        ongoing: false,
        color: KIND_COLORS[e.kind] ?? "#737373",
        category: e.kind,
      },
    ];
  });
}

export default function LongitudinalCanvas({ persons, events }: Props) {
  const width = 3200;
  const laneHeight = 30;
  const sectionGap = 64;
  const topPad = 32;
  const axisHeight = 56;

  const personEntries = useMemo(
    () => buildPersonEntries(persons),
    [persons]
  );
  const eventEntries = useMemo(() => buildEventEntries(events), [events]);

  const personLayout = useMemo(
    () => place(personEntries, width),
    [personEntries]
  );
  const eventLayout = useMemo(
    () => place(eventEntries, width),
    [eventEntries]
  );

  const personSectionHeight = personLayout.lanes * laneHeight + 24;
  const eventSectionHeight = eventLayout.lanes * laneHeight + 24;
  const totalHeight =
    topPad +
    personSectionHeight +
    sectionGap +
    eventSectionHeight +
    axisHeight;

  const eventSectionTop =
    topPad + personSectionHeight + sectionGap;
  const axisTop = eventSectionTop + eventSectionHeight + 16;

  const [hoverId, setHoverId] = useState<string | null>(null);

  function renderRow(p: Placed, sectionTop: number) {
    const top = sectionTop + 24 + p.lane * laneHeight;
    const isHover = hoverId === p.id;
    return (
      <a
        key={p.id}
        href={p.href}
        className="absolute group"
        style={{
          left: p.xStart,
          top,
          width: Math.max(p.xWidth, 8),
          height: laneHeight - 6,
        }}
        onMouseEnter={() => setHoverId(p.id)}
        onMouseLeave={() => setHoverId(null)}
      >
        <span
          className="block rounded-sm"
          style={{
            width: "100%",
            height: 5,
            background: p.color,
            marginTop: 9,
            opacity: isHover ? 1 : 0.85,
            transition: "opacity 0.15s ease",
          }}
        />
        {p.ongoing ? (
          <span
            className="absolute"
            style={{
              right: -3,
              top: 5,
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: `7px solid ${p.color}`,
            }}
          />
        ) : null}
        <span
          className="absolute font-sans text-[11px] text-ink whitespace-nowrap pl-2"
          style={{
            left: Math.max(p.xWidth, 8),
            top: 1,
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {p.title}
        </span>
        <span
          className="absolute font-sans text-[10px] uppercase tracking-[0.16em] text-tertiary pl-2"
          style={{ left: Math.max(p.xWidth, 8), top: 16 }}
        >
          {formatYear(p.startYear)}
          {p.ongoing
            ? " – present"
            : ` – ${formatYear(p.endYear)}`}
        </span>
      </a>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto border border-border bg-codebg">
        <div
          className="relative"
          style={{ width, height: totalHeight, minWidth: width }}
        >
          {/* persons section header */}
          <div
            className="absolute left-4 font-sans text-[11px] uppercase tracking-[0.22em] text-tertiary"
            style={{ top: topPad }}
          >
            Persons — {personEntries.length} lifespans
          </div>
          {/* events section header */}
          <div
            className="absolute left-4 font-sans text-[11px] uppercase tracking-[0.22em] text-tertiary"
            style={{ top: eventSectionTop }}
          >
            Events — {eventEntries.length} durations
          </div>

          {/* axis baseline */}
          <div
            className="absolute left-0 right-0 bg-border"
            style={{ top: axisTop, height: 1 }}
          />

          {/* axis labels */}
          {AXIS_YEARS.map((y) => {
            const x = yearToFraction(y) * width;
            return (
              <div
                key={y}
                className="absolute"
                style={{ left: x, top: axisTop + 1 }}
              >
                <span
                  className="block bg-border"
                  style={{ width: 1, height: 8 }}
                />
                <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-tertiary mt-2 inline-block">
                  {formatYear(y)}
                </span>
              </div>
            );
          })}

          {/* faint vertical guides at axis years across full height */}
          {AXIS_YEARS.map((y) => {
            const x = yearToFraction(y) * width;
            return (
              <div
                key={`guide-${y}`}
                className="absolute bg-border opacity-50 pointer-events-none"
                style={{
                  left: x,
                  top: topPad + 16,
                  width: 1,
                  height: axisTop - (topPad + 16),
                }}
              />
            );
          })}

          {/* persons */}
          {personLayout.placed.map((p) => renderRow(p, topPad))}
          {/* events */}
          {eventLayout.placed.map((p) => renderRow(p, eventSectionTop))}
        </div>
      </div>
    </div>
  );
}
