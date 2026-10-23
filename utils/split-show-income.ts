import type { NominaShowShare, NominaSplitModel } from "@/types/nomina-modales.types";

/**
 * Reparte un ingreso de Show/Otro según lo facturado antes en el mismo mes,
 * como el original: primero la zona de Servicio (si lo paga el cliente), luego
 * el % de Utilidad hasta el punto de equilibrio y, pasado este, la Utilidad por
 * show prorrateada (o el mismo % sin Escalabilidad). Si AdsME asume el
 * Servicio no hay zona de Servicio: la Utilidad generada lo cubre primero.
 */
export function splitShowIncome(model: NominaSplitModel, before: number, amount: number, serviceCovered = 0): NominaShowShare {
  const threshold = model.minShows * model.nomina;
  const rate = model.profitPercent / 100;
  const end = before + amount;
  const overlap = (low: number, high: number) => Math.max(0, Math.min(end, high) - Math.max(before, low));
  const afterMinProfit = (part: number) =>
    model.hasScalability ? Math.min(part, amount > 0 ? model.profitPerShowAfterMin * (part / amount) : 0) : rate * part;

  if (model.hasService && model.servicePayer === "adsme") {
    const generated = rate * overlap(0, threshold) + afterMinProfit(overlap(threshold, Infinity));
    const service = Math.min(generated, Math.max(0, model.service - serviceCovered));
    return { service, profit: generated - service, investment: amount - generated };
  }

  const serviceCap = model.hasService ? model.service : 0;
  const limit = Math.max(threshold, serviceCap);
  const service = overlap(0, serviceCap);
  const profit = rate * overlap(serviceCap, limit) + afterMinProfit(overlap(limit, Infinity));
  return { service, profit, investment: amount - service - profit };
}
