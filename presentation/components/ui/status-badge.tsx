import type { StatusBadgeProps, StatusTone } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/**
 * Estado en una píldora. La jerarquía la da el relleno: bloque sólido para lo
 * que está vivo, contorno para lo que ya no pide atención.
 */
const TONE_CLASSES: Record<StatusTone, string> = {
  success: "border-ink bg-ink text-g-50",
  muted: "border-border-strong text-text-secondary",
  warning: "border-warning/40 bg-warning/12 text-warning",
  danger: "border-danger/40 bg-danger/12 text-danger",
  brand: "border-g-600 bg-g-600 text-g-50",
  info: "border-border-strong bg-white/60 text-text-secondary",
};

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-pill border px-[10px] py-[3px] text-[10px] font-normal tracking-[0.2px]",
        TONE_CLASSES[tone],
      )}
    >
      {label}
    </span>
  );
}
