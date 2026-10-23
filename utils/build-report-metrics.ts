import type {
  ReportArtist,
  ReportArtistLaunch,
} from "@/domain/entities/report-artist";
import type {
  ReportMetric,
  ReportMetricNote,
  SpendSummary,
} from "@/types/report.types";
import { buildSpendSummary } from "@/utils/build-spend-summary";
import { formatExactNumber } from "@/utils/format-exact-number";
import { mergeReportSpend } from "@/utils/merge-report-spend";

/** Nota de la tarjeta de lo invertido, con el mismo texto que la del lanzamiento. */
function spendNote(summary: SpendSummary): ReportMetricNote {
  return { icon: "cost", value: summary.note, label: "", tone: "lime" };
}

/**
 * Resumen del reporte consolidado del artista. Sin inversión visible se omite
 * la tarjeta de lo invertido.
 */
export function buildArtistMetrics(
  artist: ReportArtist,
  showSpend: boolean,
): ReportMetric[] {
  const sum = (pick: (launch: ReportArtistLaunch) => number) =>
    artist.launches.reduce((total, launch) => total + pick(launch), 0);

  // Cada lanzamiento ya viene convertido con su propia TRM: aquí solo se une.
  const spend = buildSpendSummary(
    mergeReportSpend(artist.launches.map((launch) => launch.spend)),
    sum((launch) => launch.investment),
  );
  const campaigns = sum((launch) => launch.campaigns);
  const active = sum((launch) => launch.activeCampaigns);

  const metrics: ReportMetric[] = [
    {
      label: "Reproducciones",
      value: formatExactNumber(sum((launch) => launch.videoPlays)),
      icon: "views",
      tone: "violet",
      note: {
        icon: "campaigns",
        value: String(artist.launches.length),
        label: artist.launches.length === 1 ? "lanzamiento" : "lanzamientos",
        tone: "violet",
      },
    },
    {
      label: "Inversión",
      value: spend.value,
      icon: "spend",
      tone: "lime",
      note: spendNote(spend),
      detail: spend.detail,
    },
    {
      label: "Campañas",
      value: String(campaigns),
      icon: "campaigns",
      tone: "magenta",
      note: {
        icon: "campaigns",
        value: String(active),
        label: `activas · ${campaigns - active} sin entrega`,
        tone: "magenta",
      },
    },
  ];

  return showSpend
    ? metrics
    : metrics.filter((metric) => metric.icon !== "spend");
}
