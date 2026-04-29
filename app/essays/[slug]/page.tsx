import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getEntityBySlug, getAllSlugs } from "@/lib/graph";
import Prose from "@/components/shared/Prose";
import EntityRefList from "@/components/shared/EntityRefList";
import Backlinks from "@/components/shared/Backlinks";
import JsonLd from "@/components/shared/JsonLd";
import { essayJsonLd } from "@/lib/schema-org";
import { proseDate } from "@/lib/utils";
import type { EssayEntity } from "@/lib/types";

export function generateStaticParams() {
  return getAllSlugs("essay").map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const e = getEntityBySlug("essay", params.slug) as EssayEntity | null;
  if (!e) return { title: "Not found" };
  return {
    title: e.title,
    description: e.subtitle,
    alternates: { canonical: `/essays/${e.slug}` },
  };
}

export default function EssayDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const entity = getEntityBySlug("essay", params.slug) as EssayEntity | null;
  if (!entity) notFound();

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <JsonLd data={essayJsonLd(entity)} />

      <div className="mb-6">
        <Link
          href="/essays"
          className="font-mono text-[11px] uppercase tracking-wide text-tertiary hover:text-accent"
        >
          ← Essays
        </Link>
      </div>

      <header className="mb-12 pb-8 border-b border-border max-w-prose">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-3">
          Essay · {proseDate(entity.date_published)}
        </p>
        <h1 className="font-serif text-5xl leading-[1.05] text-ink mb-3">
          {entity.title}
        </h1>
        {entity.subtitle ? (
          <p className="font-serif text-xl text-secondary leading-snug">
            {entity.subtitle}
          </p>
        ) : null}
      </header>

      <article>
        <Prose html={entity.body} />
      </article>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 border-t border-border pt-10">
        <EntityRefList label="References" ids={entity.references} />
        <EntityRefList label="Sources" ids={entity.sources} />
      </section>

      <Backlinks entityId={entity.id} />
    </div>
  );
}
