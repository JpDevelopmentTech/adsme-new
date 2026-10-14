import { EXPENSE_MODAL_COPY } from "@/constants/nomina-modales-gasto-copy.constants";
import { DateInput } from "@/presentation/components/nomina/modales/campos/date-input";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { SelectInput } from "@/presentation/components/nomina/modales/campos/select-input";
import { TextAreaInput } from "@/presentation/components/nomina/modales/campos/text-area-input";
import type { ExpenseSectionProps } from "@/types/nomina-modales-gasto.types";
import { listYearMonths } from "@/utils/list-year-months";

/** «Fecha del gasto», «Mes al que se asigna» y «Descripción (opcional)». */
export function ExpenseDateFields({ form }: ExpenseSectionProps) {
  const { values } = form;
  const year = Number(values.date.slice(0, 4));

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell htmlFor="expense-date" label={EXPENSE_MODAL_COPY.date} hint={EXPENSE_MODAL_COPY.dateHelp}>
          <DateInput id="expense-date" value={values.date} onChange={form.setDate} />
        </FieldShell>
        <FieldShell htmlFor="expense-month" label={EXPENSE_MODAL_COPY.month} hint={EXPENSE_MODAL_COPY.monthHelp}>
          <SelectInput
            id="expense-month"
            value={values.month}
            hasIcon={false}
            options={listYearMonths([year - 1, year, year + 1])}
            onChange={(month) => form.set({ month, isMonthTouched: true })}
          />
        </FieldShell>
      </div>
      <FieldShell htmlFor="expense-description" label={EXPENSE_MODAL_COPY.description}>
        <TextAreaInput
          id="expense-description"
          value={values.description}
          placeholder={EXPENSE_MODAL_COPY.descriptionPlaceholder}
          onChange={(event) => form.set({ description: event.target.value })}
        />
      </FieldShell>
    </>
  );
}
