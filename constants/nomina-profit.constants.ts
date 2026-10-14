import type { ProfitLevel } from "@/types/nomina-ui.types";

/** Veredicto de rentabilidad: etiqueta literal y color de cada nivel. */
export const PROFIT_LEVEL_META: Record<ProfitLevel, { label: string; color: string }> = {
  sinUtilidad: { label: "Sin utilidad aún", color: "#FFFFFF8F" },
  bajo: { label: "Margen bajo", color: "#FF9F6B" },
  ajustado: { label: "Rentable ajustado", color: "#FFC764" },
  rentable: { label: "Rentable", color: "#5EE6A8" },
  muyRentable: { label: "Muy rentable", color: "#2FD08C" },
};

/** Zonas de la barra de rentabilidad, de 0 a 30 %. */
export const PROFIT_BAR_ZONES = [
  { from: 0, to: 5, color: "#FF6B8159" },
  { from: 5, to: 10, color: "#FFC76459" },
  { from: 10, to: 20, color: "#5EE6A84D" },
  { from: 20, to: 30, color: "#5EE6A899" },
] as const;
