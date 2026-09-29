"use client";

import { useState } from "react";
import type { ReportSection } from "@/domain/entities/report-section";

/**
 * Secciones ocultas mientras se edita el paso 3. Solo alimenta el recuento de
 * lo que verá el cliente: lo que se guarda sale de los propios interruptores.
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
