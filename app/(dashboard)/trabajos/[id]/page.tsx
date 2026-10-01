import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JOB_DETAIL_COPY } from "@/constants/job-detail.constants";
import { PLATFORM_TABS } from "@/constants/link-campaign.constants";
import { JOBS_ROUTE } from "@/constants/routes.constants";
import { createGetClient } from "@/domain/use-cases/get-client";
import { createGetJob } from "@/domain/use-cases/get-job";
import { createListJobDailyPoints } from "@/domain/use-cases/list-job-daily-points";
import { createSupabaseCampaignDailyRepository } from "@/infrastructure/repositories/supabase-campaign-daily-repository";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { JobEvolutionCard } from "@/presentation/components/trabajo-detalle/job-evolution-card";
import { JobHero } from "@/presentation/components/trabajo-detalle/job-hero";
import { JobKpis } from "@/presentation/components/trabajo-detalle/job-kpis";
import { JobPlatformCard } from "@/presentation/components/trabajo-detalle/job-platform-card";
import { AmbientGlow } from "@/presentation/components/ui/ambient-glow";
import { Breadcrumb } from "@/presentation/components/ui/breadcrumb";
import { buildJobMetrics } from "@/utils/build-job-metrics";
import { buildReportGrowth } from "@/utils/build-report-growth";
import { formatJobPeriod } from "@/utils/format-job-period";
import { getJobEvolutionPeriod } from "@/utils/get-job-evolution-period";
import { toIsoDate } from "@/utils/month-range";

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

  const today = toIsoDate(new Date());
  const evolution = getJobEvolutionPeriod(job, today);
  const [client, campaigns, daily] = await Promise.all([
    createGetClient(createSupabaseClientRepository(supabase))(job.clientId),
    createSupabaseCampaignRepository(supabase).listJobCampaigns(job.id),
    createListJobDailyPoints(createSupabaseCampaignDailyRepository(supabase))(
      job.id,
      { from: evolution.startsOn, to: evolution.endsOn },
    ),
  ]);
  const now = new Date().toISOString();

  return (
    <>
      <AmbientGlow imageUrl={job.coverUrl} />
      <Breadcrumb backHref={JOBS_ROUTE} backLabel={JOB_DETAIL_COPY.back} current={job.title} />

      <JobHero job={job} clientName={client?.name ?? ""} now={now} />

      <JobKpis metrics={buildJobMetrics(campaigns)} />

      <div className="flex flex-col gap-4 xl:flex-row">
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

      <JobEvolutionCard
        growth={buildReportGrowth(daily, evolution, today)}
        period={formatJobPeriod(evolution.startsOn, evolution.endsOn)}
      />
    </>
  );
}
