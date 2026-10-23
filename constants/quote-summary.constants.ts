/** Ancla del formulario del cotizador. */
export const QUOTE_FORM_ID = "cotizador-formulario";

/** Ancla de la columna de la cotización. */
export const QUOTE_SUMMARY_ID = "cotizador-cotizacion";

/** Diferencia máxima para considerar que la TRM es la oficial. */
export const QUOTE_TRM_TOLERANCE = 0.005;

/** Lo que dura «✓ Copiado» en el botón, en ms. */
export const QUOTE_COPIED_MS = 2000;

/** Parte visible de la columna para marcar «Cotización» en la barra móvil. */
export const QUOTE_SUMMARY_THRESHOLD = 0.15;

/** Colores de la barra proporcional: servicio, ganancia y pauta real. */
export const QUOTE_SHARE_COLORS = {
  service: "#A79FC2",
  profit: "#5EE6A8",
  pauta: "#C9B6FF",
} as const;

/** Logo de la cabecera del PDF y su proporción (ancho / alto). */
export const QUOTE_PRINT_LOGO = { src: "/adsme-logo.png", width: 640, height: 159 } as const;
