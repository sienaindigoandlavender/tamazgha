import type { Metadata } from "next";
import { getEntitiesByType } from "@/lib/graph";
import Prose from "@/components/shared/Prose";
import type { SymbolEntity } from "@/lib/types";

export const metadata: Metadata = {
  title: "Symbols",
  description:
    "Tifinagh letters and the visual grammar of Amazigh material culture.",
};

export default function SymbolsPage() {
  const items = getEntitiesByType<SymbolEntity>("symbol").sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <header className="mb-12 pb-8 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-3">
          Module
        </p>
        <h1 className="font-serif text-5xl leading-[1.05] text-ink mb-3">
          Symbols
        </h1>
        <p className="font-serif italic text-xl text-secondary max-w-prose">
          Tifinagh letters and the visual grammar of Amazigh material culture.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="font-serif italic text-lg text-secondary max-w-[600px]">
          Forthcoming. The first entries are in preparation.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((s) => (
            <li
              key={s.id}
              id={s.slug}
              className="py-6 scroll-mt-[var(--header-height)] flex gap-6"
            >
              <span className="tifinagh text-5xl text-ink">{s.glyph}</span>
              <div className="flex-1">
                <h2 className="font-serif text-2xl text-ink mb-1">{s.name}</h2>
                <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-3">
                  {s.category}
                  {s.transliteration ? ` · ${s.transliteration}` : ""}
                  {s.unicode ? ` · ${s.unicode}` : ""}
                </p>
                <Prose html={s.body} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
