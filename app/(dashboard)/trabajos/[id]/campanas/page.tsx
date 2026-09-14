import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLATFORM_TABS } from "@/constants/link-campaign.constants";
import {
  JOB_WIZARD_COPY,
  STEP_TWO_COPY,
} from "@/constants/job-wizard.constants";
import { JOBS_ROUTE } from "@/constants/routes.constants";
import { DEFAULT_CAMPAIGN_LIST_QUERY } from "@/domain/entities/campaign";
import { createGetJob } from "@/domain/use-cases/get-job";
import { createListCampaigns } from "@/domain/use-cases/list-campaigns";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { PlatformCampaignCard } from "@/presentation/components/trabajos/wizard/platform-campaign-card";
import { JobWizardStepper } from "@/presentation/components/trabajos/wizard/job-wizard-stepper";
import { BackLink } from "@/presentation/components/ui/back-link";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import { editJobRoute, jobLinkRoute } from "@/constants/routes.constants";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Campañas del trabajo · adsme" };

/** Pantalla `B6 · Wizard Paso 2`: asociar campañas por plataforma. */
export default async function TrabajoCampanasPage({
  params,
}: PageProps<"/trabajos/[id]/campanas">) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const [job, campaigns, connections] = await Promise.all([
    createGetJob(createSupabaseJobRepository(supabase))(id),
    createListCampaigns(createSupabaseCampaignRepository(supabase))(
      DEFAULT_CAMPAIGN_LIST_QUERY,
    ),
    createSupabaseConnectionRepository(supabase).listConnections(),
  ]);

  if (!job) notFound();

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-[5px]">
          <BackLink href={JOBS_ROUTE} label={`Trabajos / ${job.title}`} />
          <h1 className="font-display text-[26px] font-bold text-text-primary">
            {JOB_WIZARD_COPY.title}
          </h1>
        </div>
      </div>

      <JobWizardStepper currentStep={2} />

      <div className="flex flex-col gap-5 rounded-card border border-border bg-card p-7">
        <p className="text-[13px] leading-[1.4] text-text-secondary">
          {STEP_TWO_COPY.subtitle}
        </p>

        {PLATFORM_TABS.map((tab) => {
          const connection =
            connections.find((item) => item.platform === tab.platform) ?? null;

          return (
            <PlatformCampaignCard
              key={tab.platform}
              jobId={job.id}
              platform={tab.platform}
              label={tab.label}
              connection={connection}
              campaigns={campaigns.filter(
                (campaign) => campaign.connectionId === connection?.id,
              )}
              linked={campaigns.filter(
                (campaign) =>
                  campaign.jobId === job.id &&
                  campaign.platform === tab.platform,
              )}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <SecondaryLink href={editJobRoute(job.id)}>
          <ArrowLeft size={18} strokeWidth={2} aria-hidden />
          {JOB_WIZARD_COPY.previous}
        </SecondaryLink>

        <div className="flex items-center gap-2.5">
          <PrimaryLink href={jobLinkRoute(job.id)}>
            {STEP_TWO_COPY.next}
            <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </PrimaryLink>
        </div>
      </div>
    </>
  );
}
