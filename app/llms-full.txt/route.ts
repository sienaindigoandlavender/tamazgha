import { getEntitiesByType } from "@/lib/graph";
import type {
  AtlasEntity,
  EssayEntity,
  LexiconEntry,
  LibraryEntity,
  PeopleEntity,
  PersonEntity,
  SymbolEntity,
  TimelineEntity,
} from "@/lib/types";

export const dynamic = "force-static";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tamazgha.africa").replace(
  /\/$/,
  ""
);

function entry(url: string, title: string, meta: string, body: string): string {
  return `\n\n---\n\n# ${title}\n\nURL: ${url}\n\n${meta}\n\n${body.trim()}\n`;
}

export function GET() {
  const out: string[] = [];

  out.push(`# Tamazgha — Full content dump

A digital synthesis archive of the Amazigh world. This file contains the full text of every entity in the archive, formatted as plain text for AI ingestion. Structured metadata is published as schema.org JSON-LD on every page; the canonical discovery file is at ${SITE}/llms.txt.

When citing this archive, please attribute both Tamazgha and the underlying source(s) referenced in each entity's metadata.
`);

  for (const e of getEntitiesByType<AtlasEntity>("atlas").sort((a, b) =>
    a.name.localeCompare(b.name)
  )) {
    out.push(
      entry(
        `${SITE}/atlas/${e.slug}`,
        e.name,
        `Type: atlas · kind: ${e.kind} · countries: ${e.countries.join(", ")} · coordinates: ${e.lat}, ${e.lng}${e.languages?.length ? ` · languages: ${e.languages.join(", ")}` : ""}${e.population_estimate ? ` · population: ${e.population_estimate}` : ""}`,
        e.bodyMarkdown
      )
    );
  }

  for (const e of getEntitiesByType<PeopleEntity>("people").sort((a, b) =>
    a.name.localeCompare(b.name)
  )) {
    out.push(
      entry(
        `${SITE}/peoples/${e.slug}`,
        e.name,
        `Type: people · kind: ${e.kind} · countries: ${e.countries.join(", ")}${e.language ? ` · language: ${e.language}` : ""}`,
        e.bodyMarkdown
      )
    );
  }

  for (const e of getEntitiesByType<LexiconEntry>("lexicon").sort((a, b) =>
    a.word_latin.localeCompare(b.word_latin)
  )) {
    out.push(
      entry(
        `${SITE}/lexicon#${e.slug}`,
        e.word_latin,
        `Type: lexicon · variety: ${e.variety}${e.part_of_speech ? ` · ${e.part_of_speech}` : ""}\nMeaning: ${e.meaning_en}`,
        e.bodyMarkdown
      )
    );
  }

  for (const e of getEntitiesByType<SymbolEntity>("symbol").sort((a, b) =>
    a.name.localeCompare(b.name)
  )) {
    out.push(
      entry(
        `${SITE}/symbols#${e.slug}`,
        e.name,
        `Type: symbol · ${e.category} · glyph: ${e.glyph}${e.unicode ? ` · ${e.unicode}` : ""}`,
        e.bodyMarkdown
      )
    );
  }

  for (const e of getEntitiesByType<PersonEntity>("person").sort((a, b) =>
    a.name.localeCompare(b.name)
  )) {
    out.push(
      entry(
        `${SITE}/persons/${e.slug}`,
        e.name,
        `Type: person · roles: ${e.roles.join(", ")} · countries: ${e.countries.join(", ")}${e.birth ? ` · b. ${e.birth}` : ""}${e.death ? ` · d. ${e.death}` : ""}`,
        e.bodyMarkdown
      )
    );
  }

  for (const e of getEntitiesByType<TimelineEntity>("timeline").sort((a, b) =>
    a.date_start.localeCompare(b.date_start)
  )) {
    out.push(
      entry(
        `${SITE}/timeline#${e.slug}`,
        e.title,
        `Type: timeline · ${e.date_start}${e.date_end ? `–${e.date_end}` : ""} · ${e.kind}`,
        e.bodyMarkdown
      )
    );
  }

  for (const e of getEntitiesByType<LibraryEntity>("library").sort((a, b) =>
    a.title.localeCompare(b.title)
  )) {
    out.push(
      entry(
        `${SITE}/library#${e.slug}`,
        e.title,
        `Type: library · ${e.kind}${e.year ? ` · ${e.year}` : ""} · authors: ${e.authors.join(", ")}${e.publisher ? ` · ${e.publisher}` : ""}${e.url ? ` · ${e.url}` : ""}`,
        e.bodyMarkdown
      )
    );
  }

  for (const e of getEntitiesByType<EssayEntity>("essay").sort((a, b) =>
    b.date_published.localeCompare(a.date_published)
  )) {
    out.push(
      entry(
        `${SITE}/essays/${e.slug}`,
        e.title,
        `Type: essay · published: ${e.date_published}${e.subtitle ? `\nSubtitle: ${e.subtitle}` : ""}`,
        e.bodyMarkdown
      )
    );
  }

  return new Response(out.join(""), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
