import { JOB_STATUS_BADGE } from "@/constants/client-detail.constants";
import { JOBS_COPY } from "@/constants/jobs.constants";
import { JobCover } from "@/presentation/components/cliente-detalle/job-cover";
import { JobPlatforms } from "@/presentation/components/cliente-detalle/job-platforms";
import { JobRowMenu } from "@/presentation/components/trabajos/job-row-menu";
import { JobTimelineCell } from "@/presentation/components/trabajos/job-timeline-cell";
import { CopyCodeChip } from "@/presentation/components/ui/copy-code-chip";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { JobRowProps } from "@/types/jobs-list.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import { formatDailyRate } from "@/utils/format-daily-rate";
import { reportLinkCode } from "@/utils/report-link-code";

export function JobRow({ job, timeline, today }: JobRowProps) {
  const status = JOB_STATUS_BADGE[job.status];
  const dailyRate = formatDailyRate(job);

  return (
    <tr className="border-b border-border last:border-b-0">
      <td className="px-5 py-3">
        <div className="flex items-center gap-[13px]">
          <JobCover cover={job.cover} imageUrl={job.coverUrl} title={job.title} />
          <div className="flex min-w-0 flex-col gap-[3px]">
            <span className="truncate text-sm font-semibold text-text-primary">
              {job.title}
            </span>
            <span className="truncate text-xs text-text-muted">
              {job.artistName}
            </span>
          </div>
        </div>
      </td>

      <td className="w-[92px] px-5 py-3">
        <JobPlatforms platforms={job.platforms} jobTitle={job.title} />
      </td>

      <td className="w-[210px] px-5 py-3">
        <JobTimelineCell job={job} timeline={timeline} today={today} />
      </td>

      <td className="w-[124px] px-5 py-3">
        <div className="flex flex-col gap-[3px]">
          <span className="text-[13px] font-semibold whitespace-nowrap text-text-primary">
            {formatCompactCurrency(job.investment)}
          </span>
          {dailyRate ? (
            <span className="text-[11.5px] whitespace-nowrap text-text-muted">
              {dailyRate}
            </span>
          ) : null}
        </div>
      </td>

      <td className="w-[124px] px-5 py-3">
        <StatusBadge label={status.label} tone={status.tone} />
      </td>

      <td className="w-[104px] px-5 py-3">
        {job.reportUrl ? (
          <CopyCodeChip
            code={reportLinkCode(job.reportUrl)}
            value={job.reportUrl}
            label={`Copiar enlace del reporte de ${job.title}`}
          />
        ) : (
          <span className="text-xs whitespace-nowrap text-text-muted">
            {JOBS_COPY.noLink}
          </span>
        )}
      </td>

      <td className="w-[40px] px-5 py-3">
        <JobRowMenu job={job} />
      </td>
    </tr>
  );
}
