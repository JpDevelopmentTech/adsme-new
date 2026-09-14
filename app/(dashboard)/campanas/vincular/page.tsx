import type { Metadata } from "next";
import { LINK_CAMPAIGN_COPY } from "@/constants/link-campaign.constants";
import { CAMPAIGNS_ROUTE } from "@/constants/routes.constants";
import { DEFAULT_CAMPAIGN_LIST_QUERY } from "@/domain/entities/campaign";
import { DEFAULT_JOB_LIST_QUERY } from "@/domain/entities/job-query";
import { createListCampaigns } from "@/domain/use-cases/list-campaigns";
import { createListJobs } from "@/domain/use-cases/list-jobs";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { LinkCampaignBoard } from "@/presentation/components/campanas/link-campaign-board";
import { BackLink } from "@/presentation/components/ui/back-link";
import { toLinkableCampaigns } from "@/utils/to-linkable-campaigns";

export const metadata: Metadata = { title: "Vincular campaña · adsme" };

/** Pantalla `B8 · Vincular campaña`. */
export default async function VincularCampanaPage() {
  const supabase = await createServerSupabaseClient();

  const [campaigns, connections, jobs] = await Promise.all([
    createListCampaigns(createSupabaseCampaignRepository(supabase))(
      DEFAULT_CAMPAIGN_LIST_QUERY,
    ),
    createSupabaseConnectionRepository(supabase).listConnections(),
    createListJobs(createSupabaseJobRepository(supabase))(DEFAULT_JOB_LIST_QUERY),
  ]);

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <BackLink href={CAMPAIGNS_ROUTE} label={LINK_CAMPAIGN_COPY.back} />
        <h1 className="font-display text-[26px] font-bold text-text-primary">
          {LINK_CAMPAIGN_COPY.title}
        </h1>
        <p className="text-[13px] text-text-secondary">
          {LINK_CAMPAIGN_COPY.subtitle}
        </p>
      </div>

      <LinkCampaignBoard
        campaigns={toLinkableCampaigns(campaigns, connections)}
        connections={connections}
        jobOptions={jobs.map((job) => ({
          value: job.id,
          label: `${job.title} · ${job.artistName}`,
        }))}
      />
    </>
  );
}
