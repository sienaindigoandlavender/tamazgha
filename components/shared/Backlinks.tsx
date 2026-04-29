import Link from "next/link";
import { getBacklinks } from "@/lib/graph";
import type { BacklinkRef, EntityType } from "@/lib/types";

interface Props {
  entityId: string;
}

const routePrefixes: Record<EntityType, string> = {
  atlas: "/atlas",
  people: "/peoples",
  lexicon: "/lexicon",
  symbol: "/symbols",
  person: "/persons",
  timeline: "/timeline",
  library: "/library",
  essay: "/essays",
};

const detailRoute: Record<EntityType, (slug: string) => string> = {
  atlas: (s) => `/atlas/${s}`,
  people: (s) => `/peoples/${s}`,
  lexicon: (s) => `/lexicon#${s}`,
  symbol: (s) => `/symbols#${s}`,
  person: (s) => `/persons/${s}`,
  timeline: (s) => `/timeline#${s}`,
  library: (s) => `/library#${s}`,
  essay: (s) => `/essays/${s}`,
};

export default function Backlinks({ entityId }: Props) {
  const backlinks = getBacklinks(entityId);
  if (!backlinks.length) return null;

  const grouped: Record<string, BacklinkRef[]> = {};
  for (const bl of backlinks) {
    if (!grouped[bl.label]) grouped[bl.label] = [];
    grouped[bl.label].push(bl);
  }

  void routePrefixes;

  return (
    <div className="border-t border-border pt-8 mt-12">
      <h2 className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-4">
        Referenced in
      </h2>
      <div className="space-y-5">
        {Object.entries(grouped).map(([label, refs]) => (
          <div key={label}>
            <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-2">
              {label}
            </p>
            <ul className="space-y-1 text-sm">
              {refs.map((ref) => (
                <li key={ref.fromId}>
                  <Link
                    href={detailRoute[ref.fromType](ref.fromSlug)}
                    className="text-ink hover:text-accent border-b border-border hover:border-accent transition-colors"
                  >
                    {ref.fromTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
