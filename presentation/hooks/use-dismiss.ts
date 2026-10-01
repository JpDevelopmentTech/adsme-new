"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Cierra una vista que puede abrirse de dos formas: como modal interceptado
 * sobre otra pantalla —se vuelve atrás y se conserva la lista con sus filtros—
 * o como página propia al entrar por URL —se navega a `fallbackHref`—.
 */
export function useDismiss(fallbackHref: string, isModal: boolean): () => void {
  const router = useRouter();

  return useCallback(() => {
    if (isModal) router.back();
    else router.push(fallbackHref);
  }, [router, fallbackHref, isModal]);
}
