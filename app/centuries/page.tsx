import type { Metadata } from "next";
import { getEntitiesByType } from "@/lib/graph";
import type { PersonEntity, TimelineEntity } from "@/lib/types";
import LongitudinalCanvas from "@/components/longitudinal/LongitudinalCanvas";

export const metadata: Metadata = {
  title: "Across the centuries",
  description:
    "Persons and events of Tamazgha plotted as overlapping lifespans and durations across a single time axis.",
  alternates: { canonical: "/centuries" },
};

export default function CenturiesPage() {
  const persons = getEntitiesByType<PersonEntity>("person");
  const events = getEntitiesByType<TimelineEntity>("timeline");

  return (
    <div className="max-w-content mx-auto px-6 py-24">
      <header className="mb-10">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-4">
          Longitudinal view
        </p>
        <h1 className="editorial-h1 text-[56px] md:text-[72px] text-ink mb-5">
          Across the centuries.
        </h1>
        <p className="editorial-italic text-[22px] text-secondary max-w-prose">
          The persons and events of the archive plotted as overlapping
          lifespans and durations on a shared piecewise-linear time axis.
          Read horizontally to follow a single life or event; read
          vertically to see who was alive together, what they walked
          through.
        </p>
      </header>

      <section className="mb-12">
        <LongitudinalCanvas persons={persons} events={events} />
        <div className="mt-3 font-sans text-[11px] uppercase tracking-[0.2em] text-tertiary">
          Persons coloured by primary role; events coloured by period.
          Triangles at the right end mark living persons. Click any bar
          to open the corresponding entry.
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-prose">
        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-3">
            Person roles
          </p>
          <ul className="text-sm space-y-2">
            {[
              ["ruler", "#b8543a"],
              ["warrior", "#7c2d12"],
              ["religious", "#7c3aed"],
              ["scholar", "#2563eb"],
              ["writer", "#0891b2"],
              ["musician", "#16a34a"],
              ["activist", "#d97706"],
              ["explorer", "#525252"],
              ["artist", "#65a30d"],
              ["political", "#737373"],
            ].map(([label, color]) => (
              <li key={label} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="block w-4 h-1"
                  style={{ background: color }}
                />
                <span className="text-ink capitalize">{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-3">
            Event periods
          </p>
          <ul className="text-sm space-y-2">
            {[
              ["antique", "#b8543a"],
              ["medieval", "#2563eb"],
              ["ottoman", "#7c2d12"],
              ["colonial", "#525252"],
              ["modern", "#16a34a"],
              ["contemporary", "#7c3aed"],
            ].map(([label, color]) => (
              <li key={label} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="block w-4 h-1"
                  style={{ background: color }}
                />
                <span className="text-ink capitalize">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
