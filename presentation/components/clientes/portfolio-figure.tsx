import type { PortfolioFigureProps } from "@/types/client.types";
import { cn } from "@/utils/cn";

/** Cifra de la composición de la cartera: el número en peso fino y su etiqueta. */
export function PortfolioFigure({ value, label, dot }: PortfolioFigureProps) {
  return (
    <li className="flex min-w-[120px] flex-1 flex-col gap-1.5 border-l border-border px-5 py-1">
      <span className="flex items-center gap-2">
        <span aria-hidden className={cn("size-2 shrink-0 rounded-pill", dot)} />
        <span className="text-[34px] leading-none font-extralight text-text-primary tabular-nums">
          {value}
        </span>
      </span>
      <span className="text-xs font-normal text-text-muted">{label}</span>
    </li>
  );
}
