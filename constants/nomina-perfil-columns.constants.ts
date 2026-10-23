import type { EmptyTableColumn } from "@/types/nomina-perfil.types";

/** Columnas del «Historial de Campañas» de la pestaña Ads. */
export const ADS_COLUMNS: EmptyTableColumn[] = [
  { label: "Campaña" },
  { label: "Plataforma", align: "center" },
  { label: "Gastado", align: "right" },
  { label: "Estado", align: "center" },
];

/** Columna extra del panel interno: abrir el trabajo (nunca en el portal del artista). */
export const ADS_LINK_COLUMN: EmptyTableColumn = { label: "Trabajo", align: "center" };

/** Columnas de «Piezas de Contenido» (Optimización). */
export const PIECES_COLUMNS: EmptyTableColumn[] = [{ label: "Plataforma" }, { label: "Título / Nombre" }, { label: "Fecha" }, { label: "Link" }];

/** Columnas de «Obras Registradas» (Legal). */
export const WORKS_COLUMNS: EmptyTableColumn[] = [{ label: "Obra / Canción" }, { label: "Estatus DNDA" }, { label: "Master %" }, { label: "Composición %" }];
