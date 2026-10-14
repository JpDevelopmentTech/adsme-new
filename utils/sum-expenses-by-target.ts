import type { NominaExpense, NominaExpenseTarget } from "@/domain/entities/nomina-expense";

/** Suma de los gastos que se descuentan de una bolsa concreta. */
export function sumExpensesByTarget(expenses: NominaExpense[], target: NominaExpenseTarget): number {
  return expenses.filter((expense) => expense.target === target).reduce((sum, expense) => sum + expense.amount, 0);
}
