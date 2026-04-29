"use client";

import type { AtlasKind, Country, LanguageVariety } from "@/lib/types";

export interface AtlasFilterState {
  country: Country | "all";
  kind: AtlasKind | "all";
  language: LanguageVariety | "all";
}

interface Props {
  filters: AtlasFilterState;
  onChange: (filters: AtlasFilterState) => void;
  counts: { total: number; visible: number };
}

const countries: { value: Country | "all"; label: string }[] = [
  { value: "all", label: "All countries" },
  { value: "morocco", label: "Morocco" },
  { value: "algeria", label: "Algeria" },
  { value: "tunisia", label: "Tunisia" },
  { value: "libya", label: "Libya" },
  { value: "egypt", label: "Egypt" },
  { value: "mauritania", label: "Mauritania" },
  { value: "mali", label: "Mali" },
  { value: "niger", label: "Niger" },
  { value: "burkina-faso", label: "Burkina Faso" },
  { value: "chad", label: "Chad" },
  { value: "spain", label: "Spain (Canary Is.)" },
];

const kinds: { value: AtlasKind | "all"; label: string }[] = [
  { value: "all", label: "Any kind" },
  { value: "region", label: "Region" },
  { value: "mountain", label: "Mountain" },
  { value: "oasis", label: "Oasis" },
  { value: "valley", label: "Valley" },
  { value: "city", label: "City" },
  { value: "island", label: "Island" },
  { value: "site", label: "Site" },
];

const languages: { value: LanguageVariety | "all"; label: string }[] = [
  { value: "all", label: "Any language" },
  { value: "tachelhit", label: "Tachelhit" },
  { value: "tamazight-central", label: "Central Tamazight" },
  { value: "tarifit", label: "Tarifit" },
  { value: "kabyle", label: "Kabyle" },
  { value: "chaoui", label: "Chaoui" },
  { value: "mozabite", label: "Mozabite" },
  { value: "tamasheq", label: "Tamasheq / Tamahaq" },
  { value: "siwi", label: "Siwi" },
  { value: "zenaga", label: "Zenaga" },
  { value: "nafusi", label: "Nafusi" },
  { value: "ghadames", label: "Ghadames" },
  { value: "guanche", label: "Guanche" },
];

export default function AtlasFilters({ filters, onChange, counts }: Props) {
  const sel =
    "border border-border bg-white px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-ink hover:border-accent focus:outline-none focus:border-accent";

  return (
    <div className="sticky top-[var(--header-height)] z-20 border-b border-border bg-white">
      <div className="px-6 py-4 flex flex-wrap items-center gap-3 text-sm">
        <select
          value={filters.country}
          onChange={(e) =>
            onChange({ ...filters, country: e.target.value as Country | "all" })
          }
          className={sel}
        >
          {countries.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={filters.kind}
          onChange={(e) =>
            onChange({ ...filters, kind: e.target.value as AtlasKind | "all" })
          }
          className={sel}
        >
          {kinds.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={filters.language}
          onChange={(e) =>
            onChange({
              ...filters,
              language: e.target.value as LanguageVariety | "all",
            })
          }
          className={sel}
        >
          {languages.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <div className="flex-1" />

        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
          Showing {counts.visible} of {counts.total} places
        </p>
      </div>
    </div>
  );
}
