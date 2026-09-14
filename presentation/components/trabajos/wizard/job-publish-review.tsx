import { STEP_FOUR_COPY } from "@/constants/report-config.constants";
import type { JobPublishReviewProps } from "@/types/job-wizard.types";

/**
 * Última mirada antes de publicar: lo que se acaba de configurar, en una línea.
 * Un asistente debe dejar revisar antes de confirmar.
 */
export function JobPublishReview({ items }: JobPublishReviewProps) {
  return (
    <section className="flex flex-col gap-3 rounded-md border border-border bg-card-elevated px-[18px] py-4">
      <h2 className="text-[11px] font-bold tracking-[0.6px] text-text-muted">
        {STEP_FOUR_COPY.reviewTitle}
      </h2>

      <dl className="grid grid-cols-2 gap-x-5 gap-y-4 sm:flex sm:gap-0">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={
              index > 0
                ? "flex min-w-0 flex-col gap-0.5 sm:flex-1 sm:border-l sm:border-border sm:pl-5"
                : "flex min-w-0 flex-col gap-0.5 sm:flex-1 sm:pr-5"
            }
          >
            <dt className="text-[11px] text-text-muted">{item.label}</dt>
            <dd className="truncate text-[13px] font-semibold text-text-primary">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
