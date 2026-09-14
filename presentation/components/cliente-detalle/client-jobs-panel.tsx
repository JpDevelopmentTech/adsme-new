import { CLIENT_DETAIL_COPY } from "@/constants/client-detail.constants";
import { ClientJobsEmpty } from "@/presentation/components/cliente-detalle/client-jobs-empty";
import { ClientJobsTable } from "@/presentation/components/cliente-detalle/client-jobs-table";
import type { ClientJobsPanelProps } from "@/types/client-detail.types";

/** Tarjeta con el listado de trabajos del cliente y el acceso a crear uno nuevo. */
export function ClientJobsPanel({ jobs }: ClientJobsPanelProps) {
  return (
    <section className="overflow-hidden rounded-card border border-border bg-card">
      <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <h2 className="font-display text-base font-semibold text-text-primary">
            {CLIENT_DETAIL_COPY.jobsTitle}
          </h2>
          <span className="rounded-pill bg-card-elevated px-2.5 py-[3px] text-xs font-semibold text-text-secondary">
            {jobs.length}
          </span>
        </div>

        <button
          type="button"
          className="cursor-pointer rounded-sm text-[13px] font-semibold text-brand-violet transition-colors hover:text-brand-magenta focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none"
        >
          {CLIENT_DETAIL_COPY.addJob}
        </button>
      </header>

      {jobs.length > 0 ? <ClientJobsTable jobs={jobs} /> : <ClientJobsEmpty />}
    </section>
  );
}
