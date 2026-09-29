import { ArrowLeft, Link2, Mail, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JOB_STEP_COPY, JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import { STEP_FOUR_COPY } from "@/constants/report-config.constants";
import { JOBS_ROUTE, jobReportRoute } from "@/constants/routes.constants";
import { DEFAULT_CAMPAIGN_LIST_QUERY } from "@/domain/entities/campaign";
import { createGetClient } from "@/domain/use-cases/get-client";
import { createGetJob } from "@/domain/use-cases/get-job";
import { createListCampaigns } from "@/domain/use-cases/list-campaigns";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { findReportProtection } from "@/infrastructure/repositories/find-report-protection";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { DownloadQrButton } from "@/presentation/components/trabajos/wizard/download-qr-button";
import { JobWizardLayout } from "@/presentation/components/trabajos/wizard/job-wizard-layout";
import { JobWizardPanel } from "@/presentation/components/trabajos/wizard/job-wizard-panel";
import { ReportLinkProtectionForm } from "@/presentation/components/trabajos/wizard/report-link-protection-form";
import { ReportQr } from "@/presentation/components/trabajos/wizard/report-qr";
import { WizardSection } from "@/presentation/components/trabajos/wizard/wizard-section";
import { CopyLinkField } from "@/presentation/components/ui/copy-link-field";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import { buildWizardSummary } from "@/utils/build-wizard-summary";
import { mailtoShareUrl, whatsappShareUrl } from "@/utils/share-urls";

export const metadata: Metadata = { title: "Enlace del cliente · adsme" };

/** Pantalla `B6 · Wizard Paso 4`: enlace que se comparte con el artista. */
export default async function TrabajoEnlacePage({
  params,
}: PageProps<"/trabajos/[id]/enlace">) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const job = await createGetJob(createSupabaseJobRepository(supabase))(id);

  if (!job) notFound();

  const [client, protection, campaigns] = await Promise.all([
    createGetClient(createSupabaseClientRepository(supabase))(job.clientId),
    findReportProtection(supabase, job.id),
    createListCampaigns(createSupabaseCampaignRepository(supabase))(
      DEFAULT_CAMPAIGN_LIST_QUERY,
    ),
  ]);

  const linkedPlatforms = new Set(
    campaigns
      .filter((campaign) => campaign.jobId === job.id)
      .map((campaign) => campaign.platform),
  );

  return (
    <JobWizardLayout
      currentStep={4}
      summary={buildWizardSummary(job, client?.name ?? null, linkedPlatforms.size)}
    >
      <JobWizardPanel
        title={JOB_STEP_COPY.four.title}
        subtitle={JOB_STEP_COPY.four.subtitle}
        footer={
          <>
            <SecondaryLink href={jobReportRoute(job.id)}>
              <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
              {JOB_WIZARD_COPY.previous}
            </SecondaryLink>

            <PrimaryLink href={JOBS_ROUTE}>
              <Link2 size={15} strokeWidth={1.75} aria-hidden />
              {STEP_FOUR_COPY.finish}
            </PrimaryLink>
          </>
        }
      >
        <WizardSection label={STEP_FOUR_COPY.shareSection}>
          {job.reportUrl ? (
            <>
              <CopyLinkField
                url={job.reportUrl}
                label={`Copiar el enlace del reporte de ${job.title}`}
              />

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <ReportQr url={job.reportUrl} />

                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <p className="text-[12.5px] leading-[1.5] text-text-secondary">
                    {STEP_FOUR_COPY.shareHint}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    <SecondaryLink
                      href={whatsappShareUrl(
                        STEP_FOUR_COPY.whatsappMessage(job.title, job.reportUrl),
                      )}
                    >
                      <MessageCircle size={15} strokeWidth={1.5} aria-hidden />
                      {STEP_FOUR_COPY.whatsapp}
                    </SecondaryLink>

                    <SecondaryLink href={mailtoShareUrl(job.title, job.reportUrl)}>
                      <Mail size={15} strokeWidth={1.5} aria-hidden />
                      {STEP_FOUR_COPY.email}
                    </SecondaryLink>

                    <DownloadQrButton fileName={`qr-${job.title}`} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <FormAlert tone="warning" message={STEP_FOUR_COPY.noLink} />
          )}
        </WizardSection>

        {/* Sin enlace emitido no hay nada que proteger todavía. */}
        {job.reportUrl ? (
          <WizardSection label={STEP_FOUR_COPY.protectSection}>
            <ReportLinkProtectionForm
              jobId={job.id}
              hasPassword={protection.hasPassword}
              expiresOn={protection.expiresOn}
            />
          </WizardSection>
        ) : null}
      </JobWizardPanel>
    </JobWizardLayout>
  );
}
