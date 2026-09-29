"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useActionState } from "react";
import { JOB_STEP_COPY, JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import {
  REPORT_SETTINGS_FIELDS,
  STEP_THREE_COPY,
} from "@/constants/report-config.constants";
import { REPORT_VISIBILITY_GROUPS } from "@/constants/report-visibility.constants";
import { REPORT_SECTION_KEYS } from "@/domain/entities/report-section";
import { saveJobReportSettingsAction } from "@/presentation/actions/save-job-report-settings-action";
import { CpvOptimizationSection } from "@/presentation/components/trabajos/wizard/cpv-optimization-section";
import { JobWizardPanel } from "@/presentation/components/trabajos/wizard/job-wizard-panel";
import { ReportVisibilityGroupCard } from "@/presentation/components/trabajos/wizard/report-visibility-group-card";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { FormScreenLoader } from "@/presentation/components/ui/form-screen-loader";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import { useHiddenSections } from "@/presentation/hooks/use-hidden-sections";
import type {
  ReportSettingsFormProps,
  ReportSettingsFormState,
} from "@/types/job-wizard.types";

const INITIAL_STATE: ReportSettingsFormState = {
  message: null,
  chargedCpvError: null,
};

/**
 * Paso 3 del asistente: qué partes del reporte ve el cliente y la optimización
 * de CPV. Todo se guarda al pulsar «Siguiente», como el resto de pasos.
 */
export function ReportSettingsForm({
  jobId,
  investment,
  cpvOptimization,
  chargedCpv,
  hiddenSections,
  previousHref,
}: ReportSettingsFormProps) {
  const [state, formAction, isPending] = useActionState(
    saveJobReportSettingsAction,
    INITIAL_STATE,
  );
  const { hidden, toggle } = useHiddenSections(hiddenSections);
  const total = REPORT_SECTION_KEYS.length;

  return (
    <form action={formAction}>
      <input type="hidden" name={REPORT_SETTINGS_FIELDS.jobId} value={jobId} />
      <FormScreenLoader title={STEP_THREE_COPY.saving} />

      <JobWizardPanel
        title={JOB_STEP_COPY.three.title}
        subtitle={JOB_STEP_COPY.three.subtitle}
        footer={
          <>
            <SecondaryLink href={previousHref}>
              <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
              {JOB_WIZARD_COPY.previous}
            </SecondaryLink>

            <PrimaryButton type="submit" isLoading={isPending}>
              {STEP_THREE_COPY.next}
              <ArrowRight size={15} strokeWidth={1.75} aria-hidden />
            </PrimaryButton>
          </>
        }
      >
        {state.message ? <FormAlert message={state.message} /> : null}

        <p aria-live="polite" className="text-[12.5px] text-text-secondary">
          {STEP_THREE_COPY.visibilityCount(total - hidden.length, total)}
        </p>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          {REPORT_VISIBILITY_GROUPS.map((group) => (
            <ReportVisibilityGroupCard
              key={group.title}
              group={group}
              hiddenSections={hiddenSections}
              onToggle={toggle}
            />
          ))}
        </div>

        <CpvOptimizationSection
          cpvOptimization={cpvOptimization}
          chargedCpv={chargedCpv}
          investment={investment}
          error={state.chargedCpvError}
        />
      </JobWizardPanel>
    </form>
  );
}
