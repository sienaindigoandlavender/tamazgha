"use client";

import Link from "next/link";
import type { AtlasEntity, AtlasKind } from "@/lib/types";

const kindColors: Record<AtlasKind, string> = {
  region: "#0a0a0a",
  mountain: "#737373",
  oasis: "#16a34a",
  valley: "#2563eb",
  city: "#b8543a",
  island: "#0891b2",
  site: "#7c3aed",
};

const kindLabels: Record<AtlasKind, string> = {
  region: "Region",
  mountain: "Mountain",
  oasis: "Oasis",
  valley: "Valley",
  city: "City",
  island: "Island",
  site: "Site",
};

interface Props {
  sites: AtlasEntity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export default function AtlasList({ sites, selectedId, onSelect }: Props) {
  if (sites.length === 0) {
    return (
      <div className="p-6 font-mono text-[11px] uppercase tracking-wide text-tertiary">
        No places match the current filters.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-border">
      {sites.map((site) => {
        const isSelected = site.id === selectedId;
        return (
          <li
            key={site.id}
            className={`group cursor-pointer transition-colors ${
              isSelected ? "bg-codebg" : "hover:bg-codebg"
            }`}
            onMouseEnter={() => onSelect(site.id)}
            onClick={() => onSelect(site.id)}
          >
            <div className="px-6 py-4">
              <div className="flex items-start gap-3">
                <span
                  className="block w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ background: kindColors[site.kind] }}
                />
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/atlas/${site.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="font-serif text-lg text-ink group-hover:text-accent transition-colors block leading-snug"
                  >
                    {site.name}
                  </Link>
                  <p className="font-mono text-[11px] text-tertiary uppercase tracking-wide mt-1">
                    {site.countries.join(", ")} · {kindLabels[site.kind]}
                  </p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
