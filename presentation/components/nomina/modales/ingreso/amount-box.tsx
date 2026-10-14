import { Pencil } from "lucide-react";
import { MoneyInput } from "@/presentation/components/nomina/modales/campos/money-input";
import type { AmountBoxProps } from "@/types/nomina-modales-ingreso.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/** Caja de una bolsa: rótulo en su color, importe (editable o no) y su % del monto. */
export function AmountBox({ id, label, color, value, share, onChange, editLabel }: AmountBoxProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5 rounded-md border border-border bg-card-elevated px-3.5 py-3">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={onChange ? id : undefined} className="text-[10px] font-normal tracking-[0.12em] uppercase" style={{ color }}>
          {label}
        </label>
        {onChange ? <Pencil size={12} strokeWidth={1.5} aria-hidden className="text-text-muted" /> : null}
      </div>
      {onChange ? (
        <MoneyInput id={id} value={value} onChange={(next) => onChange(next ?? 0)} ariaLabel={editLabel} isBare />
      ) : (
        <span className="text-[15px] font-light text-text-primary tabular-nums">{formatExactCurrency(value)}</span>
      )}
      <span className="text-[11px] font-light text-text-muted">{share}</span>
    </div>
  );
}
