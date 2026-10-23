import type { NominaExpenseDraft } from "@/domain/entities/nomina-expense-draft";
import type { NominaExpenseValues } from "@/types/nomina-modales-gasto.types";

/** Gasto como se guarda: textos recortados y los opcionales vacíos como `null`. */
export function buildExpenseDraft(clientId: string, values: NominaExpenseValues): NominaExpenseDraft {
  return {
    clientId,
    type: values.type,
    concept: values.concept.trim(),
    provider: values.provider.trim() || null,
    amount: values.amount ?? 0,
    target: values.target,
    date: values.date,
    assignedMonth: values.month,
    description: values.description.trim() || null,
  };
}
