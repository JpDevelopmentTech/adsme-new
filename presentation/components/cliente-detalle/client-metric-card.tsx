import type { ClientMetricCardProps } from "@/types/client-detail.types";

/** Tarjeta de cifra del cliente: icono en cuadro de vidrio, valor en peso fino y etiqueta. */
export function ClientMetricCard({ icon, value, label }: ClientMetricCardProps) {
  return (
    <div className="glass-panel flex items-center gap-3.5 rounded-card px-5 py-[18px]">
      <span className="grid size-[42px] shrink-0 place-items-center rounded-[14px] border border-border bg-surface">
        {icon}
      </span>

      <div className="flex min-w-0 flex-col">
        <span className="text-[26px] leading-tight font-extralight text-text-primary tabular-nums">
          {value}
        </span>
        <span className="truncate text-xs font-normal text-text-muted">{label}</span>
      </div>
    </div>
  );
}
