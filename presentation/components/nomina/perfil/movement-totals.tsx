import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { FINANCE_TAB_COPY } from "@/constants/nomina-perfil-copy.constants";
import { TotalFigure } from "@/presentation/components/nomina/perfil/total-figure";
import type { MovementTotalsProps } from "@/types/nomina-perfil.types";

/** Fila de totales del desglose: cuántos movimientos y la suma de cada bolsa. */
export function MovementTotals({ totals }: MovementTotalsProps) {
  const labels = FINANCE_TAB_COPY.totalLabels;

  return (
    <div className="-mx-6 overflow-x-auto px-6">
      <p className="flex items-center gap-x-5 pt-1 text-[11.5px] whitespace-nowrap">
        <span title={`Total de ${totals.count} movimientos`} className="font-normal text-text-primary">
          {FINANCE_TAB_COPY.total} · {totals.count} {FINANCE_TAB_COPY.movementsWord}
        </span>
        <TotalFigure label={labels.amount.short} title={labels.amount.full} amount={totals.amount} />
        <TotalFigure label={labels.service.short} title={labels.service.full} amount={totals.service} color={BUCKET_META.servicio.color} />
        <TotalFigure label={labels.profit.short} title={labels.profit.full} amount={totals.profit} color={BUCKET_META.utilidad.color} />
        <TotalFigure label={labels.taxes.short} title={labels.taxes.full} amount={totals.taxes} color={BUCKET_META.impuestos.color} />
        <TotalFigure label={labels.investment.short} title={labels.investment.full} amount={totals.investment} color={BUCKET_META.inversion.color} />
      </p>
    </div>
  );
}
