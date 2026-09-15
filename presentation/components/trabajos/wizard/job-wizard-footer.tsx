import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import { JOBS_ROUTE } from "@/constants/routes.constants";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import type { JobWizardFooterProps } from "@/types/job-wizard.types";

/**
 * Pie del paso 1. «Guardar borrador» vive aquí y no en la cabecera: las dos
 * salidas del paso —dejarlo a medias o seguir— se deciden a la vez.
 */
export function JobWizardFooter({ isPending, onIntent }: JobWizardFooterProps) {
  return (
    <>
      <SecondaryLink href={JOBS_ROUTE}>
        <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
        {JOB_WIZARD_COPY.previous}
      </SecondaryLink>

      <div className="flex flex-wrap items-center gap-2.5">
        <SecondaryButton
          type="submit"
          onClick={() => onIntent("draft")}
          isLoading={isPending}
          icon={<Save size={15} strokeWidth={1.75} aria-hidden />}
        >
          {JOB_WIZARD_COPY.saveDraft}
        </SecondaryButton>

        <PrimaryButton
          type="submit"
          onClick={() => onIntent("next")}
          isLoading={isPending}
        >
          {JOB_WIZARD_COPY.next}
          <ArrowRight size={15} strokeWidth={1.75} aria-hidden />
        </PrimaryButton>
      </div>
    </>
  );
}
