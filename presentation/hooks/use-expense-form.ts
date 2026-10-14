"use client";

import { useState } from "react";
import { EXPENSE_TYPE_DEFAULTS } from "@/constants/nomina-modales.constants";
import type { NominaExpense, NominaExpenseType } from "@/domain/entities/nomina-expense";
import type { NominaExpenseFormState, NominaExpenseValues } from "@/types/nomina-modales-gasto.types";
import { initialExpenseValues } from "@/utils/initial-expense-values";
import { todayIso } from "@/utils/today-iso";

/** Estado del modal de gasto: el tipo fija concepto y destino; el mes sigue a la fecha. */
export function useExpenseForm(expense?: NominaExpense): NominaExpenseFormState {
  const [values, setValues] = useState(() => initialExpenseValues(todayIso(), expense));
  const set = (patch: Partial<NominaExpenseValues>) => setValues((current) => ({ ...current, ...patch }));

  return {
    values,
    set,
    selectType: (type: NominaExpenseType) => set({ type, ...EXPENSE_TYPE_DEFAULTS[type] }),
    setDate: (date: string) => setValues((current) => ({ ...current, date, month: current.isMonthTouched ? current.month : date.slice(0, 7) })),
    canSave: (values.amount ?? 0) > 0 && values.concept.trim() !== "" && values.date !== "" && values.month !== "",
  };
}
