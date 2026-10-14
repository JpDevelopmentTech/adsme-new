import type { ApexAxisChartSeries } from "apexcharts";
import { FINANCE_SUMMARY_COPY } from "@/constants/nomina-finanzas-copy.constants";
import type { NominaMonthSplit } from "@/domain/entities/nomina-bucket";
import { computeNominaTax } from "@/utils/compute-nomina-tax";
import { shareOf } from "@/utils/share-of";

/**
 * Series de «Evolución mensual»: el reparto de cada mes en columnas apiladas
 * (Servicio, Utilidad neta, Impuestos, Inversión) y el margen neto en línea.
 */
export function buildEvolutionSeries(months: NominaMonthSplit[]): ApexAxisChartSeries {
  const taxes = months.map((month) => computeNominaTax(month.profit));

  return [
    { name: "Servicio", type: "column", data: months.map((month) => month.service) },
    { name: "Utilidad neta", type: "column", data: months.map((month, index) => month.profit - taxes[index]) },
    { name: "Impuestos", type: "column", data: taxes },
    { name: "Inversión", type: "column", data: months.map((month) => month.investment + month.expressInvestment) },
    {
      name: FINANCE_SUMMARY_COPY.evolutionMargin,
      type: "line",
      data: months.map((month, index) => shareOf(month.profit - taxes[index], month.income)),
    },
  ];
}
