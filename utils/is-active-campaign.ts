/**
 * Cada plataforma nombra el mismo estado a su manera: Meta dice `ACTIVE`,
 * Google Ads `ENABLED` y TikTok `ENABLE`. La campaña se guarda con el estado
 * crudo que devuelve su plataforma, así que la equivalencia vive aquí.
 *
 * La misma lista está replicada en las funciones SQL del reporte
 * (`get_report_metrics` y compañía), que no pueden importar este módulo.
 */
const ACTIVE_STATUSES = new Set(["ACTIVE", "ENABLED", "ENABLE"]);

export function isActiveCampaignStatus(status: string): boolean {
  return ACTIVE_STATUSES.has(status.trim().toUpperCase());
}
