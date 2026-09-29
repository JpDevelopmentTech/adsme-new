import type { PortfolioStatProps } from "@/types/dashboard-home.types";
import { cn } from "@/utils/cn";

/** Una de las tres cifras de contexto que acompañan al dinero del mes. */
export function PortfolioStat({
  label,
  value,
  note,
  isFlagged = false,
}: PortfolioStatProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
        {label}
      </span>

      <span className="font-display text-[28px] leading-none font-light tracking-[-1px] text-text-primary tabular-nums">
        {value}
      </span>

      <p className="flex items-center gap-[7px]">
        {isFlagged ? (
          <span aria-hidden className="size-[6px] shrink-0 rounded-pill bg-warning" />
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
    </div>
  );
}
