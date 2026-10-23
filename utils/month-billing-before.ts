import type { NominaBillingEntry } from "@/domain/entities/nomina-billing-entry";

/** Acumulado de un Mes Asignado antes de un ingreso. */
export interface NominaMonthBilling {
  billed: number;
  /** Servicio que ya cubrió la Utilidad ese mes (solo si AdsME lo asume). */
  serviceCovered: number;
  count: number;
}

/**
 * Lo facturado en el mes antes de este ingreso, como el original: no cuentan
 * las Inversiones Únicas y, al editar, solo los registrados antes que él.
 */
export function monthBillingBefore(entries: NominaBillingEntry[], month: string, editing?: NominaBillingEntry): NominaMonthBilling {
  const before = entries.filter(
    (entry) =>
      entry.assignedMonth === month &&
      entry.concept !== "inversion" &&
      (!editing || (entry.id !== editing.id && entry.createdAt < editing.createdAt)),
  );

  return {
    billed: before.reduce((total, entry) => total + entry.amount, 0),
    serviceCovered: before.reduce((total, entry) => total + (entry.serviceAssumed ? entry.service : 0), 0),
    count: before.length,
  };
}
