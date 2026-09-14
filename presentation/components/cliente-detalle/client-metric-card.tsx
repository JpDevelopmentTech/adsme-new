import type { ClientMetricCardProps } from "@/types/client-detail.types";

/** Tarjeta de métrica del cliente: icono, valor destacado y etiqueta. */
export function ClientMetricCard({
  icon,
  value,
  label,
}: ClientMetricCardProps) {
  return (
    <div className="flex flex-1 items-center gap-[13px] rounded-md border border-border bg-card p-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-card-elevated">
        {icon}
      </span>

      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="font-display text-xl font-bold text-text-primary">
          {value}
        </span>
        <span className="truncate text-xs text-text-secondary">{label}</span>
      </div>
    </div>
  );
}
