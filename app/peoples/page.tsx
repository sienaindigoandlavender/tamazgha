import type { Metadata } from "next";
import Link from "next/link";
import { getEntitiesByType } from "@/lib/graph";
import type { PeopleEntity } from "@/lib/types";

export const metadata: Metadata = {
  title: "Peoples",
  description:
    "Confederations, tribes, and linguistic groups across Tamazgha.",
};

export default function PeoplesPage() {
  const items = getEntitiesByType<PeopleEntity>("people").sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="max-w-content mx-auto px-6 py-24">
      <header className="mb-12 pb-8 border-b border-border">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-4">
          Module
        </p>
        <h1 className="editorial-h1 text-[52px] md:text-[64px] text-ink mb-4">
          Peoples
        </h1>
        <p className="editorial-italic text-[22px] text-secondary max-w-prose">
          Confederations, tribes, and linguistic groups across Tamazgha.
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
                href={`/peoples/${p.slug}`}
                className="block py-4 text-ink hover:text-accent transition-colors font-serif text-lg"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
