import { Megaphone } from "lucide-react";
import { ADS_COLUMNS, ADS_LINK_COLUMN } from "@/constants/nomina-perfil-columns.constants";
import { ADS_TAB_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import { CampaignSpendRow } from "@/presentation/components/nomina/perfil/campaign-spend-row";
import { EmptyTablePanel } from "@/presentation/components/nomina/perfil/empty-table-panel";
import { UnconvertedSpendNote } from "@/presentation/components/nomina/perfil/unconverted-spend-note";
import type { CampaignSpendPanelProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";
import { NOMINA_TABLE_SCROLL_CLASSES, NOMINA_TH_CLASSES } from "@/utils/nomina-table-styles";

const ALIGN_CLASSES = { left: "text-left", right: "text-right", center: "text-center" } as const;

/** Campañas de AdsME del artista con lo que gastaron desde que cuentan para Nómina. */
export function CampaignSpendPanel({ campaigns, isReadOnly }: CampaignSpendPanelProps) {
  const columns = isReadOnly ? ADS_COLUMNS : [...ADS_COLUMNS, ADS_LINK_COLUMN];
  const copy = { title: ADS_TAB_COPY.campaignsTitle, subtitle: ADS_TAB_COPY.campaignsSubtitle };

  if (campaigns.length === 0) {
    return <EmptyTablePanel {...copy} columns={columns} icon={Megaphone} emptyTitle={ADS_TAB_COPY.emptyTitle} emptyDescription={ADS_TAB_COPY.emptyDescription} />;
  }

  return (
    <NominaPanel isThick {...copy}>
      <UnconvertedSpendNote campaigns={campaigns} />
      <div className={NOMINA_TABLE_SCROLL_CLASSES}>
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th key={column.label} scope="col" className={cn(NOMINA_TH_CLASSES, ALIGN_CLASSES[column.align ?? "left"])}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <CampaignSpendRow key={campaign.campaignId} campaign={campaign} isReadOnly={isReadOnly} />
            ))}
          </tbody>
        </table>
      </div>
    </NominaPanel>
  );
}
