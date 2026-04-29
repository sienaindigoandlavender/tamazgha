import type { LanguageVariety } from "./types";

export type LanguageStatus = "active" | "endangered" | "extinct";

export interface LanguageMeta {
  variety: LanguageVariety;
  name: string;
  nameLocal?: string;
  tifinagh?: string;
  speakers: string;
  speakersNum: number;
  status: LanguageStatus;
  color: string;
  region: string;
  description: string;
}

export const LANGUAGE_META: Record<LanguageVariety, LanguageMeta> = {
  tachelhit: {
    variety: "tachelhit",
    name: "Tachelhit",
    nameLocal: "Tashelḥiyt",
    tifinagh: "ⵜⴰⵛⵍⵃⵉⵢⵜ",
    speakers: "~8 million",
    speakersNum: 8_000_000,
    status: "active",
    color: "#b8543a",
    region: "Southern Morocco",
    description:
      "The southern Berber variety of Morocco — Souss valley, Anti-Atlas, western High Atlas. Carries the longest continuous written tradition of any Berber variety, with manuscripts in Arabic script (Lhuruf) from at least the sixteenth century.",
  },
  "tamazight-central": {
    variety: "tamazight-central",
    name: "Central Tamazight",
    nameLocal: "Tamaziɣt",
    tifinagh: "ⵜⴰⵎⴰⵣⵉⵖⵜ",
    speakers: "~5 million",
    speakersNum: 5_000_000,
    status: "active",
    color: "#d97706",
    region: "Middle Atlas, central High Atlas, eastern Morocco",
    description:
      "The central variety of Moroccan Tamazight, spoken across the Middle Atlas, the central High Atlas, the Saghro, the Drâa, and the Tafilalt. The IRCAM-standardised official Tamazight of Morocco (since 2003) draws principally on this variety.",
  },
  tarifit: {
    variety: "tarifit",
    name: "Tarifit",
    nameLocal: "Tarifiyt",
    tifinagh: "ⵜⴰⵔⵉⴼⵉⵢⵜ",
    speakers: "~5 million",
    speakersNum: 5_000_000,
    status: "active",
    color: "#7c2d12",
    region: "Northern Morocco, Rif",
    description:
      "The northern Berber variety of Morocco, spoken across the Rif from the Strait of Gibraltar to the Moulouya. Several internal dialects — Beni Iznasen, Aith Waryaghar, Aith Touzin — and a substantial diaspora in the Netherlands, Belgium, and Germany.",
  },
  kabyle: {
    variety: "kabyle",
    name: "Kabyle",
    nameLocal: "Taqbaylit",
    tifinagh: "ⵜⴰⵇⴱⴰⵢⵍⵉⵜ",
    speakers: "~6 million",
    speakersNum: 6_000_000,
    status: "active",
    color: "#2563eb",
    region: "Northern Algeria, Kabylia",
    description:
      "The largest single Berber-speaking community of north Africa. Spoken across Greater Kabylia (Tizi Ouzou, Bouïra) and Lesser Kabylia (Béjaïa, Sétif), and in a substantial French-Belgian-Canadian diaspora. The most widely used and best-documented variety.",
  },
  chaoui: {
    variety: "chaoui",
    name: "Chaoui",
    nameLocal: "Tachawit",
    tifinagh: "ⵜⴰⵛⴰⵡⵉⵜ",
    speakers: "~2 million",
    speakersNum: 2_000_000,
    status: "active",
    color: "#7c3aed",
    region: "Eastern Algeria, Aurès",
    description:
      "The Berber variety of the Aurès massif and its eastern extensions in northeastern Algeria. The second-largest Berber-speaking community in Algeria after the Kabyles, closely related to Kabyle within the northern branch.",
  },
  mozabite: {
    variety: "mozabite",
    name: "Mozabite",
    nameLocal: "Tumzabt",
    tifinagh: "ⵜⵓⵎⵥⴰⴱⵜ",
    speakers: "~200,000",
    speakersNum: 200_000,
    status: "active",
    color: "#0891b2",
    region: "Northern Algerian Sahara, M'zab valley",
    description:
      "The eastern Berber variety of the M'zab valley, spoken in the five Ibadi-Muslim Mozabite cities (Ghardaïa, Beni Isguen, Melika, Bounoura, El Atteuf) and in the Mozabite merchant networks across Algerian cities.",
  },
  tamasheq: {
    variety: "tamasheq",
    name: "Tamasheq",
    nameLocal: "Tamasheq / Tamahaq",
    tifinagh: "ⵜⴰⵎⴰⵙⵀⴻⵇ",
    speakers: "~3 million",
    speakersNum: 3_000_000,
    status: "active",
    color: "#1e3a8a",
    region: "Sahara: southern Algeria, Libya, Niger, Mali, Burkina Faso",
    description:
      "The Tuareg language family across the Saharan-Sahelian arc. Northern Tamahaq (Hoggar) and southern Tamasheq / Tamajaq (Aïr, Adagh, Iwellemmedan). The only Berber language with continuous indigenous Tifinagh script use, particularly among women.",
  },
  siwi: {
    variety: "siwi",
    name: "Siwi",
    nameLocal: "Siwi",
    tifinagh: "ⵙⵉⵡⵉ",
    speakers: "~30,000",
    speakersNum: 30_000,
    status: "endangered",
    color: "#16a34a",
    region: "Egypt, Siwa oasis",
    description:
      "The only surviving Berber-speaking community in Egypt, in the Siwa oasis of the Western Desert. Classified within the eastern Berber group; under steady pressure from Egyptian Arabic dominance in school and media.",
  },
  zenaga: {
    variety: "zenaga",
    name: "Zenaga",
    nameLocal: "Tuḍḍungiyya",
    speakers: "~5,000",
    speakersNum: 5_000,
    status: "endangered",
    color: "#525252",
    region: "Southern Mauritania",
    description:
      "The most divergent of the surviving Berber varieties — the only one with a glottal stop and a voiceless lateral fricative in its phoneme inventory. The linguistic descendant of the medieval western Saharan Sanhaja, severely endangered.",
  },
  nafusi: {
    variety: "nafusi",
    name: "Nafusi",
    nameLocal: "Tanfusit",
    speakers: "~250,000",
    speakersNum: 250_000,
    status: "active",
    color: "#65a30d",
    region: "Northwestern Libya, Nafusa Mountains",
    description:
      "The Berber variety of the Nafusa highlands of northwestern Libya, classified in the Zenati branch. The principal surviving Berber-speaking population of Libya, with substantial Ibadi-Muslim communities at Yefren, Jadu, and Nalut.",
  },
  ghadames: {
    variety: "ghadames",
    name: "Ghadames",
    nameLocal: "Eɣademes",
    speakers: "<10,000",
    speakersNum: 8_000,
    status: "endangered",
    color: "#06b6d4",
    region: "Western Libya, Ghadames oasis",
    description:
      "The Berber variety of the Ghadames oasis of westernmost Libya, classified in the Zenati branch and now estimated at fewer than ten thousand speakers, increasingly bilingual in Arabic.",
  },
  guanche: {
    variety: "guanche",
    name: "Guanche",
    speakers: "extinct",
    speakersNum: 0,
    status: "extinct",
    color: "#737373",
    region: "Canary Islands",
    description:
      "The Berber language of the pre-Hispanic Canary Islands, extinct since the seventeenth century. Partially reconstructed from Libyco-Berber rock inscriptions, place names (Tenerife, Tegueste, Tamadaba), and word lists recorded by Spanish chroniclers; reconstructed forms align with continental Berber, particularly Tachelhit and Zenaga.",
  },
};

export const VARIETIES_ORDERED: LanguageVariety[] = [
  "kabyle",
  "tachelhit",
  "tamazight-central",
  "tarifit",
  "chaoui",
  "tamasheq",
  "mozabite",
  "nafusi",
  "siwi",
  "ghadames",
  "zenaga",
  "guanche",
];
