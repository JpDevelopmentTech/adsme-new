import { ExpressIncomeFields } from "@/presentation/components/nomina/modales/ingreso/express-income-fields";
import { InvestmentFields } from "@/presentation/components/nomina/modales/ingreso/investment-fields";
import { ShowAmountFields } from "@/presentation/components/nomina/modales/ingreso/show-amount-fields";
import type { IncomeSectionProps } from "@/types/nomina-modales-ingreso.types";

/** Bloque central del ingreso: cambia según el concepto elegido. */
export function IncomeConceptBlock({ form, artist }: IncomeSectionProps) {
  if (form.values.concept === "inversion") return <InvestmentFields form={form} artist={artist} />;
  if (form.values.concept === "express") return <ExpressIncomeFields form={form} artist={artist} />;
  return <ShowAmountFields form={form} artist={artist} />;
}
