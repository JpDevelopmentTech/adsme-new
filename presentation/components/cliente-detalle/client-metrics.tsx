import { Activity, Disc3, Link, TrendingUp } from "lucide-react";
import { CLIENT_METRIC_LABELS } from "@/constants/client-detail.constants";
import { ClientMetricCard } from "@/presentation/components/cliente-detalle/client-metric-card";
import type { ClientMetricsProps } from "@/types/client-detail.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

const ICON_SIZE = 19;

/** Fila de métricas agregadas del cliente, en el orden del diseño de `B3`. */
export function ClientMetrics({ metrics }: ClientMetricsProps) {
  const cards = [
    {
      key: "totalJobs",
      icon: <Disc3 size={ICON_SIZE} className="text-brand-violet" aria-hidden />,
      value: String(metrics.totalJobs),
      label: CLIENT_METRIC_LABELS.totalJobs,
    },
    {
      key: "activeJobs",
      icon: <Activity size={ICON_SIZE} className="text-success" aria-hidden />,
      value: String(metrics.activeJobs),
      label: CLIENT_METRIC_LABELS.activeJobs,
    },
    {
      key: "totalInvestment",
      icon: (
        <TrendingUp size={ICON_SIZE} className="text-data-lime" aria-hidden />
      ),
      value: formatCompactCurrency(metrics.totalInvestment),
      label: CLIENT_METRIC_LABELS.totalInvestment,
    },
    {
      key: "sharedLinks",
      icon: <Link size={ICON_SIZE} className="text-data-cyan" aria-hidden />,
      value: String(metrics.sharedLinks),
      label: CLIENT_METRIC_LABELS.sharedLinks,
    },
  ];

  return (
    <section className="flex flex-wrap gap-[18px]">
      {cards.map((card) => (
        <ClientMetricCard
          key={card.key}
          icon={card.icon}
          value={card.value}
          label={card.label}
        />
      ))}
    </section>
  );
}
