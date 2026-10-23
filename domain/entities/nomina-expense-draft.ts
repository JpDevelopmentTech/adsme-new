import type { NominaExpenseTarget, NominaExpenseType } from "@/domain/entities/nomina-expense";

/** Datos de un gasto al registrarlo o editarlo. */
export interface NominaExpenseDraft {
  clientId: string;
  type: NominaExpenseType;
  concept: string;
  provider: string | null;
  amount: number;
  target: NominaExpenseTarget;
  date: string;
  /** `AAAA-MM`. */
  assignedMonth: string;
  description: string | null;
}
