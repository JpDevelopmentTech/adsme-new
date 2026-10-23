import { FINANCE_EMPTY_COPY as EMPTY, FINANCE_FLOW_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import { CashFlowPanel } from "@/presentation/components/nomina/finanzas/cash-flow-panel";
import { FinanceEmptyNote } from "@/presentation/components/nomina/finanzas/finance-empty-note";
import { PerHundredPanel } from "@/presentation/components/nomina/finanzas/per-hundred-panel";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import type { FinanceTabProps } from "@/types/nomina-finanzas-props.types";
import { buildPerHundred } from "@/utils/build-per-hundred";
import { buildSankeyGraph } from "@/utils/build-sankey-graph";
import { formatPeriodRange } from "@/utils/format-period-range";
import { layoutSankey } from "@/utils/layout-sankey";
import { toFinanceFigures } from "@/utils/to-finance-figures";

/**
 * Flujo de caja: el Sankey ya colocado en el servidor para las dos formas de
 * agrupar los orígenes, y el reparto de cada $100 que entran. Sin ingresos en
 * el periodo no hay flujo que dibujar.
 */
export function CashFlowTab({ finance }: FinanceTabProps) {
  const figures = toFinanceFigures(finance.totals);
  const periodLabel = formatPeriodRange(finance.fromMonth, finance.toMonth);

  if (figures.income <= 0) {
    return (
      <NominaPanel title={COPY.title} subtitle={`${COPY.subtitleLead} · ${periodLabel}`}>
        <FinanceEmptyNote title={EMPTY.noFlow} text={EMPTY.flow} />
      </NominaPanel>
    );
  }

  const layouts = {
    concepto: layoutSankey(buildSankeyGraph(finance, "concepto")),
    artista: layoutSankey(buildSankeyGraph(finance, "artista")),
  };

  return (
    <>
      <CashFlowPanel layouts={layouts} periodLabel={periodLabel} />
      <PerHundredPanel parts={buildPerHundred(figures)} income={figures.income} />
    </>
  );
}
