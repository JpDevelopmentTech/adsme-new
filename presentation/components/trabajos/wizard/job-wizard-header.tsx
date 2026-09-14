import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import { JOBS_ROUTE } from "@/constants/routes.constants";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { JobWizardHeaderProps } from "@/types/job-wizard.types";

/** Encabezado del asistente: vuelta al listado, título y guardado de borrador. */
export function JobWizardHeader({
  title,
  isPending,
  onIntent,
}: JobWizardHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-[5px]">
        <Link
          href={JOBS_ROUTE}
          className="flex w-fit items-center gap-1.5 text-[13px] text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={15} aria-hidden />
          {JOB_WIZARD_COPY.back}
        </Link>
        <h1 className="font-display text-[26px] font-bold text-text-primary">
          {title}
        </h1>
      </div>

      <SecondaryButton
        type="submit"
        onClick={() => onIntent("draft")}
        isLoading={isPending}
        icon={<Save size={18} strokeWidth={2} aria-hidden />}
      >
        {JOB_WIZARD_COPY.saveDraft}
      </SecondaryButton>
    </div>
  );
}
