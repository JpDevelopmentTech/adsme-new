import type { KpiCardProps } from "@/types/dashboard-home.types";
import { cn } from "@/utils/cn";

/**
 * Ficha de métrica. La jerarquía la marca el tamaño de la cifra; el punto rojo
 * del pie solo aparece cuando el dato exige una acción.
 */
export function KpiCard({ label, value, note, isFlagged = false, footer }: KpiCardProps) {
  return (
    <article className="glass-panel flex h-full min-h-[172px] flex-col justify-between gap-3 rounded-tile p-[18px]">
      <span className="text-[10px] font-medium tracking-[0.6px] text-text-secondary uppercase">
        {label}
      </span>

      <span className="font-display text-[32px] leading-none font-light tracking-[-1px] text-text-primary">
        {value}
      </span>

      {footer ?? (
        <p className="flex items-center gap-[7px]">
          {isFlagged ? (
            <span aria-hidden className="size-[6px] shrink-0 rounded-pill bg-accent" />
          ) : null}
          <span
            className={cn(
              "text-[11.5px]",
              isFlagged ? "text-text-secondary" : "text-text-muted",
            )}
          >
            {note}
          </span>
        </p>
      )}
    </article>
  );
}
