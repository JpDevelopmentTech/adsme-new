import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaClientExpense } from "@/domain/entities/nomina-expense";
import type { NominaExpenseDraft } from "@/domain/entities/nomina-expense-draft";
import type { NominaIncomeDraft } from "@/domain/entities/nomina-income-draft";
import type { NominaClientMovement } from "@/domain/entities/nomina-movement";

/**
 * Port de los ingresos y gastos de los artistas de Nómina. Las lecturas lanzan
 * si la infraestructura falla; las escrituras devuelven `NominaResult`.
 */
export interface NominaLedgerRepository {
  /** Ingresos de todos los artistas, del más reciente al más antiguo. */
  listIncomes(): Promise<NominaClientMovement[]>;

  /** Gastos de todos los artistas, del más reciente al más antiguo. */
  listExpenses(): Promise<NominaClientExpense[]>;

  createIncome(draft: NominaIncomeDraft): Promise<NominaResult<{ id: string }>>;

  updateIncome(id: string, draft: NominaIncomeDraft): Promise<NominaResult<null>>;

  deleteIncome(id: string): Promise<NominaResult<null>>;

  createExpense(draft: NominaExpenseDraft): Promise<NominaResult<{ id: string }>>;

  updateExpense(id: string, draft: NominaExpenseDraft): Promise<NominaResult<null>>;

  deleteExpense(id: string): Promise<NominaResult<null>>;
}
