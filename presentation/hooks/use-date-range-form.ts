"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { PERIOD_FORM_COPY, PERIOD_PARAMS } from "@/constants/period-filter.constants";
import type { DateRange, PeriodLimits } from "@/types/period-filter.types";
import { getPeriodRangeError } from "@/utils/get-period-range-error";

/**
 * Estado del formulario Desde/Hasta. Aplica el período navegando a la misma
 * ruta con las fechas en la URL —que es lo que lee y valida el servidor— y
 * conserva el resto de parámetros. Va en una transición: mientras llega la
 * página recalculada, la actual sigue visible.
 */
export function useDateRangeForm(period: DateRange, limits: PeriodLimits) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [from, setFrom] = useState(period.from);
  const [to, setTo] = useState(period.to);

  const error = from && to ? getPeriodRangeError(from, to, limits) : PERIOD_FORM_COPY.invalidDate;
  const isDirty = from !== period.from || to !== period.to;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (error || !isDirty) return;

    const query = new URLSearchParams(searchParams.toString());
    query.set(PERIOD_PARAMS.from, from);
    query.set(PERIOD_PARAMS.to, to);

    startTransition(() => router.push(`${pathname}?${query.toString()}`, { scroll: false }));
  }

  return {
    from,
    to,
    setFrom,
    setTo,
    // Solo se avisa de lo que el usuario cambió; el período vigente ya es válido.
    error: isDirty ? error : null,
    canApply: isDirty && !error,
    isPending,
    submit,
  };
}
