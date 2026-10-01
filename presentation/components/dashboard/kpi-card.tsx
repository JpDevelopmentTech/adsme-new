import type { KpiCardProps } from "@/types/dashboard-home.types";
import { cn } from "@/utils/cn";

/**
 * Tarjeta de cifra en vidrio: icono y rótulo arriba, la cifra en peso fino y su
 * nota debajo. El punto rojo del pie solo aparece cuando el dato exige una acción.
 */
export function KpiCard({ icon: Icon, label, value, note, isFlagged = false, footer }: KpiCardProps) {
  return (
    <article className="glass-panel flex h-full flex-col gap-3.5 rounded-card p-[22px]">
      <span className="flex items-center gap-2.5">
        {Icon ? (
          <span className="grid size-[34px] place-items-center rounded-[11px] border border-border bg-surface">
            <Icon size={16} strokeWidth={1.5} className="text-text-primary" aria-hidden />
          </span>
        ) : null}
        <span className="text-xs font-normal text-text-muted">{label}</span>
      </span>

      <span className="flex flex-col gap-0.5">
        <span className="text-[34px] leading-tight font-extralight text-text-primary tabular-nums">{value}</span>
        {footer ?? (
          <span className="flex items-center gap-1.5">
            {isFlagged ? <span aria-hidden className="size-1.5 shrink-0 rounded-pill bg-danger" /> : null}
            <span className={cn("text-xs font-normal", isFlagged ? "text-text-secondary" : "text-text-muted")}>
              {note}
            </span>
          </span>
        )}
      </span>
    </article>
  );
}
