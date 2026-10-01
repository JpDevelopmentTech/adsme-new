"use client";

import { ArrowRight } from "lucide-react";
import { useId } from "react";
import { PERIOD_FORM_COPY, PERIOD_PARAMS } from "@/constants/period-filter.constants";
import { InlineDateField } from "@/presentation/components/ui/inline-date-field";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { useDateRangeForm } from "@/presentation/hooks/use-date-range-form";
import type { DateRangeFormProps } from "@/types/period-filter.types";
import { cn } from "@/utils/cn";

/**
 * Período a medida: dos fechas y «Aplicar». No se aplica al cambiar cada fecha
 * porque elegir un rango son dos gestos, y recalcular entre uno y otro
 * mostraría un período a medias. Los `min`/`max` impiden en el calendario un
 * final anterior al inicio o una fecha fuera de los límites.
 */
export function DateRangeForm({ period, limits, className }: DateRangeFormProps) {
  const id = useId();
  const { from, to, setFrom, setTo, error, canApply, isPending, submit } = useDateRangeForm(period, limits);
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : undefined;

  return (
    <form onSubmit={submit} aria-label={PERIOD_FORM_COPY.label} className={cn("flex min-w-0 flex-col gap-2", className)}>
      <div className="flex flex-wrap items-center gap-2">
        <InlineDateField
          id={`${id}-from`}
          name={PERIOD_PARAMS.from}
          label={PERIOD_FORM_COPY.from}
          value={from}
          min={limits.min}
          max={to || limits.max}
          required
          isInvalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => setFrom(event.target.value)}
        />
        <ArrowRight size={14} strokeWidth={1.5} className="hidden shrink-0 text-text-muted sm:block" aria-hidden />
        <InlineDateField
          id={`${id}-to`}
          name={PERIOD_PARAMS.to}
          label={PERIOD_FORM_COPY.to}
          value={to}
          min={from || limits.min}
          max={limits.max}
          required
          isInvalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => setTo(event.target.value)}
        />
        <PrimaryButton
          type="submit"
          isLoading={isPending}
          disabled={!canApply}
          aria-label={isPending ? PERIOD_FORM_COPY.applying : undefined}
          className="h-11 py-0"
        >
          {PERIOD_FORM_COPY.apply}
        </PrimaryButton>
      </div>

      <p id={errorId} aria-live="polite" className="text-xs font-normal text-danger empty:hidden">
        {error}
      </p>
    </form>
  );
}
