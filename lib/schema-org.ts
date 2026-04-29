import type {
  AtlasEntity,
  EssayEntity,
  LexiconEntry,
  PersonEntity,
} from "@/lib/types";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tamazgha.africa").replace(
  /\/$/,
  ""
);

function url(path: string) {
  return `${SITE}${path}`;
}

const TAMAZGHA_PUBLISHER = {
  "@type": "Organization",
  name: "Tamazgha",
  url: SITE,
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tamazgha",
    url: SITE,
    description:
      "A digital synthesis archive of the Amazigh world: language, land, lineage, symbol, story, and struggle from the Canary Islands to Siwa.",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tamazgha",
    url: SITE,
    inLanguage: "en",
    publisher: TAMAZGHA_PUBLISHER,
  };
}

export function atlasJsonLd(e: AtlasEntity) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: e.name,
    alternateName: e.alternate_names,
    address: {
      "@type": "PostalAddress",
      addressCountry: e.countries[0],
    },
    geo: { "@type": "GeoCoordinates", latitude: e.lat, longitude: e.lng },
    url: url(`/atlas/${e.slug}`),
    isAccessibleForFree: true,
  };
}

export function personJsonLd(e: PersonEntity) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: e.name,
    url: url(`/persons/${e.slug}`),
    birthDate: e.birth,
    deathDate: e.death,
    nationality: e.countries[0],
  };
}

export function lexiconJsonLd(e: LexiconEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: e.word_latin,
    inDefinedTermSet: url("/lexicon"),
    url: url(`/lexicon#${e.slug}`),
    termCode: e.slug,
    description: e.meaning_en,
  };
}

export function essayJsonLd(e: EssayEntity) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: e.title,
    alternativeHeadline: e.subtitle,
    datePublished: e.date_published,
    inLanguage: "en",
    url: url(`/essays/${e.slug}`),
    publisher: TAMAZGHA_PUBLISHER,
    author: TAMAZGHA_PUBLISHER,
    isAccessibleForFree: true,
    articleBody: e.bodyMarkdown,
  };
}

export function jsonLdScript(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
