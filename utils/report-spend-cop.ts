import type { ReportSpend } from "@/domain/entities/report-spend";

/**
 * Total en pesos del gasto del reporte: lo que ya era en pesos más los dólares
 * convertidos. Cada parte se redondea al peso antes de sumar, para que el
 * desglose que ve el cliente («$X en pesos + US$Y × $TRM») cuadre exacto con el
 * total. Lo pendiente (dólares sin TRM, otras monedas) no entra.
 */
export function reportSpendCop(spend: ReportSpend): number {
  return spend.conversions.reduce(
    (total, { usd, rate }) => total + Math.round(usd * rate),
    Math.round(spend.nativeCop),
  );
}
