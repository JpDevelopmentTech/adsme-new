import type { NavBadgeProps } from "@/types/dashboard.types";

/** Marca de fase junto a un ítem del menú, en lila tenue. */
export function NavBadge({ label }: NavBadgeProps) {
  return (
    <span className="rounded-pill bg-lilac/14 px-2 py-0.5 text-[10px] font-medium tracking-[0.6px] text-lilac">
      {label}
    </span>
  );
}
