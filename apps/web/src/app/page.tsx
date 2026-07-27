"use client";

import { useGetHealthzQuery } from "@ivba/api-client";
import { VenueStatuses } from "@ivba/domain";

export default function Home() {
  const { data, error, isFetching } = useGetHealthzQuery();

  return (
    <main className="min-h-screen bg-[var(--ivba-paper,#faf7f2)] text-[var(--ivba-ink,#1c1917)] px-6 py-16">
      <div className="mx-auto max-w-2xl space-y-6">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--ivba-muted,#78716c)]">
          IVBA scaffold
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Independent Venue Booking Platform
        </h1>
        <p className="text-lg text-[var(--ivba-muted,#78716c)]">
          Monorepo is up: Next.js web, Expo mobile, Go API, OpenAPI, and
          Postgres/PostGIS migrations.
        </p>

        <section className="space-y-2 border-t border-black/10 pt-6">
          <h2 className="text-base font-medium">API health</h2>
          {isFetching && <p>Checking `/healthz`…</p>}
          {data && (
            <p>
              Status: <code>{data.status}</code>
            </p>
          )}
          {error && (
            <p>
              API not reachable yet. Run <code>make up && make migrate && make api</code>.
            </p>
          )}
        </section>

        <section className="space-y-2 border-t border-black/10 pt-6">
          <h2 className="text-base font-medium">Shared domain sample</h2>
          <p className="text-sm text-[var(--ivba-muted,#78716c)]">
            Venue statuses from <code>@ivba/domain</code>:{" "}
            {VenueStatuses.join(", ")}
          </p>
        </section>
      </div>
    </main>
  );
}
