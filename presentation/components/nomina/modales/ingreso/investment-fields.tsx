import { INCOME_MODAL_COPY } from "@/constants/nomina-modales-ingreso-copy.constants";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { MoneyInput } from "@/presentation/components/nomina/modales/campos/money-input";
import { TextAreaInput } from "@/presentation/components/nomina/modales/campos/text-area-input";
import { IncomeDistribution } from "@/presentation/components/nomina/modales/ingreso/income-distribution";
import type { IncomeSectionProps } from "@/types/nomina-modales-ingreso.types";
import { formatExactCurrency } from "@/utils/format-exact-currency";

/** Bloque de Inversión Única: monto, costo de servicio opcional y su propósito. */
export function InvestmentFields({ form, artist }: IncomeSectionProps) {
  const amount = form.values.amount ?? 0;
  const cost = form.values.cost ?? 0;

  return (
    <>
      <FieldShell htmlFor="income-amount" label={INCOME_MODAL_COPY.investmentAmount} hint={INCOME_MODAL_COPY.investmentHelp}>
        <MoneyInput id="income-amount" value={form.values.amount} placeholder={INCOME_MODAL_COPY.investmentPlaceholder} onChange={(next) => form.setSplitInput({ amount: next })} />
      </FieldShell>
      <FieldShell
        htmlFor="income-cost"
        label={INCOME_MODAL_COPY.cost}
        hint={INCOME_MODAL_COPY.costHelp}
        error={cost > amount ? INCOME_MODAL_COPY.costTooHigh(formatExactCurrency(amount)) : null}
      >
        <MoneyInput id="income-cost" value={form.values.cost} placeholder={INCOME_MODAL_COPY.costPlaceholder} isInvalid={cost > amount} onChange={(next) => form.setSplitInput({ cost: next })} />
      </FieldShell>
      {cost > 0 ? (
        <FieldShell htmlFor="income-purpose" label={INCOME_MODAL_COPY.purpose} hint={INCOME_MODAL_COPY.purposeHelp}>
          <TextAreaInput id="income-purpose" value={form.values.costPurpose} placeholder={INCOME_MODAL_COPY.purposePlaceholder} onChange={(event) => form.set({ costPurpose: event.target.value })} />
        </FieldShell>
      ) : null}
      <IncomeDistribution form={form} artist={artist} />
    </>
  );
}
