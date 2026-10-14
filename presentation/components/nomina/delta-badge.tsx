import { TrendingDown, TrendingUp } from "lucide-react";
import type { DeltaBadgeProps } from "@/types/nomina-ui.types";
import { formatPercent } from "@/utils/format-percent";

/** Variación frente al periodo anterior: flecha, porcentaje con signo y contexto. */
export function DeltaBadge({ value, comparison }: DeltaBadgeProps) {
  const isUp = value >= 0;
  const Icon = isUp ? TrendingUp : TrendingDown;
  const text = `${isUp ? "+" : "−"}${formatPercent(Math.abs(value))}`;

  return (
    <p className="flex items-center gap-1.5 text-xs">
      <Icon size={13} strokeWidth={1.75} className={isUp ? "text-success" : "text-danger"} aria-hidden />
      <span className={isUp ? "font-normal text-success" : "font-normal text-danger"}>{text}</span>
      <span className="text-text-muted">{comparison}</span>
    </p>
  );
}
