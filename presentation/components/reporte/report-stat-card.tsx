import type { ReportStatCardProps } from "@/types/report.types";

/**
 * Un dato, una tarjeta. Van neutras a propósito: el color lo lleva la cabecera
 * de su plataforma, así que la rejilla se lee como una tabla de cifras y no
 * como avisos compitiendo entre sí.
 */
export function ReportStatCard({ stat }: ReportStatCardProps) {
  return (
    <article className="flex min-w-0 flex-col gap-1 rounded-tile border border-border bg-surface px-[18px] py-4">
      <span className="text-xs font-normal text-text-muted">{stat.label}</span>
      <span className="truncate text-[28px] leading-tight font-extralight text-text-primary tabular-nums">
        {stat.value}
      </span>
    </article>
  );
}
