import type { NominaMovement } from "@/domain/entities/nomina-movement";
import { SAMPLE_MONTHS, SAMPLE_TAX_RATE } from "@/infrastructure/sample-data/nomina/sample-calendar.constants";
import type { SampleArtistSpec } from "@/infrastructure/sample-data/nomina/sample-nomina.types";
import { isoDay, sampleShowDates } from "@/infrastructure/sample-data/nomina/sample-show-dates";
import { splitSampleShow } from "@/infrastructure/sample-data/nomina/split-sample-show";

/** Descripción y comprobante del último show de Valeria, como en el diseño. */
const DETAILS: Record<string, Pick<NominaMovement, "description" | "document">> = {
  "valeria-gomez-2026-10-7": { description: "Show en Medellín, Teatro Metropolitano", document: "comprobante-teatro-metropolitano.pdf" },
};

/** Arma el movimiento completo a partir de su reparto bruto. */
function toMovement(base: Omit<NominaMovement, "split">, service: number, profit: number, investment: number): NominaMovement {
  const taxes = Math.round(profit * SAMPLE_TAX_RATE);
  return { ...base, split: { service, profit, taxes, netProfit: profit - taxes, investment }, ...DETAILS[base.id] };
}

/** Movimientos de muestra de un artista, del más reciente al más antiguo. */
export function buildSampleMovements(spec: SampleArtistSpec): NominaMovement[] {
  const movements: NominaMovement[] = [];

  SAMPLE_MONTHS.forEach((month, monthIndex) => {
    let billed = 0;
    let covered = 0;
    sampleShowDates(spec.id, month, spec.showsByMonth[monthIndex]).forEach((date, index) => {
      const split = splitSampleShow(spec, spec.nomina, billed, covered);
      billed += spec.nomina;
      covered += split.service;
      const base = { id: `${spec.id}-${month}-${index}`, concept: "show" as const, amount: spec.nomina, eventDate: isoDay(month, date.event), incomeDate: isoDay(month, date.income), assignedMonth: month };
      movements.push(toMovement(base, split.service, split.profit, split.investment));
    });
  });

  spec.extraIncomes.forEach((extra, index) => {
    const rest = extra.amount - extra.serviceCost;
    const profit = Math.round(rest * 0.1);
    const base = { id: `${spec.id}-extra-${index}`, concept: "inversion" as const, amount: extra.amount, eventDate: isoDay(extra.month, extra.day), incomeDate: isoDay(extra.month, extra.day), assignedMonth: extra.month };
    movements.push(toMovement(base, extra.serviceCost, profit, rest - profit));
  });

  return movements.sort((a, b) => b.incomeDate.localeCompare(a.incomeDate) || b.id.localeCompare(a.id));
}
