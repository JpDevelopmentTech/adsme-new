import { CLIENT_DETAIL_COPY } from "@/constants/client-detail.constants";
import { ClientJobsEmpty } from "@/presentation/components/cliente-detalle/client-jobs-empty";
import { ClientJobsTable } from "@/presentation/components/cliente-detalle/client-jobs-table";
import type { ClientJobsPanelProps } from "@/types/client-detail.types";

/** Panel de vidrio grueso con los trabajos (lanzamientos) del cliente. */
export function ClientJobsPanel({ jobs }: ClientJobsPanelProps) {
  return (
    <section className="glass-thick flex flex-col rounded-card px-6 pt-[22px] pb-2.5">
      <header className="flex items-center gap-2.5 pb-3">
        <h2 className="text-[17px] font-light text-text-primary">{CLIENT_DETAIL_COPY.jobsTitle}</h2>
        <span className="rounded-pill bg-surface px-2.5 py-0.5 text-xs font-medium text-text-secondary">
          {jobs.length}
        </span>
      </header>

      {jobs.length > 0 ? <ClientJobsTable jobs={jobs} /> : <ClientJobsEmpty />}
    </section>
  );
}
