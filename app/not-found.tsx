import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-6 py-32 text-center">
      <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-6">
        404
      </p>
      <p className="font-serif text-3xl text-ink mb-8 max-w-prose mx-auto">
        This page is not in the archive.
      </p>
      <Link
        href="/"
        className="font-mono text-[11px] uppercase tracking-wide text-accent hover:underline"
      >
        Return to the archive →
      </Link>
    </div>
  );
}
