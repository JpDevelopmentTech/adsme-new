"use client";

import { useEffect } from "react";
import { QUOTE_TOAST_MS } from "@/constants/quote-storage.constants";
import { useQuote } from "@/presentation/hooks/use-quote";

/**
 * Avisos del cotizador en una píldora abajo al centro (sobre la barra móvil en
 * pantallas pequeñas). La región viva existe siempre para que el lector de
 * pantalla anuncie cada aviso nuevo.
 */
export function QuoteToaster() {
  const { state, dispatch } = useQuote();
  const { toast } = state;
  const toastId = toast?.id;

  useEffect(() => {
    if (toastId === undefined) return;
    const timer = window.setTimeout(() => dispatch({ type: "dismissToast" }), QUOTE_TOAST_MS);
    return () => window.clearTimeout(timer);
  }, [toastId, dispatch]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(96px+env(safe-area-inset-bottom))] z-50 flex justify-center px-4 xl:bottom-7"
    >
      {toast ? (
        <p key={toast.id} className="glass-menu max-w-md rounded-pill px-4 py-2.5 text-center text-[13px] text-text-primary">
          {toast.message}
        </p>
      ) : null}
    </div>
  );
}
