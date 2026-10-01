import {
  CPV_CHART_COLORS,
  CPV_COMPARISON_COPY,
} from "@/constants/cpv-comparison.constants";

/** Tramos del trazo discontinuo de la leyenda, como la línea de la meta. */
const DASHES = [0, 1, 2];

/** Leyenda de la comparación: la meta a trazos, lo generado con el punto de YouTube. */
export function ReportCpvLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-4 pt-1.5 text-[13px] text-text-secondary">
      <li className="flex items-center gap-[7px]">
        <span aria-hidden className="flex gap-[3px]">
          {DASHES.map((dash) => (
            <span key={dash} className="h-0.5 w-[5px]" style={{ backgroundColor: CPV_CHART_COLORS.planned }} />
          ))}
        </span>
        {CPV_COMPARISON_COPY.plannedSeries}
      </li>
      <li className="flex items-center gap-[7px]">
        <span aria-hidden className="size-2 rounded-pill" style={{ backgroundColor: CPV_CHART_COLORS.actual }} />
        {CPV_COMPARISON_COPY.actualSeries}
      </li>
    </ul>
  );
}
