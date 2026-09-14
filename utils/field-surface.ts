import type { FieldSurface } from "@/types/ui.types";

/** Clases de fondo del campo según la superficie sobre la que se apoya. */
export const FIELD_SURFACE_CLASSES: Record<FieldSurface, string> = {
  card: "bg-card",
  elevated: "bg-card-elevated",
};
