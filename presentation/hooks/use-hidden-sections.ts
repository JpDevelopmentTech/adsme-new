"use client";

import { useState } from "react";
import type { ReportSection } from "@/domain/entities/report-section";

/**
 * Secciones ocultas mientras se edita el paso 3. Gobierna los interruptores
 * (controlados, para que no se reinicien tras un envío fallido) y el recuento
 * de lo que verá el cliente.
 */
export function useHiddenSections(initial: ReportSection[]) {
  const [hidden, setHidden] = useState<ReportSection[]>(initial);

  const toggle = (section: ReportSection, isVisible: boolean) => {
    setHidden((current) =>
      isVisible
        ? current.filter((item) => item !== section)
        : [...current.filter((item) => item !== section), section],
    );
  };

  return { hidden, toggle };
}
