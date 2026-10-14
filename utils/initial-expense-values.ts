import { EXPENSE_TYPE_DEFAULTS } from "@/constants/nomina-modales.constants";
import type { NominaExpense } from "@/domain/entities/nomina-expense";
import type { NominaExpenseValues } from "@/types/nomina-modales-gasto.types";

/** Valores iniciales del gasto: los guardados al editar, o una «Spotify Playlist» con fecha `today`. */
export function initialExpenseValues(today: string, expense?: NominaExpense): NominaExpenseValues {
  if (expense) {
    return {
      type: expense.type,
      concept: expense.concept,
      provider: expense.provider ?? "",
      amount: expense.amount,
      target: expense.target,
      date: expense.date,
      month: expense.assignedMonth,
      isMonthTouched: true,
      description: expense.description ?? "",
    };
  }
  return { type: "spotify", ...EXPENSE_TYPE_DEFAULTS.spotify, provider: "", amount: null, date: today, month: today.slice(0, 7), isMonthTouched: false, description: "" };
}
