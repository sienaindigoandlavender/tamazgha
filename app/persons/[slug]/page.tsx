import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getEntityBySlug, getAllSlugs } from "@/lib/graph";
import Prose from "@/components/shared/Prose";
import EntityRefList from "@/components/shared/EntityRefList";
import Backlinks from "@/components/shared/Backlinks";
import JsonLd from "@/components/shared/JsonLd";
import { personJsonLd } from "@/lib/schema-org";
import type { PersonEntity } from "@/lib/types";

export function generateStaticParams() {
  return getAllSlugs("person").map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const e = getEntityBySlug("person", params.slug) as PersonEntity | null;
  if (!e) return { title: "Not found" };
  return {
    title: e.name,
    description: e.roles.join(", "),
    alternates: { canonical: `/persons/${e.slug}` },
  };
}

export default function PersonDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const entity = getEntityBySlug("person", params.slug) as PersonEntity | null;
  if (!entity) notFound();

  const altLine = [
    entity.name_tifinagh,
    entity.name_tamazight,
    entity.name_ar,
    ...(entity.name_alternate ?? []),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <JsonLd data={personJsonLd(entity)} />

      <div className="mb-6">
        <Link
          href="/persons"
          className="font-mono text-[11px] uppercase tracking-wide text-tertiary hover:text-accent"
        >
          ← Persons
        </Link>
      </div>

      <header className="mb-12 pb-8 border-b border-border">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-3">
          Persons / {entity.roles.join(", ")}
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
        {entity.birth || entity.death ? (
          <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mt-3">
            {entity.birth ?? "?"} — {entity.death ?? "present"}
          </p>
        ) : null}
      </header>

      <article>
        <Prose html={entity.body} />
      </article>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-border pt-10">
        <EntityRefList label="Peoples" ids={entity.peoples} />
        <EntityRefList label="Active in" ids={entity.associated_atlas} />
        <EntityRefList label="Sources" ids={entity.sources} />
      </section>

      <Backlinks entityId={entity.id} />
    </div>
  );
}
