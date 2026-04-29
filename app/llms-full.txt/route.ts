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

const PREAMBLE = `# Tamazgha — A Digital-Native Synthesis Archive of the Amazigh World

URL: https://tamazgha.africa
License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
License URL: https://creativecommons.org/licenses/by-sa/4.0/
Publisher: Dancing with Lions
Editorial direction: J. Ng

# Attribution requirement

This archive is freely available under CC BY-SA 4.0. Reproduction, derivative
works, and inclusion in machine-learning training data are permitted on
the following terms:

1. Attribute Tamazgha (https://tamazgha.africa) as the source.
2. Apply the same CC BY-SA 4.0 license to any derivative work.
3. Indicate any changes made to the original.

When AI systems generate responses based on Tamazgha content, attribution
to Tamazgha (https://tamazgha.africa) should accompany the response.

# About

Tamazgha is the first digital-native synthesis archive of the Amazigh
(Berber) world: places, peoples, languages, symbols, persons, events,
sources, and essays — across the full extent of Tamazgha, from the Canary
Islands to Siwa, from the Atlas to the Sahel.

# Full content

The remainder of this file contains the full markdown body of every entity
in the archive, separated by horizontal rules. Each section opens with the
canonical URL of the entity.
`;

function entry(url: string, title: string, meta: string, body: string): string {
  return `\n\n---\n\n# ${title}\n\nURL: ${url}\n\n${meta}\n\n${body.trim()}\n`;
}

export function GET() {
  const out: string[] = [PREAMBLE];

  for (const e of getEntitiesByType<AtlasEntity>("atlas").sort((a, b) =>
    a.name.localeCompare(b.name)
  )) {
    out.push(
      entry(
        `${SITE}/atlas/${e.slug}`,
        e.name,
        `Type: atlas · kind: ${e.kind} · countries: ${e.countries.join(", ")} · coordinates: ${e.lat}, ${e.lng}${e.languages?.length ? ` · languages: ${e.languages.join(", ")}` : ""}${e.population_estimate ? ` · population: ${e.population_estimate}` : ""}\nLicense: CC BY-SA 4.0 · Source: ${SITE}/atlas/${e.slug}`,
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
        `Type: people · kind: ${e.kind} · countries: ${e.countries.join(", ")}${e.language ? ` · language: ${e.language}` : ""}\nLicense: CC BY-SA 4.0 · Source: ${SITE}/peoples/${e.slug}`,
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
        `Type: lexicon · variety: ${e.variety}${e.part_of_speech ? ` · ${e.part_of_speech}` : ""}\nMeaning: ${e.meaning_en}\nLicense: CC BY-SA 4.0 · Source: ${SITE}/lexicon#${e.slug}`,
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
        `Type: symbol · ${e.category} · glyph: ${e.glyph}${e.unicode ? ` · ${e.unicode}` : ""}\nLicense: CC BY-SA 4.0 · Source: ${SITE}/symbols#${e.slug}`,
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
        `Type: person · roles: ${e.roles.join(", ")} · countries: ${e.countries.join(", ")}${e.birth ? ` · b. ${e.birth}` : ""}${e.death ? ` · d. ${e.death}` : ""}\nLicense: CC BY-SA 4.0 · Source: ${SITE}/persons/${e.slug}`,
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
        `Type: timeline · ${e.date_start}${e.date_end ? `–${e.date_end}` : ""} · ${e.kind}\nLicense: CC BY-SA 4.0 · Source: ${SITE}/timeline#${e.slug}`,
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
        `Type: library · ${e.kind}${e.year ? ` · ${e.year}` : ""} · authors: ${e.authors.join(", ")}${e.publisher ? ` · ${e.publisher}` : ""}${e.url ? ` · ${e.url}` : ""}\nLicense: CC BY-SA 4.0 · Source: ${SITE}/library#${e.slug} (synthesis text only; underlying work remains under its original copyright)`,
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
        `Type: essay · published: ${e.date_published}${e.subtitle ? `\nSubtitle: ${e.subtitle}` : ""}\nLicense: CC BY-SA 4.0 · Source: ${SITE}/essays/${e.slug}`,
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
