import type { Metadata } from "next";
import Link from "next/link";
import { getEntitiesByType } from "@/lib/graph";
import type { PersonEntity } from "@/lib/types";

export const metadata: Metadata = {
  title: "Persons",
  description: "Historical and contemporary figures of the Amazigh world.",
};

export default function PersonsPage() {
  const items = getEntitiesByType<PersonEntity>("person").sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <header className="mb-12 pb-8 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-3">
          Module
        </p>
        <h1 className="font-serif text-5xl leading-[1.05] text-ink mb-3">
          Persons
        </h1>
        <p className="font-serif italic text-xl text-secondary max-w-prose">
          Historical and contemporary figures of the Amazigh world.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="font-serif italic text-lg text-secondary max-w-[600px]">
          Forthcoming. The first entries are in preparation.
        </p>
      ) : (
        <ul className="divide-y divide-border max-w-prose">
          {items.map((p) => (
            <li key={p.id}>
              <Link
                href={`/persons/${p.slug}`}
                className="block py-4 group"
              >
                <p className="font-serif text-lg text-ink group-hover:text-accent transition-colors">
                  {p.name}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mt-1">
                  {p.roles.join(", ")}
                  {p.birth || p.death
                    ? ` · ${p.birth ?? ""}–${p.death ?? ""}`
                    : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
