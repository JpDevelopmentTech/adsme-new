import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import type { WizardBackLinkProps } from "@/types/job-wizard.types";

/** «Atrás» del pie de cada paso: un enlace discreto, no un botón que compita con «Siguiente». */
export function WizardBackLink({ href }: WizardBackLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-sm px-1 py-2.5 text-sm font-normal text-text-secondary transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
    >
      <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
      {JOB_WIZARD_COPY.previous}
    </Link>
  );
}
