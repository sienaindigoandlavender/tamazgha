"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { EntityType } from "@/lib/types";
import type { SearchIndexEntry } from "@/lib/search-index";

interface Props {
  index: SearchIndexEntry[];
}

const typeLabels: Record<EntityType, string> = {
  atlas: "Atlas",
  people: "Peoples",
  lexicon: "Lexicon",
  symbol: "Symbols",
  person: "Persons",
  timeline: "Timeline",
  library: "Library",
  essay: "Essays",
};

export default function SearchClient({ index }: Props) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [] as SearchIndexEntry[];
    return index.filter((e) => e.haystack.includes(needle)).slice(0, 80);
  }, [q, index]);

  const grouped = useMemo(() => {
    const out: Partial<Record<EntityType, SearchIndexEntry[]>> = {};
    for (const r of results) {
      (out[r.type] ??= []).push(r);
    }
    return out;
  }, [results]);

  return (
    <div>
      <div className="mb-12">
        <input
          ref={inputRef}
          type="search"
          placeholder="Search the archive…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search"
          className="w-full bg-transparent border-0 border-b border-border focus:border-accent focus:outline-none font-serif text-3xl text-ink placeholder:text-tertiary py-4 pr-1"
        />
      </div>

      {q.trim().length === 0 ? (
        <p className="font-serif italic text-secondary max-w-prose">
          Search across every place, people, person, event, source, and entry
          in the archive. The match is on titles and primary names.
        </p>
      ) : results.length === 0 ? (
        <p className="font-serif italic text-secondary max-w-prose">
          No matches for &ldquo;{q}&rdquo;.
        </p>
      ) : (
        <div className="space-y-10">
          {(Object.keys(grouped) as EntityType[]).map((t) => (
            <section key={t}>
              <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-3">
                {typeLabels[t]} · {grouped[t]!.length}
              </p>
              <ul className="divide-y divide-border">
                {grouped[t]!.map((r) => (
                  <li key={r.id}>
                    <Link href={r.href} className="block py-3 group">
                      <p className="font-serif text-lg text-ink group-hover:text-accent transition-colors">
                        {r.title}
                      </p>
                      <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mt-0.5">
                        {r.href}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
