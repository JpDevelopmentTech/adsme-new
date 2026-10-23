import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { PLATFORM_OF_CONNECTION } from "@/constants/platform-labels.constants";
import { ADS_TAB_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { jobCampaignsRoute } from "@/constants/routes.constants";
import { PlatformLogo } from "@/presentation/components/brand/platform-logo";
import { CampaignStateChip } from "@/presentation/components/campanas/campaign-state-chip";
import type { CampaignSpendRowProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatMoney } from "@/utils/format-money";
import { NOMINA_ROW_CLASSES, NOMINA_TD_CLASSES } from "@/utils/nomina-table-styles";
import { resolveCampaignState } from "@/utils/resolve-campaign-state";

/** Una campaña del artista: gasto en pesos y, si era en dólares, el original con su TRM. */
export function CampaignSpendRow({ campaign, isReadOnly }: CampaignSpendRowProps) {
  const isForeign = campaign.spend.currency !== "COP";
  const original = formatMoney(campaign.spend.amount, campaign.spend.currency);
  const detail = !isForeign ? null : campaign.usdCopRate === null ? ADS_TAB_COPY.notConverted : ADS_TAB_COPY.converted(original, formatExactCurrency(campaign.usdCopRate));

  return (
    <tr className={NOMINA_ROW_CLASSES}>
      <td className={cn(NOMINA_TD_CLASSES, "whitespace-normal")}>
        <p className="font-normal text-text-primary">{campaign.campaignName}</p>
        <p className="pt-0.5 text-xs text-text-muted">{campaign.jobTitle}</p>
      </td>
      <td className={cn(NOMINA_TD_CLASSES, "text-center")}>
        <span className="inline-flex justify-center">
          <PlatformLogo platform={PLATFORM_OF_CONNECTION[campaign.platform]} size={22} />
        </span>
      </td>
      <td className={cn(NOMINA_TD_CLASSES, "text-right")}>
        <p className="font-normal text-text-primary">{campaign.spendCop === null ? original : formatExactCurrency(campaign.spendCop)}</p>
        {detail ? <p className={cn("pt-0.5 text-xs", campaign.spendCop === null ? "text-warning" : "text-text-muted")}>{detail}</p> : null}
      </td>
      <td className={cn(NOMINA_TD_CLASSES, "text-center")}>
        <CampaignStateChip state={resolveCampaignState(campaign.campaignStatus, null, "")} />
      </td>
      {isReadOnly ? null : (
        <td className={cn(NOMINA_TD_CLASSES, "text-center")}>
          <Link
            href={jobCampaignsRoute(campaign.jobId)}
            aria-label={ADS_TAB_COPY.openJob(campaign.jobTitle)}
            title={ADS_TAB_COPY.openJob(campaign.jobTitle)}
            className="inline-grid size-7 place-items-center rounded-[9px] text-text-secondary transition-colors hover:bg-g-100 hover:text-lilac focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
          >
            <ExternalLink size={15} strokeWidth={1.5} aria-hidden />
          </Link>
        </td>
      )}
    </tr>
  );
}
