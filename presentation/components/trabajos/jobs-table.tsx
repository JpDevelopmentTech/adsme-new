import {
  JOBS_COPY,
  JOB_TABLE_COLUMNS,
  JOB_TABLE_WIDTHS,
} from "@/constants/jobs.constants";
import { jobSortDirection } from "@/domain/entities/job-query";
import { JobRow } from "@/presentation/components/trabajos/job-row";
import { JobsEmpty } from "@/presentation/components/trabajos/jobs-empty";
import { JobsToolbar } from "@/presentation/components/trabajos/jobs-toolbar";
import { SortHeader } from "@/presentation/components/trabajos/sort-header";
import type { JobsTableProps } from "@/types/jobs-list.types";
import { buildJobTimeline } from "@/utils/build-job-timeline";
import { buildTimelineMonths } from "@/utils/build-timeline-months";

const HEADER_CLASSES =
  "py-[9px] text-left text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase";

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
    <section className="glass-panel flex flex-col overflow-hidden rounded-card">
      <JobsToolbar
        query={query}
        clientOptions={clientOptions}
        resultsLabel={resultsLabel}
      />

      <div className="h-px bg-border/60" />

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

              <thead className="bg-g-100">
                <tr>
                  <th className={`${HEADER_CLASSES} pr-3.5 pl-5`}>
                    {JOB_TABLE_COLUMNS.job}
                  </th>
                  <th className={`${HEADER_CLASSES} pr-3.5`}>
                    {JOB_TABLE_COLUMNS.platforms}
                  </th>

                  <th
                    className={HEADER_CLASSES}
                    aria-sort={periodSort ? ARIA_SORT[periodSort] : "none"}
                  >
                    <div className="relative h-4">
                      {months.map((month) => (
                        <span
                          key={month.label}
                          className="absolute top-0"
                          style={{ left: `${month.percent}%` }}
                        >
                          {month.label}
                        </span>
                      ))}

                      <span className="absolute top-0 right-0">
                        <SortHeader
                          hideLabel
                          column="period"
                          sort={query.sort}
                          label={JOB_TABLE_COLUMNS.period}
                        />
                      </span>
                    </div>
                  </th>

                  <th
                    className={`${HEADER_CLASSES} px-3.5`}
                    aria-sort={
                      investmentSort ? ARIA_SORT[investmentSort] : "none"
                    }
                  >
                    <div className="flex justify-end">
                      <SortHeader
                        column="investment"
                        sort={query.sort}
                        label={JOB_TABLE_COLUMNS.investment}
                      />
                    </div>
                  </th>

                  <th className={`${HEADER_CLASSES} pr-3.5 text-center`}>
                    {JOB_TABLE_COLUMNS.status}
                  </th>
                  <th className={`${HEADER_CLASSES} pr-3.5`}>
                    <span className="sr-only">{JOB_TABLE_COLUMNS.report}</span>
                  </th>
                  <th className={`${HEADER_CLASSES} pr-5`}>
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
