import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { jobCampaignsRoute } from "@/constants/routes.constants";
import { DEFAULT_CAMPAIGN_LIST_QUERY } from "@/domain/entities/campaign";
import { createGetClient } from "@/domain/use-cases/get-client";
import { createGetJob } from "@/domain/use-cases/get-job";
import { createGetJobReportSettings } from "@/domain/use-cases/get-job-report-settings";
import { createListCampaigns } from "@/domain/use-cases/list-campaigns";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createSupabaseJobReportSettingsRepository } from "@/infrastructure/repositories/supabase-job-report-settings-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { JobWizardLayout } from "@/presentation/components/trabajos/wizard/job-wizard-layout";
import { ReportSettingsForm } from "@/presentation/components/trabajos/wizard/report-settings-form";
import { buildWizardSummary } from "@/utils/build-wizard-summary";

export const metadata: Metadata = { title: "Reporte del cliente · adsme" };

/** Pantalla `B6 · Wizard Paso 3`: configuración del reporte del cliente. */
export default async function TrabajoReportePage({
  params,
}: PageProps<"/trabajos/[id]/reporte">) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const job = await createGetJob(createSupabaseJobRepository(supabase))(id);

  if (!job) notFound();

  const [client, campaigns, settings] = await Promise.all([
    createGetClient(createSupabaseClientRepository(supabase))(job.clientId),
    createListCampaigns(createSupabaseCampaignRepository(supabase))(
      DEFAULT_CAMPAIGN_LIST_QUERY,
    ),
    createGetJobReportSettings(
      createSupabaseJobReportSettingsRepository(supabase),
    )(job.id),
  ]);

  const linkedPlatforms = new Set(
    campaigns
      .filter((campaign) => campaign.jobId === job.id)
      .map((campaign) => campaign.platform),
  );

  return (
    <JobWizardLayout
      currentStep={3}
      summary={buildWizardSummary(job, client?.name ?? null, linkedPlatforms.size)}
    >
      <ReportSettingsForm
        jobId={job.id}
        investment={job.investment}
        cpvOptimization={settings.cpvOptimization}
        chargedCpv={settings.chargedCpv}
        hiddenSections={settings.hiddenSections}
        previousHref={jobCampaignsRoute(job.id)}
      />
    </JobWizardLayout>
  );
}
