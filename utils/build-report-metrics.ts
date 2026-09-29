import type {
  ReportArtist,
  ReportArtistLaunch,
} from "@/domain/entities/report-artist";
import type { ReportMetric, ReportMetricNote } from "@/types/report.types";
import { formatPercent, share } from "@/utils/format-compact-number";
import { formatExactCurrency } from "@/utils/format-exact-currency";
import { formatExactNumber } from "@/utils/format-exact-number";

function budgetNote(spend: number, investment: number): ReportMetricNote {
  return {
    icon: "cost",
    value: formatPercent(share(spend, investment)),
    label: "del presupuesto",
    tone: "lime",
  };
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
      value: formatExactCurrency(sum((launch) => launch.spend)),
      icon: "spend",
      tone: "lime",
      note: budgetNote(
        sum((launch) => launch.spend),
        sum((launch) => launch.investment),
      ),
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
