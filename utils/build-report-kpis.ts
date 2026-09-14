import type { Campaign } from "@/domain/entities/campaign";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

const COMPACT = new Intl.NumberFormat("es-CO", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/**
 * Los tres KPI de la maqueta del reporte. Salen de las campañas vinculadas al
 * trabajo, así que la vista previa refleja datos reales cuando los hay.
 */
export function buildReportKpis(campaigns: Campaign[]) {
  const sum = (pick: (campaign: Campaign) => number) =>
    campaigns.reduce((total, campaign) => total + pick(campaign), 0);

  return [
    { value: COMPACT.format(sum((c) => c.videoPlays)), label: "Vistas" },
    { value: COMPACT.format(sum((c) => c.reach)), label: "Alcance" },
    { value: formatCompactCurrency(sum((c) => c.spend)), label: "Inversión" },
  ];
}
