import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { IMPORTED_CAMPAIGNS_COPY } from "@/constants/connections.constants";
import { CAMPAIGNS_ROUTE } from "@/constants/routes.constants";
import { ImportedCampaignRow } from "@/presentation/components/conexiones/imported-campaign-row";
import type { ImportedCampaignsPanelProps } from "@/types/connections.types";

const COLUMNS = [
  IMPORTED_CAMPAIGNS_COPY.columns.campaign,
  IMPORTED_CAMPAIGNS_COPY.columns.account,
  IMPORTED_CAMPAIGNS_COPY.columns.job,
  IMPORTED_CAMPAIGNS_COPY.columns.spend,
  IMPORTED_CAMPAIGNS_COPY.columns.synced,
];

/** Lo último que ha entrado por las conexiones, y a qué trabajo alimenta. */
export function ImportedCampaignsPanel({
  campaigns,
}: ImportedCampaignsPanelProps) {
  if (campaigns.length === 0) return null;

  return (
    <section className="flex flex-col gap-3.5">
      <header className="flex items-center justify-between gap-4">
        <h2 className="font-display text-[17px] font-bold text-text-primary">
          {IMPORTED_CAMPAIGNS_COPY.title}
        </h2>

        <Link
          href={CAMPAIGNS_ROUTE}
          className="flex items-center gap-1.5 rounded-sm text-[13px] font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none"
        >
          {IMPORTED_CAMPAIGNS_COPY.seeAll}
          <ArrowRight size={15} className="text-text-muted" aria-hidden />
        </Link>
      </header>

      <div className="overflow-x-auto rounded-card border border-border bg-card">
        <table className="w-full min-w-[820px] border-collapse">
          <thead className="border-b border-border bg-surface">
            <tr className="text-left text-[11px] font-bold tracking-[0.5px] text-text-muted">
              {COLUMNS.map((column) => (
                <th key={column} className="px-[18px] py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <ImportedCampaignRow key={campaign.id} campaign={campaign} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
