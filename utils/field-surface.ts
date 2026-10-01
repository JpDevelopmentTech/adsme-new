import type { FieldSurface } from "@/types/ui.types";

/**
 * Clases de fondo del campo según la superficie sobre la que se apoya. En el
 * sistema v3 todos los campos son del carbón del logotipo, translúcido, así que
 * las dos superficies comparten fondo; la distinción se mantiene para no tocar
 * a quien ya la usa.
 */
export const FIELD_SURFACE_CLASSES: Record<FieldSurface, string> = {
  card: "bg-card-elevated",
  elevated: "bg-card-elevated",
};
