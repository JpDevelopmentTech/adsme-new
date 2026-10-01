import { Ellipsis } from "lucide-react";
import { JOB_STATUS_BADGE } from "@/constants/client-detail.constants";
import { JobCover } from "@/presentation/components/cliente-detalle/job-cover";
import { JobPlatforms } from "@/presentation/components/cliente-detalle/job-platforms";
import { CopyLinkField } from "@/presentation/components/ui/copy-link-field";
import { IconButton } from "@/presentation/components/ui/icon-button";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { ClientJobRowProps } from "@/types/job.types";

/** Fila de la tabla de trabajos: canción, plataformas, estado y enlace del cliente. */
export function ClientJobRow({ job }: ClientJobRowProps) {
  const status = JOB_STATUS_BADGE[job.status];

  return (
    <div role="row" className="flex min-h-[76px] items-center gap-4 border-b border-border py-3 last:border-b-0">
      <div role="cell" className="flex min-w-[220px] flex-1 items-center gap-3.5">
        <JobCover imageUrl={job.coverUrl} title={job.title} size={52} />

        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-[15px] font-normal text-text-primary">{job.title}</span>
          <span className="truncate text-xs font-normal text-text-muted">
            {job.format} · {job.startsOn.slice(0, 4)}
          </span>
        </div>
      </div>

      <div role="cell" className="w-[150px] shrink-0">
        <JobPlatforms platforms={job.platforms} jobTitle={job.title} />
      </div>

      <div role="cell" className="w-[140px] shrink-0">
        <StatusBadge label={status.label} tone={status.tone} />
      </div>

      <div role="cell" className="w-[320px] shrink-0 pr-4">
        <CopyLinkField url={job.reportUrl ?? ""} label={`Copiar el enlace del reporte de ${job.title}`} />
      </div>

      <div role="cell" className="flex w-11 shrink-0 justify-end">
        <IconButton
          size={34}
          label={`Acciones de ${job.title}`}
          className="border-transparent bg-transparent"
          icon={<Ellipsis size={18} aria-hidden />}
        />
      </div>
    </div>
  );
}
