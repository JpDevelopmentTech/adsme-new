import type { NominaShowShare, NominaSplitModel } from "@/types/nomina-modales.types";

/**
 * Reparte un ingreso de Show/Otro según el acumulado del mes: primero el
 * Servicio (si lo paga el cliente), luego el % de Utilidad hasta el punto de
 * equilibrio y, pasado este, la Utilidad por show prorrateada (o el mismo %).
 */
export function splitShowIncome(model: NominaSplitModel, before: number, amount: number): NominaShowShare {
  const serviceCap = model.hasService && model.servicePayer === "cliente" ? model.service : 0;
  const threshold = model.minShows * model.nomina;
  const rate = model.profitPercent / 100;

  const service = Math.max(0, Math.min(amount, serviceCap - before));
  const untilMin = Math.max(0, Math.min(amount - service, threshold - Math.max(before, serviceCap)));
  const afterMin = Math.max(0, amount - service - untilMin);
  const afterProfit = model.hasScalability ? model.profitPerShowAfterMin * (amount > 0 ? afterMin / amount : 0) : afterMin * rate;
  const profit = untilMin * rate + Math.min(afterProfit, afterMin);

  return { service, profit, investment: amount - service - profit };
}
