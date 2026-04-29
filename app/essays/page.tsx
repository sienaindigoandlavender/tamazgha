import type { Metadata } from "next";
import Link from "next/link";
import { getEntitiesByType } from "@/lib/graph";
import { proseDate } from "@/lib/utils";
import type { EssayEntity } from "@/lib/types";

export const metadata: Metadata = {
  title: "Essays",
  description: "Long-form synthesis from the archive's editors.",
};

export default function EssaysPage() {
  const items = getEntitiesByType<EssayEntity>("essay").sort((a, b) =>
    b.date_published.localeCompare(a.date_published)
  );

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <header className="mb-12 pb-8 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-3">
          Module
        </p>
        <h1 className="font-serif text-5xl leading-[1.05] text-ink mb-3">
          Essays
        </h1>
        <p className="font-serif italic text-xl text-secondary max-w-prose">
          Long-form synthesis from the archive's editors.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="font-serif italic text-lg text-secondary max-w-[600px]">
          Forthcoming. The first entries are in preparation.
        </p>
      ) : (
        <ul className="space-y-8 max-w-prose">
          {items.map((essay) => (
            <li key={essay.id}>
              <Link href={`/essays/${essay.slug}`} className="block group">
                <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-2">
                  {proseDate(essay.date_published)}
                </p>
                <h2 className="font-serif text-2xl text-ink group-hover:text-accent transition-colors mb-1">
                  {essay.title}
                </h2>
                {essay.subtitle ? (
                  <p className="text-secondary">{essay.subtitle}</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
