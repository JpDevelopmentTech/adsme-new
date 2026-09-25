import { Link2 } from "lucide-react";
import Link from "next/link";
import {
  CAMPAIGNS_COPY,
  CAMPAIGNS_SPLIT_COPY,
} from "@/constants/campaigns.constants";
import { LINK_CAMPAIGN_ROUTE } from "@/constants/routes.constants";
import { CampaignsSplitRail } from "@/presentation/components/campanas/campaigns-split-rail";
import type { CampaignsSplitBandProps } from "@/types/campaigns-list.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/**
 * Cabecera de `B9`. Contesta «¿cuánto de lo que entró ya cuenta para alguien?»
 * sin leer una sola fila, que es lo que trae al usuario a esta pantalla: una
 * campaña sin trabajo es dinero gastado que no sale en ningún reporte.
 */
export function CampaignsSplitBand({ split }: CampaignsSplitBandProps) {
  const isClear = split.unlinkedCount === 0;

  return (
    <section className="flex flex-col gap-[18px] rounded-card bg-ink/94 px-6 py-5 shadow-lift backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-[22px]">
        <div className="flex min-w-[260px] flex-1 flex-col gap-1.5">
          <span className="text-[10px] font-medium tracking-[0.6px] text-g-500 uppercase">
            {CAMPAIGNS_SPLIT_COPY.eyebrow}
          </span>
          <h2 className="font-display text-[19px] font-normal tracking-[-0.4px] text-g-50">
            {isClear
              ? CAMPAIGNS_SPLIT_COPY.clear
              : CAMPAIGNS_SPLIT_COPY.pending(
                  formatCompactCurrency(split.unlinked),
                )}
          </h2>
          <p className="text-[12px] text-g-400">
            {isClear
              ? CAMPAIGNS_SPLIT_COPY.clearDetail(split.totalCount)
              : CAMPAIGNS_SPLIT_COPY.pendingDetail(
                  split.unlinkedCount,
                  split.totalCount,
                )}
          </p>
        </div>

        <Link
          href={LINK_CAMPAIGN_ROUTE}
          className="flex items-center gap-2 rounded-md bg-accent px-[17px] py-[11px] text-[12.5px] font-medium whitespace-nowrap text-g-50 shadow-float transition-all duration-150 hover:-translate-y-px hover:shadow-lift focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none"
        >
          <Link2 size={15} strokeWidth={1.75} aria-hidden />
          {CAMPAIGNS_COPY.linkAll}
        </Link>
      </div>

      <CampaignsSplitRail split={split} />
    </section>
  );
}
