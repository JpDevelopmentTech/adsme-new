/** Ventanas recientes que se ofrecen como atajo, en días, de la más corta a la más larga. */
export const REPORT_PERIOD_WINDOWS = [7, 30] as const;

/** Textos del filtro de período del reporte; los del formulario son comunes. */
export const REPORT_PERIOD_COPY = {
  presets: "Períodos del reporte",
  wholeLaunch: "Todo el lanzamiento",
  lastDays: (days: number) => `Últimos ${days} días`,
  invalidLink: (reason: string) => `${reason} Se muestra todo el lanzamiento.`,
  /** Aviso sobre las secciones que no se pueden recortar por fechas. */
  wholeCampaignNote: "Esta sección cubre toda la campaña: las plataformas no la entregan por día.",
} as const;
