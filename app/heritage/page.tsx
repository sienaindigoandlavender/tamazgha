import type { Metadata } from "next";
import Link from "next/link";
import { getEntity } from "@/lib/graph";
import type { AtlasEntity } from "@/lib/types";

export const metadata: Metadata = {
  title: "Heritage and archives",
  description:
    "Museums, manuscript libraries, rock-art sites, and antique cities — the institutional and material custodians of Amazigh memory across Tamazgha.",
  alternates: { canonical: "/heritage" },
};

interface Section {
  label: string;
  intro: string;
  ids: string[];
}

const SECTIONS: Section[] = [
  {
    label: "Museums",
    intro:
      "The dedicated institutional collections of Amazigh material culture, from Marrakesh to Las Palmas.",
    ids: [
      "atlas-berber-museum-marrakesh",
      "atlas-tiskiwin-museum",
      "atlas-bardo-algiers",
      "atlas-bardo-tunis",
      "atlas-museo-canario",
    ],
  },
  {
    label: "Living archives",
    intro:
      "The manuscript-library cities of the trans-Saharan trade economy — the Saharan-Sahel libraries that have preserved the pre-modern Berber, Arabic, and Songhay textual record across the medieval and early-modern centuries.",
    ids: ["atlas-chinguetti", "atlas-ouadane", "atlas-timbuktu"],
  },
  {
    label: "Rock art and prehistoric sites",
    intro:
      "The principal pre-Islamic, pre-Christian, pre-Phoenician sites of the Berber landscape: the rock-painting plateau of the Tassili and the legendary funerary monument of the Hoggar.",
    ids: ["atlas-tassili-najjer", "atlas-abalessa"],
  },
  {
    label: "Roman-Berber and antique cities",
    intro:
      "The principal antique-period archaeological cities of the Maghreb, where the Berber, Punic, Roman, and early-Christian strata are layered and where the principal Libyco-Berber inscriptions have been recovered.",
    ids: [
      "atlas-volubilis",
      "atlas-timgad",
      "atlas-dougga",
      "atlas-sbeitla",
      "atlas-cherchell",
      "atlas-tipaza",
      "atlas-leptis-magna",
    ],
  },
];

const KIND_LABEL: Record<string, string> = {
  region: "Region",
  mountain: "Mountain",
  oasis: "Oasis",
  valley: "Valley",
  city: "City",
  island: "Island",
  site: "Site",
};

function countryLabel(c: string): string {
  return c
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export default function HeritagePage() {
  return (
    <div className="max-w-content mx-auto px-6 py-24">
      <header className="mb-12">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-4">
          Heritage and archives
        </p>
        <h1 className="editorial-h1 text-[56px] md:text-[72px] text-ink mb-5">
          The custodians of memory.
        </h1>
        <p className="editorial-italic text-[22px] text-secondary max-w-prose">
          Museums, manuscript libraries, rock-art plateaus, and antique
          cities — the institutional and material sites where the long
          Amazigh inheritance has been gathered, sheltered, and read.
        </p>
      </header>

      <div className="space-y-16 border-t border-border pt-10">
        {SECTIONS.map((section) => {
          const entries = section.ids
            .map((id) => getEntity(id))
            .filter((e): e is AtlasEntity => Boolean(e) && e!.type === "atlas");
          if (entries.length === 0) return null;
          return (
            <section key={section.label}>
              <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-3">
                {section.label} · {entries.length}
              </p>
              <p className="editorial-italic text-secondary max-w-prose mb-8">
                {section.intro}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {entries.map((e) => (
                  <li key={e.id}>
                    <Link href={`/atlas/${e.slug}`} className="block group">
                      <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-tertiary mb-2">
                        {KIND_LABEL[e.kind] ?? e.kind}
                        {" · "}
                        {e.countries.map(countryLabel).join(", ")}
                      </p>
                      <h3 className="font-display text-2xl text-ink leading-tight group-hover:text-tertiary transition-colors">
                        {e.name}
                      </h3>
                      {e.name_tifinagh ? (
                        <p className="tifinagh text-base text-tertiary mt-1">
                          {e.name_tifinagh}
                        </p>
                      ) : null}
                      {e.alternate_names && e.alternate_names.length > 0 ? (
                        <p className="editorial-italic text-secondary text-sm mt-1">
                          {e.alternate_names.slice(0, 2).join(" · ")}
                        </p>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="mt-20 border-t border-border pt-10">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-3">
          See also
        </p>
        <p className="editorial-italic text-secondary max-w-prose mb-6">
          The trade-route geography that connected these sites across two
          thousand years of trans-Saharan commerce is mapped at{" "}
          <Link
            href="/trade-routes"
            className="text-ink hover:text-tertiary border-b border-border hover:border-tertiary transition-colors"
          >
            the trade routes visualisation
          </Link>
          ; the language varieties spoken at and around them, at{" "}
          <Link
            href="/languages"
            className="text-ink hover:text-tertiary border-b border-border hover:border-tertiary transition-colors"
          >
            the languages map
          </Link>
          ; the long-arc chronology in which they were founded and abandoned,
          at{" "}
          <Link
            href="/timeline"
            className="text-ink hover:text-tertiary border-b border-border hover:border-tertiary transition-colors"
          >
            the timeline
          </Link>{" "}
          and{" "}
          <Link
            href="/centuries"
            className="text-ink hover:text-tertiary border-b border-border hover:border-tertiary transition-colors"
          >
            the longitudinal canvas
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
