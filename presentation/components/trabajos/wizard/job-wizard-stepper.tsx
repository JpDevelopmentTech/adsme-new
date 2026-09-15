import { Fragment } from "react";
import { JOB_WIZARD_STEPS } from "@/constants/job-wizard.constants";
import type { JobWizardStepperProps } from "@/types/job-wizard.types";
import { cn } from "@/utils/cn";

/**
 * Progreso del asistente. Un paso omitido no se da por cumplido y además dice
 * por qué: prometer cuatro pasos y saltarse uno en silencio desorienta más que
 * admitir que ese se configura más adelante.
 */
export function JobWizardStepper({
  currentStep,
  skippedSteps = [],
}: JobWizardStepperProps) {
  return (
    <ol className="glass-panel flex flex-wrap items-center gap-y-3 rounded-card px-[22px] py-3.5">
      {JOB_WIZARD_STEPS.map((step, index) => {
        const isSkipped = skippedSteps.includes(step.number);
        const isCurrent = step.number === currentStep;
        const isDone = step.number < currentStep && !isSkipped;

        return (
          <Fragment key={step.number}>
            <li
              className="flex items-center gap-2.5"
              aria-current={isCurrent ? "step" : undefined}
            >
              <span
                className={cn(
                  "grid size-[26px] shrink-0 place-items-center rounded-pill border text-[11.5px]",
                  isCurrent && "border-ink bg-ink text-g-50",
                  isDone && "border-success bg-success/12 text-success",
                  !isCurrent && !isDone && "border-border-strong",
                  !isCurrent && !isDone && isSkipped
                    ? "text-g-500"
                    : !isCurrent && !isDone && "text-text-secondary",
                )}
              >
                {isDone ? "✓" : step.number}
              </span>

              <span className="flex flex-col gap-px">
                <span
                  className={cn(
                    "text-[12.5px] whitespace-nowrap",
                    isCurrent ? "font-normal text-text-primary" : "font-light",
                    !isCurrent && (isSkipped ? "text-g-500" : "text-text-secondary"),
                  )}
                >
                  {step.label}
                </span>

                {step.note ? (
                  <span className="text-[10px] font-medium tracking-[0.6px] text-g-500 uppercase">
                    {step.note}
                  </span>
                ) : null}
              </span>
            </li>

            {index < JOB_WIZARD_STEPS.length - 1 ? (
              <span
                aria-hidden
                className={cn(
                  "mx-3 hidden h-0.5 min-w-6 flex-1 rounded-pill sm:block",
                  isDone ? "bg-success" : "bg-border/70",
                )}
              />
            ) : null}
          </Fragment>
        );
      })}
    </ol>
  );
}
