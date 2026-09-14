import type { ConnectionPlatform } from "@/domain/entities/connection";

export const JOB_DETAIL_COPY = {
  back: "Trabajos",
  copyLink: "Copiar enlace",
  configureReport: "Configurar reporte",
  markFinished: "Marcar finalizada",
  finished: "Finalizada",
  viewReport: "Ver reporte del cliente",
  noLink: "Sin enlace de reporte",
  evolutionTitle: "Evolución del lanzamiento",
  evolutionSubtitle: "Vistas diarias · últimos 14 días",
  evolutionEmpty:
    "La evolución diaria necesita insights por día, que todavía no se importan. Hoy solo se guardan los totales acumulados de cada campaña.",
  noCampaigns: "Sin campañas vinculadas",
} as const;

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
