import { NOMINA_SHELL_COPY } from "@/constants/nomina-copy.constants";
import type { NominaFooterProps } from "@/types/nomina-ui.types";
import { cn } from "@/utils/cn";

/** Pie de la nómina con la firma de JP Development. */
export function NominaFooter({ className }: NominaFooterProps) {
  return (
    <footer className={cn("flex items-center justify-center gap-1 pt-2 text-xs text-text-muted", className)}>
      {NOMINA_SHELL_COPY.footerLead}
      <a
        href={NOMINA_SHELL_COPY.footerHref}
        target="_blank"
        rel="noopener"
        className="font-normal text-text-secondary underline underline-offset-2 hover:text-text-primary"
      >
        {NOMINA_SHELL_COPY.footerBrand}
      </a>
    </footer>
  );
}
