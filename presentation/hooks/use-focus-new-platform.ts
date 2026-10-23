"use client";

import { useEffect, useRef } from "react";
import { PLATFORM_BUDGET_ATTR } from "@/constants/quote-platforms-copy.constants";

/**
 * Devuelve una función para avisar de que se va a agregar una plataforma; en
 * cuanto aparece, lleva la vista a su presupuesto y le pone el foco.
 */
export function useFocusNewPlatform(platformIds: string[]): () => void {
  const pending = useRef<string[] | null>(null);
  const key = platformIds.join("|");

  useEffect(() => {
    const before = pending.current;
    if (!before) return;
    const added = key.split("|").find((id) => id && !before.includes(id));
    if (!added) return;
    pending.current = null;
    const input = document.querySelector<HTMLInputElement>(`[${PLATFORM_BUDGET_ATTR}="${added}"] input`);
    if (!input) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    input.scrollIntoView({ behavior: isReduced ? "auto" : "smooth", block: "center" });
    input.focus({ preventScroll: true });
  }, [key]);

  return () => {
    pending.current = platformIds;
  };
}
