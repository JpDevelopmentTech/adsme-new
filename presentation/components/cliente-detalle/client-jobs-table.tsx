import { JOB_TABLE_HEADERS } from "@/constants/client-detail.constants";
import { ClientJobRow } from "@/presentation/components/cliente-detalle/client-job-row";
import type { ClientJobsTableProps } from "@/types/job.types";
import { cn } from "@/utils/cn";

const COLUMNS = [
  { key: "song", label: JOB_TABLE_HEADERS.song, className: "min-w-[220px] flex-1" },
  {
    key: "platforms",
    label: JOB_TABLE_HEADERS.platforms,
    className: "w-[120px] shrink-0",
  },
  { key: "status", label: JOB_TABLE_HEADERS.status, className: "w-[130px] shrink-0" },
  {
    key: "reportLink",
    label: JOB_TABLE_HEADERS.reportLink,
    className: "w-[240px] shrink-0",
  },
  { key: "actions", label: "", className: "w-[38px] shrink-0" },
];

/** Tabla de trabajos del cliente; hace scroll horizontal en pantallas estrechas. */
export function ClientJobsTable({ jobs }: ClientJobsTableProps) {
  return (
    <div className="overflow-x-auto">
      <div role="table" className="min-w-[900px]">
        <div
          role="row"
          className="flex items-center gap-4 border-b border-border bg-surface px-5 py-2.5"
        >
          {COLUMNS.map((column) => (
            <div
              key={column.key}
              role="columnheader"
              className={cn(
                "text-[11px] font-bold tracking-[0.5px] text-text-muted",
                column.className,
              )}
            >
              {column.label}
            </div>
          ))}
        </div>

        {jobs.map((job) => (
          <ClientJobRow key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
