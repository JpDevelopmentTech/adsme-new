import type { NavBadgeProps } from "@/types/dashboard.types";

/** Marca de fase junto a un ítem del menú. */
export function NavBadge({ label }: NavBadgeProps) {
  return (
    <span className="rounded-pill border border-border-strong px-[7px] py-px text-[9px] font-medium tracking-[0.6px] text-text-muted">
      {label}
    </span>
  );
}
