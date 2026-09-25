/** Ejes por los que adsme reparte una campaña en el reporte. */
export type BreakdownKind = "age" | "gender" | "region";

/**
 * Un tramo del reparto de una campaña: cuántas impresiones se llevó una franja
 * de edad, un sexo o una región.
 *
 * Se guarda el acumulado de toda la vida de la campaña, no un día suelto: las
 * tarjetas del reporte muestran el reparto del lanzamiento entero.
 *
 * Solo lleva impresiones porque es lo único que las tres plataformas reportan
 * por desglose —Google no da alcance por demografía y TikTok no lo da por
 * región—, y las tarjetas son porcentajes: con una métrica común basta, y una
 * que falte en dos de tres falsearía el reparto.
 */
export interface CampaignBreakdownSlice {
  kind: BreakdownKind;
  /** Clave normalizada y común a las tres plataformas: `25-34`, `female`, `bogota`. */
  bucket: string;
  /** Nombre que se pinta, ya en el idioma de la app. */
  label: string;
  impressions: number;
}

/**
 * Un tramo tal como lo entrega la plataforma, todavía sin resolver a qué
 * campaña de adsme pertenece: viene identificado por el id externo.
 */
export interface CampaignBreakdownInsight extends CampaignBreakdownSlice {
  externalCampaignId: string;
}

/** Fila que se escribe en la tabla, ya resuelta la campaña de adsme. */
export interface CampaignBreakdownDraft extends CampaignBreakdownSlice {
  campaignId: string;
}
