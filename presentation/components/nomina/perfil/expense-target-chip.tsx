import { FINANCE_TAB_COPY } from "@/constants/nomina-perfil-copy.constants";
import type { ExpenseTargetChipProps } from "@/types/nomina-perfil.types";
import { cn } from "@/utils/cn";

/** Bolsa de la que se descuenta un gasto: Presupuesto de Ads en lila, Servicio en gris. */
export function ExpenseTargetChip({ target }: ExpenseTargetChipProps) {
  const isAds = target === "ads";

  return (
    <span
      className={cn(
        "inline-flex rounded-pill px-2.5 py-1 text-[11.5px] font-normal whitespace-nowrap",
        isAds ? "bg-lilac/14 text-lilac" : "bg-surface text-text-secondary",
      )}
    >
      {isAds ? FINANCE_TAB_COPY.targetAds : FINANCE_TAB_COPY.targetService}
    </span>
  );
}
