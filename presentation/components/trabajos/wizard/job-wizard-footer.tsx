import { ArrowRight, Save } from "lucide-react";
import { JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import { JOBS_ROUTE } from "@/constants/routes.constants";
import { WizardBackLink } from "@/presentation/components/trabajos/wizard/wizard-back-link";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { JobWizardFooterProps } from "@/types/job-wizard.types";

/**
 * Pie del paso 1: «Atrás» a la izquierda y, a la derecha, las dos salidas del
 * paso —dejarlo como borrador o seguir—, que se deciden a la vez.
 */
export function JobWizardFooter({ isPending, onIntent }: JobWizardFooterProps) {
  return (
    <>
      <WizardBackLink href={JOBS_ROUTE} />

      <div className="flex flex-wrap items-center gap-2.5">
        <SecondaryButton
          type="submit"
          onClick={() => onIntent("draft")}
          isLoading={isPending}
          icon={<Save size={16} strokeWidth={1.5} aria-hidden />}
        >
          {JOB_WIZARD_COPY.saveDraft}
        </SecondaryButton>

        <PrimaryButton type="submit" onClick={() => onIntent("next")} isLoading={isPending}>
          {JOB_WIZARD_COPY.next}
          <ArrowRight size={16} strokeWidth={1.75} aria-hidden />
        </PrimaryButton>
      </div>
    </>
  );
}
