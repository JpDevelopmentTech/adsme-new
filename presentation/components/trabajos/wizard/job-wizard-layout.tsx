import { JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import { JOBS_ROUTE } from "@/constants/routes.constants";
import { JobWizardStepper } from "@/presentation/components/trabajos/wizard/job-wizard-stepper";
import { JobWizardSummary } from "@/presentation/components/trabajos/wizard/job-wizard-summary";
import { AmbientGlow } from "@/presentation/components/ui/ambient-glow";
import { Breadcrumb } from "@/presentation/components/ui/breadcrumb";
import type { JobWizardLayoutProps } from "@/types/job-wizard.types";

/**
 * Armazón común de los pasos: la portada del lanzamiento tiñe la pantalla,
 * migas y progreso arriba, y el paso con la ficha del trabajo al lado.
 */
export function JobWizardLayout({
  currentStep,
  skippedSteps,
  summary,
  children,
}: JobWizardLayoutProps) {
  return (
    <>
      <AmbientGlow imageUrl={summary.coverUrl} />

      <Breadcrumb
        backHref={JOBS_ROUTE}
        backLabel={JOB_WIZARD_COPY.back}
        current={summary.title ?? JOB_WIZARD_COPY.title}
      />

      <JobWizardStepper currentStep={currentStep} skippedSteps={skippedSteps} />

      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-4">{children}</div>

        <JobWizardSummary summary={summary} />
      </div>
    </>
  );
}
