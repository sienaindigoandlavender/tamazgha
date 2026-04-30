import graphData from "./graph.json";
import type {
  AtlasEntity,
  EssayEntity,
  Graph,
  LexiconEntry,
  LibraryEntity,
  PersonEntity,
  SymbolEntity,
  TimelineEntity,
} from "./types";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tamazgha.africa").replace(
  /\/$/,
  ""
);

const LICENSE_URL = "https://creativecommons.org/licenses/by-sa/4.0/";

const CREATOR = {
  "@type": "Organization",
  name: "Tamazgha",
  url: SITE,
} as const;

const PUBLISHER = {
  "@type": "Organization",
  name: "Dancing with Lions",
  url: "https://dancewithlions.com",
} as const;

const PART_OF = {
  "@type": "WebSite",
  name: "Tamazgha",
  url: SITE,
} as const;

const dateModified = (graphData as unknown as Graph).generatedAt;

function url(path: string) {
  return `${SITE}${path}`;
}

function attribution<T extends Record<string, unknown>>(extra: T): T & {
  license: string;
  isAccessibleForFree: true;
  inLanguage: "en";
  creator: typeof CREATOR;
  publisher: typeof PUBLISHER;
  isPartOf: typeof PART_OF;
  dateModified: string;
} {
  return {
    ...extra,
    license: LICENSE_URL,
    isAccessibleForFree: true as const,
    inLanguage: "en" as const,
    creator: CREATOR,
    publisher: PUBLISHER,
    isPartOf: PART_OF,
    dateModified,
  };
}

function firstSentence(markdown: string): string {
  const paragraph = markdown.split(/\n\s*\n/).find((p) => p.trim()) ?? "";
  const flat = paragraph.replace(/\s+/g, " ").trim();
  const match = flat.match(/^.+?[.!?](?=\s|$)/);
  return (match ? match[0] : flat).slice(0, 280);
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tamazgha",
    url: SITE,
    description:
      "A digital synthesis archive of the Amazigh world: language, land, lineage, symbol, story, and struggle from the Canary Islands to Siwa.",
    license: LICENSE_URL,
    parentOrganization: PUBLISHER,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tamazgha",
    url: SITE,
    inLanguage: "en",
    license: LICENSE_URL,
    publisher: PUBLISHER,
    creator: CREATOR,
  };
}

export function atlasJsonLd(e: AtlasEntity) {
  return {
    "@context": "https://schema.org",
    ...attribution({
      "@type": "Place",
      name: e.name,
      alternateName: e.alternate_names,
      description: firstSentence(e.bodyMarkdown),
      url: url(`/atlas/${e.slug}`),
      address: {
        "@type": "PostalAddress",
        addressCountry: e.countries[0],
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: e.lat,
        longitude: e.lng,
      },
    }),
  };
}

export function personJsonLd(e: PersonEntity) {
  return {
    "@context": "https://schema.org",
    ...attribution({
      "@type": "Person",
      name: e.name,
      alternateName: [
        e.name_tamazight,
        e.name_ar,
        ...(e.name_alternate ?? []),
      ].filter(Boolean),
      description: firstSentence(e.bodyMarkdown),
      url: url(`/persons/${e.slug}`),
      birthDate: e.birth,
      deathDate: e.death,
      nationality: e.countries[0],
      jobTitle: e.roles.join(", "),
    }),
  };
}

export function lexiconJsonLd(e: LexiconEntry) {
  return {
    "@context": "https://schema.org",
    ...attribution({
      "@type": "DefinedTerm",
      name: e.word_latin,
      alternateName: [e.word_tifinagh, e.word_arabic].filter(Boolean),
      description: e.meaning_en,
      url: url(`/lexicon#${e.slug}`),
      inDefinedTermSet: url("/lexicon"),
      termCode: e.slug,
    }),
  };
}

export function symbolJsonLd(e: SymbolEntity) {
  return {
    "@context": "https://schema.org",
    ...attribution({
      "@type": "DefinedTerm",
      name: e.name,
      alternateName: e.glyph,
      description: e.meaning ?? firstSentence(e.bodyMarkdown),
      url: url(`/symbols#${e.slug}`),
      inDefinedTermSet: url("/symbols"),
      termCode: e.slug,
    }),
  };
}

export function essayJsonLd(e: EssayEntity) {
  return {
    "@context": "https://schema.org",
    ...attribution({
      "@type": "Article",
      headline: e.title,
      alternativeHeadline: e.subtitle,
      description: e.subtitle ?? firstSentence(e.bodyMarkdown),
      datePublished: e.date_published,
      url: url(`/essays/${e.slug}`),
      author: CREATOR,
      articleBody: e.bodyMarkdown,
    }),
  };
}

export function timelineJsonLd(e: TimelineEntity) {
  return {
    "@context": "https://schema.org",
    ...attribution({
      "@type": "Event",
      name: e.title,
      description: firstSentence(e.bodyMarkdown),
      startDate: e.date_start,
      endDate: e.date_end,
      url: url(`/timeline#${e.slug}`),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    }),
  };
}

export function libraryJsonLd(e: LibraryEntity) {
  const type =
    e.kind === "book" || e.kind === "primary-source"
      ? "Book"
      : "ScholarlyArticle";
  return {
    "@context": "https://schema.org",
    ...attribution({
      "@type": type,
      name: e.title,
      headline: e.title,
      description: firstSentence(e.bodyMarkdown),
      datePublished: e.year,
      url: e.url ?? url(`/library#${e.slug}`),
      author: e.authors.map((name) => ({ "@type": "Person", name })),
      bookFormat: type === "Book" ? "https://schema.org/EBook" : undefined,
      publisher: e.publisher
        ? { "@type": "Organization", name: e.publisher }
        : PUBLISHER,
      isbn: e.isbn,
    }),
  };
}

export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
