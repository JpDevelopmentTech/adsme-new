"use client";

import { useState } from "react";
import { HistoricMonthBanner } from "@/presentation/components/nomina/perfil/historic-month-banner";
import { MonthButton } from "@/presentation/components/nomina/perfil/month-button";
import type { ProfileToolbarProps } from "@/types/nomina-perfil.types";
import { formatMonthLong } from "@/utils/format-nomina-dates";
import { previousMonth } from "@/utils/previous-month";

/**
 * Fila de pestañas con las acciones del perfil y el botón de mes. Alternar al
 * mes anterior solo cambia la vista (botón en lila y aviso ámbar), como en el
 * original: los datos siguen siendo los del mes en curso.
 */
export function ProfileToolbar({ tabs, actions, currentMonth }: ProfileToolbarProps) {
  const [isHistoric, setIsHistoric] = useState(false);
  const historicLabel = formatMonthLong(previousMonth(currentMonth));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-border">
        {tabs}
        <div className="flex flex-wrap items-center gap-2.5 pb-2.5">
          {actions}
          <MonthButton
            label={isHistoric ? historicLabel : formatMonthLong(currentMonth)}
            isHistoric={isHistoric}
            onToggle={() => setIsHistoric((value) => !value)}
          />
        </div>
      </div>
      {isHistoric ? <HistoricMonthBanner monthLabel={historicLabel} onBack={() => setIsHistoric(false)} /> : null}
    </div>
  );
}
