import { ArrowLeft, ArrowRight } from "lucide-react";
import { JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import { JOBS_ROUTE } from "@/constants/routes.constants";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryLink } from "@/presentation/components/ui/secondary-link";
import type { JobWizardFooterProps } from "@/types/job-wizard.types";

/** Pie del asistente: retroceso, progreso y avance al siguiente paso. */
export function JobWizardFooter({ isPending, onIntent }: JobWizardFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <SecondaryLink href={JOBS_ROUTE}>
        <ArrowLeft size={18} strokeWidth={2} aria-hidden />
        {JOB_WIZARD_COPY.previous}
      </SecondaryLink>

      <div className="flex items-center gap-2.5">
        <PrimaryButton
          type="submit"
          onClick={() => onIntent("next")}
          isLoading={isPending}
        >
          {JOB_WIZARD_COPY.next}
          <ArrowRight size={18} strokeWidth={2} aria-hidden />
        </PrimaryButton>
      </div>
    </div>
  );
}
