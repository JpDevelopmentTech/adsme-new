import { RULER_LEGEND } from "@/constants/nomina-buckets.constants";

/** Leyenda de la regla de shows, con el significado de cada color. */
export function ShowRulerLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2 text-xs">
      <span className="text-text-muted">Cada barra es un show del mes:</span>
      {RULER_LEGEND.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5 text-text-secondary">
          <span aria-hidden className="h-3 w-[5px] rounded-[2px]" style={{ backgroundColor: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
