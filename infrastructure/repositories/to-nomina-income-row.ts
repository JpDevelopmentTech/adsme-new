import type { NominaIncomeDraft } from "@/domain/entities/nomina-income-draft";
import { monthToDate } from "@/utils/month-to-date";

/** Columnas de `nomina_incomes` a partir de un ingreso del dominio. */
export function toIncomeRow(draft: NominaIncomeDraft) {
  return {
    client_id: draft.clientId,
    concept: draft.concept,
    other_concept: draft.concept === "otro" ? draft.otherConcept : null,
    amount: draft.amount,
    event_date: draft.eventDate,
    income_date: draft.incomeDate,
    assigned_month: monthToDate(draft.assignedMonth),
    service: draft.service,
    profit: draft.profit,
    investment: draft.investment,
    profit_percent: draft.params?.profitPercent ?? null,
    profit_per_show: draft.params?.profitPerShowAfterMin ?? null,
    service_assumed: draft.serviceAssumed,
    service_cost: draft.serviceCost,
    service_cost_purpose: draft.serviceCostPurpose,
    description: draft.description,
    document_name: draft.documentName,
  };
}
