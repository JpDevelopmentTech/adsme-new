import { NOMINA_TAX_RATE } from "@/constants/nomina.constants";

/** Impuesto causado por una Utilidad: el 30 % que fija el modelo. */
export function computeNominaTax(profit: number): number {
  return profit * NOMINA_TAX_RATE;
}
