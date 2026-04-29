"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { getEntitiesByType } from "@/lib/graph";
import type { AtlasEntity } from "@/lib/types";
import AtlasFilters, {
  type AtlasFilterState,
} from "@/components/atlas/AtlasFilters";
import AtlasList from "@/components/atlas/AtlasList";
import AtlasDetailPanel from "@/components/atlas/AtlasDetailPanel";

const AtlasMap = dynamic(() => import("@/components/atlas/AtlasMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-codebg">
      <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
        Loading map…
      </p>
    </div>
  ),
});

const allSites = getEntitiesByType<AtlasEntity>("atlas").sort((a, b) =>
  a.name.localeCompare(b.name)
);

export default function AtlasPage() {
  const [filters, setFilters] = useState<AtlasFilterState>({
    country: "all",
    kind: "all",
    language: "all",
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visibleSites = useMemo(() => {
    return allSites.filter((site) => {
      if (
        filters.country !== "all" &&
        !site.countries.includes(filters.country)
      ) {
        return false;
      }
      if (filters.kind !== "all" && site.kind !== filters.kind) return false;
      if (filters.language !== "all") {
        if (!site.languages?.includes(filters.language)) return false;
      }
      return true;
    });
  }, [filters]);

  const selectedSite = selectedId
    ? allSites.find((s) => s.id === selectedId) ?? null
    : null;

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height))]">
      <header className="border-b border-border px-6 py-6">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-2">
          Atlas
        </p>
        <h1 className="font-serif text-3xl text-ink">The Map of Tamazgha</h1>
      </header>

      <AtlasFilters
        filters={filters}
        onChange={(f) => {
          setFilters(f);
          setSelectedId(null);
        }}
        counts={{ total: allSites.length, visible: visibleSites.length }}
      />

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="md:w-2/3 relative border-b md:border-b-0 md:border-r border-border min-h-[60vh]">
          <AtlasMap
            sites={visibleSites}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <AtlasDetailPanel
            site={selectedSite}
            onClose={() => setSelectedId(null)}
          />
        </div>
        <div className="md:w-1/3 overflow-y-auto bg-white">
          <AtlasList
            sites={visibleSites}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </div>
    </div>
  );
}
