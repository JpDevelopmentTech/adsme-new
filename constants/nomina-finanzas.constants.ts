import type { NominaIncomeConcept } from "@/domain/entities/nomina-movement";
import type { FinanceTab } from "@/types/nomina-finanzas.types";

/** Pestañas de Finanzas en orden, con el valor de `?pestana=`. */
export const FINANCE_TABS: { value: FinanceTab; label: string }[] = [
  { value: "resumen", label: "Resumen" },
  { value: "flujo", label: "Flujo de caja" },
  { value: "rentabilidad", label: "Rentabilidad" },
  { value: "tributario", label: "Tributario" },
  { value: "libro", label: "Libro" },
];

export const FINANCE_DEFAULT_TAB: FinanceTab = "resumen";

/** Parámetro de la URL que elige la pestaña. */
export const FINANCE_TAB_PARAM = "pestana";

/** Margen neto a partir del cual un artista cuenta como rentable. */
export const PROFITABLE_MARGIN = 10;

/** Por encima de esta parte del ingreso, depender de un artista es «alta» concentración. */
export const HIGH_CONCENTRATION = 50;

/** Artistas en «Cómo se reparte cada artista» y series en la línea de tiempo. */
export const FINANCE_SPLIT_LIMIT = 10;
export const FINANCE_TIMELINE_LIMIT = 6;

/** Caracteres de un nombre bajo una columna antes de cortarlo con «…». */
export const FINANCE_NAME_LIMIT = 10;

/** Paleta de las series por artista, en orden de utilidad neta. */
export const ARTIST_SERIES_COLORS = ["#C9B6FF", "#5EE6A8", "#FFFFFF", "#FFC764", "#7DD3FC", "#A79FC2", "#FFFFFF59"] as const;

/** Libro: filas a la vista antes de «ver más» y tope de filas pintadas. */
export const LEDGER_PREVIEW_ROWS = 12;
export const LEDGER_MAX_ROWS = 300;

/** Nombre de cada concepto como origen del flujo de caja. */
export const FLOW_CONCEPT_LABELS: Record<NominaIncomeConcept, string> = {
  show: "Shows",
  express: "Express",
  inversion: "Inversión Única",
  otro: "Otros",
};

/** Artistas que se nombran como origen; el resto se agrupa en «Otros (n)». */
export const FLOW_ARTIST_LIMIT = 7;
