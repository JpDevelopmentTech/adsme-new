import type { Campaign } from "@/domain/entities/campaign";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatExactNumber } from "@/utils/format-exact-number";

/**
 * Los tres KPI de la maqueta del reporte. Salen de las campañas vinculadas al
 * trabajo, así que la vista previa refleja datos reales cuando los hay.
 */
export function buildReportKpis(campaigns: Campaign[]) {
  const sum = (pick: (campaign: Campaign) => number) =>
    campaigns.reduce((total, campaign) => total + pick(campaign), 0);

  return [
    { value: formatExactNumber(sum((c) => c.videoPlays)), label: "Vistas" },
    { value: formatExactNumber(sum((c) => c.reach)), label: "Alcance" },
    { value: formatExactCurrency(sum((c) => c.spend)), label: "Inversión" },
  ];
}
