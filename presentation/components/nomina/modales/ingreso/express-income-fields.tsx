import { EXPRESS_OTHER, EXPRESS_PRESETS } from "@/constants/nomina-modales.constants";
import { NEW_ARTIST_COPY } from "@/constants/nomina-modales-copy.constants";
import { INCOME_MODAL_COPY } from "@/constants/nomina-modales-ingreso-copy.constants";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { MoneyInput } from "@/presentation/components/nomina/modales/campos/money-input";
import { SelectInput } from "@/presentation/components/nomina/modales/campos/select-input";
import { IncomeDistribution } from "@/presentation/components/nomina/modales/ingreso/income-distribution";
import { TransactionParamsBox } from "@/presentation/components/nomina/modales/ingreso/transaction-params-box";
import type { IncomeSectionProps } from "@/types/nomina-modales-ingreso.types";
import { listYearMonths } from "@/utils/list-year-months";

/** Bloque de Express: monto de entrada, parámetros, distribución y mes que cubre. */
export function ExpressIncomeFields({ form, artist }: IncomeSectionProps) {
  const { values } = form;
  const year = Number(values.incomeDate.slice(0, 4));
  const presetOptions = [...EXPRESS_PRESETS.map(({ value, label }) => ({ value, label })), { value: EXPRESS_OTHER, label: NEW_ARTIST_COPY.expressOther }];

  return (
    <>
      <div className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4">
        <FieldShell htmlFor="income-express" label={NEW_ARTIST_COPY.expressAmount} hint={INCOME_MODAL_COPY.expressHelp}>
          <SelectInput id="income-express" value={values.expressPreset} options={presetOptions} hasIcon={false} onChange={(expressPreset) => form.setSplitInput({ expressPreset })} />
        </FieldShell>
        {values.expressPreset === EXPRESS_OTHER ? (
          <MoneyInput
            id="income-express-other"
            ariaLabel={NEW_ARTIST_COPY.expressOther}
            value={values.expressOther}
            placeholder={INCOME_MODAL_COPY.expressOtherPlaceholder}
            onChange={(expressOther) => form.setSplitInput({ expressOther })}
          />
        ) : null}
      </div>
      {form.effectiveAmount > 0 ? <TransactionParamsBox form={form} artist={artist} /> : null}
      <IncomeDistribution form={form} artist={artist} />
      <FieldShell htmlFor="income-covered" label={NEW_ARTIST_COPY.coveredMonth} hint={INCOME_MODAL_COPY.coveredHelp}>
        <SelectInput
          id="income-covered"
          value={values.coveredMonth}
          options={listYearMonths([year, year + 1])}
          placeholder={NEW_ARTIST_COPY.monthPlaceholder}
          onChange={(coveredMonth) => form.setMonthInput({ coveredMonth })}
        />
      </FieldShell>
    </>
  );
}
