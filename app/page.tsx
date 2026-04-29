import Link from "next/link";
import { counts } from "@/lib/graph";
import { proseDate } from "@/lib/utils";
import JsonLd from "@/components/shared/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema-org";
import graphData from "@/lib/graph.json";
import type { Graph, EntityType } from "@/lib/types";

interface ModuleTile {
  href: string;
  label: string;
  type: EntityType;
  unit: string;
  description: string;
}

const tiles: ModuleTile[] = [
  {
    href: "/atlas",
    label: "Atlas",
    type: "atlas",
    unit: "places",
    description: "Regions, mountains, oases, valleys, cities, and sites.",
  },
  {
    href: "/peoples",
    label: "Peoples",
    type: "people",
    unit: "groups",
    description: "Confederations, tribes, and linguistic communities.",
  },
  {
    href: "/lexicon",
    label: "Lexicon",
    type: "lexicon",
    unit: "words",
    description: "A multi-variety dictionary of Amazigh languages.",
  },
  {
    href: "/symbols",
    label: "Symbols",
    type: "symbol",
    unit: "glyphs",
    description: "Tifinagh letters and the visual grammar of material culture.",
  },
  {
    href: "/persons",
    label: "Persons",
    type: "person",
    unit: "biographies",
    description: "Historical and contemporary figures.",
  },
  {
    href: "/timeline",
    label: "Timeline",
    type: "timeline",
    unit: "events",
    description: "Ten thousand years on a single canvas.",
  },
  {
    href: "/library",
    label: "Library",
    type: "library",
    unit: "sources",
    description: "The bibliography behind the archive.",
  },
  {
    href: "/essays",
    label: "Essays",
    type: "essay",
    unit: "essays",
    description: "Long-form synthesis from the archive's editors.",
  },
];

export default function HomePage() {
  const c = counts();
  const generatedAt = (graphData as unknown as Graph).generatedAt;

  return (
    <div className="max-w-content mx-auto px-6 py-20">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="text-center max-w-[720px] mx-auto mb-20">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-6">
          A Synthesis Archive
        </p>
        <h1 className="font-serif text-[40px] md:text-[64px] leading-[1.05] text-ink mb-4">
          Tamazgha
        </h1>
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-2 tifinagh text-base">
          ⵜⴰⵎⴰⵣⵖⴰ
        </p>
        <p className="font-serif italic text-[18px] text-secondary mb-6">
          The Amazigh world, from the Canary Islands to Siwa.
        </p>
        <p className="text-[16px] text-secondary leading-relaxed">
          Tamazgha gathers the language, land, lineage, symbols, persons,
          events, and texts of the Amazigh world into a single linked archive,
          attributing every claim to a published source.
        </p>
      </section>

      <section className="mb-16 border-t border-border">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile, i) => (
            <li
              key={tile.href}
              className={[
                "border-b border-border",
                i % 4 !== 3 ? "lg:border-r" : "",
                i % 2 !== 1 ? "sm:border-r lg:border-r" : "sm:border-r-0",
                "lg:border-r",
                i % 4 === 3 ? "lg:border-r-0" : "",
              ].join(" ")}
            >
              <Link
                href={tile.href}
                className="group block px-6 py-10 h-full hover:bg-codebg transition-colors"
              >
                <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary group-hover:text-ink group-hover:underline underline-offset-4 mb-8">
                  {tile.label}
                </p>
                <p className="font-serif text-[28px] text-ink leading-none mb-1">
                  {c[tile.type]}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-6">
                  {tile.unit}
                </p>
                <p className="font-serif italic text-[14px] text-secondary leading-snug">
                  {tile.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
          Last updated {proseDate(generatedAt)}
        </p>
      </section>
    </div>
  );
}
