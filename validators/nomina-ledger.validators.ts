import { z } from "zod";

const MAX_AMOUNT = 100_000_000_000;
const money = z.number().int().min(0).max(MAX_AMOUNT);
const positiveMoney = z.number().int().min(1, { message: "El monto debe ser mayor que cero." }).max(MAX_AMOUNT);
const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, { message: "Elige el mes." });
const optionalText = (max: number) => z.string().trim().max(max).nullable();

/** Ingreso de un artista con el reparto ya calculado (o ajustado a mano). */
export const incomeDraftSchema = z
  .object({
    clientId: z.uuid(),
    concept: z.enum(["show", "inversion", "express", "otro"]),
    otherConcept: optionalText(80),
    amount: positiveMoney,
    eventDate: z.iso.date(),
    incomeDate: z.iso.date(),
    assignedMonth: month,
    service: money,
    profit: money,
    investment: money,
    params: z.object({ profitPercent: z.number().min(0).max(100), profitPerShowAfterMin: money }).nullable(),
    serviceAssumed: z.boolean(),
    serviceCost: money,
    serviceCostPurpose: optionalText(200),
    description: optionalText(500),
    documentName: optionalText(255),
  })
  .refine((draft) => draft.concept !== "otro" || Boolean(draft.otherConcept), { message: "Especifica el concepto.", path: ["otherConcept"] })
  .refine((draft) => draft.serviceCost <= draft.amount, { message: "El costo no puede superar el monto.", path: ["serviceCost"] });

/** Alta o edición de un ingreso: sin `id` se crea. */
export const saveIncomeSchema = z.object({ id: z.uuid().optional(), draft: incomeDraftSchema });

/** Gasto de un artista. */
export const expenseDraftSchema = z.object({
  clientId: z.uuid(),
  type: z.enum(["servicio", "spotify", "otro"]),
  concept: z.string().trim().min(1, { message: "Escribe el concepto." }).max(120),
  provider: optionalText(120),
  amount: positiveMoney,
  target: z.enum(["ads", "servicio"]),
  date: z.iso.date(),
  assignedMonth: month,
  description: optionalText(500),
});

/** Alta o edición de un gasto: sin `id` se crea. */
export const saveExpenseSchema = z.object({ id: z.uuid().optional(), draft: expenseDraftSchema });

/** Borrado de un ingreso o un gasto del artista. */
export const deleteLedgerRecordSchema = z.object({ id: z.uuid(), clientId: z.uuid() });
