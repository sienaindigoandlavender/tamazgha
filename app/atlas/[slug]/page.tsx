import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getEntityBySlug, getAllSlugs } from "@/lib/graph";
import Prose from "@/components/shared/Prose";
import EntityRefList from "@/components/shared/EntityRefList";
import Backlinks from "@/components/shared/Backlinks";
import JsonLd from "@/components/shared/JsonLd";
import { atlasJsonLd } from "@/lib/schema-org";
import type { AtlasEntity } from "@/lib/types";

const AtlasInsetMap = dynamic(
  () => import("@/components/atlas/AtlasInsetMap"),
  { ssr: false }
);

const KIND_LABELS: Record<AtlasEntity["kind"], string> = {
  region: "Region",
  mountain: "Mountain",
  oasis: "Oasis",
  valley: "Valley",
  city: "City",
  island: "Island",
  site: "Site",
};

export function generateStaticParams() {
  return getAllSlugs("atlas").map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const e = getEntityBySlug("atlas", params.slug) as AtlasEntity | null;
  if (!e) return { title: "Not found" };
  const desc = `${KIND_LABELS[e.kind]} · ${e.countries.join(", ")}`;
  const path = `/atlas/${e.slug}`;
  return {
    title: e.name,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: `${e.name} — Tamazgha`,
      description: desc,
    },
    twitter: {
      card: "summary_large_image",
      title: e.name,
      description: desc,
    },
  };
}

export default function AtlasDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const entity = getEntityBySlug("atlas", params.slug) as AtlasEntity | null;
  if (!entity) notFound();

  const altLine = [
    entity.name_tifinagh,
    entity.name_tamazight,
    entity.name_ar,
    ...(entity.alternate_names ?? []),
  ]
    .filter(Boolean)
    .join(" · ");

  const meta: { label: string; value: React.ReactNode }[] = [
    { label: "Countries", value: entity.countries.join(", ") },
    {
      label: "Coordinates",
      value: `${entity.lat.toFixed(4)}, ${entity.lng.toFixed(4)}`,
    },
  ];
  if (entity.languages?.length) {
    meta.push({ label: "Languages", value: entity.languages.join(", ") });
  }
  if (entity.population_estimate) {
    meta.push({ label: "Population", value: entity.population_estimate });
  }

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <JsonLd data={atlasJsonLd(entity)} />

      <div className="mb-6">
        <Link
          href="/atlas"
          className="font-mono text-[11px] uppercase tracking-wide text-tertiary hover:text-accent"
        >
          ← Atlas
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 mb-12 items-start">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-3">
            Atlas / {KIND_LABELS[entity.kind]}
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] text-ink mb-3">
            {entity.name}
          </h1>
          {altLine ? (
            <p className="font-serif text-xl text-secondary leading-snug">
              <span className={entity.name_tifinagh ? "tifinagh" : ""}>
                {altLine}
              </span>
            </p>
          ) : null}
          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
                  {m.label}
                </dt>
                <dd className="text-ink mt-1">{m.value}</dd>
              </div>
            ))}
          </dl>
        </header>
        <div className="md:pt-12">
          <AtlasInsetMap lat={entity.lat} lng={entity.lng} name={entity.name} />
        </div>
      </div>

      <article className="border-t border-border pt-10">
        <Prose html={entity.body} />
      </article>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-border pt-10">
        <EntityRefList label="Peoples" ids={entity.peoples} />
        <EntityRefList label="Persons" ids={entity.related_persons} />
        <EntityRefList label="Sources" ids={entity.sources} />
      </section>

      <Backlinks entityId={entity.id} />
    </div>
  );
}
