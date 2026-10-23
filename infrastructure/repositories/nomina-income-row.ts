import type { NominaClientMovement, NominaIncomeConcept } from "@/domain/entities/nomina-movement";
import { completeSplit } from "@/utils/complete-split";

/** Fila de `nomina_incomes`. `numeric` llega como texto. */
export interface IncomeRow {
  id: string;
  client_id: string;
  concept: NominaIncomeConcept;
  other_concept: string | null;
  amount: number;
  event_date: string;
  income_date: string;
  assigned_month: string;
  service: number;
  profit: number;
  investment: number;
  profit_percent: number | string | null;
  profit_per_show: number | null;
  service_assumed: boolean;
  service_cost: number;
  service_cost_purpose: string | null;
  description: string | null;
  document_name: string | null;
  created_at: string;
}

/** Columnas que se leen de un ingreso. */
export const INCOME_COLUMNS =
  "id, client_id, concept, other_concept, amount, event_date, income_date, assigned_month, service, profit, investment, profit_percent, profit_per_show, service_assumed, service_cost, service_cost_purpose, description, document_name, created_at";

/** Ingreso del dominio a partir de la fila; impuestos y Utilidad neta se derivan de la Utilidad. */
export function toClientMovement(row: IncomeRow): NominaClientMovement {
  const hasParams = row.profit_percent !== null && row.profit_per_show !== null;
  return {
    id: row.id,
    clientId: row.client_id,
    concept: row.concept,
    otherConcept: row.other_concept ?? undefined,
    amount: Number(row.amount),
    eventDate: row.event_date,
    incomeDate: row.income_date,
    assignedMonth: row.assigned_month.slice(0, 7),
    split: completeSplit(Number(row.service), Number(row.profit), Number(row.investment)),
    params: hasParams ? { profitPercent: Number(row.profit_percent), profitPerShowAfterMin: Number(row.profit_per_show) } : null,
    serviceAssumed: row.service_assumed,
    serviceCost: Number(row.service_cost),
    serviceCostPurpose: row.service_cost_purpose ?? undefined,
    description: row.description ?? undefined,
    document: row.document_name ?? undefined,
    createdAt: row.created_at,
  };
}
