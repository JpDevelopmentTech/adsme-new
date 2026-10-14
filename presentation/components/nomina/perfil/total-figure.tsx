import type { TotalFigureProps } from "@/types/nomina-perfil.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/** Cifra abreviada de la fila de totales, con su nombre completo en el `title`. */
export function TotalFigure({ label, title, amount, color }: TotalFigureProps) {
  return (
    <span className="flex items-baseline gap-1.5 whitespace-nowrap">
      <abbr title={title} className="no-underline" style={{ color: color ?? "var(--color-text-muted)" }}>
        {label}
      </abbr>
      <span className="font-normal text-text-primary tabular-nums">{formatExactCurrency(amount)}</span>
    </span>
  );
}
