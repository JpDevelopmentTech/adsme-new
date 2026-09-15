import { Music } from "lucide-react";
import { Fragment } from "react";
import { JOB_WIZARD_SUMMARY } from "@/constants/job-wizard.constants";
import type { JobWizardSummaryProps } from "@/types/job-wizard.types";
import { cn } from "@/utils/cn";

/**
 * Ficha del trabajo que acompaña a los cuatro pasos. Es lo que convierte el
 * asistente en algo que se entiende: sin ella, en los pasos 2 y 4 no se ve
 * siquiera el nombre de lo que se está creando.
 */
export function JobWizardSummary({ summary }: JobWizardSummaryProps) {
  const rows = [
    { label: JOB_WIZARD_SUMMARY.period, value: summary.period },
    { label: JOB_WIZARD_SUMMARY.investment, value: summary.investment },
    { label: JOB_WIZARD_SUMMARY.platforms, value: summary.platforms },
    { label: JOB_WIZARD_SUMMARY.report, value: summary.report },
  ];

  const subtitle = [summary.clientName ?? JOB_WIZARD_SUMMARY.noClient, summary.format]
    .filter(Boolean)
    .join(" · ");

  return (
    <aside className="glass-panel flex flex-col overflow-hidden rounded-card xl:w-[340px] xl:shrink-0">
      <div className="flex flex-col gap-3.5 px-5 py-[18px]">
        <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
          {JOB_WIZARD_SUMMARY.eyebrow}
        </span>

        <div className="flex items-center gap-3">
          {summary.coverUrl ? (
            // Portada local del uploader o servida desde Storage.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={summary.coverUrl}
              alt=""
              className="size-14 shrink-0 rounded-md object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="grid size-14 shrink-0 place-items-center rounded-md border border-border bg-g-200"
            >
              <Music size={18} strokeWidth={1.5} className="text-text-muted" />
            </span>
          )}

          <div className="flex min-w-0 flex-col gap-0.5">
            <span
              className={cn(
                "truncate text-[15px]",
                summary.title ? "font-normal text-text-primary" : "font-light text-text-muted",
              )}
            >
              {summary.title ?? JOB_WIZARD_SUMMARY.untitled}
            </span>
            <span className="truncate text-[12px] text-text-secondary">
              {subtitle}
            </span>
          </div>
        </div>
      </div>

      {rows.map((row) => (
        <Fragment key={row.label}>
          <div className="h-px bg-border/60" />

          <div className="flex items-center justify-between gap-3 px-5 py-3">
            <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
              {row.label}
            </span>
            <span
              className={cn(
                "truncate text-right text-[12.5px]",
                row.value ? "font-normal text-text-primary" : "font-light text-g-500",
              )}
            >
              {row.value ?? JOB_WIZARD_SUMMARY.pending}
            </span>
          </div>
        </Fragment>
      ))}

      <div className="h-px bg-border/60" />

      <p className="px-5 py-3.5 text-[11.5px] leading-[1.45] text-text-muted">
        {JOB_WIZARD_SUMMARY.note}
      </p>
    </aside>
  );
}
