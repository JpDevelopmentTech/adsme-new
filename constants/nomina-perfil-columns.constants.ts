import type { EmptyTableColumn } from "@/types/nomina-perfil.types";

/** Columnas del «Historial de Campañas» de la pestaña Ads. */
export const ADS_COLUMNS: EmptyTableColumn[] = [
  { label: "Campaña" },
  { label: "Plataforma" },
  { label: "Inversión", align: "right" },
  { label: "Gastado", align: "right" },
  { label: "Estado", align: "center" },
  { label: "Link", align: "center" },
];

/** Columnas de «Piezas de Contenido» (Optimización). */
export const PIECES_COLUMNS: EmptyTableColumn[] = [{ label: "Plataforma" }, { label: "Título / Nombre" }, { label: "Fecha" }, { label: "Link" }];

/** Columnas de «Obras Registradas» (Legal). */
export const WORKS_COLUMNS: EmptyTableColumn[] = [{ label: "Obra / Canción" }, { label: "Estatus DNDA" }, { label: "Master %" }, { label: "Composición %" }];
