import { CONNECTION_CARD_COPY } from "@/constants/connections.constants";
import type { ConnectionMetricsProps } from "@/types/connections.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/** Lo que ha traído la cuenta: campañas, dinero importado y cuándo fue. */
export function ConnectionMetrics({ connection }: ConnectionMetricsProps) {
  const metrics = [
    {
      value: connection.activeCampaigns === null
        ? "—"
        : String(connection.activeCampaigns),
      label: CONNECTION_CARD_COPY.campaigns,
    },
    {
      value: connection.importedSpend === null
        ? "—"
        : formatCompactCurrency(connection.importedSpend),
      label: CONNECTION_CARD_COPY.imported,
    },
    {
      value: connection.lastSyncedLabel ?? "—",
      label: CONNECTION_CARD_COPY.synced,
    },
  ];

  return (
    <dl className="flex gap-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex min-w-0 flex-1 flex-col-reverse gap-0.5"
        >
          <dt className="truncate text-xs text-text-muted">{metric.label}</dt>
          <dd className="truncate text-sm font-semibold text-text-primary">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
