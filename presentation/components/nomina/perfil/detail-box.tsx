import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { FINANCE_TAB_COPY } from "@/constants/nomina-perfil-copy.constants";
import type { DetailBoxProps } from "@/types/nomina-perfil.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatPercent } from "@/utils/format-percent";
import { shareOf } from "@/utils/share-of";

/** Caja de una bolsa del detalle económico: rótulo en su color, importe y su parte del monto. */
export function DetailBox({ bucket, label, amount, total }: DetailBoxProps) {
  return (
    <div className="flex min-w-[130px] flex-1 flex-col gap-1.5 rounded-md border border-border bg-surface px-3.5 py-3">
      <p className="text-[10px] font-normal tracking-[1px] uppercase" style={{ color: BUCKET_META[bucket].color }}>
        {label}
      </p>
      <p className="text-base font-light text-text-primary tabular-nums">{formatExactCurrency(amount)}</p>
      <p className="text-[11px] text-text-muted tabular-nums">
        {formatPercent(shareOf(amount, total) ?? 0)} {FINANCE_TAB_COPY.ofAmount}
      </p>
    </div>
  );
}
