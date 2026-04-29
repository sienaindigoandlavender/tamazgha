// =============================================================================
// TAMAZGHA — entity type system
// =============================================================================
// A digital synthesis archive of the Amazigh world: language, land, lineage,
// symbol, story, struggle — across the full extent of Tamazgha, from the
// Canary Islands to Siwa, from the Atlas to the Sahel.
// =============================================================================

export type EntityType =
  | "atlas" //     places: regions, oases, mountain ranges, historic cities
  | "people" //    confederations, tribes, linguistic groups
  | "lexicon" //   dictionary entries (multi-variety)
  | "symbol" //    Tifinagh letters + tattoo/textile/pottery glyphs
  | "person" //    historical and contemporary figures
  | "timeline" //  events, periods
  | "library" //   bibliographic sources
  | "essay"; //    long-form synthesis

export type EntityID = string;

// -- shared geography --------------------------------------------------------

export type Country =
  | "morocco"
  | "algeria"
  | "tunisia"
  | "libya"
  | "egypt"
  | "mauritania"
  | "mali"
  | "niger"
  | "burkina-faso"
  | "chad"
  | "spain"
  | "diaspora";

export type LanguageVariety =
  | "tachelhit"
  | "tamazight-central"
  | "tarifit"
  | "kabyle"
  | "chaoui"
  | "mozabite"
  | "tamasheq"
  | "siwi"
  | "zenaga"
  | "nafusi"
  | "ghadames"
  | "guanche";

export type SymbolCategory =
  | "tifinagh-classical"
  | "tifinagh-neo"
  | "tattoo"
  | "textile"
  | "pottery"
  | "jewelry"
  | "rock-art";

// -- backlinks ---------------------------------------------------------------

export interface BacklinkRef {
  fromId: EntityID;
  fromType: EntityType;
  fromSlug: string;
  fromTitle: string;
  label: string;
}

export type Backlinks = Record<EntityID, BacklinkRef[]>;

// -- base entity -------------------------------------------------------------

export interface BaseEntity {
  type: EntityType;
  id: EntityID;
  slug: string;
  body: string;
  bodyMarkdown: string;
}

// -- atlas: a place in Tamazgha ---------------------------------------------

export type AtlasKind =
  | "region" //         a named cultural-geographic region (e.g. Kabylia)
  | "mountain" //       Atlas, Aurès, Hoggar
  | "oasis" //          Siwa, Ghadames, Mzab
  | "valley" //         Souss, Drâa, Mzab
  | "city" //           Tamanrasset, Tizi Ouzou, Agadez
  | "island" //         Canary group
  | "site"; //          archaeological / ceremonial

export interface AtlasEntity extends BaseEntity {
  type: "atlas";
  kind: AtlasKind;
  name: string;
  name_tamazight?: string;
  name_tifinagh?: string;
  name_ar?: string;
  alternate_names?: string[];
  countries: Country[];
  lat: number;
  lng: number;
  population_estimate?: string;
  languages?: LanguageVariety[];
  peoples?: EntityID[];
  related_persons?: EntityID[];
  sources?: EntityID[];
}

// -- people: a confederation, tribe, or linguistic group --------------------

export type PeopleKind =
  | "confederation" //   Sanhaja, Zenata, Masmuda
  | "tribe" //           Aït Atta, Ida ou Tanan, Aït Hadiddou
  | "linguistic" //      Tachelhit speakers, Tuareg
  | "diaspora"; //       Kabyle France, Rifian Netherlands

export interface PeopleEntity extends BaseEntity {
  type: "people";
  name: string;
  name_tamazight?: string;
  name_tifinagh?: string;
  name_ar?: string;
  endonym?: string;
  exonyms?: string[];
  kind: PeopleKind;
  countries: Country[];
  language?: LanguageVariety;
  population_estimate?: string;
  parent_group?: EntityID;
  sub_groups?: EntityID[];
  homeland_atlas?: EntityID[];
  notable_persons?: EntityID[];
  sources?: EntityID[];
}

// -- lexicon: a dictionary entry --------------------------------------------

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "pronoun"
  | "preposition"
  | "conjunction"
  | "interjection"
  | "expression";

export interface LexiconEntry extends BaseEntity {
  type: "lexicon";
  word_latin: string;
  word_tifinagh?: string;
  word_arabic?: string;
  pronunciation?: string;
  audio_path?: string;
  variety: LanguageVariety;
  part_of_speech?: PartOfSpeech;
  meaning_en: string;
  meaning_fr?: string;
  meaning_ar?: string;
  examples?: { source: string; translation: string }[];
  cognates?: { variety: LanguageVariety; word: string }[];
  etymology?: string;
  related_entries?: EntityID[];
  sources?: EntityID[];
}

// -- symbol: a Tifinagh letter or cultural glyph ----------------------------

export interface SymbolEntity extends BaseEntity {
  type: "symbol";
  name: string;
  glyph: string;
  category: SymbolCategory;
  transliteration?: string;
  unicode?: string;
  meaning?: string;
  regions?: EntityID[];
  appears_on?: string[];
  sources?: EntityID[];
}

// -- person -----------------------------------------------------------------

export type PersonRole =
  | "ruler" //          king, queen, sultan
  | "warrior" //        Kahina, Massinissa
  | "religious" //      Ibn Tumart
  | "scholar" //        Mouloud Mammeri, Ibn Khaldun (when claimed)
  | "writer" //         Assia Djebar, Tahar Djaout
  | "musician" //       Idir, Matoub Lounès, Cheikha Rimitti
  | "activist" //       Mouloud Mammeri, contemporary movement
  | "explorer" //       Ibn Battuta
  | "artist"
  | "political";

export interface PersonEntity extends BaseEntity {
  type: "person";
  name: string;
  name_tamazight?: string;
  name_tifinagh?: string;
  name_ar?: string;
  name_alternate?: string[];
  birth?: string;
  death?: string;
  roles: PersonRole[];
  countries: Country[];
  peoples?: EntityID[];
  associated_atlas?: EntityID[];
  related_events?: EntityID[];
  sources?: EntityID[];
}

// -- timeline ---------------------------------------------------------------

export type TimelineKind =
  | "prehistoric" //    rock art, Capsian, etc.
  | "antique" //        Numidian, Roman-era
  | "medieval" //       Islamic conquest, Berber dynasties
  | "ottoman"
  | "colonial" //       French, Spanish, Italian, British
  | "modern" //         independence onward
  | "contemporary"; //  post-2000

export interface TimelineEntity extends BaseEntity {
  type: "timeline";
  title: string;
  date_start: string;
  date_end?: string;
  kind: TimelineKind;
  countries: Country[];
  related_persons?: EntityID[];
  related_atlas?: EntityID[];
  related_peoples?: EntityID[];
  sources?: EntityID[];
}

// -- library: a bibliographic source ----------------------------------------

export type SourceKind =
  | "book"
  | "academic-paper"
  | "thesis"
  | "primary-source"
  | "documentary"
  | "archive"
  | "web";

export interface LibraryEntity extends BaseEntity {
  type: "library";
  title: string;
  authors: string[];
  year?: string;
  publisher?: string;
  kind: SourceKind;
  language?: string;
  isbn?: string;
  url?: string;
  documents_topics?: string[];
}

// -- essay ------------------------------------------------------------------

export interface EssayEntity extends BaseEntity {
  type: "essay";
  title: string;
  subtitle?: string;
  date_published: string;
  reading_time_minutes?: number;
  references?: EntityID[];
  sources?: EntityID[];
}

// -- union ------------------------------------------------------------------

export type Entity =
  | AtlasEntity
  | PeopleEntity
  | LexiconEntry
  | SymbolEntity
  | PersonEntity
  | TimelineEntity
  | LibraryEntity
  | EssayEntity;

export interface Graph {
  entities: Record<EntityID, Entity>;
  backlinks: Backlinks;
  generatedAt: string;
}
