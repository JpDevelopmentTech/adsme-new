import Link from "next/link";
import { JOB_STATUS_BADGE } from "@/constants/client-detail.constants";
import { jobDetailRoute } from "@/constants/routes.constants";
import { JobCover } from "@/presentation/components/cliente-detalle/job-cover";
import { JobPlatforms } from "@/presentation/components/cliente-detalle/job-platforms";
import { JobReportLink } from "@/presentation/components/trabajos/job-report-link";
import { JobRowMenu } from "@/presentation/components/trabajos/job-row-menu";
import { JobTimelineCell } from "@/presentation/components/trabajos/job-timeline-cell";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import { JOBS_COPY } from "@/constants/jobs.constants";
import type { JobRowProps } from "@/types/jobs-list.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatDailyRate } from "@/utils/format-daily-rate";

/** Una fila del listado: el lanzamiento, su pauta, su ventana en el tiempo y su dinero. */
export function JobRow({ job, timeline, today }: JobRowProps) {
  const status = JOB_STATUS_BADGE[job.status];
  const dailyRate = formatDailyRate(job);

  return (
    <tr className="border-b border-border transition-colors duration-150 last:border-b-0 hover:bg-white/[0.03]">
      <td className="py-3 pr-3.5">
        <div className="flex items-center gap-3.5">
          <JobCover imageUrl={job.coverUrl} title={job.title} size={46} />

          <div className="flex min-w-0 flex-col gap-0.5">
            <Link
              href={jobDetailRoute(job.id)}
              className="truncate rounded-sm text-sm font-normal text-text-primary transition-opacity duration-150 hover:opacity-70 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
            >
              {job.title}
            </Link>
            <span className="truncate text-xs font-normal text-text-muted">{job.artistName}</span>
          </div>
        </div>
      </td>

      <td className="py-3 pr-3.5">
        {job.platforms.length > 0 ? (
          <JobPlatforms platforms={job.platforms} jobTitle={job.title} />
        ) : (
          <span className="text-xs font-normal text-warning">{JOBS_COPY.noPlatforms}</span>
        )}
      </td>

      <td className="p-0">
        <JobTimelineCell job={job} timeline={timeline} today={today} />
      </td>

      <td className="py-3 pr-5 pl-3.5">
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-sm font-normal whitespace-nowrap text-text-primary tabular-nums">
            {formatCompactCurrency(job.investment)}
          </span>
          {dailyRate ? (
            <span className="text-xs font-normal whitespace-nowrap text-text-muted">{dailyRate}</span>
          ) : null}
        </div>
      </td>

      <td className="py-3 pr-3.5">
        <StatusBadge label={status.label} tone={status.tone} />
      </td>

      <td className="py-3 pr-3.5">
        <JobReportLink reportUrl={job.reportUrl} jobTitle={job.title} />
      </td>

      <td className="py-3">
        <div className="flex justify-end">
          <JobRowMenu job={job} />
        </div>
      </td>
    </tr>
  );
}
