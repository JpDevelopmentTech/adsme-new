import type { CascadeStepProps } from "@/types/quote-platforms.types";
import { cn } from "@/utils/cn";

/** Paso de la cascada: rótulo con la muestra de su color y la cifra que deja. */
export function CascadeStep({ label, value, swatch, isHighlighted = false }: CascadeStepProps) {
  return (
    <div className={cn("flex min-w-0 flex-1 flex-col gap-1 rounded-tile px-3 py-2.5", isHighlighted ? "border border-lilac/40 bg-lilac/12" : "glass-panel")}>
      <span className="flex items-center gap-1.5 text-[11px] text-text-muted">
        {swatch ? <span aria-hidden className={cn("size-2 shrink-0 rounded-full", swatch)} /> : null}
        <span className="truncate">{label}</span>
      </span>
      <span className={cn("truncate text-[15px] font-extralight tabular-nums", isHighlighted ? "text-lilac" : "text-text-primary")}>{value}</span>
    </div>
  );
}
