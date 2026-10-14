import { Megaphone } from "lucide-react";
import { ADS_COLUMNS } from "@/constants/nomina-perfil-columns.constants";
import { ADS_TAB_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { NominaKpiCard } from "@/presentation/components/nomina/nomina-kpi-card";
import { EmptyTablePanel } from "@/presentation/components/nomina/perfil/empty-table-panel";
import type { AdsTabProps } from "@/types/nomina-perfil.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/** Pestaña Ads: recaudado − gastado = restante, y el historial de campañas (maqueta). */
export function AdsTab({ raised, spent }: AdsTabProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <NominaKpiCard label={ADS_TAB_COPY.raised} value={formatExactCurrency(raised)} note={ADS_TAB_COPY.raisedNote} />
        <NominaKpiCard label={ADS_TAB_COPY.spent} value={formatExactCurrency(spent)} note={ADS_TAB_COPY.spentNote} />
        <NominaKpiCard label={ADS_TAB_COPY.left} value={formatExactCurrency(raised - spent)} note={ADS_TAB_COPY.leftNote} valueClassName="text-lilac" />
      </div>
      <EmptyTablePanel
        title={ADS_TAB_COPY.campaignsTitle}
        subtitle={ADS_TAB_COPY.campaignsSubtitle}
        columns={ADS_COLUMNS}
        icon={Megaphone}
        emptyTitle={ADS_TAB_COPY.emptyTitle}
        emptyDescription={ADS_TAB_COPY.emptyDescription}
      />
    </>
  );
}
