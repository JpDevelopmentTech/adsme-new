import type { ConnectionPlatform } from "@/domain/entities/connection";

export const JOB_DETAIL_COPY = {
  /** Rótulo sobre el título del trabajo en la cabecera del detalle. */
  eyebrow: "Lanzamiento",
  back: "Trabajos",
  copyLink: "Copiar enlace",
  configureReport: "Configurar reporte",
  markFinished: "Marcar finalizada",
  finished: "Finalizada",
  viewReport: "Ver reporte del cliente",
  noLink: "Sin enlace de reporte",
  evolutionTitle: "Evolución del lanzamiento",
  evolutionSubtitle: (period: string) => `Reproducciones por día · ${period}`,
  evolutionEmpty:
    "Las campañas de este lanzamiento no tienen reproducciones registradas en estas fechas. Aparecen aquí al sincronizar sus métricas.",
  noCampaigns: "Sin campañas vinculadas",
} as const;

/** Días que cubre la gráfica de evolución del detalle. */
export const JOB_EVOLUTION_DAYS = 14;

export const JOB_KPI_LABELS = {
  views: "Vistas totales",
  reach: "Alcance",
  spend: "Inversión",
  ctr: "CTR promedio",
} as const;

/** Métrica principal y nombre comercial de cada plataforma, según el diseño. */
export const PLATFORM_PRIMARY_METRIC: Record<
  ConnectionPlatform,
  { label: string; name: string }
> = {
  google_ads: { label: "Vistas", name: "YouTube" },
  meta: { label: "Alcance", name: "Meta Ads" },
  tiktok: { label: "Reprod.", name: "TikTok Ads" },
};
