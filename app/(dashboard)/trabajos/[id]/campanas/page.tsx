import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLATFORM_TABS } from "@/constants/link-campaign.constants";
import { JOB_STEP_COPY, JOB_WIZARD_COPY, STEP_TWO_COPY } from "@/constants/job-wizard.constants";
import { editJobRoute, jobReportRoute } from "@/constants/routes.constants";
import { DEFAULT_CAMPAIGN_LIST_QUERY } from "@/domain/entities/campaign";
import { createGetClient } from "@/domain/use-cases/get-client";
import { createGetJob } from "@/domain/use-cases/get-job";
import { createListCampaigns } from "@/domain/use-cases/list-campaigns";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { JobWizardLayout } from "@/presentation/components/trabajos/wizard/job-wizard-layout";
import { JobWizardPanel } from "@/presentation/components/trabajos/wizard/job-wizard-panel";
import { PlatformCampaignRow } from "@/presentation/components/trabajos/wizard/platform-campaign-row";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import { buildWizardSummary } from "@/utils/build-wizard-summary";

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

  const client = await createGetClient(
    createSupabaseClientRepository(supabase),
  )(job.clientId);

  const linkedPlatforms = new Set(
    campaigns
      .filter((campaign) => campaign.jobId === job.id)
      .map((campaign) => campaign.platform),
  );

  return (
    <JobWizardLayout
      currentStep={2}
      summary={buildWizardSummary(job, client?.name ?? null, linkedPlatforms.size)}
    >
      <JobWizardPanel
        title={JOB_STEP_COPY.two.title}
        subtitle={JOB_STEP_COPY.two.subtitle}
        footer={
          <>
            <SecondaryLink href={editJobRoute(job.id)}>
              <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
              {JOB_WIZARD_COPY.previous}
            </SecondaryLink>

            <PrimaryLink href={jobReportRoute(job.id)}>
              {STEP_TWO_COPY.next}
              <ArrowRight size={15} strokeWidth={1.75} aria-hidden />
            </PrimaryLink>
          </>
        }
      >
        <div className="flex flex-col gap-3.5">
          {PLATFORM_TABS.map((tab) => {
            // Una plataforma puede tener varias cuentas conectadas: se busca
            // entre las campañas de todas ellas, no solo entre las de la primera.
            const accounts = connections.filter(
              (item) => item.platform === tab.platform,
            );
            const accountIds = new Set(accounts.map((account) => account.id));

            return (
              <PlatformCampaignRow
                key={tab.platform}
                jobId={job.id}
                platform={tab.platform}
                label={tab.label}
                isConnected={accounts.length > 0}
                campaigns={campaigns.filter((campaign) =>
                  accountIds.has(campaign.connectionId),
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

        <p className="text-[11.5px] text-text-muted">{STEP_TWO_COPY.note}</p>
      </JobWizardPanel>
    </JobWizardLayout>
  );
}
