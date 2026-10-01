import {
  JOBS_COPY,
  JOB_TABLE_COLUMNS,
  JOB_TABLE_WIDTHS,
} from "@/constants/jobs.constants";
import { jobSortDirection } from "@/domain/entities/job-query";
import { JobRow } from "@/presentation/components/trabajos/job-row";
import { JobsEmpty } from "@/presentation/components/trabajos/jobs-empty";
import { JobsToolbar } from "@/presentation/components/trabajos/jobs-toolbar";
import { JobsTimelineHeader } from "@/presentation/components/trabajos/jobs-timeline-header";
import { SortHeader } from "@/presentation/components/trabajos/sort-header";
import type { JobsTableProps } from "@/types/jobs-list.types";
import { buildJobTimeline } from "@/utils/build-job-timeline";
import { buildTimelineMonths } from "@/utils/build-timeline-months";

const HEADER_CLASSES = "pb-3 text-left align-bottom text-xs font-normal text-text-muted";

/** Sentido que espera `aria-sort` en la columna que ordena la tabla. */
const ARIA_SORT = { asc: "ascending", desc: "descending" } as const;

/**
 * El listado como línea de tiempo. Todas las filas comparten eje, así que los
 * períodos se comparan entre sí y la escala de meses de la cabecera les da
 * contexto: de un vistazo se ve qué corre, qué venció y qué no ha empezado.
 */
export function JobsTable({
  jobs,
  totalJobs,
  today,
  query,
  clientOptions,
  isFiltered,
}: JobsTableProps) {
  const timeline = buildJobTimeline(jobs, today);
  const months = buildTimelineMonths(timeline);
  const investmentSort = jobSortDirection("investment", query.sort);
  const periodSort = jobSortDirection("period", query.sort);

  const resultsLabel = isFiltered
    ? JOBS_COPY.results(jobs.length, totalJobs)
    : JOBS_COPY.count(totalJobs);

  return (
    <section className="glass-thick flex flex-col rounded-card px-6 pt-5 pb-2.5">
      <JobsToolbar
        query={query}
        clientOptions={clientOptions}
        resultsLabel={resultsLabel}
      />

      {jobs.length === 0 ? (
        <JobsEmpty isFiltered={isFiltered} />
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
            <table className="w-full table-fixed border-collapse">
              <colgroup>
                {JOB_TABLE_WIDTHS.map((width) => (
                  <col key={width} style={{ width }} />
                ))}
              </colgroup>

              <thead>
                <tr className="h-[58px] border-b border-border">
                  <th className={`${HEADER_CLASSES} pr-3.5`}>{JOB_TABLE_COLUMNS.job}</th>
                  <th className={`${HEADER_CLASSES} pr-3.5`}>{JOB_TABLE_COLUMNS.platforms}</th>
                  <th className="p-0 align-bottom" aria-sort={periodSort ? ARIA_SORT[periodSort] : "none"}>
                    <JobsTimelineHeader months={months} todayPercent={timeline.todayPercent} sort={query.sort} />
                  </th>
                  <th
                    className={`${HEADER_CLASSES} pr-5 pl-3.5`}
                    aria-sort={investmentSort ? ARIA_SORT[investmentSort] : "none"}
                  >
                    <div className="flex justify-end">
                      <SortHeader column="investment" sort={query.sort} label={JOB_TABLE_COLUMNS.investment} />
                    </div>
                  </th>
                  <th className={`${HEADER_CLASSES} pr-3.5`}>{JOB_TABLE_COLUMNS.status}</th>
                  <th className={`${HEADER_CLASSES} pr-3.5`}>{JOB_TABLE_COLUMNS.report}</th>
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
        </div>
      )}
    </section>
  );
}
