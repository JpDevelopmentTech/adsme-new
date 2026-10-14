import { INCOME_MODAL_COPY } from "@/constants/nomina-modales-ingreso-copy.constants";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { MoneyInput } from "@/presentation/components/nomina/modales/campos/money-input";
import { TextInput } from "@/presentation/components/nomina/modales/campos/text-input";
import { IncomeDistribution } from "@/presentation/components/nomina/modales/ingreso/income-distribution";
import { TransactionParamsBox } from "@/presentation/components/nomina/modales/ingreso/transaction-params-box";
import type { IncomeSectionProps } from "@/types/nomina-modales-ingreso.types";

/** Bloque de Show y de Otro: concepto libre (Otro), monto, parámetros y distribución. */
export function ShowAmountFields({ form, artist }: IncomeSectionProps) {
  const isOther = form.values.concept === "otro";

  return (
    <>
      {isOther ? (
        <FieldShell htmlFor="income-other" label={INCOME_MODAL_COPY.otherConcept} hint={INCOME_MODAL_COPY.otherHelp}>
          <TextInput id="income-other" value={form.values.otherConcept} placeholder={INCOME_MODAL_COPY.otherPlaceholder} onChange={(event) => form.set({ otherConcept: event.target.value })} />
        </FieldShell>
      ) : null}
      <FieldShell htmlFor="income-amount" label={isOther ? INCOME_MODAL_COPY.otherAmount : INCOME_MODAL_COPY.showAmount} hint={INCOME_MODAL_COPY.amountHelp}>
        <MoneyInput id="income-amount" value={form.values.amount} placeholder={INCOME_MODAL_COPY.amountPlaceholder} onChange={(amount) => form.setSplitInput({ amount })} />
      </FieldShell>
      {form.effectiveAmount > 0 ? <TransactionParamsBox form={form} artist={artist} /> : null}
      <IncomeDistribution form={form} artist={artist} />
    </>
  );
}
