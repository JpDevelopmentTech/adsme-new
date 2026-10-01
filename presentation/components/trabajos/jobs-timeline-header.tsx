import { JOBS_BAND_COPY, JOB_TABLE_COLUMNS } from "@/constants/jobs.constants";
import { SortHeader } from "@/presentation/components/trabajos/sort-header";
import type { JobsTimelineHeaderProps } from "@/types/jobs-list.types";

/**
 * Cabecera de la columna Período: el título que ordena, la escala de meses del
 * eje común con sus marcas y la pastilla lila de hoy, que arranca la línea que
 * baja por todas las filas.
 */
export function JobsTimelineHeader({ months, todayPercent, sort }: JobsTimelineHeaderProps) {
  return (
    <div className="relative h-[58px] px-2">
      <div className="absolute top-2 left-2 text-xs font-normal">
        <SortHeader column="period" sort={sort} label={JOB_TABLE_COLUMNS.period} />
      </div>

      <div className="absolute inset-x-2 inset-y-0">
        {months.map((month) => (
          <span key={month.label} className="absolute bottom-0 h-[22px]" style={{ left: `${month.percent}%` }}>
            <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-white/15" />
            <span className="absolute bottom-1 left-1.5 text-[11px] font-normal text-text-muted">
              {month.label}
            </span>
          </span>
        ))}

        <span
          aria-hidden
          className="absolute top-[30px] bottom-0 w-[1.5px] -translate-x-1/2 bg-lilac"
          style={{ left: `${todayPercent}%` }}
        />
        <span
          className="absolute top-1.5 -translate-x-1/2 rounded-pill bg-lilac px-2 py-0.5 text-[10px] font-medium text-[#1a1030]"
          style={{ left: `${todayPercent}%` }}
        >
          {JOBS_BAND_COPY.today}
        </span>
      </div>
    </div>
  );
}
