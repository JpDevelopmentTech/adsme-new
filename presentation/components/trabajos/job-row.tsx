import Link from "next/link";
import { JOB_STATUS_BADGE } from "@/constants/client-detail.constants";
import { jobDetailRoute } from "@/constants/routes.constants";
import { JobCover } from "@/presentation/components/cliente-detalle/job-cover";
import { JobPlatforms } from "@/presentation/components/cliente-detalle/job-platforms";
import { JobReportLink } from "@/presentation/components/trabajos/job-report-link";
import { JobRowMenu } from "@/presentation/components/trabajos/job-row-menu";
import { JobTimelineCell } from "@/presentation/components/trabajos/job-timeline-cell";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { JobRowProps } from "@/types/jobs-list.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatDailyRate } from "@/utils/format-daily-rate";

export function JobRow({ job, timeline, today }: JobRowProps) {
  const status = JOB_STATUS_BADGE[job.status];
  const dailyRate = formatDailyRate(job);

  return (
    <tr className="border-b border-border/60 transition-colors duration-150 last:border-b-0 hover:bg-g-100">
      <td className="py-3 pr-3.5 pl-5">
        <div className="flex items-center gap-3.5">
          <JobCover cover={job.cover} imageUrl={job.coverUrl} title={job.title} />

          <div className="flex min-w-0 flex-col gap-0.5">
            <Link
              href={jobDetailRoute(job.id)}
              className="truncate rounded-sm text-[13.5px] font-normal text-text-primary transition-opacity duration-150 hover:opacity-60 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
            >
              {job.title}
            </Link>
            <span className="truncate text-[11.5px] text-text-muted">
              {job.artistName}
            </span>
          </div>
        </div>
      </td>

      <td className="py-3 pr-3.5">
        <JobPlatforms platforms={job.platforms} jobTitle={job.title} />
      </td>

      <td className="py-3">
        <JobTimelineCell job={job} timeline={timeline} today={today} />
      </td>

      <td className="px-3.5 py-3">
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[13.5px] font-normal whitespace-nowrap text-text-primary">
            {formatCompactCurrency(job.investment)}
          </span>
          {dailyRate ? (
            <span className="text-[11px] whitespace-nowrap text-text-muted">
              {dailyRate}
            </span>
          ) : null}
        </div>
      </td>

      <td className="py-3 pr-3.5">
        <div className="flex justify-center">
          <StatusBadge label={status.label} tone={status.tone} />
        </div>
      </td>

      <td className="py-3 pr-3.5">
        <div className="flex justify-center">
          <JobReportLink reportUrl={job.reportUrl} jobTitle={job.title} />
        </div>
      </td>

      <td className="py-3 pr-5">
        <div className="flex justify-end">
          <JobRowMenu job={job} />
        </div>
      </td>
    </tr>
  );
}
