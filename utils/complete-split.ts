import { NOMINA_TAX_RATE } from "@/constants/nomina.constants";
import type { NominaSplit } from "@/domain/entities/nomina-bucket";

/** Completa un reparto editado a mano: impuestos y Utilidad neta salen de la Utilidad. */
export function completeSplit(service: number, profit: number, investment: number): NominaSplit {
  const taxes = Math.round(profit * NOMINA_TAX_RATE);
  return { service, profit, investment, taxes, netProfit: profit - taxes };
}
