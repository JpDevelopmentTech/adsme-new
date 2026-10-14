import type { ApexOptions } from "apexcharts";
import { BUCKET_META } from "@/constants/nomina-buckets.constants";
import type { NominaBucketAmount } from "@/domain/entities/nomina-bucket";
import type { DistributionView } from "@/types/nomina-chart.types";
import { buildNominaChartBase } from "@/utils/build-nomina-chart-base";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/** Opciones de la distribución del mes como dona o como barras. */
export function buildDistributionOptions(parts: NominaBucketAmount[], view: DistributionView): ApexOptions {
  const base = buildNominaChartBase();
  const colors = parts.map((part) => BUCKET_META[part.key].color);
  const labels = parts.map((part) => BUCKET_META[part.key].label);
  const total = parts.reduce((sum, part) => sum + part.amount, 0);

  if (view === "dona") {
    return {
      ...base,
      chart: { ...base.chart, type: "donut" },
      colors,
      labels,
      stroke: { width: 3, colors: ["#120a23"] },
      plotOptions: {
        pie: {
          donut: {
            size: "72%",
            labels: {
              show: true,
              name: { show: true, offsetY: 18, color: "#ffffff8f", fontSize: "11px" },
              value: { show: true, offsetY: -14, color: "#ffffff", fontSize: "20px", fontWeight: 200, formatter: () => formatCompactCurrency(total) },
              total: { show: true, label: "Total", color: "#ffffff8f", fontSize: "11px", formatter: () => formatCompactCurrency(total) },
            },
          },
        },
      },
    };
  }

  return {
    ...base,
    chart: { ...base.chart, type: "bar" },
    colors,
    plotOptions: { bar: { horizontal: view === "horizontal", distributed: true, borderRadius: 6, borderRadiusApplication: "end", barHeight: "60%", columnWidth: "55%" } },
    xaxis: { categories: labels, labels: { show: view === "vertical" } },
    yaxis: { labels: { show: view === "horizontal" } },
    grid: { show: false },
  };
}
