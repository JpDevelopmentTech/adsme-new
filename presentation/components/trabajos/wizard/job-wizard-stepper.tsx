import { Check, Minus } from "lucide-react";
import { Fragment } from "react";
import { JOB_WIZARD_STEPS } from "@/constants/job-wizard.constants";
import type { JobWizardStepperProps } from "@/types/job-wizard.types";
import { cn } from "@/utils/cn";

/**
 * Progreso del asistente: el paso vigente se marca con el gradiente de marca y
 * los ya cumplidos con su línea en verde. El círculo numerado ya dice en qué
 * paso se está, así que no se repite en ningún otro sitio.
 */
export function JobWizardStepper({
  currentStep,
  skippedSteps = [],
}: JobWizardStepperProps) {
  return (
    <ol className="flex items-center rounded-card border border-border bg-card px-5 py-3">
      {JOB_WIZARD_STEPS.map((step, index) => {
        const isSkipped = skippedSteps.includes(step.number);
        const isCurrent = step.number === currentStep;
        // Un paso omitido no se da por cumplido: queda pendiente para después.
        const isDone = step.number < currentStep && !isSkipped;

        return (
          <Fragment key={step.number}>
            <li
              className="flex items-center gap-2.5"
              aria-current={isCurrent ? "step" : undefined}
            >
              <span
                className={cn(
                  "grid size-[26px] shrink-0 place-items-center rounded-pill font-display text-xs font-bold",
                  isCurrent && "bg-brand-gradient text-white",
                  isDone && "border border-success/30 bg-success/15 text-success",
                  !isCurrent &&
                    !isDone &&
                    "border border-border bg-card-elevated text-text-muted",
                )}
              >
                {isDone ? (
                  <Check size={14} strokeWidth={3} aria-hidden />
                ) : isSkipped ? (
                  <Minus size={14} strokeWidth={3} aria-hidden />
                ) : (
                  step.number
                )}
              </span>

              <span
                className={cn(
                  "text-[13px] font-semibold whitespace-nowrap",
                  isCurrent || isDone ? "text-text-primary" : "text-text-secondary",
                  isSkipped && "text-text-muted",
                )}
              >
                {step.label}
              </span>
            </li>

            {index < JOB_WIZARD_STEPS.length - 1 ? (
              <span
                aria-hidden
                className={cn(
                  "mx-3 h-0.5 min-w-6 flex-1 rounded-sm",
                  step.number < currentStep && !skippedSteps.includes(step.number)
                    ? "bg-success"
                    : "bg-border",
                )}
              />
            ) : null}
          </Fragment>
        );
      })}
    </ol>
  );
}
