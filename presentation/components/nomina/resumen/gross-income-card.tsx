import { Banknote } from "lucide-react";
import { CURRENCY_SYMBOL } from "@/constants/currency.constants";
import type { GrossIncomeCardProps } from "@/types/nomina-resumen.types";
import { formatExactNumber } from "@/utils/format-exact-number";

/**
 * Tarjeta protagonista del mes: los Ingresos Brutos con la cifra grande y el
 * símbolo atenuado, para que el número se lea antes que la moneda.
 */
export function GrossIncomeCard({ label, amount, note }: GrossIncomeCardProps) {
  return (
    <section className="glass-panel col-span-2 flex min-w-0 flex-col justify-between gap-4 rounded-card px-6 py-[22px] lg:col-span-1">
      <h3 className="flex items-center gap-2 text-[13px] font-light text-text-secondary">
        <Banknote size={15} strokeWidth={1.5} aria-hidden />
        {label}
      </h3>
      <p className="flex items-baseline gap-1.5 text-text-primary tabular-nums">
        <span className="text-xl font-extralight text-text-muted">{CURRENCY_SYMBOL}</span>
        <span className="text-[44px] leading-none font-extralight tracking-[-1.5px] sm:text-[48px]">
          {formatExactNumber(amount)}
        </span>
      </p>
      <p className="text-xs leading-[1.4] text-text-muted">{note}</p>
    </section>
  );
}
