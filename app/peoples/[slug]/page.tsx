import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getEntityBySlug, getAllSlugs } from "@/lib/graph";
import Prose from "@/components/shared/Prose";
import EntityRefList from "@/components/shared/EntityRefList";
import Backlinks from "@/components/shared/Backlinks";
import type { PeopleEntity } from "@/lib/types";

export function generateStaticParams() {
  return getAllSlugs("people").map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const e = getEntityBySlug("people", params.slug) as PeopleEntity | null;
  if (!e) return { title: "Not found" };
  return {
    title: e.name,
    description: e.endonym ?? e.name,
    alternates: { canonical: `/peoples/${e.slug}` },
  };
}

export default function PeopleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const entity = getEntityBySlug("people", params.slug) as PeopleEntity | null;
  if (!entity) notFound();

  const altLine = [
    entity.name_tifinagh,
    entity.name_tamazight,
    entity.name_ar,
    entity.endonym,
    ...(entity.exonyms ?? []),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <div className="mb-6">
        <Link
          href="/peoples"
          className="font-mono text-[11px] uppercase tracking-wide text-tertiary hover:text-accent"
        >
          ← Peoples
        </Link>
      </div>

      <header className="mb-12 pb-8 border-b border-border">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-4">
          Peoples / {entity.kind}
        </p>
        <h1 className="editorial-h1 text-[56px] md:text-[72px] text-ink mb-4">
          {entity.name}
        </h1>
        {altLine ? (
          <p className="editorial-italic text-[22px] text-secondary leading-snug">
            <span className={entity.name_tifinagh ? "tifinagh" : ""}>
              {altLine}
            </span>
          </p>
        ) : null}
      </header>

      <article>
        <Prose html={entity.body} />
      </article>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 border-t border-border pt-10">
        <EntityRefList
          label="Parent group"
          ids={entity.parent_group ? [entity.parent_group] : []}
        />
        <EntityRefList label="Homeland" ids={entity.homeland_atlas} />
        <EntityRefList label="Notable persons" ids={entity.notable_persons} />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <EntityRefList label="Subgroups" ids={entity.sub_groups} />
        <EntityRefList label="Sources" ids={entity.sources} />
      </section>

      <Backlinks entityId={entity.id} />
    </div>
  );
}
