import type { ReportSummaryCardProps } from "@/types/report.types";

/** Una cifra de contexto del titular: icono y rótulo arriba, la cifra en peso fino. */
export function ReportSummaryCard({ icon: Icon, label, value, note }: ReportSummaryCardProps) {
  return (
    <article className="glass-panel flex min-w-0 flex-col gap-4 rounded-card p-6">
      <header className="flex items-center gap-2.5">
        <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-[12px] border border-border bg-surface">
          <Icon size={17} strokeWidth={1.5} className="text-text-primary" />
        </span>
        <h3 className="text-[13px] font-normal text-text-secondary">{label}</h3>
      </header>

      <div className="flex flex-col gap-1">
        <p className="truncate text-[40px] leading-none font-extralight tracking-[-1px] text-text-primary tabular-nums">
          {value}
        </p>
        <p className="text-[13px] font-normal text-text-muted">{note}</p>
      </div>
    </article>
  );
}
