import type { Metadata } from "next";
import { getEntitiesByType } from "@/lib/graph";
import Prose from "@/components/shared/Prose";
import JsonLd from "@/components/shared/JsonLd";
import EntityRefList from "@/components/shared/EntityRefList";
import { timelineJsonLd } from "@/lib/schema-org";
import type { TimelineEntity } from "@/lib/types";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Ten thousand years of the Amazigh world on a single canvas.",
  alternates: { canonical: "/timeline" },
};

function timelineYear(s: string): number {
  if (!s) return 0;
  const bce = s.match(/(\d+)\s*BCE/i);
  if (bce) return -parseInt(bce[1], 10);
  const neg = s.match(/^-(\d+)/);
  if (neg) return -parseInt(neg[1], 10);
  const pos = s.match(/(\d+)/);
  if (pos) return parseInt(pos[1], 10);
  return 0;
}

function formatRange(start: string, end?: string): string {
  if (!end) return start;
  return `${start} – ${end}`;
}

export default function TimelinePage() {
  const items = getEntitiesByType<TimelineEntity>("timeline").sort((a, b) => {
    const ya = timelineYear(a.date_start);
    const yb = timelineYear(b.date_start);
    if (ya !== yb) return ya - yb;
    return a.date_start.localeCompare(b.date_start);
  });

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <header className="mb-12 pb-8 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-3">
          Module
        </p>
        <h1 className="font-serif text-5xl leading-[1.05] text-ink mb-3">
          Timeline
        </h1>
        <p className="font-serif italic text-xl text-secondary max-w-prose">
          Ten thousand years on a single canvas.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="font-serif italic text-lg text-secondary max-w-[600px]">
          Forthcoming. The first entries are in preparation.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((event) => (
            <li
              key={event.id}
              id={event.slug}
              className="py-10 scroll-mt-[var(--header-height)] grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6"
            >
              <JsonLd data={timelineJsonLd(event)} />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-1">
                  {event.kind}
                </p>
                <p className="font-serif text-2xl text-ink leading-tight">
                  {formatRange(event.date_start, event.date_end)}
                </p>
              </div>
              <div>
                <h2 className="font-serif text-2xl text-ink mb-3 leading-snug">
                  {event.title}
                </h2>
                <Prose html={event.body} />
                {(event.related_atlas?.length ||
                  event.related_peoples?.length ||
                  event.related_persons?.length ||
                  event.sources?.length) ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    <EntityRefList label="Places" ids={event.related_atlas} />
                    <EntityRefList label="Peoples" ids={event.related_peoples} />
                    <EntityRefList label="Persons" ids={event.related_persons} />
                    <EntityRefList label="Sources" ids={event.sources} />
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
