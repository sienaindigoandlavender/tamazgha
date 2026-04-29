import type { Metadata } from "next";
import { getEntitiesByType } from "@/lib/graph";
import Prose from "@/components/shared/Prose";
import JsonLd from "@/components/shared/JsonLd";
import { lexiconJsonLd } from "@/lib/schema-org";
import type { LexiconEntry } from "@/lib/types";

export const metadata: Metadata = {
  title: "Lexicon",
  description: "A multi-variety dictionary of Amazigh languages.",
};

export default function LexiconPage() {
  const items = getEntitiesByType<LexiconEntry>("lexicon").sort((a, b) =>
    a.word_latin.localeCompare(b.word_latin)
  );

  return (
    <div className="max-w-content mx-auto px-6 py-24">
      <header className="mb-12 pb-8 border-b border-border">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-4">
          Module
        </p>
        <h1 className="editorial-h1 text-[52px] md:text-[64px] text-ink mb-4">
          Lexicon
        </h1>
        <p className="editorial-italic text-[22px] text-secondary max-w-prose">
          A multi-variety dictionary of Amazigh languages.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="font-serif italic text-lg text-secondary max-w-[600px]">
          Forthcoming. The first entries are in preparation.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((entry) => (
            <li
              key={entry.id}
              id={entry.slug}
              className="py-6 scroll-mt-[var(--header-height)]"
            >
              <JsonLd data={lexiconJsonLd(entry)} />
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <h2 className="font-serif text-2xl text-ink">
                  {entry.word_latin}
                </h2>
                {entry.word_tifinagh ? (
                  <span className="tifinagh text-xl text-tertiary">
                    {entry.word_tifinagh}
                  </span>
                ) : null}
                <span className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
                  {entry.variety}
                  {entry.part_of_speech ? ` · ${entry.part_of_speech}` : ""}
                </span>
              </div>
              <p className="text-ink mb-2">{entry.meaning_en}</p>
              <Prose html={entry.body} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
