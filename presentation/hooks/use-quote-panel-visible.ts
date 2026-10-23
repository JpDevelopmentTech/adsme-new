"use client";

import { useEffect, useState } from "react";
import { QUOTE_SUMMARY_ID, QUOTE_SUMMARY_THRESHOLD } from "@/constants/quote-summary.constants";

/** Indica si la columna de la cotización está a la vista, para marcar el botón activo de la barra móvil. */
export function useQuotePanelVisible(): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const panel = document.getElementById(QUOTE_SUMMARY_ID);
    if (!panel) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: QUOTE_SUMMARY_THRESHOLD });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  return isVisible;
}
