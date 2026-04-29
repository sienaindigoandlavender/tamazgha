import Link from "next/link";
import JsonLd from "@/components/shared/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema-org";
import graphData from "@/lib/graph.json";
import type { Graph } from "@/lib/types";

interface ModuleTile {
  href: string;
  label: string;
  description: string;
}

const tiles: ModuleTile[] = [
  {
    href: "/atlas",
    label: "Atlas",
    description: "Regions, mountains, oases, valleys, cities, and sites.",
  },
  {
    href: "/peoples",
    label: "Peoples",
    description: "Confederations, tribes, and linguistic communities.",
  },
  {
    href: "/lexicon",
    label: "Lexicon",
    description: "A multi-variety dictionary of Amazigh languages.",
  },
  {
    href: "/symbols",
    label: "Symbols",
    description: "Tifinagh letters and the visual grammar of material culture.",
  },
  {
    href: "/persons",
    label: "Persons",
    description: "Historical and contemporary figures of the Amazigh world.",
  },
  {
    href: "/timeline",
    label: "Timeline",
    description: "Ten thousand years on a single canvas.",
  },
  {
    href: "/library",
    label: "Library",
    description: "The bibliography behind the archive.",
  },
  {
    href: "/essays",
    label: "Essays",
    description: "Long-form synthesis from the editors.",
  },
];

function formatLastUpdated(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const day = d.getUTCDate();
  const month = d
    .toLocaleString("en-GB", { month: "long", timeZone: "UTC" })
    .toUpperCase();
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

export default function HomePage() {
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

      <section className="mb-16 border-t border-l border-border">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <li
              key={tile.href}
              className="border-b border-r border-border"
            >
              <Link
                href={tile.href}
                className="group flex flex-col h-full px-8 py-12 min-h-[220px]"
              >
                <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary group-hover:text-ink group-hover:underline underline-offset-4 mb-10 self-start">
                  {tile.label}
                </p>
                <p className="font-serif italic text-[14px] text-ink leading-snug text-left">
                  {tile.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
          Last updated {formatLastUpdated(generatedAt)}
        </p>
      </section>
    </div>
  );
}
