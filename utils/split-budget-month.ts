import { NOMINA_TAX_RATE } from "@/constants/nomina.constants";
import type { NominaBudgetMonth } from "@/domain/entities/nomina-profile";
import type { BudgetMonthSplit } from "@/types/nomina-perfil.types";

/** Bolsas de un mes del histórico, con los impuestos derivados de la Utilidad. */
export function splitBudgetMonth(month: NominaBudgetMonth): BudgetMonthSplit {
  const taxes = Math.round(month.profit * NOMINA_TAX_RATE);
  return {
    service: month.service,
    netProfit: month.profit - taxes,
    taxes,
    investment: month.investment,
    expressInvestment: month.expressInvestment,
  };
}
