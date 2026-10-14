import type { NominaExpense, NominaExpenseTarget, NominaExpenseType } from "@/domain/entities/nomina-expense";
import type { NominaModalArtist } from "@/types/nomina-modals.types";

/** Valores del formulario de gasto. */
export interface NominaExpenseValues {
  type: NominaExpenseType;
  concept: string;
  provider: string;
  amount: number | null;
  target: NominaExpenseTarget;
  date: string;
  month: string;
  /** El mes deja de seguir a la fecha cuando se elige a mano. */
  isMonthTouched: boolean;
  description: string;
}

/** Formulario de gasto (hook `useExpenseForm`). */
export interface NominaExpenseFormState {
  values: NominaExpenseValues;
  set: (patch: Partial<NominaExpenseValues>) => void;
  selectType: (type: NominaExpenseType) => void;
  setDate: (date: string) => void;
  canSave: boolean;
}

export interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist: NominaModalArtist;
  /** Con él, el modal abre en modo edición precargado. */
  expense?: NominaExpense;
}

export interface ExpenseSectionProps {
  form: NominaExpenseFormState;
}
