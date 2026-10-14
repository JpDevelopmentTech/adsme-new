import { FINANCE_TAB_COPY } from "@/constants/nomina-perfil-copy.constants";
import { DetailBox } from "@/presentation/components/nomina/perfil/detail-box";
import { SplitBar } from "@/presentation/components/nomina/split-bar";
import type { MovementDetailProps } from "@/types/nomina-perfil.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMonthShort, formatShortDate } from "@/utils/format-nomina-dates";

/** Detalle económico de un movimiento: su reparto en barra, en cajas y sus datos. */
export function MovementDetail({ movement }: MovementDetailProps) {
  const { split, amount } = movement;
  const columns = FINANCE_TAB_COPY.columns;
  const labels = FINANCE_TAB_COPY.detailLabels;
  const facts = [
    `${columns.eventDate}: ${formatShortDate(movement.eventDate)}`,
    `${columns.incomeDate}: ${formatShortDate(movement.incomeDate)}`,
    `${columns.assignedMonth}: ${formatMonthShort(movement.assignedMonth)}`,
  ];
  const notes = [
    movement.description ? `${FINANCE_TAB_COPY.description}: ${movement.description}` : null,
    movement.document ? `${FINANCE_TAB_COPY.document}: ${movement.document}` : null,
  ].filter((note): note is string => note !== null);

  return (
    <div className="flex flex-col gap-4 rounded-md border border-border bg-black/15 p-[18px]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] tracking-[1.2px] text-text-muted uppercase">{FINANCE_TAB_COPY.detailTitle}</p>
        <p className="text-xs text-text-muted">
          {FINANCE_TAB_COPY.detailAmount} <span className="ml-1 text-[13px] font-normal text-text-primary tabular-nums">{formatExactCurrency(amount)}</span>
        </p>
      </div>
      <SplitBar
        label={`Reparto de ${formatExactCurrency(amount)}`}
        parts={[
          { key: "servicio", amount: split.service },
          { key: "utilidadNeta", amount: split.netProfit },
          { key: "impuestos", amount: split.taxes },
          { key: "inversion", amount: split.investment },
        ]}
      />
      <div className="flex flex-wrap gap-2.5">
        <DetailBox bucket="servicio" label={labels.service} amount={split.service} total={amount} />
        <DetailBox bucket="utilidad" label={labels.profit} amount={split.profit} total={amount} />
        <DetailBox bucket="impuestos" label={labels.taxes} amount={split.taxes} total={amount} />
        <DetailBox bucket="utilidadNeta" label={labels.netProfit} amount={split.netProfit} total={amount} />
        <DetailBox bucket="inversion" label={labels.investment} amount={split.investment} total={amount} />
      </div>
      {[facts, notes].map((line) =>
        line.length > 0 ? (
          <p key={line[0]} className="flex flex-wrap gap-x-5 gap-y-1 text-[11.5px] text-text-muted">
            {line.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </p>
        ) : null,
      )}
    </div>
  );
}
