import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import {
  REPORT_SECTIONS,
  STEP_THREE_COPY,
} from "@/constants/report-config.constants";
import {
  JOBS_ROUTE,
  jobCampaignsRoute,
  jobLinkRoute,
} from "@/constants/routes.constants";
import { DEFAULT_CAMPAIGN_LIST_QUERY } from "@/domain/entities/campaign";
import { createGetClient } from "@/domain/use-cases/get-client";
import { createGetJob } from "@/domain/use-cases/get-job";
import { createListCampaigns } from "@/domain/use-cases/list-campaigns";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { ReportPreviewDevice } from "@/presentation/components/trabajos/wizard/report-preview-device";
import { JobWizardStepper } from "@/presentation/components/trabajos/wizard/job-wizard-stepper";
import { BackLink } from "@/presentation/components/ui/back-link";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import { ToggleGroup } from "@/presentation/components/ui/toggle-group";
import { ToggleSwitch } from "@/presentation/components/ui/toggle-switch";
import { buildJobPlatformSplit } from "@/utils/build-job-platform-split";
import { buildReportKpis } from "@/utils/build-report-kpis";

export const metadata: Metadata = { title: "Reporte del cliente · adsme" };

/** Pantalla `B6 · Wizard Paso 3`: qué secciones y métricas ve el cliente. */
export default async function TrabajoReportePage({
  params,
}: PageProps<"/trabajos/[id]/reporte">) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const job = await createGetJob(createSupabaseJobRepository(supabase))(id);

  if (!job) notFound();

  const [sectionsGroup, ...metricGroups] = REPORT_SECTIONS;

  const [client, campaigns] = await Promise.all([
    createGetClient(createSupabaseClientRepository(supabase))(job.clientId),
    createListCampaigns(createSupabaseCampaignRepository(supabase))(
      DEFAULT_CAMPAIGN_LIST_QUERY,
    ),
  ]);

  return (
    <>
      <div className="flex flex-col gap-[5px]">
        <BackLink href={JOBS_ROUTE} label={`Trabajos / ${job.title}`} />
        <h1 className="font-display text-[26px] font-bold text-text-primary">
          {JOB_WIZARD_COPY.title}
        </h1>
      </div>

      <JobWizardStepper currentStep={3} />

      <div className="flex flex-col gap-7 rounded-card border border-border bg-card p-7 xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <p className="text-[13px] leading-[1.4] text-text-secondary">
            {STEP_THREE_COPY.subtitle}
          </p>

          <ToggleGroup title={sectionsGroup.title}>
            {sectionsGroup.options.map((option) => (
              <ToggleSwitch
                key={option.id}
                id={option.id}
                name={option.id}
                label={option.label}
                defaultChecked={option.on}
              />
            ))}
          </ToggleGroup>

          {/* Los dos grupos de métricas caben en paralelo y así el paso entra en una pantalla. */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {metricGroups.map((group) => (
              <div key={group.title} className="min-w-0 flex-1">
                <ToggleGroup title={group.title}>
                  {group.options.map((option) => (
                    <ToggleSwitch
                      key={option.id}
                      id={option.id}
                      name={option.id}
                      label={option.label}
                      defaultChecked={option.on}
                    />
                  ))}
                </ToggleGroup>
              </div>
            ))}
          </div>
        </div>

        <ReportPreviewDevice
          job={job}
          clientName={client?.name ?? ""}
          kpis={buildReportKpis(
            campaigns.filter((campaign) => campaign.jobId === job.id),
          )}
          platforms={buildJobPlatformSplit(job)}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <SecondaryLink href={jobCampaignsRoute(job.id)}>
          <ArrowLeft size={18} strokeWidth={2} aria-hidden />
          {JOB_WIZARD_COPY.previous}
        </SecondaryLink>

        <div className="flex items-center gap-2.5">
          <PrimaryLink href={jobLinkRoute(job.id)}>
            {STEP_THREE_COPY.next}
            <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </PrimaryLink>
        </div>
      </div>
    </>
  );
}
