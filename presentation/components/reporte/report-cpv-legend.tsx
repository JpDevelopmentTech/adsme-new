import {
  CPV_CHART_COLORS,
  CPV_COMPARISON_COPY,
} from "@/constants/cpv-comparison.constants";

/** Leyenda de la comparación: la meta a trazos, lo generado en continuo. */
export function ReportCpvLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-3.5 text-[10.5px] text-text-secondary">
      <li className="flex items-center gap-[6px]">
        <span
          aria-hidden
          className="w-3.5 border-t-2 border-dashed"
          style={{ borderColor: CPV_CHART_COLORS.planned }}
        />
        {CPV_COMPARISON_COPY.plannedSeries}
      </li>
      <li className="flex items-center gap-[6px]">
        <span
          aria-hidden
          className="h-[3px] w-3.5 rounded-pill"
          style={{ backgroundColor: CPV_CHART_COLORS.actual }}
        />
        {CPV_COMPARISON_COPY.actualSeries}
      </li>
    </ul>
  );
}
