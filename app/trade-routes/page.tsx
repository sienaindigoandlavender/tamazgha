import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { TRADE_ROUTES } from "@/lib/trade-routes";
import { getEntity } from "@/lib/graph";

const TradeRoutesMap = dynamic(
  () => import("@/components/atlas/TradeRoutesMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full min-h-[520px] flex items-center justify-center bg-codebg border border-border">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-tertiary">
          Loading map…
        </p>
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Trade routes",
  description:
    "The principal trans-Saharan caravan routes that organised the western Old World economy from the eighth century to the early twentieth.",
  alternates: { canonical: "/trade-routes" },
};

const STATUS_LABEL = {
  historic: "Historic",
  active: "Still operating",
} as const;

export default function TradeRoutesPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-24">
      <header className="mb-10">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-4">
          Trade routes
        </p>
        <h1 className="editorial-h1 text-[56px] md:text-[72px] text-ink mb-5">
          The Saharan caravan order.
        </h1>
        <p className="editorial-italic text-[22px] text-secondary max-w-prose">
          Six routes that organised the western Old World economy from the
          eighth century to the early twentieth. The desert as corridor, not
          barrier.
        </p>
      </header>

      <section className="mb-12">
        <div className="h-[60vh] min-h-[520px]">
          <TradeRoutesMap />
        </div>
        <div className="mt-3 font-sans text-[11px] uppercase tracking-[0.2em] text-tertiary">
          Solid lines are still-operating routes; dashed lines are historic.
          Click a waypoint marker to open its atlas page where one exists.
        </div>
      </section>

      <section className="mb-12">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-3">
          Legend
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-sm">
          {TRADE_ROUTES.map((r) => (
            <li key={r.id} className="flex items-start gap-3">
              <span
                aria-hidden
                className="block w-4 h-1 mt-2 flex-shrink-0"
                style={{
                  background:
                    r.status === "active"
                      ? r.color
                      : `repeating-linear-gradient(90deg, ${r.color} 0 6px, transparent 6px 9px)`,
                }}
              />
              <div>
                <p className="text-ink">{r.shortName}</p>
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-tertiary">
                  {r.period}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-12 border-t border-border pt-10">
        {TRADE_ROUTES.map((r) => (
          <article
            key={r.id}
            id={r.id}
            className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 scroll-mt-[var(--header-height)]"
          >
            <div>
              <span
                aria-hidden
                className="inline-block w-4 h-1 align-middle mr-3"
                style={{
                  background:
                    r.status === "active"
                      ? r.color
                      : `repeating-linear-gradient(90deg, ${r.color} 0 6px, transparent 6px 9px)`,
                }}
              />
              <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-tertiary align-middle">
                {STATUS_LABEL[r.status]}
              </span>
              <h2 className="font-display text-3xl text-ink leading-tight mt-3">
                {r.name}
              </h2>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-tertiary mt-2">
                {r.period}
              </p>
            </div>
            <div>
              <p className="text-ink leading-[1.85] max-w-prose mb-5">
                {r.description}
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-prose mb-5 text-sm">
                <div>
                  <dt className="font-sans text-[11px] uppercase tracking-[0.18em] text-tertiary">
                    North-bound
                  </dt>
                  <dd className="text-ink mt-1">{r.commodityNorth}</dd>
                </div>
                <div>
                  <dt className="font-sans text-[11px] uppercase tracking-[0.18em] text-tertiary">
                    South-bound
                  </dt>
                  <dd className="text-ink mt-1">{r.commoditySouth}</dd>
                </div>
              </dl>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-tertiary mb-2">
                Waypoints
              </p>
              <p className="text-sm">
                {r.waypoints.map((w, i) => {
                  const ent = w.atlas ? getEntity(w.atlas) : null;
                  const slug = w.atlas?.replace(/^atlas-/, "");
                  return (
                    <span key={`${w.name}-${i}`}>
                      {i > 0 ? " → " : ""}
                      {ent && slug ? (
                        <Link
                          href={`/atlas/${slug}`}
                          className="text-ink hover:text-tertiary border-b border-border hover:border-tertiary transition-colors"
                        >
                          {w.name}
                        </Link>
                      ) : (
                        <span className="text-secondary">{w.name}</span>
                      )}
                    </span>
                  );
                })}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
