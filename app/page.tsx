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
      <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
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
    <div className="max-w-content mx-auto px-6 py-16">
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />

      <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        <div className="flex flex-col justify-center max-w-prose">
          <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-6">
            A Synthesis Archive
          </p>
          <h1 className="font-serif text-[40px] md:text-[64px] leading-[1.05] text-ink mb-3">
            Tamazgha
          </h1>
          <p className="tifinagh text-base text-tertiary mb-4">ⵜⴰⵎⴰⵣⵖⴰ</p>
          <p className="font-serif italic text-[18px] text-secondary mb-6">
            The Amazigh world, from the Canary Islands to Siwa.
          </p>
          <p className="text-[16px] text-secondary leading-relaxed">
            Tamazgha gathers the language, land, lineage, symbols, persons,
            events, and texts of the Amazigh world into a single linked
            archive, attributing every claim to a published source.
          </p>
        </div>
        <div className="flex flex-col min-h-[420px] lg:min-h-[480px]">
          <div className="flex-1 min-h-[420px]">
            <HomeAtlasMap sites={sites} />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-tertiary">
            <span>The places currently in the atlas</span>
            <Link href="/atlas" className="hover:text-accent transition-colors">
              Open atlas →
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-16 border-t border-l border-border">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => (
            <li key={tile.href} className="border-b border-r border-border">
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
