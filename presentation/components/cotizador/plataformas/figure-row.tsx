import type { FigureRowProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";

/** Renglón «concepto → cifra» de los bloques de comisión y servicio. */
export function FigureRow({ label, value, isStrong = false }: FigureRowProps) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-[13px]">
      <span className="text-text-secondary">{label}</span>
      <span className={cn("text-right tabular-nums", isStrong ? "text-text-primary" : "text-text-secondary")}>{value}</span>
    </div>
  );
}
