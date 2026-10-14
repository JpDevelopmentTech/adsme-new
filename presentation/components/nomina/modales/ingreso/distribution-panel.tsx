import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import { EDITABLE_BUCKETS } from "@/constants/nomina-modales.constants";
import { INCOME_SPLIT_COPY } from "@/constants/nomina-modales-ingreso-copy.constants";
import { InfoNote } from "@/presentation/components/nomina/modales/campos/info-note";
import { AmountBox } from "@/presentation/components/nomina/modales/ingreso/amount-box";
import { SplitBar } from "@/presentation/components/nomina/split-bar";
import type { DistributionPanelProps } from "@/types/nomina-modales-ingreso.types";
import { formatPercent } from "@/utils/format-percent";

/**
 * «Distribución automática»: la barra del reparto, tres bolsas ajustables
 * (Inversión, Servicio, Utilidad) y dos calculadas (Impuestos, Utilidad neta).
 */
export function DistributionPanel({ idPrefix, amount, split, onEdit, note }: DistributionPanelProps) {
  const share = (value: number) => INCOME_SPLIT_COPY.ofAmount(formatPercent(amount > 0 ? (value / amount) * 100 : 0));

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-sm font-light text-text-primary">{INCOME_SPLIT_COPY.distribution}</h3>
      <SplitBar
        height={6}
        label={INCOME_SPLIT_COPY.distribution}
        parts={[
          { key: "utilidadNeta", amount: split.netProfit },
          { key: "impuestos", amount: split.taxes },
          { key: "servicio", amount: split.service },
          { key: "inversion", amount: split.investment },
        ]}
      />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {EDITABLE_BUCKETS.map(({ key, bucket }) => (
          <AmountBox
            key={key}
            id={`${idPrefix}-${key}`}
            label={BUCKET_META[bucket].label}
            color={BUCKET_META[bucket].color}
            value={split[key]}
            share={share(split[key])}
            onChange={onEdit ? (value) => onEdit(key, value) : undefined}
            editLabel={INCOME_SPLIT_COPY.edit(BUCKET_META[bucket].label)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <AmountBox id={`${idPrefix}-taxes`} label={INCOME_SPLIT_COPY.taxes} color={BUCKET_META.impuestos.color} value={split.taxes} share={share(split.taxes)} />
        <AmountBox id={`${idPrefix}-net`} label={INCOME_SPLIT_COPY.netProfit} color={BUCKET_META.utilidadNeta.color} value={split.netProfit} share={share(split.netProfit)} />
      </div>
      {note ? <InfoNote>{note}</InfoNote> : null}
    </section>
  );
}
