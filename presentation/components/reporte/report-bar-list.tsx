import type { ReportBarListProps } from "@/types/report.types";

/**
 * Desglose porcentual en filas: etiqueta, barra y cifra. La barra se mide
 * contra la porción mayor, no contra el 100 %: con siete regiones ninguna pasa
 * del tercio, y medidas sobre el total todas parecerían igual de cortas.
 */
export function ReportBarList({ title, shares, color = "var(--color-lilac)" }: ReportBarListProps) {
  const max = Math.max(...shares.map((item) => item.percent), 0);

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-[11px] font-medium tracking-[1.4px] text-text-muted uppercase">{title}</h4>

      <ul className="flex flex-col gap-3">
        {shares.map((item) => (
          <li key={item.label} className="flex items-center gap-3">
            <span className="w-[132px] shrink-0 truncate text-[13px] text-text-secondary">{item.label}</span>
            <span aria-hidden className="h-2.5 min-w-0 flex-1 rounded-pill bg-surface">
              <span
                className="block h-full rounded-pill"
                style={{ width: `${max > 0 ? (item.percent / max) * 100 : 0}%`, backgroundColor: color }}
              />
            </span>
            <span className="w-10 shrink-0 text-right text-[13px] text-text-primary tabular-nums">{item.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
