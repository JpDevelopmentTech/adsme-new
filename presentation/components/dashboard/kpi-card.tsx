import { KPI_DELTA_TONES, KPI_TONES } from "@/constants/dashboard.constants";
import type { KpiCardProps } from "@/types/dashboard-home.types";
import { cn } from "@/utils/cn";

/**
 * Tarjeta de métrica de `B1`. El halo tras el valor queda reservado a la
 * métrica principal: aplicado a las cuatro deja de ser jerarquía y es ruido.
 */
export function KpiCard({
  label,
  value,
  icon,
  tone,
  delta,
  deltaLabel,
  deltaTone = "success",
  footer,
  glow = false,
}: KpiCardProps) {
  const palette = KPI_TONES[tone];

  return (
    <article className="flex h-full flex-col justify-between gap-4 rounded-card border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-medium text-text-secondary">
          {label}
        </span>
        <span
          className={cn(
            "grid size-[34px] shrink-0 place-items-center rounded-sm",
            palette.chip,
            palette.icon,
          )}
        >
          {icon}
        </span>
      </div>

      <span
        className="font-display text-[32px] leading-none font-bold text-text-primary"
        style={glow ? { textShadow: `0 0 20px ${palette.glow}` } : undefined}
      >
        {value}
      </span>

      {footer ?? (
        <p className="flex items-center gap-1.5 text-xs">
          {delta ? (
            <span
              className={cn("text-[13px] font-semibold", KPI_DELTA_TONES[deltaTone])}
            >
              {delta}
            </span>
          ) : null}
          <span className="text-text-muted">{deltaLabel}</span>
        </p>
      )}
    </article>
  );
}
