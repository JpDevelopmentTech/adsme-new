import { Heart, Play, Wallet } from "lucide-react";
import { REPORT_SUMMARY_COPY } from "@/constants/report.constants";
import { ReportSummaryCard } from "@/presentation/components/reporte/report-summary-card";
import type { ReportSummaryStripProps } from "@/types/report.types";
import { cn } from "@/utils/cn";
import { formatPercent, share } from "@/utils/format-compact-number";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatExactNumber } from "@/utils/format-exact-number";
import { isReportSectionVisible } from "@/utils/is-report-section-visible";

/**
 * Las tres cifras que dan contexto al titular: qué se reprodujo, cuánto se
 * interactuó y cuánto costó. Las que el gestor ocultó se retiran y las que
 * quedan se reparten el ancho, en lugar de dejar un hueco.
 */
export function ReportSummaryStrip({ totals, investment, hiddenSections }: ReportSummaryStripProps) {
  const stats = [
    {
      section: "plays" as const,
      icon: Play,
      label: REPORT_SUMMARY_COPY.plays,
      value: formatExactNumber(totals.videoPlays),
      note: REPORT_SUMMARY_COPY.campaigns(totals.campaigns),
    },
    {
      section: "engagement" as const,
      icon: Heart,
      label: REPORT_SUMMARY_COPY.engagement,
      value: formatExactNumber(totals.engagement),
      note: REPORT_SUMMARY_COPY.social(totals.comments + totals.shares),
    },
    {
      section: "investment" as const,
      icon: Wallet,
      label: REPORT_SUMMARY_COPY.spend,
      value: formatExactCurrency(totals.spend),
      note: REPORT_SUMMARY_COPY.budget(formatPercent(share(totals.spend, investment))),
    },
  ].filter((stat) => isReportSectionVisible(hiddenSections, stat.section));

  if (stats.length === 0) return null;

  return (
    <section
      className={cn(
        "grid gap-4",
        stats.length === 3 && "md:grid-cols-3",
        stats.length === 2 && "sm:grid-cols-2",
      )}
    >
      {stats.map(({ section, ...stat }) => (
        <ReportSummaryCard key={section} {...stat} />
      ))}
    </section>
  );
}
