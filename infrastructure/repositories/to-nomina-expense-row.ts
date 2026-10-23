import type { NominaExpenseDraft } from "@/domain/entities/nomina-expense-draft";
import { monthToDate } from "@/utils/month-to-date";

/** Columnas de `nomina_expenses` a partir de un gasto del dominio. */
export function toExpenseRow(draft: NominaExpenseDraft) {
  return {
    client_id: draft.clientId,
    kind: draft.type,
    concept: draft.concept,
    provider: draft.provider,
    amount: draft.amount,
    target: draft.target,
    spent_on: draft.date,
    assigned_month: monthToDate(draft.assignedMonth),
    description: draft.description,
  };
}
