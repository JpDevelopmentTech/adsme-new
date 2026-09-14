import { JOB_TABLE_COLUMNS } from "@/constants/jobs.constants";
import { jobSortDirection } from "@/domain/entities/job-query";
import { JobRow } from "@/presentation/components/trabajos/job-row";
import { SortHeader } from "@/presentation/components/trabajos/sort-header";
import type { JobsTableProps } from "@/types/jobs-list.types";
import { buildJobTimeline } from "@/utils/build-job-timeline";

const HEADER_CLASSES =
  "px-5 py-3 text-left text-[11px] font-bold tracking-[0.5px] text-text-muted";

/** Sentido que espera `aria-sort` en la columna que ordena la tabla. */
const ARIA_SORT = { asc: "ascending", desc: "descending" } as const;

export function JobsTable({ jobs, totalJobs, today, sort }: JobsTableProps) {
  const timeline = buildJobTimeline(jobs, today);
  const investmentSort = jobSortDirection("investment", sort);
  const periodSort = jobSortDirection("period", sort);

  return (
    <div className="overflow-hidden rounded-card border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1020px] border-collapse">
          <thead className="border-b border-border bg-surface">
            <tr>
              <th className={HEADER_CLASSES}>{JOB_TABLE_COLUMNS.job}</th>
              <th className={HEADER_CLASSES}>{JOB_TABLE_COLUMNS.platforms}</th>

              <th
                className={HEADER_CLASSES}
                aria-sort={periodSort ? ARIA_SORT[periodSort] : "none"}
              >
                <SortHeader
                  column="period"
                  sort={sort}
                  label={`${JOB_TABLE_COLUMNS.period} · ${timeline.label.toUpperCase()}`}
                />
              </th>

              <th
                className={HEADER_CLASSES}
                aria-sort={investmentSort ? ARIA_SORT[investmentSort] : "none"}
              >
                <SortHeader
                  column="investment"
                  sort={sort}
                  label={JOB_TABLE_COLUMNS.investment}
                />
              </th>

              <th className={HEADER_CLASSES}>{JOB_TABLE_COLUMNS.status}</th>
              <th className={HEADER_CLASSES}>{JOB_TABLE_COLUMNS.report}</th>
              <th className={HEADER_CLASSES}>
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <JobRow
                key={job.id}
                job={job}
                timeline={timeline}
                today={today}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border bg-surface px-5 py-3">
        <p className="text-xs text-text-muted">
          {jobs.length === totalJobs
            ? `${totalJobs} ${totalJobs === 1 ? "trabajo" : "trabajos"}`
            : `${jobs.length} de ${totalJobs} trabajos`}
        </p>
      </div>
    </div>
  );
}
