import { ChevronRight, Unlink } from "lucide-react";
import Link from "next/link";
import {
  IMPORTED_CAMPAIGNS_COPY,
  IMPORTED_TABLE_WIDTHS,
} from "@/constants/connections.constants";
import { CAMPAIGNS_ROUTE } from "@/constants/routes.constants";
import { ImportedCampaignRow } from "@/presentation/components/conexiones/imported-campaign-row";
import type { ImportedCampaignsPanelProps } from "@/types/connections.types";

const COLUMNS = [
  { label: IMPORTED_CAMPAIGNS_COPY.columns.campaign, align: "text-left" },
  { label: IMPORTED_CAMPAIGNS_COPY.columns.account, align: "text-left" },
  { label: IMPORTED_CAMPAIGNS_COPY.columns.job, align: "text-left" },
  { label: IMPORTED_CAMPAIGNS_COPY.columns.spend, align: "text-right" },
  { label: IMPORTED_CAMPAIGNS_COPY.columns.synced, align: "text-right" },
];

const HEADER_CLASSES =
  "py-[9px] text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase";

/**
 * Lo último que ha entrado por las conexiones. Las campañas sin trabajo son lo
 * único accionable de la tabla, así que se cuentan en la cabecera: son datos
 * que ya están dentro pero todavía no suman en ningún reporte.
 */
export function ImportedCampaignsPanel({
  campaigns,
}: ImportedCampaignsPanelProps) {
  if (campaigns.length === 0) return null;

  const unlinked = campaigns.filter(
    (campaign) => campaign.jobLabel === null,
  ).length;

  return (
    <section className="glass-panel flex flex-col overflow-hidden rounded-card">
      <header className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div className="flex min-w-0 flex-col gap-[3px]">
          <h2 className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
            {IMPORTED_CAMPAIGNS_COPY.title}
          </h2>
          <p className="text-[12px] text-text-secondary">
            {IMPORTED_CAMPAIGNS_COPY.subtitle}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          {unlinked > 0 ? (
            <span className="flex items-center gap-[7px] rounded-pill border border-warning/25 bg-warning/8 px-[11px] py-[5px] text-[11.5px] text-warning">
              <Unlink size={13} strokeWidth={1.5} aria-hidden />
              {IMPORTED_CAMPAIGNS_COPY.unlinkedCount(unlinked)}
            </span>
          ) : null}

          <Link
            href={CAMPAIGNS_ROUTE}
            className="flex items-center gap-1 rounded-sm text-[12px] font-normal text-text-primary transition-opacity duration-150 hover:opacity-60 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
          >
            {IMPORTED_CAMPAIGNS_COPY.seeAll}
            <ChevronRight size={13} strokeWidth={1.5} aria-hidden />
          </Link>
        </div>
      </header>

      <div className="h-px bg-border/60" />

      <div className="overflow-x-auto">
        <div className="min-w-[860px]">
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              {IMPORTED_TABLE_WIDTHS.map((width) => (
                <col key={width} style={{ width }} />
              ))}
            </colgroup>

            <thead className="bg-g-100">
              <tr>
                {COLUMNS.map((column, index) => (
                  <th
                    key={column.label}
                    className={`${HEADER_CLASSES} ${column.align} ${
                      index === 0 ? "pr-4 pl-5" : ""
                    } ${index === COLUMNS.length - 1 ? "pr-5" : "pr-4"}`}
                  >
                    {column.label}
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
      </div>
    </section>
  );
}
