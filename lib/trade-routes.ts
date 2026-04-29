import type { EntityID } from "./types";

export interface Waypoint {
  name: string;
  lat: number;
  lng: number;
  atlas?: EntityID;
}

export type RouteStatus = "historic" | "active";

export interface TradeRoute {
  id: string;
  name: string;
  shortName: string;
  period: string;
  status: RouteStatus;
  commodityNorth: string;
  commoditySouth: string;
  description: string;
  color: string;
  waypoints: Waypoint[];
}

export const TRADE_ROUTES: TradeRoute[] = [
  {
    id: "sijilmasa-awdaghust",
    name: "Sijilmasa to Awdaghust",
    shortName: "Sijilmasa–Awdaghust",
    period: "c. 8th – 14th century",
    status: "historic",
    commodityNorth: "gold from the Bambuk and Bure goldfields",
    commoditySouth: "salt, dates, manufactured goods, manuscripts",
    description:
      "The principal western gold route of the medieval Maghreb, linking Sijilmasa in the Tafilalt to the Sanhaja-controlled trading post of Awdaghust on the western Saharan steppe and onward to the Niger bend. The Almoravid empire was founded along this corridor in the eleventh century.",
    color: "#b8543a",
    waypoints: [
      { name: "Marrakesh", lat: 31.63, lng: -7.99, atlas: "atlas-marrakesh" },
      { name: "Sijilmasa (Tafilalt)", lat: 31.279, lng: -4.276, atlas: "atlas-tafilalt" },
      { name: "Touat oases", lat: 27.873, lng: -0.29 },
      { name: "Awdaghust", lat: 17.583, lng: -10.367 },
      { name: "Walata", lat: 17.272, lng: -7.031 },
      { name: "Timbuktu", lat: 16.773, lng: -3.009 },
    ],
  },
  {
    id: "tichitt-walata",
    name: "Mauritanian Adrar to the Niger bend",
    shortName: "Adrar–Walata–Timbuktu",
    period: "c. 11th – 18th century",
    status: "historic",
    commodityNorth: "gold and slaves",
    commoditySouth: "salt from Idjil and Taoudenni; dates",
    description:
      "The ksour of the Mauritanian Adrar — Chinguetti, Ouadane, Tichitt — were the principal Berber-Saharan staging posts of this route, linking the Atlantic Sahara to the Sahel through Walata and on to Timbuktu. The route remained active later than the Sijilmasa axis as the western trade re-routed through the Mauritanian plateau.",
    color: "#7c2d12",
    waypoints: [
      { name: "Mauritanian Adrar", lat: 20.5, lng: -12.5, atlas: "atlas-mauritanian-adrar" },
      { name: "Ouadane", lat: 20.93, lng: -11.62, atlas: "atlas-ouadane" },
      { name: "Chinguetti", lat: 20.46, lng: -12.36, atlas: "atlas-chinguetti" },
      { name: "Tichitt", lat: 18.46, lng: -9.5, atlas: "atlas-tichitt" },
      { name: "Walata", lat: 17.272, lng: -7.031 },
      { name: "Timbuktu", lat: 16.773, lng: -3.009 },
    ],
  },
  {
    id: "tlemcen-touat-gao",
    name: "Tlemcen to Gao",
    shortName: "Tlemcen–Touat–Gao",
    period: "c. 13th – 16th century",
    status: "historic",
    commodityNorth: "gold and slaves",
    commoditySouth: "salt, manufactured goods, manuscripts",
    description:
      "The principal Marinid- and Zayyanid-period western central route, used heavily during the late medieval period when Sijilmasa's importance was declining. The 1591 Saadian expedition that took Songhay at Tondibi followed substantially this corridor.",
    color: "#7c3aed",
    waypoints: [
      { name: "Tlemcen", lat: 34.88, lng: -1.32, atlas: "atlas-tlemcen" },
      { name: "Sijilmasa (Tafilalt)", lat: 31.279, lng: -4.276, atlas: "atlas-tafilalt" },
      { name: "Touat oases", lat: 27.873, lng: -0.29 },
      { name: "Adrar des Iforas", lat: 19.5, lng: 1.5, atlas: "atlas-adrar-des-iforas" },
      { name: "Gao", lat: 16.272, lng: -0.044 },
    ],
  },
  {
    id: "algiers-hoggar-kano",
    name: "Algiers to Kano",
    shortName: "Algiers–Hoggar–Kano",
    period: "c. 16th – early 20th century",
    status: "historic",
    commodityNorth: "gold and slaves north; later, ivory and ostrich feathers",
    commoditySouth: "manufactured goods, salt, dates",
    description:
      "The principal central trans-Saharan route under Ottoman regency administration. Run by Mozabite, Tuareg Kel Ahaggar, and Hausa merchant networks, the route linked Algiers to the Hausa city-states via Ghardaïa, the Hoggar, and Agadez. It declined in the late nineteenth century with French colonial pacification.",
    color: "#2563eb",
    waypoints: [
      { name: "Algiers", lat: 36.7538, lng: 3.0588, atlas: "atlas-algiers" },
      { name: "M'zab (Ghardaïa)", lat: 32.49, lng: 3.673, atlas: "atlas-mzab" },
      { name: "Tamanrasset (Hoggar)", lat: 22.785, lng: 5.522, atlas: "atlas-tamanrasset" },
      { name: "Agadez", lat: 16.97, lng: 7.99, atlas: "atlas-agadez" },
      { name: "Kano", lat: 12.0, lng: 8.517 },
    ],
  },
  {
    id: "tripoli-ghadames-bilma",
    name: "Tripoli to Lake Chad",
    shortName: "Tripoli–Ghadames–Bilma",
    period: "c. 8th – early 20th century",
    status: "historic",
    commodityNorth: "slaves, gold, ivory, ostrich feathers",
    commoditySouth: "manufactured goods, salt, manuscripts",
    description:
      "The principal eastern trans-Saharan route, controlled successively by Ghadamsi, Tuareg Kel Ajjer, and Tubu lineages. Linked Tripolitania to the Hausa city-states and the Lake Chad polities (Kanem-Bornu) via Ghadames, Ghat, and Bilma. The Murzuk-Ghadames axis was an Ottoman regency tax-base from the seventeenth century.",
    color: "#16a34a",
    waypoints: [
      { name: "Tripoli", lat: 32.887, lng: 13.191 },
      { name: "Ghadames", lat: 30.13, lng: 9.5, atlas: "atlas-ghadames" },
      { name: "Ghat", lat: 24.964, lng: 10.18 },
      { name: "Bilma", lat: 18.687, lng: 12.917 },
      { name: "Lake Chad / Kano", lat: 12.0, lng: 8.517 },
    ],
  },
  {
    id: "bilma-azalai",
    name: "Bilma Azalaï",
    shortName: "Bilma–Agadez (active)",
    period: "11th century – present",
    status: "active",
    commodityNorth: "salt and dates from Bilma to Agadez",
    commoditySouth: "millet and manufactured goods from Agadez to Bilma",
    description:
      "The annual autumn salt caravan from the Bilma salt-flats to Agadez, run by Kel Aïr Tuareg lineages on a scale of several thousand camels. Among the longest continuously practised commercial movements in Africa, still operating in reduced form. The principal interface between the Saharan-pastoral and Sahelian-agricultural economies.",
    color: "#0891b2",
    waypoints: [
      { name: "Bilma", lat: 18.687, lng: 12.917 },
      { name: "Fachi", lat: 18.107, lng: 11.585 },
      { name: "Agadez", lat: 16.97, lng: 7.99, atlas: "atlas-agadez" },
    ],
  },
];
