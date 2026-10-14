import type { NominaBucketKey } from "@/domain/entities/nomina-bucket";

/** Etiqueta y color de cada bolsa, iguales en barras, gráficas y leyendas. */
export const BUCKET_META: Record<NominaBucketKey, { label: string; color: string }> = {
  servicio: { label: "Servicio", color: "#A79FC2" },
  utilidad: { label: "Utilidad", color: "#5EE6A8" },
  utilidadNeta: { label: "Utilidad neta", color: "#A6F4CF" },
  impuestos: { label: "Impuestos", color: "#FF6B81" },
  inversion: { label: "Inversión", color: "#C9B6FF" },
  inversionExpress: { label: "Inversión Express", color: "#8F6BFF" },
};

/** Tramos de la regla de shows: qué cubrió cada show del mes. */
export const RULER_COLORS = {
  service: "#A79FC2",
  untilMin: "#C9B6FF",
  afterMin: "#5EE6A8",
  pending: "#FFFFFF1F",
} as const;

export const RULER_LEGEND = [
  { label: "cubre el Servicio", color: RULER_COLORS.service },
  { label: "hasta el mínimo", color: RULER_COLORS.untilMin },
  { label: "después del mínimo", color: RULER_COLORS.afterMin },
  { label: "pendiente para la meta", color: RULER_COLORS.pending },
] as const;
