import Link from "next/link";
import type { PeopleEntity, PeopleKind } from "@/lib/types";
import { LANGUAGE_META } from "@/lib/languages";

interface Props {
  peoples: PeopleEntity[];
}

interface Node {
  entity: PeopleEntity;
  children: Node[];
}

const KIND_HEADINGS: { kind: PeopleKind; label: string; description: string }[] = [
  {
    kind: "linguistic",
    label: "Linguistic communities",
    description:
      "Populations defined by the variety of Tamazight they speak, named today by autonym or by the language itself.",
  },
  {
    kind: "confederation",
    label: "Confederations",
    description:
      "The supra-tribal political units of the medieval Maghreb and the modern Saharan-Sahelian sphere, as recovered through the Arabic geographers and the modern ethnographic record.",
  },
  {
    kind: "tribe",
    label: "Tribes",
    description:
      "Specific tribal federations whose internal organisation and customary law are documented at length in the ethnographic literature.",
  },
  {
    kind: "diaspora",
    label: "Diaspora",
    description:
      "Berber-speaking populations established outside the historical Tamazgha homeland through successive twentieth-century migrations.",
  },
];

function buildForest(peoples: PeopleEntity[]): Map<PeopleKind, Node[]> {
  const byId = new Map<string, PeopleEntity>();
  for (const p of peoples) byId.set(p.id, p);

  const childIds = new Set<string>();
  for (const p of peoples) {
    if (p.parent_group && byId.has(p.parent_group)) {
      childIds.add(p.id);
    }
  }

  function build(p: PeopleEntity): Node {
    const directChildren = peoples.filter(
      (c) => c.parent_group === p.id
    );
    const subGroupChildren = (p.sub_groups ?? [])
      .map((id) => byId.get(id))
      .filter((c): c is PeopleEntity => Boolean(c));

    const seen = new Set<string>();
    const all: PeopleEntity[] = [];
    for (const c of [...directChildren, ...subGroupChildren]) {
      if (seen.has(c.id)) continue;
      seen.add(c.id);
      all.push(c);
    }

    return {
      entity: p,
      children: all
        .sort((a, b) => nameOf(a).localeCompare(nameOf(b)))
        .map(build),
    };
  }

  const forest = new Map<PeopleKind, Node[]>();
  for (const { kind } of KIND_HEADINGS) forest.set(kind, []);

  const roots = peoples.filter((p) => !childIds.has(p.id));
  for (const root of roots) {
    const list = forest.get(root.kind);
    if (list) list.push(build(root));
  }

  for (const list of forest.values()) {
    list.sort((a, b) => nameOf(a.entity).localeCompare(nameOf(b.entity)));
  }

  return forest;
}

function nameOf(p: PeopleEntity): string {
  return p.name;
}

function colourOf(p: PeopleEntity): string | undefined {
  if (p.language) return LANGUAGE_META[p.language]?.color;
  return undefined;
}

function regionOf(p: PeopleEntity): string {
  return p.countries
    .map((c) => c.replace(/-/g, " "))
    .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
    .join(", ");
}

function NodeRow({ node, depth }: { node: Node; depth: number }) {
  const p = node.entity;
  const color = colourOf(p);
  const isRoot = depth === 0;

  return (
    <li className="relative">
      <div
        className={`relative ${
          depth > 0 ? "pl-8 before:absolute before:left-0 before:top-[18px] before:w-6 before:h-px before:bg-border" : ""
        }`}
      >
        <Link href={`/peoples/${p.slug}`} className="group block py-2">
          <div className="flex items-baseline gap-3 flex-wrap">
            {color ? (
              <span
                aria-hidden
                className="block w-2.5 h-2.5 rounded-full flex-shrink-0 self-center"
                style={{ background: color }}
              />
            ) : (
              <span
                aria-hidden
                className="block w-2.5 h-2.5 rounded-full flex-shrink-0 self-center bg-tertiary opacity-30"
              />
            )}
            <span
              className={`${
                isRoot
                  ? "font-display text-xl text-ink"
                  : "font-display text-lg text-ink"
              } group-hover:underline underline-offset-4`}
            >
              {p.name}
            </span>
            {p.endonym && p.endonym !== p.name ? (
              <span className="editorial-italic text-secondary">
                {p.endonym}
              </span>
            ) : null}
            {p.population_estimate ? (
              <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-tertiary">
                {p.population_estimate}
              </span>
            ) : null}
            <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-tertiary">
              {regionOf(p)}
            </span>
          </div>
        </Link>
      </div>
      {node.children.length > 0 ? (
        <ul className="ml-3 border-l border-border">
          {node.children.map((c) => (
            <NodeRow key={c.entity.id} node={c} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function PeoplesTree({ peoples }: Props) {
  const forest = buildForest(peoples);

  return (
    <div className="space-y-12">
      {KIND_HEADINGS.map(({ kind, label, description }) => {
        const roots = forest.get(kind) ?? [];
        if (roots.length === 0) return null;
        return (
          <section key={kind}>
            <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-3">
              {label} · {roots.length}
            </p>
            <p className="editorial-italic text-secondary max-w-prose mb-5">
              {description}
            </p>
            <ul className="space-y-1">
              {roots.map((node) => (
                <NodeRow key={node.entity.id} node={node} depth={0} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
