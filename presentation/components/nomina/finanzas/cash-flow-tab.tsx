import { CashFlowPanel } from "@/presentation/components/nomina/finanzas/cash-flow-panel";
import { PerHundredPanel } from "@/presentation/components/nomina/finanzas/per-hundred-panel";
import type { FinanceTabProps } from "@/types/nomina-finanzas-props.types";
import { buildPerHundred } from "@/utils/build-per-hundred";
import { buildSankeyGraph } from "@/utils/build-sankey-graph";
import { formatPeriodRange } from "@/utils/format-period-range";
import { layoutSankey } from "@/utils/layout-sankey";
import { toFinanceFigures } from "@/utils/to-finance-figures";

/**
 * Flujo de caja: el Sankey ya colocado en el servidor para las dos formas de
 * agrupar los orígenes, y el reparto de cada $100 que entran.
 */
export function CashFlowTab({ finance }: FinanceTabProps) {
  const figures = toFinanceFigures(finance.totals);
  const layouts = {
    concepto: layoutSankey(buildSankeyGraph(finance, "concepto")),
    artista: layoutSankey(buildSankeyGraph(finance, "artista")),
  };

  return (
    <>
      <CashFlowPanel layouts={layouts} periodLabel={formatPeriodRange(finance.fromMonth, finance.toMonth)} />
      {figures.income > 0 ? <PerHundredPanel parts={buildPerHundred(figures)} income={figures.income} /> : null}
    </>
  );
}
