import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import type { NominaResult } from "@/domain/entities/nomina-enrollment-error";
import type { NominaLedgerRepository } from "@/domain/interfaces/nomina-ledger-repository";
import { EXPENSE_COLUMNS, toClientExpense, type ExpenseRow } from "@/infrastructure/repositories/nomina-expense-row";
import { INCOME_COLUMNS, toClientMovement, type IncomeRow } from "@/infrastructure/repositories/nomina-income-row";
import { toNominaLedgerError } from "@/infrastructure/repositories/supabase-nomina-ledger-error-mapper";
import { toExpenseRow } from "@/infrastructure/repositories/to-nomina-expense-row";
import { toIncomeRow } from "@/infrastructure/repositories/to-nomina-income-row";
import { isUuid } from "@/utils/is-uuid";

const INCOMES = "nomina_incomes";
const EXPENSES = "nomina_expenses";
const NOT_FOUND = { success: false as const, error: { code: "record_not_found" as const } };

/** Traduce el resultado de una escritura que afecta una fila por id. */
function rowResult(error: PostgrestError | null, rows: unknown[] | null): NominaResult<null> {
  if (error) return { success: false, error: toNominaLedgerError(error) };
  return rows && rows.length > 0 ? { success: true, value: null } : NOT_FOUND;
}

/**
 * Ingresos y gastos de Nómina sobre Supabase. El aislamiento entre usuarios lo
 * garantizan las políticas RLS; la FK con `client_payroll` impide registrar
 * movimientos de un cliente que no está inscrito.
 */
export function createSupabaseNominaLedgerRepository(supabase: SupabaseClient): NominaLedgerRepository {
  /** Inserta una fila y devuelve su id. */
  const insert = async (table: string, values: Record<string, unknown>): Promise<NominaResult<{ id: string }>> => {
    const { data, error } = await supabase.from(table).insert(values).select("id").single<{ id: string }>();
    return error ? { success: false, error: toNominaLedgerError(error) } : { success: true, value: { id: data.id } };
  };

  /** Actualiza una fila por id. */
  const update = async (table: string, id: string, values: Record<string, unknown>): Promise<NominaResult<null>> => {
    if (!isUuid(id)) return NOT_FOUND;
    const { data, error } = await supabase.from(table).update(values).eq("id", id).select("id");
    return rowResult(error, data);
  };

  /** Borra una fila por id. */
  const remove = async (table: string, id: string): Promise<NominaResult<null>> => {
    if (!isUuid(id)) return NOT_FOUND;
    const { data, error } = await supabase.from(table).delete().eq("id", id).select("id");
    return rowResult(error, data);
  };

  return {
    async listIncomes() {
      const { data, error } = await supabase
        .from(INCOMES)
        .select(INCOME_COLUMNS)
        .order("income_date", { ascending: false })
        .order("created_at", { ascending: false })
        .returns<IncomeRow[]>();
      if (error) throw error;
      return data.map(toClientMovement);
    },
    async listExpenses() {
      const { data, error } = await supabase
        .from(EXPENSES)
        .select(EXPENSE_COLUMNS)
        .order("spent_on", { ascending: false })
        .order("created_at", { ascending: false })
        .returns<ExpenseRow[]>();
      if (error) throw error;
      return data.map(toClientExpense);
    },
    createIncome: (draft) => insert(INCOMES, toIncomeRow(draft)),
    updateIncome: (id, draft) => update(INCOMES, id, toIncomeRow(draft)),
    deleteIncome: (id) => remove(INCOMES, id),
    createExpense: (draft) => insert(EXPENSES, toExpenseRow(draft)),
    updateExpense: (id, draft) => update(EXPENSES, id, toExpenseRow(draft)),
    deleteExpense: (id) => remove(EXPENSES, id),
  };
}
