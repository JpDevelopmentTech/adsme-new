import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JOB_DETAIL_COPY } from "@/constants/job-detail.constants";
import { PLATFORM_TABS } from "@/constants/link-campaign.constants";
import { JOBS_ROUTE } from "@/constants/routes.constants";
import { createGetClient } from "@/domain/use-cases/get-client";
import { createGetJob } from "@/domain/use-cases/get-job";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { JobEvolutionCard } from "@/presentation/components/trabajo-detalle/job-evolution-card";
import { JobHero } from "@/presentation/components/trabajo-detalle/job-hero";
import { JobKpis } from "@/presentation/components/trabajo-detalle/job-kpis";
import { JobPlatformCard } from "@/presentation/components/trabajo-detalle/job-platform-card";
import { BackLink } from "@/presentation/components/ui/back-link";
import { buildJobMetrics } from "@/utils/build-job-metrics";

export async function generateMetadata({
  params,
}: PageProps<"/trabajos/[id]">): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const job = await createGetJob(createSupabaseJobRepository(supabase))(id);

  return { title: job ? `${job.title} · adsme` : "Trabajo · adsme" };
}

/** Pantalla `B7 · Trabajo Detalle`: métricas del lanzamiento por plataforma. */
export default async function TrabajoDetallePage({
  params,
}: PageProps<"/trabajos/[id]">) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const job = await createGetJob(createSupabaseJobRepository(supabase))(id);

  if (!job) notFound();

  const [client, campaigns] = await Promise.all([
    createGetClient(createSupabaseClientRepository(supabase))(job.clientId),
    createSupabaseCampaignRepository(supabase).listJobCampaigns(job.id),
  ]);
  const now = new Date().toISOString();

  return (
    <>
      <BackLink href={JOBS_ROUTE} label={`${JOB_DETAIL_COPY.back} / ${job.title}`} />

      <JobHero job={job} clientName={client?.name ?? ""} now={now} />

      <JobKpis metrics={buildJobMetrics(campaigns)} />

      <div className="flex flex-col gap-[18px] xl:flex-row">
        {PLATFORM_TABS.map((tab) => (
          <JobPlatformCard
            key={tab.platform}
            platform={tab.platform}
            campaigns={campaigns.filter(
              (campaign) => campaign.platform === tab.platform,
            )}
            now={now}
          />
        ))}
      </div>

      <JobEvolutionCard />
    </>
  );
}
