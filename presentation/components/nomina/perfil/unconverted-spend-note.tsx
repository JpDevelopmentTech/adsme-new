import { ADS_TAB_COPY } from "@/constants/nomina-perfil-tabs-copy.constants";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import type { UnconvertedSpendNoteProps } from "@/types/nomina-perfil.types";
import { formatMoney } from "@/utils/format-money";
import { sumUnconvertedSpend } from "@/utils/sum-unconverted-spend";

/** Aviso de gasto en dólares que no se descuenta porque su trabajo no tiene TRM. */
export function UnconvertedSpendNote({ campaigns }: UnconvertedSpendNoteProps) {
  const { totals, jobTitles } = sumUnconvertedSpend(campaigns);
  if (totals.length === 0) return null;
  const amount = totals.map((total) => formatMoney(total.amount, total.currency)).join(" + ");

  return <FormAlert tone="warning" message={ADS_TAB_COPY.unconverted(amount, jobTitles.join(", "))} />;
}
