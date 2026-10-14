import { NOMINA_TAX_RATE } from "@/constants/nomina.constants";

/**
 * Rentabilidad neta: Utilidad neta ÷ ingresos propios (Servicio + Utilidad), en
 * porcentaje. La Inversión no cuenta: es presupuesto de Ads del artista.
 * Devuelve `null` si no hay ingresos propios.
 */
export function netMargin(service: number, profit: number): number | null {
  const own = service + profit;
  return own > 0 ? ((profit * (1 - NOMINA_TAX_RATE)) / own) * 100 : null;
}
