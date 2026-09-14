import type { ConnectionPlatform } from "@/domain/entities/connection";

export const LINK_CAMPAIGN_COPY = {
  back: "Campañas",
  title: "Vincular campaña",
  subtitle:
    "Busca campañas en tus cuentas conectadas y asócialas a un trabajo.",
  searchPlaceholder: "Buscar campaña por nombre o ID…",
  mappingTitle: "Mapeo al trabajo",
  targetLabel: "Trabajo de destino",
  targetPlaceholder: "Elige el trabajo",
  selectedLabel: "CAMPAÑAS SELECCIONADAS",
  submit: (count: number) =>
    count === 1 ? "Vincular 1 campaña" : `Vincular ${count} campañas`,
  note: "Los datos se importarán y sincronizarán automáticamente cada hora.",
  noConnection: "Conecta la cuenta de esta plataforma para ver sus campañas.",
  noCampaigns:
    "No hay campañas importadas en esta cuenta. Sincroniza desde Conexiones.",
  noResults: "Ninguna campaña coincide con la búsqueda.",
  needsTarget: "Elige el trabajo de destino antes de vincular.",
  needsSelection: "Selecciona al menos una campaña.",
} as const;

/** Nombre corto de cada plataforma en las pestañas del selector. */
export const PLATFORM_TABS: { platform: ConnectionPlatform; label: string }[] = [
  { platform: "google_ads", label: "YouTube" },
  { platform: "meta", label: "Meta" },
  { platform: "tiktok", label: "TikTok" },
];

