import {
  PLATFORM_LABELS,
  PLATFORM_OF_CONNECTION,
} from "@/constants/platform-labels.constants";
import type { Campaign } from "@/domain/entities/campaign";
import type { JobListing } from "@/domain/entities/job-listing";
import type { JobPlatform } from "@/domain/entities/job";
import type { ImportedCampaign } from "@/domain/entities/platform-connection";
import { formatRelativeTime } from "@/utils/format-relative-time";

const ACCOUNT_NAMES: Record<JobPlatform, string> = {
  youtube: "Google Ads",
  meta: "Meta Ads",
  tiktok: "TikTok Ads",
};

/**
 * Últimas campañas importadas, con el trabajo al que alimentan. Una campaña sin
 * trabajo asociado no llega a ningún reporte, así que se marca en vez de ocultarse.
 */
export function buildImportedCampaigns(
  campaigns: Campaign[],
  jobs: JobListing[],
  nowIso: string,
  limit: number,
): ImportedCampaign[] {
  return campaigns.slice(0, limit).map((campaign) => {
    const platform = PLATFORM_OF_CONNECTION[campaign.platform];
    const job = jobs.find((item) => item.id === campaign.jobId);

    return {
      id: campaign.id,
      name: campaign.name,
      platform,
      accountName: ACCOUNT_NAMES[platform] ?? PLATFORM_LABELS[platform],
      jobLabel: job ? `${job.title} · ${job.artistName}` : null,
      spend: campaign.spend,
      syncedAtLabel: formatRelativeTime(campaign.syncedAt, nowIso),
    };
  });
}
