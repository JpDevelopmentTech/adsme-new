import { DistributionPanel } from "@/presentation/components/nomina/modales/ingreso/distribution-panel";
import type { IncomeSectionProps } from "@/types/nomina-modales-ingreso.types";

/** Distribución automática del ingreso, editable, solo cuando hay monto. */
export function IncomeDistribution({ form }: IncomeSectionProps) {
  if (form.effectiveAmount <= 0) return null;

  return <DistributionPanel idPrefix="income-split" amount={form.effectiveAmount} split={form.split} onEdit={form.editBucket} note={form.note} />;
}
