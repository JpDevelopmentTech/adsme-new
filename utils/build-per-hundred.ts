import type { FinanceFigures, PerHundredPart } from "@/types/nomina-finanzas.types";

/** Las cuatro bolsas en las que acaba cada peso que entra, en el orden de la barra. */
export function buildPerHundred(figures: FinanceFigures): PerHundredPart[] {
  return [
    { key: "servicio", label: "Servicio", amount: figures.service },
    { key: "impuestos", label: "Impuestos", amount: figures.taxes },
    { key: "utilidadNeta", label: "Utilidad neta", amount: figures.netProfit },
    { key: "inversion", label: "Inversión en Ads", amount: figures.investment },
  ];
}
