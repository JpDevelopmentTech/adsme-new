import { Check } from "lucide-react";
import { Fragment } from "react";
import { JOB_WIZARD_COPY, JOB_WIZARD_STEPS } from "@/constants/job-wizard.constants";
import type { JobWizardStepperProps } from "@/types/job-wizard.types";
import { cn } from "@/utils/cn";

/**
 * Progreso del asistente: números en círculo unidos por conectores, en verde lo
 * hecho y en blanco el paso actual. Un paso omitido no se da por cumplido y
 * además dice por qué, con su nota.
 */
export function JobWizardStepper({ currentStep, skippedSteps = [] }: JobWizardStepperProps) {
  return (
    <ol className="glass-panel flex flex-wrap items-center gap-y-3 rounded-[20px] px-6 py-[18px]">
      {JOB_WIZARD_STEPS.map((step, index) => {
        const isSkipped = skippedSteps.includes(step.number);
        const isCurrent = step.number === currentStep;
        const isDone = step.number < currentStep && !isSkipped;

        return (
          <Fragment key={step.number}>
            <li className="flex items-center gap-3" aria-current={isCurrent ? "step" : undefined}>
              <span
                className={cn(
                  "grid size-[34px] shrink-0 place-items-center rounded-pill border text-sm font-medium",
                  isCurrent && "border-transparent bg-ink text-g-50",
                  isDone && "border-transparent bg-success text-g-50",
                  !isCurrent && !isDone && "border-white/25 text-text-muted",
                )}
              >
                {isDone ? <Check size={16} strokeWidth={2} aria-hidden /> : step.number}
              </span>

              <span className="flex flex-col">
                <span className="text-[10px] font-medium tracking-[1.2px] text-text-muted uppercase">
                  {JOB_WIZARD_COPY.stepEyebrow(step.number)}
                </span>
                <span
                  className={cn(
                    "text-sm whitespace-nowrap",
                    isCurrent ? "font-normal text-text-primary" : "font-light",
                    !isCurrent && (isDone ? "text-text-primary" : "text-text-secondary"),
                  )}
                >
                  {step.label}
                </span>
                {step.note ? (
                  <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
                    {step.note}
                  </span>
                ) : null}
              </span>
            </li>

            {index < JOB_WIZARD_STEPS.length - 1 ? (
              <span
                aria-hidden
                className={cn(
                  "mx-4 hidden h-0.5 min-w-6 flex-1 rounded-pill sm:block",
                  isDone ? "bg-success/50" : "bg-white/14",
                )}
              />
            ) : null}
          </Fragment>
        );
      })}
    </ol>
  );
}
