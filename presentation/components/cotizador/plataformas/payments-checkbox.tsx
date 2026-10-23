"use client";

import { Check } from "lucide-react";
import { PLATFORMS_EXTRA_COPY as COPY } from "@/constants/quote-platforms-copy.constants";
import { useQuote } from "@/presentation/hooks/use-quote";

/** «Incluir métodos de pago en el PDF», con su estado; deshabilitada si no hay métodos cargados. */
export function PaymentsCheckbox() {
  const { state, dispatch, reference } = useQuote();
  const columns = reference.paymentColumns;
  const isAvailable = columns.length > 0;
  const status = isAvailable
    ? `${columns.slice(0, 2).map((column) => column.title).join(" · ")}${COPY.paymentsAvailableSuffix}`
    : COPY.paymentsUnavailable;

  return (
    <div className="flex flex-col gap-1">
      <label className="flex min-h-10 w-fit cursor-pointer items-center gap-2.5 has-disabled:cursor-not-allowed has-disabled:opacity-60">
        <input
          type="checkbox"
          checked={isAvailable && state.draft.includePayments}
          disabled={!isAvailable}
          aria-describedby="cotizador-pagos-estado"
          onChange={(event) => dispatch({ type: "set", patch: { includePayments: event.target.checked } })}
          className="peer sr-only"
        />
        <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-[6px] border-[1.5px] border-white/40 transition-colors peer-checked:border-transparent peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-lilac [&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100">
          <Check size={13} strokeWidth={2.5} className="text-g-50" />
        </span>
        <strong className="text-sm font-normal text-text-primary">{COPY.payments}</strong>
      </label>
      <p id="cotizador-pagos-estado" className="pl-[30px] text-xs text-text-muted">{status}</p>
    </div>
  );
}
