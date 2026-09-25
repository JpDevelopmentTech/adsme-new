import { Fragment } from "react";
import { REPORT_SUMMARY_COPY } from "@/constants/report.constants";
import type { ReportSummaryStripProps } from "@/types/report.types";
import { formatPercent, share } from "@/utils/format-compact-number";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatExactNumber } from "@/utils/format-exact-number";

/**
 * Las tres cifras que dan contexto al titular: qué se reprodujo, cuánto se
 * interactuó y cuánto costó. Van en una tira y no en tarjetas sueltas para que
 * se lean como un mismo dato en tres partes.
 */
export function ReportSummaryStrip({ totals, investment }: ReportSummaryStripProps) {
  const stats = [
    {
      label: REPORT_SUMMARY_COPY.plays,
      value: formatExactNumber(totals.videoPlays),
      note: REPORT_SUMMARY_COPY.campaigns(totals.campaigns),
    },
    {
      label: REPORT_SUMMARY_COPY.engagement,
      value: formatExactNumber(totals.engagement),
      note: REPORT_SUMMARY_COPY.social(totals.comments + totals.shares),
    },
    {
      label: REPORT_SUMMARY_COPY.spend,
      value: formatExactCurrency(totals.spend),
      note: REPORT_SUMMARY_COPY.budget(
        formatPercent(share(totals.spend, investment)),
      ),
    },
  ];

  return (
    <section className="glass-panel flex flex-wrap items-center gap-y-5 rounded-card py-5">
      {stats.map((stat, index) => (
        <Fragment key={stat.label}>
          {index > 0 ? (
            <span aria-hidden className="hidden h-[50px] w-px bg-border/60 sm:block" />
          ) : null}

          <div className="flex min-w-[200px] flex-1 flex-col gap-[5px] px-6">
            <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
              {stat.label}
            </span>
            <span className="font-display text-[30px] leading-none font-light tracking-[-1.1px] text-text-primary">
              {stat.value}
            </span>
            <span className="text-[11.5px] text-text-secondary">{stat.note}</span>
          </div>
        </Fragment>
      ))}
    </section>
  );
}
