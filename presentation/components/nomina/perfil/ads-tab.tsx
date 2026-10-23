import { ADS_TAB_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { NominaKpiCard } from "@/presentation/components/nomina/nomina-kpi-card";
import { CampaignSpendPanel } from "@/presentation/components/nomina/perfil/campaign-spend-panel";
import type { AdsTabProps } from "@/types/nomina-perfil.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/**
 * Pestaña Ads: recaudado − gastado = restante. Lo gastado suma los gastos con
 * destino Ads y lo que gastaron las campañas de AdsME del artista.
 */
export function AdsTab({ raised, spent, campaignSpent, campaigns, isReadOnly = false }: AdsTabProps) {
  const spentNote = campaignSpent > 0 ? ADS_TAB_COPY.spentDetail(formatExactCurrency(spent - campaignSpent), formatExactCurrency(campaignSpent)) : ADS_TAB_COPY.spentNote;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <NominaKpiCard label={ADS_TAB_COPY.raised} value={formatExactCurrency(raised)} note={ADS_TAB_COPY.raisedNote} />
        <NominaKpiCard label={ADS_TAB_COPY.spent} value={formatExactCurrency(spent)} note={spentNote} />
        <NominaKpiCard label={ADS_TAB_COPY.left} value={formatExactCurrency(raised - spent)} note={ADS_TAB_COPY.leftNote} valueClassName="text-lilac" />
      </div>
      <CampaignSpendPanel campaigns={campaigns} isReadOnly={isReadOnly} />
    </>
  );
}
