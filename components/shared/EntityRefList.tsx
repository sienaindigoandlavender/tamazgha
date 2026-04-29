import Link from "next/link";
import { getEntity, entityHref, entityTitle } from "@/lib/graph";
import type { EntityID } from "@/lib/types";

interface Props {
  label: string;
  ids?: EntityID[];
}

export default function EntityRefList({ label, ids }: Props) {
  if (!ids || ids.length === 0) return null;
  const resolved = ids.map((id) => getEntity(id)).filter(Boolean);
  if (resolved.length === 0) return null;

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-2">
        {label}
      </p>
      <ul className="space-y-1 text-sm">
        {resolved.map((entity) => {
          if (!entity) return null;
          return (
            <li key={entity.id}>
              <Link
                href={entityHref(entity)}
                className="text-ink hover:text-accent border-b border-border hover:border-accent transition-colors"
              >
                {entityTitle(entity)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
