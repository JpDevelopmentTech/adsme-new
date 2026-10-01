import type { StatusBadgeProps, StatusTone } from "@/types/ui.types";
import { cn } from "@/utils/cn";

/**
 * Estado en una píldora tintada con un punto del mismo tono: verde para lo que
 * está vivo, lila para lo cerrado, ámbar y rojo para lo que pide atención y
 * neutro para lo que solo informa. El texto acompaña siempre al color.
 */
const TONE_CLASSES: Record<StatusTone, { pill: string; dot: string }> = {
  success: { pill: "bg-success/12 text-success", dot: "bg-success" },
  muted: { pill: "bg-surface text-text-secondary", dot: "bg-text-muted" },
  warning: { pill: "bg-warning/12 text-warning", dot: "bg-warning" },
  danger: { pill: "bg-danger/12 text-danger", dot: "bg-danger" },
  brand: { pill: "bg-lilac/12 text-lilac", dot: "bg-lilac" },
  info: { pill: "bg-surface text-text-secondary", dot: "bg-text-secondary" },
};

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  const classes = TONE_CLASSES[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-normal whitespace-nowrap",
        classes.pill,
      )}
    >
      <span aria-hidden className={cn("size-1.5 shrink-0 rounded-pill", classes.dot)} />
      {label}
    </span>
  );
}
