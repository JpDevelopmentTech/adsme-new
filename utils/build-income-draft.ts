import type { NominaSplit } from "@/domain/entities/nomina-bucket";
import type { NominaIncomeDraft } from "@/domain/entities/nomina-income-draft";
import type { NominaTransactionParams } from "@/domain/entities/nomina-transaction-params";
import type { NominaIncomeValues } from "@/types/nomina-modales-ingreso.types";
import type { NominaModalArtist } from "@/types/nomina-modals.types";

/** Lo que el formulario sabe de un ingreso además de sus campos. */
interface IncomeDraftContext {
  artist: NominaModalArtist;
  amount: number;
  split: NominaSplit;
  params: NominaTransactionParams;
}

/** Texto opcional: recortado y `null` si queda vacío. */
const optional = (text: string) => text.trim() || null;

/**
 * Ingreso como se guarda, igual que el original: el Express se asigna al mes
 * que cubre; la Inversión Única no lleva parámetros y guarda su costo de
 * servicio; el Servicio queda «asumido» si lo asume AdsME.
 */
export function buildIncomeDraft(values: NominaIncomeValues, { artist, amount, split, params }: IncomeDraftContext): NominaIncomeDraft {
  const isInvestment = values.concept === "inversion";
  const serviceCost = isInvestment ? Math.min(values.cost ?? 0, amount) : 0;
  const adsmeAssumes = artist.split.hasService && artist.split.servicePayer === "adsme";

  return {
    clientId: artist.id,
    concept: values.concept,
    otherConcept: values.concept === "otro" ? optional(values.otherConcept) : null,
    amount,
    eventDate: values.eventDate,
    incomeDate: values.incomeDate,
    assignedMonth: values.concept === "express" ? values.coveredMonth : values.assignedMonth,
    service: split.service,
    profit: split.profit,
    investment: split.investment,
    params: isInvestment ? null : params,
    serviceAssumed: !isInvestment && adsmeAssumes,
    serviceCost,
    serviceCostPurpose: serviceCost > 0 ? optional(values.costPurpose) : null,
    description: optional(values.description),
    documentName: values.fileName,
  };
}
