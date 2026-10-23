import type { NominaClientExpense, NominaExpenseTarget, NominaExpenseType } from "@/domain/entities/nomina-expense";

/** Fila de `nomina_expenses`. */
export interface ExpenseRow {
  id: string;
  client_id: string;
  kind: NominaExpenseType;
  concept: string;
  provider: string | null;
  amount: number;
  target: NominaExpenseTarget;
  spent_on: string;
  assigned_month: string;
  description: string | null;
}

/** Columnas que se leen de un gasto. */
export const EXPENSE_COLUMNS = "id, client_id, kind, concept, provider, amount, target, spent_on, assigned_month, description";

/** Gasto del dominio a partir de la fila. */
export function toClientExpense(row: ExpenseRow): NominaClientExpense {
  return {
    id: row.id,
    clientId: row.client_id,
    type: row.kind,
    concept: row.concept,
    provider: row.provider ?? undefined,
    description: row.description ?? undefined,
    amount: Number(row.amount),
    target: row.target,
    date: row.spent_on,
    assignedMonth: row.assigned_month.slice(0, 7),
  };
}
