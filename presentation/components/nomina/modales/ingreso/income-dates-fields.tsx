import { INCOME_MODAL_COPY } from "@/constants/nomina-modales-ingreso-copy.constants";
import { DateInput } from "@/presentation/components/nomina/modales/campos/date-input";
import { FieldShell } from "@/presentation/components/nomina/modales/campos/field-shell";
import { SelectInput } from "@/presentation/components/nomina/modales/campos/select-input";
import type { IncomeSectionProps } from "@/types/nomina-modales-ingreso.types";
import { keepAssignedMonth } from "@/utils/keep-assigned-month";
import { listYearMonths } from "@/utils/list-year-months";

/** «Fecha de Evento», «Fecha de Ingreso» y, salvo en Express, «Mes Asignado». */
export function IncomeDatesFields({ form }: IncomeSectionProps) {
  const { values } = form;
  const years = [Number(values.eventDate.slice(0, 4)), Number(values.incomeDate.slice(0, 4))];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldShell htmlFor="income-event-date" label={INCOME_MODAL_COPY.eventDate} hint={INCOME_MODAL_COPY.dateHelp}>
          <DateInput id="income-event-date" value={values.eventDate} onChange={(eventDate) => form.set({ eventDate, assignedMonth: keepAssignedMonth(values.assignedMonth, eventDate, values.incomeDate) })} />
        </FieldShell>
        <FieldShell htmlFor="income-date" label={INCOME_MODAL_COPY.incomeDate} hint={INCOME_MODAL_COPY.dateHelp}>
          <DateInput id="income-date" value={values.incomeDate} onChange={(incomeDate) => form.set({ incomeDate, assignedMonth: keepAssignedMonth(values.assignedMonth, values.eventDate, incomeDate) })} />
        </FieldShell>
      </div>
      {values.concept === "express" ? null : (
        <FieldShell htmlFor="income-month" label={INCOME_MODAL_COPY.assignedMonth} hint={INCOME_MODAL_COPY.assignedHelp}>
          <SelectInput id="income-month" value={values.assignedMonth} options={listYearMonths(years)} onChange={(assignedMonth) => form.set({ assignedMonth })} />
        </FieldShell>
      )}
    </>
  );
}
