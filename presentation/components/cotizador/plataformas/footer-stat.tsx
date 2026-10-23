import { FOOTER_STAT_TONES } from "@/constants/quote-platforms-copy.constants";
import type { FooterStatProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";

/** Cifra pequeña del pie de la tarjeta: rótulo arriba, importe abajo con su tono. */
export function FooterStat({ label, value, tone = "default" }: FooterStatProps) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="text-[11px] text-text-muted">{label}</span>
      <span className={cn("truncate text-sm tabular-nums", FOOTER_STAT_TONES[tone])}>{value}</span>
    </div>
  );
}
