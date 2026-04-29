import type { Metadata } from "next";
import { getEntitiesByType } from "@/lib/graph";
import Prose from "@/components/shared/Prose";
import type { TimelineEntity } from "@/lib/types";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Ten thousand years of the Amazigh world on a single canvas.",
};

export default function TimelinePage() {
  const items = getEntitiesByType<TimelineEntity>("timeline").sort((a, b) =>
    a.date_start.localeCompare(b.date_start)
  );

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
              className="py-6 scroll-mt-[var(--header-height)]"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-2">
                {event.date_start}
                {event.date_end ? ` – ${event.date_end}` : ""} · {event.kind}
              </p>
              <h2 className="font-serif text-2xl text-ink mb-2">
                {event.title}
              </h2>
              <Prose html={event.body} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
