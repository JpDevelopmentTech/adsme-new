import { Music, Save } from "lucide-react";
import { JOB_WIZARD_SUMMARY } from "@/constants/job-wizard.constants";
import type { JobWizardSummaryProps } from "@/types/job-wizard.types";
import { cn } from "@/utils/cn";

/**
 * Ficha del trabajo que acompaña a los cuatro pasos: la portada grande, el
 * nombre y lo que ya está decidido. Sin ella, en los pasos 2 y 4 no se vería
 * siquiera qué se está creando.
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
    <aside className="glass-panel flex flex-col gap-[18px] rounded-card p-[22px] xl:w-[320px] xl:shrink-0">
      <span className="text-[11px] font-medium tracking-[1.4px] text-text-muted uppercase">
        {JOB_WIZARD_SUMMARY.eyebrow}
      </span>

      {summary.coverUrl ? (
        // Portada local del uploader o servida desde Storage.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={summary.coverUrl} alt="" className="aspect-square w-full rounded-[18px] object-cover" />
      ) : (
        <span aria-hidden className="grid aspect-square w-full place-items-center rounded-[18px] border border-border bg-surface">
          <Music size={40} strokeWidth={1.25} className="text-text-muted" />
        </span>
      )}

      <div className="flex min-w-0 flex-col gap-0.5">
        <span className={cn("truncate text-[22px] font-light", summary.title ? "text-text-primary" : "text-text-muted")}>
          {summary.title ?? JOB_WIZARD_SUMMARY.untitled}
        </span>
        <span className="truncate text-[13px] font-normal text-text-muted">{subtitle}</span>
      </div>

      <dl className="flex flex-col">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 border-t border-border py-[11px]">
            <dt className="text-xs font-normal text-text-muted">{row.label}</dt>
            <dd className={cn("truncate text-right text-[13px] font-normal", row.value ? "text-text-primary" : "text-text-muted")}>
              {row.value ?? JOB_WIZARD_SUMMARY.pending}
            </dd>
          </div>
        ))}
      </dl>

      <p className="flex items-start gap-2 rounded-[14px] bg-surface px-3.5 py-3 text-xs leading-[1.45] font-normal text-text-secondary">
        <Save size={15} strokeWidth={1.5} className="mt-px shrink-0" aria-hidden />
        {JOB_WIZARD_SUMMARY.note}
      </p>
    </aside>
  );
}
