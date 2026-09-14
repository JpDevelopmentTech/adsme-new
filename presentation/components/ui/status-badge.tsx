import type { StatusBadgeProps, StatusTone } from "@/types/ui.types";
import { cn } from "@/utils/cn";

const TONE_CLASSES: Record<StatusTone, string> = {
  success: "border-success/25 bg-success/15 text-success",
  muted: "border-text-muted/25 bg-text-muted/10 text-text-muted",
  warning: "border-warning/25 bg-warning/15 text-warning",
  danger: "border-danger/25 bg-danger/15 text-danger",
  brand: "border-brand-violet/25 bg-brand-violet/10 text-brand-violet",
  info: "border-data-cyan/25 bg-data-cyan/10 text-data-cyan",
};

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-[7px] rounded-pill border px-3 py-1.5 text-xs font-semibold",
        TONE_CLASSES[tone],
      )}
    >
      <span aria-hidden className="size-[7px] rounded-full bg-current" />
      {label}
    </span>
  );
}
