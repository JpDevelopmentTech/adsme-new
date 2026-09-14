import type { NavBadgeProps } from "@/types/dashboard.types";

export function NavBadge({ label }: NavBadgeProps) {
  return (
    <span className="rounded-pill bg-warning/15 px-2 py-[3px] text-[10px] font-bold text-warning">
      {label}
    </span>
  );
}
