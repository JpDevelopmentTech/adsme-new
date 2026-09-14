import { REPORT_PLATFORM_SECTION } from "@/constants/report.constants";
import type {
  ReportArtist,
  ReportArtistLaunch,
} from "@/domain/entities/report-artist";
import type {
  ReportPlatformMetrics,
  ReportTotals,
} from "@/domain/entities/report-metrics";
import type {
  ReportMetric,
  ReportMetricNote,
  ReportTone,
} from "@/types/report.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";
import {
  formatCompactNumber,
  formatPercent,
  share,
} from "@/utils/format-compact-number";

function campaignsNote(count: number, tone: ReportTone): ReportMetricNote {
  return {
    icon: "campaigns",
    value: String(count),
    label: count === 1 ? "campaña" : "campañas",
    tone,
  };
}

/** Lo que el artista reconoce como interacción: comentarios y compartidos. */
function socialNote(
  comments: number,
  shares: number,
  tone: ReportTone,
): ReportMetricNote {
  return {
    icon: "comments",
    value: formatCompactNumber(comments + shares),
    label: "comentarios y compartidos",
    tone,
  };
}

function budgetNote(spend: number, investment: number): ReportMetricNote {
  return {
    icon: "cost",
    value: formatPercent(share(spend, investment)),
    label: "del presupuesto",
    tone: "lime",
  };
}

/**
 * Resumen del lanzamiento. El alcance no está aquí: abre el reporte como
 * titular, porque es la única cifra que responde a «¿cuánta gente me oyó?».
 *
 * El diseño pone una variación semanal bajo cada cifra, pero no guardamos
 * histórico: en su lugar va una segunda métrica real que da contexto a la
 * primera, sin inventar una tendencia que nadie ha medido.
 */
export function buildCrossMetrics(
  totals: ReportTotals,
  investment: number,
): ReportMetric[] {
  return [
    {
      label: "Reproducciones",
      value: formatCompactNumber(totals.videoPlays),
      icon: "views",
      tone: "violet",
      note: campaignsNote(totals.campaigns, "violet"),
    },
    {
      label: "Interacciones",
      value: formatCompactNumber(totals.engagement),
      icon: "engagement",
      tone: "magenta",
      note: socialNote(totals.comments, totals.shares, "magenta"),
    },
    {
      label: "Inversión",
      value: formatCompactCurrency(totals.spend),
      icon: "spend",
      tone: "lime",
      note: budgetNote(totals.spend, investment),
    },
  ];
}

/** Resumen del reporte consolidado del artista. */
export function buildArtistMetrics(artist: ReportArtist): ReportMetric[] {
  const sum = (pick: (launch: ReportArtistLaunch) => number) =>
    artist.launches.reduce((total, launch) => total + pick(launch), 0);

  const campaigns = sum((launch) => launch.campaigns);
  const active = sum((launch) => launch.activeCampaigns);

  return [
    {
      label: "Reproducciones",
      value: formatCompactNumber(sum((launch) => launch.videoPlays)),
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
      value: formatCompactCurrency(sum((launch) => launch.spend)),
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
}

/**
 * Las tres plataformas muestran exactamente las mismas métricas. Antes cada una
 * enseñaba lo suyo —CPV en YouTube, clics al enlace en Meta, clics al perfil en
 * TikTok—, así que no había forma de compararlas entre sí.
 */
export function buildPlatformMetrics(
  metrics: ReportPlatformMetrics,
): ReportMetric[] {
  const tone = REPORT_PLATFORM_SECTION[metrics.platform].tone;

  return [
    {
      label: "Personas alcanzadas",
      value: formatCompactNumber(metrics.reach),
      icon: "reach",
      tone,
      note: campaignsNote(metrics.campaigns, tone),
    },
    {
      label: "Reproducciones",
      value: formatCompactNumber(metrics.videoPlays),
      icon: "views",
      tone,
      note: {
        icon: "clicks",
        value: formatCompactNumber(metrics.clicks),
        label: "clics",
        tone,
      },
    },
    {
      label: "Interacciones",
      value: formatCompactNumber(metrics.engagement),
      icon: "engagement",
      tone,
      note: socialNote(metrics.comments, metrics.shares, tone),
    },
  ];
}
