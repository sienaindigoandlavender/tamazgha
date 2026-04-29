import type { Metadata } from "next";
import graphData from "@/lib/graph.json";
import type { Entity, Graph } from "@/lib/types";
import SearchClient from "@/components/search/SearchClient";
import { buildSearchIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search across every place, people, person, event, source, and entry in the Tamazgha archive.",
  alternates: { canonical: "/search" },
};

export default function SearchPage() {
  const entities = Object.values(
    (graphData as unknown as Graph).entities
  ) as Entity[];
  const index = buildSearchIndex(entities);

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <header className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-3">
          Search
        </p>
      </header>
      <SearchClient index={index} />
    </div>
  );
}
