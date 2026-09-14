import { ArrowLeft, Link2, Mail, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import { STEP_FOUR_COPY } from "@/constants/report-config.constants";
import { JOBS_ROUTE, jobCampaignsRoute } from "@/constants/routes.constants";
import { createGetClient } from "@/domain/use-cases/get-client";
import { createGetJob } from "@/domain/use-cases/get-job";
import { createSupabaseClientRepository } from "@/infrastructure/repositories/supabase-client-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { findReportProtection } from "@/infrastructure/repositories/find-report-protection";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { DownloadQrButton } from "@/presentation/components/trabajos/wizard/download-qr-button";
import { JobPublishReview } from "@/presentation/components/trabajos/wizard/job-publish-review";
import { ReportLinkProtectionForm } from "@/presentation/components/trabajos/wizard/report-link-protection-form";
import { ReportQr } from "@/presentation/components/trabajos/wizard/report-qr";
import { JobWizardStepper } from "@/presentation/components/trabajos/wizard/job-wizard-stepper";
import { BackLink } from "@/presentation/components/ui/back-link";
import { CopyLinkField } from "@/presentation/components/ui/copy-link-field";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";

import { buildJobPublishReview } from "@/utils/build-job-publish-review";
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

  const [client, protection] = await Promise.all([
    createGetClient(createSupabaseClientRepository(supabase))(job.clientId),
    findReportProtection(supabase, job.id),
  ]);

  return (
    <>
      <div className="flex flex-col gap-[5px]">
        <BackLink href={JOBS_ROUTE} label={`Trabajos / ${job.title}`} />
        <h1 className="font-display text-[26px] font-bold text-text-primary">
          {JOB_WIZARD_COPY.title}
        </h1>
      </div>

      <JobWizardStepper currentStep={4} skippedSteps={[3]} />

      <div className="flex flex-col gap-6 rounded-card border border-border bg-card p-7">
        <div className="flex flex-col gap-7 xl:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <div className="flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-pill border border-brand-violet/25 bg-brand-violet/15">
                <Link2
                  size={22}
                  strokeWidth={2.5}
                  className="text-brand-violet"
                  aria-hidden
                />
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="font-display text-base font-bold text-text-primary">
                  {STEP_FOUR_COPY.successTitle}
                </p>
                <p className="text-[13px] leading-[1.4] text-text-secondary">
                  {STEP_FOUR_COPY.successBody(client?.name ?? "tu cliente")}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-medium text-text-secondary">
                {STEP_FOUR_COPY.urlLabel}
              </p>
              {job.reportUrl ? (
                <CopyLinkField
                  url={job.reportUrl}
                  label={`Copiar el enlace del reporte de ${job.title}`}
                />
              ) : (
                <FormAlert tone="warning" message={STEP_FOUR_COPY.noLink} />
              )}
            </div>

            {job.reportUrl ? (
              <div className="flex flex-wrap gap-2.5">
                <SecondaryLink
                  href={whatsappShareUrl(
                    STEP_FOUR_COPY.whatsappMessage(job.title, job.reportUrl),
                  )}
                >
                  <MessageCircle
                    size={18}
                    className="text-success"
                    aria-hidden
                  />
                  {STEP_FOUR_COPY.whatsapp}
                </SecondaryLink>

                <SecondaryLink href={mailtoShareUrl(job.title, job.reportUrl)}>
                  <Mail size={18} className="text-data-cyan" aria-hidden />
                  {STEP_FOUR_COPY.email}
                </SecondaryLink>

                <DownloadQrButton fileName={`qr-${job.title}`} />
              </div>
            ) : null}

            {/* Sin enlace emitido no hay nada que proteger todavía. */}
            {job.reportUrl ? (
              <ReportLinkProtectionForm
                jobId={job.id}
                hasPassword={protection.hasPassword}
                expiresOn={protection.expiresOn}
              />
            ) : null}
          </div>

          {job.reportUrl ? <ReportQr url={job.reportUrl} /> : null}
        </div>

        <JobPublishReview
          items={buildJobPublishReview(job, client?.name ?? "")}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <SecondaryLink href={jobCampaignsRoute(job.id)}>
          <ArrowLeft size={18} strokeWidth={2} aria-hidden />
          {JOB_WIZARD_COPY.previous}
        </SecondaryLink>

        <div className="flex items-center gap-2.5">
          <PrimaryLink href={JOBS_ROUTE}>
            <Link2 size={18} strokeWidth={2} aria-hidden />
            {STEP_FOUR_COPY.finish}
          </PrimaryLink>
        </div>
      </div>
    </>
  );
}
