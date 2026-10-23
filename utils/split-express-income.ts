import type { NominaShowShare, NominaSplitModel } from "@/types/nomina-modales.types";

/**
 * Reparte un Express sin zonas por umbral, como el original: si el cliente
 * paga el Servicio, primero se cubre lo que falte del mes que cubre y del resto
 * va el % de Utilidad; si lo asume AdsME, la Utilidad generada lo cubre primero.
 */
export function splitExpressIncome(model: NominaSplitModel, before: number, amount: number, serviceCovered: number): NominaShowShare {
  const rate = model.profitPercent / 100;

  if (model.hasService && model.servicePayer === "adsme") {
    const generated = rate * amount;
    const service = Math.min(generated, Math.max(0, model.service - serviceCovered));
    return { service, profit: generated - service, investment: amount - generated };
  }

  const serviceCap = model.hasService ? model.service : 0;
  const service = Math.min(amount, Math.max(0, serviceCap - Math.min(before, serviceCap)));
  const profit = rate * (amount - service);
  return { service, profit, investment: amount - service - profit };
}
