import Link from "next/link";
import dynamic from "next/dynamic";
import JsonLd from "@/components/shared/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema-org";
import { getEntitiesByType } from "@/lib/graph";
import graphData from "@/lib/graph.json";
import type { AtlasEntity, Graph } from "@/lib/types";

const HomeAtlasMap = dynamic(() => import("@/components/home/HomeAtlasMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full min-h-[420px] flex items-center justify-center bg-codebg border border-border">
      <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-tertiary">
        Loading map…
      </p>
    </div>
  ),
});

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
  const sites = getEntitiesByType<AtlasEntity>("atlas");

  return (
    <div className="max-w-content mx-auto px-6 py-24 md:py-32">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="mb-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
        <div className="flex flex-col justify-center max-w-prose">
          <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-8">
            A Synthesis Archive
          </p>
          <h1 className="editorial-h1 text-[56px] md:text-[88px] text-ink mb-5">
            Tamazgha
          </h1>
          <p className="tifinagh text-lg text-tertiary mb-6">ⵜⴰⵎⴰⵣⵖⴰ</p>
          <p className="editorial-italic text-[22px] text-secondary mb-8 leading-snug">
            The Amazigh world, from the Canary Islands to Siwa.
          </p>
          <p className="text-[16px] text-secondary leading-[1.85]">
            Tamazgha gathers the language, land, lineage, symbols, persons,
            events, and texts of the Amazigh world into a single linked
            archive, attributing every claim to a published source.
          </p>
        </div>
        <div className="flex flex-col min-h-[420px] lg:min-h-[520px]">
          <div className="flex-1 min-h-[420px]">
            <HomeAtlasMap sites={sites} />
          </div>
          <div className="mt-4 flex items-center justify-between font-sans text-[11px] uppercase tracking-[0.22em] text-tertiary">
            <span>The places currently in the atlas</span>
            <Link href="/atlas" className="hover:text-ink transition-colors">
              Open atlas →
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-24 border-t border-l border-border">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <li key={tile.href} className="border-b border-r border-border">
              <Link
                href={tile.href}
                className="group flex flex-col h-full px-10 py-16 min-h-[260px]"
              >
                <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary group-hover:text-ink transition-colors mb-12 self-start">
                  {tile.label}
                </p>
                <p className="editorial-italic text-[16px] text-ink leading-snug text-left">
                  {tile.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary">
          Last updated {formatLastUpdated(generatedAt)}
        </p>
      </section>
    </div>
  );
}
