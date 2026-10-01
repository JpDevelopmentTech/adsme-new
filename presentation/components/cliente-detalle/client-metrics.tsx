import { Activity, Disc3, Link, Wallet } from "lucide-react";
import { CLIENT_METRIC_LABELS } from "@/constants/client-detail.constants";
import { ClientMetricCard } from "@/presentation/components/cliente-detalle/client-metric-card";
import type { ClientMetricsProps } from "@/types/client-detail.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

const ICON_SIZE = 18;

/** Las cuatro cifras del cliente en tarjetas de vidrio, en el orden del diseño. */
export function ClientMetrics({ metrics }: ClientMetricsProps) {
  const cards = [
    { key: "totalJobs", Icon: Disc3, value: String(metrics.totalJobs), label: CLIENT_METRIC_LABELS.totalJobs },
    { key: "activeJobs", Icon: Activity, value: String(metrics.activeJobs), label: CLIENT_METRIC_LABELS.activeJobs },
    {
      key: "totalInvestment",
      Icon: Wallet,
      value: formatCompactCurrency(metrics.totalInvestment),
      label: CLIENT_METRIC_LABELS.totalInvestment,
    },
    { key: "sharedLinks", Icon: Link, value: String(metrics.sharedLinks), label: CLIENT_METRIC_LABELS.sharedLinks },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, Icon, value, label }) => (
        <ClientMetricCard
          key={key}
          icon={<Icon size={ICON_SIZE} strokeWidth={1.5} className="text-text-primary" aria-hidden />}
          value={value}
          label={label}
        />
      ))}
    </section>
  );
}
