import { EXPENSE_TARGET_OPTIONS, EXPENSE_TYPE_OPTIONS } from "@/constants/nomina-modales.constants";
import { EXPENSE_MODAL_COPY, EXPENSE_TARGET_HELP } from "@/constants/nomina-modales-gasto-copy.constants";
import { ChoiceButtons } from "@/presentation/components/nomina/modales/campos/choice-buttons";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { MoneyInput } from "@/presentation/components/nomina/modales/campos/money-input";
import { TextInput } from "@/presentation/components/nomina/modales/campos/text-input";
import type { ExpenseSectionProps } from "@/types/nomina-modales-gasto.types";

/** Tipo, concepto, proveedor, monto y de qué bolsa se descuenta el gasto. */
export function ExpenseMainFields({ form }: ExpenseSectionProps) {
  const { values } = form;

  return (
    <>
      <FieldShell label={EXPENSE_MODAL_COPY.type}>
        <ChoiceButtons label={EXPENSE_MODAL_COPY.type} value={values.type} options={EXPENSE_TYPE_OPTIONS} onChange={form.selectType} />
      </FieldShell>
      <FieldShell htmlFor="expense-concept" label={EXPENSE_MODAL_COPY.concept} hint={EXPENSE_MODAL_COPY.conceptHelp}>
        <TextInput id="expense-concept" value={values.concept} placeholder={EXPENSE_MODAL_COPY.conceptPlaceholder} onChange={(event) => form.set({ concept: event.target.value })} />
      </FieldShell>
      <FieldShell htmlFor="expense-provider" label={EXPENSE_MODAL_COPY.provider}>
        <TextInput id="expense-provider" value={values.provider} placeholder={EXPENSE_MODAL_COPY.providerPlaceholder} onChange={(event) => form.set({ provider: event.target.value })} />
      </FieldShell>
      <FieldShell htmlFor="expense-amount" label={EXPENSE_MODAL_COPY.amount}>
        <MoneyInput id="expense-amount" value={values.amount} placeholder={EXPENSE_MODAL_COPY.amountPlaceholder} onChange={(amount) => form.set({ amount })} />
      </FieldShell>
      <FieldShell label={EXPENSE_MODAL_COPY.target} hint={EXPENSE_TARGET_HELP[values.target]}>
        <ChoiceButtons label={EXPENSE_MODAL_COPY.target} value={values.target} options={EXPENSE_TARGET_OPTIONS} onChange={(target) => form.set({ target })} />
      </FieldShell>
    </>
  );
}
