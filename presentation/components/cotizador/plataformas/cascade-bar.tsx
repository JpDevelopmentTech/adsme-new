import { QUOTE_CASCADE_COLORS } from "@/constants/quote-platforms-copy.constants";
import type { CascadeBarProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";

/** Barra proporcional servicio / comisión / pauta; las cifras exactas están en los pasos. */
export function CascadeBar({ segments, label }: CascadeBarProps) {
  return (
    <div role="img" aria-label={label} className="flex h-2 w-full gap-0.5 overflow-hidden rounded-pill bg-surface">
      {segments.filter((segment) => segment.share > 0).map((segment) => (
        <span key={segment.key} className={cn("h-full transition-[width] duration-300 motion-reduce:transition-none", QUOTE_CASCADE_COLORS[segment.key])} style={{ width: `${segment.share * 100}%` }} />
      ))}
    </div>
  );
}
