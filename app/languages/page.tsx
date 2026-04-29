import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getEntitiesByType } from "@/lib/graph";
import type { AtlasEntity, PeopleEntity, LanguageVariety } from "@/lib/types";
import { LANGUAGE_META, VARIETIES_ORDERED, type LanguageStatus } from "@/lib/languages";

const LanguageMap = dynamic(
  () => import("@/components/languages/LanguageMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full min-h-[480px] flex items-center justify-center bg-codebg border border-border">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
          Loading map…
        </p>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Languages",
  description:
    "The twelve language varieties of Tamazight, from the Atlantic to the Western Desert.",
  alternates: { canonical: "/languages" },
};

const STATUS_LABEL: Record<LanguageStatus, string> = {
  active: "Active",
  endangered: "Endangered",
  extinct: "Extinct",
};

export default function LanguagesPage() {
  const atlas = getEntitiesByType<AtlasEntity>("atlas");
  const peoples = getEntitiesByType<PeopleEntity>("people");

  const placesByVariety = new Map<LanguageVariety, AtlasEntity[]>();
  for (const v of VARIETIES_ORDERED) placesByVariety.set(v, []);
  for (const site of atlas) {
    for (const v of site.languages ?? []) {
      placesByVariety.get(v)?.push(site);
    }
  }

  const peoplesByVariety = new Map<LanguageVariety, PeopleEntity[]>();
  for (const v of VARIETIES_ORDERED) peoplesByVariety.set(v, []);
  for (const p of peoples) {
    if (p.language) {
      peoplesByVariety.get(p.language)?.push(p);
    }
  }

  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <header className="mb-10">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-3">
          Languages
        </p>
        <h1 className="font-serif text-5xl leading-[1.05] text-ink mb-4">
          Tamazight, in twelve varieties.
        </h1>
        <p className="font-serif italic text-xl text-secondary max-w-prose">
          From the Atlantic Ocean to the Western Desert, from the Mediterranean
          coast to the Sahel — a single language family, multiply named.
        </p>
      </header>

      <section className="mb-12">
        <div className="h-[60vh] min-h-[480px]">
          <LanguageMap sites={atlas} />
        </div>
        <div className="mt-3 font-mono text-[11px] uppercase tracking-wide text-tertiary">
          Markers coloured by primary spoken variety. Click for the place page.
        </div>
      </section>

      <section className="mb-12">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-3">
          Legend
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 text-sm">
          {VARIETIES_ORDERED.map((v) => {
            const m = LANGUAGE_META[v];
            return (
              <li key={v} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="block w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: m.color }}
                />
                <span className="text-ink">{m.name}</span>
                <span className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
                  {m.speakers}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="space-y-12 border-t border-border pt-10">
        {VARIETIES_ORDERED.map((v) => {
          const m = LANGUAGE_META[v];
          const places = placesByVariety.get(v) ?? [];
          const peoplesList = peoplesByVariety.get(v) ?? [];
          return (
            <article
              key={v}
              id={v}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 scroll-mt-[var(--header-height)]"
            >
              <div>
                <span
                  aria-hidden
                  className="inline-block w-3 h-3 rounded-full align-middle mr-2"
                  style={{ background: m.color }}
                />
                <span className="font-mono text-[11px] uppercase tracking-wide text-tertiary align-middle">
                  {STATUS_LABEL[m.status]}
                </span>
                <h2 className="font-serif text-3xl text-ink leading-tight mt-2">
                  {m.name}
                </h2>
                {m.tifinagh ? (
                  <p className="tifinagh text-2xl text-tertiary mt-1">
                    {m.tifinagh}
                  </p>
                ) : null}
                {m.nameLocal ? (
                  <p className="font-serif italic text-secondary mt-1">
                    {m.nameLocal}
                  </p>
                ) : null}
                <dl className="mt-4 space-y-2 text-sm">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
                      Speakers
                    </dt>
                    <dd className="text-ink">{m.speakers}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
                      Range
                    </dt>
                    <dd className="text-ink">{m.region}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <p className="text-ink leading-relaxed max-w-prose mb-4">
                  {m.description}
                </p>
                {peoplesList.length > 0 ? (
                  <div className="mb-3">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-1">
                      Spoken by
                    </p>
                    <p className="text-sm">
                      {peoplesList.map((p, i) => (
                        <span key={p.id}>
                          {i > 0 ? ", " : ""}
                          <Link
                            href={`/peoples/${p.slug}`}
                            className="text-ink hover:text-accent border-b border-border hover:border-accent transition-colors"
                          >
                            {p.name}
                          </Link>
                        </span>
                      ))}
                    </p>
                  </div>
                ) : null}
                {places.length > 0 ? (
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-1">
                      Spoken at
                    </p>
                    <p className="text-sm">
                      {places.map((s, i) => (
                        <span key={s.id}>
                          {i > 0 ? ", " : ""}
                          <Link
                            href={`/atlas/${s.slug}`}
                            className="text-ink hover:text-accent border-b border-border hover:border-accent transition-colors"
                          >
                            {s.name}
                          </Link>
                        </span>
                      ))}
                    </p>
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
