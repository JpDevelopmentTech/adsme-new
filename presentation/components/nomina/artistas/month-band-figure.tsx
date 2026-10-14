import type { MonthBandFigureProps } from "@/types/nomina-artistas.types";

/** Cifra de la banda del mes: punto de la bolsa, rótulo, importe y nota. */
export function MonthBandFigure({ label, value, note, dotColor }: MonthBandFigureProps) {
  return (
    <li className="flex min-w-0 flex-col gap-2 lg:border-l lg:border-border lg:px-6 lg:first:border-l-0 lg:first:pl-0">
      <span className="flex items-center gap-2 text-xs text-text-secondary">
        <span aria-hidden className="size-1.5 shrink-0 rounded-pill" style={{ backgroundColor: dotColor }} />
        {label}
      </span>
      <span className="text-[26px] leading-tight font-extralight tracking-[-0.5px] text-text-primary tabular-nums">{value}</span>
      <span className="text-[11px] leading-[1.35] text-text-muted">{note}</span>
    </li>
  );
}
