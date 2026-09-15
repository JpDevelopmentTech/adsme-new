import { JobWizardStepper } from "@/presentation/components/trabajos/wizard/job-wizard-stepper";
import { JobWizardSummary } from "@/presentation/components/trabajos/wizard/job-wizard-summary";
import type { JobWizardLayoutProps } from "@/types/job-wizard.types";

/** Armazón común de los pasos: progreso arriba, contenido y ficha al lado. */
export function JobWizardLayout({
  currentStep,
  skippedSteps,
  summary,
  children,
}: JobWizardLayoutProps) {
  return (
    <>
      <JobWizardStepper currentStep={currentStep} skippedSteps={skippedSteps} />

      <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-4">{children}</div>

        <JobWizardSummary summary={summary} />
      </div>
    </>
  );
}
