import { formatQuoteMoney } from "@/domain/use-cases/quote/format-quote-money";
import type { QuoteMarginsRowProps } from "@/types/quote-summary.types";
import { cn } from "@/utils/cn";

/** Fila de «Tus márgenes»: plataforma, % que cobras, ganancia y servicio. */
export function QuoteMarginsRow({ name, color, pct, profit, service, currency, isTotal = false }: QuoteMarginsRowProps) {
  const cell = cn("py-2 text-right tabular-nums", isTotal ? "font-normal text-text-primary" : "text-text-secondary");

  return (
    <tr className={cn(isTotal && "border-t border-border-strong")}>
      <th scope="row" className={cn("max-w-0 py-2 pr-2 text-left font-normal", isTotal ? "text-text-primary" : "text-text-secondary")}>
        <span className="flex min-w-0 items-center gap-2">
          {color ? <span aria-hidden className="size-2 shrink-0 rounded-pill" style={{ backgroundColor: color }} /> : null}
          <span className="truncate">{name}</span>
        </span>
      </th>
      <td className={cell}>{pct}</td>
      <td className={cn(cell, profit < 0 && "text-danger")}>{formatQuoteMoney(profit, currency)}</td>
      <td className={cell}>{formatQuoteMoney(service, currency)}</td>
    </tr>
  );
}
