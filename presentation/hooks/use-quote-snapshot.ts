"use client";

import { useQuote } from "@/presentation/hooks/use-quote";

/**
 * Manejadores de foco para las cifras de plataforma: al entrar se guardan los
 * pesos de cada plataforma y al salir se sueltan, para que el reparto del
 * total general sea proporcional a lo que había antes de escribir.
 */
export function useQuoteSnapshot(): { onFocus: () => void; onBlur: () => void } {
  const { dispatch } = useQuote();
  return {
    onFocus: () => dispatch({ type: "takeSnapshot" }),
    onBlur: () => dispatch({ type: "clearSnapshot" }),
  };
}
