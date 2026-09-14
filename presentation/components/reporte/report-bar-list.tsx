import type { ReportBarListProps } from "@/types/report.types";

/** Desglose porcentual en barras: la forma en que el reporte compara partes. */
export function ReportBarList({
  title,
  shares,
  color = "var(--color-brand-violet)",
}: ReportBarListProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[11px] font-bold tracking-[0.5px] text-text-muted">
        {title}
      </h3>

      <ul className="flex flex-col gap-2.5">
        {shares.map((item) => (
          <li key={item.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-[13px] text-text-secondary">
                {item.label}
              </span>
              <span className="shrink-0 text-[13px] font-semibold text-text-primary">
                {item.percent}%
              </span>
            </div>

            <div aria-hidden className="h-1.5 rounded-pill bg-surface">
              <div
                className="h-full rounded-pill"
                style={{ width: `${item.percent}%`, backgroundColor: color }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
