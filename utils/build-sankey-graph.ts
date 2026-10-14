import { SANKEY_COLORS } from "@/constants/nomina-sankey.constants";
import type { NominaFinance } from "@/domain/entities/nomina-finance";
import type { SankeyGraph, SankeyLinkSpec, SankeyMode, SankeyNodeSpec } from "@/types/nomina-sankey.types";
import { buildSankeyOrigins } from "@/utils/build-sankey-origins";
import { toFinanceFigures } from "@/utils/to-finance-figures";

/**
 * Flujo de caja como grafo: orígenes → Ingresos → Servicio / Utilidad bruta /
 * Inversión → Impuestos y Utilidad neta, o Consumido y Por ejecutar en Ads.
 * Lo consumido nunca supera la Inversión del periodo. Se omiten las ramas en cero.
 */
export function buildSankeyGraph(finance: NominaFinance, mode: SankeyMode): SankeyGraph {
  const figures = toFinanceFigures(finance.totals);
  const consumed = Math.min(finance.consumedAds, figures.investment);
  const origins = buildSankeyOrigins(finance, mode);

  const flow: SankeyNodeSpec[] = [
    ...origins,
    { id: "ingresos", label: "Ingresos", column: 1, color: SANKEY_COLORS.income, value: figures.income },
    { id: "servicio", label: "Servicio", column: 2, color: SANKEY_COLORS.service, value: figures.service },
    { id: "utilidad", label: "Utilidad bruta", column: 2, color: SANKEY_COLORS.profit, value: figures.profit },
    { id: "inversion", label: "Inversión", column: 2, color: SANKEY_COLORS.investment, value: figures.investment },
    { id: "impuestos", label: "Impuestos (30%)", column: 3, color: SANKEY_COLORS.taxes, value: figures.taxes, parent: "utilidad" },
    { id: "neta", label: "Utilidad neta", column: 3, color: SANKEY_COLORS.netProfit, value: figures.netProfit, parent: "utilidad" },
    { id: "consumido", label: "Consumido en Ads", column: 3, color: SANKEY_COLORS.consumed, value: consumed, parent: "inversion" },
    { id: "pendiente", label: "Por ejecutar en Ads", column: 3, color: SANKEY_COLORS.pending, value: figures.investment - consumed, parent: "inversion" },
  ];
  const nodes = flow.filter((node) => node.value > 0);

  const links: SankeyLinkSpec[] = [
    ...origins.map((node) => ({ source: node.id, target: "ingresos", value: node.value })),
    ...nodes.filter((node) => node.column >= 2).map((node) => ({ source: node.parent ?? "ingresos", target: node.id, value: node.value })),
  ];

  return { nodes, links, total: figures.income };
}
