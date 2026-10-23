import type { CollapsedChipProps } from "@/types/quote-platforms.types";

/** Chip del resumen plegado: «**etiqueta** monto» y el % de la línea cuando hay varias. */
export function CollapsedChip({ label, amount, pct }: CollapsedChipProps) {
  return (
    <li className="flex min-w-0 items-baseline gap-1.5 rounded-pill border border-border bg-surface px-3 py-1.5 text-[13px]">
      <strong className="truncate font-normal text-text-primary">{label}</strong>
      <span className="text-text-secondary tabular-nums">{amount}</span>
      {pct ? <span className="text-text-muted tabular-nums">{pct}</span> : null}
    </li>
  );
}
